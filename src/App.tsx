import { Container, Typography } from '@mui/material';
import './App.css'
import AddHabitForm from './components/add-habit-form';
import HabitList from './components/habit-list';

function App() {
  return (
    <Container>
      <Typography variant='h2' component="h1" gutterBottom align="center">
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
    </Container>
  );
}

export default App;
