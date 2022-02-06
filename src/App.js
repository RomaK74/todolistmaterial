import React, {useState} from 'react';
import {Paper, Divider, Button, List, Tabs, Tab, ListItem} from '@mui/material';
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
            ...state.filter(obj => obj.id !== action.payload.id)
        ]
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
            payload: {
                id
            }
        });
    }

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField addTask={addTask} />
                <Divider/>
                <Tabs value={0}>
                    <Tab label="Все"/>
                    <Tab label="Активные"/>
                    <Tab label="Завершённые"/>
                </Tabs>
                <Divider/>
                <List>
                    {
                        state.map(obj => (
                            <Item key={obj.id} id={obj.id} text={obj.text} completed={obj.completed} deleteTask={deleteTask}/>
                        ))
                    }
                </List>
                <Divider/>
                <div className="check-buttons">
                    <Button>Отметить всё</Button>
                    <Button>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
