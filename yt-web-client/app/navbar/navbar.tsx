'use client';
import Image from "next/image";
import Link from "next/link";
import SignIn from "./sign-in";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import Upload from "./upload";

export default function Navbar() {
    //Init user state
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    });

    return (
        <nav className="flex justify-between items-center p-4">
            <Link href="/">
                <Image src="/ITube.PNG" alt="ITube Logo" width={120} height={50} />
            </Link>
            {
                user && <Upload />
            }
            <SignIn user={user} />
        </nav>
    );
}