import { useCallback, useMemo, useState } from 'react';
import useHabitStore, { Habit } from '../store/store';
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import HabitCalendar from './HabitCalendar';
import './styles.css';

const HabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];
  const [visibleCalendars, setVisibleCalendars] = useState<{ [key: string]: boolean }>({});

  const handleRemove = useCallback((id: string) => {
    removeHabit(id);
  }, [removeHabit]);

  const handleToggleComplete = useCallback((id: string) => {
    toggleHabit(id, today);
  }, [toggleHabit, today]);

  const toggleCalendarVisibility = (id: string) => {
    setVisibleCalendars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getStreak = useMemo(() => {
    return (habit: Habit) => {
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
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }} className="glowing-card">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid>
              <Typography variant="h6" className="glowing-text">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary" className="glowing-text">
                {habit.frequency}
              </Typography>
            </Grid>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color={habit.completedDates.includes(today) ? 'success' : 'primary'}
                onClick={() => handleToggleComplete(habit.id)}
                className="glowing-button"
              >
                {habit.completedDates.includes(today) ? 'Completed' : 'Mark Complete'}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(habit.id)}
                className="glowing-button"
              >
                Remove
              </Button>
            </Box>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography className="glowing-text">Current Streak: {getStreak(habit)}</Typography>
            <LinearProgress
              variant='determinate'
              value={(getStreak(habit) / 30) * 100}
              sx={{ mt: 1 }}
              className="glowing-progress"
            />
            <Button
              onClick={() => toggleCalendarVisibility(habit.id)}
              variant="text"
              className="calendar-toggle-button"
              sx={{ mt: 1 }}
            >
              {visibleCalendars[habit.id] ? "Hide Calendar" : "Show Calendar"}
            </Button>

            {visibleCalendars[habit.id] && (
              <Box sx={{ mt: 2 }}>
                <HabitCalendar completedDates={habit.completedDates} />
              </Box>
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
