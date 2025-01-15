import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Maximize, Pause, Play, RotateCcw, Volume1, Volume2, VolumeOff, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";
import LoadingCircle from "../LoadingCircle";
import "../../style/videojs.css";
import screenfull from "screenfull";
import videoJs from "video.js";

const VideoPlayer = ({ videoData }) => {
    const [currentQuality, setCurrentQuality] = useState();
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState("0 : 0");
    const [seekTime, setSeekTime] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showUi, setShowUi] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [togglePlayPause, setTogglePlayPause] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(0);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 }); // Popup position
    const [track, setTrack] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

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
            autoplay: true,
            // controlBar: {
            //     playToggle: true,
            //     volumePanel: { inline: false },
            //     currentTimeDisplay: true,
            //     timeDivider: true,
            //     durationDisplay: true,
            //     remainingTimeDisplay: true,
            //     progressControl: true,
            //     fullscreenToggle: true,
            //     playbackRateMenuButton: true,
            //     chaptersButton: true,
            //     subsCapsButton: true,
            //     textTrackSettings: true,
            // },
            controls: false,
            fluid: true,
            nativeControlsForTouch: false,
            poster: videoData?.thumbnail,
            preload: "auto",
            responsive: true,
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
                // const qualityLevels = player.qualityLevels();

                // console.log(qualityLevels)

                // Listen to quality level changes
                // qualityLevels.on('change', () => {
                //     // Ensure the quality levels plugin is available
                //     // const selectedLevel = qualityLevels.selectedIndex;
                //     // console.log('Selected Quality Level:', qualityLevels[selectedLevel]);
                // });
            });
            player.height(500);
        }

        if (player) {
            // Listen to the event
            player.on('progress', () => {
                const buffered = player.bufferedEnd(); // End of the buffer range
                const duration = player.duration();
                setVideoLoaded((buffered / duration) * 100); // Buffer as a percentage
            });

            const handleFullscreenChange = () => {
                if (screenfull.isEnabled) {
                    setIsFullscreen(screenfull.isFullscreen);
                }
            };

            if (screenfull.isEnabled) {
                screenfull.on("change", handleFullscreenChange);
            }
            player.on('timeupdate', handleTimeUpdate);
            player.on('ended', () => setTrack(false));
            player.on('play', () => setTrack(true));
            player.on('loadedmetadata', handleLoadedMetadata);
            player.on('volumechange', handleVolumeChange);

            // Clean up event listener when component unmounts
            return () => {
                if (screenfull.isEnabled) {
                    screenfull.off("change", handleFullscreenChange);
                }
                player.off('progress');
                player.off('ended');
                player.off('play');
                player.off('timeupdate', handleTimeUpdate);
                player.off('loadedmetadata', handleLoadedMetadata);
                player.off('volumechange', handleVolumeChange);
            }
        };

        // return () => {
        //     if (playerRef.current && !videoRef.current) {
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

    const handleFullscreenToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle(videoRef.current);
            setIsFullscreen(!isFullscreen);
        }
    };

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
        middleCircle();
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
        setCurrentTime(`${minutes} : ${formattedSeconds}`);
        // setSeekTime(`${minutes} : ${formattedSeconds}`)
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
            // if (value[0] === 0) handleMute();
            const volume = value[0] / 100;
            player.volume(volume);
            setVolume(volume * 100);
        }
    }

    const handleMute = () => {
        if (videoRef.current) {
            const volume = (player.volume() * 100)
            videoRef.current.muted = (!isMute)
            videoRef.current.muted ? setVolume(0) : setVolume(volume);
            setIsMute(!isMute)
        }
    }

    // Handle hover to calculate seek time
    const handleSeekTime = (e) => {
        if (player) {
            const duration = player.duration();
            const slider = e.target?.getBoundingClientRect(); // Get slider dimensions
            const hoverX = e.clientX - slider?.left; // Mouse position relative to the slider
            const sliderWidth = slider?.width;
            const time = Math.floor((hoverX / sliderWidth) * duration); // Calculate hover time
            // const newTime = (value[0] / 100) * duration; // Convert percentage to time
            const calculatedTime = (time > 0 ? Math.min(time, duration) : 0); // Ensure valid range

            // Get minutes (floor to the nearest integer)
            let minutes = Math.floor(calculatedTime / 60);

            // Get seconds (remaining after minutes)
            let seconds = Math.floor(calculatedTime % 60);

            // Format seconds to always show two digits (e.g., 05 instead of 5)
            let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
            setSeekTime(`${minutes} : ${formattedSeconds}`);
            setPopupPosition({ x: hoverX, y: -35 }); // Adjust popup position (above slider)
        }
    };

    return (
        <div className={`relative flex justify-center items-center max-h-[70vh] w-full !rounded-md mx-auto`}>
            <video
                ref={videoRef}
                controls={false}
                className="object-fill w-full h-full bg-transparent video-js !vjs-poster" />

            {/* VideoPlayer configurations */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/50 rounded-b-md to-transparent" /> */}
            <div
                onMouseMove={handleMouseMove}
                className="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
                <div onClick={handleClick} className="relative flex items-center justify-center flex-grow text-white">
                    {isLoading && < LoadingCircle className={`${isLoading ? "opacity-100" : "opacity-0"} absolute top-0 bottom-0 left-0 right-0 transition-all duration-500 m-auto w-12 h-12`} />}
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
                        <span onClick={handlePlayPause} className={`${togglePlayPause && "!opacity-100 !scale-100"} opacity-0 scale-75 transition-all duration-500 flex items-center justify-center p-5 rounded-full cursor-pointer bg-black/40 backdrop-blur`}>
                            {
                                isPlaying ?
                                    <Pause size={40} className={`${isPlaying && "!opacity-100"} opacity-0 transition-all duration-300`} />
                                    :
                                    <Play size={40} className={`${!isPlaying && "!opacity-100"} opacity-0 transition-all duration-300`} />
                            }
                        </span>
                    }
                    {
                        !track && <RotateCcw />
                    }
                </div>
                <div className={`${showUi ? "opacity-100" : "opacity-0 cursor-none"} h-14 flex items-end transition-all font-medium duration-500 px-8 w-full mx-auto`}>
                    <div className="flex flex-col flex-grow">

                        {/* Progress bar */}
                        <div className="relative bottom-0 flex items-center justify-center max-sm:py-2">

                            {/* Display buffer progress */}
                            <Progress value={videoLoaded} color="bg-white/50"
                                className="h-1 bg-white/30" />

                            {/* Slider for seeking */}
                            <span className="absolute bottom-0 left-0 right-0 group">
                                <Slider
                                    onMouseMove={handleSeekTime}
                                    indicator="bg-red-500" className="bg-transparent max-sm:py-2" onValueChange={updateProgress} value={[progress]} max={100} step={0.1} />

                                {/* Hover popup */}
                                {seekTime !== null && (
                                    <div
                                        className="absolute hidden px-2 py-1 pr-3 text-sm transition-all duration-500 border rounded-md border-accent-foreground/90 text-background bg-accent-foreground/80 backdrop-blur group-hover:block"
                                        style={{
                                            left: `${popupPosition.x}px`,
                                            top: `${popupPosition.y}px`,
                                            transform: "translateX(-50%)",
                                        }}
                                    >
                                        {seekTime}
                                    </div>
                                )}
                            </span>
                        </div>
                        <div className="flex items-center justify-between w-full gap-3 text-white">

                            {/* Left side controls */}
                            {/* Playback controls */}
                            <div className="flex items-center gap-3">
                                <span onClick={handlePlayPause} className="cursor-pointer">
                                    {
                                        isPlaying ?
                                            <Pause size={18} className={`${isPlaying && "!opacity-100"} opacity-0 transition-all duration-300`} />
                                            :
                                            < Play size={18} className={`${isPlaying && "!opacity-0"} opacity-100 transition-all duration-300`} />
                                    }
                                </span>
                                <Input type="text" className="w-[6rem] text-center p-0 m-0 border-none pointer-events-none bg-transparent max-sm:text-xs disabled:opacity-100" disabled value={`${currentTime} / ${duration}`} />

                                {/* Volume controls */}
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
                                    <span className={`${!isMobile ? "group-hover:flex group-hover:opacity-100" : "opacity-100 flex"} hidden opacity-0 w-28 p-1 transition-all duration-500 bg-black rounded-full`}>
                                        <Slider
                                            indicator={`!w-[${volume}%] bg-red-500 transition-all duration-200`}
                                            className="transition-transform duration-200 ease-out transform"
                                            onValueChange={handleVolumeChange} value={[volume]} max={100} step={0.1} />
                                    </span>
                                </span>
                            </div>

                            {/* Right side controls */}
                            <div>
                                <Maximize onClick={handleFullscreenToggle} className="cursor-pointer" size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

VideoPlayer.propTypes = {
    videoData: PropTypes.shape({
        videoFile: PropTypes.string,
        thumbnail: PropTypes.string
    }),
}

export default VideoPlayer