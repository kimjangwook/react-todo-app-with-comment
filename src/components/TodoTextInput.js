import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({text: ''})
      }
    }
  }

  handleChange = e => this.setState({text: e.target.value})

  /**
   * blur란? 엘리먼트의 포커스가 해제되었을 때 발생, focusout 이벤트와는 달리 이벤트 버블링이 발생하지 않는다.
   * 참고 링크 : https://developer.mozilla.org/ko/docs/Web/Events/blur
   *
   * 해설:
   *   blur라는 이벤트를 다루는 함수로, TodoTextInput 컴포넌트의 <input> 엘리먼트의 포커스가 해제돼었을 때 발생.
   *   이해를 위해 console.log(this.props)를 사용하여 언제 이벤트가 실행되는지 확인해 볼 것.
   *   또한  !this.props.newTodo 조건을 비활성화 하면 어떠한 일이 발생하는지도 확인해 볼 것.
   * @param e
   */
  handleBlur = e => {
    // console.log(this.props) // 이해를 위해 이 라인을 추가하여 언제 이벤트가 실행되는지 확인
    if (!this.props.newTodo) { // 조건 비활성화를 위해 이 라인을 코멘트아웃

      /**
       * newTodo에 대한 설명
       *   이 앱의 경우 Header.js에서 무조건 newTodo 값을 true로 설정하여 TodoTextInput.js에 전달하고 있음.
       *   기초적인 앱이기에 TodoItem의 수정이라는 기능이 존재하지 않으므로 newTodo는 언제나 true가 됨.
       *   만약 이미 등록된 TodoItem의 수정이라는 기능이 존재한다면 newTodo 값은 true이거나 false가 될 수 있음.
       *   수정할 때에는 newTodo, id 라는 최소 두가지의 정보가 필요할 것으로 생각됨.
       */

      this.props.onSave(e.target.value)
    } // 조건 비활성화를 위해 이 라인을 코멘트아웃
  }

  render() {
    return (
      <input className={
        classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    )
  }
}
