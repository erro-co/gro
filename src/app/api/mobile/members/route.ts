import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

async function getAllUsers() {
  try {
    const users = await clerkClient.users.getUserList();
    return users.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function GET() {
  const users = await getAllUsers();
  return NextResponse.json(users);
}
