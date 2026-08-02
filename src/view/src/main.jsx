import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import './index.css'
// import App from './App.jsx'
import App from "./App.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import { CategorieContextProvider } from "./context/categorieContext.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { AvisContextProvider } from "./context/AvisContext.jsx";
import { PanierContextProvider } from "./context/PanierContext.jsx";
import { LocalProvider } from "./context/Localhost.jsx";
import { LigneCommandeContextProvider } from "./context/LigneCommandeContext.jsx";
import { CommandeContextProvider } from "./context/CommandeContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LocalProvider>
          <CategorieContextProvider>
            <ProductContextProvider>
              <AvisContextProvider>
                <PanierContextProvider>
                  <CommandeContextProvider>
                    <LigneCommandeContextProvider>
                      <App />
                    </LigneCommandeContextProvider>
                  </CommandeContextProvider>
                </PanierContextProvider>
              </AvisContextProvider>
            </ProductContextProvider>
          </CategorieContextProvider>
        </LocalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
