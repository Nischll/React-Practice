import {Link} from 'react-router-dom';
import '../assets/style/login.css'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import '../assets/style/toast.css';


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
    toast.success('Form Submitted Successfully!');
  };

  return (
    <>
    <div className='wrapper'>
      <main className='formContainer'>
        {/* <button>Login Here</button> */}
        <form onSubmit={handleSubmit(submit)}>       
          <section className='email'>
            <label>Email</label>
            <input type="text" placeholder='abc@gmail.com' {...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}
          </section>

          <section className='password'>
            <label>Password</label>
            <input type="password" placeholder='password here' {...register('password')}/>
            {errors.password && <span>{errors.password.message}</span>}
          </section>
          <button>Login</button>
        </form>
      </main>
      <ToastContainer/>
    </div>
    <footer>
      <div className='footerContainer'>
        <Link to="/">
          <button>
            Back to main page        
          </button>
        </Link>
        <Link to="/components/loginDetails">
          <button>
            Show login details       
          </button>
        </Link>
      </div>   
      </footer>   
    </>
  )
}

export default Login;