import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [record, setRecord] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Maintain selected rows


  const handleSubmit = () => {
    let obj = {
      id: Math.floor(Math.random() * 100000),
      name: name,
      phone: phone
    };

    let data = [...record, obj];
    setRecord(data);
    localStorage.setItem('crud', JSON.stringify(data));
    alert('Record successfully inserted');
    setName('');
    setPhone('');
  };

  const handleRowSelection = (rowId) => {
    // Check if the row is already selected
    if (selectedRows.includes(rowId)) {
      // If selected, remove it from the list
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      // If not selected, add it to the list
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const multipleDelete = () => {
    // Filter out the selected rows from the record array

    if(selectedRows.length != 0){
      
      const updatedRecords = record.filter((val) => !selectedRows.includes(val.id));
      
      // Update the state and local storage
      setRecord(updatedRecords);
      localStorage.setItem('crud', JSON.stringify(updatedRecords));
      
      // Clear the selected rows
      setSelectedRows([]);
    }
    else{
      alert("Please select checkbox Button");
    }
  }
    
  
  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('crud');
    if (storedData) {
      setRecord(JSON.parse(storedData));
    }else{
      setRecord([]);
    }
  }, []);

  return (
    <center>
      <h1>Multiple delete</h1>
      <table border={1}>
        <tr>
          <td>Name :- </td>
          <td>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td>Phone :- </td>
          <td>
            <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="button" value="submit" onClick={() => handleSubmit()} />
          </td>
        </tr>
      </table>
      <br></br>

      <button onClick={() => multipleDelete()}>Bulk Delete</button>
      <br></br>
      <br></br>

      <table border={1}>
        <tr>
          <td></td>
          <td>Id</td>
          <td>Name</td>
          <td>Phone</td>
        </tr>
        {record.map((val, i) => {
          return (
            <tr key={val.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(val.id)}
                  onChange={() => handleRowSelection(val.id)}
                />
              </td>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.phone}</td>
            </tr>
          );
        })}
      </table>
    </center>
  );
}

export default App;
