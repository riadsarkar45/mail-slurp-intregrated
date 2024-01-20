import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider()
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const signIn = (email, password) => {
        setLoading(true);
        console.log('Before sign-in:', email, password);
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('Sign-in successful:', result.user);
                return result; // This may not be necessary depending on your use case
            })
            .catch(error => {
                console.error('Sign-in error:', error);
                throw error; // Rethrow the error to propagate it to the calling code
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
                setLoading(false)
            setUser(currentUser)
        })
        return () => {
            return unsubsCribe();
        }

    }, [])
    const authInfo = { user, googleSignIn, signIn, logOut }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;