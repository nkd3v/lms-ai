import React from 'react';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import img1 from 'src/assets/images/products/s5.jpg';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';
import PostCard from 'src/components/shared/PostCard';
import ExamCard from 'src/components/shared/ExamCard';
import { Link } from 'react-router-dom';


const CourseStream = () => {
  return (
    <Grid container spacing={2}>

      <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
        <Link to='/course/new-exam' style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ mr: 1 }}>Create Exam</Button>
        </Link>
        <Link to='/course/new-assignment' style={{ textDecoration: 'none' }}>
          <Button variant="contained">Create Assignment</Button>
        </Link>
      </Grid>

      <Grid item xs={12}>
        <Box>
          <img src={img1} alt="img" style={{ borderRadius: 8, width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'cover' }} />
        </Box>
      </Grid>

      <Grid item xs={3}>
        <DashboardCard title="Upcoming">
          <Typography>No homework at the moment</Typography>
        </DashboardCard>
      </Grid>


      <Grid item xs={9}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Link to='/course/assignment' style={{ textDecoration: 'none' }}>
              <ExamCard>
              </ExamCard>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Link to='/course/assignment' style={{ textDecoration: 'none' }}>
              <PostCard>
              </PostCard>
            </Link>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseStream;
