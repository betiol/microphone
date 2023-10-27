import React, { useState } from "react";
import { ReactMic } from "react-mic";
import "./AudioRecorder.css";

const AudioRecorder = ({ onAudioRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onStop = (recordedAudio) => {
    onAudioRecorded(recordedAudio);
  };

  return (
    <div className="audio-recorder-container">
      <div className={`recording-indicator ${isRecording ? "recording" : ""}`}>
        Gravando...
      </div>
      <ReactMic
        record={isRecording}
        onStop={onStop}
        visualSetting="frequencyBars"
      />
      <div className="button-container">
        <button
          className={`record-button ${isRecording ? "recording" : ""}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Parar" : "Gravar"}
        </button>
        {audioBlob && (
          <div>
            <button className="play-button" onClick={onStop}>
              Reproduzir
            </button>
          </div>
        )}
        <div id="waveform"></div>
      </div>
    </div>
  );
};

export default AudioRecorder;
