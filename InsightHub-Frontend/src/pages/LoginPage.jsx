import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await api.post("/users/login", {
        email: email,
        password: password
      });
      const user = response.data;
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userFirstName", user.firstName);
      localStorage.setItem("userLastName", user.lastName);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role || "EMPLOYEE");
      localStorage.setItem("role", user.role || "EMPLOYEE");
      localStorage.setItem("userCreatedAt", user.createdAt || "");
      navigate("/dashboard");
    } catch (error) {
      setError("Kayıtlı olmayan kullanıcı. Lütfen ilk kayıt olunuz.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
      <Box sx={{ boxShadow: 3, p: 4, borderRadius: 3, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
          InsightHub'a Hoş Geldin
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Lütfen bilgilerinizi giriniz
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="E-posta Adresi"
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
          <Button variant="contained" color="primary" onClick={handleLogin} size="large">
            Giriş Yap
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate("/register") } size="large">
            Kayıt Ol
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
