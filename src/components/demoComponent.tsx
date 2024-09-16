import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import "../assets/style/demo.css";

function Demo() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    setInterval(() => {
      async function dataFetch () {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  
        // covert fetched data into json
        const convertedData = await response.json();
        setData(convertedData);
        
      }
      // console.log('checking!!!');
      dataFetch();
    }, 1000)
    
  }, []);

  return (
    <div>
      <Link to="/components/nextDemo">
        <button>Click me</button>
      </Link>

      {/* FETCHED DATA LIST */}

      <div className='list'>
        
        <div className='nameList'>
          <h2>User's Name List</h2>
          <ol>
            {data.map(user =><li key={user.id}>{user.name}</li>)}
          </ol>
        </div>

        <div className='emailList'>
          <h2>User's Email List</h2>
          <ol>
            {data.map(user =><li key={user.id}>{user.email}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
 export default Demo;