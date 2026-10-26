
import { useEffect, useState } from 'react';

import {
    Alert,
    Box,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Collapse,
    Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductDetailsDialog from '../component/ProductDetailsDialog';
import { Link } from 'react-router-dom';

// Sidebar categories and their corresponding API filters
const categoryGroups = [
    {
        title: 'Browse All',
        items: [
            { id: 'all', label: 'All Products' },
        ],
    },
    {
        title: 'Daily Fresh Essentials',
        items: [
            {
                id: 'groceries',
                label: 'All Groceries',
                categories: ['groceries'],
            },
            {
                id: 'vegetables',
                label: 'Green Vegetables',
                categories: ['groceries'],
                keywords: [
                    'spinach',
                    'broccoli',
                    'cucumber',
                    'asparagus',
                    'green bell pepper',
                    'zucchini',
                    'lettuce',
                    'green onion',
                    'kale',
                ],
            },
            {
                id: 'fruits',
                label: 'Fruits',
                categories: ['groceries'],
                keywords: [
                    'apple',
                    'banana',
                    'orange',
                    'mango',
                    'watermelon',
                    'grape',
                    'kiwi',
                    'lemon',
                    'pineapple',
                    'coconut',
                    'strawberry',
                    'peach',
                    'pear',
                    'melon',
                ],
            },
        ],
    },
    {
        title: 'Fashion & Accessories',
        items: [
            {
                id: 'fashion',
                label: 'All Fashion',
                categories: [
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
                ],
            },
            {
                id: 'men',
                label: "Men's Fashion",
                categories: [
                    'mens-shirts',
                    'mens-shoes',
                    'mens-watches',
                ],
            },
            {
                id: 'women',
                label: "Women's Fashion",
                categories: [
                    'womens-bags',
                    'womens-dresses',
                    'womens-jewellery',
                    'womens-shoes',
                    'womens-watches',
                ],
            },
            {
                id: 'kids',
                label: "Kids' Fashion",
                comingSoon: true,
            },
        ],
    },
    {
        title: 'Home & Living',
        items: [
            {
                id: 'home',
                label: 'Home Decor',
                categories: ['home-decoration'],
            },
            {
                id: 'furniture',
                label: 'Furniture',
                categories: ['furniture'],
            },
        ],
    },
];

const allCategoryItems = categoryGroups.flatMap(
    (group) => group.items
);

function Categories() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [expandedGroups, setExpandedGroups] = useState({
        'Browse All': true,
        'Daily Fresh Essentials': true,
        'Fashion & Accessories': false,
        'Home & Living': false,
    });
    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await fetch(
                    'https://dummyjson.com/products?limit=0'
                );

                if (!response.ok) {
                    throw new Error('Unable to fetch products');
                }

                const data = await response.json();

                setProducts(data.products || []);
            } catch {
                setError(
                    'Products is not loaded. Please check your internet connection.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Find the selected sidebar category
    const activeCategory = allCategoryItems.find(
        (category) => category.id === selectedCategory
    );

    // Filter products based on the selected category
    const filteredProducts = products.filter((product) => {
        if (selectedCategory === 'all') {
            return true;
        }

        if (activeCategory?.comingSoon) {
            return false;
        }

        if (
            activeCategory?.categories &&
            !activeCategory.categories.includes(product.category)
        ) {
            return false;
        }

        if (activeCategory?.keywords) {
            const searchableText = [
                product.title,
                product.description,
                ...(product.tags || []),
            ]
                .join(' ')
                .toLowerCase();

            return activeCategory.keywords.some((keyword) =>
                searchableText.includes(keyword)
            );
        }

        return true;
    });

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
            {/* Page heading */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="overline"
                    sx={{
                        color: '#78A92E',
                        fontWeight: 700,
                        letterSpacing: 1.5,
                    }}
                >
                    EXPLORE SHOPESASE
                </Typography>

                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 800, mt: 0.5 }}
                >
                    Shop by Category
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Find your favourite products in one place.
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

            {/* Sidebar and product listing */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: '250px minmax(0, 1fr)',
                    },
                    gap: { xs: 3, md: 4 },
                    alignItems: 'start',
                }}
            >
                {/* Category sidebar */}
                <Box
                    sx={{
                        bgcolor: '#fff',
                        border: '1px solid #eeeeee',
                        borderRadius: 2,
                        p: 2,
                        position: { md: 'sticky' },
                        top: { md: 145 },
                        maxHeight: { md: 'calc(100vh - 165px)' },
                        overflowY: { md: 'auto' },
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, px: 1, mb: 1.5 }}
                    >
                        Browse Categories
                    </Typography>

                    {categoryGroups.map((group) => {
                        const isExpanded = expandedGroups[group.title];

                        const groupIsActive = group.items.some(
                            (category) => category.id === selectedCategory
                        );

                        return (
                            <Box key={group.title} sx={{ mb: 1.5 }}>
                                {/* Expandable category heading */}
                                <ListItemButton
                                    onClick={() =>
                                        setExpandedGroups((previous) => ({
                                            ...previous,
                                            [group.title]: !previous[group.title],
                                        }))
                                    }
                                    sx={{
                                        borderRadius: 2,
                                        minHeight: 46,
                                        bgcolor: groupIsActive ? '#F1F7E9' : 'transparent',
                                        '&:hover': {
                                            bgcolor: '#F1F7E9',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={group.title}
                                        primarytypographyprops={{
                                            fontWeight: groupIsActive ? 700 : 600,
                                            fontSize: '0.87rem',
                                            color: groupIsActive ? '#507D28' : '#292929',
                                        }}
                                    />

                                    <ExpandMoreIcon
                                        sx={{
                                            color: groupIsActive ? '#638D30' : 'text.secondary',
                                            transform: isExpanded
                                                ? 'rotate(180deg)'
                                                : 'rotate(0deg)',
                                            transition: 'transform 250ms ease',
                                        }}
                                    />
                                </ListItemButton>

                                {/* Animated subcategory list */}
                                <Collapse in={isExpanded} timeout={250} unmountOnExit>
                                    <List disablePadding sx={{ pl: 1.5, pt: 0.5 }}>
                                        {group.items.map((category) => (
                                            <ListItemButton
                                                key={category.id}
                                                selected={selectedCategory === category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                sx={{
                                                    minHeight: 40,
                                                    borderRadius: 1.5,
                                                    mb: 0.5,
                                                    pl: 2,

                                                    '&.Mui-selected': {
                                                        bgcolor: '#EDF5E3',
                                                        color: '#507D28',
                                                        borderLeft: '3px solid #78A92E',
                                                    },

                                                    '&.Mui-selected:hover': {
                                                        bgcolor: '#E2EFD4',
                                                    },

                                                    '&:hover': {
                                                        bgcolor: '#F7F9F4',
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={category.label}
                                                    primarytypographyprops={{
                                                        fontSize: '0.85rem',
                                                        fontWeight:
                                                            selectedCategory === category.id ? 700 : 400,
                                                    }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </Box>
                        );
                    })}



                </Box>

                {/* Products area */}
                <Box sx={{ minWidth: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 1,
                            mb: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 800 }}
                        >
                            {activeCategory?.label || 'All Products'}
                        </Typography>

                        {!loading && !error && (
                            <Typography variant="body2" color="text.secondary">
                                {filteredProducts.length} products
                            </Typography>
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
                            <CircularProgress color="success" />
                            <Typography>Loading products...</Typography>
                        </Box>
                    )}

                    {!loading && error && (
                        <Alert severity="error">{error}</Alert>
                    )}

                    {!loading &&
                        !error &&
                        activeCategory?.comingSoon && (
                            <Alert severity="info">
                                DummyJSON does not have a dedicated Kids' Fashion
                                category. We can add a separate sample dataset for
                                kids' products later.
                            </Alert>
                        )}

                    {!loading &&
                        !error &&
                        !activeCategory?.comingSoon &&
                        filteredProducts.length === 0 && (
                            <Alert severity="info">
                                No products match this subcategory in the current
                                sample API data.
                            </Alert>
                        )}

                    {!loading &&
                        !error &&
                        filteredProducts.length > 0 && (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, minmax(0, 1fr))',
                                        sm: 'repeat(2, minmax(0, 1fr))',
                                        lg: 'repeat(3, minmax(0, 1fr))',
                                    },
                                    gap: { xs: 1.5, sm: 2.5 },
                                }}
                            >
                                {filteredProducts.map((product) => (
                                    <Card
                                        key={product.id}
                                        onClick={() => setSelectedProduct(product)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === 'Enter' ||
                                                event.key === ' '
                                            ) {
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
                                            transition: 'all 200ms ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #78A92E',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.thumbnail}
                                            alt={product.title}
                                            loading="lazy"
                                            sx={{
                                                height: { xs: 135, sm: 190 },
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
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 700,
                                                    lineHeight: 1.4,
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

                                            <Divider sx={{ my: 1.5 }} />

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    gap: 1,
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
                </Box>
            </Box>

            {/* Reuse the existing product details popup */}
            <ProductDetailsDialog
                open={Boolean(selectedProduct)}
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </Container >
    );
}

export default Categories;
