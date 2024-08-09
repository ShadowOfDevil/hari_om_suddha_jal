import { useEffect, useRef, useState } from "react";
import { fetchBillsData } from "../apis/fetchBillsData";
import { Bill, BillData } from "../dataType";
import Loading from "../common/Loading";
import { useReactToPrint } from "react-to-print";

export interface ViewBillProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const ViewBill = ({ id, isOpen, onClose }: ViewBillProps) => {
  if (!isOpen) return null;

  const contentToPrint = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<Bill>({} as Bill);

  const fetchBill = async () => {
    setLoading(true);

    try {
      const response = await fetchBillsData(id);
      if (response.data) {
        setBill(response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBill();
    }
  }, [isOpen]);

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 p-5 overflow-y-auto">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-2">
          {/* Modal Header */}
          <div className="p-6 pb-0 flex justify-between items-center">
            {bill.id && (
              <h3 className="text-lg font-semibold">
                <button
                  type="button"
                  className="w-28 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex justify-between"
                  onClick={() => handlePrint()}
                >
                  <span>Print</span>
                  <svg
                    viewBox="0 -2 32 32"
                    className="stroke-white fill-white w-6"
                  >
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Page-1">
                        <g
                          id="Icon-Set"
                          transform="translate(-100.000000, -205.000000)"
                        >
                          <path
                            d="M130,226 C130,227.104 129.104,228 128,228 L125.858,228 C125.413,226.278 123.862,225 122,225 L110,225 C108.138,225 106.587,226.278 106.142,228 L104,228 C102.896,228 102,227.104 102,226 L102,224 C102,222.896 102.896,222 104,222 L128,222 C129.104,222 130,222.896 130,224 L130,226 L130,226 Z M122,231 L110,231 C108.896,231 108,230.104 108,229 C108,227.896 108.896,227 110,227 L122,227 C123.104,227 124,227.896 124,229 C124,230.104 123.104,231 122,231 L122,231 Z M108,209 C108,207.896 108.896,207 110,207 L122,207 C123.104,207 124,207.896 124,209 L124,220 L108,220 L108,209 L108,209 Z M128,220 L126,220 L126,209 C126,206.791 124.209,205 122,205 L110,205 C107.791,205 106,206.791 106,209 L106,220 L104,220 C101.791,220 100,221.791 100,224 L100,226 C100,228.209 101.791,230 104,230 L106.142,230 C106.587,231.723 108.138,233 110,233 L122,233 C123.862,233 125.413,231.723 125.858,230 L128,230 C130.209,230 132,228.209 132,226 L132,224 C132,221.791 130.209,220 128,220 L128,220 Z"
                            id="print"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
              </h3>
            )}

            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div ref={contentToPrint} className="p-6">
            {loading ? (
              <Loading />
            ) : (
              <>
                {/* Invoice */}
                <main className="box-border border-blue-950 border-3 rounded-3xl w-100 border-4">
                  {/* Header Section Start */}
                  <section className="flex flex-row justify-between p-2 box-border border-b-2 border-blue-950">
                    <div className="w-36">
                      <img
                        className="h-36"
                        src="/assets/hosj_logo.png"
                        alt=""
                      />
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
                  {/* Header Section End */}

                  {/* Address Section Start */}
                  <section className="p-2 box-border border-b-2 border-blue-950 text-center text-blue-950 text-xl font-semibold">
                    At/po. Zaroli Kapadipada, St. Bhilad, Ta. Umbergaon, Dist.
                    Valsad.
                  </section>
                  {/* Address Section End */}

                  {/* Name Section Start */}
                  <section className="flex justify-between box-border border-b-2 border-blue-950">
                    <div className="p-2 w-full box-border border-r-2 border-blue-950">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-950 font-semibold text-xl">
                          M/s.
                        </span>
                        <p className="box-border border-b-2 border-blue-950 flex-1 text-blue-600  font-normal text-lg p-1">
                          {bill.name}
                        </p>
                      </div>
                    </div>
                    <div className="p-2 w-60">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-950 font-semibold text-xl">
                          Bill No. :
                        </span>
                        <p className="box-border border-b-2 border-blue-950 flex-1 text-center text-blue-600  font-normal text-lg">
                          {bill.bill_no}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-blue-950 font-semibold text-xl">
                          Date :
                        </span>
                        <p className="box-border border-b-2 border-blue-950 flex-1 text-center text-blue-600 font-normal text-lg">
                          {bill.date}
                        </p>
                      </div>
                    </div>
                  </section>
                  {/* Name Section Start */}

                  {/* Table Section Start */}
                  <section>
                    <table className="w-full text-blue-950">
                      <thead>
                        <tr>
                          <th className="p-2 w-10 border-r-2 border-b-2 border-blue-950 text-center">
                            Sr. No.
                          </th>
                          <th className="p-2 border-r-2 border-b-2 border-blue-950">
                            PARTICULARS
                          </th>
                          <th className="p-2 w-14 border-r-2 border-b-2 border-blue-950">
                            Qty.
                          </th>
                          <th className="p-2 w-16 border-r-2 border-b-2 border-blue-950">
                            Rate
                          </th>
                          <th className="p-2 w-20 border-b-2 border-blue-950">
                            Ammount Rs.
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bill.bill_data?.map(
                          (data: BillData, index: number) => (
                            <tr key={`${data.particular}-${index}`}>
                              <td className="p-2 border-r-2 border-blue-950 text-lg font-normal text-blue-600 text-center">
                                {index + 1}
                              </td>
                              <td className="p-2 border-r-2 border-blue-950 text-lg font-normal text-blue-600">
                                {data.particular}
                              </td>
                              <td className="p-2 border-r-2 border-blue-950 text-lg font-normal text-blue-600 text-end">
                                {data.qty}
                              </td>
                              <td className="p-2 border-r-2 border-blue-950 text-lg font-normal text-blue-600 text-end">
                                {data.rate}
                              </td>
                              <td className="p-2 border-blue-950 text-lg font-normal text-blue-600 text-end">
                                {data.ammount}
                              </td>
                            </tr>
                          )
                        )}
                        <tr>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-blue-950 text-end text-lg font-normal"></td>
                        </tr>
                        <tr>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-r-2 border-blue-950 text-lg font-normal"></td>
                          <td className="p-2 border-blue-950 text-end text-lg font-normal"></td>
                        </tr>
                        <tr>
                          <td className="p-2 border-r-2 border-blue-950"></td>
                          <td className="p-2 border-r-2 border-blue-950"></td>
                          <td className="p-2 border-r-2 border-blue-950"></td>
                          <td className="p-2 border-t-2 border-r-2 border-blue-950 text-center font-semibold text-xl">
                            TOTAL
                          </td>
                          <td className="p-2 border-t-2 border-blue-950 text-blue-600 text-end">
                            {bill.total}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                  {/* Table Section End */}

                  {/* Footer Section Start */}
                  <section className="p-2 pb-10 border-t-2 border-blue-950 text-end text-blue-950 text-xl font-semibold">
                    For HARI OM SUDDHA JAL
                  </section>
                  {/* Footer Section Start */}
                </main>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBill;
