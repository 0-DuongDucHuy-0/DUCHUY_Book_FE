import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux';
import { clearOrderById, updateProductQuantity } from '../redux/slice/orderSlice';

function OrderPage() {
    const user = useSelector((state) => state.user.user);
    const order = useSelector((state) => state.order.orders);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [cart, setCart] = useState(order || []);
    const [totalAmount, setTotalAmount] = useState(0);
    const [note, setNote] = useState("");

    console.log(`OrderPage`, cart);

    // Tính tổng tiền
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, [cart]);

    // Cập nhật số lượng
    const handleQuantityChange = (id, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === id
                    ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
                    : item
            )
        );
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveItem = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== id));
        // viết thêm hàm xóa sản phẩm theo productId
        dispatch(clearOrderById(id));
    };

    // Chuyển hướng về trang sản phẩm
    const handleOrder = (e) => {
        e.preventDefault();
        navigate("/");
    };

    // Gửi dữ liệu form
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            note,
            cart,
            totalAmount,
        };
        console.log("Dữ liệu gửi đi:", formData);
        // cập nhật lại ở redux
        formData.cart.map((item) => {
            dispatch(updateProductQuantity({ productId: item.productId, quantity: item.quantity }));
        })
        // Xử lý gửi form lên server
    };

    return (
        <div className="bg-gray-100 flex flex-col min-h-screen font-sans">
            <Header />

            <ol className="breadcrumb breadcrumb-arrow hidden sm:flex container mx-auto px-4 py-2">
                <li>
                    <a href="/" className="text-black hover:underline">
                        Trang chủ
                    </a>
                </li>
                <li className="text-gray-400 px-2">/</li>
                <li>
                    <a href="/collections/tat-ca-san-pham" className="text-black hover:underline">
                        Giỏ hàng
                    </a>
                </li>
            </ol>

            <main className="flex-grow container mx-auto px-4 bg-white shadow-md mb-16">
                <section id="insCartPage" className="bg-white py-8">
                    <div className="container mx-auto">
                        <form className="cart" onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Giỏ Hàng</h1>
                            <div className="page-content">
                                <div className="cart_header_labels hidden-xs grid grid-cols-6 gap-6 text-gray-800 mb-4 border-t border-b pt-4 pb-4">
                                    <div>Sản phẩm</div>
                                    <div>Tên sản phẩm</div>
                                    <div className="pl-16">Giá</div>
                                    <div className="pl-16">Số Lượng</div>
                                    <div className="pl-16">Tổng</div>
                                    <div className="pl-16">Xóa</div>
                                </div>

                                <div className="ajax_content_cart">
                                    {cart.map((item) => (
                                        <div key={item.productId} className="list_product_cart grid grid-cols-6 gap-6 py-4 border-b border-gray-200">
                                            <div>
                                                <img className="w-16 h-16 object-cover rounded-md" src={item.avatar} alt={item.name} />
                                            </div>
                                            <div className="text-gray-800">{item.name}</div>
                                            <div className="text-center text-gray-700 pr-16">{item.price}đ</div>
                                            <div className="text-center pr-8">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    className="w-16 text-center border border-gray-300 rounded-md px-2"
                                                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                                />
                                            </div>
                                            <div className="text-center text-gray-700 pr-16">{item.price * item.quantity}đ</div>
                                            <div className="text-center pr-16">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(item.productId)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="list_button_cart grid grid-cols-2 gap-6 mt-8">
                                    <div>
                                        <textarea
                                            name="note"
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            placeholder="Chú Thích"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-lg text-gray-800">
                                            Tổng: <span className="text-2xl text-green-600">{totalAmount.toLocaleString()}₫</span>
                                        </p>
                                        <div className="mt-6 flex gap-4 justify-center">
                                            <button
                                                type="button"
                                                onClick={handleOrder}
                                                className="border-green-700 border bg-green-700 text-white px-4 py-2 rounded-full text-lg font-bold"
                                            >
                                                TIẾP TỤC MUA SẮM
                                            </button>
                                            <button
                                                type="submit"
                                                className="border-green-700 border bg-green-700 text-white px-4 py-2 rounded-full text-lg font-bold"
                                            >
                                                THANH TOÁN
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default OrderPage;
