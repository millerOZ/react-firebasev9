import React,{useState} from 'react';
import one from '../images/1.avif'
import two from '../images/2.avif'
import three from '../images/3.jpeg'
import firebaseApp from '../credential'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

const auth = getAuth(firebaseApp)

const Login = () => {
    const [register, setRegister] = useState(false)

    const handlerSubmit = async(c) => {
        c.preventDefault()
        const email = c.target.email.value;
        const password = c.target.password.value;

        if(register){
            await createUserWithEmailAndPassword(auth,email,password)
        }else {
            await signInWithEmailAndPassword(auth,email,password)
        }
    }
    return (
        <div className='row container p-4'>
            <div className='col-md-8' >
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={one} className="size-img" alt="" />
                    </div>
                    <div className="carousel-item">
                    <img src={two} className="size-img" alt=""/>
                    </div>
                    <div className="carousel-item">
                    <img src={three} className="size-img" alt=""/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>  
            <div className='col-md-4' >
                <div className='mt-5 ms-5'>
                    <h1>{register ? 'Registrate' : 'Inicia sesion'}</h1>
                    <form onSubmit={handlerSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Email </label>
                            <input type='email' className='form-control' placeholder='Ingresar email' id='email'></input>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña </label>
                            <input type='password' className='form-control' placeholder='Ingresar contraseña' id='password'></input>
                        </div>

                        <button className='btn btn-primary' type='submit'>
                            {register ? 'Registrate' : 'Inicia sesion'}
                        </button>
                    </form>
                    <div className='form-group'>
                        <div className='btn btn-secondary mt-4 form-control' onClick={()=> setRegister(!register)}>
                            {register ? 'Ya tienes una cuenta ? Inicia sesion' : 'No tiene cuenta ? Registrate'}
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}
export default Login