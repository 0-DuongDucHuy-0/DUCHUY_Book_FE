import { useState } from "react";

function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("cod"); // Trạng thái để theo dõi phương thức thanh toán đã chọn

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật phương thức thanh toán khi người dùng thay đổi
    };
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Cột trái */}
            <div className="flex-[3] flex items-center justify-center bg-blue-50">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="bg-gray-100 py-4 px-6 rounded-t-lg">
                        <ul className="flex gap-2 text-sm text-gray-600">
                            <li>
                                <a href="/cart" className="text-blue-600 hover:underline">
                                    Giỏ hàng
                                </a>
                            </li>
                            <li>/</li>
                            <li>
                                <a href="/checkouts/step1" className="text-blue-600 hover:underline">
                                    Thông tin giao hàng
                                </a>
                            </li>
                            <li>/</li>
                            <li className="font-semibold text-gray-800">Phương thức thanh toán</li>
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <main className="p-6">
                        {/* Shipping Method */}
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Phương thức vận chuyển</h2>
                            <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50">
                                <label htmlFor="shipping-home" className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        id="shipping-home"
                                        name="shipping_rate"
                                        className="form-radio"
                                        defaultChecked
                                    />
                                    <span className="text-gray-700">Giao hàng tận nơi</span>
                                </label>
                                <span className="font-semibold text-gray-700">25,000₫</span>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
                            <div className="space-y-4">
                                {/* COD */}
                                <div className="flex gap-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                                    <input
                                        type="radio"
                                        id="payment-cod"
                                        name="payment_method"
                                        value="cod"
                                        className="form-radio"
                                        onChange={handlePaymentChange}
                                        checked={paymentMethod === "cod"}
                                    />
                                    <label htmlFor="payment-cod" className="flex-grow">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src="../assets/img/cod.svg"
                                                alt="COD"
                                                className="w-12 h-12"
                                            />
                                            <div>
                                                <p className="text-gray-700 font-semibold">
                                                    Thanh toán khi giao hàng (COD)
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quý khách nhận hàng và thanh toán tiền mặt trực tiếp.
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {/* Bank Transfer */}
                                <div className="flex gap-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                                    <input
                                        type="radio"
                                        id="payment-bank"
                                        name="payment_method"
                                        value="bank"
                                        className="form-radio"
                                        onChange={handlePaymentChange}
                                        checked={paymentMethod === "bank"}
                                    />
                                    <label htmlFor="payment-bank" className="flex-grow">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src="../assets/img/other.svg"
                                                alt="Bank Transfer"
                                                className="w-12 h-12"
                                            />
                                            <div>
                                                <p className="text-gray-700 font-semibold">
                                                    Chuyển khoản qua ngân hàng
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Vui lòng chuyển khoản theo thông tin ngân hàng được cung cấp.
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Hiển thị thông báo khi chọn phương thức chuyển khoản ngân hàng */}
                            {paymentMethod === "bank" && (
                                <div className="mt-4 text-lg text-gray-700">
                                    Vui lòng chuyển khoản vào ngân hàng theo thông tin dưới đây:
                                    <ul className="list-none mt-2 pl-4 space-y-2">
                                        <li>Tên chủ tài khoản: DUONG DUC HUY</li>
                                        <li>Số TK: 555504062003, Ngân hàng MBBank</li>
                                    </ul>
                                </div>
                            )}
                        </section>

                        {/* Footer Buttons */}
                        <div className="mt-6 flex justify-between items-center">
                            <a
                                href="/cart"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Quay lại giỏ hàng
                            </a>
                            <form action="/checkouts/complete" method="post">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md"
                                >
                                    Hoàn tất đơn hàng
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>

            {/* Cột phải */}
            <div className="flex-[2] flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    {/* Tiêu đề */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin đơn hàng</h2>

                    {/* Danh sách sản phẩm */}
                    <div className="space-y-6">
                        {/* Sản phẩm 1 */}
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <img
                                    className="w-20 h-20 object-cover rounded-md"
                                    alt="Sách: 100 Truyện Ngụ Ngôn Song Ngữ Anh - Việt Hay Nhất"
                                    src="//product.hstatic.net/1000237375/product/bt_785bab2e9dcd4dd286820838c105113a_small.jpg"
                                />
                                <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                    x1
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-800 font-semibold text-lg">
                                    Sách: 100 Truyện Ngụ Ngôn Song Ngữ Anh - Việt Hay Nhất
                                </p>
                                <p className="text-gray-600 text-base">
                                    100,000₫
                                </p>
                            </div>
                        </div>

                        {/* Sản phẩm 2 */}
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <img
                                    className="w-20 h-20 object-cover rounded-md"
                                    alt="Sách: Chọn Câu Chuyện Của Bạn, Thay Đổi Cuộc Đời Bạn"
                                    src="//product.hstatic.net/1000237375/product/anh_web__11__46c2e9a383284bc885bfad1505c13d8d_small.png"
                                />
                                <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                    x1
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-800 font-semibold text-lg">
                                    Sách: Chọn Câu Chuyện Của Bạn, Thay Đổi Cuộc Đời Bạn
                                </p>
                                <p className="text-gray-600 text-base">
                                    109,600₫
                                </p>
                            </div>
                        </div>
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
                            <span className="text-gray-800 font-medium">209,600₫</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Phí vận chuyển</span>
                            <span className="text-gray-800 font-medium">25,000₫</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span className="text-gray-800">Tổng cộng</span>
                            <span className="text-blue-600">234,600₫</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PaymentPage;
