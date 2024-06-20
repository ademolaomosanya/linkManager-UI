import React, { useState, useEffect, useRef } from 'react';
import ThreeDotIcon from './ThreeDotIcon';

const DropdownMenu = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button onClick={toggleMenu} className="focus:outline-none">
                <ThreeDotIcon />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <button
                        onClick={() => { onEdit(); setIsOpen(false); }}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => { onDelete(); setIsOpen(false); }}
                        className="block w-full px-4 py-2 text-left text-red-700 hover:bg-gray-100"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
