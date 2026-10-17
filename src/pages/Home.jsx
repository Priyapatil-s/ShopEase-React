
import { useState } from 'react';

import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Link } from 'react-router-dom';

const slides = [
  {
    eyebrow: 'FRESH FINDS',
    title: 'Freshness for Every Day.',
    subtitle:
      'Bring home fresh vegetables and everyday essentials.',
    buttonText: 'Shop Fresh',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85',
  },
  {
    eyebrow: 'FASHION & ACCESSORIES',
    title: 'Find Your Everyday Style.',
    subtitle:
      'Discover clothing, bags and accessories you will love.',
    buttonText: 'Explore Fashion',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85',
  },
  {
    eyebrow: 'HOME DÉCOR',
    title: 'Make Your Space Yours.',
    subtitle:
      'Discover beautiful details to refresh your living space.',
    buttonText: 'Explore Home Décor',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
  },
];

const offers = [
  {
    discount: '50% OFF',
    title: 'Home Décor',
    description: 'Refresh your favourite spaces.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  },
  {
    discount: '70% OFF',
    title: 'Fashion & Accessories',
    description: 'A fresh look for every occasion.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85',
  },
  {
    discount: 'UP TO 30% OFF',
    title: 'Fresh Finds',
    description: 'Everyday essentials, better value.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85',
  },
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = slides[activeSlide];

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const showPrevious = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  return (
    <>
      {/* HERO CAROUSEL */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '55vh', sm: '50vh' },
          minHeight: { xs: 380, sm: 360 },
          maxHeight: { xs: 460, sm: 520 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: '#243027',
          color: '#fff',
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={slide.title}
            component="img"
            src={slide.image}
            alt=""
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: activeSlide === index ? 1 : 0,
              transition: 'opacity 600ms ease-in-out',
            }}
          />
        ))}

        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(15,25,20,0.82), rgba(15,25,20,0.25))',
          }}
        />

        {/* Banner content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            aria-live="polite"
            sx={{
              maxWidth: 650,
              py: { xs: 4, md: 6 },
              textAlign: { xs: 'center', md: 'left' },
              mx: { xs: 'auto', md: 0 },
            }}
          >
            <Typography
              sx={{
                color: '#BDE477',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: 2,
                mb: 1.5,
              }}
            >
              {currentSlide.eyebrow}
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: '2rem',
                  sm: '3rem',
                  md: '3.8rem',
                },
                fontWeight: 800,
                lineHeight: 1.12,
                mb: 2,
              }}
            >
              {currentSlide.title}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.9rem', sm: '1.05rem' },
                lineHeight: 1.7,
                maxWidth: 520,
                mx: { xs: 'auto', md: 0 },
                mb: 3,
              }}
            >
              {currentSlide.subtitle}
            </Typography>

            <Button
              component={Link}
              to="/products"
              variant="contained"
              endIcon={<ChevronRightIcon />}
              sx={{
                bgcolor: '#82AE36',
                px: 3,
                py: 1.3,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { bgcolor: '#6C9528' },
              }}
            >
              {currentSlide.buttonText}
            </Button>
          </Box>
        </Container>

        {/* Previous button */}
        <IconButton
          onClick={showPrevious}
          aria-label="Previous slide"
          sx={{
            position: 'absolute',
            zIndex: 2,
            left: { xs: 5, sm: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.9)',
            color: '#263328',
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Next button */}
        <IconButton
          onClick={showNext}
          aria-label="Next slide"
          sx={{
            position: 'absolute',
            zIndex: 2,
            right: { xs: 5, sm: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.9)',
            color: '#263328',
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Slide indicators */}
        <Box
          sx={{
            position: 'absolute',
            zIndex: 2,
            bottom: 18,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1.5,
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={slide.title}
              component="button"
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              onClick={() => setActiveSlide(index)}
              sx={{
                width: activeSlide === index ? 28 : 10,
                height: 10,
                p: 0,
                border: 0,
                borderRadius: 5,
                cursor: 'pointer',
                bgcolor:
                  activeSlide === index ? '#BDE477' : '#FFFFFF',
                opacity: activeSlide === index ? 1 : 0.65,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* SPECIAL OFFERS SECTION */}
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 6 } }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              color: '#78A92E',
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: '0.8rem',
            }}
          >
            SHOPESASE SPECIALS
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 800, mt: 1 }}
          >
            Offers You’ll Love
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Discover something special for every part of your life.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2.5,
          }}
        >
          {offers.map((offer) => (
            <Box
              key={offer.title}
              sx={{
                position: 'relative',
                minHeight: 280,
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                p: { xs: 2.5, md: 3 },
                color: '#fff',
                backgroundImage: `
                  linear-gradient(
                    0deg,
                    rgba(0,0,0,0.82) 0%,
                    rgba(0,0,0,0.05) 100%
                  ),
                  url("${offer.image}")
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 250ms ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: '#D0F29B',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    mb: 0.5,
                  }}
                >
                  {offer.discount}
                </Typography>

                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  {offer.title}
                </Typography>

                <Typography sx={{ fontSize: '0.9rem', mb: 2 }}>
                  {offer.description}
                </Typography>

                <Button
                  component={Link}
                  to="/dailyfreshessentials"
                  variant="contained"
                  endIcon={<ChevronRightIcon />}
                  sx={{
                    bgcolor: '#82AE36',
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#6C9528' },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Home;
