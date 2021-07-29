import React, { useState } from "react";
import { Game } from "./components/Game";

const App = () => {
  // const { state, actions } = useContext(StoreContext);
  const [count, setCount] = useState(0);
  return (
    <Game />
  );
};

export default App;
