import React, { useEffect, useRef, useState } from 'react';
import useCrud from '../hooks/useCrud';
import { useForm } from 'react-hook-form';
import './styles/registerPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRegister } from '../store/slices/register.slice';
import axios from 'axios';
let info;

const RegisterPage = () => {

    const [available, setAvailable] = useState(true);
    const [equal, setEqual] = useState(true);
    const [test, setTest] = useState();
    const [eyeIcon1, setEyeIcon1] = useState(true);
    const [eyeIcon2, setEyeIcon2] = useState(true);
    const [user,, createUser] = useCrud();
    const { handleSubmit, register, reset } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.isAvailable===false) {
            setAvailable(true);
            createUser('/users', {
                name: info.name,
                email: info.email,
                password: info.password,
                avatar: info.avatar || 'https://i.ibb.co/LdLn7Db/default-user.jpg',
            });
        } else if (user?.isAvailable) {
            setAvailable(false);
        }
        if (user?.name) {
            dispatch(setRegister(user.email));
            reset({
                name: '',
                email: '',
                password: '',
                password2: '',
                avatar: '',
            });
            navigate('/login');
        }
    }, [user]);

    const submit = data => {
        if (data.password===data.password2) {
            setEqual(true);
            info = data;
            createUser('/users/is-available', {
                email: data.email,
            });
        } else {
            setEqual(false);
        }
    }

    const handleTest = () => {
        const url = 'https://randomuser.me/api/';
        axios.get(url)
            .then(res => setTest(res.data.results[0]))
            .catch(err => console.log(err));
    }

    if (test) {
        reset({
            name: `${test.name.first} ${test.name.last}`,
            email: test.email,
            password: '1234',
            password2: '',
            avatar: test.picture.large,
        });
        setTest();
    }

    const handleEye1 = () => {
        setEyeIcon1(false);
        setTimeout(() => {
            setEyeIcon1(true);
        }, 3000);
    }

    const handleEye2 = () => {
        setEyeIcon2(false);
        setTimeout(() => {
            setEyeIcon2(true);
        }, 3000);
    }

  return (
    <div className='registerpage'>
        <h3 className='registerpage__error'>{user?.message?.[0]}</h3>
        <button className='registerpage__test' onClick={handleTest}>
            Test user
        </button>
        <form className='registerpage__form' onSubmit={handleSubmit(submit)}>
            <p className='registerpage__p'>Field required =</p>
            <div className='registerpage__item'>
                <label htmlFor="name">Name</label>
                <input {...register('name')} id='name' type="text" />
            </div>
            <div className={`registerpage__item ${available?'':'active'}`}>
                <label htmlFor="email">Email</label>
                <input {...register('email')} id='email'
                type="email" placeholder='example@email.com'/>
            </div>
            <div className={`registerpage__item ${equal?'':'active'}`}>
                <label htmlFor="password">Password</label>
                <input {...register('password')} id='password'
                    type={eyeIcon1 ? "password" : 'text'} />
                <ion-icon
                    onClick={handleEye1}
                    name={eyeIcon1 ? 'eye' : 'eye-off'}
                >
                </ion-icon>
            </div>
            <div className='registerpage__item'>
                <label htmlFor="password2">Repeat password</label>
                <input {...register('password2')} id='password2'
                    type={eyeIcon2 ? "password" : 'text'} />
                <ion-icon
                    onClick={handleEye2}
                    name={eyeIcon2 ? 'eye' : 'eye-off'}
                >
                </ion-icon>
            </div>
            <div className='registerpage__item'>
                <label htmlFor="photo">Photo url</label>
                <input {...register('avatar')} id='photo'
                type="text" placeholder='https://i.ibb.co/user.jpg'/>
            </div>
            <button className='registerpage__btn'>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage;