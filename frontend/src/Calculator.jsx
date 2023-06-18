import React from "react";
import "./assets/styles/calculator.css";

function Calculator() {
  const [expression, setExpression] = React.useState("");
  const [showResult, setShowResult] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleEqualClick();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleEqualClick]);

  function countOperators(str) {
    let count = 0;
    for (let i = 0; i < str.length; i += 1) {
      count += "+-*/".includes(str[i]) ? 1 : 0;
    }
    return count;
  }

  function handleDigitClick(digit) {
    if (showResult) {
      setExpression("");
      setShowResult(false);
    } else {
      setExpression((prevExpression) => (prevExpression += digit));
    }
  }

  function handleOperatorClick(operator) {
    if (showResult) {
      setExpression("");
      setShowResult(false);
    } else {
      const firstChar = expression[0];
      const lastChar = expression[expression.length - 1];

      if (countOperators(expression) === 0) {
        if (expression === "" && operator === "-") {
          setExpression((prevExpression) => (prevExpression += operator));
        } else if (expression !== "") {
          setExpression((prevExpression) => (prevExpression += operator));
        }
      } else if (countOperators(expression) === 1) {
        if (expression !== "-") {
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              lastChar
            ) &&
            firstChar === "-"
          ) {
            setExpression((prevExpression) => (prevExpression += operator));
          } else if (
            (lastChar === "-" ||
              lastChar === "/" ||
              lastChar === "*" ||
              lastChar === "+") &&
            operator === "-"
          ) {
            setExpression((prevExpression) => (prevExpression += operator));
          }
        }
      } else if (countOperators(expression) === 2) {
        if (firstChar === "-") {
          if (
            (lastChar === "-" ||
              lastChar === "/" ||
              lastChar === "*" ||
              lastChar === "+") &&
            operator === "-"
          ) {
            setExpression((prevExpression) => (prevExpression += operator));
          }
        }
      }
    }
  }

  function handleClearClick() {
    setExpression("");
    setShowResult(false);
  }

  function handleDeleteClick() {
    if (showResult) {
      setExpression("");
      setShowResult(false);
    } else {
      setExpression((prevExpression) => prevExpression.slice(0, -1));
    }
  }

  async function handleEqualClick() {
    if (showResult) {
      setExpression("");
      setShowResult(false);
    } else {
      const matches = expression.match(
        /([-+]?\d+(?:\.\d+)?)([-+*/])([-+]?\d+(?:\.\d+)?)/
      );
      if (!matches) {
        console.error("Error: Invalid expression");
        return;
      }

      const num1 = parseFloat(matches[1]);
      const num2 = parseFloat(matches[3]);
      const operator = matches[2];

      const url = "http://localhost:3000";

      try {
        if (operator === "+") {
          const response = await fetch(`${url}/addition/${num1}/${num2}`, {
            method: "GET",
          });
          const data = await response.json();

          if (data.status === "success") {
            setExpression(String(data.result));
            setShowResult(true);
          } else {
            console.error("Error:", data.result);
          }
        } else if (operator === "-") {
          const response = await fetch(`${url}/subtraction`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ num1, num2 }),
          });
          const data = await response.json();

          if (data.status === "success") {
            setExpression(String(data.result));
            setShowResult(true);
          } else {
            console.error("Error:", data.result);
          }
        } else if (operator === "*") {
          const response = await fetch(`${url}/multiply/${num1}/${num2}`, {
            method: "GET",
          });
          const data = await response.json();

          if (data.status === "success") {
            setExpression(String(data.result));
            setShowResult(true);
          } else {
            console.error("Error:", data.result);
          }
        } else if (operator === "/") {
          const response = await fetch(`${url}/divide`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ num1, num2 }),
          });
          const data = await response.json();

          if (data.status === "success") {
            setExpression(String(data.result));
            setShowResult(true);
          } else {
            setExpression("Error");
            setShowResult(true);
            console.error("Error:", data.result);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div id="calculator">
      <div id="display" className="display">
        {expression}
      </div>
      <button
        type="button"
        id="clear"
        className="ac double-width"
        onClick={handleClearClick}
      >
        AC
      </button>
      <button
        type="button"
        id="delete"
        className="del"
        onClick={handleDeleteClick}
      >
        DEL
      </button>
      <button
        type="button"
        id="divide"
        className="operator end-row"
        onClick={() => handleOperatorClick("/")}
      >
        /
      </button>
      <button type="button" id="seven" onClick={() => handleDigitClick("7")}>
        7
      </button>
      <button type="button" id="eight" onClick={() => handleDigitClick("8")}>
        8
      </button>
      <button type="button" id="nine" onClick={() => handleDigitClick("9")}>
        9
      </button>
      <button
        type="button"
        id="multiply"
        className="operator"
        onClick={() => handleOperatorClick("*")}
      >
        x
      </button>
      <button type="button" id="four" onClick={() => handleDigitClick("4")}>
        4
      </button>
      <button type="button" id="five" onClick={() => handleDigitClick("5")}>
        5
      </button>
      <button type="button" id="six" onClick={() => handleDigitClick("6")}>
        6
      </button>
      <button
        type="button"
        id="subtract"
        className="operator"
        onClick={() => handleOperatorClick("-")}
      >
        -
      </button>
      <button type="button" id="one" onClick={() => handleDigitClick("1")}>
        1
      </button>
      <button type="button" id="two" onClick={() => handleDigitClick("2")}>
        2
      </button>
      <button type="button" id="three" onClick={() => handleDigitClick("3")}>
        3
      </button>
      <button
        type="button"
        id="add"
        className="operator"
        onClick={() => handleOperatorClick("+")}
      >
        +
      </button>
      <button
        type="button"
        id="zero"
        className="zero double-width"
        onClick={() => handleDigitClick("0")}
      >
        0
      </button>
      <button
        type="button"
        id="equals"
        className="equal double-width green-color"
        onClick={handleEqualClick}
      >
        =
      </button>
    </div>
  );
}

export default Calculator;
