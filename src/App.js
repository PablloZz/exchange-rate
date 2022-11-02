import React, { useEffect, useState } from "react"
import Conversion from "./components/Conversion";
import Header from "./components/Header";

function App() {
  const [currencies, setCurrencies] = useState([]) 
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
      const data = await res.json()
      setCurrencies(data)
    }

    fetchData().catch(err => console.log(err))
  }, [])

  return (
    <div className="container">
      <Header currencies={currencies} />
      <Conversion />
    </div>
  );
}

export default App;
