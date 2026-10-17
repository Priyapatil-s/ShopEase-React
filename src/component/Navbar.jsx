
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link } from 'react-router-dom';

function Navbar() {
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
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>

              <Button component={Link} to="/Product" color="inherit">
                Product
              </Button>

              <Button color="inherit">
                Categories
              </Button>

              <Button color="inherit">
                About
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
