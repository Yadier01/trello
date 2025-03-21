import { Modal } from "./Modal";

export const SimpleInputModal = ({
  showModal,
  inputOnChange,
  handleConfirm,
  setShowModal,
  text,
}: any) => {
  return (
    <>
      {showModal && (
        <Modal>
          <form
            onSubmit={(e) => handleConfirm(e)}
            className="bg-primary flex flex-col min-h-40 min-w-md gap-10 p-4 rounded-lg "
          >
            <span className="space-y-4 w-full ">
              <h3 className="text-white">{text}</h3>
              <input
                className="border rounded-md p-2 w-full"
                placeholder="School project..."
                onChange={(e) => inputOnChange(e)}
              />
            </span>

            <div className="flex w-full justify-between items-center">
              <button
                onClick={(e) => handleConfirm(e)}
                type="submit"
                className="border rounded-md p-2"
              >
                Confirm
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
      ,
    </>
  );
};
