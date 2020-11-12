import React from 'react'
import { useHistory } from 'react-router-dom';

//общее содержимое карточки, является составной частью других компонент
function Card(props) {
    const {content, created} = props;
    const history = useHistory();
   
    const cancel = () => {
        history.push("/");
    }

    return (
      <>
        <div className="postHeader">
            <img className="inline" src="../images/logo.png" alt=""/>
            <table className="inline leftPadding">
                <tbody>
                    <tr>
                        <td className="userName">Alexandra</td>
                    </tr>
                    <tr>
                        <td className="userPosition">Основатель группы {new Date(created).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
            <b className="inline right width20per" onClick={cancel}>x</b>
        </div>
        <div>
            <textarea className="textareaWide" value={content} readOnly></textarea>
        </div>
        <div className="reactionBlock padding">
            <p className="reaction">Нравится</p>
            <p className="reaction">Комментировать</p>
        </div>
      </>
    )
}

export default Card;