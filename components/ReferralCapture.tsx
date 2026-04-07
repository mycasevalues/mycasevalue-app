'use client';

/**
 * ReferralCapture - Silent referral code capture component
 * On mount, checks for ?ref=[code] query parameter and stores it in a cookie
 * No visual output - works silently in the background
 */

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ReferralCaptureContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const referralCode = searchParams?.get('ref');

    if (referralCode && /^[A-Z0-9]{8}$/.test(referralCode)) {
      // Store referral code in cookie with 7-day expiration
      const maxAge = 604800; // 7 days in seconds
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + maxAge);

      // Set cookie using document.cookie
      document.cookie = `referral_code=${encodeURIComponent(referralCode)}; path=/; max-age=${maxAge}; samesite=Lax`;
    }
  }, [searchParams]);

  // Silent component - no visual output
  return null;
}

/**
 * ReferralCapture wrapped in Suspense
 * Safe to use in layouts with useSearchParams
 */
export default function ReferralCapture() {
  return (
    <Suspense fallback={null}>
      <ReferralCaptureContent />
    </Suspense>
  );
}
