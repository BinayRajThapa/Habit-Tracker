import { Container, Typography } from '@mui/material';
import './App.css'
import AddHabitForm from './components/add-habit-form';
import HabitList from './components/habit-list';
// import useHabitStore from './store/store';

function App() {

  // const store = useHabitStore();
  // console.log(store);


  return (
    <Container>
      <div>
        <Typography variant='h2' component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm/>
        <HabitList/>
      </div>
    </Container>
  );
}

export default App
