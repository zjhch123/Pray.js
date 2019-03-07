/** @jsx Pray.createElement */
import Pray from 'pray.js'
import "./style.css"

const TodoItem = (({id, name, finished, changeStatus}) => (
  <div className={['c-item', finished ? 'f-finished' : ''].join(' ')}>
    <span>{ name }</span>
    <button onClick={() => changeStatus(id, !finished)}>
      { finished ? 'Reopen' : 'Finish' }
    </button> 
  </div>
))

class Todo extends Pray.Component {
  constructor() {
    super()
    this.state = {
      todoList: [
        { id: 0, name: 'Study', finished: false },
        { id: 1, name: 'Eat', finished: false },
        { id: 2, name: 'Sleep', finished: false },
      ]
    }
  }

  handlerChangeStatus = (id, nextStatus) => {
    this.state.todoList.filter(item => item.id === id)[0].finished = nextStatus
    this.setState({
      todoList: this.state.todoList.slice(0)
    })
  }

  handlerSubmitForm = (e) => {
    this.setState({
      todoList: [
        ...this.state.todoList,
        { id: Math.random(), name: e.target.name.value, finished: false }
      ]
    })
    e.target.name.value = ''

    e.preventDefault();
  }

  render() {
    return (
      <div className="c-todoList">
        <div>
          <h2>Todo List</h2>
          <form onSubmit={this.handlerSubmitForm}>
            <input name="name" type="input"/>
          </form>
        </div>
        <div>
          {  
            this.state.todoList.map(({id, name, finished}) => (
              <TodoItem 
                id={id} 
                name={name} 
                finished={finished} 
                changeStatus={this.handlerChangeStatus}/>
            ))
          }
        </div>
      </div>
    )
  }
}

Pray.render(<Todo />, document.getElementById('root'))