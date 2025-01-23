import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UserServices from "../services/UserServices";
import { useMutationHooks } from "../hooks/useMutationHooks";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/userSlice';
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";
import Header from "../components/Header";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Email và mật khẩu không được để trống!");
      return;
    }
    mutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  const mutation = useMutationHooks((data) => UserServices.signInUser(data));

  const { data, isPending, isSuccess } = mutation;

  useEffect(() => {
    const fetchDetails = async () => {
      if (isSuccess) {
        if (data?.message === "Email không hợp lệ") {
          alert("Email không hợp lệ!");
        }

        if (data?.message === "Sai mật khẩu") {
          alert("Sai mật khẩu!");
        }

        localStorage.setItem("access_token", data?.access_token);
        if (data?.access_token) {
          const decoded = jwtDecode(data?.access_token);
          const res = await UserServices.getDetailUser(decoded?.id);
          if (decoded?.id && res?.status === "OK") {
            dispatch(setUser({ user_id: decoded?.id, email: formData.email, name: res?.data.name, phone: res?.data.phone, address: res?.data.address }));
            navigate("/")
          }

        }
      }
    };

    fetchDetails(); // Gọi hàm async bên trong useEffect
  }, [isSuccess]);

  const handleSignUp = () => {
    navigate("/sign-up");
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="py-6 px-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Đăng nhập vào ShopEasy
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-600 font-medium">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition duration-200"
              >
                Đăng nhập
              </button>
            </form>
            <div className="flex justify-between items-center mt-6 text-sm">
              <span className="text-gray-600">
                Chưa có tài khoản?
              </span>
              <a
                onClick={handleSignUp}
                className="text-blue-600 font-medium hover:text-blue-500 hover:underline transition duration-200 cursor-pointer"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>

  );
}

export default SignIn;
