import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { auth } from 'firebase-cfg/firebase-config';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { v4 as uuid4 } from 'uuid';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setMainPage, setSidebarList } from 'app/slices/pagesSlice';
import { setEditMode } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import {
  HamburgerStyled,
  LogoutButtonStyled,
  NavLinkStyled,
  PagesStyled,
  WelcomeLogoStyled,
  Wrapper,
} from './Navbar.styled';

const basicPages = [
  { name: 'Workout', path: 'workout' },
  { name: 'Food', path: 'food' },
  { name: 'Weather', path: 'weather' },
  { name: 'Profile', path: 'profile' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    user: { email: userEmail },
    interface: { isSidebarHide },
    pages: { mainPage },
  } = useAppSelector((state: RootState) => state);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleNavMenu = (path: string, isHamburger = false) => {
    dispatch(setSidebarList([]));
    dispatch(setMainPage(path));
    dispatch(setEditMode(false));
    if (isHamburger) setAnchorElNav(null);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    if (!mainPage) {
      navigate('/dashboard/profile');
      dispatch(setMainPage('profile'));
    }
  }, [navigate, mainPage, dispatch]);

  return (
    <Wrapper>
      <WelcomeLogoStyled
        is_sidebar_hide={isSidebarHide!.toString()}
        is_email_long={userEmail && userEmail?.length > 12 ? 'true' : 'false'}
      >
        <span>Welcome</span>
        <h1>{userEmail}</h1>
        <LogoutButtonStyled is_sidebar_hide={isSidebarHide!.toString()} onClick={handleLogout}>
          <KeyboardBackspaceIcon />
          <p>logout</p>
        </LogoutButtonStyled>
      </WelcomeLogoStyled>
      <PagesStyled>
        {basicPages.map(({ name, path }) => (
          <NavLinkStyled to={`${path}`} key={uuid4()} onClick={() => handleNavMenu(path)}>
            {name}
          </NavLinkStyled>
        ))}
      </PagesStyled>

      <HamburgerStyled>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="menu-appbar"
          anchorEl={anchorElNav}
          keepMounted
          open={Boolean(anchorElNav)}
          onClose={() => setAnchorElNav(null)}
        >
          <PagesStyled is_hamburger_menu="true">
            {basicPages.map(({ name, path }) => (
              <NavLinkStyled
                onClick={() => handleNavMenu(path, true)}
                is_hamburger_menu_element="true"
                to={`${path}`}
                key={uuid4()}
              >
                {name}
              </NavLinkStyled>
            ))}
          </PagesStyled>
        </Menu>
      </HamburgerStyled>
    </Wrapper>
  );
};
export default Navbar;
