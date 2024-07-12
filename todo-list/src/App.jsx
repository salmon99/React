// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import TodoListTemplate from "./components/TodoListTemplate.jsx";
import Form from "./components/Form.jsx";
import TodoItemList from "./components/TodoItemList.jsx";

function App() {
    let id = 3

    const state = {
        input: '',
        todos: [
            {
                id: 0, text: '리액트 예제 해보기', checked: false
            },
            {
                id: 1, text: 'TO DO LIST 만들기', checked: true
            },
            {
                id: 2, text: '리액트 공부', checked: false
            }
        ]
    }

    const handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    const handleCreate = () =>{
        const { input, todos } = this.state;
        this.setState({
            input: '',
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        })
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    const handleToggle = (id) => {
        const { todos } = this.state;

        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];
        const nextTodos = [...todos];

        nextTodos[index]={
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        })
    }

    const handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
            }
        )
    }

    render() {
        const { input, todos } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;

        return (
            <TodoListTemplate form={<Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            />}>
                <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}></TodoItemList>
            </TodoListTemplate>
        );
    }
}

export default App;