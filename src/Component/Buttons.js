import React, { useEffect, useState, useCallback } from "react";
import "./app.css";
import { Memory } from "./Memory";

export const Buttons = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [value, setValue] = useState("");
  const [memory, setMemory] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showMemory, setShowMemory] = useState(false);
  const numbers=[".","0","1","2","3","4","5","6","7","8","9"];
  const operators=["+","-","*","/","%"];

   const handleUserKeyPress = useCallback((event) => {
        const { key ,keyCode} = event;

        if(key === 'c' || key === 'C'){
            clear();
        }
        else if(keyCode === 8){
            backSpace();
        }
        else if(keyCode === 13){
            performCalculation();
        }
        else if(numbers.includes(key)){
            clickNumbers(key.toString());
        }
        else if(operators.includes(key)){
            clickOperation(key.toString());
        }
        
    });
 
  useEffect(() => {
    if (answer) {
      let val = value + " = " + result;
      console.log("Result",result);
      setMemory([...memory, { id: memory.length + 1, Memory: val }]);
      setShowData(true);
      setFirstNumber(result.toString());
      setSecondNumber("");
      setOperation("");
      setResult("");
      setAnswer(false);
    }
    console.log("first",firstNumber)
    setValue(firstNumber + " " + operation + " " + secondNumber);
}, [firstNumber, operation, secondNumber, result]);


    useEffect(() => {
      window.addEventListener("keydown", handleUserKeyPress);

      return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
      };
    }, [handleUserKeyPress]);

  function clickNumbers(val) {
    if (operation === "") {
      setResult("");
      console.log(val)
      setFirstNumber(firstNumber + val);
    } else {
      setSecondNumber(secondNumber + val);
    }
  }

  function handleNumber(e) {
    e.preventDefault();
    const val = e.target.innerText;
    clickNumbers(val);
  }

  function clickOperation(val) {
    setResult("");
    setOperation(val);
  }

  function handleOperator(e) {
    e.preventDefault();
    const val = e.target.innerText;
    clickOperation(val);
  }


  function performCalculation() {
    if (firstNumber.includes("..") || secondNumber.includes("..")) {
      setValue("Error. Press C for Reset or CE for Backspace");
      return;
    }
    if (firstNumber !== "" && secondNumber !== "") {
        setAnswer(true);
      switch (operation) {
        case "+":
          setResult(Number(firstNumber) + Number(secondNumber));
          break;
        case "-":
          setResult(Number(firstNumber) - Number(secondNumber));
          
          break;
        case "*":
          setResult(Number(firstNumber) * Number(secondNumber));
          
          break;
        case "/":
          setResult(Number(firstNumber) / Number(secondNumber));
          
          break;
        case "%":
          setResult(Number(firstNumber) % Number(secondNumber));
          break;
      }
    } else {
      setValue("Require two values for calculation.");
    }
  }

  function clear() {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setValue("");
    setResult("");
  }

  function backSpace() {
    let result1 = result.toString();
    if (operation === "") {
      setFirstNumber(firstNumber.substr(0, firstNumber.length - 1));
      setResult(result1.substr(0, result1.length - 1));
    } else {
      if (secondNumber !== "") {
        setSecondNumber(secondNumber.substr(0, secondNumber.length - 1));
      } else {
        setOperation(operation.substr(0, operation.length - 1));
      }
    }
  }

  function toggleHistory() {
    setShowButton(!showButton);
    setShowMemory(!showMemory);
  }

  return (
    <div className="Container">
      <div className="calculator" id="keyMap">
        <form name="form">
          <div className="hRow" onClick={toggleHistory}>
            {showMemory ? "Keypad" : "History"}
          </div>
          <div className="display">
            <div className="input">{answer ? result : value ? value : 0}</div>
          </div>
          {showButton ? (
            <div className="buttons">
              <div className="row">
                <div onClick={backSpace} className="uperKey">
                  CE
                </div>
                <div onClick={clear} className="uperKey">
                  C
                </div>
                <div onClick={handleOperator} className="uperKey">
                  %
                </div>
                <div onClick={handleOperator} className="operator">
                  /
                </div>
              </div>
              <div className="row">
                <div onClick={handleNumber} className="keypad">
                  7
                </div>
                <div onClick={handleNumber} className="keypad">
                  8
                </div>
                <div onClick={handleNumber} className="keypad">
                  9
                </div>
                <div onClick={handleOperator} className="operator">
                  *
                </div>
              </div>

              <div className="row">
                <div onClick={handleNumber} className="keypad">
                  4
                </div>
                <div onClick={handleNumber} className="keypad">
                  5
                </div>
                <div onClick={handleNumber} className="keypad">
                  6
                </div>
                <div onClick={handleOperator} className="operator">
                  -
                </div>
              </div>

              <div className="row">
                <div onClick={handleNumber} className="keypad">
                  1
                </div>
                <div onClick={handleNumber} className="keypad">
                  2
                </div>
                <div onClick={handleNumber} className="keypad">
                  3
                </div>
                <div onClick={handleOperator} className="operator">
                  +
                </div>
              </div>

              <div className="row">
                <div onClick={handleNumber} className="zero">
                  0
                </div>
                <div onClick={handleNumber} className="keypad">
                  .
                </div>
                <div onClick={performCalculation} className="operator">
                  =
                </div>
              </div>
            </div>
          ) : (
            <Memory memory={memory} showData={showData} />
          )}
        </form>
      </div>
      <h5>&copy; Haseeb Ali Sajid.2020 </h5>
    </div>
  );
};
