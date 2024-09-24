import { createContext, useContext, useReducer } from "react";
import { Folders } from "../components/Folder";
import { folders } from "../data/filesystem";
import { fileTreeReducer, IAction } from "./FileReducer";

export interface IFileTreeContext {
  state: Folders[];
  dispatch: React.Dispatch<IAction>;
}

const FilesystemDataContext = createContext<IFileTreeContext>({
  dispatch: () => {},
  state: [],
});

export default function FilesystemDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(fileTreeReducer, folders as Folders[]);
  const value = { state, dispatch };
  return (
    <FilesystemDataContext.Provider value={value}>
      {children}
    </FilesystemDataContext.Provider>
  );
}

export function useFolders() {
  const folders = useContext(FilesystemDataContext);
  if (!folders)
    throw new Error("please use `useFolders` in the fileSystemProvider");
  return folders;
}
