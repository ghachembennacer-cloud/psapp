import { NextResponse } from "next/server";
import {
  exchangeNpssoForAccessCode,
  exchangeAccessCodeForAuthTokens,
  getFriendsList,
  getBasicPresence,
  getUserTitles
} from "psn-api";

// This tells Vercel not to cache the page so your friends' status stays live
export const dynamic = 'force-dynamic';

// YOUR NPSSO TOKEN
const NPSSO = "dKEEte64tE8lRFQFBm5MDWutKyFRsGezqpVJp3SuzGouaMDuEvjSb8xiSf4mjIG2";

export async function GET() {
  try {
    // 1. Exchange NPSSO for Access Code
    const accessCode = await exchangeNpssoForAccessCode(NPSSO);
    
    // 2. Exchange Access Code for Auth Tokens
    const authTokens = await exchangeAccessCodeForAuthTokens(accessCode);

    // 3. Fetch all required data from PSN
    // We use 'me' to target your own account
    const friendsResponse = await getFriendsList(authTokens, "me");
    const gamesResponse = await getUserTitles(authTokens, "me");
    const presenceResponse = await getBasicPresence(authTokens, "me");

    // 4. Return the data to your frontend
    return NextResponse.json({
      profile: presenceResponse,
      friends: friendsResponse.friends,
      games: gamesResponse.trophyTitles
    });

  } catch (error: any) {
    // Log the error in Vercel so you can see what went wrong
    console.error("PSN API Error Details:", error);

    return NextResponse.json(
      { 
        error: "Failed to fetch PSN data", 
        details: error.message || "Unknown Error" 
      }, 
      { status: 500 }
    );
  }
}
