// import { RootState } from "../../src/stores/store";
// import { useSelector } from "react-redux";
import Logo from "../../public/assets/logo.png";
export default function NavBar() {
  return (
    <div className="fixed flex z-10 justify-center items-center border-b border-[#E14848]  py-4 w-full bg-white max-md:hidden ">
      <div className=" flex items-center gap-2 capitalize text-2xl">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden  border-2 border-red-500 p-3">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
}
