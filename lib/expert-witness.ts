import fs from 'fs';
import path from 'path';

export interface ExclusionGround {
  reason: string;
  percentage: number;
}

export interface AdmissionGround {
  reason: string;
  percentage: number;
}

export interface SampleOpinion {
  title: string;
  citation: string;
  url: string;
  outcome: 'admitted' | 'excluded';
  year: number;
}

export interface CircuitData {
  challenged: number;
  excluded: number;
  admitted: number;
}

export interface ExpertType {
  type: string;
  description: string;
  totalOpinions: number;
  daubertChallengeRate: number;
  challengeSuccessRate: number;
  byCircuit: Record<string, CircuitData>;
  exclusionGrounds: ExclusionGround[];
  admissionGrounds: AdmissionGround[];
  sampleOpinions: SampleOpinion[];
  caseTypes: string[];
}

export interface ExpertWitnessData {
  expertTypes: ExpertType[];
}

let cachedData: ExpertWitnessData | null = null;

function loadData(): ExpertWitnessData {
  if (cachedData) {
    return cachedData;
  }

  const filePath = path.join(process.cwd(), 'data', 'expert-witness-analytics.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  cachedData = JSON.parse(fileContent) as ExpertWitnessData;
  return cachedData;
}

export function getExpertTypes(): ExpertType[] {
  const data = loadData();
  return data.expertTypes;
}

export function getExpertByType(type: string): ExpertType | undefined {
  const data = loadData();
  return data.expertTypes.find(
    (expert) => expert.type.toLowerCase() === type.toLowerCase()
  );
}

export function getExpertsByCircuit(circuit: string): ExpertType[] {
  const data = loadData();
  const experts: ExpertType[] = [];

  Object.entries(data.expertTypes).forEach(([_, expert]) => {
    if (expert.byCircuit[circuit]) {
      experts.push(expert);
    }
  });

  return experts;
}

export function getCircuitList(): string[] {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', 'DC', 'Federal'];
}

export function getExpertTypeNames(): string[] {
  const data = loadData();
  return data.expertTypes.map((expert) => expert.type);
}
