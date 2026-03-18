import { useState, useRef, useEffect } from 'react';
import Die from './Die'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti';
import './index.css'


function App() {
  const [generateDice, setGenerateDice] = useState(() => generateAllNewDice());
  const [rolls, setRolls] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const gameWon = generateDice.every(die => die.isHeld) &&
    generateDice.every(die => die.value === generateDice[0].value);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (gameWon) {
      setIsRunning(false);
      buttonRef.current.focus();
    }
  }, [gameWon]);

  const buttonRef = useRef(null);

  // useEffect(() => {
  //   if (gameWon) {
  //     buttonRef.current.focus();
  //   }
  // }, [gameWon])

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
      setRolls(0);
      setTime(0);
      setIsRunning(false);
    } else {
      if(!isRunning) setIsRunning(true);
      setGenerateDice(oldDice => oldDice.map(
        die => {
          return die.isHeld ? die : {
            ...die, value: Math.ceil(Math.random() * 6)
          }
        }
      ));
      setRolls((prev) => prev + 1);
      }
    }


  function hold(id) {
    if(!gameWon && !isRunning) setIsRunning(true);

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
    <div className='tenzies'>
      <div className="stats">
        {/* <p>Rolls: <strong>{rolls}</strong></p>
        <p>Time: <strong> {time} </strong> seconds</p> */}
        <p id='time' > Rolls: {rolls} | Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
      </div>
      <h1 id='title'>Tenzies</h1>
      <p id='text'>Roll until all dice are the same. Click each die to freeze it all its current value between rolls.</p>
      <main>
        {gameWon ? <ReactConfetti /> : null}
        <div className="sr-only">
          {gameWon ? <p>Congratulations you won the game, Press oon the start new game button</p> : null}
        </div>
        {dice}
      </main>
      <button className='roll-button' ref={buttonRef} onClick={rollDice} >{gameWon ? 'New Game' : 'Roll Dice'}</button>
    </div>
  )
}

export default App