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
import PreviewVideo from "./PreviewVideo";

ReactModal.setAppElement("#root");

export default function VideoModal(props) {
  const {
    videoUrl,
    webcamRef,
    recordedChunks,
    mediaBlobUrl,
    previewStream,
    startRecording,
    stopRecording,
    status,

    isCapturing,

    facingMode,
    toggleFacingMode,
    initialFacingMode,

    handlePreview,
    handleStopCapture,
    handleStartCapture,
  } = useVideoModal();

  console.log({ status, previewStream });

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

        {previewStream && <PreviewVideo stream={previewStream} />}

        {status === "recording" && (
          <button className="btn-stop-recording" onClick={stopRecording}>
            Stop recording
          </button>
        )}

        {(status === "idle" ||
          status === "stopped" ||
          status === "stopping") && (
          <button className="btn-recording" onClick={startRecording}>
            Start recording
          </button>
        )}

        {mediaBlobUrl && (
          <div className="taken-video-box">
            <video
              loop
              autoPlay
              controls={false}
              className="taken-video"
              src={mediaBlobUrl}
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
