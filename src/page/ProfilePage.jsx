import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as UserServices from "../services/UserServices";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProfilePage() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await UserServices.getDetailUser(user.user_id);
        if (res?.status === "OK") {
            setAddress(res?.data.address)
            setName(res?.data.name)
            setPhone(res?.data.phone)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await UserServices.updateUser(user?.user_id, {
                name,
                address,
                phone
            });

            if (response?.status === "OK") {
                setSuccess("Cập nhật thông tin thành công");
            }
        } catch (error) {
            setError(error?.response?.data?.message?.message || "Có lỗi xảy ra");
            // }
        };
    }

    return (
        <>
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cập nhật thông tin</h1>
                <form
                    onSubmit={handleUpdateProfile}
                    className="bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Cập nhật thông tin
                    </button>
                </form>

                <button
                    onClick={() => navigate("/")}
                    className="mt-4 w-full text-blue-600 underline text-sm"
                >
                    Quay lại
                </button>
            </div>

            <Footer />
        </>
    );
}

export default ProfilePage;
