import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/slice/userSlice';
import * as UserServices from "../services/UserServices";
function HomeStaff() {
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    console.log("user: ", user)
    console.log("user[0]", user[0])

    const handleSignOut = () => {
        // Xoá token khỏi localStorage hoặc sessionStorage
        localStorage.removeItem('access_token');  // Hoặc sessionStorage.removeItem('access_token') nếu bạn dùng sessionStorage
        // localStorage.removeItem('persist:root')
        // Đặt lại trạng thái người dùng (nếu bạn sử dụng state quản lý người dùng)
        dispatch(clearUser());

        // Điều hướng về trang chủ
        navigate('/sign-in');
    };

    const [requests, setRequests] = useState(null);

    const fetchData = async () => {
        const res = await UserServices.getAllRequests();
        console.log('Fetching data', res)
        if (res?.status === "OK") {
            setRequests(res?.data);
            console.log('Fetching data11', requests)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleStudentClick = () => { };

    return (
        <div className="bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white py-4">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div className="w-1/3">
                        <a>
                            <img
                                src="/src/assets/img/icon_logo/VNU_LOGO.png"
                                alt="VNU Logo"
                                className="w-40"
                            />
                        </a>
                    </div>
                    <div className="w-1/3 text-center">
                        <h1 className="text-2xl font-bold text-blue-700">
                            HỆ THỐNG QUẢN LÝ KÝ TÚC XÁ
                        </h1>
                    </div>
                    <div className="w-1/3 text-right">
                        <img
                            src="/src/assets/img/icon_logo/VNU_CSS_LOGO.png"
                            alt="VNU CSS Logo"
                            className="w-40 inline-block"
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex">
                <aside className="w-1/5 bg-white p-4">
                    <div className="flex items-center m-10">
                        <img src="https://placehold.co/50x50" alt="User avatar" className="rounded-full w-12 h-12 mr-4" />
                        <div>
                            <p className="text-gray-500">Ban quản lý</p>
                            <p className="font-bold">{user[0]?.full_name}</p>
                        </div>
                    </div>
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-home mr-3"></i> Trang chủ
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="flex items-center text-blue-500">
                                    <i className="fas fa-tasks mr-3"></i> Quản lý yêu cầu
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-list mr-3"></i> Danh sách sinh viên
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-chart-bar mr-3"></i> Quản lý thanh toán
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-user mr-3"></i> Tài khoản
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-cog mr-3"></i> Cài đặt
                                </a>
                            </li>
                            <li>
                                <a onClick={handleSignOut}
                                    className="flex items-center text-gray-700 hover:text-blue-500">
                                    <i className="fas fa-cog mr-3"></i> Đăng xuất
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="w-4/5 p-6">
                    <h1 className="text-2xl font-bold mb-6">Quản lý yêu cầu</h1>
                    <div className="flex mb-4">
                        <input type="text" placeholder="Tìm kiếm" className="border p-2 rounded mr-4 w-1/2" />
                        <select className="border p-2 rounded w-1/2">
                            <option>Sắp xếp theo : Tên sinh viên</option>
                        </select>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="py-2 px-4">Tên sinh viên</th>
                                    <th className="py-2 px-4">Loại yêu cầu</th>
                                    <th className="py-2 px-4">Lớp</th>
                                    <th className="py-2 px-4">Thời gian tạo</th>
                                    <th className="py-2 px-4">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests && requests.length > 0 ? (
                                    requests.map((item, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-8 px-4">
                                                <button onClick={handleStudentClick} className="text-blue-500 hover:underline">
                                                    {item?.full_name}
                                                </button>
                                            </td>
                                            <td className="py-8 px-4">{item?.request_type}</td>
                                            <td className="py-8 px-4">{item?.class}</td>
                                            <td className="py-8 px-4">{item?.created_at.split('T')[0]}</td>
                                            <td className="py-8 px-4">
                                                <button
                                                    className={`px-2 py-1 rounded ${item?.status === 'Đã xử lý'
                                                            ? 'bg-green-100 text-green-700'
                                                            : item?.status === 'Đang chờ xử lý'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : item?.status === 'Từ chối'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {item?.status}
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-gray-500">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">Tạo yêu cầu</button>
                </main>
            </div>
            {/* Footer */}
            <footer className="bg-blue-700 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Hệ Thống Quản Lý Ký Túc Xá</p>
                </div>
            </footer>
        </div>
    );
}
export default HomeStaff;