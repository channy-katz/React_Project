import './App.css';
import { Route, Routes } from 'react-router-dom';
import List from './features/product/List';
import Details from './features/product/Details';
import NavBar from './NavBar';
import SignUp from "./features/user/singUp";
import Login from './features/user/login';
import Home from './Home';
import SmallBasket from './features/order/smallBasket';
import AddProduct from './features/product/AddProduct'; 
import Payment from './features/order/payment';
import Footer from './Footer';
import Basket from './features/order/Basket';
import Update from '@mui/icons-material/Update';
import { userIn } from './features/user/userSlice';
import { useDispatch} from "react-redux";  
import ProtectedRouteForManager from './ProtectedRouteForManager';
import ProtectedRouteForUser from './ProtectedRouteForUser';

function App() {


let dispatch = useDispatch()
  let user=localStorage.getItem("currentUser");
  if(user){
    user=JSON.parse(user)
    dispatch(userIn(user))
  }
  
  return (

    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/list/:category' element={<List />}>
          <Route path=":id" element={<Details />} />         
          </Route>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="basket" element={<Basket />} />
          <Route path="/addProduct" element={<ProtectedRouteForManager><AddProduct /></ProtectedRouteForManager>} />
          <Route path="/payment" element={<ProtectedRouteForUser><Payment /></ProtectedRouteForUser>} />
          <Route path="/" element={<Home />} />
          {Basket.length > 0 && <SmallBasket />}
          <Route path="/Update" element={<ProtectedRouteForManager><Update /></ProtectedRouteForManager>} />

      </Routes>
      <Footer/>

    </div>
  );
}

export default App


