import { Folders } from "../components/Folder";

export function toggleCollapse(folder: Folders, folderName: string): Folders {
  if (folder.name === folderName) {
    if (folder.folders) {
      return {
        ...folder,
        collapse: !folder.collapse,
      };
    }
  }

  if (folder.folders) {
    return {
      ...folder,
      folders: folder.folders.map((childFolders) =>
        toggleCollapse(childFolders, folderName)
      ),
    };
  }
  return folder;
}

export function addFolder(
  folder: Folders,
  parentFolder: string,
  newFolderName: string
): Folders {
  if (folder.name === parentFolder) {
    const newFolder: Folders = {
      name: newFolderName,
      collapse: false,
      folders: [],
    };
    return {
      ...folder,
      collapse: true,
      folders: [...(folder.folders || []), newFolder],
    };
  }
  if (folder.folders) {
    return {
      ...folder,
      folders: folder.folders.map((childFolders) =>
        addFolder(childFolders, parentFolder, newFolderName)
      ),
    };
  }
  return folder;
}

export function deleteFolder(
  folder: Folders,
  folderName: string
): Folders | null {
  if (folder.name === folderName) {
    return null;
  }
  if (folder.folders) {
    const updatedFoldres = folder.folders
      .map((childFolders) => deleteFolder(childFolders, folderName))
      .filter(Boolean);
    return { ...folder, folders: updatedFoldres as Folders[] };
  }
  return folder;
}

export function renameFolder(
  folder: Folders,
  oldname: string,
  newName: string
): Folders {
  if (folder.name === oldname) {
    return { ...folder, name: newName };
  }

  if (folder.folders) {
    return {
      ...folder,
      folders: folder.folders.map((childFolders) =>
        renameFolder(childFolders, oldname, newName)
      ),
    };
  }
  return folder;
}
