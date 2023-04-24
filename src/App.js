import React, { useState } from "react";
import './App.css';
import "./styles.css";

function App() {
  const [error, setError] = useState('');

  const [numRows, setNumRows] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [startNum, setStartNum] = useState(0);
  const [endNum, setEndNum] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (event.target.numRows.value < 0) {
      setError('N cant be negative!');
      return;
    }
    else{
      setError('');
    }

    const numRowsValue = parseInt(event.target.numRows.value);
    setNumRows(numRowsValue);

    const startNumValue = parseInt(event.target.startNum.value);
    setStartNum(startNumValue);

    const endNumValue = parseInt(event.target.endNum.value);
    setEndNum(endNumValue);

    const accuracyValue = parseInt(event.target.accuracy.value);
    setAccuracy(accuracyValue);

    function calculateL(){
      var numberOfSolutions = (endNumValue - startNumValue) * Math.pow(10, accuracyValue) + 1
      var l = 0
      
      while(true) {
        if(Math.pow(2, l) >= numberOfSolutions) {
          break;
        }
        l++
      }
      return l
    }

    function randomNumberInRange(min, max, accuracy) {
      return (Math.random() * (max - min) + min).toFixed(accuracy);
    }
  
    function realToInt(real, l) {
      return Math.ceil((1/(endNumValue - startNumValue)) * (real - startNumValue) * (Math.pow(2, l) - 1));
    }

    function intToBin(xint, l) {
      const bin = xint.toString(2);
      let result = '';
      if (bin.length < l) {
        for (let i = (l-bin.length); i > 0; i--) {
          result += '0';
        }
      }
      result += bin;
      return result;
    }

    function binToInt(xbin) {
      return parseInt(xbin, 2);
    }

    const intToReal = (xint, accuracyValue, l) => ((xint * (endNumValue - startNumValue))/(Math.pow(2, l) - 1) + startNumValue).toFixed(accuracyValue);

    const calculatefx = (real, decimalPlaces) => {
      const m = mantissa(real).toFixed(decimalPlaces);
      return m * (Math.cos(20 * Math.PI * real) - Math.sin(real));
    };

    const mantissa = (real) => (Math.abs(real) % 1);

    const data = [];
    
    for (let i = 0; i < numRowsValue; i++) {
      const l = calculateL()
      const real = randomNumberInRange(startNumValue, endNumValue, accuracyValue)
      const int = realToInt(real, l)
      const bin = intToBin(int, l)
      const int2 = binToInt(bin)
      const real2 = intToReal(int2, accuracyValue, l)
      const fx = calculatefx(real, accuracyValue)
      data.push({
        id: i + 1,
        real: real, 
        int: int,
        bin: bin,
        int2: int2,
        real2: real2,
        fx: fx,
      });
    }
    setTableData(data);
  };

  return (
    <div>
      
      <form onSubmit={handleFormSubmit} id="form1" noValidate>
        <div class="input-group error">
          <label htmlFor="numRows">N:</label>
          <input type="number" id="numRows" name="numRows"  defaultValue={10}/>
          {error.length > 0 && 
                  <div class="error-message">{error}</div>}
        </div>
        
        <div class="input-group">
        <label htmlFor="startNum">A:</label>
        <input type="number" id="startNum" name="startNum" defaultValue={-4}/>
        </div>


        <div class="input-group">
        <label htmlFor="endNum">B:</label>
        <input type="number" id="endNum" name="endNum" defaultValue={12}/>
        </div>

        <div class="input-group">
          <label htmlFor="accuracy">Accuracy:</label>
          <select id="accuracy" name="accuracy">
            <option value={2}>0.01</option>
            <option value={3} selected>0.001</option>
            <option value={4}>0.0001</option>
          </select>
        </div>
        <br/>
        <button type="submit" id="submit">Generate Table</button>
      </form>
      <br/>
      <br/>
      {numRows > 0 && (
        <table id="table1">
          <thead>
            <tr>
              <th>LP</th>
              <th>x<sup>real</sup></th>
              <th>x<sup>int</sup></th>
              <th>x<sup>bin</sup></th>
              <th>x<sup>int</sup></th>
              <th>x<sup>real</sup></th>
              <th>f(x<sup>real</sup>)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, rowIndex) => (
              <tr key={rowData.id}>
                <td>{rowData.id}</td>
                <td>{rowData.real}</td>
                <td>{rowData.int}</td>
                <td>{rowData.bin}</td>
                <td>{rowData.int2}</td>
                <td>{rowData.real2}</td>
                <td>{rowData.fx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
