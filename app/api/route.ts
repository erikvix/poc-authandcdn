"use server";

import { db } from "@/lib/firebase";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export async function GET(request: Request) {
  try {
    const query = await getDocs(collection(db, "users"));
    return NextResponse.json(query);
  } catch (error) {
    console.log(error);
  }
}
