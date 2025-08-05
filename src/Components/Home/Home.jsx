import { useEffect, useState } from "react";
import { format } from "date-fns";
import { LiaBookOpenSolid } from "react-icons/lia";
import { getbooks } from "../Redux/Bookslice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { ColorRing } from 'react-loader-spinner';
import AddFormBook from "./AddFormBook";
import { Flip, ToastContainer } from "react-toastify";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { viewBook } from "../Redux/Bookslice";
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const dispatch = useAppDispatch();
  const { data, isloading } = useAppSelector((state) => state.book);
  const [showForm, setshowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState({show:false, bookID:null });
  const navigate = useNavigate();
  

  const handelSubmitForm = ()=>{
    setshowForm(true);
  }
  useEffect(() => {
    dispatch(getbooks());
  }, [dispatch]);

  const handleView = (book) => {
      dispatch(viewBook(book.id));
      navigate('/details');
    };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <header className="bg-blue-950 h-14 flex justify-center items-center gap-3">
        <h1 className="text-3xl font-bold text-white hover:text-orange-600 hover:cursor-pointer">
          Book Store
        </h1>
        <LiaBookOpenSolid className="text-white text-4xl" />
      </header>

      {/* Content */}
      <main className="w-[90%] mx-auto overflow-x-auto">

            <button 
            onClick={handelSubmitForm}
            className="bg-blue-950 w-64 mb-3 cursor-pointer text-white hover:bg-orange-600 transition-all duration-300 font-bold px-6 py-2 rounded-xl">
              Add Book
            </button>
            {showForm && <AddFormBook onClose={()=>setshowForm(false)} />}
       
        {/* Loader or Table */}
        {isloading ? (
          <div className="flex justify-center items-center h-40">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        ) : (
          <table className="w-full text-center border border-gray-300">
            <thead>
              <tr className="bg-blue-950 h-12 uppercase text-white text-sm md:text-base xl:text-lg">
                <th className="px-3 py-2">Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Category</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data && data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 font-medium transition-all">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.author}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">
                    {item.createdAt
                      ? format(new Date(item.createdAt), "dd/MM/yyyy")
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    <div  onClick={()=>handleView(item)} className="flex justify-center gap-2 xl:gap-4">
                      <button className="px-3 py-1 cursor-pointer bg-cyan-600 text-white rounded hover:opacity-90">
                        View
                      </button>
                      <button className="px-3 py-1 cursor-pointer bg-blue-950 text-white rounded hover:opacity-90">
                        Edit
                      </button>
                      <button 
                        onClick={() =>{ setShowConfirmDelete({show: true, bookID: item.id})}}
                      className="px-3 py-1 cursor-pointer bg-red-700 text-white rounded hover:opacity-90">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      {showConfirmDelete.show && showConfirmDelete.bookID &&
      <ConfirmDeleteModal
        setShowConfirmDelete = {setShowConfirmDelete}
        bookID= {showConfirmDelete.bookID}
        /> 
      }
    </div>
    
  );
}

