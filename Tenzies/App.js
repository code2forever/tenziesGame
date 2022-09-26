import React from "react"
import Die from "./Components/Die"
import Footer from "./Components/Footer"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"
import Timer from "./Components/Timer"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [confettiSize,setConfettiSize]=React.useState(Object.assign({},useWindowSize))
    const [rollCount,setRollCount]=React.useState(0)
    const [darkMode,setDarkMode]=React.useState(false)
    const [resetTime,setResetTime]=React.useState(false)
    
    
    const toggleDarkMode=()=>{
        setDarkMode(prev=>!prev)
    }
    
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollCount((prev)=>prev+1)
        } else {
            setTenzies(false)
            setResetTime(true)
            setRollCount(0)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                Object.assign({},die, {isHeld: !die.isHeld}) :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
            darkMode={darkMode}
        />
    ))
    return (
        <section className={"body--container" + (darkMode?" dark":"")}>
        <main>
        <div className="score--board">
            <span className="roll--count">
                    Rolls : {rollCount}
            </span>
            <div onClick={toggleDarkMode} className="toggle--container">
                <div className="toggle--ball"></div>
            </div>        
            <Timer setResetTime={setResetTime} resetTime={resetTime} tenzies={tenzies}/>
         </div>
            {tenzies && <Confetti width={confettiSize.width} height={confettiSize.height}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
        <Footer/>
        </section>
    )
}