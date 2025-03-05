"use server";

import { db } from "@/lib/firebase";
import { actionCodeSettings } from "@/lib/utils";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET /api/sign-in verificando se o e-mail do usuario esta vinculado a uma conta
export async function GET(request: Request, response: Response) {
  const email = window.localStorage.getItem("email");
  try {
    const querySnap = await getDocs(query(collection(db, "users")));
    const docs = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (!email) return NextResponse.json({ error: "Email não encontrado" });

    return NextResponse.json(docs);
  } catch (error) {
    console.log(error);
  }
}
