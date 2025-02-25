import { useSelector } from "react-redux";
import { RootState } from "../src/stores/store";

export default function Welcome() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <h2 className="text-xl text-gray-600">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
    </div>
  );
}
