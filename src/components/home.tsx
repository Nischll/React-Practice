import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import '../assets/style/home.css';
// import ThemeProvider from './themeContext';
// import ThemeComponent from './themeComponent';
function Home () {
  return (
    <>
    <h2>Welcome Home!!!!</h2>
    {/* <div>
    <Link to="/">
      <button type='button'>
       Back to main page      
      </button>
    </Link>
    </div> */}

    <Link to="/components/home/homeChild">
      <button type='button'>
        Display Component   
      </button>
    </Link>
    <Outlet/>
    {/* <ThemeProvider>
        <ThemeComponent/>
    </ThemeProvider> */}
    </>
  )
};

export default Home