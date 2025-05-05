import { Container, Typography } from '@mui/material';
import './App.css'
import AddHabitForm from './components/add-habit-form';
import HabitList from './components/habit-list';
import StreakLineChart from './components/StreakLineChart'; 

function App() {
  return (
    <Container>
      <Typography variant='h2' component="h1" gutterBottom align="center">
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
      <StreakLineChart /> 
    </Container>
  );
}

export default App;
