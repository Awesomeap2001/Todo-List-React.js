import React, { useRef, useState } from 'react'
import './Todo.css'

const Todo = () => {
    const [todoList, setTodoList] = useState([])
    const inputRef = useRef()

    const addTodo = () => {
        setTodoList([...todoList, { task: inputRef.current.value, completed: false }])
    }

    const completeTodo = (id) => {
        const updatedTodo = todoList.map((item, index) => {
            if (index === id) {
                item.completed = !item.completed
            }
            return item
        })

        setTodoList(updatedTodo)
    }

    const deleteTodo = (id) => {
        setTodoList((todoList) => todoList.filter((item, index) => index !== id))
    }

    return (
        <div className='todo'>
            <h1>Todo List</h1>

            <div className="todo-input">
                <input type="text" placeholder='Add your Task' ref={inputRef} />
                <button onClick={addTodo}>Add</button>
            </div>

            <div className="all-todo-list">
                {
                    todoList.map((item, index) => (
                        <TodoListItem
                            key={index}
                            item={item}
                            deleteTodo={() => deleteTodo(index)}
                            completeTodo={() => completeTodo(index)}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Todo


export const TodoListItem = ({ item, deleteTodo, completeTodo }) => {
    return (
        <div className='list-item'>
            <div className='list-item-content' onClick={completeTodo}>
                <button>{item.completed ? "✔️" : ""}</button>
                <p className={`${item.completed ? "completed" : ""}`}>{item.task}</p>
            </div>
            <button className='delete' onClick={deleteTodo}>❌</button>
        </div>
    )
}
