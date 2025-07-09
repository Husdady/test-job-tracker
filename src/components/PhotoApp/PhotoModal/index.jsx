// Librarys
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

// Hooks
import usePhotoModal from "./usePhotoModal";

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

export default function PhotoModal(props) {
  const {
    image,
    setImage,
    webcamRef,
    facingMode,
    toggleFacingMode,
    initialFacingMode,
  } = usePhotoModal();

  return (
    <ReactModal
      {...props}
      preventScroll={false}
      className="photo-modal"
      contentLabel="Ejemplo de tomar foto desde modal"
    >
      <div className="wrapper">
        <div className="title-box">
          <button className="btn-close" onClick={props.onRequestClose}>
            X
          </button>

          <h2 className="subtitle">Photo modal</h2>
        </div>

        <div className="camera-box">
          <Webcam
            // height={500}
            // width={360}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              // width: 360,
              // height: 500,
              facingMode: facingMode,
            }}
            onUserMedia={(...data) => {
              console.log("Webcam component mounted", data);
            }}
            onUserMediaError={(error) => {
              console.log("Error to mount Webcam compunt", { error });
            }}
          />
        </div>

        <button
          className="btn-take-photo"
          onClick={() => {
            const screenshot = webcamRef.current.getScreenshot();
            setImage(screenshot);
          }}
        >
          📷
        </button>

        {initialFacingMode === ENVIRONMENT && (
          <button className="btn-switch-camera" onClick={toggleFacingMode}>
            Switch camera
          </button>
        )}

        {image && (
          <img key={image} src={image} alt="Taken photo" className="photo" />
        )}
      </div>
    </ReactModal>
  );
}

PhotoModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};
