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
      <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
          Settlement Details
        </h2>

        <form onSubmit={handleCalculate} style={{ display: 'grid', gap: 20 }}>
          {/* Gross Settlement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
              Gross Settlement Amount <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              name="grossSettlement"
              placeholder="$0"
              value={formData.grossSettlement}
              onChange={handleInputChange}
              style={{
                padding: '12px 14px',
                border: errors.grossSettlement ? '2px solid var(--color-error)' : '1px solid var(--border-default)',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--color-surface-1)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
              onBlur={(e) => (e.target.style.borderColor = errors.grossSettlement ? 'var(--color-error)' : 'var(--border-default)')}
            />
            {errors.grossSettlement && <div style={{ fontSize: 12, color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}>{errors.grossSettlement}</div>}
          </div>

          {/* Case Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
              Case Type
            </label>
            <select
              name="caseType"
              value={formData.caseType}
              onChange={handleInputChange}
              style={{
                padding: '12px 14px',
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--color-surface-1)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-default)')}
            >
              {CASE_TYPES.map(caseType => (
                <option key={caseType.value} value={caseType.value}>
                  {caseType.label}
                </option>
              ))}
            </select>
          </div>

          {/* Medicare */}
          <div style={{ background: '#EDF3FB', borderRadius: 10, padding: 16, border: '1px solid #D1E0F8' }} /* Note: keeping blue-tinted colors for medical benefits section */>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <input
                type="checkbox"
                name="medicareBenefits"
                checked={formData.medicareBenefits}
                onChange={handleInputChange}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', cursor: 'pointer', margin: 0 }}>
                Medicare benefits received?
              </label>
            </div>
            {formData.medicareBenefits && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
                  Estimated Medicare expenditures
                </label>
                <input
                  type="text"
                  name="medicareAmount"
                  placeholder="$0"
                  value={formData.medicareAmount}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px 12px',
                    border: errors.medicareAmount ? '2px solid #EF4444' : '1px solid #D1E0F8',
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: '#FFF',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.medicareAmount ? '#EF4444' : '#D1E0F8')}
                />
                {errors.medicareAmount && <div style={{ fontSize: 11, color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}>{errors.medicareAmount}</div>}
              </div>
            )}
          </div>

          {/* Medicaid */}
          <div style={{ background: '#EDF3FB', borderRadius: 10, padding: 16, border: '1px solid #D1E0F8' }} /* Note: keeping blue-tinted colors for medical benefits section */>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <input
                type="checkbox"
                name="medicaidBenefits"
                checked={formData.medicaidBenefits}
                onChange={handleInputChange}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', cursor: 'pointer', margin: 0 }}>
                Medicaid benefits received?
              </label>
            </div>
            {formData.medicaidBenefits && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
                  Estimated Medicaid amount
                </label>
                <input
                  type="text"
                  name="medicaidAmount"
                  placeholder="$0"
                  value={formData.medicaidAmount}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px 12px',
                    border: errors.medicaidAmount ? '2px solid #EF4444' : '1px solid #D1E0F8',
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: '#FFF',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.medicaidAmount ? '#EF4444' : '#D1E0F8')}
                />
                {errors.medicaidAmount && <div style={{ fontSize: 11, color: '#EF4444', fontFamily: 'var(--font-body)' }}>{errors.medicaidAmount}</div>}
              </div>
            )}
          </div>

          {/* Workers Compensation */}
          <div style={{ background: '#EDF3FB', borderRadius: 10, padding: 16, border: '1px solid #D1E0F8' }} /* Note: keeping blue-tinted colors for medical benefits section */>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <input
                type="checkbox"
                name="workersCompBenefits"
                checked={formData.workersCompBenefits}
                onChange={handleInputChange}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', cursor: 'pointer', margin: 0 }}>
                Workers compensation received?
              </label>
            </div>
            {formData.workersCompBenefits && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
                  Total workers comp received
                </label>
                <input
                  type="text"
                  name="workersCompAmount"
                  placeholder="$0"
                  value={formData.workersCompAmount}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px 12px',
                    border: errors.workersCompAmount ? '2px solid #EF4444' : '1px solid #D1E0F8',
                    borderRadius: 6,
                    fontSize: 13,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: '#FFF',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.workersCompAmount ? '#EF4444' : '#D1E0F8')}
                />
                {errors.workersCompAmount && <div style={{ fontSize: 11, color: '#EF4444', fontFamily: 'var(--font-body)' }}>{errors.workersCompAmount}</div>}
              </div>
            )}
          </div>

          {/* Attorney Fee Percentage */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
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
                border: errors.attorneyFeePercent ? '2px solid #EF4444' : '1px solid var(--border-default)',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--color-surface-1)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
              onBlur={(e) => (e.target.style.borderColor = errors.attorneyFeePercent ? '#EF4444' : 'var(--border-default)')}
            />
            {errors.attorneyFeePercent && <div style={{ fontSize: 12, color: '#EF4444', fontFamily: 'var(--font-body)' }}>{errors.attorneyFeePercent}</div>}
          </div>

          {/* Case Expenses */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
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
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--color-surface-1)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-default)')}
            />
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            style={{
              padding: '14px 24px',
              background: 'var(--accent-primary)',
              color: '#FFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              marginTop: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
          >
            Calculate Liens
          </button>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
            Lien Estimate Breakdown
          </h2>

          {/* Calculation breakdown */}
          <div style={{ display: 'grid', gap: 0, marginBottom: 32, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-default)' }}>
            {/* Gross Settlement */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#FAFBFC', borderBottom: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Gross Settlement Amount
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.grossSettlement)}
              </div>
            </div>

            {/* Attorney Fees */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#FFF', borderBottom: '1px solid var(--border-default)' }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Attorney Fees ({result.attorneyFeePercent.toFixed(2)}%)
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                -{formatCurrency(result.attorneyFees)}
              </div>
            </div>

            {/* Case Expenses */}
            {result.caseExpenses > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#FAFBFC', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Case Expenses
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                  -{formatCurrency(result.caseExpenses)}
                </div>
              </div>
            )}

            {/* Net Before Liens */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#E8F3EB', borderBottom: '1px solid #D1E8D6' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                Net Before Liens
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.netBeforeLiens)}
              </div>
            </div>
          </div>

          {/* Liens Detail */}
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: '24px 0 16px', fontFamily: 'var(--font-display)' }}>
            Liens to Address
          </h3>

          {/* Medicare Lien */}
          {(result.medicareLiensHigh > 0) && (
            <div style={{ background: '#FEF3C7', borderLeft: '4px solid #F59E0B', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>
                Medicare Lien (Estimated Range)
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#78350F', fontFamily: 'var(--font-body)' }}>
                  Low (negotiated reduction):
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#78350F', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicareLiensLow)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#78350F', fontFamily: 'var(--font-body)' }}>
                  High (full conditional payment):
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#78350F', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicareLiensHigh)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#78350F', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
                Medicare Secondary Payer (MSP) rules allow for negotiated reduction of conditional payments. The amount shown as "low" reflects typical settlement negotiations where roughly 1/3 of the net settlement is allocated to reduce the Medicare lien.
              </div>
            </div>
          )}

          {/* Medicaid Lien */}
          {(result.medicaidLiensHigh > 0) && (
            <div style={{ background: '#F0FDF4', borderLeft: '4px solid #10B981', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>
                Medicaid Lien (Estimated Range)
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#15803D', fontFamily: 'var(--font-body)' }}>
                  Low (state reduction):
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#15803D', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicaidLiensLow)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#15803D', fontFamily: 'var(--font-body)' }}>
                  High (full amount):
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#15803D', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.medicaidLiensHigh)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#15803D', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
                Medicaid lien reductions vary significantly by state. Many states allow substantial reductions (20-60%) through negotiation and state-specific formulas. Consult your state's Medicaid recovery rules.
              </div>
            </div>
          )}

          {/* Workers Comp Lien */}
          {(result.workersCompLiens > 0) && (
            <div style={{ background: '#EFF6FF', borderLeft: '4px solid #3B82F6', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>
                Workers Compensation Lien
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#1E40AF', fontFamily: 'var(--font-body)' }}>
                  Reimbursement amount:
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1E40AF', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.workersCompLiens)}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
                Workers compensation liens are generally enforced as stated but may be subject to reduction under applicable state law or settlement negotiation.
              </div>
            </div>
          )}

          {/* Total Liens Summary */}
          <div style={{ background: '#FFF', border: '2px solid var(--border-default)', borderRadius: 10, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12, fontFamily: 'var(--font-body)' }}>
              TOTAL LIENS ESTIMATE
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Low estimate:
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.totalLiensLow)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginTop: 8 }}>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                High estimate:
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(result.totalLiensHigh)}
              </div>
            </div>
          </div>

          {/* Net Recovery */}
          <div style={{ background: 'var(--color-surface-1)', borderRadius: 12, padding: 24, border: '1px solid var(--border-default)', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>
              Estimated Net Recovery to Client
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 14, color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                  Low estimate (with full liens):
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.netRecoveryLow)}
                </div>
              </div>
              <div style={{ height: '1px', background: '#D1E8D6' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 14, color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                  High estimate (with negotiated reductions):
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(result.netRecoveryHigh)}
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
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
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                textDecoration: 'none',
                color: 'var(--color-text-primary)',
                transition: 'background-color 0.2s',
                fontSize: 13,
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EDF3FB')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-1)')}
            >
              <span>CMS Medicare Secondary Payer (MSP) Resources</span>
              <span style={{ marginLeft: 'auto', color: 'var(--accent-primary)', fontWeight: 600, fontSize: 12 }}>
                cms.gov
              </span>
            </a>
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: 24,
            padding: 16,
            background: '#FEF3C7',
            borderLeft: '3px solid #D97706',
            borderRadius: 6,
            fontSize: 12,
            color: '#78350F',
            lineHeight: 1.6,
            fontFamily: 'var(--font-body)',
          }}>
            <strong>Important Disclaimer:</strong> Lien amounts are estimates only. Actual Medicare, Medicaid, and workers compensation lien amounts must be verified directly with each lienholder. Lien reduction amounts vary based on jurisdiction, case circumstances, and negotiation outcomes. Settlement structures may also affect lien calculations. Consult an attorney familiar with Medicare Secondary Payer law and your state's lien recovery statutes before finalizing any settlement.
          </div>
        </div>
      )}
    </div>
  );
}
