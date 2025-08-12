import axios from "axios";
import { useFormik } from "formik"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getbooks } from "../Redux/Bookslice";
import { useState } from "react";




export default function EditFormBook({ setShowUpdateForm, data }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function updateBook(values){
    try{
      setLoading(true);
      await axios.put(`https://6734e6385995834c8a914b17.mockapi.io/api/v1/Books/${data.id}`,values);
      setShowUpdateForm({ show: false, data: null });
      toast.success('Book updated successfully');
      dispatch(getbooks());
      setLoading(false);
    } catch(error){
      toast.error(`Error updating book: ${error}`);
    }
  }

  const formik = useFormik({
    initialValues:{
      "title": data.title,
      "author": data.author,
      "price": data.price,
      "category": data.category
    },
    onSubmit: updateBook
  });

  return <>
    <div
      className="fixed inset-0  bg-black/30 backdrop-blur-md backdrop-brightness-75 flex justify-center items-center z-50 [backdrop-filter:blur(8px)]">
      <form
      onSubmit={formik.handleSubmit}
        className="bg-white p-6 w-100 h-auto rounded-lg flex flex-col gap-4 shadow-2xl">
        <h2 className="text-2xl font-bold">Update Book</h2>
        <input 
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="title"
          type="text" placeholder="Title"  required className="border p-2 rounded" />
        <input 
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}        
          name="author"
          type="text" placeholder="Author" required className="border p-2 rounded" />
        <input
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}        
        name="price"
        type="number" placeholder="Price"  required className="border p-2 rounded" />
        <input 
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}        
          name="category"
          type="text" placeholder="Category" required className="border p-2 rounded" />
        <div className="flex justify-between">
          <button disabled={loading} type="submit" className={`${loading ? 'bg-green-800' :'bg-green-600 hover:cursor-pointer'} text-white px-4 py-2 rounded`} >Update Data</button>
          <button onClick={() => setShowUpdateForm({ show: false, data: null })} type="button" className="bg-red-600 hover:cursor-pointer text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </>
}
