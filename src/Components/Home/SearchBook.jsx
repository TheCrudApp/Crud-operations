import { useFormik } from "formik"

export default function SearchBook({ setSearchBook }) {
    function getSearch(value){
        setSearchBook(value.search)
    }
    const formik = useFormik({
        initialValues: {
            search: ""
        },
        validate: getSearch
    });
  return <>
    <form onSubmit={formik.handleSubmit} className="md:w-1/3 w-full sm:w-2/3 mx-auto mb-3">
        <div className="relative w-full">
            <input 
            value={formik.values.search}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="search"
            type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="You can search for the book here ..." />
        </div>
    </form>
  </>
}
