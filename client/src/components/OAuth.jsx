import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch,useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'

function OAuth() {

    const dispatch = useDispatch();
    const handleGoogleClick = async()=>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider);
            console.log(result);
            console.log(result.user.displayName);
            console.log(result.user.email);
            console.log(result.user.photoURL);

            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })


            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data))
    
        

        }catch(e){

        }
    }

    return (
     <button onClick={handleGoogleClick} type='button' 
     className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        continue with google
     </button>   
    )
}

export default OAuth