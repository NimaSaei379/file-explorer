import { DocumentIcon } from "@heroicons/react/24/outline";
import {
  useState,
  Dispatch,
  FormEvent,
  useRef,
  useEffect,
  SetStateAction,
} from "react";
import { ActionType, IAction } from "../context/FileReducer";

function NameInputForm({
  folderName,
  parentFolder,
  setShowNameinput,
  dispatch,
  isRename = false,
  setIsRenaming,
}: {
  folderName?: string;
  parentFolder?: string;
  setShowNameinput: (value: string | undefined) => void;
  dispatch: Dispatch<IAction>;
  isRename?: boolean;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
}) {
  const [inputValue, setInputValue] = useState<string>(folderName || "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowNameinput(undefined);
      setInputValue("");
      setIsRenaming(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("rename", isRename, folderName);

    if (isRename && folderName) {
      dispatch({
        type: ActionType.RENAME_FOLDER,
        folderName,
        newFolderName: inputValue,
      });
    } else if (parentFolder) {
      dispatch({
        type: ActionType.ADD_FOLDER,
        parentFolder: parentFolder,
        newFolderName: inputValue,
      });
    }

    setShowNameinput(undefined);
  };

  return (
    <div className="pl-6">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <DocumentIcon className="size-6" />
        <input
          ref={inputRef}
          type="text"
          className="outline-none py-0.5 border border-gray-200 focus:border-sky-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isRename ? "Rename folder" : "New folder name"}
        />
      </form>
    </div>
  );
}

export default NameInputForm;
