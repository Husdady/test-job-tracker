// Librarys
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { Camera } from "react-camera-pro";

// Hooks
import usePhotoModal from "./usePhotoModal";

// Styles
import "./styles.css";

export default function PhotoModal(props) {
  const { camera, image, setImage } = usePhotoModal();

  return (
    <ReactModal
      {...props}
      preventScroll={false}
      className="photo-modal"
      contentLabel="Ejemplo de Modal"
    >
      <div className="wrapper">
        <h2 className="subtitle">Photo modal</h2>

        <div className="camera-box">
          <Camera ref={camera} />
        </div>

        {image && <img src={image} alt="Taken photo" className="photo" />}

        <button
          className="btn-take-photo"
          onClick={() => setImage(camera.current.takePhoto())}
        >
          Take photo
        </button>

        <button
          className="btn-switch-camera"
          onClick={() => camera.current.switchCamera()}
        >
          Switch camera
        </button>

        <button className="btn-close" onClick={props.onRequestCloseOpen}>
          Cerrar
        </button>
      </div>
    </ReactModal>
  );
}

PhotoModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestCloseOpen: PropTypes.func,
};
