import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from '../components/Silder';
import BookCard from '../components/BookCard';

function Collections() {
  const user = useSelector((state) => state.user.user);

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

  const books = [
    {
      name: "Sách A",
      price: 100000,
      sale: 20,
      avatar: "https://product.hstatic.net/1000237375/product/dk580019_02_cb9047f6afe44bed821b780218cbf839_large.jpg",
    },
    {
      name: "Sách B",
      price: 150000,
      sale: 30,
      avatar: "https://product.hstatic.net/1000237375/product/artboard_1_c0b4386529024bbe8844e43fefa950ab_large.png",
    },
    {
      name: "Sách C",
      price: 200000,
      sale: 10,
      avatar: "https://product.hstatic.net/1000237375/product/dk580019_02_cb9047f6afe44bed821b780218cbf839_large.jpg",
    },
  ];

  const handleCategory = (category) => {
    navigate(`/${category}`);
  }

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      {/* slider */}
      <Slider />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex gap-6">
        {/* Sidebar - Left Section */}
        <aside className="w-1/4 space-y-6 bg-gray-50 p-4 shadow-md">
          <div className="block left-module filter">
            <p className="title_block">
              Lọc sản phẩm
              <a href="javascript:void(0)" className="close-filter visible-xs">x</a>
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
            <h2 className="text-xl text-gray-800 text-left mb-4">
              <a href="" className="hover:text-blue-500">GIÁ TỐT MỖI NGÀY</a>
            </h2>

            <div className="flex flex-wrap gap-6">
              {books.map((book, index) => (
                <BookCard
                  key={index}
                  name={book.name}
                  price={book.price}
                  sale={book.sale}
                  avatar={book.avatar}
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

export default Collections;
