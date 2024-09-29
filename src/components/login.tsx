import {Link} from 'react-router-dom';
// import '../assets/style/login.css'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {toast,} from 'react-toastify';

function Login () {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const schema = z.object({
    email:z.string().regex(emailRegex, {message: 'Invalid Email'}),
    password:z.string().min(3, {message:'password must contain atleast three character'})
  });

  // FOR POSTING DATA
  const postingData = useMutation({
    mutationKey:["save"],
    mutationFn(data:any){
      return axios.post('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud', data)
    }
  });

  // FOR FORM VALIDATION  
  const {register, handleSubmit, formState:{errors}, reset} = useForm({
    resolver: zodResolver(schema),
  });

 
  // SUBMITTING FORM DATA
  const submit = (data:any) => {
      const {password, ...safeData} = data; 
      console.log(safeData);
      postingData.mutate(data);
      reset();  
      toast.success('Form Submitted Successfully!', {
        autoClose: 2000,
      });
  };
  if(errors.password || errors.email){
    toast.error('error!', {
      autoClose: 1000,
    });
  };

  return (
    <>
    <div className='relative flex justify-center item-center flex-wrap px-0 py-16'>
      <main className='relative flex justify-center item-center flex-col w-96 h-96 rounded-xl border-2 border-sky-500'>
        {/* <button>Login Here</button> */}
        <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-5 px-10'>       
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
          <button className='hover:bg-sky-500 active:bg-sky-700'>Login</button>
        </form>
      </main>
    </div>
    <footer className='sticky'>
      <div className='flex justify-between item-center m-2.5'>
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