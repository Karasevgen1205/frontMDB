import {Profile} from "../pages/Profile/Profile";
import {Users} from "../pages/Users/Users";
import {LoginRegister} from "../pages/LoginRegister/LoginRegister";
import {Dialogs} from "../pages/Dialogs/Dialogs";

export const authRoutes = [
    {
        path: "/profile",
        Component: Profile
    },
    {
        path: "/users",
        Component: Users
    },
    {
        path: "/dialogs",
        Component: Dialogs
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
