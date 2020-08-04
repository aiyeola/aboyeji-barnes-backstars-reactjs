import React from 'react';

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask
}) {
  return (
    <div style={{}} className="container  bg-black ">
      <input type="text" value={title} readOnly={true} />
      <div className="m-top-3">jbkfb</div>
    </div>
  );
}
