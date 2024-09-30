import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAT7wt3i6lr1tfU1B6NT3yQO6s9EOi7rJY",
  authDomain: "chat-app-gs-8c27a.firebaseapp.com",
  projectId: "chat-app-gs-8c27a",
  storageBucket: "chat-app-gs-8c27a.appspot.com",
  messagingSenderId: "198605775472",
  appId: "1:198605775472:web:50f2d312385e97a2ac8ab5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey There, I am using the chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
        toast.success("Account Created Successfully");
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth,email,password);
        toast.success("Logged In Successfully");
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    try{
        await signOut(auth)
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const resetPass = async (email) => {
    if(!email){
        toast.error("Enter your Email..");
        return null;
    }
    try {
        const userRef = collection(db,'users');
        const q = query(userRef,where("email","==",email));
        const querySnap = await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Sent Successfully");
        }else{
            toast.error("Email doesn't exist");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    
}

export {signup, login, logout, auth, db, resetPass}