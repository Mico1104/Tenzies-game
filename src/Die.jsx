import './index.css'

function Die(props) {

    const pips = Array.from({ length: props.value}, (_, i) => (
        <span key={i} className='pip' ></span>
    ))

    const styles ={
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }
    return (
        <>
            <div className=".dice-container">
                <button 
                className={`dice-button face-${props.value}` }
                style={styles} 
                onClick={props.holdFunction}
                aria-pressed={props.isHeld}
                aria-label={`Die with value ${props.value}, ${props.isHeld ? 'held' : 'not held' }`}
            >{pips}</button>
            </div>
        </>
    )
}

export default Die
