import styles from './CreatePost.module.css';

//hooks
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = ('');

    const {user} = useAuthValue();

    const {insertDocument, response} = useInsertDocument('posts');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormError('');

        //validade image urrl

        try {

            new URL(image);
            
        } catch (error) {

            setFormError('A imagem precisa ser uma URL!');
            
        }

        // criar arery de tags
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

        //checkar todos os valores
        if(!title || !image || !tags || !body) {
            setFormError('Por Favor preencha todos os campos.');
        }

        if (formError) return;

        insertDocument({
            title: title,
            image: image,
            body: body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })


        //redirect home page

        navigate('/')


    } 


  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>Escreva sobre oque quiser e compartilhe o seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Titulo:</span>
                <input type='text' name='title' required placeholder='Pense num bom título...' onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>

            <label>
                <span>URL da imagem:</span>
                <input type='text' name='title' required placeholder='Insira uma image que representa o seu post' onChange={(e) => setImage(e.target.value)} value={image}/>
            </label>

            <label>
                <span>Conteudo:</span>
                <textarea name='body' required placeholder='Insira o conteudo do post' onChange={(e) => setBody(e.target.value)} value={body}/>
            </label>

            <label>
                <span>Tags:</span>
                <input type='text' name='tags' required placeholder='Insira as tags separadas por virgula' onChange={(e) => setTags(e.target.value)} value={tags}/>
            </label>

            {!response.loading && <input type='submit' value='Cadastrar' className='btn'/>}
            {response.loading && <input type='submit' value='Aguarde...' className='btn' disabled/>}

            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}

        </form>
    </div>
  )
}

export default CreatePost