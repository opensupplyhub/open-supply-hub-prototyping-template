import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Prototyping Template" },
    {
      name: "description",
      content: "Fork the repository to start prototyping with this template.",
    },
  ];
}

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Prototyping Template
        </Typography>
        <Typography
          component="p"
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Fork this repository on GitHub (or your Git host) to create your own
          copy, then clone it locally and run the dev server to get started.
        </Typography>
      </Container>
    </Box>
  );
}
