//css
import styles from './Register.module.css';


//Hooks
import {useState, useEffect} from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';



const Register = () => {
    //States do formulario
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    //Hook de autenticação
    const {createUser, error: authError, loading} = useAuthentication();

    //Função para lidar com o envio do formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        const user = {
            displayName: displayName,
            email: email,
            password: password,
        };

        if(password !== confirmPassword) {
            setError('As senhas precisam ser iguais!')
            return
        }

        const res = await createUser(user);
        console.log(res);
    }

    useEffect(() => {

        if(authError) {
            setError(authError)
        }

    }, [authError])

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuario e compartilhe suas historias</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input type='text' name='displayName'  required placeholder='Nome do usuário' value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            </label>

            <label>
                <span>E-mail:</span>
                <input type='email' name='email'  required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label>
                <span>Senha:</span>
                <input type='password' name='password'  required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            <label>
                <span>Confirmação de senha:</span>
                <input type='password' name='confirmPassword'  required placeholder='Comfirme sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>

            {!loading && <input type='submit' value='Cadastrar' className='btn'/>}
            {loading && <input type='submit' value='Aguarde...' className='btn' disabled/>}

            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
};

export default Register;