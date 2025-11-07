import { useState } from 'react'
import './Sign_Up.css'
import Log_In from './Log_In.jsx'
function Sign_Up(){
    const [uname, setUname] = useState("");  // step 1: create a state to store name
const [ipwd, entPwd] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault(); // step 2: stop page refresh
      if(1){
        alert(`Hello ${uname}`);
      }
      else{
      alert(`Incorrect password`);
      } // step 3: show what user typed
    };
  
    return(
        <form onSubmit={handleSubmit}>
      <label className='inte'>username: </label>
      <input 
        type="text" 
        value={uname} 
        onChange={(e) => setUname(e.target.value)} // update name while typing
      />
      <br />
      <label className='inte'>password: </label>
      <input
       type="password"
       value={ipwd}
       onChange={(e) => entPwd(e.target.value)}></input>
       <br /><br />
      <button type="submit">Submit</button>
</form>
    )
}

export default Sign_Up