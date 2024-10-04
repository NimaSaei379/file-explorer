import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
  FolderOpenIcon,
} from "@heroicons/react/16/solid/index.js";
import { Dispatch, MouseEvent, useState } from "react";
import { collapseFolder } from "../context/FileActions";
import { IAction } from "../context/FileReducer";
import ContextMenu from "./ContextMenu";
import NameInputForm from "./NameInputForm";

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
  parentFolder,
}: {
  folder: Folders;
  dispatch: Dispatch<IAction>;
  name: string;
  parentFolder?: string;
}) {
  const [openMenuName, setOpenMenuName] = useState<string | undefined>();
  const [showNameinput, setShowNameinput] = useState<string | undefined>();
  const [isRenaming, setIsRenaming] = useState(false);
  const [addNewFile, setAddNewFile] = useState(false);
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

  function contextMenueHandler(e: MouseEvent) {
    e.preventDefault();
    setOpenMenuName(name);
  }

  return (
    <li className="my-1.5">
      <span
        className={`flex items-center gap-2 hover:bg-slate-200 relative ${
          openMenuName === name ? "bg-slate-300 border border-gray-300" : ""
        }`}
        onContextMenu={contextMenueHandler}
      >
        {!isRenaming && (
          <>
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
          </>
        )}
        {openMenuName === name ? (
          <ContextMenu
            name={name}
            setOpenMenuName={setOpenMenuName}
            setShowNameinput={setShowNameinput}
            dispatch={dispatch}
            parentFolder={parentFolder || name}
            setIsRenaming={setIsRenaming}
            setAddNewFile={setAddNewFile}
          />
        ) : null}
      </span>
      {showNameinput === name && (
        <NameInputForm
          folderName={isRenaming ? name : undefined}
          parentFolder={!isRenaming ? name : undefined}
          setShowNameinput={setShowNameinput}
          dispatch={dispatch}
          isRename={isRenaming}
          setIsRenaming={setIsRenaming}
          addNewFile={addNewFile}
          setAddNewFile={setAddNewFile}
        />
      )}
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
