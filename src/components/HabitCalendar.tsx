import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HabitCalendar.css'; 

interface HabitCalendarProps {
  completedDates: string[];
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({ completedDates }) => {
  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split('T')[0];
    return completedDates.includes(dateString) ? 'highlighted' : null;
  };

  return (
    <div className="calendar-container">
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default HabitCalendar;
