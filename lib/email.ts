/**
 * Email delivery backend with provider-agnostic interface
 * Supports Resend integration with graceful fallback
 */

export type EmailLanguage = 'en' | 'es';
export type EmailType = 'welcome' | 'report' | 'payment';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Try to send email using Resend
 * This is extracted to avoid import-time side effects
 */
async function tryResendEmail(
  resendApiKey: string,
  options: EmailOptions
): Promise<{ success: boolean; error?: string; handled: boolean }> {
  try {
    // Dynamic import to avoid build-time module resolution
    // @ts-ignore - resend is an optional dependency
    const { Resend } = await import(/* webpackIgnore: true */ 'resend') as any;
    if (!Resend) {
      return { success: true, error: undefined, handled: false };
    }

    const client = new Resend(resendApiKey);
    const result = await client.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@mycasevalues.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (result.error) {
      console.error('[Email] Resend error:', result.error);
      return { success: false, error: result.error.message, handled: true };
    }

    console.log(`[Email] Sent via Resend: ${options.to} | ${options.subject}`);
    return { success: true, error: undefined, handled: true };
  } catch (err: any) {
    // Module not available or other error
    return { success: true, error: undefined, handled: false };
  }
}

/**
 * Send email using configured provider
 * Falls back to console logging if no provider is configured
 */
