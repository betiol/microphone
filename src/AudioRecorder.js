import React, { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugins/record";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState(null);
  const mediaRecorderRef = React.useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        console.log({ audioBlob });
        const audioUrl = URL.createObjectURL(audioBlob);

        if (waveform) {
          waveform.load(audioUrl);
        }

        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);

      setTimeout(() => {
        stopRecording();
      }, 5000);

      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error("Erro ao iniciar a gravação:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const playRecording = () => {
    if (waveform) {
      waveform.play();
      setIsPlaying(true);
    }
  };

  const initializeWaveform = () => {
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "blue",
      progressColor: "purple",
      width: 200,
      height: 100,
      barWidth: 6,
      barGap: 3,
      barRadius: 4,
      plugins: [
        MicrophonePlugin.create({
          container: "#mic",
          waveColor: "purple",
          visualSetting: "frequencyBars"
        })
      ]
    });

    setWaveform(wavesurfer);
  };

  useEffect(() => {
    initializeWaveform();
  }, []);

  return (
    <div className="audio-recorder-container">
      <div className={`recording-indicator ${isRecording ? "recording" : ""}`}>
        {isRecording ? "Gravando..." : "Não está gravando"}
      </div>
      <button
        className={`record-button ${isRecording ? "recording" : ""}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Parar" : "Iniciar Gravação"}
      </button>
      <button
        className="play-button"
        onClick={playRecording}
        disabled={!waveform || isRecording || isPlaying}
      >
        Reproduzir Gravação
      </button>
      <div id="waveform"></div>
      <div id="mic"></div>
    </div>
  );
};

export default AudioRecorder;
