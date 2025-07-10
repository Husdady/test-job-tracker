// useVideoModal.js
import { useRef, useState, useEffect, useCallback } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { USER, ENVIRONMENT } from "../facing-modes";

const initialFacingMode = window.innerWidth > 1024 ? USER : ENVIRONMENT;

export default function useVideoModal() {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState(initialFacingMode);
  const [mediaStream, setMediaStream] = useState(null);

  const getStream = useCallback(async (facing = facingMode) => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing },
        audio: true,
      });

      setMediaStream(stream);
    } catch (err) {
      console.error("Error getting stream:", err);
    }
  }, [mediaStream, facingMode]);

  useEffect(() => {
    getStream(facingMode);
    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, [facingMode]);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      customMediaStream: mediaStream,
    });

  const toggleFacingMode = useCallback(() => {
    setFacingMode((prev) => (prev === USER ? ENVIRONMENT : USER));
  }, []);

  return {
    webcamRef,
    mediaStream,
    facingMode,
    initialFacingMode,
    toggleFacingMode,
    startRecording,
    stopRecording,
    status,
    mediaBlobUrl,
    isCapturing: status === "recording",
  };
}
