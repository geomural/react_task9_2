import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import PostsContext from '../context/PostsContext';
import CardView from './CardView';

//просмотр карточки (результат клика на карточку в списке)
function EditCard(props) {
    const history = useHistory();
    const {content, id} = props;
    const [newContent, setNewContent] = useState(content);
    const [goToCardView, setGoToCardView] = useState(false);

    const {savePosts} = useContext(PostsContext);
    const updateContext = async() => {
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

    const savePost = async() => {
        try {
            const response = await fetch(process.env.REACT_APP_CARDS_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"id": id, "content": newContent}),
            });
            if (!response.ok) {
                throw new Error('Remove failed');
            } else {
                updateContext();
            }
        } catch (e) {
            console.log("Error", e);
        } finally {
            setGoToCardView(true);
        }
    }

    const cancel = () => {
        history.goBack();
    }

    const changeValue = (e) => {
        setNewContent(e.target.value);        
    }

    if (!goToCardView) {
        return (
            <div className="postBlock padding cardInList">
                <div className="editHeader">
                    <b className="inline left width80per">Редактировать публикации</b>
                    <b className="inline right width20per" onClick={cancel}>x</b>
                </div>
                <div id="divNewPost" className="padding">
                    <div id="newPostImgDiv">
                        <img src="../images/logo.png" alt=""/>
                    </div>
                    <textarea value={newContent} onChange={changeValue}></textarea>
                </div>
                <table className="editPostExtraActions">
                    <tbody>
                        <tr className="padding">
                            <td className="padding">Фото/видео</td>
                            <td className="padding">Отметить друзей</td>
                        </tr>
                        <tr className="padding">
                            <td className="padding">Чувства/действия</td>
                            <td className="padding">Отметить посещение</td>
                        </tr>
                        <tr className="padding">
                            <td className="padding">GIF</td>
                        </tr>
                    </tbody>
                </table>
                <div className="right">
                    <button className="blueBtn" onClick={savePost}>Сохранить</button>
                </div>
            </div>
        )
    } else {
        //переключиться обратно на страницу просмотра карточки с обновленными данными
        return <CardView />
    }
}

export default EditCard;