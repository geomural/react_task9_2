import React from 'react'
import { useHistory } from 'react-router-dom';
import Card from './Card'

//карточки в списке на "главной" странице
function CardInList(props) {

    const history = useHistory();

    const openPost = () => {
        history.push(`/posts/${props.id}`);
    }

    return (
      <div className="postBlock padding cardInList" onClick={openPost}>
        <Card {...props}/>
        <div className="commentBlock">
            <img className="inline" src="../images/logo.png" alt=""/>
            <input className="inline" value="Напишите комментарий..." readOnly/>
        </div>
      </div>
    )
}

export default CardInList;