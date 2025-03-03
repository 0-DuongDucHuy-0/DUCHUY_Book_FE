import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import * as UserServices from "../services/UserServices";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError("Xác nhận mật khẩu không đúng");
            return;
        }
        try {
            const response = await UserServices.changePassword(user?.user_id, {
                password: currentPassword,
                newPassword: newPassword
            });

            console.log(response);

            if (response?.status === "OK") {
                setSuccess("Cập nhật mật khẩu thành công");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                console.log("ok")
            }
        } catch (error) {
            console.log(error?.response.data.message.message, success, error);
            setError(error?.response.data.message.message)
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <>
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Change Password</h1>
                <form
                    onSubmit={handleChangePassword}
                    className="bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="currentPassword">
                            Mật khẩu cũ
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="newPassword">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        <FontAwesomeIcon icon={faKey} /> Cập nhật mật khẩu
                    </button>
                </form>

                <button
                    onClick={() => navigate("/")}
                    className="mt-4 w-full text-blue-600 underline text-sm"
                >
                    Go Back
                </button>
            </div>

            <Footer />
        </>
    );
}

export default ChangePassword;
