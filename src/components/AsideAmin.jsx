import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/slice/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboardList,
    faUsers,
    faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';


function AsideAmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isHover = "bg-gray-700"

    const handleListRequest = () => {
        navigate('/admin/product-management');
    }

    const handleListStudent = () => {
        navigate('/admin/user-management');
    }

    const handleSignOut = () => {
        // Xóa access_token và thực hiện đăng xuất
        localStorage.removeItem('access_token');
        dispatch(clearUser());
        navigate("/sign-in");
    };

    return (
        <div id="hs-application-sidebar" className="hs-overlay  [--auto-close:lg]
                hs-overlay-open:translate-x-0
                -translate-x-full transition-all duration-300 transform
                w-[260px] h-full
                hidden
                fixed inset-y-0 start-0 z-[60]
                bg-white border-e border-gray-200
                lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
                dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabIndex="-1" aria-label="Sidebar">
            <div className="relative flex flex-col h-full max-h-full bg-gray-900 text-white">
                <div className="relative flex flex-col h-full max-h-full bg-gray-900 text-white">
                    <div className="px-6 pt-4">
                        <a className="flex">
                            <img src="https://placehold.co/50x50" alt="User avatar" className="rounded-full w-12 h-12 mr-4" />
                            <div>
                                <p className="font-bold text-xl">ADMIN</p>
                            </div>
                        </a>
                    </div>

                    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600">
                        <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                            <ul className="flex flex-col space-y-1">
                                <li className="hs-accordion" id="account-accordion">
                                    <a
                                        onClick={handleListRequest}
                                        className="w-full flex items-center gap-x-4 py-3 px-3 text-lg rounded-lg text-white hover:bg-gray-600"
                                    >
                                        <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
                                        Danh sách sản phẩm
                                    </a>
                                </li>

                                <li onClick={handleListStudent} className="hs-accordion" id="users-accordion">
                                    <a
                                        className="w-full flex items-center gap-x-4 py-3 px-3 text-lg rounded-lg hover:bg-gray-600 text-white"
                                    >
                                        <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                                        Danh sách người dùng
                                    </a>
                                </li>

                                <li>
                                    <a
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-x-4 py-3 px-3 text-lg rounded-lg hover:bg-gray-600 text-white"
                                    >
                                        <FontAwesomeIcon icon={faDoorOpen} className="text-2xl" />
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsideAmin;
