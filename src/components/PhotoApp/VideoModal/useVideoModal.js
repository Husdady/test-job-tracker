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
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({
      audio: true,
      video: true,
      askPermissionOnMount: true,
    });

  return {
    status: status,
    mediaBlobUrl: mediaBlobUrl,
    previewStream: previewStream,
    stopRecording: stopRecording,
    startRecording: startRecording,
  };
}
