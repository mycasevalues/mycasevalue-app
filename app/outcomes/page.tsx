/**
 * /outcomes — Settlement Ranges landing page.
 * Redirects to /cases which has settlement/outcome data.
 * This prevents 404 when homepage "Settlement Ranges" card links here.
 */
import { redirect } from 'next/navigation';

export default function OutcomesPage() {
  redirect('/cases');
}
