import React, { useState, useEffect } from "react";

const useAudio = url => {
  const [audio] = useState(new Audio(`audios/${url}.mp3`));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  useEffect(() => {
    toggle();
  }, [])

  return (
    <div>
    </div>
  );
};