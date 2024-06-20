import React, { useState } from 'react';
import "../App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLinkForm = () => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [Description, setDescription] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/urls', { title, url, Description });
            setTitle('');
            setUrl('');
            setDescription('');
            history.push('/');
        } catch (error) {
            console.error('Error adding link', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mt-48'>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="url"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
            />
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Add Link</button>
                </form>
    );
};

export default AddLinkForm;
