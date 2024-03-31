import React, { useEffect, useState } from 'react';
import { Box, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'violationType', headerName: 'Violation Type', width: 350 },
    { field: 'occuredAt', headerName: 'Occured At', width: 130 },
    {
        field: 'evidence',
        headerName: 'Evidence',
        width: '600',
        renderCell: (params) => {
            return (
                <>
                    <img src={params.value} style={{ maxWidth: '90%', maxHeight: '90%', margin: 'auto' }} />
                </>
            );
        }
    },
];

const rows = [
    { id: 1, violationType: 'Switched to differrent application for 30 seconds', occuredAt: '7:00:13 AM', evidence: '/img/demo1.png' },
    { id: 2, violationType: 'No face detected 10 seconds', occuredAt: '7:01:13 AM', evidence: '/img/demo2.png' },
];

function formatDate(dateStr) {
    const date = new Date(dateStr);

    const options = {
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return date.toLocaleString('en-US', options);
}

function countViolationTypes(proctorActivities) {
    const violationCounts = {
        "Tab Switching": 0,
        "Unknown Face": 0,
        "No Face": 0
    };

    for (const activity of proctorActivities) {
        if (violationCounts.hasOwnProperty(activity.type)) {
            violationCounts[activity.type]++;
        }
    }

    return violationCounts;
}

function formatTimestamp(timestampStr) {
    // Create a Date object 
    const date = new Date(timestampStr);

    // Options for formatting hours, minutes, and seconds
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true   // Use 12-hour format (AM/PM)
    };

    // Format the time portion of the timestamp
    return date.toLocaleString('en-US', options);
}

function transformActivities(proctorActivities) {
    return proctorActivities.map((activity, index) => {
        // Format the 'created_at' timestamp
        const formattedTime = formatTimestamp(activity.created_at);

        // Construct the violationType string (customize if needed)
        const violationType = `${activity.type} ${activity.description ? `(${activity.description})` : ''}`;

        return {
            id: index + 1, // Assign an ID (start from 1)
            violationType: violationType,
            occuredAt: formattedTime,
            evidence: activity.image_url
        };
    });
}

const Index = () => {
    const [submissionData, setSubmissionData] = useState(null);
    const [proctorActivities, setProctorActivities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activityCounts, setActivityCounts] = useState(null);
    const [user, setUser] = useState(null)
    const [transformedRows, setTransformedRows] = useState(null);

    const { examId, userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const [submissionResponse, proctorResponse, userResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/v1/exams/submissions/${examId}/users/${userId}`, {
                        credentials: 'include'
                    }),
                    fetch(`http://localhost:3000/api/v1/proctor/exams/${examId}/users/${userId}`, {
                        credentials: 'include'
                    }),
                    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
                        credentials: 'include'
                    }),
                ]);

                if (!submissionResponse.ok || !proctorResponse.ok || !userResponse.ok) {
                    throw new Error('Error fetching data');
                }

                const [submission, proctorData, userData] = await Promise.all([
                    submissionResponse.json(),
                    proctorResponse.json(),
                    userResponse.json(),
                ]);

                console.log(submission)
                console.log(proctorData);
                console.log(userData);

                setSubmissionData(submission);
                setProctorActivities(proctorData);
                setUser(userData);

                setActivityCounts(countViolationTypes(proctorData))
                setTransformedRows(transformActivities(proctorData));

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
            }
        };

        fetchData();
    }, []);

    
    console.log(transformedRows);

    const calculateTrustScore = (activityCounts) => {
        const violationPoints = Math.min(
            10 * (activityCounts["Tab Switching"] + activityCounts["Unknown Face"] + activityCounts["No Face"]),
            100 // Cap at 100% 
        );
        return Math.max(100 - violationPoints, 0); // Ensure non-negative score
    };

    return (
        <>
            <Typography variant='h5'>Proctoring Summary</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Grid container spacing={2}>

                {
                    !isLoading && <>

                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography variant='h3'>{user.name}</Typography>
                                <Typography variant='h6'>{user.email}</Typography>
                                <Typography variant='body1' mt={1} >Started at</Typography>
                                <Typography variant='h6'>{formatDate(submissionData.started_at)}</Typography>
                                <Typography variant='body1' mt={1} >Submitted at</Typography>
                                <Typography variant='h6'>{formatDate(submissionData.submitted_at)}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} mt={1}>
                            <Box component={"section"} display={'flex'} justifyContent={'space-around'}>
                                <Paper style={{
                                    display: 'flex',
                                    flexFlow: 'column',
                                    justifyContent: 'center',
                                    padding: 20,
                                    textAlign: 'center',
                                    width: '200px',
                                }}>
                                    <Typography variant='h6'>Trust Score</Typography>
                                    <Typography variant='h3'>{calculateTrustScore(activityCounts)}%</Typography>
                                </Paper>
                                <Paper style={{
                                    display: 'flex',
                                    flexFlow: 'column',
                                    justifyContent: 'center',
                                    padding: 20,
                                    textAlign: 'center',
                                    width: '200px'
                                }}>
                                    <Typography variant='h6'>Tab Switches</Typography>
                                    <Typography variant='h3'>{activityCounts["Tab Switching"]}</Typography>
                                </Paper>
                                <Paper style={{
                                    display: 'flex',
                                    flexFlow: 'column',
                                    justifyContent: 'center',
                                    padding: 20,
                                    textAlign: 'center',
                                    width: '200px'
                                }}>
                                    <Typography variant='h6'>Unknown Face Detected</Typography>
                                    <Typography variant='h3'>{activityCounts["Unknown Face"]}</Typography>
                                </Paper>
                                <Paper style={{
                                    display: 'flex',
                                    flexFlow: 'column',
                                    justifyContent: 'center',
                                    padding: 20,
                                    textAlign: 'center',
                                    width: '200px'
                                }}>
                                    <Typography variant='h6'>No Face Detected</Typography>
                                    <Typography variant='h3'>{activityCounts["No Face"]}</Typography>
                                </Paper>
                            </Box>
                        </Grid>


                        <Grid item xs={12}>
                            <DataGrid
                                rows={transformedRows}
                                columns={columns}
                                rowHeight={200}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                autoHeight
                            />
                        </Grid>

                    </>
                }
            </Grid>
        </>
    );
};

export default Index