import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';


const LinkList = () => {
    const [links, setLinks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingLink, setEditingLink] = useState(null);

    // Array of image paths
    const images = [
        '/images/linkpic1.png',
        '/images/linkpic2.png',
        '/images/linkpic3.png',
        '/images/linkpic4.png',
        // Add more image paths as needed
    ];

    // Function to get a random image
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/urls');
                console.log('API Response:', response.data);
                const data = response.data.data;
                if (Array.isArray(data)) {
                    setLinks(data);
                } else {
                    console.error('Fetched data is not an array', response.data);
                }
            } catch (error) {
                console.error('Error fetching links', error);
            }
        };

        fetchLinks();
    }, []);

    console.log('Links state:', links);

    const filteredLinks = links.filter(link =>
        link.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (linkId) => {
        try {
            await axios.delete(`http://localhost:5000/api/urls/${linkId}`);
            setLinks(links.filter(link => link.url_id !== linkId));
        } catch (error) {
            console.error('Error deleting link', error);
        }
    };

    const handleEdit = (link) => {
        setEditingLink(link);
    };

    const handleSave = async (updatedLink) => {
        try {
            await axios.put(`http://localhost:5000/api/urls/${updatedLink.url_id}`, updatedLink);
            setLinks(links.map(link => (link.url_id === updatedLink.url_id ? updatedLink : link)));
            setEditingLink(null);
        } catch (error) {
            console.error('Error updating link', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingLink({
            ...editingLink,
            [name]: value,
        });
    };

    return (
        <div className='container flex items-center justify-center bg-gray-100'>
            <div className='w-3/5 p-4 h-screen m-4 rounded-lg bg-white shadow-md'>
                <div className="flex items-center mb-4">
                    <h1 className='text-2xl font-bold'>Your links</h1>
                </div>

                <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <ul className='mt-4'>
                    {filteredLinks.length > 0 ? (
                        filteredLinks.map((link) => (
                            <li key={link.url_id} className='mb-4 flex items-center'>
                                <img src={getRandomImage()} alt="Link thumbnail" className='w-16 h-16 rounded-lg mr-4' />
                                {editingLink && editingLink.url_id === link.url_id ? (
                                    <div>
                                        <input
                                            type="text"
                                            name="title"
                                            value={editingLink.title}
                                            onChange={handleChange}
                                            placeholder="Title"
                                            className="mt-4 px-4 py-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            name="description"
                                            value={editingLink.description}
                                            onChange={handleChange}
                                            placeholder="Description"
                                            className="mt-4 px-4 py-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            name="url"
                                            value={editingLink.url}
                                            onChange={handleChange}
                                            placeholder="URL"
                                            className="mt-4 px-4 py-2 border rounded"
                                        />
                                        <div className='flex justify-center space-x-4'>
                                            <button onClick={() => handleSave(editingLink)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Save</button>
                                            <button onClick={() => setEditingLink(null)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Cancel</button>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex-grow">
                                            <h2 className='text-xl font-semibold'>{link.title}</h2>
                                            <p>{link.description}</p>
                                            <p>URL: <a href={link.url} className='text-blue-500'>{link.url}</a></p>
                                        </div>
                                        <DropdownMenu
                                            onEdit={() => handleEdit(link)}
                                            onDelete={() => handleDelete(link.url_id)}
                                        />
                                    </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <li>No links available</li>
                    )}
                </ul>


                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"><Link to="/add-link" className="">Add New Link</Link></button>
            </div>

        </div>
    );
};

export default LinkList;
