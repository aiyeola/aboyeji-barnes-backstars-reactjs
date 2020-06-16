// import React from 'react';
// import { action } from '@storybook/addon-actions';

// import Task from '../components/test';

// export default {
//   component: Task,
//   title: 'Task',
//   // Our exports that end in "Data" are not stories.
//   excludeStories: /.*Data$/
// };

// export const taskData = {
//   id: '1',
//   title: 'Test Task',
//   state: 'TASK_INBOX',
//   updatedAt: new Date(2018, 0, 1, 9, 0)
// };

// export const actionsData = {
//   onPinTask: action('onPinTask'),
//   onArchiveTask: action('onArchiveTask')
// };

// export const Default = () => <Task task={{ ...taskData }} {...actionsData} />;

// export const Pinned = () => (
//   <Task task={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />
// );

// export const Archived = () => (
//   <Task task={{ ...taskData, state: 'TASK_ARCHIVED' }} {...actionsData} />
// );

import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
  title: 'Storybook Knobs',
  decorators: [withKnobs]
};
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.

// Knobs for React props
export const withAButton = () => (
  <button disabled={boolean('Disabled', false)}>
    {text('Label', 'Hello Storybook')}
  </button>
);

// Knobs as dynamic variables.
export const asDynamicVariables = () => {
  const name = text('Name', 'James');
  const age = number('Age', 35);
  const content = `I am ${name} and I'm ${age} years old.`;

  return <div>{content}</div>;
};
