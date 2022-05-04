import { useState, useEffect } from 'react';
import './App.css';
import Item from './Components/Item';

function App() {
  const [item, setItem] = useState({
    itemName: ""
  })
  const [list, setList] = useState([]);


  // get list of records from db
  // This method fetches the records from the database.
 useEffect(() => {
  async function getItems() {
    const response = await fetch(`http://localhost:5000/record/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const items = await response.json();
    setList(items);
  }

  getItems();

  return;
  }, [list.length]);

  async function onSubmit(e){
    e.preventDefault();
    console.log(JSON.stringify(item));
    
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setList([...list, item]);
    setItem("");
  }
  


  return (
    <div className="App">
      <h1>Shopping List</h1>
      <input value={item.itemName} onChange={e => setItem({
        itemName: e.target.value})}></input><button onClick={onSubmit}>Add</button>

      <ul>
        {list.map(x => (<Item item={x.itemName}></Item>))}
      </ul>
    </div>
  );
}

export default App;
