import { Folders } from "../components/Folder";
import { toggleCollapse } from "../utils/fileExplorerUtils";

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
};

export const fileTreeReducer = (state: Folders[], actions: IAction) => {
  switch (actions.type) {
    case ActionType.COLLAPSE_FOLDER:
      return state.map((folder) =>
        toggleCollapse(folder, actions.folderName as string)
      );

    default:
      return state;
  }
};
