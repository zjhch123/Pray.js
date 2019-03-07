import reconcile from './reconcile'

let rootInstance = null

export default function render(element, parentDOM) {
  const prevInstance = rootInstance
  const nextInstance = reconcile(parentDOM, prevInstance, element)
  
  rootInstance = nextInstance
}
