import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Pause, Play, Volume1, Volume2, VolumeOff, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";
import LoadingCircle from "../LoadingCircle";
import "video.js/dist/video-js.css";
import videoJs from "video.js";

const VideoPlayer = ({ videoData }) => {
    const [currentQuality, setCurrentQuality] = useState();
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState("0 : 0");
    const [videoLoaded, setVideoLoaded] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showUi, setShowUi] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [togglePlayPause, setTogglePlayPause] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(0);
    // const [noSound, setNoSound] = useState(false);

    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const player = playerRef.current;

    const videoConfiguration = [
        {
            quality: "Auto",
            config: "/upload/f_auto"
        },
        {
            quality: "360p",
            config: "/upload/f_auto/h_360"
        },
        {
            quality: "480p",
            config: "/upload/f_auto/h_480"
        },
        {
            quality: "720p",
            config: "/upload/f_auto/h_720"
        },
        {
            quality: "1080p",
            config: "/upload/f_auto/h_1080"
        }
    ];

    useEffect(() => {
        const part = videoData.videoFile.split("/upload");
        const optimizedUrl = part[0] + videoConfiguration[0].config + part[1];
        setCurrentQuality(optimizedUrl);

        const options = {
            controls: false,
            autoplay: false,
            responsive: true,
            controlBar: {
                playToggle: false, // Removes the play button
                volumePanel: false, // Removes the volume control
                fullscreenToggle: false, // Removes the fullscreen button
            },
            preload: "auto",
            poster: videoData?.thumbnail,
            sources: [
                {
                    src: optimizedUrl,
                    type: optimizedUrl?.endsWith(".m3u8")
                        ? "application/x-mpegURL"
                        : "video/mp4",
                }
            ]
        }

        if (videoRef.current && !playerRef.current) {
            const player = videoJs(videoRef.current, options);
            playerRef.current = player;

            player.ready(() => {
                // Add the quality selector plugin
                const qualityLevels = player.qualityLevels();

                // console.log(qualityLevels)

                // Listen to quality level changes
                qualityLevels.on('change', () => {
                    // Ensure the quality levels plugin is available
                    // const selectedLevel = qualityLevels.selectedIndex;
                    // console.log('Selected Quality Level:', qualityLevels[selectedLevel]);
                });
            });
        }

        // return () => {
        //     if (playerRef.current) {
        //         playerRef.current.dispose(); // Cleanup on component unmount
        //         playerRef.current = null;
        //     }
        // };
    }, [videoData, currentQuality]);

    useEffect(() => {
        const part = videoData.videoFile.split("/upload");
        const optimizedUrl = part[0] + videoConfiguration[0].config + part[1];

        if (playerRef.current) {
            // Update player options dynamically
            playerRef.current.poster(videoData.thumbnail);
            playerRef.current.src({
                src: optimizedUrl,
                type: optimizedUrl?.endsWith(".m3u8")
                    ? "application/x-mpegURL"
                    : "video/mp4",
            });

            playerRef.current.load();
            // playerRef.current.load();
            playerRef.current.on('loadedmetadata', () => setIsLoading(false));
        }
    }, [currentQuality, videoData]);


    // handle play pause
    const handlePlayPause = () => {
        // if paused play
        if (player.paused()) {
            player.play();
            setIsPlaying(true);
        } else {
            // else pause
            player.pause();
            setIsPlaying(false);
        }
    }

    // Update currentTime as the video plays
    const handleTimeUpdate = () => {
        const currentTime = player.currentTime();
        const duration = player.duration();
        setProgress((currentTime / duration) * 100); // Progress as a percentage

        // Get minutes (floor to the nearest integer)
        let minutes = Math.floor(player.currentTime() / 60);

        // Get seconds (remaining after minutes)
        let seconds = Math.floor(player.currentTime() % 60);

        // Format seconds to always show two digits (e.g., 05 instead of 5)
        let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        setCurrentTime(`${minutes} : ${formattedSeconds}`)
    };

    // Set the full duration when the video metadata is loaded
    const handleLoadedMetadata = () => {
        setVolume(player.volume() * 100);
        const durationInSeconds = player.duration()

        // Get minutes (integer part)
        const minutes = Math.floor(durationInSeconds / 60);

        // Get remaining seconds (round to 2 decimal places)
        const seconds = (durationInSeconds % 60).toFixed(0);

        const formattedTime = `${minutes} : ${seconds.padStart(2, '0')}`;
        setDuration(formattedTime); // Set the total duration
    };

    // update the progressbar
    const updateProgress = (value) => {
        if (player) {
            const duration = player.duration();
            const newTime = (value[0] / 100) * duration; // Convert percentage to time
            player.currentTime(newTime); // Set video time
            setProgress(value[0]); // Update progress
        }
    }

    useEffect(() => {

        if (player) {
            // Listen to the event
            player.on('progress', () => {
                const buffered = player.bufferedEnd(); // End of the buffer range
                const duration = player.duration();
                setVideoLoaded((buffered / duration) * 100); // Buffer as a percentage
            });
            player.on('timeupdate', handleTimeUpdate);
            player.on('loadedmetadata', handleLoadedMetadata);
            player.on('volumechange', handleVolumeChange);

            // Clean up event listener when component unmounts
            return () => {
                player.off('progress');
                player.off('timeupdate', handleTimeUpdate);
                player.off('loadedmetadata', handleLoadedMetadata);
                player.off('volumechange', handleVolumeChange);
            }
        };

        // return () => {
        //     videoPlayer
        // }
    }, [videoData, player]);

    // console.log(videoPlayer)


    useEffect(() => {
        // Detect if the user is on a mobile device
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsMobile(isTouchDevice);
    }, [])

    // Custom controllers
    const showControls = () => {
        setShowUi(true);
        // Clear any existing timeout
        if (timeoutId) clearTimeout(timeoutId);

        // Set a timeout to hide controls after 3 seconds
        const id = setTimeout(() => {
            setShowUi(false);
        }, 3000);
        setTimeoutId(id);
    };

    const handleMouseMove = () => {
        if (!isMobile) showControls(); // Show controls immediately on hover
    };

    const middleCircle = () => {
        setTogglePlayPause(true);
        setTimeout(() => {
            setTogglePlayPause(false);
        }, 300);
    }

    const handleClick = () => {
        if (isMobile) showControls();

        if (!isMobile) {
            handlePlayPause();
            middleCircle();
        }
    }

    const handleVolumeChange = (value) => {
        if (value && typeof value[0] === "number") {
            const volume = value[0] / 100;
            player.volume(volume);
            setVolume(volume * 100);
        }
    }

    const handleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = (!isMute)
            setIsMute(!isMute)
        }
    }


    return (
        <div className="container relative flex justify-center items-center aspect-video min-h-80 max-h-[70vh] w-full">
            <video
                ref={videoRef}
                className="object-contain w-full h-full rounded-md" />

            {/* VideoPlayer configurations */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/50 to-transparent" />
            <div
                onMouseMove={handleMouseMove}
                className="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
                <div onClick={handleClick} className="flex items-center justify-center flex-grow">
                    {
                        !isMobile &&
                        <span className={`${togglePlayPause && "!opacity-100 !scale-100"} opacity-0 scale-75 transition-all duration-500 flex items-center justify-center p-5 rounded-full bg-black/50`}>
                            {
                                isPlaying ?
                                    <Play size={40} />
                                    :
                                    <Pause size={40} />
                            }
                        </span>
                    }
                    {
                        isMobile &&
                        <span onClick={handlePlayPause} className="flex items-center justify-center p-5 rounded-full cursor-pointer bg-black/50 backdrop-blur">
                            {
                                isPlaying ?
                                    <Pause size={40} className={`${isPlaying && "!opacity-100"} opacity-0 transition-all duration-300`} />
                                    :
                                    <Play size={40} className={`${!isPlaying && "!opacity-100"} opacity-0 transition-all duration-300`} />
                            }
                        </span>
                    }
                </div>
                <div className={`${showUi ? "opacity-100" : "opacity-0 cursor-none"} h-14 transition-all duration-500 px-8 w-full mx-auto`}>
                    < LoadingCircle className={`${isLoading ? "opacity-100" : "opacity-0"} transition-all  duration-500 absolute top-0 bottom-0 self-center w-12 h-12`} />
                    <div className="left-0 right-0 flex flex-col gap-2 bottom-5">
                        {/* Progress bar */}
                        <div className="relative bottom-0">
                            {/* Display buffer progress */}
                            <Progress value={videoLoaded} color="bg-white/50"
                                className="bottom-0 h-1 bg-white/30" />
                            {/* Slider for seeking */}
                            <Slider className="absolute bottom-0 bg-transparent" onValueChange={updateProgress} value={[progress]} max={100} step={1} />
                        </div>
                        <div className="flex items-center w-full gap-3 text-white">
                            <div className="flex items-center gap-3">
                                <span onClick={handlePlayPause} className="cursor-pointer">
                                    {
                                        isPlaying ?
                                            <Pause size={18} className={`${isPlaying && "!opacity-100"} opacity-0 transition-all duration-300`} />
                                            :
                                            < Play size={18} className={`${isPlaying && "!opacity-0"} opacity-100 transition-all duration-300`} />
                                    }
                                </span>
                                <Input className="p-0 bg-transparent border-none pointer-events-none w-28 max-sm:text-xs disabled:opacity-100" disabled value={`${currentTime} / ${duration}`} />
                                <span className="relative flex items-center gap-3 group">
                                    <span onClick={handleMute} className="cursor-pointer">
                                        {
                                            isMute ?
                                                < VolumeOff size={18} />
                                                :
                                                volume === 0 ?
                                                    <VolumeX size={18} />
                                                    :
                                                    volume < 50 ?
                                                        <Volume1 size={18} />
                                                        :
                                                        <Volume2 size={18} />
                                        }
                                    </span>
                                    <span className="w-20 p-2 transition-all duration-500 bg-white rounded-full opacity-0 group-hover:flex group-hover:opacity-100">
                                        <Slider className="bg-black" onValueChange={handleVolumeChange} value={[volume]} max={100} step={1} />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

VideoPlayer.propTypes = {
    videoData: PropTypes.shape({
        videoFile: PropTypes.string,
        thumbnail: PropTypes.string
    }),
}

export default VideoPlayer





// useEffect(() => {
//     const video = videoRef.current;

//     const part = videoData.videoFile.split("/upload");
//     const optimizedUrl = part[0] + videoConfiguration[0].config + part[1];
//     setCurrentQuality(optimizedUrl);

//     handleProgress()
//     handleLoadedMetadata();

//     // if (video?.duration)

//     // Add event listeners
//     video?.addEventListener('progress', handleProgress);
//     video?.addEventListener('LoadedMetadata', handleLoadedMetadata);

//     // Clean up event listeners when component unmounts
//     return () => {
//         setDuration(0)
//         video?.removeEventListener('progress', handleProgress);
//         video?.removeEventListener('LoadedMetadata', handleLoadedMetadata);
//     };
// }, [videoData, video]);

// // update the progressbar
// const updateProgress = () => {
//     const progressValue = (video?.currentTime / video?.duration) * 100;
//     setProgress(progressValue);
//     handleTimeUpdate();
// }

// // Set the full duration when the video metadata is loaded
// const handleLoadedMetadata = () => {
//     const durationInSeconds = video?.duration

//     // Get minutes (integer part)
//     const minutes = Math.floor(durationInSeconds / 60);

//     // Get remaining seconds (round to 2 decimal places)
//     const seconds = (durationInSeconds % 60).toFixed(0);

//     const formattedTime = `${minutes} : ${seconds.padStart(2, '0')}`;
//     setDuration(formattedTime); // Set the total duration
// };


// const handleProgress = () => {
//     if (video?.buffered.length > 0) {
//         const buffered = video.buffered;
//         const totalBufferedTime = buffered.end(buffered.length - 1); // Last buffered range's end
//         const duration = video?.duration;

//         // Calculate percentage of video that is buffered
//         const percentageLoaded = (totalBufferedTime / duration) * 100;

//         setVideoLoaded(percentageLoaded);
//     }
// };

// // Update currentTime as the video plays
// const handleTimeUpdate = () => {
//     // Get minutes (floor to the nearest integer)
//     let minutes = Math.floor(video?.currentTime / 60);

//     // Get seconds (remaining after minutes)
//     let seconds = Math.floor(video?.currentTime % 60);

//     // Format seconds to always show two digits (e.g., 05 instead of 5)
//     let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
//     setCurrentTime(`${minutes} : ${formattedSeconds}`)
// };

// // handle play pause
// const handlePlayPause = () => {
//     // if paused play
//     if (video?.paused) {
//         video.play();
//         setIsPlaying(true);
//     } else {
//         // else pause
//         video.pause();
//         setIsPlaying(false);
//     }
// }

// // Seek video position
// const handleSeek = (value) => {
//     const video = videoRef.current;
//     const newTime = (value[0] / 100) * video?.duration;
//     video.currentTime = newTime;
//     setProgress(value[0])
// };

// const handleQuality = () => {
// }

// Remove default control ui of video
// useEffect(() => {
//     const video = videoRef.current;

//     if (!video) return;

//     // Ensure controls attribute is removed on mount
//     video.removeAttribute("controls");

//     // Monitor and prevent controls from being added back
//     const observer = new MutationObserver(() => {
//         if (video.hasAttribute("controls")) {
//             video.removeAttribute("controls");
//         }
//     });
//     observer.observe(video, { attributes: true });

//     // Disable keyboard shortcuts for video playback
//     const handleKeyDown = (e) => {
//         const forbiddenKeys = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
//         if (forbiddenKeys.includes(e.key)) {
//             e.preventDefault();
//         }
//     };

//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//         // Cleanup observer and event listener
//         observer.disconnect();
//         document.removeEventListener("keydown", handleKeyDown);
//     };
// }, []);

