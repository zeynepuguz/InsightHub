import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    try {
      await api.post("/users/newUser", {
        firstName,
        lastName,
        email,
        password,
        role: "EMPLOYEE"
      });
      setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError("Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
      <Box sx={{ boxShadow: 3, p: 4, borderRadius: 3, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
          InsightHub'a Kayıt Ol
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Lütfen bilgilerinizi eksiksiz giriniz
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          label="Ad"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Soyad"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="E-posta"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Şifre"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleRegister} size="large">
            Kayıt Ol
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate("/")} size="large">
            Giriş Yap
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
