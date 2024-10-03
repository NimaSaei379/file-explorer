import { useFolders } from "../context/FileContext";
import Folder from "./Folder";

function FolderContainer() {
  const { state: folders, dispatch } = useFolders();
  return (
    <ul className="pl-6">
      {folders.map((folder) => (
        <Folder
          key={folder.name}
          folder={folder}
          dispatch={dispatch}
          name={folder.name}
        />
      ))}
    </ul>
  );
}

export default FolderContainer;
