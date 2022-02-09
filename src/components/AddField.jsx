import {TextField, Button, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';

export const AddField = ({addTask}) => {
    const [taskText, setTaskText] = React.useState('');
    const [taskComplete, setTaskComplete] = React.useState(false);

    const changeTaskText = (e) => {
        setTaskText(e.target.value);
    }

    const changeTaskComplete = () => {
        setTaskComplete(!taskComplete);
    }

    const onClickAdd = () => {
        addTask(taskText, taskComplete);
        setTaskComplete(false);
        setTaskText('');
    }

    return (
        <div className="field">
            <Checkbox
                className="checkbox"
                icon={<RadioButtonUncheckedIcon/>}
                checkedIcon={<CheckCircleIcon/>}
                checked={taskComplete}
                onClick={changeTaskComplete}
            />
            <TextField value={taskText} onChange={(e) => changeTaskText(e)} placeholder="Введите текст задачи..."
                       variant="standard" fullWidth/>
            <Button onClick={onClickAdd}>
                <AddIcon/>
            </Button>
        </div>
    );
};
