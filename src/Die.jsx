import './index.css'

function Die(props) {

    const styles ={
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }
    return (
        <>
            <div className=".container">
                <button className="dice-button" style={styles} onClick={props.holdFunction}>{props.value}</button>
            </div>
        </>
    )
}

export default Die
