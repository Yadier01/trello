import { ReactNode } from "@tanstack/react-router";
import { createPortal } from "react-dom";

export const Modal = ({ children }: ReactNode) => {
  return (
    <>
      {createPortal(
        <div className="fixed min-h-screen top-0 flex justify-center items-center  overflow-hidden text-white  bottom-0 min-w-screen right-0 left-0 bg-black/80 ">
          {children}
        </div>,
        document.body,
      )}
    </>
  );
};
