import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { BoxStyled, NavLinkStyled, PagesStyled, Wrapper } from './Navbar.styled';

const basicPages = [
  { name: 'Workout', path: 'workout' },
  { name: 'Food', path: 'food' },
  { name: 'Weather', path: 'weather' },
  { name: 'Profile', path: 'profile' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Wrapper>
      <PagesStyled>
        {basicPages.map(({ name, path }) => (
          <NavLinkStyled to={`${path}`} key={name} onClick={handleCloseNavMenu}>
            {name}
          </NavLinkStyled>
        ))}
      </PagesStyled>

      <BoxStyled>
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
          onClose={handleCloseNavMenu}
        >
          <PagesStyled is_hamburger_menu="true">
            {basicPages.map(({ name, path }) => (
              <NavLinkStyled is_hamburger_menu_element="true" to={`${path}`} key={name}>
                {name}
              </NavLinkStyled>
            ))}
          </PagesStyled>
        </Menu>
      </BoxStyled>
    </Wrapper>
  );
};
export default Navbar;
