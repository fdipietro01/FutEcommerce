import "./App.css";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import Navbar from "./components/Navbar/Nabar/";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./context/cartContext";
import Cart from "./components/Cart/Cart";
import DefaultFailView from "./components/DefaultFailView/DefaultFailView";
import CheckoutContainer from "./components/ChekoutContainer/CheckoutContainer";
import Feedback from "./components/Feedback/Feedback";
import LoginContextProvider from "./context/loginContext";
import LoginContainer from "./components/LoginContainer/loginContainer";
import LogOutContainer from "./components/LogOutContainer/LogOutContainer";
import ReloginContainer from "./components/ReloginContainer/ReloginContainer";
import Relogin from "./components/Relogin/Relogin";
import RegisterContainer from "./components/RegisterContainer/RegisterContainer";
import ProfileCardContainer from "./components/ProfileCardContainer/ProfileCardContainer";
import ProductManagerContainer from "./components/ProductManagerContainer/ProductManagerContainer";
import UserManagerContainer from "./components/UserManagerContainer/UserManagerContainer";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import MembrecyContainer from "./components/MembresyContainer/MembresyContainer";

function App() {
  return (
    <LoginContextProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="Parent">
            <Navbar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:id/" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/login" element={<LoginContainer />} />
              <Route path="/logOut" element={<LogOutContainer />} />
              <Route path="/register" element={<RegisterContainer />} />
              <Route path="/reloginPetittion" element={<ReloginContainer />} />
              <Route path="/relogin/" element={<Relogin />} />
              <Route
                path="/productManagerList"
                element={<ProductManagerContainer />}
              />
              <Route
                path="/userMaganerList"
                element={<UserManagerContainer />}
              />
              <Route path="/profile" element={<ProfileCardContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutContainer />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/chat" element={<ChatContainer />} />
              <Route
                path="/membresyContainer/"
                element={<MembrecyContainer />}
              />
              <Route path="*" element={<DefaultFailView />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </LoginContextProvider>
  );
}

export default App;
