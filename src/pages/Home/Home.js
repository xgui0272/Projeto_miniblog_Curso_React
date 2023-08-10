//Css
import styles from'./Home.module.css';

//hoks

import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import {useFetchDocuments} from '../../hooks/useFetchDocuments';

//Components
import PostDetails from '../../components/PostDetails';

const Home = () => {

  const Navigate = useNavigate();
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments('posts')

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return Navigate(`/search?q=${query}`);
    }
  }
  return (
    <div className={styles.home}>
         <h1>Veja os nossos posts mais recentes</h1>

         <form onSubmit={handleSubmit} className={styles.search_form}>
            <input type='text' placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)} value={query}/>
            <button className='btn btn-dark'>Pesquisar</button>
         </form>

         <div>
            <h1>Post...</h1>
            {posts && posts.map((post) => (
              <PostDetails key={post.id} post={post} />
            ))}
            {posts && posts.length === 0 && (
              <div className={StyleSheet.noposts}>
                <p>Não foram encontrados posts</p>
                <Link to='/posts/create' className='btn'>Criar primeiro Post</Link>

              </div>
            )}
         </div>
    </div>
  )
};

export default Home;