# PlayStation Web Companion

A Next.js dashboard mimicking the PS5 Game Base interface.

## Quick Start
1. Extract the zip.
2. `npm install`
3. Check `src/app/api/psn/route.ts` - ensure your NPSSO is correct.
4. `npm run dev`
5. Visit http://localhost:3000

## Features
- Friend List with Online Status
- Recently Played Games
- Message UI Layout (Mock)

## Why No Voice?
Sony uses a proprietary, encrypted VoIP system for Parties that is not compatible with standard WebRTC used in browsers. For voice chat, you must use the official PlayStation console or mobile app.
