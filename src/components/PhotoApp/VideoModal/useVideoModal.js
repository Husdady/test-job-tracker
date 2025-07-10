// Hooks
import { useRef, useState, useCallback } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

// Constants
import { USER, ENVIRONMENT } from "../facing-modes";

const initialFacingMode = window.innerWidth > 1024 ? USER : ENVIRONMENT;

/**
 * Hook for implements logic of PhotoModal component
 */
export default function usePhotoModal() {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState(initialFacingMode);

  const { status, ...mediaRecorderData } = useReactMediaRecorder({
    audio: true,
    video: true,
    customMediaStream: webcamRef.current?.stream,
  });

  // Callback for toggle facing mode
  const toggleFacingMode = useCallback(() => {
    setFacingMode((prev) => (prev === USER ? ENVIRONMENT : USER));
  }, []);

  return {
    ...mediaRecorderData,
    status: status,

    webcamRef: webcamRef,
    facingMode: facingMode,
    toggleFacingMode: toggleFacingMode,
    initialFacingMode: initialFacingMode,
    isCapturing: status === "recording",
  };
}
