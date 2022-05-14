import './App.css'
import 'antd/dist/antd.css'
import { Button } from 'antd';
import HomePage from './pages/HomePage'
import CartPage from './pages/cartPage'
import Item from './pages/Item'
import Bills from './pages/Bills'
import Customers from './pages/Customers'
import Register from './pages/Register'
import{BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login';

function App(){
    return <div className="App">

    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
            <Route path="/items" element={<ProtectedRoute><Item/></ProtectedRoute>}/>
            <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
            <Route path="/bills" element={<ProtectedRoute><Bills/></ProtectedRoute>}/>
            <Route path="/customers" element={<ProtectedRoute><Customers/></ProtectedRoute>}/>

            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Login/>}/>



        </Routes>
    </BrowserRouter>


    </div>

}

export default App

export function ProtectedRoute({children}){
    if(localStorage.getItem('pos-user')){
        console.log(localStorage.getItem('pos-user'))
        return children

    }else{
        return <Navigate to="/login"/>
    }
}
