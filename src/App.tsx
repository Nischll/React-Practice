import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import React, {useState} from 'react';
// import ThemeProvider from './components/themeContext';
// import ThemeComponent from './components/themeComponent';

const Home = lazy(() => import ("./components/home"));
const About = lazy(() => import("./components/about"));
const Contact = lazy(() => import("./components/contact"));
const Navbar = lazy(() => import("./components/navbar"));
const Child = lazy(() => import("./components/homeChild"));
const Demo = lazy(() => import("./components/demoComponent"));


export const newContext = React.createContext();
export const modeContext = React.createContext();

function App() {

  const [input, setInput] = useState("");
  let [theme, setTheme] = useState('default');
  return (
    <>
      <modeContext.Provider value = {{theme, setTheme}}>
      <newContext.Provider value={{input, setInput}}>
      <RouterProvider router = {createBrowserRouter([
        {
          path:"/",
          element:<Suspense fallback = {<h2>Loading.............</h2>}><Navbar/></Suspense>,
          errorElement: <>Page not found </>,
          children:[
            { 
              path: "/components/home",
              element:<Suspense fallback = {<h2>Home Loading..........</h2>}><Home/></Suspense>,
              children:[
                {
                  path:"/components/home/homeChild",
                  element:<Suspense fallback ={<h2>Child is loading...</h2>}><Child/></Suspense>
                }
              ]
            },
    
            {
              path:"/components/about",
              element:<Suspense fallback = {<h2>About Loading.....</h2>}><About/></Suspense>
            },

            {
              path:"/components/about/:id",
              element:<Suspense fallback = {<h2>About Loading.....</h2>}><About/></Suspense>
            },
            
            {
              path:"/components/contact",
              element:<Suspense fallback = {<h2>Contact Loading.....</h2>}><Contact/></Suspense>
            },
            {
              path:"/components/demo",
              element:<Suspense fallback = {<h2>demo compo loading.............</h2>}><Demo/></Suspense>
            }
          ]
        }        
      ])}/>
      </newContext.Provider>
      </modeContext.Provider>
    </>
  )
}

export default App;
