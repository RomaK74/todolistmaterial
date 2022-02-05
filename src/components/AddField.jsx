import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({changeTaskComplete, addTask, taskComplete, taskText, changeTaskChange}) => {
  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={taskComplete}
        onClick={changeTaskComplete}
      />
      <TextField value={taskText} onChange={(e) => changeTaskChange(e)} placeholder="Введите текст задачи..." variant="standard" fullWidth />
      <Button onClick={addTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
