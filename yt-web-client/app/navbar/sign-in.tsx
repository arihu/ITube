'use client';
import { Fragment } from "react";
import { signInWithGoogle, signOut } from "../firebase/firebase";
import { User } from "firebase/auth";

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {
    return (
        <Fragment>
            {
                user ?
                    (
                        <button className="inline-block border-[1px] border-[solid] border-[gray] text-[#065fd4] px-[20px] py-[10px] rounded-[24px] font-medium bg-slate-400 hover:bg-slate-600 hover:border-transparent" onClick={signOut}>
                            Sign Out
                        </button>
                    ) : (
                        <button className="inline-block border-[1px] border-[solid] border-[gray] text-[#065fd4] px-[20px] py-[10px] rounded-[24px] font-medium bg-slate-400 hover:bg-sky-500 hover:border-transparent" onClick={signInWithGoogle}>
                            Sign In
                        </button>
                    )
            }
        </Fragment >
    )
}