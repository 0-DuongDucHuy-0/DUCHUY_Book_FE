import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BookCard = ({ id, name, price, sale, avatar }) => {
    const navigate = useNavigate();

    const handleDetailProduct = (name, id) => {
        console.log('123', name, id);
        const nameProduct = name
            .toLowerCase() // Chuyển về chữ thường
            .normalize("NFD") // Chuẩn hóa chuỗi để tách dấu
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
            .replace(/đ/g, "d") // Chuyển "đ" thành "d"
            .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ ký tự đặc biệt
            .trim() // Loại bỏ khoảng trắng đầu và cuối chuỗi
            .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu gạch ngang

        navigate(`/product/${nameProduct}`, { state: { id: id } });
    };

    return (
        <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="rounded-lg overflow-hidden">
                {/* Product Image */}
                <div className="relative">
                    {/* Sale Badge */}
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{sale}%
                    </div>
                    <a onClick={() => handleDetailProduct(name, id)} title={name}>
                        <img
                            className="w-full h-40 object-contain rounded"
                            src={avatar}
                            alt={name}
                        />
                    </a>
                </div>

                {/* Product Details */}
                <div className="mt-3 text-center">
                    {/* Product Title */}
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 leading-tight hover:text-blue-500">
                        <a onClick={() => handleDetailProduct(name, id)} className="text-sm text-gray-800 mb-2 leading-tight font-normal hover:text-blue-500">
                            {name}
                        </a>
                    </h3>

                    {/* Product Price */}
                    <div className="text-center">
                        <span className="text-gray-500 text-xs line-through mr-2">{price}₫</span>
                        <span className="text-red-500 text-lg font-bold">{Math.round(price - (price * sale / 100))}₫</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
