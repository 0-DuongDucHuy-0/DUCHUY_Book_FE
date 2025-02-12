import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Home from "../page/HomePage";
import ChangePassword from "../page/ChangePassword";
import Collections from "../page/Collections";
import DetailProduct from "../page/DetailProduct";
import OrderPage from "../page/OrderPage";
import SearchPage from "../page/SearchPage";
import PaymentPage from "../page/PaymentPage";
import CompletePage from "../page/CompletePage";
import ProfilePage from "../page/ProfilePage";
import HomeAdminPage from "../page/HomeAdminPage";
import UserManagementPage from "../page/UserManagementPage";
import CreateProductPage from "../page/CreateProductPage";
import OrderManagementPage from "../page/OrderManagementPage";



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
        path: "/order",
        page: OrderPage,
        isPrivate: false,
    },
    {
        path: "/change-password",
        page: ChangePassword,
        isPrivate: true,
    },
    {
        path: "/search",
        page: SearchPage,
        isPrivate: true,
    },
    {
        path: "/profile",
        page: ProfilePage,
        isPrivate: true,
    },
    {
        path: "/payment",
        page: PaymentPage,
        isPrivate: true,
    },
    {
        path: "/payment/complete",
        page: CompletePage,
        isPrivate: true,
    },
    {
        path: "/admin/product-management",
        page: HomeAdminPage,
        isPrivate: true,
    },
    {
        path: "/admin/user-management",
        page: UserManagementPage,
        isPrivate: true,
    },
    {
        path: "/admin/product-management/create",
        page: CreateProductPage,
        isPrivate: true,
    },
    {
        path: "/admin/order-management",
        page: OrderManagementPage,
        isPrivate: true,
    },
];


