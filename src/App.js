
import './App.css';
import { Route, Routes} from "react-router-dom";
import Navbar from './components/navbar';
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/Signin";
import Products from "./pages/Products/index";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import AdminHome from "./pages/Admin/Home";
import AdminOrders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/Products";
import ProtectedAdmin from "./pages/Admin/ProtectedAdmin";
import ProductDetailAdmin from "./pages/Admin/ProductDetail";
import NewProductAdmin from "./pages/Admin/Products/new";



function App() {
  return (
    <div className="App">
      <Navbar />  

      <div id='content'>
      <Routes>
        <Route path='/' exact element={<Products />} />
        <Route path= "/product/:product_id" element={<ProductDetail /> } />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/basket" element={<Basket />} />
        <Route element={<ProtectedRoute />}>
				<Route path="/profile" element={<Profile />} />
					</Route>
         
          <Route element={<ProtectedAdmin />}>
						
						<Route index path="/admin" element={<AdminHome />} />
						<Route path="/admin/orders" element={<AdminOrders />} />
						<Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/new" element={<NewProductAdmin />} />
            <Route path="/admin/products/:product_id" element={<ProductDetailAdmin />} />
					</Route>



          <Route path="*" element={<Error404 />} />          
					
				
      </Routes>
      </div>
      
    </div>
  );
}



export default App;
