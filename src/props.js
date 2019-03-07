const isEvent = name => name.startsWith("on");
const isAttribute = name => !isEvent(name) && name != "children";
const isClassName = name => name === 'className'
const transferPropsName = (name) => {
  return isClassName(name) ? 'class' : name
}

export default function updateDomProperties(dom, prevProps, nextProps) {
  Object.keys(prevProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  });

  Object.keys(prevProps).filter(isAttribute).forEach(name => {
    if (dom.nodeType === 1) {
      dom.removeAttribute(name)
    } else {
      dom[name] = null;
    }
  });

  Object.keys(nextProps).filter(isAttribute).forEach(name => {
    if (dom.nodeType === 1) {
      dom.setAttribute(transferPropsName(name), nextProps[name])
    } else {
      dom[name] = nextProps[name];
    }
  });

  Object.keys(nextProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });
}