import React, {useState} from 'react'

//страница с созданием новой карточки
function NewCard(props) {
    const {history} = props;
    const [inputValue, setInputValue] = useState();

    const changeValue = evt => {
        const {value} = evt.target;
        setInputValue(value);
    }

    const savePost = async() => {
        try {
            const response = await fetch(process.env.REACT_APP_CARDS_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"id": 0, "content": inputValue}),
            });
            if (!response.ok) {
                throw new Error('Save failed');
            }
        } catch (e) {
            console.log("Error", e);
        } finally {
            history.push("/");
        }
    }
    
    //на главную страницу
    const cancel = () => {
        history.push("/");
    }

    return (
        <div className="postBlock">
            <div id="upperSections">
                <p>Публикация</p>
                <p>Фото/видео</p>
                <p>Прямой эфир</p>
                <p>Ещё</p>
                <b onClick={cancel}>x</b>
            </div>
            <div id="divNewPost">
                <div id="newPostImgDiv">
                    <img src="../images/logo.png" alt=""/>
                </div>
                <textarea placeholder="Введите текст..." value={inputValue} onChange={changeValue}></textarea>
            </div>
            <div className="initCreatePostDiv">
               <button className="blueBtn" onClick={savePost}>Опубликовать</button>
            </div>
        </div>
    )
}

export default NewCard;