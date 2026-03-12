import './index.css'

function Die(props) {
    return (
        <>
            <div className=".container">
                <button className='dice-button'>{props.value}</button>
            </div>
        </>
    )
}

export default Die
