!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(n=n||self).pray=e()}(this,function(){"use strict";var m="TEXT_ELEMENT";function c(n,e){var t;e=Object.assign({},e);for(var r=arguments.length,o=Array(2<r?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return e.children=(t=[]).concat.apply(t,o).filter(function(n){return null!==n&&!1!==n}).map(function(n){return n instanceof Object?n:c(m,{nodeValue:n})}),{type:n,props:e}}var e=function(n){return n.startsWith("on")},n=function(n){return!e(n)&&"children"!=n},i=function(n){return"className"===n?"class":n};function h(t,r,o){Object.keys(r).filter(e).forEach(function(n){var e=n.toLowerCase().substring(2);t.removeEventListener(e,r[n])}),Object.keys(r).filter(n).forEach(function(n){1===t.nodeType?t.removeAttribute(n):t[n]=null}),Object.keys(o).filter(n).forEach(function(n){1===t.nodeType?t.setAttribute(i(n),o[n]):t[n]=o[n]}),Object.keys(o).filter(e).forEach(function(n){var e=n.toLowerCase().substring(2);t.addEventListener(e,o[n])})}function v(n){var e=n.type,t=n.props,r=void 0===t?{}:t,o=!(!e.prototype||!e.prototype.isReactComponent);if("string"==typeof e){var i=e===m?document.createTextNode(""):document.createElement(e);h(i,[],n.props);var c=(r.children||[]).map(v);return c.map(function(n){return n.dom}).forEach(function(n){return i.appendChild(n)}),{element:n,dom:i,childInstance:c}}if(o){var a={},u=(p=a,(f=new(s=n).type(s.props)).__internalInstance=p,f),l=v(u.render());return Object.assign(a,{dom:l.dom,element:n,childInstance:l,publicInstance:u}),a}var s,p,f,d=v(e(n.props));return{dom:d.dom,element:n,childInstance:d}}function a(n,e){return!(!n.publicInstance||!n.publicInstance[e])&&"function"==typeof n.publicInstance[e]}function u(n,e){var t=null;return a(n,e)&&(t=n.publicInstance[e]()),t}function l(n,e,t){if(null==e){var r=v(t);return u(r,"componentWillMount"),n.appendChild(r.dom),u(r,"componentDidMount"),r}if(null==t)return u(e,"componentWillUnmount"),n.removeChild(e.dom),null;if(e.element.type!==t.type){var o=v(t);return n.replaceChild(o.dom,e.dom),u(o,"componentDidMount"),o}if("string"==typeof t.type)return h(e.dom,e.element.props,t.props),e.childInstance=function(n,e){for(var t=n.dom,r=n.childInstance,o=e.props.children||[],i=Math.max(r.length,o.length),c=[],a=0;a<i;a++)c.push(l(t,r[a],o[a]));return c.filter(function(n){return null!==n})}(e,t),e.element=t,e;if(!a(e,"shouldComponentUpdate")||u(e,"shouldComponentUpdate")){var i=null,c=null;return e.publicInstance?(u(e,"componentWillUpdate"),e.publicInstance.props=t.props,c=e.publicInstance.render(),i=l(n,e.childInstance,c),u(e,"componentDidUpdate")):(c=e.element.type(t.props),i=l(n,e.childInstance,c)),e.dom=i.dom,e.childInstance=i,e.element=t,e}}var r=null;var t=function(){function r(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(n,e,t){return e&&r(n.prototype,e),t&&r(n,t),n}}();var o=function(){function e(n){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.props=n,this.state=this.state||{},this.__internalInstance=null}return t(e,[{key:"setState",value:function(n){this.state=Object.assign({},this.state,n),l(this.__internalInstance.dom.parentNode,this.__internalInstance,this.__internalInstance.element)}}]),e}();return o.prototype.isReactComponent={},{createElement:c,render:function(n,e){var t=l(e,r,n);r=t},Component:o}});
