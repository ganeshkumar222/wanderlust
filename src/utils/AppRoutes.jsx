import { AddPlaces } from "../components/AddPlaces";
import { AdminDashboard } from "../components/AdminDashboard";
import { AdminPlaces } from "../components/AdminPlaces";
import { Booking } from "../components/Booking";
import { ChangePassword } from "../components/ChangePassword";
import { Checkout } from "../components/Checkout";
import { EditPlaces } from "../components/EditPlaces";
import { ForgetPassword } from "../components/ForgetPassword";
import { Form } from "../components/Form";
import { Home } from "../components/Home";

import { Profile } from "../components/Profile";
import { Register } from "../components/Register";
import { Signin } from "../components/Signin";
import { UserDashboard } from "../components/UserDashboard";
import { UserPlaces } from "../components/UserPlaces";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import { UserProtectedRoute } from "./UserProtectedRoute";


const AppRoutes = [
    {
        path:"/",
        element:<Home></Home>
    },
    {
        path:"/signin",
        element:<Signin></Signin>
    },
    {
        path:"/register",
        element:<Register></Register>
    },
    {
        path:"/admin",
        element: <AdminProtectedRoute>
            <AdminDashboard></AdminDashboard>
        </AdminProtectedRoute>
    },
    {
        path:"/forgetPassword",
        element:<ForgetPassword></ForgetPassword>
    },
    {
        path:"/changepassword/:id/:string",
        element:<ChangePassword></ChangePassword>
    },
    {
        path:"/admin/users",
        element:<UserDashboard></UserDashboard>
    },
    {
        path:"/admin/places",
        element:<AddPlaces></AddPlaces>
    },
    {
        path:"/admin/viewplaces/:id",
        element:<AdminPlaces></AdminPlaces>
    },
    {
        path:"/admin/editplaces/:id",
        element:<EditPlaces></EditPlaces>
    },
    {
        path:"/user/viewplaces/:id",
        element:<UserProtectedRoute>
            <UserPlaces></UserPlaces>
        </UserProtectedRoute>
        
        
    },
    {
        path:"/user/Booking/:id",
        element:<Booking></Booking>
    },
    {
        path:"/user/payment",
        element:<Checkout></Checkout>
    },
    {
        path:"/profile",
        element:<Profile></Profile>
    },
    {
        path:"user/payments",
        element:<Form></Form>
    }

]

export default AppRoutes