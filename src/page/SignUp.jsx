import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as UserServices from "../services/UserServices";
import { useMutationHooks } from "../hooks/useMutationHooks";
import {
  faHome,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";
import Header from "../components/Header";

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log('formData', formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    console.log('Form submitted:', formData);
    mutation.mutate(formData);
  };

  const mutation = useMutationHooks((data) => UserServices.signUpUser(data));

  const { data, isPending, isSuccess } = mutation;

  console.log("muta---", data, isPending, isSuccess);

  useEffect(() => {
    if (isSuccess) {
      alert('Bạn đã đăng ký thành công, hãy đăng nhập lại!');
      navigate("/sign-in");
    }
  }, [isSuccess]);

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="py-8 px-10">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Tạo tài khoản
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Tạo mật khẩu"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Số điện thoại</label>
                <input
                  type="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Nhập số điện thoại của bạn"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Địa chỉ</label>
                <input
                  type="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Nhập địa chỉ của bạn"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none transition duration-200"
              >
                Đăng ký
              </button>
            </form>
            <div className="flex justify-between items-center mt-6 text-sm">
              <span className="text-gray-600">
                Đã có tài khoản?
              </span>
              <a
                onClick={handleSignIn}
                className="text-blue-600 font-medium hover:text-blue-500 hover:underline transition duration-200 cursor-pointer"
              >
                Đăng nhập
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

export default SignUp;
