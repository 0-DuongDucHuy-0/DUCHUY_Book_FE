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

    const handleCreateRoom = () => {
        navigate('/admin/create-room');
    };

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
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("publication_year")}>
                                                Số điện thoại {sortField === "publication_year" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("price")}>
                                                Tổng đơn hàng {sortField === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("payment_method")}>
                                                Loại thanh toán {sortField === "payment_method" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("order_status_payment")}>
                                                Trạng thái thanh toán {sortField === "order_status_payment" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("order_status_transport")}>
                                                Trạng thái vận chuyển {sortField === "order_status_transport" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedRequests.length > 0 ? (
                                            sortedRequests.map((item, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="py-8 px-4">{item?.id}</td>
                                                    <td className="py-8 px-4">{item?.name}</td>
                                                    <td className="py-8 px-4">{item?.address}</td>
                                                    <td className="py-8 px-4">{item?.phone}</td>
                                                    <td className="py-8 px-4">{item?.price}</td>
                                                    <td className="py-8 px-4">
                                                        {item?.payment_method === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản qua ngân hàng"}
                                                    </td>
                                                    <td className="py-8 px-4">
                                                        {item?.order_status_payment === 0 ? "Chưa thanh toán" : "Đã thanh toán"}
                                                    </td>
                                                    <td className="py-8 px-4">
                                                        {item?.order_status_transport === 0
                                                            ? "Chưa vận chuyển"
                                                            : item?.order_status_transport === 1
                                                                ? "Đang vận chuyển"
                                                                : "Giao hàng thành công"}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center py-8 text-gray-500">
                                                    Không có dữ liệu
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
