import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
  FolderOpenIcon,
} from "@heroicons/react/16/solid/index.js";
import { useState } from "react";

type FolderBase = {
  name: string;
};

type FolderWithSubFolder = FolderBase & {
  collapse: boolean;
  folders: Folders[];
};

type FolderWithoutSubfolders = FolderBase & {
  folders?: never;
};
export type Folders = FolderWithoutSubfolders | FolderWithSubFolder;

function Folder({ folder }: { folder: Folders }) {
  const [open, setOpen] = useState(false);
  const properIcon = open ? (
    <FolderOpenIcon className="size-6 text-yellow-600" />
  ) : (
    <FolderIcon
      className={`size-6 text-yellow-500 ${
        folder?.folders?.length === 0 ? "ml-4" : ""
      }`}
    />
  );
  return (
    <li className="my-1.5">
      <span className="flex items-center gap-2">
        {folder?.folders && folder?.folders?.length > 0 && (
          <button onClick={() => setOpen(!open)}>
            <ChevronRightIcon
              className={`size-4 text-gray-400 ${open ? "rotate-90" : ""}`}
            />
          </button>
        )}
        {folder?.folders ? (
          properIcon
        ) : (
          <DocumentIcon className="text-sky-300 ml-4 size-6" />
        )}
        {folder.name}
      </span>
      {open && (
        <ul className="pl-6">
          {folder.folders?.map((folder) => (
            <Folder key={folder.name} folder={folder} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Folder;
