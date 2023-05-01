import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

interface SidebarProps {
  archives: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  title: string;
  customSx?: object;
}

export default function Sidebar(props: SidebarProps) {
  const { archives, description, social, title, customSx } = props;

  return (
    <Box sx={{ ...customSx }}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
          Archives
        </Typography>
        {archives.map((archive) => (
          <Link display="block" variant="body1" href={archive.url} key={archive.title}>
            {archive.title}
          </Link>
        ))}
      </Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Social
        </Typography>
        {social.map((network) => (
          <Link
            display="block"
            variant="body1"
            href="#"
            key={network.name}
            sx={{ mb: 0.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <network.icon />
              <span>{network.name}</span>
            </Stack>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
