import PropTypes from "prop-types"

const VideoPlayer = ({ video }) => {
    return (
        <video src={video.videoFile} autoPlay muted={false} controls className="object-contain object-center w-full rounded-md aspect-video max-h-[70vh]" >
            Your browser does not support the video tag.
        </video>
    )
}

VideoPlayer.propTypes = {
    video: PropTypes.shape({
        videoFile: PropTypes.string,
    }),
}

export default VideoPlayer