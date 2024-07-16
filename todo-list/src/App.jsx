import React, { useState } from 'react';
import TodoListTemplate from "./components/TodoListTemplate.jsx";
import Form from "./components/Form.jsx";
import TodoItemList from "./components/TodoItemList.jsx";

function App() {
    const [id, setId] = useState(3);
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([
            {
                id: 0, text: '리액트 예제 해보기', checked: false
            },
            {
                id: 1, text: 'TO DO LIST 만들기', checked: true
            },
            {
                id: 2, text: '리액트 공부', checked: false
            }
        ]);

    const handleChange = useCallback((e) => {
        setInput(e.target.value);
    },[]);

    const handleCreate = useCallback(() => {
        setTodos(todos.concat({
            id: id,
            text: input,
            checked: false
        }));
        setId(id+1);
        setInput('');
    },[input, todos, id]);

    const handleKeyPress = useCallback((e) => {
        if(e.key === 'Enter') {
            handleCreate();
        }
    }, [handleCreate]);

    const handleToggle = useCallback((id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ));
    },[todos]);

    const handleRemove = useCallback((id) => {
        setTodos(todos.filter(todo => todo.id !==id));
    },[todos]);

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

export default App;