import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        if(authUser) {
            const loadPlants = async () => {
                const response = await fetch(`http://localhost:8000/post`, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => setPosts(data.posts));
            }    
            loadPlants();
        }
    }, [authUser]);
    

    return (
        <div className='w-[80%] mt-[1vh] rounded-3xl border mx-auto h-[100%]'>
            Viewing Posts!
            {posts.map((post, i) => (
                <div key={i} className='border'>
                    <h2 className='font-bold'>{post.title}<span className='font-light italic'> ({post.tag === 'None' ? '' : post.tag})</span></h2>
                    {post.author && <p>{post.author.first} {post.author.last}</p>}
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    )
}

export default ViewPosts;