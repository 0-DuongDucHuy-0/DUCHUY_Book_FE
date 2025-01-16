import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from '../components/Silder';
import BookCard from '../components/BookCard';
import * as ProductServices from "../services/ProductServices";


function HomePage() {
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  console.log(user);

  const [products, setProduct] = useState(null);

  const fetchData = async () => {
    const res = await ProductServices.getAllProducts();
    if (res?.status === "OK") {
      setProduct(res?.data);
    }
    // const dataRequest_ = await UserServices.getAllRequestsStudent(user.user_id);
    // if (dataRequest_?.status === "OK") {
    //   setDataRequest(dataRequest_.data);
    //   console.log('Fetching dataRequest', dataRequest)
    // }
    // const dataFees_ = await UserServices.getAllFeesRoom(user.room_id);
    // if (dataFees_?.status === "OK") {
    //   setDataFees(dataFees_.data);
    //   console.log('Fetching dataFees', dataFees)
    // }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log('Fetching data', products);

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
          {/* Sách mới phát hành */}
          <h3 className="text-lg font-medium text-gray-900 bg-white border-b border-gray-300 pb-2 mb-4 text-center">
            SÁCH MỚI PHÁT HÀNH
          </h3>

          <section>
            <div className="space-y-4">
              {products?.map((book, index) => (
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
                className="block text-blue-600 text-center font-medium text-sm hover:underline hover:text-blue-500 transition-colors duration-300"
              >
                Xem thêm
              </a>
            </div>
          </section>
        </aside>




        {/* Main Content - Right Section */}
        <div className="flex-grow">
          {/* Top sách thay đổi cuộc đời */}
          <section className="bg-white shadow-md p-6">
            <h2 className="text-xl text-gray-800 text-left mb-4">
              <a href="" className="hover:text-blue-500">GIÁ TỐT MỖI NGÀY</a>
            </h2>

            <div className="flex flex-wrap gap-6">
              {products?.map((book, index) => (
                <BookCard
                  key={index}
                  name={book.name}
                  price={book.price}
                  sale={book.sale}
                  avatar={book.avatar}
                  id={book.id}
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

export default HomePage;
