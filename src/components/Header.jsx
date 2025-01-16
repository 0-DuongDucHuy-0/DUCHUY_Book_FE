import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slice/userSlice';
import { clearOrder } from '../redux/slice/orderSlice';

function Header() {
    const user = useSelector((state) => state.user.user);
    const order = useSelector((state) => state.order.orders);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const menuRef = useRef(null); // useRef để theo dõi menu
    const userRef = useRef(null); // useRef để theo dõi phần tử user name

    useEffect(() => {
        // Kiểm tra nếu có access_token trong localStorage
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token); // Nếu có token thì logged in, không thì logged out
    }, []);

    useEffect(() => {
        // Thêm sự kiện click vào document để đóng menu khi nhấn ra ngoài
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !userRef.current.contains(event.target)) {
                setIsMenuVisible(false);
            }
        };

        // Lắng nghe sự kiện click khi component mount
        document.addEventListener("click", handleClickOutside);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuVisible(prevState => !prevState);
    };

    const handleLogin = () => {
        navigate("/sign-in");
    };

    const handleRegister = () => {
        navigate("/sign-up");
    };

    const handleLogout = () => {
        // Xóa access_token và thực hiện đăng xuất
        localStorage.removeItem('access_token');
        dispatch(clearUser());
        dispatch(clearOrder());
        setIsLoggedIn(false);
        navigate("/sign-in");
    };

    const handleProfile = () => {
        console.log('Xem hồ sơ');
    };

    return (
        <header className="bg-white shadow">
            {/* Thanh trên cùng */}
            <div className="container mx-auto px-6 flex items-center justify-between py-4">
                {/* Logo */}
                <div className="flex flex-col items-center text-center">
                    <span className="text-green-600 font-bold text-3xl">
                        DucHuy<span className="text-gray-700">book</span>
                    </span>
                    <span className="text-lg text-gray-500 mt-1">Ươm mầm tri thức</span>
                </div>

                {/* Thanh tìm kiếm */}
                <div className="flex-1 mx-8">
                    <div className="flex items-center border border-green-600 rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
                        />
                        <button className="bg-green-600 px-6 py-2 text-white text-sm hover:bg-green-700 transition">
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Biểu tượng */}
                <div className="flex items-center space-x-8">
                    <div className="flex flex-col items-center text-gray-600 hover:text-green-600 cursor-pointer">
                        <FontAwesomeIcon icon={faTruck} className="text-2xl" />
                        <span className="text-sm mt-1">Tra cứu đơn hàng</span>
                    </div>
                    <div className="flex flex-col items-center text-gray-600 hover:text-green-600 cursor-pointer">
                        <div className="relative">
                            <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
                            <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{order?.length}</span>
                        </div>
                        <span className="text-sm mt-1">Giỏ hàng</span>
                    </div>
                    <div ref={userRef} className="relative flex flex-col items-center text-gray-600 hover:text-green-600 cursor-pointer">
                        <div onClick={toggleMenu} className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faUser} className="text-2xl" />
                            <span className="text-sm mt-1">
                                {user?.email.split('@')[0] || "Tài khoản"}
                            </span>
                        </div>


                        {/* Hiển thị menu khi isMenuVisible là true */}
                        {isMenuVisible && (
                            <div ref={menuRef} className="absolute mt-2 bg-white shadow-lg p-2 rounded-md border border-gray-200">
                                {isLoggedIn ? (
                                    <>
                                        <div onClick={handleProfile} className="cursor-pointer hover:text-green-600 py-1 px-2 min-w-[112px]">Profile</div>
                                        <div onClick={handleLogout} className="cursor-pointer hover:text-green-600 py-1 px-2 min-w-[112px]">Đăng xuất</div>
                                    </>
                                ) : (
                                    <>
                                        <div onClick={handleLogin} className="cursor-pointer hover:text-green-600 py-1 px-2 min-w-[112px]">
                                            Đăng nhập
                                        </div>
                                        <div onClick={handleRegister} className="cursor-pointer hover:text-green-600 py-1 px-2 min-w-[112px]">Đăng ký</div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Thanh dưới */}
            <div className="bg-gray-300">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between text-black-600">
                    {/* Bên trái */}
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center space-x-2 cursor-pointer hover:text-green-600 text-sm font-medium">
                            <span className="text-xl">☰</span>
                            <span className="text-sm">DANH MỤC SÁCH</span>
                        </span>
                        <span className="cursor-pointer hover:text-green-600 text-sm font-medium">Sản phẩm đã xem</span>
                    </div>

                    {/* Bên phải */}
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center space-x-2 text-sm font-medium">
                            <FontAwesomeIcon icon={faTruck} className="text-green-600 text-lg" />
                            <span className="text-sm">Ship COD Trên Toàn Quốc</span>
                        </span>
                        <span className="flex items-center space-x-2 text-sm font-medium">
                            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">FREE</span>
                            <span className="text-sm">Free Ship Đơn Hàng Trên 300k</span>
                        </span>
                        <span className="flex items-center space-x-2 text-sm font-medium">
                            <FontAwesomeIcon icon={faUser} className="text-green-600 text-lg" />
                            <span className="text-sm">0823 004 392 / 0357 920 941</span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
