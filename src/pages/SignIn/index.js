import { useState } from 'react'
import { Link } from 'react-router-dom'

import './signin.css'
import logo from '../../assets/logo.png'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        alert("Submit")
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo do Sistema" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email. ex: suporte@orei.com.br" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma senha forte" />
                    <button type='submit'>Entrar</button>
                </form>

                <Link to="/register">Não tem uma conta? Clique aqui.</Link>
            </div>
        </div>
    )
}

export default SignIn