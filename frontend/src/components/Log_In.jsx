import { useState } from 'react'
import './Log_In.css'
function Log_In(){
    const [name, setName] = useState("");  // step 1: create a state to store name
    const [pwd, inPwd] = useState("")
    const handleSubmit = (e) => {
      e.preventDefault(); // step 2: stop page refresh
      alert(`Hello ${name}`); // step 3: show what user typed
    };
  
    return(
        <form onSubmit={handleSubmit}>
            <center>
      <label className='inte'>Enter username: </label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} // update name while typing
      />
      <br></br>
      <label className='inte'>Enter password: </label>
      <input 
        type="password" 
        value={pwd} 
        onChange={(e) => inPwd(e.target.value)} // update name while typing
      />
      <br></br>
      <button type="submit">Submit</button>
      </center>
</form>
    )
}
export default Log_In