/**
 * Mock for web-push module (optional dependency, not always installed).
 * Used by vitest via alias in vitest.config.ts.
 */
export const setVapidDetails = () => {}
export const sendNotification = async () => ({ statusCode: 201 })
export default { setVapidDetails, sendNotification }
