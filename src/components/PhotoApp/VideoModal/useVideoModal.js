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
  const mediaRecorderRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isCapturing, setCapturing] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [facingMode, setFacingMode] = useState(initialFacingMode);

  // Callback for toggle facing mode
  const toggleFacingMode = useCallback(() => {
    setFacingMode((prev) => (prev === USER ? ENVIRONMENT : USER));
  }, []);

  // Callback for check data available
  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size <= 0) return;
    setRecordedChunks((prev) => prev.concat(data));
  }, []);

  // Callback for start to capturing
  const handleStartCapture = useCallback(() => {
    setVideoUrl(null);
    setCapturing(true);
    setRecordedChunks([]);

    // Detectar orientación
    const isPortraitMode = window.innerHeight > window.innerWidth;
    setIsPortrait(isPortraitMode);

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );

    mediaRecorderRef.current.start();
  }, [handleDataAvailable]);

  // Callback for stop to capturing
  const handleStopCapture = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, []);

  // Callback for preview video
  const handlePreview = useCallback(() => {
    if (recordedChunks?.length <= 0) return;

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    setVideoUrl(url); // Aquí se actualiza el estado para mostrar el preview
  }, [recordedChunks]);

  return {
    videoUrl: videoUrl,
    webcamRef: webcamRef,
    recordedChunks: recordedChunks,

    isPortrait: isPortrait,
    isCapturing: isCapturing,

    facingMode: facingMode,
    toggleFacingMode: toggleFacingMode,
    initialFacingMode: initialFacingMode,

    handlePreview: handlePreview,
    handleStopCapture: handleStopCapture,
    handleStartCapture: handleStartCapture,
  };
}
