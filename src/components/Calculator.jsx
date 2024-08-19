import { useState, useEffect, useRef } from "react";
import "./styling/calculator.css";

const Calculator = () => {
    const [display, setDisplay] = useState(
        localStorage.getItem("calculatorAns") || "0"
    );
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }, [display]);

    const clearDisplay = () => {
        setDisplay("0");
        localStorage.setItem("calculatorAns", "0");
    };

    const appendToDisplay = (value) => {
        if (display === "0" || display === "Error") {
            setDisplay(value);
            localStorage.setItem("calculatorAns", value);
        } else {
            setDisplay((prevDisplay) => prevDisplay + value);
            localStorage.setItem("calculatorAns", display + value);
        }
    };

    const calculate = () => {
        if (!display) return;
        try {
            // Safely evaluate the expression
            const result = eval(display);
            setDisplay(result.toString());
            localStorage.setItem("calculatorAns", result.toString());
        } catch (error) {
            setDisplay("Error");
            localStorage.setItem("calculatorAns", "Error");
        }
    };

    const toggleSign = () => {
        if (display && display !== "Error") {
            const newValue =
                display.charAt(0) === "-" ? display.slice(1) : `-${display}`;
            setDisplay(newValue);
            localStorage.setItem("calculatorAns", newValue);
        }
    };

    return (
        <div className="calculator">
            <input
                type="text"
                id="input"
                value={display}
                readOnly
                ref={inputRef}
            />
            <div className="keys">
                <button onClick={clearDisplay}>AC</button>
                <button onClick={toggleSign}>+/-</button>
                <button onClick={() => appendToDisplay("%")}>%</button>
                <button onClick={() => appendToDisplay("/")}>/</button>
                <button onClick={() => appendToDisplay("7")}>7</button>
                <button onClick={() => appendToDisplay("8")}>8</button>
                <button onClick={() => appendToDisplay("9")}>9</button>
                <button onClick={() => appendToDisplay("*")}>x</button>
                <button onClick={() => appendToDisplay("4")}>4</button>
                <button onClick={() => appendToDisplay("5")}>5</button>
                <button onClick={() => appendToDisplay("6")}>6</button>
                <button onClick={() => appendToDisplay("-")}>-</button>
                <button onClick={() => appendToDisplay("1")}>1</button>
                <button onClick={() => appendToDisplay("2")}>2</button>
                <button onClick={() => appendToDisplay("3")}>3</button>
                <button onClick={() => appendToDisplay("+")}>+</button>
                <button id="zero" onClick={() => appendToDisplay("0")}>
                    0
                </button>
                <button id="zero" onClick={() => appendToDisplay("00")}>
                    00
                </button>
                <button onClick={() => appendToDisplay(".")}>.</button>
                <button onClick={calculate}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
