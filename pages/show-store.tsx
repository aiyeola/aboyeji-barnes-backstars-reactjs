/**
 * This route is to show the shape of the redux state.
 */

import { useSelector } from 'react-redux';

const ShowReduxState = (): JSX.Element => {
  const state = useSelector((state) => state);

  return (
    <>
      <pre>
        <code>{JSON.stringify(state, null, 4)}</code>
      </pre>
    </>
  );
};

export default ShowReduxState;
