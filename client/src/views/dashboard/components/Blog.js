import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import img1 from 'src/assets/images/products/s4.jpg';
import img2 from 'src/assets/images/products/s5.jpg';
import img3 from 'src/assets/images/products/s7.jpg';
import img4 from 'src/assets/images/products/s11.jpg';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';

const ecoCard = [
    {
        title: 'Web Development',
        subheader: 'September 14, 2023',
        photo: img1,
    },
    {
        title: 'Embedded System',
        subheader: 'September 14, 2023',
        photo: img2,
    },
];

const Blog = () => {
    return (
        <Grid container spacing={3}>
            {ecoCard.map((product, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
                        <Typography component={Link} to="/">
                            <img src={product.photo} alt="img" width="100%" />
                        </Typography>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{product.title}</Typography>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
