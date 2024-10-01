import {Link} from 'react-router-dom';
// import '../assets/style/login.css'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {toast,} from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';

function Login () {

    // FOR POSTING DATA
    const postingData = useMutation({
      mutationKey:["save"],
      mutationFn(data:any){
        return axios.post('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud', data)
      }
    });

  // FOR FORM VALIDATION  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z ]{3,30}$/
  const schema = z.object({
    name:z.string().regex(nameRegex, {message:'Invalid name'}).min(6, {message: 'atleast 6 letters'}).max(27, {message: 'less than 27 letters'}),
    email:z.string().regex(emailRegex, {message: 'Invalid Email'}),
    password:z.string().min(3, {message:'password must contain atleast three character'}).max(15, {message:'password exceeds more than 15 character'})
  });

  const {register, handleSubmit, formState:{errors}, reset} = useForm({
    resolver: zodResolver(schema),
  });

 
  // SUBMITTING FORM DATA
  const confirm = useConfirm();
  const submit = async (data:any) => {
    await confirm({
      title:'Are you sure?',
      description: 'You are going to Save this user!!',
      confirmationText:'Yes',
      cancellationText :'No',
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
          left:'55px',
          borderRadius:'12px',
          padding:'8px 20px 8px 20px',
          fontSize:'1rem'
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
          borderColor:'red',
          padding:'8px 20px 8px 20px',
          fontSize:'1rem'
        }
      },
    });
    const {password, ...safeData} = data; 
    console.log(safeData);
    postingData.mutate(data);
    reset();  
    toast.success('Form Submitted Successfully!', {
      autoClose: 2000,
    });
  };
  if(errors.password || errors.email || errors.name){
    toast.error('error!', {
      autoClose: 1000,
    });
  };

  return (
    <>
    <div className='relative flex justify-center item-center flex-wrap px-0 py-8'>
      <main className='relative flex justify-center item-center flex-col w-96 h-[480px] rounded-xl border-2 border-sky-500'>
        <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-5 px-8'>
          <section className='flex justify-left item-center flex-col gap-2'>
            <label className='text-3xl font-semibold'>Fullname</label>
            <input type="text" placeholder='enter your name' {...register('name')} className='h-10 text-xl rounded-md border-2 border-emerald-950 p-1 placeholder:text-base' />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
          </section>       
          <section className='flex justify-left item-center flex-col gap-2'>
            <label className='text-3xl font-semibold'>Email</label>
            <input type="text" placeholder='abc@gmail.com' {...register('email')} className='h-10 text-xl rounded-md border-2 border-emerald-950 p-1 placeholder:text-base' />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
          </section>

          <section className='flex justify-left item-center flex-col gap-2'>
            <label className='text-3xl font-semibold'>Password</label>
            <input type="password" placeholder='password here' {...register('password')} className='h-10 text-base rounded-md border-2 border-emerald-950 p-1 placeholder:text-base'/>
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
          </section>
          <button className='hover:bg-sky-500 active:bg-sky-700 text-xl'>Save</button>
        </form>
      </main>
    </div>
    <footer className='sticky'>
      <div className='flex justify-between item-center m-[5px]'>
        <Link to="/">
          <button className='hover:bg-sky-500 active:bg-sky-700'>
            Back to main page        
          </button>
        </Link>
        <Link to="/components/loginDetails">
          <button className='hover:bg-sky-500 active:bg-sky-700'>
            Show login details       
          </button>
        </Link>
      </div>   
      </footer>   
    </>
  )
}

export default Login;