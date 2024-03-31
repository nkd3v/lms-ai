import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { BehaviorContext } from 'src/contexts/BehaviorContext';
const faceapi = require('face-api.js');

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

const Exam = () => {
    const { behaviorStatus, timer, setBehaviorStatus, setTimer } = useContext(BehaviorContext);
    const videoRef = useRef(null);
    const faceMatcher = useRef(null);
    const faceIntervalId = useRef(null);
    const [detectNoFace, setDetectNoFace] = useState(false);
    const [detectUnknownFace, setDetectUnknownFace] = useState(false);
    const [tabSwitching, setTabSwitching] = useState(false);

    function updateBehaviorStatus() {
        console.log(detectNoFace, detectUnknownFace, tabSwitching);
        if (detectNoFace) {
            setBehaviorStatus('No face detected');
        } else if (detectUnknownFace) {
            setBehaviorStatus('Unknown face detected');
        } else if (tabSwitching) {
            setBehaviorStatus('Tab switching detected');
        } else {
            setBehaviorStatus('Normal');
        }
    }

    useEffect(updateBehaviorStatus, [detectNoFace, detectUnknownFace, tabSwitching]);

    useEffect(() => {
        async function loadFace() {
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            ]);
            const img = await faceapi.fetchImage(`/labels/Nong/1.png`);
            const detection = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            faceMatcher.current = new faceapi.FaceMatcher(new faceapi.LabeledFaceDescriptors('Nong', [detection.descriptor]));
        }
        loadFace();

        const handleOpen = () => {
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
                });

            faceIntervalId.current = setInterval(async () => {
                const results = await faceapi
                    .detectAllFaces(videoRef.current)
                    .withFaceLandmarks()
                    .withFaceDescriptors();

                if (results.length == 0) {
                    setDetectNoFace(true);
                } else {
                    setDetectNoFace(false);
                    results.forEach(fd => {
                        const bestMatch = faceMatcher.current.findBestMatch(fd.descriptor)
                        console.log(bestMatch.toString())
                        if (!bestMatch.toString().startsWith('Nong')) {
                            setDetectUnknownFace(true);
                        } else {
                            setDetectUnknownFace(false);
                        }
                    })
                }
            }, 1000)
        }

        handleOpen();

        const handleClose = () => {
            videoRef.current.srcObject.getTracks().forEach(function (track) {
                console.log('stop')
                track.stop();
            });

            clearInterval(faceIntervalId.current);
            faceIntervalId.current = null;
        }

        setTimer(1800)
        const intervalId = setInterval(() => {
            setTimer(prevTime => prevTime - 1);
            if (timer === 0) {
                clearInterval(intervalId);
                // TODO: Handle timer completion actions
            }
        }, 1000);

        async function capture() {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia();
                const track = stream.getVideoTracks()[0];
                const capture = new ImageCapture(track);

                const bitmap = await capture.grabFrame();

                const canvas = document.createElement("canvas");
                canvas.width = bitmap.width;
                canvas.height = bitmap.height;
                canvas.getContext("bitmaprenderer").transferFromImageBitmap(bitmap);

                const blob = await new Promise((res) => canvas.toBlob(res));

                // Save as downloadable file
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'screenshot.png'; // Set your desired filename
                link.click();

                // Revoke the object URL after download (optional)
                window.URL.revokeObjectURL(url);
            } catch (err) {
                console.error("Error capturing or saving screenshot:", err);
            }
        }


        capture();

        window.onfocus = function () {
            setTabSwitching(false);
        };

        window.onblur = function () {
            setTabSwitching(true);
        };

        return () => { clearInterval(intervalId); handleClose(); } // Clear interval on unmount
    }, [])


    return (
        <>
            <video id="vref" ref={videoRef} style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}></video>
            {/* <video id="video" width="220" height="160" autoPlay></video> */}
            <Typography variant='h2'>
                Exam 1
            </Typography>
            <p id="detector-label">

            </p>

            {questions.map((q, index) => (
                <Box marginY={3} key={index * 16 + 1}>
                    <FormControl key={index * 16 + 2}>
                        <FormLabel key={index * 16 + 3} sx={{ mb: 1 }}>{index + 1}. {q.question}</FormLabel>
                        <RadioGroup key={index * 16 + 4}>
                            {q.choices.map((choice, i) => (
                                <FormControlLabel
                                    key={index * 16 + 5 + i}
                                    value={choice}
                                    control={<Radio />}
                                    label={choice}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            ))}
            
            <Button href='/' variant='contained'>
                Submit
            </Button>
        </>
    );
};

export default Exam;
