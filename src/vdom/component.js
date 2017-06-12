import {patch} from './vdom'
export default class {
  constructor (props, context) {
    this.props = props || {}
    this.context = context || {}
    this.state = {}
    this._dirty = true
  }

  shouldComponentUpdate () {
    return this._dirty
  }

  setState (state) {
    this._dirty = true
    this.state = Object.assign({}, this.state, state)
    if (this.shouldComponentUpdate(this.props, this.state)) {
      const $node = this.$node
      for (let i = 0; i < $node.parentNode.childNodes.length; i++) {
        if ($node.parentNode.childNodes[i] === $node) {
          this.vnode = patch($node.parentNode, this.render(), this.vnode, i)
        }
      }
    }
  }

  render () {
    throw new Error('Your component must have a render method')
  }
}
