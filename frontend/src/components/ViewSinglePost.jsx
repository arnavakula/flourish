import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';

const ViewSinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const { authUser } = useAuth();
    const [trigger, setTrigger] = useState(false);
    const [comment, setComment] = useState('');
    const [showCommentButton, setShowCommentButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetch(`http://localhost:8000/post/${postId}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => setPost(data.post));
        }
        loadPosts();

    }, [trigger]);

    const toggleVote = async (evt, voteType) => {
        evt.preventDefault();
        evt.stopPropagation();

        const response = await axios.post(`http://localhost:8000/post/vote`, {
            'postId': post._id,
            'userId': authUser,
            voteType
        }, { withCredentials: true })

        setTrigger(prev => !prev);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(evt.target.comment.value)
        const response = await axios.post(`http://localhost:8000/comment`, {
            'postId': post._id,
            'userId': authUser,
            'text': evt.target.comment.value
        }, { withCredentials: true });

        console.log(response.data);

        setTrigger(prev => !prev);
    }


    return (
        <div className='border-2 border-green-200 w-[100%] flex flex-col'>
            <div className='border p-4 w-[100%] flex gap-[2px]'>
                {post && (
                    <>
                    <button onClick={() => navigate(-1)}className='h-min'>
                        <ArrowBackIosNewIcon fontSize='small'/>
                    </button>
                    <div>
                        <h2 className='font-bold'>{post.title}<span className='font-light italic'> ({post.tag === 'None' ? '' : post.tag})</span></h2>
                        {post.author && post.author._id === authUser ? <p><strong>You</strong></p> : 'hi'}
                        <p>{post.text}</p>
                        <div className='flex gap-[5px]'>
                            <button onClick={(evt) => toggleVote(evt, 'like')} className='border p-1' name='like'>
                                {post.likes.includes(authUser) ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                                <span className='px-1'>{post.likes.length}</span>
                            </button>
                            <button onClick={(evt) => toggleVote(evt, 'dislike')} className='border p-1' name='dislike'>
                                {post.dislikes.includes(authUser) ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                                <span className='px-1'>{post.dislikes.length}</span>
                            </button>
                        </div>
                    </div>
                    </>
                )}
            </div>

            <div className='relative w-[100%] p-3'>
                <div className='flex'>
                    <div className='relative flex-grow'>
                        <form onSubmit={handleSubmit}>
                            <input name='comment' onChange={(evt) => setComment(evt.target.value)} onFocus={() => setShowCommentButton(true)} className='w-full rounded-full border-2 pl-4 pr-20 py-2' placeholder='Write a comment...' />
                            {showCommentButton && (
                                <>
                                    <button
                                        disabled={comment === ''}
                                        className={`absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full px-2 py-1 ${comment !== '' ? 'bg-red-500 text-white' : 'bg-red-400 text-gray-200'}`}
                                    >
                                        Comment
                                    </button></>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <div>
                {post && post.comments.map((post, i) => (
                    <div key={i} className='border p-3'>
                        <h1>{post.text}</h1>
                        <p className='text-xs'>- {post.author.first} {post.author.last} | {post.date}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ViewSinglePost;