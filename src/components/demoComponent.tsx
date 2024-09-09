import { useEffect, useState } from 'react';
import "../assets/style/demo.css";

function Demo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setInterval(() => {
      async function dataFetch () {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
  
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
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>

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

      {/* {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
        </div>
      )} */}
    </div>
  );
}
 export default Demo;