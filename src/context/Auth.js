import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import auth from '../helpers/firebaseConf'

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
    //    onAuthStateChanged(auth, (currentUser) =>{ 
    //         if (currentUser){
    //             setCurrentUser(currentUser)
    //         } else {
    //             setCurrentUser(null)
    //         }
    //     })
    }, []);

    return(
        <AuthContext.Provider
            value={ currentUser }
        >
            {children}
        </AuthContext.Provider>
    )
}

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthContext };

export default AuthProvider

