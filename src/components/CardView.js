import React, {useState, useContext} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Card from './Card';
import PostsContext from '../context/PostsContext';
import CardsList from './CardsList';
import EditCard from './EditCard';

//просмотр карточки (результат клика на карточку в списке)
function CardView(props) {
    const history = useHistory();
    const params = useParams();
    const {posts} = useContext(PostsContext);
    const currentPost = posts.find(post => post.id === Number(params.postId));
    const [isEditPost, setIsEditPost] = useState(false);

    const editPost = () => {
        setIsEditPost(true);
    }

    const removePost = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_CARDS_URL}/${currentPost.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Remove failed');
            }
        } catch (e) {
            console.log("Error", e);
        } finally {
            history.push("/");
        }
    }

    if (currentPost) {
        if (!isEditPost) {
            return (
            <div className="postBlock padding cardInList">
                <Card {...currentPost}/>
                <div className="right">
                    <button className="blueBtn narrowBtn" onClick={editPost}>Изменить</button>
                    <button className="redBtn narrowBtn" onClick={removePost}>Удалить</button>
                </div>
            </div>
            )
        } else {
            return <EditCard {...currentPost}/>
        }
    } else {
        return <CardsList />
    }
}

export default CardView;