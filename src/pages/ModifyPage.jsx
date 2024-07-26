import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useCrud from '../hooks/useCrud';
import { useNavigate } from 'react-router-dom';
import './styles/modifyPage.css';

const ModifyPage = () => {

    const [eyeIcon1, setEyeIcon1] = useState(true);
    const [eyeIcon2, setEyeIcon2] = useState(true);
    const [eyeIcon3, setEyeIcon3] = useState(true);
    const [passErr1, setPassErr1] = useState();
    const [passErr2, setPassErr2] = useState();

    const [modify,,, updUser] = useCrud();
    const userSlice = useSelector(store => store.userSlice);
    const {handleSubmit, register, reset} = useForm();
    const navigate = useNavigate();

    if (modify?.email.includes('@')) {
        navigate('/login');
    }

    useEffect(() => {
      reset({
        avatar: userSlice.avatar,
        name: userSlice.name,
        email: userSlice.email,
        role: userSlice.role,
      });
    }, []);

    const updateUser = () => {
        updUser(`/users/${userSlice.id}`, {
                avatar: data.avatar || userSlice.avatar,
                name: data.name || userSlice.name,
                email: data.email || userSlice.email,
                password: data.newPassword || userSlice.password,
                role: data.role || userSlice.role,
            }
        );
    }

    const submit = data => {
        if (data.oldPassword === userSlice.password) {
            if (data.newPassword === data.repeatPassword) {
                updateUser();
            } else {
                setPassErr2(true);
            }
        } else {
            setPassErr1(true);
        }
    }

    const handleEye1 = () => {
        setEyeIcon1(!eyeIcon1);
    }

    const handleEye2 = () => {
        setEyeIcon2(!eyeIcon2);
    }

    const handleEye3 = () => {
        setEyeIcon3(!eyeIcon3);
    }

  return (
    <div className='modifypage'>
        <h3 className='modifypage__error'>{modify?.message?.[0]}</h3>
        <form className='modifypage__form' onSubmit={handleSubmit(submit)}>
            <div className='modifypage__field'>
                <label htmlFor="avatar">Photo url</label>
                <input {...register('avatar')} id='avatar' type="text" />
            </div>
            <div className='modifypage__field'>
                <label htmlFor="name">Name</label>
                <input {...register('name')} id='name' type="text" />
            </div>
            <div className='modifypage__field'>
                <label htmlFor="email">Email</label>
                <input {...register('email')} id='email' type="text" />
            </div>
            <div className={`modifypage__field ${passErr1?'active':''}`}>
                <label htmlFor="oldPassword">Old password</label>
                <input {...register('oldPassword')} id='oldPassword'
                type={eyeIcon1 ? "password" : 'text'} />
                <ion-icon
                    onMouseDown={handleEye1}
                    onMouseUp={handleEye1}
                    name={eyeIcon1 ? 'eye' : 'eye-off'}
                >
                </ion-icon>
            </div>
            <div className={`modifypage__field ${passErr2?'active':''}`}>
                <label htmlFor="newPassword">New password</label>
                <input {...register('newPassword')} id='newPassword'
                type={eyeIcon2 ? "password" : 'text'} />
                <ion-icon
                    onMouseDown={handleEye2}
                    onMouseUp={handleEye2}
                    name={eyeIcon2 ? 'eye' : 'eye-off'}
                >
                </ion-icon>
            </div>
            <div className='modifypage__field'>
                <label htmlFor="repeatPassword">Repeat new password</label>
                <input {...register('repeatPassword')} id='repeatPassword'
                type={eyeIcon3 ? "password" : 'text'} />
                <ion-icon
                    onMouseDown={handleEye3}
                    onMouseUp={handleEye3}
                    name={eyeIcon3 ? 'eye' : 'eye-off'}
                >
                </ion-icon>
            </div>
            <div className='modifypage__field'>
                <label htmlFor="role">Role</label>
                <input {...register('role')} id='role' type="text" />
            </div>
            <button className='modifypage__btn'>Modify</button>
        </form>
    </div>
  )
}

export default ModifyPage;