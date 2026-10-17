
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

function Product() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
//   const [visibleCount, setVisibleCount] = useState(4);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://dummyjson.com/products/category/groceries?limit=0'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch {
        setError(
          'Unable to load products. Please check your internet connection.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


const visibleProducts = products.slice(5, 9);
 
  {!loading && !error && products.length > 4 && (
  <Button
    component={Link}
    to="/dailyfreshessentials"
    variant="outlined"
    sx={{
      color: '#638D30',
      borderColor: '#82AE36',
      textTransform: 'none',
      fontWeight: 700,
      whiteSpace: 'nowrap',
      '&:hover': {
        borderColor: '#638D30',
        bgcolor: '#F4F8ED',
      },
    }}
  >
    Show More
  </Button>
)}
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
     
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'flex-end' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: '#78A92E',
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            SHOP BY CATEGORY
          </Typography>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              mt: 0.5,
            }}
          >
            Daily Fresh Essentials
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Fresh picks and everyday essentials for your home.
          </Typography>
        </Box>

        {!loading &&
          !error &&
            products.length && (
           <Button
  component={Link}
  to="/dailyfreshessentials"
  variant="outlined"
  sx={{
    color: '#638D30',
    borderColor: '#82AE36',
    textTransform: 'none',
    fontWeight: 700,
  }}
>
  Show More
</Button>
          )}
      </Box>

    
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
          <CircularProgress size={28} color="success" />
          <Typography>Loading fresh products...</Typography>
        </Box>
      )}

     
      {!loading && error && (
        <Alert severity="error">
          {error}
          <Button
            onClick={() => window.location.reload()}
            sx={{ ml: 1, textTransform: 'none' }}
          >
            Retry
          </Button>
        </Alert>
      )}

     
      {!loading && !error && products.length === 0 && (
        <Alert severity="info">
          No products found.
        </Alert>
      )}

     
      {!loading && !error && products.length > 0 && (
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
          {visibleProducts.map((product) => (
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
      )}

      {/* Product count */}
      {!loading && !error && products.length > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 3 }}
        >
          Showing {visibleProducts.length} of {products.length} products
        </Typography>
      )}
    </Container>
  );
}

export default Product;
