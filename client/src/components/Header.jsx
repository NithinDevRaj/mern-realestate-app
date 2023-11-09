import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-lime-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-lime-700">Estate </span>
            <span className="text-lime-500">Nexus</span>
          </h1>
        </Link>

        <ul className="flex gap-4 ">
          <Link to="/">
            <li className="hidden sm:inline text-lime-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/properties">
            <li className="hidden sm:inline text-lime-700 hover:underline">
              Property
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-lime-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
