import React from 'react'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList({ reload, setReload }) {
    const [list, setList] = React.useState({});

    const getPosts = async () => {
        const res = await fetch('http://posts.com/posts');
        const listReceived = await res.json();
        setList(listReceived);
        console.log(listReceived);
        setReload(false);
    }

    React.useEffect(() => {
        if (reload) {
            getPosts();
            return () => { }
        }
    }, [reload]);

    return (
        <div className="d-flex flex-row flex-wrap justify-content-center">
            {
                Object.values(list).map(post => (
                    <div key={post.id} className="card mt-2" style={{ width: '30%', marginBottom: '20px' }}>
                        <div className="card-body">
                            <h3 className="card-title text-center">{post.title}</h3>
                            <CommentList comments={post.comments}/>
                            <CommentCreate postId={post.id} setReload={setReload}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
