import React, { memo } from "react";

const ReminderCard = memo(({ title, time, type }) => {
  return (
    <div className="reminder-card">
      <h3>{title}</h3>
      <p>Hora: {time}</p>
      <p>Tipo: {type}</p>
    </div>
  );
});

ReminderCard.displayName = 'ReminderCard';

export default ReminderCard;
