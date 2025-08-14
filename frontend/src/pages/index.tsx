import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/ideas");
    }, 5000);
    return () => clearTimeout(timer); // limpa o timer se o componente desmontar
  }, [router]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Bem-vindo <WavingHandIcon fontSize="inherit" color="primary" />
        </Typography>
        <Typography variant="body1">
          Você será redirecionado para a página de ideias em instantes...
        </Typography>
      </Box>
    </Container>
  );
}