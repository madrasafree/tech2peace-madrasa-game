import React from "react";
import { Question } from "./components/Question";
import { Story } from "./components/Story/Story";
import Player from "./hooks/use-audio";

const App = () => {
  return (
    <>
      <Story />
      <Player url="audios/p1.mp3" />
    </>
  );
};



export default App;
