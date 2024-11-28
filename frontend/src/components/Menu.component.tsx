import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  // Navigate to a different route
  const handleNavigate = (path: string) => {
    navigate(path);
    setOpenDrawer(false); // Close the drawer after navigation
  };

  const logout = () => {
    sessionStorage.removeItem("token")
    navigate('/')
  }

  const toggleDrawer = (open: boolean) => () => {
    setOpenDrawer(open);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo / Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => handleNavigate("/")}>
          Documentos {/* Updated name */}
        </Typography>

        {/* Menu items for larger screens */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button color="inherit" onClick={() => handleNavigate("/formEnvio")}>
            Adicionar Documento
          </Button>
          <Button color="inherit" onClick={() => handleNavigate("/lista")}>
            Documentos
          </Button>
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        </Box>

        {/* Hamburger icon for mobile */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer (Side Menu) for mobile */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <List>
          <ListItem component="button" onClick={() => handleNavigate("/formEnvio")}>
            <ListItemText primary="Adicionar Documento" />
          </ListItem>
          <ListItem component="button" onClick={() => handleNavigate("/lista")}>
            <ListItemText primary="Documentos" />
          </ListItem>
          <ListItem component="button" onClick={() => logout()}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Menu;
