
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
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

import ProductDetailsDialog from '../component/ProductDetailsDialog';

const FASHION_CATEGORIES = [
  'tops',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
  'sunglasses',
];

function Fashion() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchFashionProducts = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/products?limit=0'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch fashion products');
        }

        const data = await response.json();

        setProducts(
          (data.products || []).filter((product) =>
            FASHION_CATEGORIES.includes(product.category)
          )
        );
      } catch {
        setError('Unable to load fashion products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFashionProducts();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#78A92E',
            fontWeight: 700,
            letterSpacing: 1.5,
          }}
        >
          SHOPESASE COLLECTION
        </Typography>

        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 800, mt: 0.5 }}
        >
          Fashion & Accessories
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Discover clothing, shoes, bags and accessories.
        </Typography>
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
          <CircularProgress color="success" />
          <Typography>Loading fashion collection...</Typography>

        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">{error}</Alert>
      )}

      {!loading && !error && products.length === 0 && (
        <Alert severity="info">No fashion products found.</Alert>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Showing {products.length} fashion products
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
                onClick={() => setSelectedProduct(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedProduct(product);
                  }
                }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #eeeeee',
                  borderRadius: 2,
                  boxShadow: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  },
                  transition: 'all 200ms ease',
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
                    sx={{ fontWeight: 700 }}
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
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, color: '#638D30' }}>
                      ${Number(product.price).toFixed(2)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      ★ {Number(product.rating || 0).toFixed(1)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}

      <ProductDetailsDialog
        open={Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Container>
  );
}

export default Fashion;
