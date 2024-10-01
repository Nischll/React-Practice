import {Link, useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useConfirm} from 'material-ui-confirm'


function Edit () {
  
  const {id} = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['get', id],
    queryFn (){
      return axios.get(`https://667d2474297972455f63aec9.mockapi.io/api/crud/crud/${id}`)
    }
  });

  const postingData = useMutation({
    mutationKey:["put"],
    mutationFn(data:any){
      return axios.put(`https://667d2474297972455f63aec9.mockapi.io/api/crud/crud/${id}`, data)
    },
    onSuccess() {
      toast.success('Form updated successfully!', { autoClose: 2000 });
      navigate('/components/loginDetails');
    },
    onError() {
      toast.error('Error updating form!', { autoClose: 2000 });
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
    values:{
      name:data?.data.name,
      email: data?.data.email,
      password: data?.data.password,
    },
  });

   // SUBMITTING FORM DATA
   const confirm = useConfirm();
  const submit = async (data:any) => {
    await confirm({
      title:'Are you sure?',
      description: 'You are going to Update this user!!',
      confirmationText:'Update now',
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
          borderRadius:'12px',
          backgroundColor:'green'
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
    postingData.mutate(data);
    reset();  
  };
  // if(errors.email || errors.password){
  //   toast.error('error!', {
  //     autoClose: 1000,
  //   });
  // }

return (
  <>
    <div className='relative flex justify-center item-center flex-wrap px-0 pt-12 mb-4'>
      <main className='relative flex justify-center item-center flex-col w-96 h-[480px] rounded-xl border-2 border-sky-500'>
        <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-5 px-10'>  
          <section className='flex justify-left item-center flex-col gap-2'>
            <label className='text-3xl font-semibold'>Fullname</label>
            <input type="text" placeholder='enter your name' {...register('name')} className='h-10 text-xl rounded-md border-2 border-emerald-950 p-1 placeholder:text-base' />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
          </section> 

          <section className='flex justify-left item-center flex-col gap-2'>
            <label className='text-3xl font-semibold'>Email</label>
            <input type="text" placeholder='abc@gmail.com' {...register('email')} className='h-10 text-xl rounded-md border-2 border-emerald-950 p-1 placeholder:text-base'/>
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
          </section>

          <section className='flex justify-left item-center flex-col gap-2'>
            <label className='text-3xl font-semibold'>Password</label>
            <input type="password" placeholder='password here' {...register('password')} className='h-10 text-base rounded-md border-2 border-emerald-950 p-1 placeholder:text-base'/>
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
          </section>

          <section className='flex justify-between item-center'>
            <button className='bg-green-600 hover:bg-green-700 active:bg-green-800 text-center px-[45px]'>Update</button>
            <Link to="/components/loginDetails">
              <button className='bg-red-600 hover:bg-red-700 active:bg-red-800 text-center px-[15px]'>Cancel</button>
            </Link>
          </section>
        </form>
      </main>
    </div>
  </>
)};
export default Edit;