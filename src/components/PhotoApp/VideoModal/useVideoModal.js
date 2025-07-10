// Hooks
import { useRef, useState, useCallback, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

// Constants
import { USER, ENVIRONMENT } from "../facing-modes";

const initialFacingMode = window.innerWidth > 1024 ? USER : ENVIRONMENT;

/**
 * Hook for PhotoModal logic with manual MediaStream handling
 */
export default function usePhotoModal() {
  const webcamRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [facingMode, setFacingMode] = useState(initialFacingMode);

  // Crea el stream con constraints personalizados
  const getStream = useCallback(async (facing = facingMode) => {
    if (mediaStream) {
      // Stop previous tracks
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing },
        audio: true,
      });

      setMediaStream(stream);
    } catch (error) {
      console.error("Error al obtener el stream de la cámara:", error);
    }
  }, [mediaStream, facingMode]);

  // Inicializa el stream al montar o cuando cambia el facingMode
  useEffect(() => {
    getStream(facingMode);
    // Cleanup cuando el componente se desmonta
    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, [facingMode]);

  // Hook de grabación con stream manual
  const { status, ...mediaRecorderData } = useReactMediaRecorder({
    audio: true,
    video: true,
    customMediaStream: mediaStream,
  });

  // Cambiar cámara
  const toggleFacingMode = useCallback(() => {
    setFacingMode((prev) => (prev === USER ? ENVIRONMENT : USER));
  }, []);

  return {
    ...mediaRecorderData,
    status: status,

    webcamRef: webcamRef,
    mediaStream: mediaStream, // puedes usar esto en <Webcam videoConstraints={false} ... />
    facingMode: facingMode,
    toggleFacingMode: toggleFacingMode,
    initialFacingMode: initialFacingMode,
    isCapturing: status === "recording",
  };
}
