import { clerkClient, User } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

type ProfileType = "member" | "trainer" | "admin";

type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  trainer: string | null;
  profileType: ProfileType;
  createdAt: number;
  phoneNumber: string | null;
};

class UserFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserFetchError";
  }
}

function mapUserToProfile(user: User): Profile {
  return {
    id: user.id,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.emailAddresses[0]?.emailAddress ?? "",
    imageUrl: user.imageUrl,
    trainer: user.unsafeMetadata.trainer as string | null,
    profileType: user.unsafeMetadata.profileType as ProfileType,
    createdAt: user.createdAt,
    phoneNumber: user.phoneNumbers[0]?.phoneNumber ?? null,
  } as const;
}

async function getAllUsers(): Promise<Array<Profile>> {
  try {
    const data = await clerkClient.users.getUserList();
    return data.data.map(mapUserToProfile);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new UserFetchError("Failed to fetch users");
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof UserFetchError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
