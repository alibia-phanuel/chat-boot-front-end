import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/pages/Login";
import Dashbord from "../components/pages/Dashbord";
import Products from "../components/pages/Products";
import QuestionsReponses from "../components/pages/QuestionsReponses";
import Stocks from "../components/pages/Stocks";
import Users from "../components/pages/Users";
import Chatboot from "../components/pages/Chatboot";
import Message from "../components/pages/Message";
import FormEditeUser from "../components/FormEditeUser";
import FormAddUser from "../components/FormAddUser";
import FormAddProduct from "../components/FormAddProduct";
import FormEditeProduct from "../components/FormEditeProduct";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashbord />}></Route>
          <Route path="/" element={<Login />}></Route>"from"
          <Route path="/products" element={<Products />}></Route>
          <Route path="/Stocks" element={<Stocks />}></Route>
          <Route
            path="/questionsreponses"
            element={<QuestionsReponses />}
          ></Route>
          <Route path="/Chatboot" element={<Chatboot />}></Route>
          <Route path="/Message" element={<Message />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/add" element={<FormAddUser />}></Route>
          <Route path="/users/edit/:id" element={<FormEditeUser />}></Route>
          <Route path="/products/add" element={<FormAddProduct />}></Route>
          <Route
            path="/products/edite/:id"
            element={<FormEditeProduct />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
