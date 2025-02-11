import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AsideAmin from "../components/AsideAmin";
import * as ProductServices from "../services/ProductServices";

function HomeAdminPage() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchData = async () => {
        const res = await ProductServices.getAllProducts();
        if (res?.status === "OK") {
            setRequests(res?.data || []);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateRoom = () => {
        navigate('/admin/product-management/create');
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
                                            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort("publication_year")}>
                                                Năm sản xuất {sortField === "publication_year" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedRequests.length > 0 ? (
                                            sortedRequests.map((item, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="py-8 px-4">{item?.id}</td>
                                                    <td className="py-8 px-4">{item?.name}</td>
                                                    <td className="py-8 px-4">{item?.publication_year}</td>
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
                            <div className="text-right mt-4">
                                <button onClick={handleCreateRoom} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
                                    + Thêm sản phẩm
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdminPage;
