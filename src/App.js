import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  const BASE_API_URL = 'http://localhost:3005/';
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [confimationCode, setConfiramtionCode] = useState("");
  
  function SendCode(){
    fetch(`${BASE_API_URL}verifyNumber`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({number:input}),
      
    }).then(async e =>{
      const resp =  await e.json()
      console.log(resp);
        if(resp.status){
          setStep(1);
        }
    })
  }
  function Confirm(){
    fetch(`${BASE_API_URL}confirmNumber`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({number:input,verificationNumber:confimationCode}),
      
    }).then(async e =>{
        console.log(e);
        const resp =  await e.json()
        if(resp.status){
          // setStep(1);
          console.log("verified")
        }
    })
  }

  return (
    <div className="test">
      { step == 0 ? <div className="container" >
       <h2 style={{color:"blue"}} >Phone number</h2>
        <input value={input} onChange={(e)=>setInput(e.target.value)} />
        
        <div className="btn" onClick={SendCode} style={{borderWidth:"1px", borderColor:"green" , borderStyle:"solid", borderRadius:"3px", padding:"5px 10px", maxWidth:"50px"}} >
          Send
        </div>
      </div> :
      <div className="container" >
       <h2 style={{color:"blue"}} >Confirm your phone</h2>
       <h6 style={{color:"blue"}} >Lets keep your account secure</h6>
        <input value={confimationCode} onChange={(e)=>setConfiramtionCode(e.target.value)} />

      <div style={{display:"flex"}}>
      <div onClick={Confirm} className="btn" style={{borderWidth:"1px", borderColor:"green" , borderStyle:"solid", borderRadius:"3px", padding:"5px 10px", maxWidth:"50px"}} >
          Send
        </div>
      <div className="btn" style={{borderWidth:"1px", borderColor:"green" , borderStyle:"solid", borderRadius:"3px", padding:"5px 10px", maxWidth:"50px"}} >
          Change
        </div>
      <div className="btn" style={{borderWidth:"1px", borderColor:"green" , borderStyle:"solid", borderRadius:"3px", padding:"5px 10px", maxWidth:"50px"}} >
          Resend
        </div>
        </div>  
      </div>
      }
    </div>
  );
}

export default App;
