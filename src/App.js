import { useState } from "react";

import "./App.css";

function Counter({ name, state }) {
  const [counter, setCounter] = state;
  const increment = e => setCounter(counter + 1);
  const decrement = e => setCounter(Math.max(counter - 1, 0));

  return (
    <div>
      <h1>{name}: {counter}</h1>
      <button onClick={increment}>Increment {name}</button>
      <button onClick={decrement}>Decrement {name}</button>
    </div>
  )
}

function Emoji({ emoji }) {
  return <div style={{fontSize: "4em"}}>{emoji}</div>
}

function Dog() {
  return <Emoji emoji="🐶" />
}

function Cat() {
  return <Emoji emoji="🐱" />
}

function Collection({ Thing, number }) {
  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
      {number > 0 ? [...Array(number)].map((_, index) => <Thing key={index} />) : <p>No items</p>}
    </div>
  )
}

function ThingDisplay({ name, Thing, startingNumber=3 }) {
  const counterState = useState(startingNumber);
  const [counter, ] = counterState;

  return (
    <div>
      <Counter name={name} state={counterState} />
      <Collection Thing={Thing} number={counter} />
    </div>
  )
}

function AddThingForm({ addThing }) {
  const [name, setName] = useState("");
  const [emoji, _setEmoji] = useState("");

  const isEmojiOnly = str => {
    const emojiOnlyRegex = /^(\p{Extended_Pictographic})*$/ug;
    return emojiOnlyRegex.test(str);
  }
  
  const setEmoji = str => isEmojiOnly(str) ? _setEmoji(str) : null;

  const onClickAdd = _ => {
    addThing(name, emoji);
    setName("");
    setEmoji("");
  }

  return (
    <div style={{display: "flex", gap: "1em"}}>
      <div>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Emoji</label>
        <input value={emoji} onChange={e => setEmoji(e.target.value)} maxLength={2} />
      </div>
      <button onClick={onClickAdd}>Add</button>
    </div>
  )
}

function App() {
  const [things, setThings] = useState([
    {name: "Dog", thing: Dog},
    {name: "Cat", thing: Cat}
  ])

  const addThing = (name, emoji) => {
    setThings(things.concat([{name, thing: () => <Emoji emoji={emoji} /> }]))
  }

  return (
    <div className="App">
      <AddThingForm addThing={addThing} />
      {things.map(({name, thing}) => <ThingDisplay name={name} Thing={thing} />)}
    </div>
  );
}

export default App;
