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
        cursorWidth: 3,
        cursorColor: "#567FFF",
        plugins: [WaveformRegionsPlugin.create({ maxLength: 90 })] // Importe o plugin corretamente
      });
      waveform.current.load(url);

      // waveform.current.enableDragSelection({
      //   maxLength: 90
      // });

      // waveform.current.on("region-created", (e) => {
      //   let color = randomColor({
      //     luminosity: "light",
      //     alpha: 0.3,
      //     format: "rgba"
      //   });
      //   e.color = color;
      // });
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
    <Flex flexDirection="column" w="100%">
      <div id="waveform" />
      <Flex flexDirection="row" justifyContent="center">
        <Button m="4" onClick={playAudio}>
          Play / Pause
        </Button>
      </Flex>
    </Flex>
  );
};

export default Waveform;
