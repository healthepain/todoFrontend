
import { useState } from 'react';
import './App.css'
import Button from './components/Button'

function App() {
  const [name, setName] = useState("")

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder='Masukan nama'
          onChange={handleChange}
          value={name}
        />
        <p>nama : {name}</p>
      </div>

      <Button />
    </>
  );

}

export default App
