import { RouterProvider } from "react-router-dom";
import router from "./router";
import { SelectionContextProvider } from "./components/SelectionContext";
import { ErrorProvider } from "./components/ErrorContext";

function App() {

  return (
    <ErrorProvider>
      <SelectionContextProvider>
        <div>
          <RouterProvider router={router} />
          <div className='footer'>
            <p>Quickstimate ver 1.0.0</p>
            <p>© fpmc.2023</p>
          </div>
        </div>
      </SelectionContextProvider>
    </ErrorProvider>
  );
}

export default App;
