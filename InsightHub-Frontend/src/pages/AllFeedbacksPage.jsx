import { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Typography, Card, CardContent, Alert, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AllFeedbacksPage() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const fetchFeedbacks = async (start, end) => {
    try {
      let res;
      if (start && end) {
        res = await api.get(`/data_entries/date-range?startDate=${start}&endDate=${end}`);
      } else {
        res = await api.get('/data_entries');
      }
      setEntries(res.data.sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate)));
      setError("");
    } catch (err) {
      setError("Veriler alınamadı.");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/dashboard");
      return;
    }
    fetchFeedbacks();
  }, []);

  const handleDateFilter = () => {
    if (startDate && endDate) {
      fetchFeedbacks(startDate, endDate);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Tüm Geri Bildirimler</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Başlangıç Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <TextField
          label="Bitiş Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <Button variant="contained" onClick={handleDateFilter}>Filtrele</Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {entries.map(entry => (
        <Card key={entry.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{entry.title}</Typography>
            <Typography>{entry.content}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Gönderen: {entry.user?.firstName} {entry.user?.lastName} ({entry.user?.email})
            </Typography>
            <Typography variant="caption">Tarih: {entry.entryDate}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default AllFeedbacksPage;
