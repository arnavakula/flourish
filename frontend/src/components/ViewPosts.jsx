import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const { authUser } = useAuth();

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetch(`http://localhost:8000/post`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setPosts(data.posts));
        }    
        loadPosts();

    }, [trigger]);

    const likePost = async (post) => {
        const response = await axios.post(`http://localhost:8000/post/vote`, {
            'postId': post._id,
            'userId': authUser,
            'voteType': 'like'
        })
        
        console.log(response.data);
        setTrigger(prev => !prev);
    }

    const dislikePost = async (post) => {
        const response = await axios.post(`http://localhost:8000/post/vote`, {
            'postId': post._id,
            'userId': authUser,
            'voteType': 'dislike'
        })

        console.log(response.data);
        setTrigger(prev => !prev);
    }
    

    return (
        <div className='w-[80%] mt-[1vh] rounded-3xl border mx-auto h-[100%]'>
            Viewing Posts!
            {posts.map((post, i) => (
                <Link to={`/dashboard/community/post/${post._id}`} key={i}>
                    <div className='border p-4'>
                        <h2 className='font-bold'>{post.title}<span className='font-light italic'> ({post.tag === 'None' ? '' : post.tag})</span></h2>
                        {post.author && post.author._id === authUser ? <p><strong>You</strong></p> : 'hi'}
                        <p>{post.text}</p>
                        <div className='flex gap-[5px]'>
                            <button onClick={() => likePost(post)} className='border p-1' name='like'>
                                {post.likes.includes(authUser) ? <ThumbUpAltIcon /> :<ThumbUpOffAltIcon />}
                            </button>
                            <button onClick={() => dislikePost(post)} className='border p-1' name='dislike'>
                                {post.dislikes.includes(authUser) ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ViewPosts;