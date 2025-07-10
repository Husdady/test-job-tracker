// Librarys
import { FFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg();

export async function rotateVideoWebMToMP4(blob, isPortrait = true) {
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
  }

  const inputName = "input.webm";
  const outputName = "output.mp4";

  await ffmpeg.writeFile(inputName, await fetchBlob(blob));

  // Opcional: agregar filtro de rotación solo si es vertical
  const vfArgs = isPortrait ? ["-vf", "transpose=1"] : [];

  await ffmpeg.exec([
    "-i",
    inputName,
    ...vfArgs,
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
    "-movflags",
    "faststart",
    "-pix_fmt",
    "yuv420p",
    outputName,
  ]);

  const data = await ffmpeg.readFile(outputName);
  const correctedBlob = new Blob([data.buffer], { type: "video/mp4" });
  const correctedUrl = URL.createObjectURL(correctedBlob);

  return correctedUrl;
}

// Utilidad para convertir Blob a ArrayBuffer
async function fetchBlob(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
