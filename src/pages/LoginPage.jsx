import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useCrud from '../hooks/useCrud';
import { useDispatch, useSelector } from 'react-redux';
import { delUser, getUserThunk } from '../store/slices/user.slice';
import { setRegister } from '../store/slices/register.slice';
import './styles/loginPage.css';
let email;

const LoginPage = () => {

  const [token, setToken] = useState();
  const [modal, setModal] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [tokensObj,, createToken] = useCrud();
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSlice = useSelector(store => store.userSlice);
  const registerSlice = useSelector(store => store.registerSlice);

  const submit = data => {
    email = data.email;
    createToken('/auth/login', data);
  }

  useEffect(() => {
    if(tokensObj?.access_token) {
      localStorage.setItem('access_token', tokensObj.access_token);
      localStorage.setItem('refresh_token', tokensObj.refresh_token);
      localStorage.setItem('email_token', email);
      reset({
        email: '',
        password: '',
      });
    }
    setToken(localStorage.getItem('access_token'));
    email = localStorage.getItem('email_token');
    dispatch(getUserThunk('/auth/profile'));
  }, [tokensObj]);

  useEffect(() => {
    if (registerSlice) {
      setTimeout(() => {
        setModal(true);
        reset({
          email: registerSlice,
          password: '',
        });
        setTimeout(() => {
          dispatch(setRegister(null));
          setModal(false);
        }, 3000);
      }, 500);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('email_token');
    dispatch(delUser());
    setToken();
  }

  const longEmail = () => {
    let newEmail = email?.split('@');
    if (email?.length > 26) {
      return newEmail.join(' @');
    } else {
      return newEmail?.join('@');
    }
  }

  const handleModify = () => {
    navigate('/modify');
  }

  const handleEye = () => {
    setEyeIcon(!eyeIcon);
  }

  return (
    <div className='loginpage'>
      {
        token ?
          <div className='loginpage__logout'>
            <figure className='loginpage__img'>
              <img src={userSlice?.avatar} alt="user image" />
            </figure>
            <ul className='loginpage__list'>
              <li className='loginpage__item'><span>Id: </span><span>{userSlice?.id}</span></li>
              <li className='loginpage__item'><span>Name: </span><span>{userSlice?.name}</span></li>
              <li className='loginpage__item'><span>Email: </span><span>{longEmail()}</span></li>
              <li className='loginpage__item'><span>Role: </span><span>{userSlice?.role}</span></li>
            </ul>
            <div className='loginpage__buttons'>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleModify}>Modify</button>
            </div>
          </div>
          :
          <div className='loginpage__login'>
            <h3 className='loginpage__error'>{tokensObj?.message}</h3>
            <form className='loginpage__form' onSubmit={handleSubmit(submit)}>
              <div className='loginpage__field'>
                <label htmlFor="email">Email</label>
                <input {...register('email')} id='email' type="email" />
              </div>
              <div className='loginpage__field'>
                <label htmlFor="password">Password</label>
                <input {...register('password')} id='password'
                  type={eyeIcon ? "password" : 'text'} />
                <ion-icon
                    onMouseDown={handleEye}
                    onMouseUp={handleEye}
                    name={eyeIcon ? 'eye' : 'eye-off'}
                >
                </ion-icon>
              </div>
              <button className='loginpage__login-btn'>Login</button>
            </form>
            <p className='loginpage__p'>If you are not register yet, you can <Link to='/register'>register here</Link></p>
          </div>
      }
      <p className={`loginpage__modal ${modal ? 'active' : ''}`}>
        The user has been registered successfully ✔
      </p>
    </div>
  )
}

export default LoginPage;