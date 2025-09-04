import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function AboutPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 5, borderRadius: 4, bgcolor: 'background.paper', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <InfoIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
        <Typography variant="h5" fontWeight="bold" color="primary" mb={1}>
          InsightHub Hakkında
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          InsightHub, şirket içi çalışanların geri bildirimlerini kolayca iletebileceği, modern ve kullanıcı dostu bir platformdur. Tüm geri bildirimleriniz güvenle saklanır ve yöneticiler tarafından değerlendirilir.
        </Typography>
        <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
          <Typography variant="subtitle1" color="primary" fontWeight="bold" mb={1}>Vizyonumuz</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Çalışanların sesini duyurabildiği, şeffaf ve yenilikçi bir iş ortamı oluşturmak.
          </Typography>
          <Typography variant="subtitle1" color="primary" fontWeight="bold" mb={1}>Misyonumuz</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Geri bildirim kültürünü yaygınlaştırarak şirket içi gelişimi desteklemek.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <PhoneIcon color="primary" />
            <Typography variant="body2">0 (212) 123 45 67</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <EmailIcon color="primary" />
            <Typography variant="body2">info@insighthub.com</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="body2">İstanbul, Türkiye</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default AboutPage; 