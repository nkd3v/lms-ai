import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import img1 from 'src/assets/images/products/s4.jpg';
import img2 from 'src/assets/images/products/s5.jpg';
import img3 from 'src/assets/images/products/s7.jpg';
import img4 from 'src/assets/images/products/s11.jpg';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';

const courses = [
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
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const instructorResponse = await fetch('http://localhost:3000/api/v1/courses/instructor', { credentials: 'include' });
                const instructorCourses = instructorResponse.ok ? await instructorResponse.json() : [];

                const learnerResponse = await fetch('http://localhost:3000/api/v1/courses/learner', { credentials: 'include' });
                const learnerCourses = learnerResponse.ok ? await learnerResponse.json() : [];

                // Merge instructor and learner courses into a single list
                const mergedCourses = [...instructorCourses, ...learnerCourses];
                console.log(mergedCourses)

                setCourses(mergedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Grid container spacing={3}>
            {courses.map((course, index) => (
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
                        <Typography component={Link} to="/course/1">
                            <img src={`https://picsum.photos/seed/${Math.floor(Math.random() * 200)}/300`} alt="img" width="100%" />
                        </Typography>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{course.name}</Typography>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
