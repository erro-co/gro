import { clerkClient, User } from "@clerk/clerk-sdk-node";
import { NextRequest, NextResponse } from "next/server";

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
    createdAt: user.createdAt,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.emailAddresses[0]?.emailAddress ?? "",
    imageUrl: user.imageUrl,
    trainer: (user.unsafeMetadata.trainer as string) ?? null,
    profileType: (user.unsafeMetadata.profileType as ProfileType) ?? "member",
    phoneNumber: user.phoneNumbers[0]?.phoneNumber ?? null,
  };
}

async function getUser(userId: string): Promise<Profile> {
  try {
    const data = await clerkClient.users.getUser(userId);
    return mapUserToProfile(data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new UserFetchError("Failed to fetch users");
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = request.nextUrl.searchParams.get("userID");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await getUser(userId);

    return NextResponse.json(user);
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
