import React, {Component, PropTypes} from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'

 const TODO_FILTERS = {
   SHOW_ALL: () => true,
   SHOW_ACTIVE: todo => !todo.completed,
   SHOW_COMPLETED: todo => todo.completed
 }

 export default class MainSection extends Component {
   static propTypes = {
     todos: PropTypes.array.isRequired,
     actions: PropTypes.object.isRequired
   }

   state = { filter: 'SHOW_ALL' }

   handleClearCompleted = () => {
     this.props.actions.clearCompleted()
   }

   handleShow = filter => {
     this.setState({ filter })
   }

   renderToggleAll(completedCount) {
     const { todos, actions } = this.props
     if (todos.length > 0) {
       return (
         <input
           className="toggle-all"
           type="checkbox"
           checked={completedCount === todos.length}
           onChange={actions.completeAll}
         />
       )
     }
   }

   renderFooter(completedCount) {
     const { todos } = this.props
     const { filter } = this.state
     const activeCount = todos.length - completedCount

     if (todos.length) {
       return (
         <Footer
           completedCount={completedCount}
           activeCount={activeCount}
           filter={filter}
           onClearCompleted={this.handleClearCompleted.bind(this)}
           onShow={this.handleShow.bind(this)} />
       )
     }
   }

   render() {
     const { todos, actions } = this.props
     const { filter } = this.state

     const filteredTodos = todos.filter(TODO_FILTERS[filter])
     /**
      * Array.prototype.reduce란? 배열의 각 요소에 대해 주어진 리듀서 함수를 실행하고, 하나의 결과값을 반환
      *   구문 => arr.reduce(callback[, initialValue])
      * 참고 링크 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
      *
      * 해설:
      *   reduce의 첫번째 매개변수는 리듀서 콜백함수, 두번째 매개변수는 초기값을 의미.
      *   밑의 코드에서
      *     리듀서 callback 함수는 (count, todo) => { return todo.completed ? count + 1 : count }이고
      *     초기값은 0 임.
      *   결론만 얘기하자면 사실 두번째 매개변수 0 은 없어도 결과가 같음.
      */
     const completedCount = todos.reduce((count, todo) => {
       return todo.completed ? count + 1 : count
     }, 0)

     return (
       <section className="main">
         {this.renderToggleAll(completedCount)}
         <ul className="todo-list">
           {filteredTodos.map(todo =>
             <TodoItem key={todo.id} todo={todo} {...actions} />
           )}
         </ul>
         {this.renderFooter(completedCount)}
       </section>
     )
   }
 }
