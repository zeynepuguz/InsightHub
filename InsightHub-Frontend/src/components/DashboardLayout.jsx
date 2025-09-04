import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Geri Bildirim Gönder', icon: <SendIcon />, path: '/data-entry' },
  { text: 'Geri Bildirimlerim', icon: <ListAltIcon />, path: '/my-feedbacks' },
  { text: 'Profilim', icon: <PersonIcon />, path: '/profile' },
];

function DashboardLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role')?.toLowerCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh'}}>
      <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.default', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary', letterSpacing: 1, cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            InsightHub
          </Typography>
          <AccountCircleIcon sx={{ cursor: 'pointer', fontSize: 32, mr: 1, color: 'text.secondary' }} onClick={() => navigate('/profile')} />
          <Button variant="outlined" color="primary" onClick={handleLogout}>Çıkış Yap</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)} sx={{ color: '#d1d5db', '&:hover': { color: 'white' } }}>
                  <ListItemIcon sx={{ color: '#9ca3af' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            {}
            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                const role = localStorage.getItem('role');
                if (role === 'ADMIN') {
                  navigate('/all-feedbacks');
                } else {
                  alert('Sadece adminler tüm geri bildirimleri görebilir!');
                  navigate('/dashboard');
                }
              }} sx={{ color: '#d1d5db', '&:hover': { color: 'white' } }}>
                <ListItemIcon sx={{ color: '#9ca3af' }}><ListAltIcon /></ListItemIcon>
                <ListItemText primary="Tüm Geri Bildirimler" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout; 