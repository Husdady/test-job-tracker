// Librarys
import PropTypes from "prop-types";

// Hooks
import usePreviewVideo from "./usePreviewVideo";

export default function PreviewVideo({ stream }) {
  const { videoRef } = usePreviewVideo({ stream });

  if (!stream) {
    return null;
  }

  return (
    <div className="video-box">
      <video autoPlay controls={false} ref={videoRef} />
    </div>
  );
}

PreviewVideo.propTypes = {
  stream: PropTypes.object,
};
