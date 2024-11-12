import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TestEnvironment = () => {
    const navigate = useNavigate();
    const [hasPermissions, setHasPermissions] = useState(false);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [countdown, setCountdown] = useState(10);

    // Function to get camera and microphone permissions
    const getPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Wait for metadata to be loaded before playing
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch(err => {
                        console.error("Error starting video playback:", err);
                        setError('Failed to start video playback.');
                        toast.error('Failed to start video playback.');
                    });
                };
            }
            setHasPermissions(true);
            setTimerStarted(true); // Start the timer once permissions are granted
        } catch (err) {
            setError('Camera and/or microphone access was denied.');
            toast.error('Camera and/or microphone access was denied.');
        }
    };

    useEffect(() => {
        getPermissions();

        // Cleanup function to stop video stream when component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (hasPermissions && timerStarted) {
            const timer = setTimeout(() => {
                navigate("/quiz"); // Navigate to quiz after 10 seconds
            }, 10000); // 10 seconds delay

            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000); // Decrease countdown every second

            return () => {
                clearTimeout(timer);
                clearInterval(countdownInterval);
            };
        }
    }, [hasPermissions, timerStarted, navigate]);

    const handleStartTest = () => {
        if (hasPermissions) {
            navigate("/quiz"); // Manually navigate to quiz when button is clicked
        } else {
            toast.error('Cannot start test without camera and microphone access.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl text-white mb-5 font-bold'>Start Test</h1>
            <div>
                {error && <p className='text-red-600'>{error}</p>}
                {!error && (
                    <div className='video-container'>
                        <video ref={videoRef} autoPlay className='w-full h-64 bg-black'></video>
                        <p className='text-[#8ab5f6] mt-3'>{`The test will start in ${countdown} seconds`}</p>
                    </div>
                )}
                <button
                    onClick={handleStartTest}
                    className='bg-red-600 mt-6 p-3 text-white rounded-sm font-medium'
                >
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default TestEnvironment;
