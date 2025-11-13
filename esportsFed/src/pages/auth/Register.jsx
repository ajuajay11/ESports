import axios from "axios";
import Button from "../../components/buttons";
import { useState } from "react";
export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    age: 0,
    email: "",
    password: "",
    phone: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user/register",form);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message || error.message || "Registration failed");
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 p-8 ">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-300 p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-md mx-auto" >
          {/* Firstname */}
          <div>
            <label className="block text-sm font-medium">Firstname</label>
            <input
              type="text"
              name="firstname"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5"
            />
          </div>

          {/* Lastname */}
          <div>
            <label className="block text-sm font-medium">Lastname</label>
            <input
              type="text"
              name="lastname"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium">
              Username (optional)
            </label>
            <input
              type="text"
              name="username"
              placeholder="Leave empty for auto-generated"
              onChange={handleChange}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5"
            />
          </div>

          {/* Submit Button */}
           <Button text="Register"/>
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
