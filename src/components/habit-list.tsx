import { useCallback } from 'react';
import useHabitStore, { Habit } from '../store/store';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';

const HabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];

  const handleRemove = useCallback((id: string) => {
    removeHabit(id);
  }, [removeHabit]);

  const handleToggleComplete = useCallback((id: string) => {
    toggleHabit(id, today);
  }, [toggleHabit, today]);

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];

      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color={habit.completedDates.includes(today) ? 'success' : 'primary'}
                onClick={() => handleToggleComplete(habit.id)}
              >
                {habit.completedDates.includes(today) ? 'Completed' : 'Mark Complete'}
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleRemove(habit.id)}>
                Remove
              </Button>
            </Box>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography> Current Streak: {getStreak(habit)} </Typography>
            <LinearProgress
              variant='determinate'
              value={(getStreak(habit) / 30) * 100}
              sx={{ mt: 1 }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
