import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.default',
        borderTop: '1px solid #e0e0e0',
        py: 3,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" gutterBottom>
          © {new Date().getFullYear()} InsightHub | Tel: 0 (212) 123 45 67 | E-posta: info@insighthub.com
        </Typography>
        <Link component="button" variant="body2" onClick={() => navigate('/about')} sx={{ textDecoration: 'none' }}>
          Hakkında
        </Link>
      </Container>
    </Box>
  );
}

export default Footer; 