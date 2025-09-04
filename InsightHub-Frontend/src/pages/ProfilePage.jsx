import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import api from '../services/api'; 

function ProfilePage() {
  const [firstName] = useState(localStorage.getItem('userFirstName') || '');
  const [lastName] = useState(localStorage.getItem('userLastName') || '');
  const [email] = useState(localStorage.getItem('userEmail') || '');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalı.');
      setSuccess('');
      return;
    }

    try {
      await api.put('/users/update-password', null, {
        params: {
          email: email,
          newPassword: password
        }
      });
      setSuccess('Şifreniz başarıyla güncellendi.');
      setError('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setError('Şifre güncellenemedi. Lütfen tekrar deneyin.');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          bgcolor: 'background.paper',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
        <Typography variant="h5" fontWeight="bold" color="primary" mb={1}>
          Profilim
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={2}>
          Kişisel bilgilerinizi görüntüleyin ve şifrenizi güncelleyin.
        </Typography>

        <TextField label="Ad" value={firstName} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        <TextField label="Soyad" value={lastName} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        <TextField label="E-posta" value={email} fullWidth margin="normal" InputProps={{ readOnly: true }} />

        <Box component="form" onSubmit={handlePasswordChange} sx={{ width: '100%', mt: 2 }}>
          <TextField
            label="Yeni Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1, width: '60%' }}
          >
            Şifreyi Güncelle
          </Button>
        </Box>

        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Container>
  );
}

export default ProfilePage;
