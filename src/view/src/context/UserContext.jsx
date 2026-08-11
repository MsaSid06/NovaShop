import { createContext, useState, useEffect, useContext } from "react";
import LocalContext from "./Localhost";
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const { localhost } = useContext(LocalContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://${localhost}/Boutique/src/controllers/api_users.php`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [localhost]);

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
