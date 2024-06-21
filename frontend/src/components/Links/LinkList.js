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

    useEffect(() => {
      

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

    const handleSave = async () => {
        try {
            if (!editingLink || !editingLink.url_id) {
                throw new Error('Invalid link object or missing URL ID');
            }

            const payload = {
                url_id: editingLink.url_id,
                title: editingLink.title,
                description: editingLink.description,
                newUrl: editingLink.url
            };

            await axios.put(`http://localhost:5000/api/urls/${editingLink.url_id}`, payload);
            setEditingLink(null);
            fetchLinks(); // Refresh all links
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

    const isSaveDisabled = () => {
        const originalLink = links.find(link => link.url_id === editingLink.url_id);
        return JSON.stringify(originalLink) === JSON.stringify(editingLink);
    };

    return (
        <div className='container flex items-center justify-center bg-gray-200   py-8 px-4'>
        <div className='w-full md:w-3/5 p-4 rounded-lg bg-white shadow-md'>
          <div className='flex items-center mb-4'>
            <h1 className='text-2xl font-bold'>Your links</h1>
          </div>
  
          <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  
          <ul className='mt-4'>
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <li key={link.url_id} className='mb-4 flex flex-col md:flex-row items-center'>
                  <img
                    src={getRandomImage()}
                    alt='Link thumbnail'
                    className='w-16 h-16 rounded-lg mr-4 mb-4 md:mb-0'
                  />
                  {editingLink && editingLink.url_id === link.url_id ? (
                    <div className='w-full'>
                      <input
                        type='text'
                        name='title'
                        value={editingLink.title}
                        onChange={handleChange}
                        placeholder='Title'
                        className='mt-4 px-4 py-2 border rounded w-full'
                      />
                      <input
                        type='text'
                        name='description'
                        value={editingLink.description}
                        onChange={handleChange}
                        placeholder='Description'
                        className='mt-4 px-4 py-2 border rounded w-full'
                      />
                      <input
                        type='text'
                        name='url'
                        value={editingLink.url}
                        onChange={handleChange}
                        placeholder='URL'
                        className='mt-4 px-4 py-2 border rounded w-full'
                      />
                      <div className='flex justify-center space-x-4 mt-4'>
                        <button
                          onClick={handleSave}
                          className={`px-4 py-2 ${
                            isSaveDisabled() ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                          } text-white rounded`}
                          disabled={isSaveDisabled()}
                        >
                          Save
                        </button>
                        <button onClick={() => setEditingLink(null)} className='px-4 py-2 bg-red-600 text-white rounded'>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col md:flex-row justify-between items-center w-full'>
                      <div className='flex-grow'>
                        <h2 className='text-xl font-semibold'>{link.title}</h2>
                        <p>{link.description}</p>
                        <p>
                          URL:{' '}
                          <a
                            href={link.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500'
                          >
                            Click here
                          </a>
                        </p>
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
  
          <button className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'>
            <Link to='/add-link' className=''>
              Add New Link
            </Link>
          </button>
        </div>
      </div>
    );
};

export default LinkList;
