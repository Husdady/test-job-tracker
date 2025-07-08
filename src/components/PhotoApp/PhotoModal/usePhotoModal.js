// Hooks
import { useRef, useState, useCallback } from "react";

// Constants
import { USER, ENVIRONMENT } from "../facing-modes";

const initialFacingMode = window.innerWidth > 1024 ? USER : ENVIRONMENT;

/**
 * Hook for implements logic of PhotoModal component
 */
export default function usePhotoModal() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [facingMode, setFacingMode] = useState(initialFacingMode);

  // Callback for toggle facing mode
  const toggleFacingMode = useCallback(() => {
    setFacingMode((prev) => (prev === USER ? ENVIRONMENT : USER));
  }, []);

  return {
    image: image,
    setImage: setImage,
    webcamRef: webcamRef,
    facingMode: facingMode,
    toggleFacingMode: toggleFacingMode,
    initialFacingMode: initialFacingMode,
  };
}
