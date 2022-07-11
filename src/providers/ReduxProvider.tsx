import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import { setupStore } from 'app/store';

const ReduxProvider: FC<ReactNode> = ({ children }) => {
  return <Provider store={setupStore()}>{children}</Provider>;
};

export default ReduxProvider;
