import React from 'react';
import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {AddField} from './components/AddField';
import {Item} from './components/Item';

function reducer(state, action) {
    if (action.type === 'ADD_TASK') {
        return [
            ...state,
            {
                id: state.length !== 0 ? state[state.length - 1].id + 1 : 1,
                text: action.payload.text,
                completed: action.payload.complete
            }
        ]
    }
    if (action.type === 'DELETE_TASK') {
        return [
            ...state.filter(obj => obj.id !== action.payload)
        ]
    }
    if (action.type === 'TOGGLE_COMPLETED') {
        return state.map(obj => {
            if (obj.id === action.payload) {
                return {
                    ...obj,
                    completed: !obj.completed
                }
            } else
                return obj;
        })
    }
    if (action.type === 'TOGGLE_ALL') {
        const isCompleted = state.find(obj => !obj.completed);
        return state.map(obj => {
                if (isCompleted) {
                    return {
                        ...obj,
                        completed: true,
                    }
                } else
                    return {
                        ...obj,
                        completed: false,
                    }
            }
        )
    }
    if (action.type === 'DELETE_ALL') {
        return [];
    }
    return state;
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, [{
        id: 1,
        text: 'Тестовая задача',
        completed: false
    },
        {
            id: 2,
            text: 'Задача №2',
            completed: true
        },
    ]);

    const [sort, setSort] = React.useState(0);
    const [toggleLabel, setToggleLabel] = React.useState('');

    React.useEffect(() => {
        if (state && state.find(obj => obj.completed === false)) {
            setToggleLabel('Отметить все')
        }
        else {
            setToggleLabel('Снять отметки')
        }
    }, [state]);

    const addTask = (text, complete) => {
        dispatch({
            type: 'ADD_TASK',
            payload: {
                text,
                complete
            }
        });
    }

    const deleteTask = (id) => {
        dispatch({
            type: 'DELETE_TASK',
            payload: id
        });
    }

    const deleteAll = () => {
        if (window.confirm('Удалить все задачи?')) {
            dispatch({
                type: 'DELETE_ALL',
            });
        }
    }

    const toggleCompleted = (id) => {
        dispatch({
            type: 'TOGGLE_COMPLETED',
            payload: id
        });
    }

    const toggleAll = () => {
        dispatch({
            type: 'TOGGLE_ALL',
        });
    }

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField addTask={addTask}/>
                <Divider/>
                <Tabs value={sort}>
                    <Tab label="Все" onClick={() => setSort(0)}/>
                    <Tab label="Активные" onClick={() => setSort(1)}/>
                    <Tab label="Завершённые" onClick={() => setSort(2)}/>
                </Tabs>
                <Divider/>
                <List>
                    {
                        sort === 0 && state.map(obj => (
                            <Item key={obj.id}
                                  id={obj.id}
                                  text={obj.text}
                                  completed={obj.completed}
                                  toggleCompleted={toggleCompleted}
                                  deleteTask={deleteTask}/>
                        ))
                    }
                    {
                        sort === 1 && state.filter(obj => !obj.completed).map(obj => (
                            <Item key={obj.id}
                                  id={obj.id}
                                  text={obj.text}
                                  completed={obj.completed}
                                  toggleCompleted={toggleCompleted}
                                  deleteTask={deleteTask}/>
                        ))
                    }
                    {
                        sort === 2 && state.filter(obj => obj.completed).map(obj => (
                            <Item key={obj.id}
                                  id={obj.id}
                                  text={obj.text}
                                  completed={obj.completed}
                                  toggleCompleted={toggleCompleted}
                                  deleteTask={deleteTask}/>
                        ))
                    }
                </List>
                <Divider/>
                <div className="check-buttons">
                    <Button onClick={toggleAll}>
                        {toggleLabel}
                    </Button>
                    <Button onClick={deleteAll}>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
