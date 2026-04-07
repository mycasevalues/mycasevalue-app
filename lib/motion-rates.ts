import motionRatesData from '../data/motion-rates.json';

export interface CircuitRates {
  [circuit: string]: number;
}

export interface MotionCaseTypeData {
  grantRate: number;
  denyRate: number;
  sampleSize: number;
  avgTimeToDecisionDays: number;
  byCircuit: CircuitRates;
}

export interface Motion {
  type: string;
  rule: string;
  description: string;
  byCaseType: {
    [caseType: string]: MotionCaseTypeData;
  };
}

export interface MotionRatesData {
  motions: Motion[];
}

const data = motionRatesData as MotionRatesData;

export function getAllMotions(): Motion[] {
  return data.motions;
}

export function getMotionByType(type: string): Motion | undefined {
  return data.motions.find(m => m.type === type);
}

export function getAllCaseTypes(): string[] {
  const caseTypes = new Set<string>();
  data.motions.forEach(motion => {
    Object.keys(motion.byCaseType).forEach(ct => caseTypes.add(ct));
  });
  return Array.from(caseTypes).sort((a, b) => parseInt(a) - parseInt(b));
}

export function getAllCircuits(): string[] {
  const circuits = new Set<string>();
  data.motions.forEach(motion => {
    Object.entries(motion.byCaseType).forEach(([, caseTypeData]) => {
      Object.keys(caseTypeData.byCircuit).forEach(c => circuits.add(c));
    });
  });
  return Array.from(circuits).sort((a, b) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
    return a.localeCompare(b);
  });
}

export function filterMotionsByCaseType(caseType: string): Motion[] {
  return data.motions.filter(m => m.byCaseType[caseType] !== undefined);
}

export function filterMotionsByCircuit(circuit: string): Array<{
  motionType: string;
  caseType: string;
  grantRate: number;
}> {
  const results: Array<{ motionType: string; caseType: string; grantRate: number }> = [];
  data.motions.forEach(motion => {
    Object.entries(motion.byCaseType).forEach(([caseType, caseData]) => {
      const circuitRate = caseData.byCircuit[circuit];
      if (circuitRate !== undefined) {
        results.push({
          motionType: motion.type,
          caseType,
          grantRate: circuitRate,
        });
      }
    });
  });
  return results;
}

export function getMotionDataByCaseTypeAndCircuit(
  motionType: string,
  caseType: string,
  circuit: string,
): number | undefined {
  const motion = getMotionByType(motionType);
  if (!motion) return undefined;
  const caseTypeData = motion.byCaseType[caseType];
  if (!caseTypeData) return undefined;
  return caseTypeData.byCircuit[circuit];
}
