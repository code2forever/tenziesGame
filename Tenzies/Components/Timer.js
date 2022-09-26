import React from 'react';

const Timer = (props) => {
  const [seconds, setSeconds] = React.useState(0);
  const [bestTime,setBestTime]=React.useState(1000);
  
  const getTime=()=>{
    setSeconds(prev=>prev+1) 
  }
  

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    if (props.tenzies) clearInterval(interval)
    if (props.resetTime){
        setSeconds(0)
        props.setResetTime(prev=>!prev)}
    
    return () => clearInterval(interval);
  }, [props.tenzies,props.resetTime]);


  React.useEffect(()=>{
      if (JSON.parse(localStorage.getItem("score"))){
          if(JSON.parse(localStorage.getItem("score")) > seconds  && props.tenzies===true)       
                localStorage.setItem("score",JSON.stringify(seconds))
          
          if(!props.tenzies) setBestTime(JSON.parse(localStorage.getItem("score")))
      }
      
      else localStorage.setItem("score",10000)
        
  },[props.tenzies])  
    
  return (
    <div className="timer">
    {`Time : ${seconds} s`}
    <span>Best Time : {bestTime}s</span>
    </div>
  );
};

export default Timer;