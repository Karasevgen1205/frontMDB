import {Profile} from "../pages/Profile/Profile";
import {Users} from "../pages/Users/Users";
import {Login} from "../pages/Login/Login";
import {Register} from "../pages/Register/Register";

export const authRoutes = [
    {
        path: "/profile",
        Component: Profile
    },
    {
        path: "/users",
        Component: Users
    }
];

export const publicRoutes = [
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    }
];
