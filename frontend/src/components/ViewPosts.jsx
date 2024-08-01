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

    const toggleVote = async (evt, post, voteType) => {
        evt.preventDefault();
        evt.stopPropagation();

        const response = await axios.post(`http://localhost:8000/post/vote`, {
            'postId': post._id,
            'userId': authUser,
            voteType
        })

        setTrigger(prev => !prev);
    }
    
    return (
        <div className='w-[80%] mt-[1vh] rounded-3xl border mx-auto h-[100%]'>
            Viewing Posts!
            {posts.map((post, i) => (
                <Link to={`/dashboard/community/post/${post._id}`} key={i}>
                    <div className='border p-4' >
                        <h2 className='font-bold'>{post.title}<span className='font-light italic'> ({post.tag === 'None' ? '' : post.tag})</span></h2>
                        {post.author && post.author._id === authUser ? <p>You</p> : <p>{post.author.first} {post.author.last}</p>}
                        <p>{post.text}</p>
                        <div className='flex gap-[5px]'>
                            <button onClick={(evt) => toggleVote(evt, post, 'like')} className='border p-1' name='like'>
                                {post.likes.includes(authUser) ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                                <span className='px-1'>{post.likes.length}</span>
                            </button>
                            <button onClick={(evt) => toggleVote(evt, post, 'dislike')} className='border p-1' name='dislike'>
                                {post.dislikes.includes(authUser) ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                                <span className='px-1'>{post.dislikes.length}</span>
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
export default ViewPosts;