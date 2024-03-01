import { RouterProvider } from "react-router-dom";
import router from "./router";
import { SelectionContextProvider } from "./components/SelectionContext";
import { useState } from "react";
import { AuthProvider } from "./components/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <SelectionContextProvider>
        <div>
          <RouterProvider router={router} />
          <Toaster position="top-center" />
          <div className='footer'>
            <p>Quickstimate ver 1.5.0</p>
            <p>© fpmc.2023</p>
          </div>
        </div>
      </SelectionContextProvider>
    </AuthProvider>
  );
}

export default App;
