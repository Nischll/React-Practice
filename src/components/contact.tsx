import {Link} from 'react-router-dom';
import '../assets/style/theme.css';
// import { modeContext } from '../App';
// import { useContext, useState } from 'react';
function Contact () {
  return (
    <>
      <h3>Contact Section</h3>

      <Link to="/">
        <button type='button'>
        Back to main page        
        </button>
      </Link>
    </>
  )
}

export default Contact