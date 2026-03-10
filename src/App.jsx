import { useState } from 'react';
import Die from './Die'
import './index.css'

function App() {
const [generateDice, setGenerateDice] = useState(generateAllNewDice);

  function generateAllNewDice() {
       let newArray = [];

       for(let i = 0; i < 10; i++){
         const random = Math.ceil(Math.random() * 6);
         newArray.push(random);
      }

      return newArray
  }

  const dice = generateDice.map((dice) => {
    return <Die value={dice}/>
  })

  
  return(
    <>
      <main>
        {dice}
      </main>
    </>
  )
}

export default App