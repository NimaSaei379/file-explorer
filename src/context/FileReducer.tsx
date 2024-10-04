import { Folders } from "../components/Folder";
import {
  toggleCollapse,
  deleteFolder,
  renameFolder,
  addFolder,
  addFile,
} from "../utils/fileExplorerUtils";

export enum ActionType {
  COLLAPSE_FOLDER = "COLLAPSE_FOLDER",
  DELETE_FOLDER = "DELETE_FOLDER",
  RENAME_FOLDER = "RENAME_FOLDER",
  ADD_FOLDER = "ADD_FOLDER",
  ADD_FILE = "ADD_FILE",
}

export type IAction = {
  type: ActionType;
  folderName?: string;
  newFolderName?: string;
  parentFolder?: string;
  newFileName?: string;
};

export const fileTreeReducer = (state: Folders[], actions: IAction) => {
  switch (actions.type) {
    case ActionType.COLLAPSE_FOLDER:
      return state.map((folder) =>
        toggleCollapse(folder, actions.folderName as string)
      );

    case ActionType.DELETE_FOLDER:
      return state
        .map((folder) => deleteFolder(folder, actions.folderName as string))
        .filter(Boolean) as Folders[];

    case ActionType.RENAME_FOLDER:
      return state.map((folder) =>
        renameFolder(
          folder,
          actions.folderName as string,
          actions.newFolderName as string
        )
      );

    case ActionType.ADD_FOLDER:
      return state.map((folder) =>
        addFolder(
          folder,
          actions.parentFolder as string,
          actions.newFolderName as string
        )
      );

    case ActionType.ADD_FILE:
      return state.map((folder) =>
        addFile(
          folder,
          actions.parentFolder as string,
          actions.newFileName as string
        )
      );

    default:
      return state;
  }
};
