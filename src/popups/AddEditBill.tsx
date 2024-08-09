import React, { useEffect, useState } from "react";
import { Bill, BillData } from "../dataType";
import { format, isValid, parse } from "date-fns";
import { addEditBillData } from "../apis/addEditBillData";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { fetchBillsData } from "../apis/fetchBillsData";

export interface AddEditBillProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleRecordsChangedToggle: () => void;
}

export interface BillFormData {
  bill_no: string;
  name: string;
  date: string;
  total: number;
  created_at: string;
}

const AddEditBill = ({
  id,
  isOpen,
  onClose,
  handleRecordsChangedToggle,
}: AddEditBillProps) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<BillFormData>({
    bill_no: "001",
    name: "",
    date: "",
    total: 0,
    created_at: "",
  });
  const [elements, setElements] = useState<BillData[]>([]);
  const [elemId, setElemId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLatestBill = async () => {
    try {
      const response = await fetchBillsData('', 1, 1);

      if (response.data.data.length) {
        const billNumber = response.data.data[0].bill_no;

        setFormData((prevData) => ({
          ...prevData,
          bill_no: String(parseInt(billNumber) + 1).padStart(3, "0"),
        }));
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBill = async () => {
    setLoading(true);

    try {
      const response = await fetchBillsData(id);
      if (response.data) {
        const newFormData = {
          bill_no: response.data.bill_no,
          name: response.data.name,
          date: response.data.date,
          total: response.data.total,
          created_at: response.data.created_at,
        };
        setFormData(newFormData);

        const newElements: BillData[] = [];
        response.data.bill_data.map((data: BillData, index: number) => {
          newElements[index] = {
            id: data.id,
            particular: data.particular,
            qty: data.qty,
            rate: data.rate,
            ammount: data.ammount,
          };
        });
        setElements(newElements);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      fetchLatestBill();
    }

    if (id) {
      fetchBill();
    }
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;

    if (name === "date") {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());

      if (isValid(parsedDate)) {
        const formattedDate = format(parsedDate, "dd/MM/yyyy");
        setFormData((prevData) => ({ ...prevData, [name]: formattedDate }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleElementInputChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setElements(
      elements.map((element) => {
        if (element.id === id) {
          let ammount = 0;
          if (name === "qty") {
            ammount = parseInt(value) * parseInt(element.rate);
          } else if (name === "rate") {
            ammount = parseInt(element.qty) * parseInt(value);
          }

          return { ...element, [name]: value, ammount: ammount };
        }
        return element;
      })
    );
  };

  useEffect(() => {
    calculateTotalAmmount();
  }, [elements]);

  const handleAddItem = () => {
    setElements([
      ...elements,
      { id: elemId, particular: "", qty: "0", rate: "0", ammount: 0 },
    ]);
    setElemId(elemId + 1);
  };

  const handleRemoveElement = (id: number) => {
    setElements(
      elements.filter((element) => {
        if (element.id !== id) {
          return element;
        }
      })
    );
  };

  const calculateTotalAmmount = () => {
    let totalAmmount = 0;
    elements.map((element) => {
      totalAmmount += element.ammount;
    });

    setFormData((prevData) => ({ ...prevData, total: totalAmmount }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const requestData: Bill = {
        id: id ? id : String(Date.now() + Math.floor(Math.random() * 1000)),
        bill_no: formData.bill_no,
        name: formData.name,
        date: formData.date,
        total: formData.total,
        bill_data: elements,
        created_at: formData.created_at
          ? formData.created_at
          : Date.now().toString(),
        updated_at: Date.now().toString(),
      };

      //   console.log(requestData)
      const response = await addEditBillData(requestData, id);

      if (response.data) {
        let msg = "New bill added successfully.";
        if (id) {
          msg = "Bill data updated successfully.";
        }

        toast.success(msg);
        onClose();
        handleRecordsChangedToggle();
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 p-5 overflow-y-auto">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-2">
          {/* Modal Header */}
          <div className="p-6 pb-0 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {id ? "Edit Bill" : "Add Bill"}
            </h2>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <form className="w-full mx-auto box-border border-2 border-gray-200 p-8 rounded-2xl">
              <div className="mb-4">
                <label htmlFor="bill_no" className="block text-gray-700 mb-2">
                  Bill Number
                </label>
                <input
                  type="text"
                  id="bill_no"
                  name="bill_no"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.bill_no}
                  disabled
                />
              </div>
              <div className="flex justify-between space-x-4 mb-4">
                <div className="w-3/4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="w-1/4">
                  <label htmlFor="date" className="block text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={
                      formData.date
                        ? format(
                            parse(formData.date, "dd/MM/yyyy", new Date()),
                            "yyyy-MM-dd"
                          )
                        : ""
                    }
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <hr className="mb-4 border-gray-300" />

              {elements.length > 0 &&
                elements.map((element) => (
                  <React.Fragment key={element.id}>
                    <div className="flex justify-between space-x-4 mb-4">
                      <div className="w-3/4">
                        <label className="block text-gray-700 mb-2">Item</label>
                        <input
                          type="text"
                          id="particular"
                          name="particular"
                          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={element.particular}
                          onChange={(e) =>
                            handleElementInputChange(element.id, e)
                          }
                        />
                      </div>
                      <div className="w-1/6">
                        <label className="block text-gray-700 mb-2">Qty</label>
                        <input
                          type="number"
                          id="qty"
                          name="qty"
                          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={element.qty}
                          onChange={(e) =>
                            handleElementInputChange(element.id, e)
                          }
                        />
                      </div>
                      <div className="w-1/6">
                        <label className="block text-gray-700 mb-2">Rate</label>
                        <input
                          type="number"
                          id="rate"
                          name="rate"
                          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={element.rate}
                          onChange={(e) =>
                            handleElementInputChange(element.id, e)
                          }
                        />
                      </div>
                      <div className="w-5 flex justify-center">
                        <button
                          type="button"
                          className="edit"
                          onClick={() => handleRemoveElement(element.id)}
                          disabled={loading}
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
                      </div>
                    </div>
                  </React.Fragment>
                ))}

              <div className="mb-4">
                <button
                  type="button"
                  className="flex px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 font-semibold"
                  onClick={() => handleAddItem()}
                  disabled={loading}
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
                  <span>Add Item</span>
                </button>
              </div>

              <div className="flex justify-end">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <button
                      type="button"
                      className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={() => handleSubmit()}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBill;
