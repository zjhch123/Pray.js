import reconcile from './reconcile'

export default class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
    this.__internalInstance = null;
  }
  
  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    // update instance
    const parentDom = this.__internalInstance.dom.parentNode;
    const element = this.__internalInstance.element;
    reconcile(parentDom, this.__internalInstance, element);
  }
}

Component.prototype.isReactComponent = {};