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

// const videoConstraints = {
// width: 360,
// height: 500,
// facingMode: "user",
// facingMode: { exact: "environment" },
// };

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
        <h2 className="subtitle">Video modal</h2>

        <div className="video-box">
          <Webcam
            audio
            mirrored
            width={360}
            height={500}
            ref={webcamRef}
            videoConstraints={{
              width: 360,
              height: 500,
              facingMode: facingMode,
            }}
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
          <button onClick={handlePreview} className="btn-preview-video">👁 Preview Video</button>
        )}

        <button className="btn-close" onClick={props.onRequestClose}>
          Cerrar
        </button>

        {videoUrl && <video controls src={videoUrl} className="taken-video" />}
      </div>
    </ReactModal>
  );
}

VideoModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};
