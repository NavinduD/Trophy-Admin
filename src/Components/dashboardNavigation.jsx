import * as React from "react";
import {
  useLocation,
  Routes,
  Route
} from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleIcon from "@mui/icons-material/People";
import RedeemIcon from "@mui/icons-material/Redeem";
import ArticleIcon from "@mui/icons-material/Article";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuItem from "./menuitem";
import DashboardContent from "./dashboard/dashboardScreen.jsx";
import AdminRoles from "./dashboard/admin.jsx";
import CoinRedeemHistory from "./dashboard/coin.jsx";
import Blogs from "./dashboard/blog.jsx";
import Employees from "./dashboard/emplyee.jsx";
import AdminIntro from "./dashboard/admin-intro.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#fa9b46',
    },
    secondary: {
      main: '#02BA0F',
    }
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard/dashboard":
        return "Dashboard";
      case "/dashboard/employees":
        return "Employees";
      case "/dashboard/coin-redeem-history":
        return "Coin Redeem History";
      case "/dashboard/blogs":
        return "Blogs";
      case "/dashboard/admin-roles":
        return "Admin Roles";
      default:
        return "Admin Panel";
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {getTitle()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <MenuItem
              text="Dashboard"
              icon={<DashboardIcon />}
              open={open}
              selected={location.pathname === "/dashboard/dashboard"}
              link={"dashboard"}
            />
            <MenuItem
              text="Employees"
              icon={<PeopleIcon />}
              open={open}
              selected={location.pathname === "/dashboard/employees"}
              link={"employees"}
            />
            <MenuItem
              text="Coin Redeem History"
              icon={<RedeemIcon />}
              open={open}
              selected={location.pathname === "/dashboard/coin-redeem-history"}
              link={"coin-redeem-history"}
            />
            <MenuItem
              text="Blogs"
              icon={<ArticleIcon />}
              open={open}
              selected={location.pathname === "/dashboard/blogs"}
              link={"blogs"}
            />
            <MenuItem
              text="Admin Roles"
              icon={<AdminPanelSettingsIcon />}
              open={open}
              selected={location.pathname === "/dashboard/admin-roles"}
              link={"admin-roles"}
            />
          </List>
          <Divider />
          <div onClick={handleLogout}>
          <List>
            <MenuItem
              text="Logout"
              icon={<LogoutIcon />}
              open={open}
            />
          </List>
          </div>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route index element={<AdminIntro />} />
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="admin-roles" element={<AdminRoles />} />
            <Route path="coin-redeem-history" element={<CoinRedeemHistory />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="employees" element={<Employees />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
