import React from 'react'

export default function CommentList({ comments }) {

    const getComment = (comment) => {
        if(comment.status === 'approved') {
            return comment.content;
        }

        if(comment.status === 'pending') {
            return 'This comment is in moderation'
        }

        if(comment.status === 'rejected') {
            return 'This comment has been rejected'
        }
    }

    return (
        <ul>
            {
                comments?.map(comment => (
                    <li key={comment.id}>{getComment(comment)}</li>
                ))
            }
        </ul>
    )
}
