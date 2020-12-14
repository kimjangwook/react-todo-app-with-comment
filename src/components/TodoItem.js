import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  /**
   * propTypes로 넘기는 값은 todo, editTodo, deleteTodo, completeTodo로 모두 4개이며,
   * 4 항목 모두 필수 값임을 알 수 있다.
   * 이 TodoItem이 렌더링 되는 부분은 src\components\MainSection.js이므로 해당 파일을 참조 할 것.
   */
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props

    let element
    /**
     * 각 TodoItem의 라벨을 더블클릭하면 (handleDoubleClick 참조) TodoItem의 state.editing이 true가 됨.
     * 그때 text로 들어가는게 todo.text가 되고,
     * onSave로 들어가는 text는 수정을 끝낸 text가 되므로 두개는 관련이 없다고 생각해도 됨.
     * onSave는 TodoTextInput에서 handleSubmit으로 들어가게 되는데 그 내용을 살펴보면 무슨 내용인지 알 수 있을듯.
     */
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)}
        />
      )
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
