import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
  FolderOpenIcon,
} from "@heroicons/react/16/solid/index.js";
import { Dispatch } from "react";
import { collapseFolder } from "../context/FileActions";
import { IAction } from "../context/FileReducer";

type FolderBase = {
  name: string;
};

type FolderWithSubFolder = FolderBase & {
  collapse: boolean;
  folders: Folders[];
};

type FolderWithoutSubfolders = FolderBase & {
  folders?: undefined;
};
export type Folders = FolderWithoutSubfolders | FolderWithSubFolder;

function Folder({
  folder,
  dispatch,
  name,
}: {
  folder: Folders;
  dispatch: Dispatch<IAction>;
  name: string;
}) {
  const isFolderWithSubFolders = (
    folder: Folders
  ): folder is FolderWithSubFolder => "folders" in folder;

  const properIcon =
    isFolderWithSubFolders(folder) && folder.collapse ? (
      <FolderOpenIcon className="size-6 text-yellow-600" />
    ) : (
      <FolderIcon
        className={`size-6 text-yellow-500 ${
          folder?.folders?.length === 0 ? "ml-[22px]" : ""
        }`}
      />
    );
  return (
    <li className="my-1.5">
      <span className="flex items-center gap-2">
        {isFolderWithSubFolders(folder) && folder?.folders?.length > 0 && (
          <button onClick={() => collapseFolder(dispatch, folder.name)}>
            <ChevronRightIcon
              className={`size-4 text-gray-400 ${
                folder.collapse ? "rotate-90" : ""
              }`}
            />
          </button>
        )}
        {isFolderWithSubFolders(folder) ? (
          properIcon
        ) : (
          <DocumentIcon className="text-sky-300 ml-[22px] size-6" />
        )}
        {name}
      </span>
      {isFolderWithSubFolders(folder) && folder.collapse && (
        <ul className="pl-6">
          {folder.folders?.map((folder) => (
            <Folder
              key={folder.name}
              folder={folder}
              dispatch={dispatch}
              name={folder.name}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Folder;
