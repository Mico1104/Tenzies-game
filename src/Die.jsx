import './index.css'

function Die(props) {
    return (
        <>
            <div className=".container">
                <button>{props.value}</button>
            </div>
        </>
    )
}

export default Die
