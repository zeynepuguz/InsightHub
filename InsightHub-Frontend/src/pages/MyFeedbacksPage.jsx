import { useEffect, useState } from 'react';
import api from '../services/api';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import Alert from '@mui/material/Alert';

function MyFeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null); 

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError("");
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('Oturum süresi doldu. Lütfen tekrar giriş yapınız.');
          setLoading(false);
          return;
        }
        const response = await api.get(`/data_entries/user/${userId}`);
        setFeedbacks(response.data);
      } catch (err) {
        setError('Geri bildirimler alınırken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const toggleDetails = (id) => {
    setSelectedId(prev => (prev === id ? null : id)); 
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        Gönderdiğim Geri Bildirimler
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <List>
        {feedbacks.map(entry => (
          <Card
            key={entry.id}
            onClick={() => toggleDetails(entry.id)}
            sx={{ marginBottom: 2, cursor: "pointer" }}
          >
            <CardContent>
              <Typography variant="h6">{entry.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(entry.entryDate).toLocaleString()}
              </Typography>

              {selectedId === entry.id && (
                <Box mt={2}>
                  <Typography variant="body1">{entry.content}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
}

export default MyFeedbacksPage;
