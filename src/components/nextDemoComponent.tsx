// import { useState, useEffect } from "react";
// import "../assets/style/demo.css";

// function NextDemo () {

//   const [data, setData] = useState([])
//   const [currentData, setCurrentData] = useState(0);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if(data.length === 0 && count > 0){
//         async function dataFetch () {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
//         // covert fetched data into json
//         const convertedData = await response.json();
//         setData(convertedData);
//       };
//       dataFetch();  
//     };
//   }, [count]);

//   const handleClick = () => {
//     if(data.length > 0){
//       setCurrentData((prevData) => (prevData + 1) % data.length
//       );
//     };

//     setCount((prevCount) => {
//       const newCount = (prevCount % 10) + 1;
//       return newCount;
//     });
//   };

//   return (
//     <>
//     <button onClick={handleClick}>show data</button>
//     <header>
//       <h1>User {count}</h1>
      
//     </header>
     
//     {data.length > 0 &&(
//       <section className="newlist">
//         <h3>Name: {data[currentData].name}</h3>
//         <ul>
//           <li>Email: {data[currentData].email}</li>
//           <li>Phone: {data[currentData].phone}</li>
//         </ul>
//       </section>
//     )}

  
    
//     </>
//   )
// }
// export default NextDemo;


// import { useState, useEffect } from "react";

// function NextDemo () {
//   const [data, setData] = useState([])
//   useEffect(() => {
//         async function dataFetch () {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         // covert fetched data into json
//         const convertedData = await response.json();
//         setData(convertedData);
//       };
//       dataFetch();  
//     }, []);
//   return (
//     <>
//       <section className="newlist">
//         <div className="grid grid-cols-3">
//           <h1><strong>Name</strong></h1>
//           <h1><strong>Email</strong></h1>
//           <h1><strong>Username</strong></h1>
//         </div>
//         {data.map((users:any) => (
//           <div key={users.id}>
//             <ol className="grid grid-cols-3">
//               <li>{users.name}</li>
//               <li>{users.email}</li>
//               <li>{users.username}</li>
//             </ol>
//           </div>
//         ))}
//       </section>
//     </>
//   )
// }
// export default NextDemo;


import { useRef, useState } from 'react';

function TimerComponent() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null; // Resetting the ref
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default TimerComponent;
