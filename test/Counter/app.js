/** @jsx Pray.createElement */
import Pray from 'pray.js'
import "./style.css"

class Counter extends Pray.Component {
  constructor(props) {
    super(props)
    this.emojis = ['😍','😛','😏','😊','🤩']
    this.state = {
      count: 0,
      emoji: '😀'
    }
  }

  handlerClick = () => {
    this.setState({
      count: this.state.count + 1,
      emoji: this.emojis[~~(Math.random() * this.emojis.length)]
    })
  }

  render() {
    const { name } = this.props
    return (
      <div className="c-counter">
        <span>{name}</span>
        <button onClick={this.handlerClick}>{this.state.count} {this.state.emoji}</button>
      </div>
    )
  }
}

class App extends Pray.Component {
  constructor() {
    super()
    this.state = {
      likes: [
        'Node.js', 'Java', 'Python'
      ]
    }
  }

  render() {
    return (
      <div>
        {
          this.state.likes.map((name => <Counter name={name}/>))
        }
      </div>
    )
  }
}

Pray.render(<App />, document.getElementById('root'))