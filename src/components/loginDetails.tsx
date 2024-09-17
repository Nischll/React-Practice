import '../assets/style/loginDetails.css';
import {Link} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

function UserDetails(){

  const {data} = useQuery({
    queryKey:['get'],
    queryFn() {
      return axios.get('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud')
    }
  });

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
              </tr>
            </thead>

            <tbody>
              {data?.data?.map((user:any) => (
                <tr key = {user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
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