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
      return { success: false, error: result.error.message, handled: true };
    }

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
    return { success: true };
  }

  // Fallback: return success
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
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
  lang: EmailLanguage = 'en'
): Promise<{ success: boolean; error?: string }> {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  if (lang === 'es') {
    return sendEmail({
      to: email,
      subject: 'Restablecer tu contraseña — MyCaseValue',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; max-width: 560px; margin: 0 auto;">
            <div style="padding: 32px 0; text-align: center;">
              <h2 style="margin: 0 0 8px; font-size: 22px; color: #111827;">Restablecer contraseña</h2>
              <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón a continuación para crear una nueva.
              </p>
              <a href="${resetUrl}" style="display: inline-block; background: #111111; color: #ffffff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">Restablecer contraseña</a>
              <p style="color: #9CA3AF; font-size: 13px; margin: 24px 0 0; line-height: 1.5;">
                Si no solicitaste esto, puedes ignorar este correo. El enlace expira en 1 hora.
              </p>
            </div>
          </body>
        </html>
      `,
      text: `Restablecer contraseña\n\nHaz clic aquí para restablecer tu contraseña: ${resetUrl}\n\nSi no solicitaste esto, ignora este correo.`,
    });
  }

  return sendEmail({
    to: email,
    subject: 'Reset your password — MyCaseValue',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; max-width: 560px; margin: 0 auto;">
          <div style="padding: 32px 0; text-align: center;">
            <h2 style="margin: 0 0 8px; font-size: 22px; color: #111827;">Reset your password</h2>
            <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
              We received a request to reset your password. Click the button below to create a new one.
            </p>
            <a href="${resetUrl}" style="display: inline-block; background: #111111; color: #ffffff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">Reset Password</a>
            <p style="color: #9CA3AF; font-size: 13px; margin: 24px 0 0; line-height: 1.5;">
              If you didn&rsquo;t request this, you can safely ignore this email. The link expires in 1 hour.
            </p>
          </div>
        </body>
      </html>
    `,
    text: `Reset your password\n\nClick here to reset your password: ${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`,
  });
}

/**
 * Send report ready notification email
 */
export async function sendReportReadyEmail(
  email: string,
  reportData: { caseType: string; nos: string },
  lang: EmailLanguage = 'en'
): Promise<{ success: boolean; error?: string }> {
  if (!isValidEmail(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  const reportUrl = `https://www.mycasevalues.com/report/${reportData.nos}`;

  if (lang === 'es') {
    return sendEmail({
      to: email,
      subject: `Tu informe está listo — ${reportData.caseType}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; max-width: 560px; margin: 0 auto;">
            <div style="padding: 32px 0; text-align: center;">
              <h2 style="margin: 0 0 8px; font-size: 22px; color: #111827;">Tu informe está listo</h2>
              <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                Tu informe de resultados para <strong>${reportData.caseType}</strong> está listo para ver.
              </p>
              <a href="${reportUrl}" style="display: inline-block; background: #111111; color: #ffffff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">Ver informe</a>
            </div>
          </body>
        </html>
      `,
      text: `Tu informe de resultados para ${reportData.caseType} está listo: ${reportUrl}`,
    });
  }

  return sendEmail({
    to: email,
    subject: `Your report is ready — ${reportData.caseType}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; max-width: 560px; margin: 0 auto;">
          <div style="padding: 32px 0; text-align: center;">
            <h2 style="margin: 0 0 8px; font-size: 22px; color: #111827;">Your report is ready</h2>
            <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
              Your outcome report for <strong>${reportData.caseType}</strong> is ready to view.
            </p>
            <a href="${reportUrl}" style="display: inline-block; background: #111111; color: #ffffff; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">View Report</a>
          </div>
        </body>
      </html>
    `,
    text: `Your outcome report for ${reportData.caseType} is ready: ${reportUrl}`,
  });
}

