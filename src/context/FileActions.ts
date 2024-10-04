import { Dispatch } from "react";
import { ActionType, IAction } from "./FileReducer";

export const collapseFolder = (
  dispatch: Dispatch<IAction>,
  folderName: string
) => {
  dispatch({ type: ActionType.COLLAPSE_FOLDER, folderName });
};

export const deleteFolder = (
  dispatch: Dispatch<IAction>,
  folderName: string
) => {
  dispatch({ type: ActionType.DELETE_FOLDER, folderName });
};

export const renameFolder = (
  dispatch: Dispatch<IAction>,
  folderName: string,
  newFolderName: string
) => {
  dispatch({
    type: ActionType.RENAME_FOLDER,
    folderName,
    newFolderName,
  });
};

export const addFolder = (
  dispatch: Dispatch<IAction>,
  parentFolder: string,
  newFolderName: string
) => {
  dispatch({
    type: ActionType.ADD_FOLDER,
    parentFolder,
    newFolderName,
  });
};

export const addFile = (
  dispatch: Dispatch<IAction>,
  parentFolder: string,
  newFileName: string
) => {
  dispatch({
    type: ActionType.ADD_FILE,
    parentFolder,
    newFileName: newFileName,
  });
};
