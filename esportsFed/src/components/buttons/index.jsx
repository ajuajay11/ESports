export default function index(props) {
  return (
     <>
     <button style={{cursor:"pointer"}} className="px-5 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md">{props.text}</button>
     </>
  )
}
 