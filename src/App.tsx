import Folder from "./components/Folder";
import { folders } from "./data/filesystem";

function App() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <ul>
        <ul className="pl-6">
          {folders.map((folder) => (
            <Folder key={folder.name} folder={folder} />
          ))}
        </ul>
      </ul>
    </div>
  );
}

export default App;
