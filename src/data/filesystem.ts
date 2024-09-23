import type { Folders } from "../components/Folder";

export const folders: Folders[] = [
  {
    name: "folders",
    collapse: false,
    folders: [
      {
        name: "assets",
        collapse: false,
        folders: [
          { name: "images", folders: [], collapse: false },
          { name: "fonts", folders: [], collapse: false },
          { name: "icons", folders: [], collapse: false },
        ],
      },
      {
        name: "components",
        collapse: false,
        folders: [{ name: "ui", folders: [], collapse: false }],
      },
      {
        name: "hooks",
        collapse: false,
        folders: [{ name: "useLocalstorage" }],
      },
      { name: "layout", collapse: false, folders: [] },
      { name: "utils", collapse: false, folders: [] },
      { name: "config" },
    ],
  },
];
