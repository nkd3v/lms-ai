import React, { useEffect } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

const Exam = () => {

  const questions = [
    {
      question: 'What is the slope-intercept form of the equation of a line passing through the points (2, 5) and (4, 9)?',
      choices: ['y = 2x + 1', 'y = 2x + 3', 'y = 1/2x + 3', 'y = 1/2x + 1']
    },
    {
      question: 'If x + 2y = 10 and 3x - 4y = 2, what is the value of xy?',
      choices: ['16', '20', '24', '28']
    },
    {
      question: 'If x - 2y = 4 and 3x + 4y = 8, what is the value of x?',
      choices: ['0', '2', '4', '6']
    },
    {
      question: 'What is the value of 5/8 ÷ 3/4?',
      choices: ['5/6', '5/12', '15/8', '10/3']
    },
    {
      question: 'If x^2 - 4x + 3 = 0, what are the solutions for x?',
      choices: ['x = 1, x = 3', 'x = 1, x = 2', 'x = 2, x = 3', 'x = 1, x = 4']
    },
    {
      question: 'If a square has a perimeter of 36 inches, what is the length of one side?',
      choices: ['6 inches', '9 inches', '12 inches', '18 inches']
    },
    {
      question: 'What is the value of 2^4 × 3^2?',
      choices: ['144', '192', '196', '256']
    },
    {
      question: 'If sinθ = 3/5 and cosθ = 4/5, what is the value of tanθ?',
      choices: ['3/4', '4/3', '3/5', '4/5']
    },
    {
      question: 'What is the median of the following set of numbers: 12, 15, 18, 22, 27?',
      choices: ['15', '18', '20', '22']
    },
    {
      question: 'If f(x) = 2x^2 + 3x - 5, what is f(3)?',
      choices: ['16', '20', '22', '28']
    },
  ];
  

  return (
    <>
    {/* <video id="video" width="220" height="160" autoPlay></video> */}
      <Typography variant='h2'>
        Exam 1
      </Typography>
      <p id="detector-label">

      </p>

      {questions.map((q, index) => (
        <Box marginY={3}>
          <FormControl key={index}>
            <FormLabel sx={{mb: 1}}>{q.question}</FormLabel>
            <RadioGroup>
              {q.choices.map((choice, i) => (
                <FormControlLabel
                  key={i}
                  value={choice}
                  control={<Radio />}
                  label={choice}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      ))}

      <Button variant='contained'>
        Submit
      </Button>
    </>
  );
};

export default Exam;
