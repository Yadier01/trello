import { useState } from "react";
import { SimpleInputModal } from "./SimpleInputModal";

export const NewBoardButton = ({ setBoards }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [newBoard, setNewBoard] = useState("");
  const handleNewBoard = () => {
    setShowModal(true);
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    if (newBoard.trim() === "") return;
    setBoards((prev) => {
      const updatedBoards = [
        ...prev,
        { title: newBoard, id: String(prev.length + 1) },
      ];

      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return updatedBoards;
    });
    setShowModal(false);
  };

  const handleOnChange = (e) => {
    setNewBoard(e.target.value);
  };
  return (
    <>
      <button
        onClick={handleNewBoard}
        className="bg-blue-500 text-white font-semibold rounded-md w-full mb-4 p-3 "
      >
        New Board
      </button>

      <SimpleInputModal
        handleConfirm={handleConfirm}
        setShowModal={setShowModal}
        text="Add new board"
        inputOnChange={(e) => handleOnChange(e)}
        showModal={showModal}
      />
    </>
  );
};
