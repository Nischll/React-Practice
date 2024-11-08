import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/style/toast.css';
import './assets/style/theme.css';
import { ConfirmProvider } from 'material-ui-confirm';

const Home = lazy(() => import ("./components/home"));
const About = lazy(() => import("./components/about"));
const Login = lazy(() => import("./components/login"));
const Navbar = lazy(() => import("./components/navbar"));
const Child = lazy(() => import("./components/homeChild"));
const Demo = lazy(() => import("./components/demoComponent"));
const NextDemo = lazy (() => import("./components/nextDemoComponent"));
const LoginDetails = lazy(() => import("./components/loginDetails"));
const Edit = lazy(() => import ('./components/editDetails'));
const BasicTable = lazy(() => import ('./components/basicTable'));
const Todo = lazy(() =>  import('./components/todo'))

export const newContext = React.createContext();
export const modeContext = React.createContext();

const Client = new QueryClient();

function App() {

  const [input, setInput] = useState("");
  let [theme, setTheme] = useState('default');
  return (
    <>
      <QueryClientProvider client={Client}>
      <ConfirmProvider>
      <modeContext.Provider value = {{theme, setTheme}}>
      <newContext.Provider value={{input, setInput}}>
      <ToastContainer/>
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
              path:"/components/login",
              element:<Suspense fallback = {<h2>Account Loading.....</h2>}><Login/></Suspense>
            },

            {
              path:"/components/demo",
              element:<Suspense fallback = {<h2>demo compo loading.............</h2>}><Demo/></Suspense>
            },

            {
              path:"/components/nextDemo",
              element:<Suspense fallback = {<h2>loading.............</h2>}><NextDemo/></Suspense>
            },

            {
              path:"/components/loginDetails",
              element:<Suspense fallback = {<h2>loading.............</h2>}><LoginDetails/></Suspense>
            },

            {
              path:"/components/editDetails/:id",
              element:<Suspense fallback = {<h2>loading.............</h2>}><Edit/></Suspense>
            },

            {
              path:"/components/table",
              element:<Suspense><BasicTable/></Suspense>
            },
            {
              path:"/components/todo",
              element:<Suspense><Todo/></Suspense>
            },
          ]
        }        
      ])}/>
      </newContext.Provider>
      </modeContext.Provider>
      </ConfirmProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;
