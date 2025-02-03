import { useState } from "react";
import { useSelector } from "react-redux";
import * as OrderServices from "../services/OrderServices";
import { useNavigate } from "react-router-dom";


function PaymentPage() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);
    const order = useSelector((state) => state.order.orders);
    const note = useSelector((state) => state.order.note);

    console.log(`PaymentPage`, user, order, note);
    const total = order.reduce((sum, book) => sum + book.price * book.quantity, 0);

    const [paymentMethod, setPaymentMethod] = useState("cod"); // Trạng thái để theo dõi phương thức thanh toán đã chọn

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value); // Cập nhật phương thức thanh toán khi người dùng thay đổi
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Button clicked:", total, order.length, user?.address, paymentMethod, note);
        const res = await OrderServices.createOrder(user.user_id, {
            price: total,
            total_quantity: order.length,
            note: note,
            address: user?.address,
            payment_method: paymentMethod,
        });
        if (res?.status === "OK") {
            const order_id = res.data.insertId;

            for (let item of order) {
                console.log("Transaction", order_id, item.productId, item.price, item.quantity, item.name, item.avatar);
                try {
                    const res2 = await OrderServices.createTransaction({
                        order_id: order_id,
                        product_id: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                        name: item.name,
                        avatar: item.avatar
                    });

                    if (res2.status === "OK") {
                        console.log("Transaction created successfully for product:", item.productId);
                    } else {
                        console.error("Failed to create transaction for product:", item.productId, "Status:", res2.status);
                    }
                    navigate("/payment/complete");
                } catch (error) {
                    console.error("Error creating transaction for product:", item.productId, "Error:", error);
                }
            }


        } else {
            console.error("Error creating order:", res?.message);
        }
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
                            <form>
                                <button
                                    type="button"
                                    onClick={handleSubmit} // Attach the handleSubmit function to onClick
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

export default PaymentPage;
