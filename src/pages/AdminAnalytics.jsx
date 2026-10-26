
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import { PieChart } from '@mui/x-charts/PieChart';

function AdminAnalytics() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f7f8fa',
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Dashboard Heading */}
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 800, mb: 1 }}
      >
        Analytics Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Overview of ShopEase product categories
      </Typography>

      {/* Category Distribution Chart */}
      <Card
        sx={{
          maxWidth: 650,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Product Category Distribution
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Demo data — we will connect the API next.
          </Typography>

          <PieChart
            height={320}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: 12,
                    label: 'Groceries',
                  },
                  {
                    id: 1,
                    value: 18,
                    label: 'Fashion',
                  },
                  {
                    id: 2,
                    value: 8,
                    label: 'Home Décor',
                  },
                ],
                innerRadius: 45,
                outerRadius: 105,
                paddingAngle: 3,
                cornerRadius: 4,
              },
            ]}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminAnalytics;
