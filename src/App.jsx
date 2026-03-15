import { useState } from 'react';
import Die from './Die'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti';
import './index.css'


function App() {
  const [generateDice, setGenerateDice] = useState(() => generateAllNewDice());

  const gameWon = generateDice.every(die => die.isHeld) &&
    generateDice.every(die => die.value === generateDice[0].value);

  function generateAllNewDice() {
    let newArray = [];

    for (let i = 0; i < 10; i++) {
      const random = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      };
      newArray.push(random);
    }

    return newArray
  }


  function rollDice() {
    if (gameWon) {
      setGenerateDice(generateAllNewDice);
    } else {
      setGenerateDice(oldDice => oldDice.map(
        die => {
          return die.isHeld ? die : {
            ...die, value: Math.ceil(Math.random() * 6)
          }
        }
      ))
    }

  }

  function hold(id) {
    setGenerateDice(oldDice => oldDice.map(die => {
      return die.id === id ? {
        ...die, isHeld: !die.isHeld
      } : die
    }))
  }

  const dice = generateDice.map((dice) => {
    return <Die isHeld={dice.isHeld} key={dice.id} value={dice.value} holdFunction={() => hold(dice.id)} />
  })

  return (
    <>
      <main>
        {gameWon ? <ReactConfetti /> : null}
        {dice}
        <button className='roll-button' onClick={rollDice}>{gameWon ? 'New Game' : 'Roll Dice'}</button>
      </main>
    </>
  )
}

export default App