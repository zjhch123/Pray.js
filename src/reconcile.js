import { TEXT_ELEMENT } from './createElement'
import updateDomProperties from './props'

function createPublicInstance(element, instance) {
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance.__internalInstance = instance;
  return publicInstance;
}

function instantiate(element) {
  const { type, props = {} } = element;
  
  const isDomElement = typeof type === 'string';
  const isClassElement = !!(type.prototype && type.prototype.isReactComponent);
  if (isDomElement) {
    // 创建dom
    const isTextElement = type === TEXT_ELEMENT;
    const dom = isTextElement ? document.createTextNode('') : document.createElement(type);

    // 设置dom的事件、数据属性
    updateDomProperties(dom, [], element.props);
    const children = props.children || [];
    const childInstance = children.map(instantiate);
    const childDoms = childInstance.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
    const instance = { element, dom, childInstance };
    return instance;
  } else if (isClassElement) {
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    Object.assign(instance, { dom: childInstance.dom, element, childInstance, publicInstance });
    return instance;
  } else {
    const childElement = type(element.props);
    const childInstance = instantiate(childElement);
    const instance = {
      dom: childInstance.dom,
      element,
      childInstance
    };
    return instance;
  }
}

function hasLifeCycle(instance, lifeCycle) {
  if (!!(instance.publicInstance && instance.publicInstance[lifeCycle])) {
    return typeof instance.publicInstance[lifeCycle] === 'function'
  }
  return false
}

function doLifeCycle(instance, lifeCycle) {
  let lifeCycleResult = null
  if (hasLifeCycle(instance, lifeCycle)) {
    lifeCycleResult = instance.publicInstance[lifeCycle]()
  }
  return lifeCycleResult
}

function reconcileChildren(instance, element) {
  const { dom, childInstance } = instance
  const newChildElement = element.props.children || []
  const count = Math.max(childInstance.length, newChildElement.length)

  const newChildInstance = []
  for (let i = 0; i < count; i++) {
    newChildInstance.push(reconcile(dom, childInstance[i], newChildElement[i]))
  }

  return newChildInstance.filter(instance => instance !== null)
}

export default function reconcile(parentDOM, instance, element) {
  if (instance === null || typeof instance === 'undefined') {
    const newInstance = instantiate(element)

    doLifeCycle(newInstance, 'componentWillMount')
    parentDOM.appendChild(newInstance.dom)
    doLifeCycle(newInstance, 'componentDidMount')

    return newInstance
  } else if (element === null || typeof element === 'undefined') {
    doLifeCycle(instance, 'componentWillUnmount')
    parentDOM.removeChild(instance.dom)

    return null
  } else if (instance.element.type !== element.type) {
    const newInstance = instantiate(element)

    parentDOM.replaceChild(newInstance.dom, instance.dom)
    doLifeCycle(newInstance, 'componentDidMount')

    return newInstance
  } else if (typeof element.type === 'string') {
    updateDomProperties(instance.dom, instance.element.props, element.props)

    instance.childInstance = reconcileChildren(instance, element)
    instance.element = element

    return instance
  } else {
    if (hasLifeCycle(instance, 'shouldComponentUpdate')) {
      if (!doLifeCycle(instance, 'shouldComponentUpdate')) {
        return
      }
    }

    let newChildInstance = null
    let newChildElement = null
    let oldChildInstance = null

    if (instance.publicInstance) {
      doLifeCycle(instance, 'componentWillUpdate')
      instance.publicInstance.props = element.props
      newChildElement = instance.publicInstance.render()
      oldChildInstance = instance.childInstance
      newChildInstance = reconcile(parentDOM, oldChildInstance, newChildElement)
      doLifeCycle(instance, 'componentDidUpdate')
    } else {
      newChildElement = instance.element.type(element.props)
      oldChildInstance = instance.childInstance
      newChildInstance = reconcile(parentDOM, oldChildInstance, newChildElement)
    }

    instance.dom = newChildInstance.dom
    instance.childInstance = newChildInstance
    instance.element = element
    
    return instance
  }
}