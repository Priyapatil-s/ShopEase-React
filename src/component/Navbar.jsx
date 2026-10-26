
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
} from '@mui/material';
import { useEffect, useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link, useLocation } from 'react-router-dom';



const navButtonSx = {
  minWidth: 80,
  height: 44,
  px: 2,
  borderRadius: '8px',
  bgcolor: '#EDF5E3',
  color: '#2F3A26',
  fontWeight: 700,
  textTransform: 'none',
  transition: 'all 250ms ease',

  '&:hover': {
    bgcolor: '#78A92E',
    color: '#FFFFFF',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 14px rgba(120,169,46,0.3)',
  },

  '&:active': {
    transform: 'scale(0.90)',
    borderRadius: '5px',
    boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.35)',
  },

  '&:focus-visible': {
    outline: '3px solid #78A92E',
    outlineOffset: 3,
  },
};

const navIconSx = {
  width: 44,
  height: 44,
  borderRadius: '8px',
  bgcolor: '#EDF5E3',
  color: '#2F3A26',
  transition: 'all 250ms ease',

  '&:hover': {
    bgcolor: '#78A92E',
    color: '#FFFFFF',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 14px rgba(120,169,46,0.3)',
  },

  '&:active': {
    transform: 'scale(0.88)',
    borderRadius: '5px',
  },

  '&:focus-visible': {
    outline: '3px solid #78A92E',
    outlineOffset: 3,
  },
};


function Navbar() {
  const location = useLocation();

  const getActiveIndex = (pathname) => {
    if (pathname === '/') return 0;

    if (
      ['/products', '/fashion', '/daily-fresh-essentials'].includes(pathname)
    ) {
      return 1;
    }

    return -1;
  };

  const [activeNavIndex, setActiveNavIndex] = useState(
    () => getActiveIndex(location.pathname)
  );

  useEffect(() => {
    setActiveNavIndex(getActiveIndex(location.pathname));
  }, [location.pathname]);
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%',
      }}
    >


      <Box sx={{ bgcolor: '#252525', color: '#fff' }}>
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 1,
          }}
        >

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              height: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="caption"
              className="delivery-marquee"
              sx={{
                position: 'absolute',
                top: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Free delivery on orders over ₹999
            </Typography>
          </Box>


          <Typography
            variant="caption"
            sx={{
              display: { xs: 'none', sm: 'block' },
              whiteSpace: 'nowrap',
            }}
          >
            Welcome User
          </Typography>
        </Container>
      </Box>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#fff',
          color: '#292929',
          borderBottom: '1px solid #eeeeee',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 76,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                color: '#78A92E',
                fontWeight: 800,
                textDecoration: 'none',
                letterSpacing: '-0.7px',
                whiteSpace: 'nowrap',
              }}
            >
              ShopEase.
            </Typography>



            <Box
              sx={{
                display: { xs: 'none', md: 'grid' },
                gridTemplateColumns: 'repeat(4, 84px)',
                gap: '4px',
                position: 'relative',
                alignItems: 'center',
              }}
            >
              {/* Moving light square */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '84px',
                  height: '44px',
                  borderRadius: '8px',
                  bgcolor: '#EDF5E3',
                  boxShadow: '0 2px 10px rgba(120,169,46,0.18)',
                  pointerEvents: 'none',
                  opacity: activeNavIndex === -1 ? 0 : 1,
                  transform:
                    activeNavIndex === 0
                      ? 'translateX(0)'
                      : activeNavIndex === 1
                        ? 'translateX(88px)'
                        : activeNavIndex === 2
                          ? 'translateX(176px)'
                          : activeNavIndex === 3
                            ? 'translateX(264px)'
                            : 'translateX(0)',
                  transition:
                    'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease',
                  zIndex: 0,
                }}
              />

              <Button
                component={Link}
                to="/"
                onClick={() => setActiveNavIndex(0)}
                sx={{
                  width: '84px',
                  minWidth: '84px',
                  height: '44px',
                  color: activeNavIndex === 0 ? '#507D28' : '#292929',
                  bgcolor: 'transparent',
                  fontWeight: 700,
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#507D28',
                  },
                }}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/product"
                onClick={() => setActiveNavIndex(1)}
                sx={{
                  width: '84px',
                  minWidth: '84px',
                  height: '44px',
                  color: activeNavIndex === 1 ? '#507D28' : '#292929',
                  bgcolor: 'transparent',
                  fontWeight: 700,
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#507D28',
                  },
                }}
              >
                Products
              </Button>

              <Button
                onClick={() => setActiveNavIndex(2)}
                sx={{
                  width: '84px',
                  minWidth: '84px',
                  height: '44px',
                  color: activeNavIndex === 2 ? '#507D28' : '#292929',
                  bgcolor: 'transparent',
                  fontWeight: 700,
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#507D28',
                  },
                }}
              >
                Categories
              </Button>

              <Button
               component={Link}
                to="/admin/analytics"
                onClick={() => setActiveNavIndex(3)}
                sx={{
                  width: '84px',
                  minWidth: '84px',
                  height: '44px',
                  color: activeNavIndex === 3 ? '#507D28' : '#292929',
                  bgcolor: 'transparent',
                  fontWeight: 700,
                  textTransform: 'none',
                  position: 'relative',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#507D28',
                  },
                }}
              >
                Admin
              </Button>
            </Box>



            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="Search products">
                <SearchIcon />
              </IconButton>

              <IconButton aria-label="Shopping cart">
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Toolbar>


          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'space-around',
              borderTop: '1px solid #eeeeee',
              py: 0.5,
            }}
          >
            <IconButton
              component={Link}
              to="/"
              aria-label="Home"
              title="Home"
              sx={navButtonSx}
            >
              <HomeIcon />
            </IconButton>

            <IconButton
              component={Link}
              to="/Product"
              aria-label="Product"
              title="Product"
            >
              <ShoppingBagOutlinedIcon />
            </IconButton>

            <IconButton aria-label="Categories" title="Categories">
              <SearchIcon />
            </IconButton>

            <IconButton aria-label="About" title="About">
              <InfoOutlinedIcon />
            </IconButton>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
