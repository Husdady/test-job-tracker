// Librarys
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

// Hooks
import useVideoModal from "./useVideoModal";

// Constants
import { ENVIRONMENT } from "../facing-modes";

// Styles
import "./styles.css";

ReactModal.setAppElement("#root");

export default function VideoModal(props) {
  const {
    videoUrl,
    webcamRef,
    facingMode,
    isCapturing,
    recordedChunks,
    toggleFacingMode,
    initialFacingMode,

    handlePreview,
    handleStopCapture,
    handleStartCapture,
  } = useVideoModal();

  return (
    <ReactModal
      {...props}
      className="video-modal"
      contentLabel="Ejemplo de grabar video desde modal"
    >
      <div className="wrapper">
        <div className="title-box">
          <button className="btn-close" onClick={props.onRequestClose}>
            X
          </button>

          <h2 className="subtitle">Video modal</h2>
        </div>

        <div className="video-box">
          <Webcam
            audio
            // mirrored
            ref={webcamRef}
            videoConstraints={{ facingMode }}
            onUserMedia={(...data) => {
              console.log("Video Webcam component mounted", data);
            }}
            onUserMediaError={(error) => {
              console.log("Error to mount Video Webcam compunt", { error });
            }}
          />
        </div>

        {isCapturing && (
          <button className="btn-stop-recording" onClick={handleStopCapture}>
            Stop recording
          </button>
        )}

        {!isCapturing && (
          <button className="btn-recording" onClick={handleStartCapture}>
            Start recording
          </button>
        )}

        {initialFacingMode === ENVIRONMENT && (
          <button className="btn-switch-video" onClick={toggleFacingMode}>
            Switch camera
          </button>
        )}

        {!isCapturing && recordedChunks.length > 0 && !videoUrl && (
          <button onClick={handlePreview} className="btn-preview-video">
            👁 Preview Video
          </button>
        )}

        {videoUrl && (
          <div className="taken-video-box">
            <video
              loop
              autoPlay
              src={videoUrl}
              controls={false}
              className="taken-video"
            />

            <video controls src={videoUrl} className="taken-video" />
          </div>
        )}
      </div>
    </ReactModal>
  );
}

VideoModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};
