// Librarys
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

// Hooks
import usePhotoModal from "./usePhotoModal";

// Styles
import "./styles.css";

ReactModal.setAppElement("#root");

const videoConstraints = {
  width: 360,
  height: 500,
  // facingMode: "user",
  facingMode: { exact: "environment" },
  // facingMode: { exact: "environment" },
};

export default function PhotoModal(props) {
  const { image, setImage, webcamRef } = usePhotoModal();

  return (
    <ReactModal
      {...props}
      className="photo-modal"
      contentLabel="Ejemplo de Modal"
      // appElement
    >
      <div className="wrapper">
        <h2 className="subtitle">Photo modal</h2>

        <div className="camera-box">
          <Webcam
            height={500}
            width={360}
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
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
            console.log({ screenshot });
            setImage(screenshot);
            // setImage(null);

            // setTimeout(() => {
            //   const screenshot = webcamRef.current.getScreenshot();

            //   if (screenshot) {
            //     setImage(screenshot);
            //   }
            // }, 50);
          }}
        >
          Take photo
        </button>

        <button
          className="btn-switch-camera"
          onClick={() => webcamRef.current.switchCamera()}
        >
          Switch camera
        </button>

        <button className="btn-close" onClick={props.onRequestCloseOpen}>
          Cerrar
        </button>

        {image && (
          <img key={image} src={image} alt="Taken photo" className="photo" />
        )}
      </div>
    </ReactModal>
  );
}

PhotoModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestCloseOpen: PropTypes.func,
};
