import { toast } from "react-toastify";
import { deleteBillData } from "../apis/deleteBillsData";

export interface DeleteBillProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleRecordsChangedToggle: () => void;
}

const DeleteBill = ({
  id,
  isOpen,
  onClose,
  handleRecordsChangedToggle,
}: DeleteBillProps) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await deleteBillData(id);

      if (response.data) {
        toast.success("Record deleted successfully.");
        handleRecordsChangedToggle();
        onClose();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 p-5 overflow-y-auto">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-2">
          {/* Modal Header */}
          <div className="p-6 pb-0 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Delete Bill</h2>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <p className="font-normal">
              Are you sure, You want to delete this record?
            </p>
          </div>

          {/* Modal Footer */}
          <div className="p-6 pt-0 flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => handleDelete()}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBill;
