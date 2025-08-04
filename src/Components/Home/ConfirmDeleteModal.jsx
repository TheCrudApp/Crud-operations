import { deleteBook } from "../Redux/Bookslice";
import { useAppDispatch } from "../Redux/hooks";

export default function ConfirmDeleteModal(children) {
    const { setShowConfirmDelete, bookID } = children;
    const dispatch = useAppDispatch();
  return <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md px-6 py-5 rounded-xl shadow-2xl relative">

              {/* Close Button  -------------------------------[X]*/}
              <button
              onClick={()=>setShowConfirmDelete({show:false,bookID : null})}
                  className="cursor-pointer absolute top-4 size-8 flex justify-center items-center right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200 border border-gray-300 hover:bg-gray-100 rounded-md p-1">
                  <span className="text-lg font-semibold">&times;</span>
              </button>

              {/* Title ----------------------------------------- */}
              <h2 className="text-xl font-semibold text-center text-red-600 mb-3">
                  <span>Confirm Deletion</span>
              </h2>

              {/* Content --------------------------------------- */}
              <p className="text-center text-gray-700 mb-6">
                  <span>Are you sure you want to delete this Book? This action cannot be undone.</span>
              </p>

              {/* Action Buttons ------------------------------- */}
              <div className="flex justify-center gap-4">
                  <button 
                        onClick={() => setShowConfirmDelete({ show: false, bookID: null })}
                        className="cursor-pointer px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                      Cancel
                  </button>
                  <button 
                      onClick={() => { dispatch(deleteBook(bookID)); setShowConfirmDelete({ show: false, bookID: null }) }}
                        className="cursor-pointer px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                      Delete
                  </button>
              </div>
          </div>
      </div>
  </>
}