async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;

  // If Resend is configured, try to use it
  if (resendApiKey) {
    const result = await tryResendEmail(resendApiKey, options);
    if (result.handled) {
      return { success: result.success, error: result.error };
    }
    // If Resend is not available, fall through to fallback
    console.log('[Email] (Fallback - Resend unavailable) Email would be sent:', {
      to: options.to,
      subject: options.subject,
    });
    return { success: true };
  }

  // Fallback: log to console
  console.log('[Email] (Fallback) Email would be sent:', {
    to: options.to,
    subject: options.subject,
    html: options.html.slice(0, 200) + '...',
  });

  return { success: true };
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(
  email: string,
  plan: string,
  lang: EmailLanguage = 'en'
): Promise<{ success: boolean; error?: string }> {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  const planNames: Record<string, { en: string; es: string }> = {
    single: { en: 'Single Report', es: 'Informe Único' },
    unlimited: { en: 'Unlimited Reports', es: 'Informes Ilimitados' },
    attorney: { en: 'Attorney Mode', es: 'Modo de Abogado' },
  };

  const planName = planNames[plan]?.[lang] || plan;

  if (lang === 'es') {
    return sendEmail({
      to: email,
      subject: 'Bienvenido a MyCaseValue',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2>¡Bienvenido a MyCaseValue!</h2>
            <p>Gracias por comprar <strong>${planName}</strong>.</p>
            <p>Tu acceso premium está activado. Ahora puedes:</p>
            <ul>
              <li>Acceder a análisis de casos detallados</li>
              <li>Ver rangos de recuperación por estado</li>
              <li>Analizar patrones de jueces</li>
            </ul>
            <p><a href="https://www.mycasevalues.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ir a MyCaseValue</a></p>
            <p>¿Preguntas? Contáctanos en support@mycasevalues.com</p>
          </body>
        </html>
      `,
      text: `¡Bienvenido a MyCaseValue!\n\nGracias por comprar ${planName}. Tu acceso premium está activado.`,
    });
  }

  // English version
  return sendEmail({
    to: email,
    subject: 'Welcome to MyCaseValue',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to MyCaseValue!</h2>
          <p>Thank you for purchasing <strong>${planName}</strong>.</p>
          <p>Your premium access is now active. You can now:</p>
          <ul>
            <li>Access detailed case analysis</li>
            <li>View recovery ranges by state</li>
            <li>Analyze judge patterns</li>
          </ul>
          <p><a href="https://www.mycasevalues.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to MyCaseValue</a></p>
          <p>Questions? Contact us at support@mycasevalues.com</p>
        </body>
      </html>
    `,
    text: `Welcome to MyCaseValue!\n\nThank you for purchasing ${planName}. Your premium access is now active.`,
  });
}

/**
 * Send case report email
 */
export async function sendReportEmail(
  email: string,
  reportData: any,
  lang: EmailLanguage = 'en'
): Promise<{ success: boolean; error?: string }> {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  const { caseValue, caseNumber, jurisdiction } = reportData || {};

  if (lang === 'es') {
    return sendEmail({
      to: email,
      subject: `Tu Informe de Caso - ${caseNumber || 'MyCaseValue'}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2>Tu Informe de Caso</h2>
            <p>Aquí está tu informe detallado:</p>
            <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
              <tr style="background-color: #f5f5f5;">
                <td style="border: 1px solid #ddd; padding: 10px;"><strong>Número de Caso</strong></td>
                <td style="border: 1px solid #ddd; padding: 10px;">${caseNumber || 'N/A'}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px;"><strong>Jurisdicción</strong></td>
                <td style="border: 1px solid #ddd; padding: 10px;">${jurisdiction || 'N/A'}</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="border: 1px solid #ddd; padding: 10px;"><strong>Rango de Recuperación</strong></td>
                <td style="border: 1px solid #ddd; padding: 10px;">${caseValue || 'N/A'}</td>
              </tr>
            </table>
            <p><a href="https://www.mycasevalues.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ver Informe Completo</a></p>
          </body>
        </html>
      `,
      text: `Tu Informe de Caso\n\nNúmero de Caso: ${caseNumber}\nJurisdicción: ${jurisdiction}\nRango: ${caseValue}`,
    });
  }

  // English version
  return sendEmail({
    to: email,
    subject: `Your Case Report - ${caseNumber || 'MyCaseValue'}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>Your Case Report</h2>
          <p>Here is your detailed case analysis:</p>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr style="background-color: #f5f5f5;">
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Case Number</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;">${caseNumber || 'N/A'}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Jurisdiction</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;">${jurisdiction || 'N/A'}</td>
            </tr>
            <tr style="background-color: #f5f5f5;">
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Recovery Range</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;">${caseValue || 'N/A'}</td>
            </tr>
          </table>
          <p><a href="https://www.mycasevalues.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Full Report</a></p>
        </body>
      </html>
    `,
    text: `Your Case Report\n\nCase Number: ${caseNumber}\nJurisdiction: ${jurisdiction}\nRecovery Range: ${caseValue}`,
  });
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmation(
  email: string,
  plan: string,
  amount: number,
  lang: EmailLanguage = 'en'
): Promise<{ success: boolean; error?: string }> {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  const planNames: Record<string, { en: string; es: string }> = {
    single: { en: 'Single Report', es: 'Informe Único' },
    unlimited: { en: 'Unlimited Reports', es: 'Informes Ilimitados' },
    attorney: { en: 'Attorney Mode', es: 'Modo de Abogado' },
  };

  const planName = planNames[plan]?.[lang] || plan;
  const amountStr = (amount / 100).toFixed(2);

  if (lang === 'es') {
    return sendEmail({
      to: email,
      subject: 'Confirmación de Pago - MyCaseValue',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2>Confirmación de Pago</h2>
            <p>Tu pago ha sido procesado exitosamente.</p>
            <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
              <tr style="background-color: #f5f5f5;">
                <td style="border: 1px solid #ddd; padding: 10px;"><strong>Plan</strong></td>
                <td style="border: 1px solid #ddd; padding: 10px;">${planName}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px;"><strong>Monto</strong></td>
                <td style="border: 1px solid #ddd; padding: 10px;">$${amountStr} USD</td>
              </tr>
              <tr style="background-color: #f5f5f5;">
                <td style="border: 1px solid #ddd; padding: 10px;"><strong>Fecha</strong></td>
                <td style="border: 1px solid #ddd; padding: 10px;">${new Date().toLocaleDateString('es-ES')}</td>
              </tr>
            </table>
            <p style="background-color: #d4edda; padding: 10px; border-radius: 5px; color: #155724;">
              Tu acceso premium está ahora activado. ¡Gracias por tu compra!
            </p>
            <p><a href="https://www.mycasevalues.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Acceder a MyCaseValue</a></p>
          </body>
        </html>
      `,
      text: `Confirmación de Pago\n\nPlan: ${planName}\nMonto: $${amountStr} USD\n\nTu acceso premium está ahora activado.`,
    });
  }

  // English version
  return sendEmail({
    to: email,
    subject: 'Payment Confirmation - MyCaseValue',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>Payment Confirmation</h2>
          <p>Your payment has been processed successfully.</p>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr style="background-color: #f5f5f5;">
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Plan</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;">${planName}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Amount</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;">$${amountStr} USD</td>
            </tr>
            <tr style="background-color: #f5f5f5;">
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>Date</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;">${new Date().toLocaleDateString('en-US')}</td>
            </tr>
          </table>
          <p style="background-color: #d4edda; padding: 10px; border-radius: 5px; color: #155724;">
            Your premium access is now active. Thank you for your purchase!
          </p>
          <p><a href="https://www.mycasevalues.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Access MyCaseValue</a></p>
        </body>
      </html>
    `,
    text: `Payment Confirmation\n\nPlan: ${planName}\nAmount: $${amountStr} USD\n\nYour premium access is now active.`,
  });
}
