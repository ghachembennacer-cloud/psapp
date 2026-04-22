export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import {
  exchangeNpssoForAccessCode,
  exchangeAccessCodeForAuthTokens,
  getFriendsList,
  getUserPresence,
  getUserTitles
} from "psn-api";

// Use your latest NPSSO here
const NPSSO = "dKEEte64tE8lRFQFBm5MDWutKyFRsGezqpVJp3SuzGouaMDuEvjSb8xiSf4mjIG2";

export async function GET() {
  try {
    const accessCode = await exchangeNpssoForAccessCode(NPSSO);
    const authTokens = await exchangeAccessCodeForAuthTokens(accessCode);

    const friendsResponse = await getFriendsList(authTokens, "me");
    const gamesResponse = await getUserTitles(authTokens, "me");
    const presenceResponse = await getUserPresence(authTokens, "me");

    return NextResponse.json({
      profile: presenceResponse,
      friends: friendsResponse.friends,
      games: gamesResponse.trophyTitles
    });
  } catch (error: any) {
    console.error("PSN API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch PSN data" }, { status: 500 });
  }
}
