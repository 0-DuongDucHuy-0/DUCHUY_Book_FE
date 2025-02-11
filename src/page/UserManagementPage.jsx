import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AsideAmin from "../components/AsideAmin";
import * as UserServices from "../services/UserServices";

function UserManagementPage() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchData = async () => {
        const res = await UserServices.getAllUser();
        if (res?.status === "OK") {
            setRequests(res?.data || []);
        }
    };

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
                            <h1 className="text-2xl font-bold mb-6">Quản lý sản phẩm</h1>
                            <div className="bg-white rounded-lg shadow p-4">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-left text-gray-500">
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("id")}>
                                                Id {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("name")}>
                                                Tên {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("email")}>
                                                Email {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("publication_year")}>
                                                Số điện thoại {sortField === "publication_year" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("address")}>
                                                Địa chỉ {sortField === "address" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedRequests.length > 0 ? (
                                            sortedRequests.map((item, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="py-8 px-4">{item?.id}</td>
                                                    <td className="py-8 px-4">{item?.name}</td>
                                                    <td className="py-8 px-4">{item?.email}</td>
                                                    <td className="py-8 px-4">{item?.phone}</td>
                                                    <td className="py-8 px-4">{item?.address}</td>
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

export default UserManagementPage;
