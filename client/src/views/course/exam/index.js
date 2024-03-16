import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Modal from '@mui/material/Modal';
import { useState, useRef } from 'react'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CheckboxesTags() {
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={names}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Group Members" />
            )}
        />
    );
}

const names = [
    { id: "66010001", name: "Johnny Depp" },
    { id: "66010002", name: "Leonardo DiCaprio" },
    { id: "66010003", name: "Tom Hanks" },
    { id: "66010004", name: "Meryl Streep" },
    { id: "66010005", name: "Brad Pitt" },
    { id: "66010006", name: "Angelina Jolie" },
    { id: "66010007", name: "Jennifer Lawrence" },
    { id: "66010008", name: "Robert Downey Jr." },
    { id: "66010009", name: "Scarlett Johansson" },
    { id: "66010010", name: "Denzel Washington" }
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,

};



function BasicModal({ open, setOpen, handleClose, videoRef }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} borderRadius={4}>
                    <video ref={videoRef} style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}></video>
                    <Typography id="modal-modal-title" variant="h6" component="h2" mt={1} textAlign={'center'}>
                        Passed
                    </Typography>
                    <Box display={'flex'} justifyContent={'center'} my={1.5}>
                        <Button variant='contained'>Start Exam</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

const Index = () => {
    const [open, setOpen] = useState(false);
    const videoRef = useRef(null);

    const handleOpen = () => {
        setOpen(true)
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then(stream => {
                console.log(videoRef.current);
                const video = videoRef.current
                video.srcObject = stream
                video.play()
                console.log(video.srcObject)
            })
            .catch(error => {
                console.error(error)
            })

    }

    const handleClose = () => {
        setOpen(false)
        videoRef.current.srcObject.getTracks().forEach(function (track) {
            console.log('stop')
            track.stop();
        });
    }
    return (
        <>
            <BasicModal open={open} setOpen={setOpen} handleClose={handleClose} videoRef={videoRef} />
            <Grid container spacing={3}>
                <Grid item xs={8.5}>
                    <Typography variant='h3'>
                        Exam 1
                    </Typography>
                    <Stack display={'flex'} direction={'row'} justifyContent={'space-between'}>
                        <Typography variant='subtitle1'>
                            Instructor
                        </Typography>
                        <Typography variant='subtitle1'>
                            Feb 24, 2021
                        </Typography>
                    </Stack>
                    <Typography>
                        10 points
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography>
                        Good luck!
                    </Typography>
                </Grid>
                <Grid item xs={3.5}>
                    <Paper elevation={3}>
                        <Stack display="flex" justifyContent="flexCenter" spacing={1} padding={2}>
                            <Typography variant='h4'>
                                Your work
                            </Typography>
                            <Typography variant='body1'>
                                Not submitted
                            </Typography>
                            <Button variant='contained' onClick={handleOpen}>
                                Take Exam
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Index