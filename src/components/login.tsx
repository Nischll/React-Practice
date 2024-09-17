import {Link} from 'react-router-dom';
// import '../assets/style/theme.css';
import '../assets/style/login.css'
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
  };

  return (
    <>
    <div className='wrapper'>
      <main className='formContainer'>
        {/* <button>Login Here</button> */}
        <form onSubmit={handleSubmit(submit)}>       
          <section className='email'>
            <label>Email:</label>
            <input type="text" {...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}
          </section>

          <section className='password'>
            <label>Password:</label>
            <input type="password" {...register('password')}/>
            {errors.password && <p>{errors.password.message}</p>}
          </section>

          <button>Login</button>
        </form>
      </main>
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