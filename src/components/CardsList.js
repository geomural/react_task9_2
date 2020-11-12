import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import PostsContext from '../context/PostsContext';
import CardInList from './CardInList';

//главная страница
function CardsList() {
    const {posts, savePosts} = useContext(PostsContext);

    useEffect(() => {
      //загрузка списка
      let initList = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_CARDS_URL);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const resultList = await response.json();
          savePosts(resultList);
        } catch (e) {
          console.error(e);
        }
      }
      initList();
      return
    }, []);

    return (
      <>
        <div id="initCreatePostBlock" className="postBlock">
          <div className="initCreatePostDiv">
            <nav>
                <Link to="/posts/new">
                    <button className="blueBtn">Создать пост</button>
                </Link>
            </nav>
          </div>
        </div>
        {posts ? posts.map(post => <CardInList key={post.id} {...post}/>) : null}
      </>
    )
}

export default CardsList;