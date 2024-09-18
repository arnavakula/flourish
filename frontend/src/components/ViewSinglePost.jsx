import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const capitalize = (s) => {
    return s.toString().charAt(0).toUpperCase() + s.toString().slice(1);
}

const ViewSinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const { authUser } = useAuth();
    const [trigger, setTrigger] = useState(false);
    const [comment, setComment] = useState('');
    const [showCommentButton, setShowCommentButton] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const tagMap = {
        'Advice': '#D4EDDA',
        'Question': '#D1ECF1',
        'Discussion': '#FFF3CD',
        'Help Needed': '#F8D7DA'
    }

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetch(`${apiUrl}/post/${postId}`, {
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

        const response = await axios.post(`${apiUrl}/post/vote`, {
            'postId': post._id,
            'userId': authUser,
            voteType
        }, { withCredentials: true })

        setTrigger(prev => !prev);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const response = await axios.post(`${apiUrl}/comment`, {
            'postId': post._id,
            'userId': authUser,
            'text': evt.target.comment.value
        }, { withCredentials: true });

        console.log(response.data);

        setComment('');
        setShowCommentButton(false);
        setTrigger(prev => !prev);
    }

    const deleteComment = async (commentId) => {
        console.log('deleting!', commentId);
        const response = await axios.patch(`${apiUrl}/comment`, {
            'postId': post._id,
            'commentId': commentId,
        }, { withCredentials: true });

        console.log('deleting!');

        setTrigger(prev => !prev);
    }

    return (
        <div className='w-[60%] h-[70vh] flex flex-col bg-white  m-4 overflow-y-auto border rounded-lg '>
            <div className=' p-4 w-[100%] flex gap-[2px]'>
                {post && (
                    <>
                    <div>
                    <h2 className='font-bold text-[1.75rem] flex items-center gap-[3px]'>
                                    <button onClick={() => navigate(-1)}className='h-min'>
                                        <ArrowBackIosNewIcon fontSize='small'/>
                                    </button>
                                        <span>{capitalize(post.title)}</span>
                                        <span style={{ backgroundColor: tagMap[post.tag] }} className='text-sm font-light mt-[1px] border border-gray-400 rounded-full px-3'>{post.tag}</span>
                     </h2>
                        <p>{post.text}</p>
                        <div className='flex gap-[5px]'>
                            <button onClick={(evt) => toggleVote(evt, 'like')} className=' p-1' name='like'>
                                {post.likes.includes(authUser) ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                                <span className='px-1'>{post.likes.length}</span>
                            </button>
                            <button onClick={(evt) => toggleVote(evt, 'dislike')} className=' p-1' name='dislike'>
                                {post.dislikes.includes(authUser) ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                                <span className='px-1'>{post.dislikes.length}</span>
                            </button>
                        </div>
                    </div>
                    </>
                )}
            </div>

            <div className='relative w-[100%] p-3 '>
                <div className='flex'>
                    <div className='relative flex-grow'>
                        <form onSubmit={handleSubmit}>
                            <input 
                                name='comment' 
                                value={comment}  // Bind input to comment state
                                onChange={(evt) => setComment(evt.target.value)} 
                                onFocus={() => setShowCommentButton(true)} 
                                className='w-full rounded-full border-2 pl-4 pr-20 py-2' 
                                placeholder='Write a comment...' 
                            />
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
                    <div key={i} className=' p-3'>
                        <div className='flex flex-row items-center gap-[10px]'>
                            <h1>{post.text}</h1>
                            {authUser == post.author._id && <button onClick={() => deleteComment(post._id)} className='text-red-800 font-bold'>&times;</button>}
                        </div>
                        <p className='text-xs'>- {capitalize(post.author.first)} {capitalize(post.author.last).substring(0, 1)}. | {formatDistanceToNow(new Date(post.date), { addSuffix: true })}</p>
                        
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ViewSinglePost;
