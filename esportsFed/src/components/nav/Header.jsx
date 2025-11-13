import { Link } from "react-router-dom";
import Button from "../buttons/index";
import { useSelector } from "react-redux";
export default function Header() {
  const user = useSelector((state) => state.auth);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {user.isAuth ? (
              <Link to="/login">
                <Button text="login" />
              </Link>
            ) : (
              <div className="text-white flex items-center gap-3">
                <div>{user.user.user.username}</div>
                 <img className="h-8" alt="Flowbite Logo" src="https://flowbite.com/docs/images/logo.svg"/> 
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
