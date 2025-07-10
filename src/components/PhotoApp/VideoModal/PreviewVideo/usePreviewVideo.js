// Hooks
import { useRef, useEffect } from "react";

/**
 * Hook for implements logic of PreviewVideo component
 * @param {object} params Params
 */
export default function usePreviewVideo({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    if (stream && mounted && videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      mounted = false;
      videoRef.current = null;
    };
  }, [stream, videoRef.current]);

  return {
    videoRef: videoRef,
  };
}
