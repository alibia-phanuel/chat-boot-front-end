import { NavLink, useNavigate } from "react-router-dom";
import { IoHome, IoPricetag, IoPerson, IoLogOut } from "react-icons/io5";
import { AppDispatch, RootState } from "../src/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../src/feature/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="w-64 bg-white shadow-md h-full p-4">
      <aside>
        {/* General Section */}
        <p className="text-gray-600 font-semibold mb-2">General</p>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <IoHome /> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <IoPricetag /> <span>Products</span>
            </NavLink>
          </li>
        </ul>

        {/* Admin Section (Visible Only to Admins) */}
        {user && user.role === "admin" && (
          <div className="mt-4">
            <p className="text-gray-600 font-semibold mb-2">Admin</p>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/users"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <IoPerson /> <span>Users</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Settings Section */}
        <p className="text-gray-600 font-semibold mt-4 mb-2">Settings</p>
        <ul>
          <li>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            >
              <IoLogOut /> <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
