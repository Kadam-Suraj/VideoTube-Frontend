import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../style/controls.css";
import shaka from 'shaka-player/dist/shaka-player.ui';

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

const VideoPlayer = ({ videoData }) => {
    const [currentQuality, setCurrentQuality] = useState(videoConfiguration[0].config);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const uiContainerRef = useRef(null);

    useEffect(() => {
        // Ensure videoFile is defined
        if (!videoData?.videoFile) {
            console.error("videoData or videoFile is not defined.");
            return;
        }

        const part = videoData.videoFile.split("/upload");

        if (part.length < 2) {
            console.error("Invalid videoFile format.");
            return;
        }
        const optimizedUrl = part[0] + videoConfiguration[0].config + part[1];
        setCurrentQuality(optimizedUrl);

    }, [videoData])


    useEffect(() => {
        shaka.polyfill.installAll()
        const player = new shaka.Player(videoRef.current);

        const config = {
            streaming: {
                bufferingGoal: 15, // Set buffer to 15 seconds
            },
        };

        player.configure(config);

        // Event listener for errors
        player.addEventListener("error", (event) => {
            console.error("Shaka Player Error:", event.detail);
        });

        // Check if shaka.ui and shaka.ui.Overlay are available
        if (!shaka.ui || !shaka.ui.Overlay) {
            console.error("Shaka UI or Overlay is not available.");
            return;
        }

        const uiConfigurations = {
            controlPanelElements: ['play_pause', 'time_and_duration', 'mute', 'volume', 'spacer', 'picture_in_picture', 'overflow_menu', 'fullscreen'],
            overflowMenuButtons: ['quality', 'playback_rate'],
            enableTooltips: true,
            seekBarColors: {
                // base: 'rgba(255,255,255,.2)',
                // buffered: 'rgba(255,255,255,.4)',
                played: 'rgb(255,0,0)',
            },
            // customContextMenu: true,
            // contextMenuElements: ['statistics'],
            // statisticsList: ['width', 'height', 'playTime', 'bufferingTime'],
        }
        const ui = new shaka.ui.Overlay(player, uiContainerRef.current, videoRef.current);
        ui.configure(uiConfigurations)
        const controls = ui.getControls();
        // controls.setEnabled(true);
        window.player = player;
        window.ui = ui;

        // Load video based on type
        player.load(currentQuality).catch((error) => {
            console.error('Error playing stream:', error);
        });
        playerRef.current = player

        // Cleanup the player on component unmount
        return () => {
            controls.destroy();
            player.destroy();
            playerRef.current = null;
        }
    }, [currentQuality, videoData]);

    const handleQualityChange = (config) => {
        const part = videoData.videoFile.split("/upload");
        if (part.length < 2) {
            console.error("Invalid videoFile format.");
            return;
        }

        const newUrl = part[0] + config + part[1];
        setCurrentQuality(newUrl);
    };

    return (
        <div>
            <div ref={uiContainerRef} className="!rounded-md shaka-ui-container bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    className="object-fill w-full bg-transparent rounded-md video-player video-poster shaka-video"
                />
            </div>
            <div className="quality-controls">
                {videoConfiguration.map((item) => {
                    if (currentQuality.endsWith(".mp4")) return
                    <button
                        key={item.quality}
                        onClick={() => handleQualityChange(item.config)}
                        className={`btn ${currentQuality.includes(item.config) ? "active" : ""
                            }`}
                    >
                        {item.quality}
                    </button>
                })}
            </div>
        </div>
    )
}

VideoPlayer.propTypes = {
    videoData: PropTypes.shape({
        videoFile: PropTypes.string
    })
}

export default VideoPlayer