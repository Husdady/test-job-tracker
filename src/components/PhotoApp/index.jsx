// Librarys
import ReactModal from "react-modal";

// Hooks
import usePhotoApp from "./usePhotoApp";

// Styles
import "./styles.css";
import PhotoModal from "./PhotoModal";
import VideoModal from "./VideoModal";

export default function PhotoApp() {
  const { photoModal, videoModal } = usePhotoApp();

  return (
    <main className="photo-app">
      <p className="message">
        To start the job, take photos or video of all spaces to be cleaned. A
        minimum of 5 photos or a 10 second video is required to start this job.
      </p>

      <div className="box">
        <button onClick={photoModal.show}>Photos</button>
        <button onClick={videoModal.show}>Video</button>
      </div>

      {photoModal.isShowing && (
        <PhotoModal isOpen onRequestClose={photoModal.hide} />
      )}

      {videoModal.isShowing && (
        <VideoModal isOpen onRequestClose={videoModal.hide} />
      )}
    </main>
  );
}
