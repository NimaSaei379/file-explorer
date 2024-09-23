import { createContext } from "react";
import { Folders } from "../components/Folder";
import { folders } from "../data/filesystem";

export interface IFSContext {
  state: Folders[];
  dispatch: React.Dispatch<ActionType>;
}

const FilesystemDataContext = createContext<IFSContext>({
  dispatch: () => {},
  state: [],
});

export enum ActionType {
  COLLAPSE_FOLDER = "COLLAPSE_FOLDER",
  DELETE_FOLDER = "DELETE_FOLDER",
  RENAME_FOLDER = "RENAME_FOLDER",
}

export type IAction = {
  type: ActionType;
};

const fileTreeReducer = (state: Folders[], actions: IAction) => {};

export default function FilesystemDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FilesystemDataContext.Provider value={}>
      {children}
    </FilesystemDataContext.Provider>
  );
}
