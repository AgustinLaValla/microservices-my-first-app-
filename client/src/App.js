import React from 'react'
import PostCreate from './PostCreate';
import PostList from './PostList';

export default function App() {
    const [reload, setReload] = React.useState(true);
    return (
        <div className="container">
            <h1>Create Post</h1>
            <PostCreate setReload={setReload}/>
            <PostList reload={reload} setReload={setReload} />

        </div>
    )
}
