// Import
import { useContext } from "react";

import AuthContext from "../context/AuthContext";

// Custom hook
const useAuth = () => {

    return useContext(
        AuthContext
    );

};

// Export
export default useAuth;