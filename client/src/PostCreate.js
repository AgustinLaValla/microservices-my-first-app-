import React from 'react'

export default function PostCreate({ setReload }) {
    const [title, setTitle] = React.useState('');

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        await fetch('http://posts.com/posts/create', {
            method: 'POST',
            body: JSON.stringify({ title }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        setTitle('');
        setReload(true);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                </div>
                <button className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    )
}
