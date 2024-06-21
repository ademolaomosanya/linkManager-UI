import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLinkForm = () => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/urls', { title, url, description });
            setTitle('');
            setUrl('');
            setDescription('');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error adding link');
            }
            console.error('Error adding link', error);
        }
    };

    const isFormValid = () => {
        return title.trim() && url.trim() && description.trim();
    };

    return (
     <div className='bg-gray-200 mt-12'>
         <h2 className="text-xl font-semibold mb-4">Add a New Link</h2>
            <p className="text-gray-600 mb-4">Please fill out the form below to add a new link to the list.</p>

           <form onSubmit={handleSubmit} className='flex flex-col  items-center space-y-4'>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-1/2 px-4 py-2 border rounded"
            />
            <input
                type="url"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-1/2 px-4 py-2 border rounded"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-1/2 px-4 py-2 border rounded"
            />
            <button
                type="submit"
                disabled={!isFormValid()}
                className={`px-4 py-2 rounded ${isFormValid() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
            >
                Add Link
            </button>
            {errorMessage && <p className='mt-4 text-red-600'>{errorMessage}</p>}

        </form>
     </div>
    );
};

export default AddLinkForm;

