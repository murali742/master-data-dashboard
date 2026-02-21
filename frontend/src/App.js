import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000";

function App() {
 
  const [units, setUnits] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  
  const [shifts, setShifts] = useState([]);
  const [shiftName, setShiftName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("");
  const [editShiftId, setEditShiftId] = useState(null);

  
  const fetchUnits = async () => {
    const res = await fetch(`${API}/units`);
    const data = await res.json();
    setUnits(data);
  };

  const fetchShifts = async () => {
    const res = await fetch(`${API}/shifts`);
    const data = await res.json();
    setShifts(data);
  };

  useEffect(() => {
    fetchUnits();
    fetchShifts();
  }, []);

  
  const handleUnitSubmit = async () => {
    if (!name || !symbol) {
      alert("Name and Symbol required");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/units/${editId}` : `${API}/units`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, symbol, description }),
    });

    resetUnitForm();
    fetchUnits();
  };

  const deleteUnit = async (id) => {
    await fetch(`${API}/units/${id}`, { method: "DELETE" });
    fetchUnits();
  };

  const editUnit = (unit) => {
    setName(unit.name);
    setSymbol(unit.symbol);
    setDescription(unit.description);
    setEditId(unit.id);
  };

  const resetUnitForm = () => {
    setName("");
    setSymbol("");
    setDescription("");
    setEditId(null);
  };

  
  const handleShiftSubmit = async () => {
    if (!shiftName || !startTime || !endTime) {
      alert("All shift fields required");
      return;
    }

    const method = editShiftId ? "PUT" : "POST";
    const url = editShiftId
      ? `${API}/shifts/${editShiftId}`
      : `${API}/shifts`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: shiftName,
        start_time: startTime,
        end_time: endTime,
        color,
      }),
    });

    resetShiftForm();
    fetchShifts();
  };

  const deleteShift = async (id) => {
    await fetch(`${API}/shifts/${id}`, { method: "DELETE" });
    fetchShifts();
  };

  const editShift = (shift) => {
    setShiftName(shift.name);
    setStartTime(shift.start_time);
    setEndTime(shift.end_time);
    setColor(shift.color);
    setEditShiftId(shift.id);
  };

  const resetShiftForm = () => {
    setShiftName("");
    setStartTime("");
    setEndTime("");
    setColor("");
    setEditShiftId(null);
  };

  
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Master Data Dashboard</h1>

      

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUnitSubmit}>
        {editId ? "Update Unit" : "Add Unit"}
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.id}</td>
              <td>{unit.name}</td>
              <td>{unit.symbol}</td>
              <td>{unit.description}</td>
              <td>
                <button onClick={() => editUnit(unit)}>Edit</button>
                <button onClick={() => deleteUnit(unit.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <h2 style={{ marginTop: "50px" }}>Shifts</h2>

      <input
        placeholder="Shift Name"
        value={shiftName}
        onChange={(e) => setShiftName(e.target.value)}
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        placeholder="Color (red, blue, #ff0000)"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleShiftSubmit}>
        {editShiftId ? "Update Shift" : "Add Shift"}
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr
              key={shift.id}
              style={{
                backgroundColor: shift.color,
                color: "white"
              }}
            >
              <td>{shift.id}</td>
              <td>{shift.name}</td>
              <td>{shift.start_time}</td>
              <td>{shift.end_time}</td>
              <td>{shift.color}</td>
              <td>
                <button onClick={() => editShift(shift)}>Edit</button>
                <button onClick={() => deleteShift(shift.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;