import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState({});
  const { authUser } = useAuth();

  console.log(postInfo);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const data = {...postInfo, ['user']: authUser}
    const response = await axios.post('http://localhost:8000/post', data, { withCredentials: true });
  }

  const updatePostInfo = (evt) => {
    setPostInfo(currInfo => ({ ...currInfo, [evt.target.name]: evt.target.value }));
  };
  

  return (
    <div className="w-[80%] border mx-auto h-full flex flex-col items-center">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div>
          <label htmlFor='title' className="p-4">Title</label>
          <input
            id="title"
            name="title"
            required
            onChange={updatePostInfo}
          />
        </div>
        <div>
          <label htmlFor='tag' className='p-4'>Select Tag</label>
          <select
            name="tag"
            className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            onChange={updatePostInfo}
          >
            <option value="None">None</option>
            <option value="Advice">Advice</option>
            <option value="Question">Question</option>
            <option value="Discussion">Discussion</option>
            <option value="Help Needed">Help Needed</option>
          </select>
        </div>
        <div className='flex'>
          <label htmlFor='text' className='p-4'>Body</label>
          <textarea
            name='text'
            onChange={updatePostInfo}
          ></textarea>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost;