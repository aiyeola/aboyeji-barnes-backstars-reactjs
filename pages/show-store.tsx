import { useSelector } from 'react-redux';

const ShowReduxState = () => {
  const state = useSelector((state) => state);

  return (
    <pre>
      <code>{JSON.stringify(state, null, 4)}</code>
    </pre>
  );
};

export default ShowReduxState;
