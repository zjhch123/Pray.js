export const TEXT_ELEMENT = 'TEXT_ELEMENT'

export default function createElement(type, props, ...children) {
  props = Object.assign({}, props)
  props.children = [].concat(...children)
                     .filter(child => child !== null && child !== false)
                     .map(child => child instanceof Object ? child : createTextElement(child))
  return { type, props }
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value })
}