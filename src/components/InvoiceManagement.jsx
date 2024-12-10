import { useEffect, useState } from "react";
import * as UserServices from "../services/UserServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faList,
  faFileInvoiceDollar,
  faUser,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
function InvoiceManagement() {
  const [invoices, setInvoices] = useState(null);

  const fetchData = async () => {
    const res = await UserServices.getAllFees();
    if (res?.status === "OK") {
      setInvoices(res?.data);
    }
  };

  console.log('Fetching data11', invoices)

  useEffect(() => {
    fetchData();
  }, []);

  // const handleUpdateFee = () => { };

  return (
    <div>
      <div className="-mt-px">

        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center py-2">

            <button type="button" className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
              <span className="sr-only">Toggle Navigation</span>
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m8 9 3 3-3 3" /></svg>
            </button>

            <ol className="ms-3 flex items-center whitespace-nowrap">
              <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                Application Layout
                <svg className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </li>
              <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400" aria-current="page">
                Dashboard
              </li>
            </ol>

          </div>
        </div>

      </div>


      <div id="hs-application-sidebar" className="hs-overlay  [--auto-close:lg]
        hs-overlay-open:translate-x-0
        -translate-x-full transition-all duration-300 transform
        w-[260px] h-full
        hidden
        fixed inset-y-0 start-0 z-[60]
        bg-white border-e border-gray-200
        lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
        dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabIndex="-1" aria-label="Sidebar">
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">

            <a className="flex" href='/request-management'>
              <img src="https://placehold.co/50x50" alt="User avatar" className="rounded-full w-12 h-12 mr-4" />
              <div>
                <p className="text-gray-500">Ban quản lý</p>
                <p className="font-bold">Quản lý A</p>
              </div>
            </a>

          </div>


          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
              <ul className="flex flex-col space-y-1">
                <li>
                  <a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300" href="/request-management">
                    <FontAwesomeIcon icon={faTasks} className='mx-5' /> Quản lý yêu cầu
                  </a>
                </li>

                <li className="hs-accordion" id="users-accordion">
                  <a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300" href="/student-management">
                    <FontAwesomeIcon icon={faList} className='mx-5' /> Danh sách sinh viên
                  </a>
                </li>

                <li className="hs-accordion" id="account-accordion">
                  <a
                    className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg bg-gray-100 text-blue-600 dark:bg-neutral-900 dark:text-blue-400"
                    href="/invoice-management"
                  >
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="mx-5" />
                    Quản lý thanh toán
                  </a>
                </li>

                <li><a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-300" href="#">
                  <FontAwesomeIcon icon={faUser} className='mx-5' /> Tài khoản
                </a></li>
                <li><a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300" href="#">
                  <FontAwesomeIcon icon={faCog} className='mx-5' /> Cài đặt
                </a></li>
                <li>
                  <a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300" href="#">
                    <FontAwesomeIcon icon={faSignOutAlt} className='mx-5' /> Đăng xuất
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex h-full">
            <main className="w-full p-6">
              <h1 className="text-2xl font-bold mb-6">Quản lý thanh toán</h1>

              {/* Thanh tìm kiếm và sắp xếp */}
              <div className="flex mb-4 gap-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên sinh viên, phòng..."
                  className="border p-2 rounded w-1/2"
                />
                <select className="border p-2 rounded w-1/2">
                  <option>Sắp xếp theo: Tên sinh viên</option>
                  <option>Sắp xếp theo: Tổng tiền</option>
                  <option>Sắp xếp theo: Trạng thái</option>
                </select>
              </div>

              {/* Bảng hiển thị */}
              <div className="bg-white rounded-lg shadow p-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 px-4">Tòa nhà</th>
                      <th className="py-2 px-4">Phòng</th>
                      <th className="py-2 px-4">Tiền điện</th>
                      <th className="py-2 px-4">Tiền nước</th>
                      <th className="py-2 px-4">Tiền phòng</th>
                      <th className="py-2 px-4">Tháng</th>
                      <th className="py-2 px-4">Tổng tiền</th>
                      <th className="py-2 px-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices && invoices.length > 0 ? (
                      invoices.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-4 px-4">Tòa nhà {item?.room_number.slice(-1)}</td>
                          <td className="py-4 px-4">{item?.room_number}</td>
                          <td className="py-4 px-4">{item?.electricity_fee}</td>
                          <td className="py-4 px-4">{item?.water_fee}</td>
                          <td className="py-4 px-4">{item?.ktx_fee}</td>
                          <td className="py-4 px-4">{item?.created_at?.slice(5, 7)}</td>
                          <td className="py-4 px-4">{item?.total_fee}</td>
                          <td className="py-4 px-4">
                            <button
                              className={`px-2 py-1 rounded ${item?.status === 'Đã thanh toán'
                                ? 'bg-green-100 text-green-700'
                                : item?.status === 'Chưa thanh toán'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                                }`}
                            >
                              {item?.status}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-8 text-gray-500">
                          Không có dữ liệu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Nút tạo hóa đơn */}
              <div className="text-right mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
                  + Tạo hóa đơn
                </button>
              </div>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
}
export default InvoiceManagement;