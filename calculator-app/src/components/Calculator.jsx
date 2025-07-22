import { useState } from "react";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasDecimal, setHasDecimal] = useState(false);
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Handler for number inputs
  const handleButtonInput = (value) => {
    if (value === "AC") {
      handleClear();
    } else if (["+", "-", "X", "÷"].includes(value)) {
      handleOperator(value);
    } else if (value === "=") {
      handleEquals();
    } else if (value === "+/-") {
      handleSignToggle();
    } else if (value === "%") {
      handlePercentage();
    } else if (value === ".") {
      handleDecimal();
    } else {
      if (waitingForOperand) {
        setDisplayValue(value);
        setWaitingForOperand(false);
      } else {
        setDisplayValue((prev) => (prev === "0" ? value : prev + value));
      }
    }
  };

  // Handler for operatprs
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
    setHasDecimal(false);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+": return firstOperand + secondOperand;
      case "-": return firstOperand - secondOperand;
      case "X": return firstOperand * secondOperand;
      case "÷": return firstOperand / secondOperand;
      default: return secondOperand;
    }
  };

  const handleEquals = () => {
    if (firstOperand === null || !operator) return;
    
    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, inputValue, operator);
    setDisplayValue(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
    setHasDecimal(String(result).includes("."));
  };

  // Handler for sign toggle
  const handleSignToggle = () => {
    setDisplayValue((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev));
  };

  // Handler for percentage
  const handlePercentage = () => {
    setDisplayValue((prev) => (parseFloat(prev) / 100).toString());
  };

  // Handler for clear button
  const handleClear = () => {
    setDisplayValue("0");
    setHasDecimal(false);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (!hasDecimal) {
      setDisplayValue((prev) => prev + ".");
      setHasDecimal(true);
    }
  };

  return (
    <div className="bg-gray-900 ">
      {/* Display Section */}
      <div className="bg-gray-500">
        <div className="text-right text-white text-3xl font-semibold overflow-x-auto">
          {displayValue}
        </div>
      </div>
      <div className="flex">
        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-0.5 w-3/4">
          {["AC","+/-","%","7","8","9","4","5","6","1","2","3","0",".",].map((item) => (
            <button
              key={item}
              onClick={() => handleButtonInput(item)}
              className={`h-16 rounded-none ${
                item === "0" ? "col-span-2" : ""
              } ${
                item === "AC" ? "bg-gray-100" : "bg-gray-300"
              } hover:bg-gray-400`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Operator Pad */}
        <div className="grid gap-0.5 w-1/4">
          {["÷", "X", "-", "+", "="].map((item) => (
            <button
              key={item}
              onClick={() => handleButtonInput(item)}
              className="h-16 rounded-none bg-orange-400 hover:bg-orange-500"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
