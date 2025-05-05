import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useMemo } from 'react';
import useHabitStore from '../store/store';
import { Box, Typography } from '@mui/material';


const calculateStreak = (completedDates: string[], upToDate: string): number => {
  let streak = 0;
  const date = new Date(upToDate);

  while (true) {
    const dateString = date.toISOString().split("T")[0];
    if (completedDates.includes(dateString)) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

const StreakLineChart = () => {
  const { habits } = useHabitStore();

  const chartData = useMemo(() => {
    const uniqueDatesSet = new Set<string>();
    habits.forEach(habit => habit.completedDates.forEach(date => uniqueDatesSet.add(date)));

    const uniqueDates = Array.from(uniqueDatesSet).sort();

    return uniqueDates.map(date => {
      const totalStreak = habits.reduce((acc, habit) => {
        return acc + calculateStreak(habit.completedDates, date);
      }, 0);

      return {
        date,
        streak: totalStreak,
      };
    });
  }, [habits]);

  if (chartData.length === 0) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        🔥 Total Streak Progress 
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="streak" stroke="#f48fb1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StreakLineChart;
