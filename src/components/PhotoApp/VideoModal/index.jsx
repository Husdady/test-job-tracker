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
    webcamRef,
    facingMode,
    isCapturing,
    mediaBlobUrl,
    stopRecording,
    startRecording,
    toggleFacingMode,
    initialFacingMode,
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
          <Webcam audio ref={webcamRef} videoConstraints={{ facingMode }} />
        </div>

        {isCapturing && (
          <button className="btn-stop-recording" onClick={stopRecording}>
            Stop recording
          </button>
        )}

        {!isCapturing && (
          <button className="btn-recording" onClick={startRecording}>
            Start recording
          </button>
        )}

        {initialFacingMode === ENVIRONMENT && (
          <button className="btn-switch-video" onClick={toggleFacingMode}>
            Switch camera
          </button>
        )}

        {mediaBlobUrl && (
          <div className="taken-video-box">
            <video
              loop
              autoPlay
              controls={false}
              src={mediaBlobUrl}
              className="taken-video"
              // className={`taken-video ${isPortrait ? "portrait-video" : ""}`}
            />
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
