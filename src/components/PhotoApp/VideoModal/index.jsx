// Librarys
import PropTypes from "prop-types";
import ReactModal from "react-modal";

export default function VideoModal(props) {
  return (
    <ReactModal
      {...props}
      contentLabel="Ejemplo de Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <h2>Video modal</h2>
      <button onClick={props.onRequestCloseOpen}>Cerrar</button>
    </ReactModal>
  );
}

VideoModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestCloseOpen: PropTypes.func,
};
