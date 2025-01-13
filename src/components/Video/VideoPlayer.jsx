import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Pause, Play } from "lucide-react";
import { Slider } from "../ui/slider";

const VideoPlayer = ({ videoData }) => {
    const [currentQuality, setCurrentQuality] = useState();
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState("0 : 0");
    const [currentTime, setCurrentTime] = useState("0 : 0");
    const [videoLoaded, setVideoLoaded] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    const video = videoRef.current;

    const videoConfiguration = [
        {
            quality: "Auto",
            config: "/upload/f_auto/q_auto"
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

    // update the progressbar
    const updateProgress = () => {
        const progressValue = (video.currentTime / video.duration) * 100;
        setProgress(progressValue);
        handleTimeUpdate();
    }

    // Set the full duration when the video metadata is loaded
    const handleLoadedMetadata = () => {
        const durationInSeconds = video?.duration

        // Get minutes (integer part)
        const minutes = Math.floor(durationInSeconds / 60);

        // Get remaining seconds (round to 2 decimal places)
        const seconds = (durationInSeconds % 60).toFixed(0);

        const formattedTime = `${minutes} : ${seconds.padStart(2, '0')}`;
        setDuration(formattedTime); // Set the total duration
    };


    const handleProgress = () => {
        if (video?.buffered.length > 0) {
            const buffered = video.buffered;
            const totalBufferedTime = buffered.end(buffered.length - 1); // Last buffered range's end
            const duration = video.duration;

            // Calculate percentage of video that is buffered
            const percentageLoaded = (totalBufferedTime / duration) * 100;

            setVideoLoaded(percentageLoaded);
        }
    };

    // Update currentTime as the video plays
    const handleTimeUpdate = () => {
        // Get minutes (floor to the nearest integer)
        let minutes = Math.floor(video.currentTime / 60);

        // Get seconds (remaining after minutes)
        let seconds = Math.floor(video.currentTime % 60);

        // Format seconds to always show two digits (e.g., 05 instead of 5)
        let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        setCurrentTime(`${minutes} : ${formattedSeconds}`)
    };

    // handle play pause
    const handlePlayPause = () => {
        // if paused play
        if (video?.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            // else pause
            video.pause();
            setIsPlaying(false);
        }
    }

    // Seek video position
    const handleSeek = (value) => {
        const video = videoRef.current;
        const newTime = (value[0] / 100) * video.duration;
        video.currentTime = newTime;
        setProgress(value[0])
    };

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

    useEffect(() => {
        const part = videoData.videoFile.split("/upload");
        const optimizedUrl = part[0] + videoConfiguration[0].config + part[1];
        setCurrentQuality(optimizedUrl);

        const video = videoRef.current;
        handleProgress()
        handleLoadedMetadata();

        // Add event listener for progress event
        video?.addEventListener('progress', handleProgress);

        // Clean up event listeners when component unmounts
        return () => {
            video?.removeEventListener('progress', handleProgress);
        };
    }, [videoData]);

    return (
        <div className="relative group">
            <video
                ref={videoRef}
                src={currentQuality}
                autoPlay
                // muted
                controlsList="nodownload"
                onTimeUpdate={updateProgress}
                className="object-contain object-center w-full rounded-md aspect-video max-h-[70vh]"
            >
                Your browser does not support the video tag.
            </video>
            {/* VideoPlayer configurations */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
            <div
                onClick={handlePlayPause}
                className="absolute left-0 right-0 flex flex-col justify-end w-[97%] mx-auto transition-all duration-300 bottom-0 pb-5 top-0 group:hover:opacity-100">
                <span>

                </span>
                <div className="relative bottom-0 flex flex-col gap-3">
                    <div className="relative flex items-center gap-3">
                        <span>
                            {
                                isPlaying ?
                                    <Pause size={18} className={`${isPlaying && "!opacity-100"} opacity-0 transition-all duration-300`} />
                                    :
                                    < Play size={18} className={`${isPlaying && "!opacity-0"} opacity-100 transition-all duration-300`} />
                            }
                        </span>
                        <Input className="h-auto p-0 bg-transparent border-none w-fit" onChange={handleTimeUpdate} value={`${currentTime} / ${duration}`} />
                    </div>
                    <div className="relative">
                        <Progress value={videoLoaded} color="bg-accent-foreground/50"
                            className="bottom-0 h-1 bg-accent-foreground/30" />
                        <Slider className="absolute bottom-0 bg-transparent" value={[progress]} onValueChange={handleSeek} max={100} step={1} />
                    </div>
                </div>
            </div>
        </div>
    )
}

VideoPlayer.propTypes = {
    videoData: PropTypes.shape({
        videoFile: PropTypes.string,
    }),
}

export default VideoPlayer