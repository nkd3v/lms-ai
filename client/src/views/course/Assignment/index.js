import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect, useRef } from 'react' // Import useState, useEffect
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useParams } from 'react-router-dom'; // Import useParams
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CheckboxesTags({selectedUsers, setSelectedUsers, userId}) {
  const [learners, setLearners] = useState([]);
  const { courseId, assignmentId } = useParams();
  console.log(`filter ${userId}`)

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/assignments/submissions/courses/${courseId}/assignments/${assignmentId}/non-submitting`, {
          credentials: 'include' // Include credentials
        });
        const data = await response.json();
        console.log(userId);
        console.log(data)

        const filteredLearners = data.filter(learner => learner.id !== userId)
          .map(learner => ({ id: learner.id, name: learner.name }));
        console.log(filteredLearners)

        setLearners(filteredLearners); 
      } catch (error) {
        console.error('Error fetching learners:', error);
      }
    };

    fetchLearners();
  }, [courseId, assignmentId, userId]); // Add dependency array

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={learners} // Use the fetched learners
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      onChange={(event, newValues) => {
          setSelectedUsers(newValues.map(option => option.id)); 
      }}
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

const Assignment = () => {
  const [submissionData, setSubmissionData] = useState(null);
  const { assignmentId } = useParams();
  const dataFieldRef = useRef(null); // Create the ref 
  const [userId, setUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchSubmissionData = async () => {
    console.log(userId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/assignments/submissions/users/${userId}/assignments/${assignmentId}`,
        { credentials: 'include' }
      );
      if (response.ok) {
        const data = await response.json();
        setSubmissionData(data);
        if (dataFieldRef.current) {
          dataFieldRef.current.value = data.data; 
        }
      } else {
        // Handle case where the submission is not found (Maybe the user hasn't submitted yet)
      }
    } catch (error) {
      console.error('Error fetching submission data:', error);
    }
  };

  useEffect(() => {
    console.log(jwtDecode(Cookies.get('jwtToken')).user.id);
    setUserId(jwtDecode(Cookies.get('jwtToken')).user.id);
  }, [])

  useEffect(() => {
    fetchSubmissionData();
  }, [userId, assignmentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = dataFieldRef.current.value;

    try {
      const response = await fetch('http://localhost:3000/api/v1/assignments/submissions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ... Authentication headers if necessary 
        }, 
        body: JSON.stringify({
          user_ids: [...selectedUsers, userId], 
          assignment_id: assignmentId, 
          data: data
        }),
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Submission successful!');
        // You might want to update the UI to reflect the successful submission here, e.g. setSubmissionData
        fetchSubmissionData(); 
      } else {
        console.error('Submission failed:', response.status);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8.5}>
        <Typography variant='h3'>
          Assignment 1
        </Typography>
        <Stack display={'flex'} direction={'row'} justifyContent={'space-between'}>
          <Typography variant='subtitle1'>
            Instructor
          </Typography>
          <Typography variant='subtitle1'>
            Feb 24, 2024
          </Typography>
        </Stack>
        <Typography>
          10 points
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography>
          Get a team and submit your team's name and team members.
        </Typography>
      </Grid>
      <Grid item xs={3.5}>
        <Paper elevation={3}>
          <Stack display="flex" justifyContent="flexCenter" spacing={1} padding={2}>
            <Typography variant='h4'>
              Your work
            </Typography>
            <Typography variant='body1'>
              {submissionData ? 'Turned In' : 'Not submitted'}
            </Typography>
            <TextField
              id="data"
              label={submissionData ? '' : 'Enter your answer'}
              variant="outlined"
              inputRef={dataFieldRef}
              disabled={submissionData !== null} // Disable if submitted
            />
            {!submissionData && <CheckboxesTags selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} userId={userId}/>}
            <Button
              variant='contained'
              disabled={submissionData !== null} // Disable if submitted
              onClick={handleSubmit} 
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Assignment