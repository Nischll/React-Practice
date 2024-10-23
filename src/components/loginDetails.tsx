// import '../assets/style/loginDetails.css';
import {Link} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useConfirm} from 'material-ui-confirm'

function UserDetails(){
  // const [users, setUsers] = useState([]);
  
  const {data, refetch} = useQuery({
    queryKey:['get'],
    queryFn() {
      return axios.get('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud')
    }
  });

  // FOR DELETE
  const confirm = useConfirm();
  const handleDelete = async (id:number) =>{
    try{
      await confirm({
        title:'Are you sure?',
        description: 'You are going to delete this user!!',
        confirmationText:'Delete now',
        cancellationText :'Not now',
        dialogProps:{
          // Confirmation Box
          maxWidth:'xs',
        },
        titleProps: {
          style:{
            display:'flex',
            justifyContent:'center',
            fontSize:'1.6rem',
            fontWeight:'700',
            marginBottom:'-20px'
          }
        },
        contentProps: {
          // Deescription
          style:{
            display:'flex',
            justifyContent:'center',
          }
        },
        dialogActionsProps: {
          // Confirm & Cancel button Container
          style:{
            display:'flex',
            justifyContent:'center',
            marginBottom:'5px'
          }
        },
        confirmationButtonProps: {
          // Confirm Button
          variant: 'contained',
          color: 'primary',
          style:{
            position:'absolute',
            left:'45px',
            borderRadius:'12px'
          }
        },
        cancellationButtonProps: {
          // Cancel Button
          variant: 'outlined',
          color: 'secondary',
          style:{
            marginLeft:'50%',
            borderRadius:'12px',
            color:'red',
            borderColor:'red'
          }
        },
     
      });
      await axios.delete(`https://667d2474297972455f63aec9.mockapi.io/api/crud/crud/${id}`);
      refetch();
    } 
    catch(error){
      if(error){
        console.error("failed to delete!!", error);
      }
    };

    // FOR EDIT
    // const handleEdit = () => {
      
    // }
  };

  return(
    <>
      <div className='relative h-[600px] flex justify-center item-center flex-col gap-[5px] mt-2 flex-wrap'>
        <main className="relative flex justify-center item-center w-full h-[500px] overflow-y-scroll mb-[15px]">
          <table className='relative h-[415px] w-full border-collapse'>
            <thead className=''>
              <tr className=' border-b-2 border-indigo-800'>
                <th className='text-xl'>S.N</th>
                <th className='text-xl'>Fullname</th>
                <th className='text-xl'>Email</th>
                <th className='text-xl'>Password</th>
                <th className='text-xl'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((user:any, index: any) => (
                <tr key = {user.id} className=" border-b-2 border-indigo-800 even:bg-[#D6EEEE]">
                  <td className="px-[30px] py-[10px]">{index + 1}</td>
                  <td className="px-[30px] py-[10px]">{user.name}</td>
                  <td className="px-[30px] py-[10px]">{user.email}</td>
                  <td className="px-[30px] py-[10px]">{user.password}</td>
                  <td className="px-[30px] py-[10px]">
                    <button onClick={()=>handleDelete(user.id)} className='text-[0.9rem] px-[12px] py-[8px] mr-[10px] bg-red-600 text-white-600 active:bg-red-900 hover:bg-red-700'>Delete</button>
                    <Link to={`/components/editDetails/${user.id}`}>
                      <button className='text-[0.9rem] px-[16px] py-[8px] bg-green-600 text-white-600 active:bg-green-900 hover:bg-green-700'>Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        <footer className=''>
          <Link to='/components/login'>
            <button className='hover:bg-sky-500 active:bg-sky-700'>Back</button>
          </Link>
        </footer>
      </div>
      
    </>
  )
}
export default UserDetails;