import React from 'react'

export default function CommentCreate({ postId, setReload }) {
    const [comment, setComment] = React.useState('');

    const addComment = async (ev) => {
        ev.preventDefault();
        const resp = await fetch(`http://posts.com/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content: comment }),
            headers: {
                'Content-type': 'application/json',
            }
        });
        setComment('');
        setReload(true);
    }

    return (
        <div className="">
            <form onSubmit={addComment}>
                <div class="form-group">
                    <label>New Comment</label>
                    <input
                        type="text"
                        className="form-control"
                        value={comment}
                        onChange={ev => setComment(ev.target.value)}
                    />
                </div>
                <button className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    )
}
