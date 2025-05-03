import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux';
import { clearOrderById, updateProductQuantity, updateNote } from '../redux/slice/orderSlice';
import * as OrderServices from "../services/OrderServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartPage() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);


    const fetchData = async () => {
        try {
            const res = await OrderServices.getAllOrdersByUser(user.user_id);
            if (res?.status === "OK") {
                const ordersWithProducts = await Promise.all(
                    res.data.map(async (order) => {
                        const productRes = await OrderServices.getAllProductByOrder(order.id);
                        return {
                            ...order,
                            products: productRes?.status === "OK" ? productRes.data : [],
                        };
                    })
                );
                setOrders(ordersWithProducts);
            }
        } catch (error) {
            console.error("Lỗi khi fetch đơn hàng:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(`OrderManagementPage`, orders);

    console.log(`OrderPage`, user);

    const handleConfirmReceived = async (orderId) => {
        console.log(`Xác nhận đã nhận hàng cho đơn hàng ${orderId}`);

        const resUpdate = await OrderServices.updateUser(orderId, {
            order_status_payment: 1,
            order_status_transport: 2,
        });

        if (resUpdate?.status === "OK") {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            order_status_payment: 1,
                            order_status_transport: 2,
                        }
                        : order
                )
            );
            toast.success(`Đơn hàng id:${orderId} đã được xác nhận là đã nhận!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                theme: "light",
                className: "bg-blue-500 text-white font-semibold border-2 border-green-500",
            });
        }
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
                    <a className="text-black hover:underline">
                        Đơn hàng
                    </a>
                </li>
            </ol>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Lịch sử đơn hàng</h1>

                {orders?.length > 0 ? (
                    <div className="space-y-6">
                        {[...orders].reverse().map((order) => (
                            <div key={order.id} className="border border-gray-300 rounded-lg shadow p-6 bg-white">
                                <div className="mb-4 flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-700">Mã đơn hàng: <span className="text-blue-600">{order.id}</span></h2>
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-medium text-gray-600 mb-2">Sản phẩm:</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        {order.products.map((product, index) => (
                                            <li key={index} className="text-gray-800">
                                                {product.name} <span className="text-gray-500">(x{product.quantity})</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                                    <div>
                                        <span className="font-medium">Trạng thái thanh toán:</span>{" "}
                                        <span className={order.order_status_payment == 1 ? "text-green-600" : "text-red-600"}>
                                            {order.order_status_payment == 1 ? "Đã thanh toán" : "Chưa thanh toán"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Trạng thái vận chuyển:</span>{" "}
                                        <span className={
                                            order.order_status_transport === 2
                                                ? "text-green-600"
                                                : order.order_status_transport == 1
                                                    ? "text-yellow-600"
                                                    : "text-gray-600"
                                        }>
                                            {order.order_status_transport == 0
                                                ? "Chưa vận chuyển"
                                                : order.order_status_transport == 1
                                                    ? "Đang vận chuyển"
                                                    : "Giao hàng thành công"}
                                        </span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="font-medium">Tổng tiền:</span>{" "}
                                        <span className="text-blue-600 font-semibold">
                                            {order.price?.toLocaleString() || 0}₫
                                        </span>
                                    </div>
                                </div>
                                {order.order_status_transport === 1 && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                                            onClick={() => handleConfirmReceived(order.id)}
                                        >
                                            Đã nhận hàng
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-lg text-center">Bạn chưa có đơn hàng nào.</p>
                )}
                <ToastContainer />
            </main>


            <Footer />
        </div>
    );
}

export default CartPage;
