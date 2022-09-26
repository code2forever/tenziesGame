import React from "react"

export default function Die(props) {
    let styles={}
    
    if(props.darkMode){
        styles["backgroundColor"]=props.isHeld?"#0D7377":"#212121"   

    }
    else{ 
        styles["backgroundColor"]=props.isHeld ? "#59E391" : "white"
    }
    
    const arr=[]
    
    for (let i=0;i<props.value;i++){
        arr.push("•")
    }
    const dieClassArray=["die-face-one","die-face-two","die-face-three","die-face-four","die-face-five","die-face-six",]
    
    return (
        <div 
            className={`die-face ${dieClassArray[props.value-1]}`} 
            style={styles}
            onClick={props.holdDice}
        >
            {arr.map((elem,index)=>{return <span key={index} className="dot">{elem}</span>})}
        </div>
    )
}