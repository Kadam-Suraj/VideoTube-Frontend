import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../style/controls.css";
import shaka from 'shaka-player/dist/shaka-player.ui';

const VideoPlayer = ({ videoData }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const uiContainerRef = useRef(null);

    useEffect(() => {
        // Install Shaka polyfills for compatibility with older browsers
        shaka.polyfill.installAll();

        // Initialize the player
        const player = new shaka.Player();

        const config = {
            streaming: {
                lowLatencyMode: true,
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

        // UI configuration
        const uiConfigurations = {
            controlPanelElements: ['play_pause', 'time_and_duration', 'mute', 'volume', 'spacer', 'quality', 'picture_in_picture', 'overflow_menu', 'fullscreen'],
            overflowMenuButtons: ['playback_rate'],
            enableTooltips: true,
            seekBarColors: {
                played: 'rgb(255,0,0)', // Custom seek bar color
            },
        };

        // Create a UI overlay for the player
        const ui = new shaka.ui.Overlay(player, uiContainerRef.current, videoRef.current);
        ui.configure(uiConfigurations);
        const controls = ui.getControls();
        window.player = player;
        window.ui = ui;

        // Attach the player to the media element (video element)
        player.attach(videoRef.current);

        // Function to load video with retry logic
        const loadVideoWithRetry = (videoUrl, retries = 3) => {
            player.load(videoUrl)
                .then(() => {
                    console.log('Video loaded successfully');
                })
                .catch((error) => {
                    console.error('Error loading video:', error);
                    if (retries > 0) {
                        console.log(`Retrying... (${3 - retries + 1})`);
                        loadVideoWithRetry(videoUrl, retries - 1);
                    } else {
                        console.error('Failed to load video after multiple attempts.');
                    }
                });
        };

        // Load video based on type, with retry
        loadVideoWithRetry(videoData.videoFile);

        playerRef.current = player;

        // Cleanup: Destroy controls and player on component unmount
        return () => {
            // Destroy UI controls and player to free up resources
            if (controls) controls.destroy();
            player.destroy();
            playerRef.current = null;
        };
    }, [videoData]);  // This will run on every videoData change

    return (
        <div>
            <div ref={uiContainerRef} className="!rounded-md shaka-ui-container bg-black">
                <video
                    ref={videoRef}
                    // autoPlay
                    className="object-fill w-full bg-transparent rounded-md video-player video-poster shaka-video"
                />
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