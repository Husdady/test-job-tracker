// Hooks
import { useRef, useState } from "react";

/**
 * Hook for implements logic of PhotoModal component
 */
export default function usePhotoModal() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  return {
    image: image,
    camera: camera,
    setImage: setImage,
  };
}
