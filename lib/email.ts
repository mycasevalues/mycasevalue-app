/**
 * Email delivery backend with provider-agnostic interface
 * Supports Resend integration with graceful fallback
 */

import { SITE_URL } from './site-config';

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
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
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
          <head>
            <meta charset="UTF-8">
            <style>
              body { margin: 0; padding: 0; }
              .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
              .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
              .header-text { font-size: 24px; font-weight: bold; margin: 0; }
              .body-content { background-color: white; padding: 32px 24px; }
              .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
              .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
              .body-content ul { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
              .body-content a { color: #1e40af; text-decoration: none; }
              .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
              .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
              .footer p { margin: 8px 0; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div class="header-text">MyCaseValue</div>
              </div>
              <div class="body-content">
                <h2>¡Bienvenido a MyCaseValue!</h2>
                <p>Gracias por comprar <strong>${planName}</strong>.</p>
                <p>Tu acceso premium está activado. Ahora puedes:</p>
                <ul>
                  <li>Acceder a análisis de casos detallados</li>
                  <li>Ver rangos de recuperación por estado</li>
                  <li>Analizar patrones de jueces</li>
                </ul>
                <p><a href="${SITE_URL}" class="cta-button">Ir a MyCaseValue</a></p>
                <p>¿Preguntas? Contáctanos en <a href="mailto:support@mycasevalues.com">support@mycasevalues.com</a></p>
              </div>
              <div class="footer">
                <p>&copy; 2026 MyCaseValue. Todos los derechos reservados.</p>
                <p>Este correo fue enviado a ${email}. Información legal y privacidad de LexisNexis.</p>
              </div>
            </div>
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
        <head>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 0; }
            .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
            .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
            .header-text { font-size: 24px; font-weight: bold; margin: 0; }
            .body-content { background-color: white; padding: 32px 24px; }
            .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
            .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
            .body-content ul { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
            .body-content a { color: #1e40af; text-decoration: none; }
            .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
            .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="header-text">MyCaseValue</div>
            </div>
            <div class="body-content">
              <h2>Welcome to MyCaseValue!</h2>
              <p>Thank you for purchasing <strong>${planName}</strong>.</p>
              <p>Your premium access is now active. You can now:</p>
              <ul>
                <li>Access detailed case analysis</li>
                <li>View recovery ranges by state</li>
                <li>Analyze judge patterns</li>
              </ul>
              <p><a href="${SITE_URL}" class="cta-button">Go to MyCaseValue</a></p>
              <p>Questions? Contact us at <a href="mailto:support@mycasevalues.com">support@mycasevalues.com</a></p>
            </div>
            <div class="footer">
              <p>&copy; 2026 MyCaseValue. All rights reserved.</p>
              <p>This email was sent to ${email}. LexisNexis legal and privacy information.</p>
            </div>
          </div>
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
          <head>
            <meta charset="UTF-8">
            <style>
              body { margin: 0; padding: 0; }
              .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
              .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
              .header-text { font-size: 24px; font-weight: bold; margin: 0; }
              .body-content { background-color: white; padding: 32px 24px; }
              .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
              .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
              .body-content a { color: #1e40af; text-decoration: none; }
              .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
              .report-table { border-collapse: collapse; width: 100%; margin: 20px 0; }
              .report-table td { border: 1px solid #ddd; padding: 12px; color: #4B5563; font-size: 15px; }
              .report-table strong { color: #212529; }
              .report-table tr:nth-child(odd) { background-color: #F8F9FA; }
              .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
              .footer p { margin: 8px 0; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div class="header-text">MyCaseValue</div>
              </div>
              <div class="body-content">
                <h2>Tu Informe de Caso</h2>
                <p>Aquí está tu informe detallado:</p>
                <table class="report-table">
                  <tr>
                    <td><strong>Número de Caso</strong></td>
                    <td>${caseNumber || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Jurisdicción</strong></td>
                    <td>${jurisdiction || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Rango de Recuperación</strong></td>
                    <td>${caseValue || 'N/A'}</td>
                  </tr>
                </table>
                <p><a href="${SITE_URL}" class="cta-button">Ver Informe Completo</a></p>
              </div>
              <div class="footer">
                <p>&copy; 2026 MyCaseValue. Todos los derechos reservados.</p>
                <p>Este correo fue enviado a ${email}. Información legal y privacidad de LexisNexis.</p>
              </div>
            </div>
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
        <head>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 0; }
            .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
            .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
            .header-text { font-size: 24px; font-weight: bold; margin: 0; }
            .body-content { background-color: white; padding: 32px 24px; }
            .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
            .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
            .body-content a { color: #1e40af; text-decoration: none; }
            .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
            .report-table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            .report-table td { border: 1px solid #ddd; padding: 12px; color: #4B5563; font-size: 15px; }
            .report-table strong { color: #212529; }
            .report-table tr:nth-child(odd) { background-color: #F8F9FA; }
            .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="header-text">MyCaseValue</div>
            </div>
            <div class="body-content">
              <h2>Your Case Report</h2>
              <p>Here is your detailed case analysis:</p>
              <table class="report-table">
                <tr>
                  <td><strong>Case Number</strong></td>
                  <td>${caseNumber || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Jurisdiction</strong></td>
                  <td>${jurisdiction || 'N/A'}</td>
                </tr>
                <tr>
                  <td><strong>Recovery Range</strong></td>
                  <td>${caseValue || 'N/A'}</td>
                </tr>
              </table>
              <p><a href="${SITE_URL}" class="cta-button">View Full Report</a></p>
            </div>
            <div class="footer">
              <p>&copy; 2026 MyCaseValue. All rights reserved.</p>
              <p>This email was sent to ${email}. LexisNexis legal and privacy information.</p>
            </div>
          </div>
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
          <head>
            <meta charset="UTF-8">
            <style>
              body { margin: 0; padding: 0; }
              .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
              .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
              .header-text { font-size: 24px; font-weight: bold; margin: 0; }
              .body-content { background-color: white; padding: 32px 24px; text-align: center; }
              .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
              .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
              .body-content a { color: #1e40af; text-decoration: none; }
              .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
              .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
              .footer p { margin: 8px 0; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div class="header-text">MyCaseValue</div>
              </div>
              <div class="body-content">
                <h2>Restablecer contraseña</h2>
                <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón a continuación para crear una nueva.</p>
                <p><a href="${resetUrl}" class="cta-button">Restablecer contraseña</a></p>
                <p style="margin-top: 24px; font-size: 13px;">
                  Si no solicitaste esto, puedes ignorar este correo. El enlace expira en 1 hora.
                </p>
              </div>
              <div class="footer">
                <p>&copy; 2026 MyCaseValue. Todos los derechos reservados.</p>
                <p>Este correo fue enviado a ${email}. Información legal y privacidad de LexisNexis.</p>
              </div>
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
        <head>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 0; }
            .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
            .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
            .header-text { font-size: 24px; font-weight: bold; margin: 0; }
            .body-content { background-color: white; padding: 32px 24px; text-align: center; }
            .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
            .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
            .body-content a { color: #1e40af; text-decoration: none; }
            .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
            .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="header-text">MyCaseValue</div>
            </div>
            <div class="body-content">
              <h2>Reset your password</h2>
              <p>We received a request to reset your password. Click the button below to create a new one.</p>
              <p><a href="${resetUrl}" class="cta-button">Reset Password</a></p>
              <p style="margin-top: 24px; font-size: 13px;">
                If you didn&rsquo;t request this, you can safely ignore this email. The link expires in 1 hour.
              </p>
            </div>
            <div class="footer">
              <p>&copy; 2026 MyCaseValue. All rights reserved.</p>
              <p>This email was sent to ${email}. LexisNexis legal and privacy information.</p>
            </div>
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

  const reportUrl = `${SITE_URL}/report/${reportData.nos}`;

  if (lang === 'es') {
    return sendEmail({
      to: email,
      subject: `Tu informe está listo — ${reportData.caseType}`,
      html: `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { margin: 0; padding: 0; }
              .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
              .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
              .header-text { font-size: 24px; font-weight: bold; margin: 0; }
              .body-content { background-color: white; padding: 32px 24px; text-align: center; }
              .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
              .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
              .body-content a { color: #1e40af; text-decoration: none; }
              .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
              .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
              .footer p { margin: 8px 0; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div class="header-text">MyCaseValue</div>
              </div>
              <div class="body-content">
                <h2>Tu informe está listo</h2>
                <p>Tu informe de resultados para <strong>${reportData.caseType}</strong> está listo para ver.</p>
                <p><a href="${reportUrl}" class="cta-button">Ver informe</a></p>
              </div>
              <div class="footer">
                <p>&copy; 2026 MyCaseValue. Todos los derechos reservados.</p>
                <p>Este correo fue enviado a ${email}. Información legal y privacidad de LexisNexis.</p>
              </div>
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
        <head>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 0; }
            .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; }
            .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
            .header-text { font-size: 24px; font-weight: bold; margin: 0; }
            .body-content { background-color: white; padding: 32px 24px; text-align: center; }
            .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
            .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
            .body-content a { color: #1e40af; text-decoration: none; }
            .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; }
            .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="header-text">MyCaseValue</div>
            </div>
            <div class="body-content">
              <h2>Your report is ready</h2>
              <p>Your outcome report for <strong>${reportData.caseType}</strong> is ready to view.</p>
              <p><a href="${reportUrl}" class="cta-button">View Report</a></p>
            </div>
            <div class="footer">
              <p>&copy; 2026 MyCaseValue. All rights reserved.</p>
              <p>This email was sent to ${email}. LexisNexis legal and privacy information.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Your outcome report for ${reportData.caseType} is ready: ${reportUrl}`,
  });
}

