import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { BehaviorContext } from 'src/contexts/BehaviorContext';
import { useParams } from 'react-router';
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
];

const Exam = () => {
    const { behaviorStatus, timer, setBehaviorStatus, setTimer } = useContext(BehaviorContext);
    const videoRef = useRef(null);
    const faceMatcher = useRef(null);
    const faceIntervalId = useRef(null);
    const screenRef = useRef(null);
    const [started, setStarted] = useState(false);
    const [detectNoFace, setDetectNoFace] = useState(false);
    const [detectUnknownFace, setDetectUnknownFace] = useState(false);
    const [tabSwitching, setTabSwitching] = useState(false);
    const { examId } = useParams();

    async function uploadWebcamImage() {
        const video = videoRef.current;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL('image/jpeg'); // Adjust image format if needed
        const imageFile = await fetch(dataUrl).then(res => res.blob());

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('http://localhost:3000/api/v1/file/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const responseData = await response.json(); // Parse JSON response 
            const imageUrl = responseData.imageUrl;      // Extract imageUrl

            console.log('Image uploaded successfully!');
            return imageUrl; // Return the imageUrl
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    }

    async function uploadScreenshotImage() {
        const stream = screenRef.current;

        const track = stream.getVideoTracks()[0];
        const capture = new ImageCapture(track);

        const bitmap = await capture.grabFrame();

        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        canvas.getContext("bitmaprenderer").transferFromImageBitmap(bitmap);

        const imageFile = await new Promise((res) => canvas.toBlob(res));

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('http://localhost:3000/api/v1/file/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const responseData = await response.json(); // Parse JSON response 
            const imageUrl = responseData.imageUrl;      // Extract imageUrl

            console.log('Image uploaded successfully!');
            return imageUrl; // Return the imageUrl
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    }

    function updateBehaviorStatus() {
        console.log(detectNoFace, detectUnknownFace, tabSwitching);

        if (started) {
            let behaviorType;

            if (detectNoFace) {
                behaviorType = 'No Face';
            } else if (detectUnknownFace) {
                behaviorType = 'Unknown Face';
            } else if (tabSwitching) {
                behaviorType = 'Tab Switching';
            } else {
                behaviorType = 'Normal';
            }

            // Send the behavior update to the API
            setBehaviorStatus(behaviorType);
            if (behaviorType != 'Normal') {
                sendBehaviorUpdate(examId, behaviorType);
            }
        }
    }

    async function sendBehaviorUpdate(examId, type) {
        try {
            let image_url;
            await new Promise(resolve => setTimeout(resolve, 500)); 
            if (type != 'Tab Switching') {
                image_url = await uploadWebcamImage();
            } else {
                image_url = await uploadScreenshotImage();
            }

            const payload = {
                exam_id: examId,
                type: type,
                description: `${type} detected`,
                image_url
            };

            const response = await fetch('http://localhost:3000/api/v1/proctor/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include' // Include credentials
            });

            if (!response.ok) {
                throw new Error('Failed to update behavior');
            }

            // Optionally handle the response if needed
        } catch (error) {
            console.error('Error updating behavior:', error);
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
                    if (faceMatcher.current != null) {
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
                let stream;
                while (stream == undefined) {
                    try {
                        stream = await navigator.mediaDevices.getDisplayMedia();
                    } catch (error) {
                        console.error(error);
                    }
                }
                screenRef.current = stream;
                setStarted(true);

                // // Save as downloadable file
                // const url = window.URL.createObjectURL(blob);
                // const link = document.createElement('a');
                // link.href = url;
                // link.download = 'screenshot.png'; // Set your desired filename
                // link.click();

                // // Revoke the object URL after download (optional)
                // window.URL.revokeObjectURL(url);
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
            <video hidden id="vref" ref={videoRef} style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}></video>
            {/* <video id="video" width="220" height="160" autoPlay></video> */}
            <Typography variant='h2'>
                Exam 1
            </Typography>
            <p id="detector-label">

            </p>

            {started ? questions.map((q, index) => (
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
            )) : <p>Please turn on full screen sharing</p>}

            {started && (
                <Button href='/proctor/1/user/1' variant='contained'>
                    Submit
                </Button>
            )}
        </>
    );
};

export default Exam;
