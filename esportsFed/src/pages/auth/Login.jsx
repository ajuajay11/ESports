import axios from "axios";
import {useState} from "react";
import { useDispatch  } from "react-redux";
import { setUser, setAuth } from "../../store/authSlice"; 
 export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const submitForm =async(e)=>{
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/api/user/login", form);
    console.log(res);
    dispatch(setUser(res.data))
    dispatch(setAuth(true))
  } catch (error) {
    console.log(error);
    alert(error.response.data.message)
  }
}

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 p-8 ">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-300 p-8 rounded-lg">
        <form onSubmit={submitForm} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium ">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium ">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password" onChange={handleChange}
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?
          <a
            href="#"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
