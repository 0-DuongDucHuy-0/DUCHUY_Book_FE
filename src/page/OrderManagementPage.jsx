import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AsideAmin from "../components/AsideAmin";
import * as OrderServices from "../services/OrderServices";

function OrderManagementPage() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [statusUpdates, setStatusUpdates] = useState({});

    const fetchData = async () => {
        const res = await OrderServices.getAllOrders();
        if (res?.status === "OK") {
            setRequests(res?.data || []);
        }
    };

    console.log(`OrderManagementPage`, requests);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedRequests = [...requests].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (typeof valueA === "string") {
            return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    const handleStatusChange = (orderId, field, value) => {
        setStatusUpdates((prev) => ({
            ...prev,
            [orderId]: {
                ...prev[orderId],
                [field]: value,
            },
        }));
    };

    const handleSave = async (orderId) => {
        const update = statusUpdates[orderId] || {};
        const paymentStatus = update.order_status_payment ?? sortedRequests.find(item => item.id === orderId)?.order_status_payment;
        const transportStatus = update.order_status_transport ?? sortedRequests.find(item => item.id === orderId)?.order_status_transport;

        console.log("Đơn hàng ID:", orderId);
        console.log("Trạng thái thanh toán:", paymentStatus === "1" ? "Đã thanh toán" : "Chưa thanh toán");
        console.log("Trạng thái vận chuyển:",
            transportStatus === "0"
                ? "Chưa vận chuyển"
                : transportStatus === "1"
                    ? "Đang vận chuyển"
                    : "Giao hàng thành công"
        );

        // Gửi API cập nhật nếu muốn
        const resUpdate = await OrderServices.updateUser(orderId, {
            order_status_payment: paymentStatus,
            order_status_transport: transportStatus,
        });

        if (resUpdate?.status === "OK") {
            alert("Cập nhật đơn hàng thành công!");
        }
    };


    return (
        <div>
            <AsideAmin />
            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex h-full">
                        <main className="w-full p-6">
                            <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
                            <div className="bg-white rounded-lg shadow p-4">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-left text-gray-500">
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("id")}>
                                                Id {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("name")}>
                                                Tên khách hàng {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("address")}>
                                                Địa chỉ {sortField === "address" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("phone")}>
                                                Số điện thoại {sortField === "phone" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("price")}>
                                                Tổng đơn hàng {sortField === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("payment_method")}>
                                                Loại thanh toán {sortField === "payment_method" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4">Trạng thái thanh toán</th>
                                            <th className="py-2 px-4">Trạng thái vận chuyển</th>
                                            <th className="py-2 px-4 text-center">Lưu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedRequests.length > 0 ? (
                                            sortedRequests.map((item, index) => {
                                                const currentStatus = statusUpdates[item.id] || {};
                                                return (
                                                    <tr key={index} className="border-t">
                                                        <td className="py-8 px-4">{item.id}</td>
                                                        <td className="py-8 px-4">{item.name}</td>
                                                        <td className="py-8 px-4">{item.address}</td>
                                                        <td className="py-8 px-4">{item.phone}</td>
                                                        <td className="py-8 px-4">{item.price}</td>
                                                        <td className="py-8 px-4">
                                                            {item.payment_method === "cod"
                                                                ? "Thanh toán khi nhận hàng"
                                                                : "Chuyển khoản qua ngân hàng"}
                                                        </td>
                                                        <td className="py-8 px-4">
                                                            <select
                                                                className="border rounded px-2 py-1"
                                                                value={currentStatus.order_status_payment ?? item.order_status_payment}
                                                                onChange={(e) =>
                                                                    handleStatusChange(item.id, "order_status_payment", e.target.value)
                                                                }
                                                            //disabled={(currentStatus.order_status_payment ?? item.order_status_payment) === "1"}
                                                            >
                                                                <option value="0">Chưa thanh toán</option>
                                                                <option value="1">Đã thanh toán</option>
                                                            </select>
                                                        </td>
                                                        <td className="py-8 px-4">
                                                            <select
                                                                className="border rounded px-2 py-1"
                                                                value={currentStatus.order_status_transport ?? item.order_status_transport}
                                                                onChange={(e) =>
                                                                    handleStatusChange(item.id, "order_status_transport", e.target.value)
                                                                }
                                                            //disabled={(currentStatus.order_status_transport ?? item.order_status_transport) === "2"}
                                                            >
                                                                <option value="0">Chưa vận chuyển</option>
                                                                <option value="1">Đang vận chuyển</option>
                                                                <option value="2">Giao hàng thành công</option>
                                                            </select>
                                                        </td>
                                                        <td className="py-8 px-4 text-center">
                                                            <button
                                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                                onClick={() => handleSave(item.id)}
                                                            >
                                                                Lưu
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center py-8">
                                                    Không có đơn hàng nào.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderManagementPage;
