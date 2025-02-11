import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from '../components/BookCard';
import * as ProductServices from "../services/ProductServices";
import * as OrderServices from "../services/OrderServices";
import * as RatingServices from "../services/RatingServices";
import * as ColabMLServices from "../services/ColabMLServices";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addProductToOrder } from '../redux/slice/orderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DetailProduct() {
    const user = useSelector((state) => state.user.user);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { id } = location.state || {}; // Lấy id từ state

    console.log(user);

    const [products, setProduct] = useState(null);
    const [listProducts, setListProduct] = useState(null);
    const [listImage, setListImage] = useState(null);
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [hasTransactions, setHasTransactions] = useState(false);

    const fetchData = async () => {
        const res = await ProductServices.getDetailProduct({ product_id: id });
        if (res?.status === "OK") {
            setProduct(res?.data[0]);
        }
        const dataRequest_ = await ProductServices.getAllImageById(id);
        if (dataRequest_?.status === "OK") {
            setListImage(dataRequest_.data);
        }
        const res1 = await ProductServices.getAllProducts();
        if (res1?.status === "OK") {
            setListProduct(res1?.data);
        }
        const res2 = await RatingServices.getRatingByProduct(id);
        if (res2?.status === "OK") {
            setComments(res2?.data);
        }
        const res3 = await OrderServices.GetAllTransactionsByUser({
            user_id: user?.user_id,
            product_id: id
        });
        console.log("check123", res3.data.length)
        if (res3?.status === "OK" && res3.data.length) {
            setHasTransactions(true);
        } else {
            setHasTransactions(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    console.log('Test', comments, user);

    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => setModalVisible(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const [activeTab, setActiveTab] = useState("description");

    const handleAddOrder = () => {
        const order = {
            productId: id,
            name: products?.name,
            avatar: products?.avatar,
            price: Number(products?.price) * (100 - Number(products?.sale)) / 100,
            quantity: quantity,
        }

        dispatch(addProductToOrder(order));
        console.log(order);

        toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme: "light",
            className: "bg-blue-500 text-white font-semibold border-2 border-green-500",
        });
    }

    const handlePostComment = async () => {
        if (newComment.trim()) {
            const checkTocix = await ColabMLServices.toxicity({ text: newComment.trim() });
            console.log("checkTocix", checkTocix.toxicity_result[0].score)
            if (Number(checkTocix.toxicity_result[0].score) > 0.9) {
                console.log("123456789")
                toast.error("Tin nhắn của bạn chứa nội dung không phù hợp", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "light",
                    className: "bg-red-500 text-white font-semibold border-2 border-red-400",
                });
                return;
            }
            const res = await RatingServices.createRating({
                product_id: id,
                user_id: user.user_id,
                content: newComment,
            });
            if (res?.status === "OK") {
                setProduct(res?.data[0]);
                setComments([...comments, { name: "Người dùng", content: newComment }]);
                setNewComment(""); // Reset ô nhập sau khi đăng
            }
        }
    }

    return (
        <div className="bg-gray-100 flex flex-col min-h-screen font-sans">
            {/* Header */}
            <Header />

            <ol className="breadcrumb breadcrumb-arrow hidden sm:flex container mx-auto px-4 py-2">
                <li>
                    <a href="/" target="_self" className="text-black hover:underline">
                        Trang chủ
                    </a>
                </li>
                <li className="active">
                    <span className="text-gray-400 px-2"> / </span> {/* Thêm padding ở đây */}
                </li>
                <li>
                    <a
                        href="/collections/tat-ca-san-pham"
                        target="_self"
                        className="text-black hover:underline"
                    >
                        TẤT CẢ SẢN PHẨM
                    </a>
                </li>
                <li className="active">
                    <span className="text-gray-400 px-2"> / </span> {/* Thêm padding ở đây */}
                </li>
                <li className="active">
                    <span className="text-gray-400"> Sách: {products?.name} </span>
                </li>
            </ol>


            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-12 bg-white shadow-md mb-16">
                <div className="flex gap-6">
                    {/* Product Preview */}
                    <div className="w-1/2 product-preview-box relative text-center">
                        {/* Product Main Image */}
                        <div className="product-image-wrapper bg-white mt-6">
                            <img
                                className="product-image-feature mx-auto p-4 w-3/4"  // Giảm kích thước ảnh chính
                                src={selectedImage || listImage?.[0]?.path} // Lấy ảnh đầu tiên từ listImage
                                alt={`Sách: ${products?.name}`}
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="thumb-img flex justify-center gap-4 mt-6">
                            {listImage?.map((img, index) => (
                                <img
                                    key={index}
                                    className={`product-thumb w-24 h-24 object-cover border cursor-pointer transform transition-all hover:scale-110 ${selectedImage === img?.path ? 'border-2 border-black' : '' // Thêm border đen khi ảnh được chọn
                                        }`}
                                    src={img?.path}  // Sử dụng img.path thay vì img
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => handleThumbnailClick(img?.path)} // Gọi hàm khi click vào ảnh thu nhỏ
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="w-1/2 information-entry mt-6">
                        <h1 className="text-3xl font-bold">Sách: {products?.name}</h1>

                        <p className="mt-2 pt-8 text-gray-600 font-semibold text-base leading-relaxed">
                            Tác giả: {products?.author}
                        </p>
                        <p className="mt-2 text-gray-600 font-semibold text-base leading-relaxed">
                            NXB: {products?.publisher}
                        </p>
                        <p className="mt-2 text-gray-600 font-semibold text-base leading-relaxed">
                            Kích thước: {products?.dimensions}
                        </p>
                        <p className="mt-2 text-gray-600 font-semibold text-base leading-relaxed">
                            Năm sản xuất: {products?.publication_year}
                        </p>
                        <p className="mt-2 text-gray-600 font-semibold text-base leading-relaxed">
                            Số trang: {products?.page_count}
                        </p>
                        <p className="mt-2 text-gray-600 font-semibold text-base leading-relaxed">
                            Khối lượng: {products?.weight} grams
                        </p>
                        <p className="mt-2 pb-8 text-gray-600 font-semibold text-base leading-relaxed">
                            Bìa: {products?.cover_type}
                        </p>


                        <div className="flex items-start">
                            {/* Phần bên trái: Giá sản phẩm và số lượng */}
                            <div className="w-1/3 border-r border-gray-300 pr-6">
                                {/* Giá sản phẩm */}
                                <div className="price mb-6">
                                    <div className="current text-4xl font-bold text-green-500">
                                        {products?.price * (100 - products?.sale) / 100}₫
                                    </div>
                                    {products?.sale > 0 && (
                                        <>
                                            <div className="prev text-gray-500 line-through text-2xl">
                                                {products?.price}₫
                                            </div>
                                            <div className="sale text-red-600 mt-2 text-3xl">
                                                Giảm {products?.sale}%
                                            </div>
                                        </>
                                    )}
                                </div>


                                {/* Số lượng */}
                                <div className="quantity flex items-center gap-2 mt-4">
                                    <button
                                        className="decrease border border-gray-300 px-3 py-1"
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-value text-lg">{quantity}</span>
                                    <button
                                        className="increase border border-gray-300 px-3 py-1"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Phần bên phải: Dịch vụ */}
                            <div className="w-1/2 pl-6">
                                <h3 className="text-lg font-semibold mb-2">Dịch vụ của chúng tôi</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="icon">🚚</span>
                                        Giao tận nhà trong 3 - 7 ngày làm việc.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="icon">⭐</span>
                                        Miễn phí giao hàng Toàn Quốc cho đơn hàng trên 300k.
                                    </li>
                                </ul>
                            </div>
                        </div>



                        <div className="p-4 pl-0 bg-white">
                            <button
                                onClick={handleAddOrder}
                                style={{ fontSize: '18px', width: '280px' }}
                                className="border-green-700 border bg-green-700 text-white px-4 py-2 rounded-full w-full mb-4 text-lg font-bold transition duration-300 ease-in-out hover:bg-white hover:border hover:border-green-700 hover:text-green-700"
                            >
                                THÊM VÀO GIỎ
                            </button>
                            <ToastContainer />

                            <div>
                                <h2 className="font-semibold mb-2">Dịch vụ & Khuyến mãi</h2>
                                <ul className="space-y-2">
                                    <li>📌 Sách Kĩ năng sống, Kinh doanh, Văn học, Mẹ và bé sẽ có sẵn bookmark bên trong sách</li>
                                    <li>🎁 Freeship cho đơn hàng từ 300K trở lên</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Modal */}
                {modalVisible && (
                    <div className="modal fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                        <div className="modal-content bg-white p-4">
                            <button
                                className="close absolute top-2 right-2 text-lg"
                                onClick={handleCloseModal}
                            >
                                ×
                            </button>
                            <div className="modal-body text-center">
                                <img
                                    className="mx-auto"
                                    src={listImage?.[0]?.path}  // Lấy ảnh đầu tiên từ listImage
                                    alt="Sách: ${products?.name}"
                                />
                                <h4 className="text-xl font-bold mt-4">
                                    Sách: {products?.name}
                                </h4>
                            </div>
                        </div>
                    </div>
                )}

            </main>
            <div className="container mx-auto px-0 mb-16 py-0">
                <div className="grid grid-cols-12 gap-4">
                    {/* Main Content */}
                    <div className="col-span-9 bg-white p-6 shadow-sm">
                        <div>
                            {/* Tabs */}
                            <div className="flex border-b">
                                <button
                                    onClick={() => setActiveTab("description")}
                                    className={`px-4 py-2 text-lg ${activeTab === "description" ? "border-b-2 border-green-500" : ""}`}
                                >
                                    MÔ TẢ
                                </button>
                                <button
                                    onClick={() => setActiveTab("comments")}
                                    className={`px-4 py-2 text-lg ${activeTab === "comments" ? "border-b-2 border-green-500" : ""}`}
                                >
                                    BÌNH LUẬN
                                </button>
                            </div>
                            {/* Tab Content */}
                            <div className="mt-4">
                                {activeTab === "description" && (
                                    <div className="text-center">
                                        <h1 className="text-2xl font-bold text-green-500">
                                            {products?.name}
                                        </h1>
                                        <p className="text-xl text-left pt-4">
                                            {products?.content}
                                        </p>
                                    </div>
                                )}
                                {activeTab === "comments" && (
                                    <div className="w-full h-screen p-4 bg-white">
                                        {/* Ô nhập bình luận */}
                                        {hasTransactions && (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Bình luận..."
                                                    className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <button
                                                    onClick={handlePostComment}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700"
                                                >
                                                    Đăng
                                                </button>
                                            </div>
                                        )}

                                        {!hasTransactions && (
                                            <p className="text-gray-500">Bạn cần mua sản phẩm này để có thể bình luận.</p>
                                        )}


                                        {/* Danh sách bình luận */}
                                        <div className="mt-4 space-y-4">
                                            {comments.map((comment, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                                                >
                                                    <p className="text-blue-500 font-semibold">{comment.name}</p>
                                                    <p className="text-gray-700">{comment.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="col-span-3 bg-white shadow-sm">
                        <aside>
                            {/* Sách mới phát hành */}
                            <h3 className="text-lg font-medium text-black bg-gray-300 border-b border-gray-300 pt-4 pb-4 mb-4 text-center">
                                SÁCH MỚI PHÁT HÀNH
                            </h3>
                            <section>
                                <div className="space-y-4">
                                    {listProducts?.map((book, index) => (
                                        <BookCard
                                            key={index}
                                            name={book.name}
                                            price={book.price}
                                            sale={book.sale}
                                            avatar={book.avatar}
                                            id={book.id}
                                        />
                                    ))}
                                    <a
                                        href="#"
                                        className="block text-red-600 text-center font-medium text-lg hover:underline hover:text-red-500 transition-colors duration-300 pb-4"
                                    >
                                        Xem thêm
                                    </a>


                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default DetailProduct;
