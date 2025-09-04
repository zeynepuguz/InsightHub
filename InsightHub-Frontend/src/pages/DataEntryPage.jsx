import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function DataEntryPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  if (!userEmail || !userId) {
    setError("Oturum süresi doldu. Lütfen tekrar giriş yapınız.");
    setTimeout(() => navigate("/"), 1500);
    return;
  }

  try {
    await api.post("/data_entries", {
      title: title,
      content: description,
      user: {
        id: Number(userId),
        email: userEmail
      }
    });

    setSuccess("Veri başarıyla kaydedildi!");
    setTitle("");
    setDescription("");
    setTimeout(() => navigate("/dashboard"), 1500);
  } catch (error) {
    console.error("Sunucu Hatası:", error.response?.data || error.message);
    setError("Veri kaydedilirken hata oluştu.");
  }
};


  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
      <Box sx={{ boxShadow: 3, p: 4, borderRadius: 3, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
          Yeni Veri Girişi
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField 
            
            label="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, width: '60%' }}
          >
            Kaydet
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default DataEntryPage;
