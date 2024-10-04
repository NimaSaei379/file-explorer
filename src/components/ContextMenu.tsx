import {
  DocumentPlusIcon,
  FolderPlusIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { IAction } from "../context/FileReducer";
import { collapseFolder, deleteFolder } from "../context/FileActions";

type TContextmenuItem = {
  icon: JSX.Element;
  name: string;
  action: () => void;
};

function ContextMenu({
  name,
  setOpenMenuName,
  setShowNameinput,
  dispatch,
  parentFolder,
  setIsRenaming,
  setAddNewFile,
}: {
  name: string;
  setOpenMenuName: Dispatch<SetStateAction<string | undefined>>;
  setShowNameinput: Dispatch<SetStateAction<string | undefined>>;
  dispatch: Dispatch<IAction>;
  parentFolder: string;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
  setAddNewFile: Dispatch<SetStateAction<boolean>>;
}) {
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const contextMenuItems: TContextmenuItem[] = [
    {
      icon: <TrashIcon className="size-4" />,
      name: "delete",
      action: () => {
        deleteFolder(dispatch, name);
        setOpenMenuName(undefined);
      },
    },
    {
      icon: <PencilIcon className="size-4" />,
      name: "rename",
      action: () => {
        setShowNameinput(name);
        setOpenMenuName(undefined);
        setIsRenaming(true);
      },
    },
    {
      icon: <FolderPlusIcon className="size-4" />,
      name: "new folder",
      action: () => {
        setShowNameinput(parentFolder);
        setOpenMenuName(undefined);
        collapseFolder(dispatch, name);
      },
    },
    {
      icon: <DocumentPlusIcon className="size-4" />,
      name: "new file",
      action: () => {
        setShowNameinput(parentFolder);
        setOpenMenuName(undefined);
        setAddNewFile(true);
      },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target as Node)
      ) {
        setOpenMenuName(undefined);
        setShowNameinput(undefined);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenuRef]);

  return (
    <div
      ref={contextMenuRef}
      className="absolute bg-sky-200 shadow-lg rounded-lg left-full top-1/2 w-40"
    >
      {contextMenuItems.map((item) => (
        <div
          key={item.name}
          className="flex items-center px-2 py-3 gap-2 cursor-pointer hover:bg-sky-100"
          onClick={item.action}
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default ContextMenu;
