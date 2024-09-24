import { Dispatch } from "react";
import { ActionType, IAction } from "./FileReducer";

const collapseFolder = (dispatch: Dispatch<IAction>, folderName: string) =>
  dispatch({ type: ActionType.COLLAPSE_FOLDER, folderName });

export { collapseFolder };
