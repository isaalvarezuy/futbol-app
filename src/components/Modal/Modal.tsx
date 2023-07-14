import { Dialog } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Paragraph from "../Paragraph/Paragraph";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  icon?: ReactNode;
  primaryButton: ReactNode;
  secondaryButton: ReactNode;
}

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  icon,
  primaryButton,
  secondaryButton,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  items-center justify-center p-4 rounded-md">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white flex flex-col justify-center items-center gap-2 text-center">
          {icon}
          <Paragraph weight="medium" size={16}>
            {title}
          </Paragraph>
          <Paragraph>{description}</Paragraph>
          <div className="flex justify-between gap-2 w-full">
            {secondaryButton}

            {primaryButton}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
