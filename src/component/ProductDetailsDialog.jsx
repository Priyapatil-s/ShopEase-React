
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';

function ProductDetailsDialog({
  open,
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) {
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    setSelectedImage(
      product?.images?.[0] || product?.thumbnail || ''
    );
  }, [product, open]);

  if (!product) {
    return null;
  }

  const images =
    product.images?.length > 0
      ? product.images
      : product.thumbnail
        ? [product.thumbnail]
        : [];

  const currentImage =
    selectedImage || product.thumbnail || '';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="product-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: { xs: 2, sm: 3 },
          m: { xs: 1, sm: 3 },
        },
      }}
    >
      {/* Popup header and close button */}
      <DialogTitle
        id="product-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          fontWeight: 700,
        }}
      >
        Product Details

        <IconButton
          onClick={onClose}
          aria-label="Close product details"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'minmax(0, 1fr) minmax(0, 1.1fr)',
            },
            gap: { xs: 3, sm: 4 },
          }}
        >
          {/* Product image gallery */}
          <Box>
            <Box
              sx={{
                height: { xs: 240, sm: 340 },
                bgcolor: '#f7f8f5',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {currentImage ? (
                <Box
                  component="img"
                  src={currentImage}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    p: 2,
                  }}
                />
              ) : (
                <Typography color="text.secondary">
                  Image not available
                </Typography>
              )}
            </Box>

            {/* Additional product images */}
            {images.length > 1 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 1.5,
                  overflowX: 'auto',
                  pb: 1,
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={`${image}-${index}`}
                    component="button"
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={currentImage === image}
                    sx={{
                      flex: '0 0 64px',
                      width: 64,
                      height: 64,
                      p: 0.5,
                      border: '2px solid',
                      borderColor:
                        currentImage === image
                          ? '#78A92E'
                          : '#e5e5e5',
                      borderRadius: 1.5,
                      bgcolor: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt=""
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          {/* Product information */}
          <Box>
            <Chip
              label={product.category || 'ShopEase Product'}
              size="small"
              sx={{
                bgcolor: '#edf5e3',
                color: '#537d28',
                fontWeight: 600,
                mb: 1.5,
                textTransform: 'capitalize',
              }}
            />

            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.3,
                mb: 1.5,
              }}
            >
              {product.title}
            </Typography>

            {/* Rating and reviews */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Rating
                value={Number(product.rating || 0)}
                precision={0.1}
                readOnly
                size="small"
              />

              <Typography variant="body2" color="text.secondary">
                {Number(product.rating || 0).toFixed(1)} / 5
              </Typography>
            </Stack>

            {/* Price */}
            <Typography
              variant="h4"
              sx={{
                color: '#638D30',
                fontWeight: 800,
                mb: 2,
              }}
            >
              ${Number(product.price).toFixed(2)}
            </Typography>

            {product.discountPercentage > 0 && (
              <Typography
                variant="body2"
                color="success.main"
                sx={{ mb: 2 }}
              >
                {Number(product.discountPercentage).toFixed(0)}% off
                the sample listing price
              </Typography>
            )}

            <Divider sx={{ mb: 2 }} />

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              Product Description
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.8, mb: 2.5 }}
            >
              {product.description || 'No description available.'}
            </Typography>

            {/* Availability */}
            {product.stock !== undefined && (
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                Availability:{' '}
                <Box
                  component="span"
                  sx={{
                    color: product.stock > 0
                      ? '#638D30'
                      : 'error.main',
                  }}
                >
                  {product.stock > 0
                    ? `${product.stock} units in sample stock`
                    : 'Out of stock'}
                </Box>
              </Typography>
            )}

            {/* Delivery details */}
            <Box
              sx={{
                bgcolor: '#f7f8f5',
                borderRadius: 2,
                p: 2,
                mt: 2,
                mb: 3,
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                🚚 Delivery Information
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {product.shippingInformation ||
                  'Delivery estimate will be confirmed at checkout.'}
              </Typography>

              {product.returnPolicy && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Returns: {product.returnPolicy}
                </Typography>
              )}
            </Box>

            {/* Action buttons */}
            <Stack
              spacing={1.5}
              direction={{ xs: 'column', sm: 'row' }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ShoppingCartOutlinedIcon />}
                disabled={product.stock === 0}
                onClick={() => onAddToCart?.(product)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  borderColor: '#78A92E',
                  color: '#638D30',
                  py: 1.2,
                }}
              >
                Add to Cart
              </Button>

              <Button
                fullWidth
                variant="contained"
                startIcon={<FlashOnOutlinedIcon />}
                disabled={product.stock === 0}
                onClick={() => onBuyNow?.(product)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  bgcolor: '#78A92E',
                  py: 1.2,
                  '&:hover': { bgcolor: '#638D30' },
                }}
              >
                Buy Now
              </Button>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
