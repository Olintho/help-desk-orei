import { useState, useEffect, createContext } from "react";
import firebase from "../services/firebaseConection";
import { toast } from 'react-toastify';

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem("userSystem")

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }

        loadStorage()

    }, [])

    // Logging user
    async function signIn(email, password) {

        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid

                const userProfile = await firebase.firestore().collection("users")
                .doc(uid).get()
                let data = {
                    uid: uid,
                    name: userProfile.data().name,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                };

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Bem vindo de volta!')

            })
            .catch((error) => {
                console.log(error)
                toast.error('OPS! Algo deu errado!')
                setLoadingAuth(false)
            })
    }

    // Registering new user
    async function signUp(email, password, name) {
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await firebase.firestore().collection('users').doc(uid)
                    .set({
                        name: name,
                        avatarUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data)
                        storageUser(data)
                        setLoadingAuth(false)
                        toast.success('Bem vindo a plataforma!')
                    })
                    
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('OPS! Algo deu errado!')
                    setLoadingAuth(false)
            })
    }

    function storageUser(data) {
        localStorage.setItem("userSystem", JSON.stringify(data))
    }

    async function signOut() {
        await firebase.auth().signOut()
        localStorage.removeItem("userSystem")
        setUser(null)
    }

    return (

        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signIn,
            signOut,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider