import PostsContext from './PostsContext';
import React, {useState} from 'react';

export default function PostsProvider(props) {
    const [posts, setPosts] = useState([]);

    const savePosts = (newPosts) => {
        setPosts(newPosts);
    }

    return (
        <PostsContext.Provider value={{posts, savePosts}}>
            {props.children}
        </PostsContext.Provider>
    )
}
    