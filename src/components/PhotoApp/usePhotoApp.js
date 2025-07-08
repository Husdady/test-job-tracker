// Hooks
import useShowModal from "./hooks/useShowModal";

/**
 * Hook for implements logic of PhotoApp component
 */
export default function usePhotoApp() {
  const photoModal = useShowModal();
  const videoModal = useShowModal();

  return {
    photoModal: photoModal,
    videoModal: videoModal,
  };
}
