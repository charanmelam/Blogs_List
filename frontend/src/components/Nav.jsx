import './Nav.css'
import { Link } from 'react-router-dom';
function Nav(){
    return(
        <div className='navi'>
            <ul>
        <li><Link to="/" className='opt'>Home</Link></li>
        <li><Link to="/About" className='opt'>About</Link></li>
        <li><Link to="/Blog" className='opt'>Blog</Link></li>
        <li><Link to="/Log_In" className='opt'>Log_In</Link></li>
        <li><Link to="/Sign_Up" className='opt'>Sign_Up</Link></li>
      </ul>
        </div>
    )
}

export default Nav