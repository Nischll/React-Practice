// import { useMemo, useState } from "react";

// const UserList = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

//   const filteredUsers = useMemo(() => {
//     return users.filter(user => 
//       user.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, users]); // Recalculate when `searchTerm` or `users` changes

//   return (
//     <div>
//       <h1>User List</h1>
//       <input 
//         type="text" 
//         value={searchTerm} 
//         onChange={(e) => setSearchTerm(e.target.value)} 
//         placeholder="Search users..."
//       />
//       <ul>
//         {filteredUsers.map((user, index) => (
//           <li key={index}>{user}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;



// import { useState, useMemo } from 'react';

// const Fibonacci = () => {
//   const [num, setNum] = useState(0);

//   const fib = useMemo(() => {
//     const computeFibonacci = (n) => {
//       if (n <= 1) return n;
//       return computeFibonacci(n - 1) + computeFibonacci(n - 2);
//     };
//     return computeFibonacci(num);
//   }, [num]); // Recalculate when `num` changes

//   return (
//     <div>
//       <h1>Fibonacci Calculator</h1>
//       <input 
//         type="number" 
//         value={num} 
//         onChange={(e) => setNum(Number(e.target.value))} 
//       />
//       <p>Fibonacci of {num} is {fib}</p>
//     </div>
//   );
// };

// export default Fibonacci;


function Child({ toggleMessage }) {

  return (
    <div>
      <button onClick={toggleMessage}>Toggle Message</button>
    </div>
  );
}
export default Child;
