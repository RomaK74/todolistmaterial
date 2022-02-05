import React from 'react';
import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {AddField} from './components/AddField';
import {Item} from './components/Item';


function App() {
    const [taskText, setTaskText] = React.useState('');
    const [taskComplete, setTaskComplete] = React.useState(false);
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

    function reducer(state, action) {
        console.log(state);
        if (action.type === 'ADD_TASK') {
            return [
                ...state,
                {
                    id: state[state.length - 1].id + 1,
                    text: taskText,
                    completed: taskComplete
                }
            ]
        }
        return state;
    }

    const addTask = async () => {
        await dispatch({
            type: 'ADD_TASK'
        });
        setTaskText('');
        setTaskComplete(false);
    }

    const changeTaskText = (e) => {
        setTaskText(e.target.value);
    }

    const changeTaskComplete = () => {
        setTaskComplete(!taskComplete);
    }

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField changeTaskComplete={changeTaskComplete} addTask={addTask} taskComplete={taskComplete}
                          taskText={taskText} changeTaskChange={changeTaskText}/>
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
                            <Item key={obj.id} text={obj.text} completed={obj.completed}/>
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
