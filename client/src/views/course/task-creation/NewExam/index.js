import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function BasicTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker label="Basic time picker" />
    </LocalizationProvider>
  );
}

const NewExam = () => {
  return (
    <div>
      <Typography variant='h2' marginBottom={2}>
        Exam
      </Typography>
      <div>
      <BasicTimePicker />
      </div>
      <div>
        <TextField
          required
          id="filled-search"
          label="Title"
          variant="filled"
          fullWidth
        />
      </div>
      <div>
        <TextField
          id="filled-multiline-static"
          label="Instructions (optional)"
          multiline
          rows={4}
          variant="filled"
          fullWidth
          sx={{ mt: 2 }}
        />
      </div>
      <Box display="flex" justifyContent="flex-end">
        <Link to='/course' style={{ textDecoration: 'none' }}>
          <Button sx={{ mt: 2 }} variant="contained">Assign</Button>
        </Link>
      </Box>
    </div>
  )
}

export default NewExam