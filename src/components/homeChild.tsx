import '../assets/style/homeChild.css'
import {useContext} from 'react';
import {newContext} from '../App';

function Child () {
  const{input}= useContext(newContext);
  return (
    <>
    <h3>Here is Display Box:</h3>
    <div id="display">{input}</div>
    </>
  )
}

export default Child;