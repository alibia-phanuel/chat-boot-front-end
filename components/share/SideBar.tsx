import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoHome, IoPerson, IoLogOut } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { AppDispatch, RootState } from "../../src/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../src/feature/authSlice";
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="w-64 max-md:w-full bg-white border-r border-[#E14848] h-full p-4 min-h-screen fixed z-20">
      <div className="md:hidden flex justify-between items-center max-md:border-b mb-4 py-4">
        <FaBarsStaggered />
        <div className="relative md:left-6 flex items-center gap-2 capitalize text-2xl md:hidden ">
          <Avatar className="border border-[#E14848]">
            <AvatarImage src="data:image/png;base64,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" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>alibia</div>
        </div>
      </div>
      <aside className="">
        {/* General Section */}
        <p className="text-gray-600 font-semibold mb-2 py-2  px-4">Général</p>
        <ul className="space-y-2">
          <li className="px-6 my-2">
            <NavLink
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-700 hover:text-[#E14848]"
            >
              <IoHome /> <span>Tableau de bord</span>
            </NavLink>
          </li>
        </ul>
        {/* General Action */}
        <p className="text-gray-600 font-semibold mb-2 py-2  px-4">Actions</p>
        <ul>
          <li className="px-6 my-2">
            <NavLink
              to="/products"
              className="flex items-center space-x-2 text-gray-700 hover:text-[#E14848]"
            >
              <FaBox /> <span>Produits</span>
            </NavLink>
          </li>

          <li className="px-6 my-2">
            <NavLink
              to="/questionsreponses"
              className="flex items-center space-x-2 text-gray-700 hover:text-[#E14848]"
            >
              <FaQuestionCircle /> <span>Questions/Réponses</span>
            </NavLink>
          </li>

          <li className="px-6 my-2">
            <NavLink
              to="/Stocks"
              className="flex items-center space-x-2 text-gray-700 hover:text-[#E14848]"
            >
              <IoStatsChart /> <span>Gestion des stocks</span>
            </NavLink>
          </li>
        </ul>
        {/* General message sections */}
        <p className="text-gray-600 font-semibold mb-2 py-2  px-4">Message</p>
        <ul>
          <li className="px-6 my-2">
            <NavLink
              to="/Chatboot"
              className="flex items-center space-x-2 text-gray-700 hover:text-[#E14848]"
            >
              <FaRobot />
              <span>Chatboot</span>
            </NavLink>
          </li>

          <li className="px-6 my-2">
            <NavLink
              to="/Message"
              className="flex items-center space-x-2 text-gray-700 hover:text-[#E14848]"
            >
              <IoNotifications />
              <span>Message interne</span>
            </NavLink>
          </li>
        </ul>
        {/* Admin Section (Visible Only to Admins) */}
        {user && user.role === "admin" && (
          <div className="mt-4">
            <p className="text-gray-600 font-semibold mb-2 py-2 px-4">
              Administrateur
            </p>
            <ul className="space-y-2">
              <li className="px-6 my-2">
                <NavLink
                  to="/users"
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#E14848]"
                >
                  <IoPerson /> <span>Utilisateurs</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Settings Section */}
        <p className="text-gray-600 font-semibold mt-4 mb-2 py-2 px-4">
          Paramètres
        </p>
        <ul>
          <li className="px-6 my-2">
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            >
              <IoLogOut /> <span>Déconnexion</span>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
