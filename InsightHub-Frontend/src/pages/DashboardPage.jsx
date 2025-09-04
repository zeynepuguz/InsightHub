import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

function Dashboard() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedFirstName = localStorage.getItem("userFirstName");
    const storedLastName = localStorage.getItem("userLastName");

    if (storedEmail) {
      setFirstName(storedFirstName || "");
      setLastName(storedLastName || "");
    } else {
      setError("Lütfen giriş yapınız.");
      setTimeout(() => navigate("/"), 1500);
    }
  }, [navigate]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.default', borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight="600" color="text.primary">
          Hoş geldin, {firstName} {lastName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          InsightHub'a giriş yaptın. Sol menüden istediğin işlemi seçebilirsin!
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Container>
  );
}

export default Dashboard;
