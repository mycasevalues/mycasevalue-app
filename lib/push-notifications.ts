/**
 * Push notification utilities for PWA
 * Handles subscription management and permission requests
 */

/**
 * Check if the browser supports push notifications
 */
export function isPushSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

/**
 * Check if user has granted push notification permission
 */
export function isPushPermissionGranted(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isPushSupported()) return false;
  return Notification.permission === 'granted';
}

/**
 * Check if user is currently subscribed to push notifications
 */
export async function isPushSubscribed(): Promise<boolean> {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  } catch (err) {
    return false;
  }
}

/**
 * Get the current push subscription
 */
export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (!isPushSupported()) return null;

  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (err) {
    return null;
  }
}

/**
 * Request notification permission and subscribe to push notifications
 * Sends subscription to server for storage
 */
export async function subscribeToPush(): Promise<boolean> {
  if (!isPushSupported()) {
    return false;
  }

  try {
    // Request notification permission if not already granted
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        return false;
      }
    }

    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Check if already subscribed
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      // Send to server anyway in case it's not stored there
      await sendSubscriptionToServer(existingSubscription);
      return true;
    }

    // Get VAPID public key from environment
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      return false;
    }

    // Subscribe to push manager
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
    });

    // Send subscription to server
    await sendSubscriptionToServer(subscription);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Unsubscribe from push notifications
 * Removes subscription from server and browser
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  if (!isPushSupported()) {
    return false;
  }

  try {
    // Get current subscription
    const subscription = await getPushSubscription();
    if (!subscription) {
      return true;
    }

    // Notify server to remove subscription
    await removeSubscriptionFromServer(subscription);

    // Unsubscribe from push manager
    const success = await subscription.unsubscribe();
    return success;
  } catch (err) {
    return false;
  }
}

/**
 * Send subscription to server for storage
 */
async function sendSubscriptionToServer(
  subscription: PushSubscription
): Promise<void> {
  try {
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription.toJSON()),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Remove subscription from server
 */
async function removeSubscriptionFromServer(
  subscription: PushSubscription
): Promise<void> {
  try {
    const response = await fetch('/api/push/subscribe', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription.toJSON()),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Convert VAPID public key from base64 to Uint8Array
 * Required for PushManager.subscribe()
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
