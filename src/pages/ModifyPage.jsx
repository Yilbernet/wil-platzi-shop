import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useCrud from '../hooks/useCrud';
import { useNavigate } from 'react-router-dom';

const ModifyPage = () => {

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

    const submit = data => {
        if ((data.newPassword === data.repeatPassword &&
            data.oldPasword === userSlice.password) ||
            (!data.oldPassword &&
            !data.newPassword &&
            !data.repeatPassword)) {
            updUser(
                `/users/${userSlice.id}`, {
                    avatar: data.avatar || userSlice.avatar,
                    name: data.name || userSlice.name,
                    email: data.email || userSlice.email,
                    password: data.newPassword || userSlice.password,
                    role: data.role || userSlice.role,
                }
            );
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor="avatar">Avatar</label>
                <input {...register('avatar')} id='avatar' type="text" />
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input {...register('name')} id='name' type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input {...register('email')} id='email' type="text" />
            </div>
            <div>
                <label htmlFor="oldPassword">Old password</label>
                <input {...register('oldPassword')} id='oldPassword' type="text" />
            </div>
            <div>
                <label htmlFor="newPassword">New password</label>
                <input {...register('newPassword')} id='newPassword' type="text" />
            </div>
            <div>
                <label htmlFor="repeatPassword">Repeat new password</label>
                <input {...register('repeatPassword')} id='repeatPassword' type="text" />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input {...register('role')} id='role' type="text" />
            </div>
            <button>Modify</button>
        </form>
    </div>
  )
}

export default ModifyPage;