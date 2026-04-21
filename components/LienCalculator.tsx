'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  grossSettlement: string;
  caseType: string;
  medicareBenefits: boolean;
  medicareAmount: string;
  medicaidBenefits: boolean;
  medicaidAmount: string;
  workersCompBenefits: boolean;
  workersCompAmount: string;
  attorneyFeePercent: string;
  caseExpenses: string;
}

interface CalculationResult {
  grossSettlement: number;
  attorneyFees: number;
  attorneyFeePercent: number;
  caseExpenses: number;
  netBeforeLiens: number;
  medicareLiensLow: number;
  medicareLiensHigh: number;
  medicaidLiensLow: number;
  medicaidLiensHigh: number;
  workersCompLiens: number;
  totalLiensLow: number;
  totalLiensHigh: number;
  netRecoveryLow: number;
  netRecoveryHigh: number;
}

const CASE_TYPES = [
  { label: 'Personal Injury - Motor Vehicle Accident', value: '3101' },
  { label: 'Personal Injury - Workplace Injury', value: '3102' },
  { label: 'Personal Injury - Premises Liability', value: '3103' },
  { label: 'Personal Injury - Products Liability', value: '3104' },
  { label: 'Personal Injury - Medical Malpractice', value: '3105' },
  { label: 'Asbestos / Toxic Tort', value: '3106' },
  { label: 'Other Personal Injury', value: '3107' },
  { label: 'Contract Dispute', value: '4101' },
  { label: 'ERISA Benefits Dispute', value: '5001' },
  { label: 'Social Security Benefits', value: '5003' },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function parseCurrency(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function LienCalculator() {
  const [formData, setFormData] = useState<FormData>({
    grossSettlement: '',
    caseType: '3101',
    medicareBenefits: false,
    medicareAmount: '',
    medicaidBenefits: false,
    medicaidAmount: '',
    workersCompBenefits: false,
    workersCompAmount: '',
    attorneyFeePercent: '33.33',
    caseExpenses: '0',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkboxElement = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkboxElement.checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const gross = parseCurrency(formData.grossSettlement);
    if (!formData.grossSettlement || gross <= 0) {
      newErrors.grossSettlement = 'Gross settlement amount is required and must be greater than 0';
    }

    if (formData.medicareBenefits && !formData.medicareAmount) {
      newErrors.medicareAmount = 'Medicare amount is required if benefits were received';
    }

    if (formData.medicaidBenefits && !formData.medicaidAmount) {
      newErrors.medicaidAmount = 'Medicaid amount is required if benefits were received';
    }

    if (formData.workersCompBenefits && !formData.workersCompAmount) {
      newErrors.workersCompAmount = 'Workers comp amount is required if benefits were received';
    }

    const attorneyPercent = parseFloat(formData.attorneyFeePercent);
    if (isNaN(attorneyPercent) || attorneyPercent < 0 || attorneyPercent > 100) {
      newErrors.attorneyFeePercent = 'Attorney fee percentage must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const grossSettlement = parseCurrency(formData.grossSettlement);
    const attorneyFeePercent = parseFloat(formData.attorneyFeePercent);
    const caseExpenses = parseCurrency(formData.caseExpenses);
    const medicareAmount = parseCurrency(formData.medicareAmount);
    const medicaidAmount = parseCurrency(formData.medicaidAmount);
    const workersCompAmount = parseCurrency(formData.workersCompAmount);

    // Calculate attorney fees
    const attorneyFees = Math.round(grossSettlement * (attorneyFeePercent / 100));

    // Net before liens
    const netBeforeLiens = grossSettlement - attorneyFees - caseExpenses;

    // Medicare Lien calculation
    // Medicare MSP reduction: typically allows reduction to 1/3 of net amount (high negotiation success)
    const medicareLiensLow = Math.round(medicareAmount * (1 / 3)); // Negotiated reduction
    const medicareLiensHigh = medicareAmount; // Full conditional payment

    // Medicaid Lien calculation
    // Medicaid varies significantly by state (typically 20-50% reduction possible through negotiation)
    const medicaidLiensLow = Math.round(medicaidAmount * 0.4); // Conservative reduction estimate
    const medicaidLiensHigh = medicaidAmount; // Full amount due

    // Workers Comp Lien
    // Subject to reduction under applicable law, but typically full amount
    const workersCompLiens = formData.workersCompBenefits ? Math.min(workersCompAmount, netBeforeLiens) : 0;

    // Total liens
    const totalLiensLow = medicareLiensLow + medicaidLiensLow + workersCompLiens;
    const totalLiensHigh = medicareLiensHigh + medicaidLiensHigh + workersCompLiens;

    // Net recovery to client
    const netRecoveryHigh = netBeforeLiens - totalLiensLow;
    const netRecoveryLow = netBeforeLiens - totalLiensHigh;

    setResult({
      grossSettlement,
      attorneyFees,
      attorneyFeePercent,
      caseExpenses,
      netBeforeLiens,
      medicareLiensLow,
      medicareLiensHigh,
      medicaidLiensLow,
      medicaidLiensHigh,
      workersCompLiens,
      totalLiensLow,
      totalLiensHigh,
      netRecoveryLow,
      netRecoveryHigh,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Input Section */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: 'clamp(24px, 4vw, 40px)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text1)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
          Settlement Details
        </h2>

        <form onSubmit={handleCalculate} style={{ display: 'grid', gap: 24 }}>
          {/* Gross Settlement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>
              Gross Settlement Amount <span style={{ color: 'var(--data-negative, #B01E1E)' }}>*</span>
            </label>
            <input
              type="text"
              name="grossSettlement"
              placeholder="$0"
              value={formData.grossSettlement}
              onChange={handleInputChange}
              style={{
                padding: '12px 14px',
                border: errors.grossSettlement ? '2px solid var(--color-error)' : '1px solid var(--bdr)',
                borderRadius: '4px',
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--surf)',
                color: 'var(--text1)',
                outline: 'none',
                transition: 'border-color 200ms',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--link)')}
              onBlur={(e) => (e.target.style.borderColor = errors.grossSettlement ? 'var(--color-error)' : 'var(--bdr)')}
            />
            {errors.grossSettlement && <div style={{ fontSize: 12, color: 'var(--color-error)', fontFamily: 'var(--font-ui)' }}>{errors.grossSettlement}</div>}
          </div>

          {/* Case Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>
              Case Type
            </label>
            <select
              name="caseType"
              value={formData.caseType}
              onChange={handleInputChange}
              style={{
                padding: '12px 14px',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
                fontSize: 14,
                fontFamily: 'var(--font-ui)',
                backgroundColor: 'var(--surf)',
                color: 'var(--text1)',
                outline: 'none',
                cursor: 'pointer',
                transition: 'border-color 200ms',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--link)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--bdr)')}
            >
              {CASE_TYPES.map(caseType => (
                <option key={caseType.value} value={caseType.value}>
                  {caseType.label}
                </option>
              ))}
            </select>
          </div>

          {/* Medicare */}
          <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: '4px', padding: 16, border: '1px solid var(--link-light, #BAE6FD)' }} /* Note: keeping blue-tinted colors for medical benefits section */>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <input
                type="checkbox"
                name="medicareBenefits"
                checked={formData.medicareBenefits}
                onChange={handleInputChange}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', cursor: 'pointer', margin: 0 }}>
                Medicare benefits received?
              </label>
            </div>
            {formData.medicareBenefits && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                  Estimated Medicare expenditures
                </label>
                <input
                  type="text"
                  name="medicareAmount"
                  placeholder="$0"
                  value={formData.medicareAmount}
                  onChange={handleInputChange}
                  style={{
                    padding: '8px 12px',
                    border: errors.medicareAmount ? '2px solid var(--data-negative)' : '1px solid var(--bdr)',
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--card, #FFFFFF)',
                    color: 'var(--text1)',
                    outline: 'none',
                    transition: 'border-color 200ms',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--link)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.medicareAmount ? 'var(--data-negative)' : 'var(--bdr)')}
                />
                {errors.medicareAmount && <div style={{ fontSize: 12, color: 'var(--color-error)', fontFamily: 'var(--font-ui)' }}>{errors.medicareAmount}</div>}
              </div>
            )}
          </div>

          {/* Medicaid */}
          <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: '4px', padding: 16, border: '1px solid var(--link-light, #BAE6FD)' }} /* Note: keeping blue-tinted colors for medical benefits section */>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <input
                type="checkbox"
                name="medicaidBenefits"
                checked={formData.medicaidBenefits}
                onChange={handleInputChange}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', cursor: 'pointer', margin: 0 }}>
                Medicaid benefits received?
              </label>
            </div>
            {formData.medicaidBenefits && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                  Estimated Medicaid amount
                </label>
                <input
                  type="text"
                  name="medicaidAmount"
                  placeholder="$0"
                  value={formData.medicaidAmount}
                  onChange={handleInputChange}
                  style={{
                    padding: '8px 12px',
                    border: errors.medicaidAmount ? '2px solid var(--data-negative)' : '1px solid var(--bdr)',
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--card, #FFFFFF)',
                    color: 'var(--text1)',
                    outline: 'none',
                    transition: 'border-color 200ms',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--link)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.medicaidAmount ? 'var(--data-negative)' : 'var(--bdr)')}
                />
                {errors.medicaidAmount && <div style={{ fontSize: 12, color: 'var(--data-negative, #B01E1E)', fontFamily: 'var(--font-ui)' }}>{errors.medicaidAmount}</div>}
              </div>
            )}
          </div>

          {/* Workers Compensation */}
          <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: '4px', padding: 16, border: '1px solid var(--link-light, #BAE6FD)' }} /* Note: keeping blue-tinted colors for medical benefits section */>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <input
                type="checkbox"
                name="workersCompBenefits"
                checked={formData.workersCompBenefits}
                onChange={handleInputChange}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', cursor: 'pointer', margin: 0 }}>
                Workers compensation received?
              </label>
            </div>
            {formData.workersCompBenefits && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                  Total workers comp received
                </label>
                <input
                  type="text"
                  name="workersCompAmount"
                  placeholder="$0"
                  value={formData.workersCompAmount}
                  onChange={handleInputChange}
                  style={{
                    padding: '8px 12px',
                    border: errors.workersCompAmount ? '2px solid var(--data-negative)' : '1px solid var(--bdr)',
                    borderRadius: 4,
                    fontSize: 14,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--card, #FFFFFF)',
                    color: 'var(--text1)',
                    outline: 'none',
                    transition: 'border-color 200ms',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--link)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.workersCompAmount ? 'var(--data-negative)' : 'var(--bdr)')}
                />
                {errors.workersCompAmount && <div style={{ fontSize: 12, color: 'var(--data-negative, #B01E1E)', fontFamily: 'var(--font-ui)' }}>{errors.workersCompAmount}</div>}
              </div>
            )}
          </div>

          {/* Attorney Fee Percentage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>
              Attorney Fee Percentage (%)
            </label>
            <input
              type="number"
              name="attorneyFeePercent"
              placeholder="33.33"
              value={formData.attorneyFeePercent}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              max="100"
              style={{
                padding: '12px 14px',
                border: errors.attorneyFeePercent ? '2px solid #EF4444' : '1px solid var(--bdr)',
                borderRadius: '4px',
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--surf)',
                color: 'var(--text1)',
                outline: 'none',
                transition: 'border-color 200ms',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--link)')}
              onBlur={(e) => (e.target.style.borderColor = errors.attorneyFeePercent ? 'var(--data-negative, #B01E1E)' : 'var(--bdr)')}
            />
            {errors.attorneyFeePercent && <div style={{ fontSize: 12, color: 'var(--data-negative, #B01E1E)', fontFamily: 'var(--font-ui)' }}>{errors.attorneyFeePercent}</div>}
          </div>

          {/* Case Expenses */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>
              Case Expenses Estimate
            </label>
            <input
              type="text"
              name="caseExpenses"
              placeholder="$0"
              value={formData.caseExpenses}
              onChange={handleInputChange}
              style={{
                padding: '12px 14px',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--surf)',
                color: 'var(--text1)',
                outline: 'none',
                transition: 'border-color 200ms',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--link)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--bdr)')}
            />
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            style={{
              padding: '16px 24px',
              background: 'var(--link)',
              color: 'var(--chrome-text, #fff)',
              border: 'none',
              borderRadius: '4px',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'var(--font-ui)',
              cursor: 'pointer',
              transition: 'background-color 200ms',
              marginTop: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--link)')}
          >
            Calculate Liens
          </button>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: 'clamp(24px, 4vw, 40px)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text1)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
            Lien Estimate Breakdown
          </h2>

          {/* Calculation breakdown */}
          <div style={{ display: 'grid', gap: 0, marginBottom: 32, borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--bdr)' }}>
            {/* Gross Settlement */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'var(--surf)', borderBottom: '1px solid var(--bdr)' }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                Gross Settlement Amount
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.grossSettlement)}
              </div>
            </div>

            {/* Attorney Fees */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#FFF', borderBottom: '1px solid var(--bdr)' }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                Attorney Fees ({result.attorneyFeePercent.toFixed(2)}%)
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--data-negative, #B01E1E)', fontFamily: 'var(--font-mono)' }}>
                -{formatCurrency(result.attorneyFees)}
              </div>
            </div>

            {/* Case Expenses */}
            {result.caseExpenses > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'var(--surf)', borderBottom: '1px solid var(--bdr)' }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                  Case Expenses
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--data-negative, #B01E1E)', fontFamily: 'var(--font-mono)' }}>
                  -{formatCurrency(result.caseExpenses)}
                </div>
              </div>
            )}

            {/* Net Before Liens */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'rgba(34,197,94,0.1)', borderBottom: '1px solid var(--cw-border)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>
                Net Before Liens
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.netBeforeLiens)}
              </div>
            </div>
          </div>

          {/* Liens Detail */}
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text1)', margin: '24px 0 16px', fontFamily: 'var(--font-ui)' }}>
            Liens to Address
          </h3>

          {/* Medicare Lien */}
          {(result.medicareLiensHigh > 0) && (
            <div style={{ background: 'rgba(234,179,8,0.1)', borderLeft: '4px solid var(--flag-yellow)', borderRadius: '4px', padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', marginBottom: 8, fontFamily: 'var(--font-ui)' }}>
                Medicare Lien (Estimated Range)
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: 'var(--wrn-txt, #7A5800)', fontFamily: 'var(--font-ui)' }}>
                  Low (negotiated reduction):
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wrn-txt, #7A5800)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicareLiensLow)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: 'var(--wrn-txt, #7A5800)', fontFamily: 'var(--font-ui)' }}>
                  High (full conditional payment):
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--wrn-txt, #7A5800)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicareLiensHigh)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--wrn-txt, #7A5800)', lineHeight: 1.6, fontFamily: 'var(--font-ui)', fontStyle: 'italic' }}>
                Medicare Secondary Payer (MSP) rules allow for negotiated reduction of conditional payments. The amount shown as "low" reflects typical settlement negotiations where roughly 1/3 of the net settlement is allocated to reduce the Medicare lien.
              </div>
            </div>
          )}

          {/* Medicaid Lien */}
          {(result.medicaidLiensHigh > 0) && (
            <div style={{ background: 'rgba(34,197,94,0.06)', borderLeft: '4px solid var(--data-positive)', borderRadius: '4px', padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', marginBottom: 8, fontFamily: 'var(--font-ui)' }}>
                Medicaid Lien (Estimated Range)
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: 'var(--data-positive, #176438)', fontFamily: 'var(--font-ui)' }}>
                  Low (state reduction):
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--data-positive, #176438)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicaidLiensLow)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: 'var(--data-positive, #176438)', fontFamily: 'var(--font-ui)' }}>
                  High (full amount):
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--data-positive, #176438)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicaidLiensHigh)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--data-positive, #176438)', lineHeight: 1.6, fontFamily: 'var(--font-ui)', fontStyle: 'italic' }}>
                Medicaid lien reductions vary significantly by state. Many states allow substantial reductions (20-60%) through negotiation and state-specific formulas. Consult your state's Medicaid recovery rules.
              </div>
            </div>
          )}

          {/* Workers Comp Lien */}
          {(result.workersCompLiens > 0) && (
            <div style={{ background: 'rgba(59,130,246,0.08)', borderLeft: '4px solid var(--link)', borderRadius: '4px', padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', marginBottom: 8, fontFamily: 'var(--font-ui)' }}>
                Workers Compensation Lien
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: 'var(--link, #1A73E8)', fontFamily: 'var(--font-ui)' }}>
                  Reimbursement amount:
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--link, #1A73E8)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.workersCompLiens)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--link, #1A73E8)', lineHeight: 1.6, fontFamily: 'var(--font-ui)', fontStyle: 'italic' }}>
                Workers compensation liens are generally enforced as stated but may be subject to reduction under applicable state law or settlement negotiation.
              </div>
            </div>
          )}

          {/* Total Liens Summary */}
          <div style={{ background: '#FFF', border: '2px solid var(--bdr)', borderRadius: '4px', padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 12, fontFamily: 'var(--font-ui)' }}>
              TOTAL LIENS ESTIMATE
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
              <div style={{ fontSize: 14, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                Low estimate:
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.totalLiensLow)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginTop: 8 }}>
              <div style={{ fontSize: 14, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                High estimate:
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.totalLiensHigh)}
              </div>
            </div>
          </div>

          {/* Net Recovery */}
          <div style={{ background: 'var(--surf)', borderRadius: '4px', padding: 24, border: '1px solid var(--bdr)', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text1)', margin: '0 0 20px', fontFamily: 'var(--font-ui)' }}>
              Estimated Net Recovery to Client
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 14, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>
                  Low estimate (with full liens):
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.netRecoveryLow)}
                </div>
              </div>
              <div style={{ height: '1px', background: 'rgba(34,197,94,0.15)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 14, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>
                  High estimate (with negotiated reductions):
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.netRecoveryHigh)}
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div style={{ borderTop: '1px solid var(--bdr)', paddingTop: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', margin: '0 0 12px', fontFamily: 'var(--font-ui)' }}>
              Resources
            </h3>
            <a
              href="https://www.cms.gov/medicare/coordination-benefits-recovery"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px',
                background: 'var(--surf)',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
                textDecoration: 'none',
                color: 'var(--text1)',
                transition: 'background-color 200ms',
                fontSize: 14,
                fontFamily: 'var(--font-ui)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--surf)')}
            >
              <span>CMS Medicare Secondary Payer (MSP) Resources</span>
              <span style={{ marginLeft: 'auto', color: 'var(--link)', fontWeight: 600, fontSize: 12 }}>
                cms.gov
              </span>
            </a>
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: 24,
            padding: 16,
            background: 'rgba(234,179,8,0.1)',
            borderLeft: '3px solid var(--flag-yellow)',
            borderRadius: 4,
            fontSize: 12,
            color: 'var(--wrn-txt, #7A5800)',
            lineHeight: 1.6,
            fontFamily: 'var(--font-ui)',
          }}>
            <strong>Important Disclaimer:</strong> Lien amounts are estimates only. Actual Medicare, Medicaid, and workers compensation lien amounts must be verified directly with each lienholder. Lien reduction amounts vary based on jurisdiction, case circumstances, and negotiation outcomes. Settlement structures may also affect lien calculations. Consult an attorney familiar with Medicare Secondary Payer law and your state's lien recovery statutes before finalizing any settlement.
          </div>
        </div>
      )}
    </div>
  );
}
