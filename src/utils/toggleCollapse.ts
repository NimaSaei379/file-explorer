import { Folders } from "../components/Folder";

export function toggleCollapse(folder:Folders , folderName:string):Folders{
    if(folder.name === folderName){
       if(folder.folders){ 
            return{
                ...folder,
                collapse:!folder.collapse
            }
        }
    }

    if(folder.folders){
        return{
            ...folder,
            folders:folder.folders.map((childFolders)=>toggleCollapse(childFolders, folderName))
        }
    }
    return folder
}