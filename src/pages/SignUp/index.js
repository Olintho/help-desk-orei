import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/logo.png'

function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp } = useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '') {
            signUp(email, password, name)
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo do Sistema" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar uma conta</h1>
                    <input type="text"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome" />
                    <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email. ex: suporte@orei.com.br" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma senha forte" />
                    <button type='submit'>Cadastrar</button>
                </form>

                <Link to="/">Já tem uma conta? Clique aqui.</Link>
            </div>
        </div>
    )
}

export default SignUp