
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
  Button,
} from '@mui/material';

function DailyFreshEssentials() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/products/category/groceries?limit=0'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch {
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#78A92E',
            fontWeight: 700,
            letterSpacing: 1.5,
          }}
        >
          SHOPESASE MARKETPLACE
        </Typography>

        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 800, mt: 0.5 }}
        >
          Daily Fresh Essentials
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Explore our complete collection of grocery products.
        </Typography>
      </Box>

      {/* Loading */}
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            py: 8,
          }}
        >
          <CircularProgress color="success" />
          <Typography>Loading all products...</Typography>
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Alert severity="error">{error}</Alert>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <Alert severity="info">No products found.</Alert>
      )}

      {/* Products */}
      {!loading && !error && products.length > 0 && (
        <>
          {/* Product Count + Back Button in One Row */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Typography color="text.secondary">
              {products.length} products available
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="outlined"
              sx={{
                color: '#638D30',
                borderColor: '#82AE36',
                textTransform: 'none',
                fontWeight: 700,
              }}
            >
              Back To Home
            </Button>
          </Box>

          {/* Responsive Product Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                md: 'repeat(4, minmax(0, 1fr))',
              },
              gap: { xs: 1.5, sm: 2.5 },
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #eeeeee',
                  borderRadius: 2,
                  boxShadow: 'none',
                  overflow: 'hidden',
                  transition:
                    'transform 200ms ease, box-shadow 200ms ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                  sx={{
                    height: { xs: 140, sm: 190 },
                    objectFit: 'contain',
                    p: 1.5,
                    bgcolor: '#fafbf8',
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 1.5, sm: 2 },
                    '&:last-child': { pb: 2 },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Box
                    sx={{
                      mt: 'auto',
                      pt: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: '#638D30',
                      }}
                    >
                      ${Number(product.price).toFixed(2)}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      ★ {Number(product.rating || 0).toFixed(1)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}

export default DailyFreshEssentials;
