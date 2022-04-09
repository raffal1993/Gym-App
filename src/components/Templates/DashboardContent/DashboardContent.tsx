import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { FC, ReactNode } from 'react';
import { Wrapper } from './DashboardContent.styled';

interface DashboardContentProps {
  children: ReactNode;
}

const DashboardContent: FC<DashboardContentProps> = ({ children }) => {
  const { isSidebarHide } = useAppSelector((state: RootState) => state.interface);

  return <Wrapper is_sidebar_hide={isSidebarHide!.toString()}>{children}</Wrapper>;
};

export default DashboardContent;
