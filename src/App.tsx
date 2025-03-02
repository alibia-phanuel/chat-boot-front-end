import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Action lier au utilisateurs
import Users from "../components/pages/Users";
import FormEditeUser from "../components/FormEditeUser";
import FormAddUser from "../components/FormAddUser";
// FIN: Action lier au utilisateurs----
// Action lier au produits
import Products from "../components/pages/Products";
import FormEditeProduct from "../components/FormEditeProduct";
import FormAddProduct from "../components/FormAddProduct";
// FIN: Action lier au produits----
import FormEditQuestion from "../components/FormEditQuestion";
import QuestionsReponses from "../components/pages/QuestionsReponses";
import FormAddQuestion from "../components/FormAddQuestion";
import Stocks from "../components/pages/Stocks";
import Login from "../components/pages/Login";
import Dashbord from "../components/pages/Dashbord";
import Chatboot from "../components/pages/Chatboot";
import Message from "../components/pages/Message";
import PostsFacebook from "../components/pages/PostsFacebook";
import ShopifyOrders from "../components/pages/ShopifyOrders";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Route lier au faqs*/}
          <Route path="/questionsreponses" element={<QuestionsReponses />} />
          <Route path="/questions-reponses/add" element={<FormAddQuestion />} />
          <Route
            path="/questions-reponses/edit/:id"
            element={<FormEditQuestion />}
          />
          {/* Route lier au utilisateurs */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<FormAddUser />} />
          <Route path="/users/edit/:id" element={<FormEditeUser />} />
          {/* Route lier au produits */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<FormAddProduct />} />
          <Route path="/products/edit/:id" element={<FormEditeProduct />} />
          {/* AUTRE */}
          <Route path="/facebookIdPost" element={<PostsFacebook />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/Stocks" element={<Stocks />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/ShopifyOrders" element={<ShopifyOrders />} />
          <Route path="/Chatboot" element={<Chatboot />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
