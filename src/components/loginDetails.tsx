import '../assets/style/loginDetails.css';
import {Link} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
// import { useState } from 'react';

function UserDetails(){
  // const [users, setUsers] = useState([]);
  
  const {data, refetch} = useQuery({
    queryKey:['get'],
    queryFn() {
      return axios.get('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud')
    }
  });

  // FOR DELETE
  const deleteData = async (id:number) => {
    try{
      await axios.delete(`https://667d2474297972455f63aec9.mockapi.io/api/crud/crud/${id}`);
      refetch();
    } 
    catch(error){
      console.error("failed to delete!!", error);
    };
  }
  return(
    <>
      <div className='table-wrapper'>
        <main className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((user:any, index: any) => (
                <tr key = {user.id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td><button onClick={()=>deleteData(user.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        <footer>
          <Link to='/components/login'>
            <button>Back</button>
          </Link>
      </footer>
      </div>
      
    </>
  )
}
export default UserDetails;