import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.scss'
import { Fade, ListItem } from '@mui/material';

const pages = [{name: 'Announcements', label: 'announcement'}, {name: 'AddMember', label: 'addmember'}, {name: 'Attendance', label: 'attendance'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigateMenu = (route) => {
    handleCloseNavMenu()
    navigate(route)
  }

  // const handleUserMenu = (route) => {
  //   handleCloseUserMenu()
  //   navigate(route)
  // }

  return (
    <AppBar position="static" className={styles.navbarWrapper} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className={styles.logoTextBigScreen}
          >
            XFitness
          </Typography>

          <Box className={styles.menuTextHidden}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <ListItem key={page.label} className={styles.settingsMenuItems} onClick={() => handleNavigateMenu(page.label)}>
                    <Typography textAlign="center">{page.name}</Typography>
                </ListItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            className={styles.logoTextSmallScreen}
          >
            XFitness
          </Typography>
          <Box className={styles.menuText} >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigateMenu(page.label)}
                className={styles.menuButton}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box className={styles.settingsIcon}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              TransitionComponent={Fade}        
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className={styles.settingsMenu}
            >
              {settings.map((setting) => (
                <ListItem key={setting} className={styles.settingsMenuItems} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </ListItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
