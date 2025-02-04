import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from '../components/Silder';
import BookCard from '../components/BookCard';
import * as ProductServices from "../services/ProductServices";


function SearchPage() {
  const user = useSelector((state) => state.user.user);
  const query = useSelector((state) => state.search.searchQuery.searchQuery);

  const navigate = useNavigate();

  console.log(user);

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((item) => item !== brand);
      }
      return [...prev, brand];
    });
  };

  const [products, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const res = await ProductServices.getAllProducts();
      if (res?.status === "OK") {
        // Đảm bảo rằng `products` đã được cập nhật xong
        const searchProduct = await ProductServices.search({ products: res?.data, query: query });
        console.log("products", searchProduct, res?.data);
        setProduct(searchProduct);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

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
        <li className="active">
          <span className="text-gray-400"> Tìm kiếm: "Kết quả tìm kiếm "{query}" - DUC HUY BOOK" </span>
        </li>
      </ol>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex gap-6">
        {/* Sidebar - Left Section */}
        <aside className="w-1/4 space-y-6 bg-gray-50 p-4 shadow-md">
          <div className="block left-module filter">
            <p className="title_block">
              Lọc sản phẩm
            </p>
            <div className="block_content filter_xs">
              <div className="layered layered-filter-price">
                <div className="layered_subtitle">Nhà xuất bản</div>
                <div className="layered-content filter-brand">
                  <ul className="check-box-list space-y-2">
                    {['Thanh niên', 'NXB Thanh Niên', 'Văn học'].map((brand) => (
                      <li key={brand}>
                        <input
                          type="checkbox"
                          id={brand}
                          checked={selectedBrand.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="hidden"
                        />
                        <label htmlFor={brand} className="flex items-center space-x-2 cursor-pointer">
                          <span className="button w-4 h-4 inline-block border rounded-sm"></span>
                          <span>{brand}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="layered_subtitle">Giá</div>
                <div className="layered-content slider-range filter-price">
                  <ul className="check-box-list space-y-2">
                    {[
                      { label: 'Dưới 100,000₫', value: '100000' },
                      { label: '100,000₫ - 200,000₫', value: '200000' },
                      { label: '200,000₫ - 300,000₫', value: '300000' },
                      { label: 'Trên 400,000₫', value: '400000' }
                    ].map(({ label, value }) => (
                      <li key={label}>
                        <input
                          type="checkbox"
                          id={label}
                          checked={selectedPrice === value}
                          onChange={() => handlePriceChange(value)}
                          className="hidden"
                        />
                        <label htmlFor={label} className="flex items-center space-x-2 cursor-pointer">
                          <span className="button w-4 h-4 inline-block border rounded-sm"></span>
                          <span>{label}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </aside>





        {/* Main Content - Right Section */}
        <div className="flex-grow">
          {/* Top sách thay đổi cuộc đời */}
          <section className="bg-white shadow-md p-6">
            <div className="flex flex-wrap gap-6">
              {products?.map((book, index) => (
                <BookCard
                  key={index}
                  name={book.name}
                  price={book.price}
                  sale={book.sale}
                  avatar={book.avatar}
                  id={book.product_id}
                />
              ))}
            </div>
          </section>
        </div>
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}

export default SearchPage;
