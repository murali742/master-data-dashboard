import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000";

function App() {
  const [units, setUnits] = useState([]);
  const [shifts, setShifts] = useState([]);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const [shiftName, setShiftName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("");
  const [editShiftId, setEditShiftId] = useState(null);

  
  const fetchUnits = async () => {
    try {
      const res = await fetch(`${API}/units`);
      const data = await res.json();
      setUnits(Array.isArray(data) ? data : []);
    } catch {
      setUnits([]);
    }
  };

  const fetchShifts = async () => {
    try {
      const res = await fetch(`${API}/shifts`);
      const data = await res.json();
      setShifts(Array.isArray(data) ? data : []);
    } catch {
      setShifts([]);
    }
  };

  useEffect(() => {
    fetchUnits();
    fetchShifts();
  }, []);

  

  const handleUnitSubmit = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/units/${editId}` : `${API}/units`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, symbol, description }),
    });

    setName("");
    setSymbol("");
    setDescription("");
    setEditId(null);
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

  

  const handleShiftSubmit = async () => {
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

    setShiftName("");
    setStartTime("");
    setEndTime("");
    setColor("");
    setEditShiftId(null);
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

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Master Data Dashboard</h1>

      {/* UNITS */}
      <h2>Units</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleUnitSubmit}>
        {editId ? "Update Unit" : "Add Unit"}
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Symbol</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.symbol}</td>
              <td>{u.description}</td>
              <td>
                <button onClick={() => editUnit(u)}>Edit</button>
                <button onClick={() => deleteUnit(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SHIFTS */}
      <h2 style={{ marginTop: 50 }}>Shifts</h2>

      <input placeholder="Shift Name" value={shiftName} onChange={(e) => setShiftName(e.target.value)} />
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <input placeholder="Color (red, blue, #00ff00)" value={color} onChange={(e) => setColor(e.target.value)} />
      <button onClick={handleShiftSubmit}>
        {editShiftId ? "Update Shift" : "Add Shift"}
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Start</th><th>End</th><th>Color</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((s) => (
            <tr key={s.id} style={{ backgroundColor: s.color, color: "white" }}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.start_time}</td>
              <td>{s.end_time}</td>
              <td>{s.color}</td>
              <td>
                <button onClick={() => editShift(s)}>Edit</button>
                <button onClick={() => deleteShift(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;