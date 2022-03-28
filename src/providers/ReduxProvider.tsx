import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import { store } from 'app/store';

const ReduxProvider: FC<ReactNode> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
