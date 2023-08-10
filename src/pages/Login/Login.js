//css
import styles from './Login.module.css';

//hoks
import {useState, useEffect} from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
      //States do formulario
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
  
      //Hook de autenticação
      const {login, error: authError, loading} = useAuthentication();
  
      //Função para lidar com o envio do formulario
      const handleSubmit = async (e) => {
          e.preventDefault();
  
          setError('');
  
          const user = {
              email: email,
              password: password,
          };

  
          const res = await login(user);
          console.log(res);
      }
  
      useEffect(() => {
  
          if(authError) {
              setError(authError)
          }
  
      }, [authError])


  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
  
            <label>
                <span>E-mail:</span>
                <input type='email' name='email'  required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label>
                <span>Senha:</span>
                <input type='password' name='password'  required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            {!loading && <input type='submit' value='Entrar' className='btn'/>}
            {loading && <input type='submit' value='Aguarde...' className='btn' disabled/>}

            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login