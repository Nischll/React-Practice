import {Link, Outlet} from 'react-router-dom';
import '../assets/style/navbar.css';
import '../assets/style/theme.css';
import {modeContext, newContext} from '../App';
import {useContext} from 'react';

function Navbar () {

  const {setInput} = useContext(newContext);
  let {theme, setTheme} = useContext(modeContext);

  // FOR INPUT DISPLAY
  function textBox (e:any) {
    setInput(e.target.value);
  };

  // FOR THEME MODE
  function modeFn () {
    
    const currentTheme = theme;
    if (currentTheme === 'default' || currentTheme === 'dark') {
      setTheme ('light');
    }else {
      setTheme ('dark');
    }
    // e.stopPropagation();
  };

  return (
    <>
    <div className= {`container-wrapper ${theme}`}>
      <div className='navbar'>
        <div className='container'>
          <Link to ="/components/home">
            <h2>Home</h2>
          </Link>

          <Link to ="/components/about">
            <h2>About</h2>
          </Link>

          <Link to ="/components/login">
            <h2>Login</h2>
          </Link>

          <Link to ="/components/demo">
            <h2>Demo</h2>
          </Link>
        </div>
        <div className='text-box'>
          <form action="">
            <input type="text" id='text-box' placeholder='write sthg' autoComplete='off' onKeyUp={textBox}/>
            {/* <button type='submit'>save</button> */}
          </form> 
          <button className='hover:bg-sky-500 active:bg-sky-700' id='mode' onClick={modeFn}>Mode</button>
        </div>
        
      </div>
      <Outlet/>
    </div>
    
    {/* <footer><h5>This is footer.</h5></footer> */}
    </>
  )
}
export default Navbar;