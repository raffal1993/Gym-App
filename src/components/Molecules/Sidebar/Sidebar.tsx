import { useState } from 'react';
import { auth } from 'firebase-cfg/firebase-config';
import ListItemText from '@mui/material/ListItemText';
import { RootState } from 'app/store';
import { useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { ListItemButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  SidebarListStyled,
  LogoutButtonStyled,
  WelcomeLogoStyled,
  Wrapper,
} from './Sidebar.styled';

const SidebarElements = ['Poniedziałek', 'Środa', 'Piątek', 'fdsgjkhsdgjk'];

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const userEmail = useAppSelector((state: RootState) => state.user.email);

  const navigate = useNavigate();

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <Wrapper>
      <WelcomeLogoStyled is_email_long={userEmail && userEmail?.length > 12 ? 'true' : 'false'}>
        <span>Welcome</span>
        <h4>{userEmail}</h4>
        <LogoutButtonStyled onClick={handleLogout}>
          <KeyboardBackspaceIcon />
          <p>logout</p>
        </LogoutButtonStyled>
      </WelcomeLogoStyled>
      <SidebarListStyled>
        {SidebarElements.map((el, index) => (
          <ListItemButton
            key={`${el + index}`}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <div className="listNumber">{index + 1}</div>
            <ListItemText primary={el} />
          </ListItemButton>
        ))}
      </SidebarListStyled>
    </Wrapper>
  );
}
