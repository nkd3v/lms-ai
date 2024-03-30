import React from 'react';
import { Box, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'violationType', headerName: 'Violation Type', width: 350 },
    { field: 'occuredAt', headerName: 'Occured At', width: 130 },
    {
        field: 'evidence',
        headerName: 'Evidence',
        width: '600',
        renderCell: (params) => {
            console.log(params);
            return (
                <>
                    <img src={params.value} style={{ maxWidth: '90%', maxHeight: '90%', margin: 'auto'}} />
                </>
            );
        }
    },
];

const rows = [
    { id: 1, violationType: 'Switched to differrent application for 30 seconds', occuredAt: '7:00:13 AM', evidence: '/img/demo1.png' },
    { id: 2, violationType: 'No face detected 10 seconds', occuredAt: '7:01:13 AM', evidence: '/img/demo2.png' },
];

const index = () => {
    return (
        <>
            <Typography variant='h5'>Proctoring Summary</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Grid container spacing={2}>

                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h3'>John Doe</Typography>
                        <Typography variant='h6'>john@example.com</Typography>
                        <Typography variant='body1' mt={1} >Started at</Typography>
                        <Typography variant='h6'>16-MAR 6:59 AM</Typography>
                        <Typography variant='body1' mt={1} >Submitted at</Typography>
                        <Typography variant='h6'>16-MAR 9:59 AM</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} mt={1}>
                    <Box item component="section" display={'flex'} justifyContent={'space-around'}>
                        <Paper style={{
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            padding: 20,
                            textAlign: 'center',
                            width: '200px',
                        }}>
                            <Typography variant='h6'>Trust Score</Typography>
                            <Typography variant='h3'>60%</Typography>
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
                            <Typography variant='h3'>1</Typography>
                        </Paper>
                        <Paper style={{
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            padding: 20,
                            textAlign: 'center',
                            width: '200px'
                        }}>
                            <Typography variant='h6'>Non Test Taker Detected</Typography>
                            <Typography variant='h3'>0</Typography>
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
                            <Typography variant='h3'>1</Typography>
                        </Paper>
                    </Box>
                </Grid>


                <Grid item xs={12}>
                    <DataGrid
                        rows={rows}
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
            </Grid>
        </>
    );
};

export default index