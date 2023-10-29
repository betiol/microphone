import React, { useState } from "react";
import AudioRecorder from "./AudioRecorder"; // Importe o componente AudioRecorder
import Waveform from "./WaveForm"; // Importe o componente Waveform
import { Button } from "@chakra-ui/react";

const App = () => {
  const [audioUrl, setAudioUrl] = useState(null);

  const handleAudioRecorded = (recordedBlob) => {
    setAudioUrl(URL.createObjectURL(recordedBlob.blob));
  };

  return (
    <div>
      <h1>Gravador de Áudio</h1>
      <AudioRecorder onAudioRecorded={handleAudioRecorded} />

      {audioUrl && (
        <div>
          <h2>Áudio Gravado</h2>
          <Waveform url={audioUrl} />
        </div>
      )}

      <Button onClick={() => setAudioUrl(null)}>Limpar</Button>
      <div id="waveform"></div>
    </div>
  );
};

export default App;
