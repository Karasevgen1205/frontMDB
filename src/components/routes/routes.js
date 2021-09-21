import {Profile} from "../pages/Profile/Profile";
import {Users} from "../pages/Users/Users";
import {LoginRegister} from "../pages/LoginRegister/LoginRegister";

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
        Component: LoginRegister
    },
    {
        path: "/register",
        Component: LoginRegister
    }
];
