import { useEffect, useState } from "react";
import { Bill } from "./dataType";
import { fetchBillsData } from "./apis/fetchBillsData";
import ViewBill from "./popups/ViewBill";
import DeleteBill from "./popups/DeleteBill";
import AddEditBill from "./popups/AddEditBill";
import Pagination from "./common/Pagination";

function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [billId, setBillId] = useState<string>('');
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isRecordsChanged, setIsRecordsChanged] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchFiled, setSearchFiled] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const fetchBills = async () => {
    try {
      const response = await fetchBillsData(
        '',
        currentPage,
        perPage,
        searchFiled,
        search
      );

      if (response.data) {
        setBills(response.data.data);
        setTotalPages(response.data.pages);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsRecordsChanged(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [isRecordsChanged, currentPage, perPage, searchFiled, search]);


  const handleRecordsChangedToggle = () => {
    setIsRecordsChanged(!isRecordsChanged);
  };

  const handleAddEditModalToggle = (id: string = '') => {
    setBillId(id);
    setIsAddEditModalOpen(!isAddEditModalOpen);
  };

  const handleViewModalToggle = (id: string = '') => {
    setBillId(id);
    setIsViewModalOpen(!isViewModalOpen);
  };

  const handleDeleteModalToggle = (id: string = '') => {
    setBillId(id);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const resetSearch = () => {
    setSearchFiled("");
    setSearch("");
  };
  return (
    <>
      <main>
        {/* Header section start */}
        <section className="flex flex-row justify-between p-2 box-border border-b-2 border-blue-950">
          <div className="w-36">
            <img className="h-36" src="/assets/hosj_logo.png" alt="" />
          </div>
          <div className="text-center">
            <div className="pt-5 text-4xl text-blue-950 font-bold">
              HARI OM SUDDHA JAL
            </div>
            <div className="p-1 mb-2 text-3xl text-blue-950 font-bold">
              Water Supplier
            </div>
            <div className="p-1 text-2xl text-blue-950 font-semibold box-border border-2 border-blue-950 w-fit m-auto">
              Suppliers of Drinking Water
            </div>
          </div>
          <div className="text-lg text-end text-blue-950 font-semibold">
            <p>Mo.: 97122 04688</p>
            <p>78741 59969</p>
          </div>
        </section>
        {/* Header section end */}

        {/* Body Section Start */}
        <section className="container mx-auto p-4">
          <div className="flex justify-between pb-4">
            <div className="flex items-center gap-2 w-1/3">
              <select
                className="border rounded p-1 w-32 h-10"
                value={searchFiled}
                onChange={(e) => setSearchFiled(e.target.value)}
              >
                <option value="">Select Field</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="bill_no">Bill No</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                className="border rounded p-1 h-10 w-96"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="button"
                className="w-10 p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => resetSearch()}
              >
                <svg
                  viewBox="0 0 1920 1920"
                  className="stroke-2 stroke-white fill-white w-6 mr-2"
                >
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button
              type="button"
              className="flex px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold"
              onClick={() => handleAddEditModalToggle()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-2 stroke-white w-6 mr-2"
              >
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
              <span>Add Bill</span>
            </button>
          </div>
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="p-2 w-20 border-r-2 border-2 border-blue-950">
                  Bill No.
                </th>
                <th className="p-2 w-20 border-r-2 border-2 border-blue-950">
                  Date
                </th>
                <th className="p-2 border-r-2 border-2 border-blue-950">
                  Name
                </th>
                <th className="p-2 w-20 border-r-2 border-2 border-blue-950">
                  Total
                </th>
                <th className="p-2 w-36 border-2 border-blue-950">Action</th>
              </tr>
            </thead>
            <tbody>
              {!bills.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-2 border-2 border-blue-950 text-lg font-normal text-gray-400 text-center"
                  >
                    No data found.
                  </td>
                </tr>
              )}

              {bills.map((bill: Bill) => (
                <tr key={bill.id}>
                  <td className="p-2 border-2 border-blue-950 text-lg font-normal text-blue-600">
                    {bill.bill_no}
                  </td>
                  <td className="p-2 border-2 border-blue-950 text-lg font-normal text-blue-600">
                    {bill.date}
                  </td>
                  <td className="p-2 border-2 border-blue-950 text-lg font-normal text-blue-600">
                    {bill.name}
                  </td>
                  <td className="p-2 border-2 border-blue-950 text-lg font-normal text-blue-600 text-end">
                    {bill.total}
                  </td>
                  <td className="p-2 border-2 border-blue-950 text-lg font-normal text-blue-600">
                    <button
                      type="button"
                      className="p-2"
                      onClick={() => handleViewModalToggle(bill.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-[0.3px] stroke-blue-400 fill-blue-400 w-6"
                      >
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
                          ></path>{" "}
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="p-2"
                      onClick={() => handleAddEditModalToggle(bill.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-2 stroke-blue-700 w-6"
                      >
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="p-2"
                      onClick={() => handleDeleteModalToggle(bill.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-2 stroke-red-500 w-6"
                      >
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            perPage={perPage}
            onPerPageChange={setPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
        {/* Body Section End */}
      </main>

      <AddEditBill
        id={billId}
        isOpen={isAddEditModalOpen}
        onClose={handleAddEditModalToggle}
        handleRecordsChangedToggle={handleRecordsChangedToggle}
      />

      <ViewBill
        id={billId}
        isOpen={isViewModalOpen}
        onClose={handleViewModalToggle}
      />

      <DeleteBill
        id={billId}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalToggle}
        handleRecordsChangedToggle={handleRecordsChangedToggle}
      />
    </>
  );
}

export default App;
