/**
 * API route for enterprise demo requests
 * Handles lead capture for institutional buyers
 */

import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const demoRequestSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  organization: z.string().min(1, 'Organization is required').max(200),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required').max(100),
  teamSize: z.string().min(1, 'Team size is required').max(50),
  useCase: z.string().min(1, 'Use case is required').max(200),
  contactMethod: z.enum(['email', 'phone']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = demoRequestSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      const errorMessage = firstError?.message || 'Validation failed';
      return Response.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const { name, organization, email, role, teamSize, useCase, contactMethod } = parsed.data;

    const leadData = {
      name,
      organization,
      email,
      role,
      team_size: teamSize,
      use_case: useCase,
      contact_method: contactMethod,
      created_at: new Date().toISOString(),
    };

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const { error } = await supabase.from('enterprise_leads').insert(leadData);

        if (error) {
          console.error('Supabase insert error:', error);
        }
      } catch (supabaseErr) {
        console.error('Supabase connection error:', supabaseErr);
      }
    }

    try {
      const adminEmail = process.env.ENTERPRISE_DEMO_EMAIL || 'support@mycasevalues.com';

      await sendEmail({
        to: adminEmail,
        subject: `New Enterprise Demo Request from ${name}`,
        html: `
          <h2>New Enterprise Demo Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Team Size:</strong> ${teamSize}</p>
          <p><strong>Primary Use Case:</strong> ${useCase}</p>
          <p><strong>Preferred Contact Method:</strong> ${contactMethod}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        `,
        text: `
New Enterprise Demo Request

Name: ${name}
Organization: ${organization}
Email: ${email}
Role: ${role}
Team Size: ${teamSize}
Primary Use Case: ${useCase}
Preferred Contact Method: ${contactMethod}
Submitted: ${new Date().toISOString()}
        `,
      });
    } catch (emailErr) {
      console.error('Failed to send notification email:', emailErr);
    }

    try {
      await sendEmail({
        to: email,
        subject: 'We Received Your Enterprise Demo Request',
        html: `
          <h2>Thank You</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your interest in MyCaseValue for Enterprise. We received your demo request and will be in touch within one business day.</p>
          <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>
          <p>Best regards,<br/>The MyCaseValue Team</p>
        `,
        text: `
Thank You

Hi ${name},

Thank you for your interest in MyCaseValue for Enterprise. We received your demo request and will be in touch within one business day.

If you have any questions in the meantime, please don't hesitate to reach out.

Best regards,
The MyCaseValue Team
        `,
      });
    } catch (emailErr) {
      console.error('Failed to send confirmation email:', emailErr);
    }

    return Response.json({
      success: true,
      message: 'Demo request submitted successfully',
    });
  } catch (error) {
    console.error('Enterprise demo API error:', error);
    return Response.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
