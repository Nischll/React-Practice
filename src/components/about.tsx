import {Link, Outlet, useParams} from 'react-router-dom';

function About () {

  const {id} = useParams();

  return (
    <>
    <h3>About Section</h3>
    <h2> User ID: {id} </h2>

    <Link to="/">
      <button type='button'>
      Back to main page        
      </button>
    </Link>
    <Outlet/>
    </>
  )
}

export default About