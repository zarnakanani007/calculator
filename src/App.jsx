import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // State to store what's on the display
  const [input, setInput] = useState("");

const isOperator=(char)=>{
  return["+","-","*","/","%"].includes(char);
}  

  // Function to handle button clicks
  const handleClick = (value) => {
    if(input === "" && isOperator(value) && value !== "-")return;

    //prevent two operators in a row
    if(isOperator(value) && isOperator(input.slice(-1))) return;

    //prevent multiple dots in the same number
    if(value=== "."){
      const lastNumber=input.split(/[\+\-\*\/%]/).pop();
      if(lastNumber.includes("."))return;
    }
    setInput((prev) => prev + value);
  };

  const calculate=()=>{
    try {
      const result=eval(input);
      setInput(result.toString())
    } catch (error) {
      setInput("Error");
    }
  }

  useEffect(()=>{
    const handleKeyPress=(event)=>{
      const{key}=event;

      if(!isNaN(key) || key==="."){
        handleClick(key);  
      }else if(["+","-","*","/","%"].includes(key)){
        handleClick(key);
      }else if(key ==="Enter" || key==="="){
        calculate();
      }else if(key ==="Backspace"){
        setInput((prev)=>prev.slice(0,-1))
      }else if(key==="Escape"){
        setInput("");
      }
    };
    window.addEventListener("keydown",handleKeyPress);
    return()=>{
      window.removeEventListener("keydown",handleKeyPress)
    }
  },[input])
  return (
    <div className="calculator">
      {/* Display Screen */}
      <div className="display">{input || "0"}</div>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={() => setInput("")}>C</button>
        <button onClick={() => setInput(input.slice(0, -1))}>⌫</button>
        <button onClick={() => handleClick("%")}>%</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={calculate}>=</button>
      </div>
    </div>
  );
}

export default App;
