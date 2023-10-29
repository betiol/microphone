import Wavesurfer from "wavesurfer.js";
import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import WaveformRegionsPlugin from "wavesurfer.js/dist/plugins/regions"; // Corrija o caminho de importação
import randomColor from "randomcolor";

const Waveform = ({ url }) => {
  console.log({ url });
  const waveform = useRef(null);

  useEffect(() => {
    if (!waveform.current) {
      waveform.current = Wavesurfer.create({
        container: "#waveform",
        waveColor: "#567FFF",
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        width: 100,
        cursorWidth: 3,
        cursorColor: "#567FFF",
        plugins: [WaveformRegionsPlugin.create({ maxLength: 90 })] // Importe o plugin corretamente
      });
      waveform.current.load(url);
    }
  }, []);

  const deleteClip = (clipid) => {
    waveform.current.regions.list[clipid].remove();
  };

  const playClip = (clipid) => {
    waveform.current.regions.list[clipid].play();
  };

  const playAudio = () => {
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
    } else {
      waveform.current.play();
    }
  };

  return (
    <>
      <div id="waveform" />
      <Button m="4" onClick={playAudio}>
        Play / Pause
      </Button>
    </>
  );
};

export default Waveform;
