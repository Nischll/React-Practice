// import '../assets/style/loginDetails.css';
import {Link,} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

function UserDetails(){
  // const [users, setUsers] = useState([]);
  
  const {data, refetch} = useQuery({
    queryKey:['get'],
    queryFn() {
      return axios.get('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud')
    }
  });

  // FOR DELETE

  const handleDelete = async (id:number) =>{
    try{
      await axios.delete(`https://667d2474297972455f63aec9.mockapi.io/api/crud/crud/${id}`);
      refetch();
    } 
    catch(error){
      console.error("failed to delete!!", error);
    };
  };

  return(
    <>
      <div className='relative h-96 flex justify-center item-center flex-col gap-2.5 mt-5 flex-nowrap'>
        <main className="flex justify-center h-96 overflow-y-scroll">
          <table className='relative justify-center mr-3.5 h-fit border-collapse'>
            <thead>
              <tr className='border-b-2 border-indigo-800'>
                <th className='border-collapse'>Id</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((user:any, index: any) => (
                <tr key = {user.id} className="border-b-2 border-indigo-800 even:bg-[#D6EEEE]">
                  <td className="px-[30px] py-[10px]">{index + 1}</td>
                  <td className="px-[30px] py-[10px]">{user.email}</td>
                  <td className="px-[30px] py-[10px]"> {user.password}</td>
                  <td className="px-[30px] py-[10px]"><button onClick={()=>handleDelete(user.id)} className='text-[0.8rem] p-[8px] bg-red-600 text-white-600 active:bg-red-900 hover:bg-red-700'>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        <footer>
          <Link to='/components/login'>
            <button className='hover:bg-sky-500 active:bg-sky-700'>Back</button>
          </Link>
        </footer>
      </div>
      
    </>
  )
}
export default UserDetails;