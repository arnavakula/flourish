import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const ViewSinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const { authUser } = useAuth();

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetch(`http://localhost:8000/post/${postId}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setPost(data.post));
        }    
        loadPosts();

    });
   
    return (
        <div className='border p-4'>
            {post && (
                <>
                <h2 className='font-bold'>{post.title}<span className='font-light italic'> ({post.tag === 'None' ? '' : post.tag})</span></h2>
                {post.author && post.author._id === authUser ? <p><strong>You</strong></p> : 'hi'}
                <p>{post.text}</p>
                <div className='flex gap-[5px]'>
                    <button onClick={() => likePost(post)} className='border p-1' name='like'>
                        {post.likes.includes(authUser) ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    </button>
                    <button onClick={() => dislikePost(post)} className='border p-1' name='dislike'>
                        {post.dislikes.includes(authUser) ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                    </button>
                </div>
                </>
            )}
        </div>
    )
}

export default ViewSinglePost;