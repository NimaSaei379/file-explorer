import FolderContainer from "./components/FolderContainer";
import FilesystemDataProvider from "./context/FileContext";

function App() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <FilesystemDataProvider>
        <FolderContainer />
      </FilesystemDataProvider>
    </div>
  );
}

export default App;
