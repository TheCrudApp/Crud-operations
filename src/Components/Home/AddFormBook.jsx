import axios from 'axios'
import React, { useState } from 'react'
import { useAppDispatch } from '../Redux/hooks'
import { getbooks } from '../Redux/Bookslice';
export default function AddFormBook({onClose}) {
    const dispatch = useAppDispatch();
    const [formData, setformData] = useState({

        title:'',
        author:'',
        price:'',
        category:'',
    })

    const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://6734e6385995834c8a914b17.mockapi.io/api/v1/Books", {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      dispatch(getbooks());
      onClose();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  return  (
    <div 
    className="fixed inset-0  bg-black/30 backdrop-blur-md backdrop-brightness-75 flex justify-center items-center z-50 [backdrop-filter:blur(8px)]">
      <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 w-100 h-auto rounded-lg flex flex-col gap-4 shadow-2xl">
        <h2 className="text-2xl font-bold">Add New Book</h2>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="border p-2 rounded" />

        <div className="flex justify-between">
          <button type="submit" className="bg-green-600 hover:cursor-pointer text-white px-4 py-2 rounded">Add</button>
          <button type="button" onClick={onClose} className="bg-red-600 hover:cursor-pointer text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
