import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../style/controls.css";
import shaka from 'shaka-player/dist/shaka-player.ui';

const VideoPlayer = ({ videoData }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const uiContainerRef = useRef(null);

    useEffect(() => {
        shaka.polyfill.installAll()
        const player = new shaka.Player(videoRef.current);

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

        const uiConfigurations = {
            controlPanelElements: ['play_pause', 'time_and_duration', 'mute', 'volume', 'spacer', 'quality', 'picture_in_picture', 'overflow_menu', 'fullscreen'],
            overflowMenuButtons: ['playback_rate'],
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
        player.load(videoData.videoFile).catch((error) => {
            console.error('Error playing stream:', error);
        });
        playerRef.current = player

        // Wait until the Shaka Player UI is loaded
        // player.addEventListener('loaded', () => {
        //     // Get all resolution buttons in the UI
        //     const resolutionButtons = document.querySelectorAll('.shaka-resolution-button');
        //     resolutionButtons.forEach((button) => {
        //         // Extract the resolution text (e.g., "480p")
        //         const resolutionText = button.textContent.trim();
        //         console.log(button.childNodes)

        //         // Add symbols based on the resolution
        //         if (resolutionText.includes('480p')) {
        //             button.textContent = `${resolutionText} SD`; // Add "SD" for 480p
        //         } else if (resolutionText.includes('720p')) {
        //             button.textContent = `${resolutionText} HD`; // Add "HD" for 720p
        //         } else if (resolutionText.includes('1080p')) {
        //             button.textContent = `${resolutionText} FHD`; // Add "FHD" for 1080p
        //         } else if (resolutionText.includes('1440p')) {
        //             button.textContent = `${resolutionText} QHD`; // Add "QHD" for 1440p
        //         } else if (resolutionText.includes('2160p')) {
        //             button.textContent = `${resolutionText} UHD`; // Add "UHD" for 4K
        //         }
        //     });
        // });

        // Cleanup the player on component unmount
        return () => {
            controls.destroy();
            player.destroy();
            playerRef.current = null;
        }
    }, [videoData]);

    return (
        <div>
            <div ref={uiContainerRef} className="!rounded-md shaka-ui-container bg-black">
                <video
                    ref={videoRef}
                    autoPlay
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