export default function VideoModal(props) {
  const {
    status,
    webcamRef,
    facingMode,
    mediaStream,
    isCapturing,
    mediaBlobUrl,
    stopRecording,
    startRecording,
    toggleFacingMode,
    initialFacingMode,
  } = useVideoModal();

  // Inyecta el stream manual a react-webcam
  useEffect(() => {
    if (webcamRef.current && mediaStream) {
      webcamRef.current.video.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <ReactModal
      {...props}
      className="video-modal"
      contentLabel="Ejemplo de grabar video desde modal"
    >
      <div className="wrapper">
        <div className="title-box">
          <button className="btn-close" onClick={props.onRequestClose}>
            X
          </button>
          <h2 className="subtitle">Video modal</h2>
        </div>

        <div className="video-box">
          <Webcam
            ref={webcamRef}
            audio={false}
            mirrored={facingMode === "user"}
            videoConstraints={false}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          <div>{status}</div>
          {isCapturing ? (
            <button onClick={stopRecording}>Stop Recording</button>
          ) : (
            <button onClick={startRecording}>Start Recording</button>
          )}
          {initialFacingMode === ENVIRONMENT && (
            <button onClick={toggleFacingMode}>Switch Camera</button>
          )}
        </div>

        {mediaBlobUrl && (
          <div className="taken-video-box">
            <video
              loop
              autoPlay
              controls
              src={mediaBlobUrl}
              className="taken-video"
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
    </ReactModal>
  );
}
