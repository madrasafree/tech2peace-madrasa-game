import React, { useState } from "react";
import { Game, Question } from "./components/Game";

const App = () => {
  // const { state, actions } = useContext(StoreContext);
  const [count, setCount] = useState(0);
  return (
    <Question question="מהו שמי?" answerTemplate="שלום שמי %s ואני אוהב לאכול %s מאוד." wordOptions={["משה", "אברהם", "יעקב", "פיצה", "סושי"]} correctAnswer={["משה", "פיצה"]} />
  );
};



export default App;
