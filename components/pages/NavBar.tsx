import logo from "../../public/assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../src/stores/store";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../../src/feature/authSlice";
export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const { user } = useSelector((state: RootState) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div>
          <NavLink to="/dashboard" className="flex items-center">
            <img src={logo} width="112" height="28" alt="logo" />
          </NavLink>
        </div>
        {/* Burger Menu (for mobile, optional) */}
        <button
          className="lg:hidden flex flex-col space-y-1 focus:outline-none"
          aria-label="menu"
        >
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={logout}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
}
