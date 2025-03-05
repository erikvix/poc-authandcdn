"use server";

import { db } from "@/lib/firebase";
import { actionCodeSettings } from "@/lib/utils";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const res = await request.json();
    if (!res) return response.json;
    {
      error: "Email não informado";
    }
    console.log(res);
    // const auth = getAuth();
    // sendSignInLinkToEmail(auth, res.email, actionCodeSettings).then(() => {
    //   window.localStorage.setItem("email", res.email);
    // });
    return NextResponse.json({ message: "Link enviado com sucesso" });
  } catch (error) {
    console.log(error);
  }
}
