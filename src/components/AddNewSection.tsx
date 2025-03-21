import { useState } from "react";
import { SimpleInputModal } from "./SimpleInputModal";

export const AddNewSection = ({ setBoard, setSections, id }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [newSection, setNewSection] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault();
    addNewSection();
  };
  const handleOnChange = (e: any) => {
    setNewSection(e.target.value);
  };
  const addNewSection = () => {
    if (newSection.trim() === "") return;
    setBoard((prev) => {
      const updatedSections = {
        id: prev?.id,
        title: prev?.title,
        section: [
          ...(prev?.section || []),
          {
            title: newSection,
            id: String(prev?.section ? prev.section.length + 1 : "1"),
            tasks: [],
          },
        ],
      };
      localStorage.setItem(`boards${id}`, JSON.stringify(updatedSections));

      const sections = updatedSections.section.map((section) => {
        return {
          title: section.title,
          id: section.id,
        };
      });

      setSections(sections);
      setNewSection("");
      setShowModal(false);
      return updatedSections;
    });
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-800 uppercase p-4 hover:cursor-pointer  w-80 min-h-80 flex items-center justify-center text-gray-400 rounded-lg shrink-0"
      >
        add new board
      </button>
      <SimpleInputModal
        handleConfirm={handleConfirm}
        text="Add new section"
        setShowModal={setShowModal}
        inputOnChange={(e) => handleOnChange(e)}
        showModal={showModal}
      />
    </>
  );
};
