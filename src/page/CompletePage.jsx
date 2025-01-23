import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as UserServices from "../services/UserServices";


function Complete() {
    const user = useSelector((state) => state.user.user);
    const order = useSelector((state) => state.order.orders);
    const note = useSelector((state) => state.order.note);

    console.log(`PaymentPage`, user, order, note);
    const total = order.reduce((sum, book) => sum + book.price * book.quantity, 0);

    const [detailUser, setDetailUser] = useState(null);

    const fetchData = async () => {
        const res = await UserServices.getDetailUser(user.user_id);
        if (res?.status === "OK") {
            setDetailUser(res?.data);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    console.log('Fetching data', detailUser);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Cột trái */}
            <div className="flex-[3] flex items-center justify-center bg-blue-50 min-h-screen">
                {/* Main Content */}
                <div className="main-content p-8 w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="section">
                        <div className="section-header flex items-center gap-6">
                            <svg
                                width="70"
                                height="70"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="#000"
                                strokeWidth="2"
                                className="hanging-icon checkmark"
                            >
                                <path
                                    className="checkmark_circle"
                                    d="M35 69c18.425 0 33-14.575 33-33S53.425 3 35 3 2 17.575 2 36s14.575 33 33 33z"
                                />
                                <path
                                    className="checkmark_check"
                                    d="M20 36.51l10.307 10.308L55.125 29"
                                />
                            </svg>
                            <div>
                                <h2 className="text-4xl font-bold text-gray-800">
                                    Đặt hàng thành công
                                </h2>
                                <p className="text-lg text-gray-600">Cám ơn bạn đã mua hàng!</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="section thank-you-checkout-info mt-10 bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin đơn hàng</h2>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Thông tin giao hàng
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {detailUser?.name}
                                <br />
                                {detailUser?.phone}
                                <br />
                                {detailUser?.address}
                            </p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Phương thức thanh toán
                            </h3>
                            <p className="text-lg text-gray-600">Chuyển khoản qua ngân hàng</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Cột phải */}
            <div className="flex-[2] flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    {/* Tiêu đề */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin đơn hàng</h2>

                    {/* Danh sách sản phẩm */}
                    <div className="space-y-6">
                        {order?.map((book, index) => (
                            <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-200">
                                {/* Hình ảnh sản phẩm */}
                                <div className="relative flex-shrink-0">
                                    <img
                                        className="w-24 h-24 object-cover rounded-md"
                                        alt={`Sách: ${book.name}`}
                                        src={book.avatar || "//via.placeholder.com/96"} // Placeholder nếu không có ảnh
                                    />
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                        x{book.quantity}
                                    </span>
                                </div>
                                {/* Thông tin sản phẩm */}
                                <div className="flex-grow">
                                    <p className="text-gray-800 font-semibold text-lg">
                                        {book.name}
                                    </p>
                                    <p className="text-gray-600 text-base">
                                        {book.price}₫
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>



                    {/* Mã giảm giá */}
                    <div className="mt-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="discount.code">
                            Mã giảm giá
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="discount.code"
                                className="flex-grow border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
                                placeholder="Nhập mã giảm giá"
                            />
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>

                    {/* Tổng cộng */}
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Tạm tính</span>
                            <span className="text-gray-800 font-medium">{total}₫</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Phí vận chuyển</span>
                            <span className="text-gray-800 font-medium">25,000₫</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span className="text-gray-800">Tổng cộng</span>
                            <span className="text-blue-600">{total + 25000}₫</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Complete;
