import { useState, useEffect } from "react";
import "../assets/style/demo.css";

function NextDemo () {

  const [data, setData] = useState([])
  const [currentData, setCurrentData] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(data.length === 0 && count > 0){
        async function dataFetch () {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  
        // covert fetched data into json
        const convertedData = await response.json();
        setData(convertedData);
      };
      dataFetch();  
    };
  }, [count]);

  const handleClick = () => {
    if(data.length > 0){
      setCurrentData((prevData) => (prevData + 1) % data.length
      );
    };

    setCount((prevCount) => {
      const newCount = (prevCount % 10) + 1;
      return newCount;
    });
  };

  return (
    <>
    <header>
      <h1>User {count}</h1>
      
    </header>
     
    {data.length > 0 &&(
      <section className="newlist">
        <h3>Name: {data[currentData].name}</h3>
        <ul>
          <li>Email: {data[currentData].email}</li>
        </ul>
      </section>
    )}

  <button onClick={handleClick}>show data</button>
    
    </>
  )
}
export default NextDemo;