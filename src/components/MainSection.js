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

     /**
      * TodoItem에서 MainSection으로 넘어온 후 이쪽을 확인한다.
      * TodoItem에 넘기고 있는 값으로 key, todo, ...actions 가 있음을 확인한다.
      * TodoItem으로 넘겨야할 4가지의 프로퍼티에는 todo, editTodo, deleteTodo, completeTodo가 있고, 이 4개는 필수적으로 전달해야 하였다.
      * 그렇다면 ...actions에 editTodo, deleteTodo, completeTodo가 있다고 생각하여야한다.
      * actions의 내용을 확인하기 위해 MainSection의 변수 혹은 프로퍼티를 확인하자.
      *
      * render() 함수의 내부에서 const { todos, actions } = this.props 를 통해 actions는 this.props에서 값을 가져왔다는 것을 확인 가능.
      * propTypes에서 actions를 확인할 수 있으므로, MainSection을 렌더링하는 App자체를 확인할 필요가 있다.
      */
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
