import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem('userEmail');
  const role = localStorage.getItem('role')?.toLowerCase(); 

  const isDashboardRoute = location.pathname.startsWith('/dashboard') ||
                           location.pathname.startsWith('/data-entry') ||
                           location.pathname.startsWith('/my-feedbacks') ||
                           location.pathname.startsWith('/profile') ||
                           location.pathname.startsWith('/all-feedbacks');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static" color="primary" elevation={2} sx={{ borderRadius: 0, boxShadow: 2 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to={userEmail ? "/dashboard" : "/"}
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold', letterSpacing: 1 }}
          >
            InsightHub
          </Typography>

          {isDashboardRoute && userEmail && (
            <>
              {}
              {role === "ADMIN" && (
                <Button color="inherit" component={Link} to="/all-feedbacks">
                  Tüm Geri Bildirimler
                </Button>
              )}

              <AccountCircleIcon
                sx={{ cursor: 'pointer', fontSize: 32, mx: 2 }}
                onClick={() => navigate('/profile')}
              />
              <Button color="inherit" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            </>
          )}

          {!userEmail && (
            <>
              <Button color="inherit" component={Link} to="/">
                Giriş Yap
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Kayıt Ol
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
