import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { auth, projectFirestore } from '../firebase/config'
import { functions } from 'firebase/functions'
import { resolveBreakpointValues } from "@mui/system/breakpoints";
const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user
                console.log(user)
                const userRef = collection(projectFirestore, 'user')
                const q = query(userRef, where("uid", "==", user.uid))
                getDocs(q)
                    .then((res) => {
                        console.log(res._snapshot.docChanges.length)
                        if (res._snapshot.docChanges.length == 0) {
                            const userDoc = {
                                'email': user.email,
                                'displayName': user.displayName,
                                'likes': 0,
                                'views': 0,
                                'follows': 0,
                                'posts': []
                            }
                            console.log("here")
                            addDoc(userRef, userDoc).then((res) => {
                                console.log(res)
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    }

                    )
                //Create a JSON document for the data 

                //Becuase we are hosting the cloud function against out firebase 
                // project, we need to now use the admin SDK

                console.log(user)

                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const logOut = () => {
        signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>

    )
}



export const UserAuth = () => {
    return useContext(AuthContext)
}

