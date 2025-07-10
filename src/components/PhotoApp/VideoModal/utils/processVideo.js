// src/utils/processVideo.js
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

export async function rotateVideoWebMToMP4(blob, isPortrait = true) {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  const inputName = "input.webm";
  const outputName = "output.mp4";

  ffmpeg.FS("writeFile", inputName, await fetchFile(blob));

  // Solo rota si es vertical
  const transposeFilter = isPortrait ? "-vf transpose=1" : "";

  await ffmpeg.run(
    "-i",
    inputName,
    ...transposeFilter.split(" "), // solo si esPortrait
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
    "-movflags",
    "faststart",
    "-pix_fmt",
    "yuv420p",
    outputName
  );

  const data = ffmpeg.FS("readFile", outputName);
  const correctedBlob = new Blob([data.buffer], { type: "video/mp4" });
  const correctedUrl = URL.createObjectURL(correctedBlob);

  return correctedUrl;
}
