import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const capitalize = (s) => {
    return s.toString().charAt(0).toUpperCase() + s.toString().slice(1);
}

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null); // State to track the active popup menu
    const { authUser } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;

    const tagMap = {
        'Advice': '#D4EDDA',
        'Question': '#D1ECF1',
        'Discussion': '#FFF3CD',
        'Help Needed': '#F8D7DA'
    }

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetch(`${apiUrl}/post`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => setPosts(data.posts));
        }
        loadPosts();

    }, [trigger]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenu && !event.target.closest('.menu-container')) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeMenu]);

    const toggleVote = async (evt, post, voteType) => {
        evt.preventDefault();
        evt.stopPropagation();

        const response = await axios.post(`${apiUrl}/post/vote`, {
            'postId': post._id,
            'userId': authUser,
            voteType
        })

        setTrigger(prev => !prev);
    }

    const toggleMenu = (postId) => {
        setActiveMenu(activeMenu === postId ? null : postId);
    }

    const handleReport = (postId) => {
        alert(`Reported post!`);
        setActiveMenu(null);
    }

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`${apiUrl}/post/${postId}`);
        } catch(err) {
            console.log(err);
            console.log('could not delete post')
        }

        setActiveMenu(null);
        setTrigger(prev => !prev);
    }

    return (
        <>
            <div className='CENTER-CONTENT w-[60%] h-[100%] p-4 overflow-y-auto border-r-[1px] border-black'>
                <div className='p-3'>
                    {posts.map((post, i) => (
                        <div key={i} className='relative'>
                            <Link to={`/dashboard/community/post/${post._id}`}>
                                <div className='border p-4 mb-3 hover:bg-[#e7e7e7] rounded-xl bg-white'>
                                    {post.author &&
                                        <p className='text-sm font-light flex gap-[5px]'>
                                            {capitalize(post.author.first)} {capitalize(post.author.last).substring(0, 1)}.
                                            <span className='font-black'>&middot;</span>
                                            {formatDistanceToNow(new Date(post.date), { addSuffix: true })}

                                        </p>}
                                    <h2 className='font-bold text-[1.75rem] flex items-center gap-[10px]'>
                                        <span>{capitalize(post.title)}</span>
                                        <span style={{ backgroundColor: tagMap[post.tag] }} className='text-sm font-light mt-[1px] border border-gray-400 rounded-full px-3'>{post.tag}</span>
                                    </h2>
                                    <p>{post.text}</p>
                                    <div className='flex gap-[5px]'>
                                        <button onClick={(evt) => toggleVote(evt, post, 'like')} className=' p-1' name='like'>
                                            {post.likes.includes(authUser) ? <ThumbUpAltIcon className='' /> : <ThumbUpOffAltIcon />}
                                            <span className='px-1'>{post.likes.length}</span>
                                        </button>
                                        <button onClick={(evt) => toggleVote(evt, post, 'dislike')} className=' p-1' name='dislike'>
                                            {post.dislikes.includes(authUser) ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                                            <span className='px-1'>{post.dislikes.length}</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                            <div className='absolute top-[10px] right-[10px] menu-container'>
                                <button onClick={() => toggleMenu(post._id)}>
                                    <MoreVertIcon />
                                </button>
                                {activeMenu === post._id && (
                                    <div className='absolute right-0 bg-white border shadow-lg rounded-md mt-2 z-10'>
                                        <button onClick={() => handleReport(post._id)} className='block px-4 py-2 text-sm text-left hover:bg-gray-100'>Report</button>
                                        { authUser == post.author._id && <button onClick={() => handleDelete(post._id)} className='block px-4 py-2 text-sm text-left hover:bg-gray-100'>Delete</button>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-[28%] p-4 bg-[#f3f3f3]'>
                <div className='w-[100%] border bg-white rounded-lg h-full mt-[1vh] p-4'>
                    <h2 className='font-bold text-[1.75rem]'> Announcements</h2>
                </div>
            </div>
        </>
    )
}
export default ViewPosts;
