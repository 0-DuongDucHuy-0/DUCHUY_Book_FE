import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Home from "../page/HomePage";
import Profile from "../page/ChangePassword";
import Collections from "../page/Collections";
import DetailProduct from "../page/DetailProduct";

export const router = [
    {
        path: "/sign-in",
        page: SignIn,
        isPrivate: false,
        role: null, // Không cần vai trò
    },
    {
        path: "/sign-up",
        page: SignUp,
        isPrivate: false,
        role: null,
    },
    {
        path: "/",
        page: Home,
        isPrivate: false,
    },
    {
        path: "/collections",
        page: Collections,
        isPrivate: false,
    },
    {
        path: "/product/*",
        page: DetailProduct,
        isPrivate: false,
    },
    {
        path: "/profile",
        page: Profile,
        isPrivate: true,
    },
];


