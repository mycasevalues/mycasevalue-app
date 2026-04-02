// Wizard-specific type definitions
import { Lang } from '../../lib/i18n';

export interface SitItem {
  id: string;
  label: string;
  sub: string;
  q: string;
  icon: string;
  color: string;
  dm: string;
  opts: OptionItem[];
}

export interface OptionItem {
  label: string;
  d: string;
  nos: string;
}

export interface AISuggestion {
  sit: SitItem;
  opt: OptionItem;
  score: number;
}

export interface WizardProps {
  lang: Lang;
  t: any;
  toast: (msg: string) => void;
}

export interface StepHomeProps extends WizardProps {
  go: (step: number) => void;
  demo: () => void;
  naturalInput: string;
  setNaturalInput: (input: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  aiSuggestions: AISuggestion[];
  setSit: (sit: SitItem | null) => void;
  setSpec: (spec: OptionItem | null) => void;
  setAmount: (amount: string) => void;
  detectCaseType: (input: string) => boolean;
  SITS: SitItem[];
  totalDisplay: string;
  liveCounter: number;
  heroCounterDone: boolean;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
}

export interface StepCategoryProps extends WizardProps {
  go: (step: number) => void;
  setSit: (sit: SitItem) => void;
  setAmount: (amount: string) => void;
  SITS: SitItem[];
}

export interface StepSubCategoryProps extends WizardProps {
  go: (step: number) => void;
  sit: SitItem | null;
  setSpec: (spec: OptionItem) => void;
  naturalInput: string;
  setNaturalInput: (input: string) => void;
  aiSuggestions: AISuggestion[];
  showAllSubcats: boolean;
  setShowAllSubcats: (show: boolean) => void;
}

export interface StepDetailsProps extends WizardProps {
  go: (step: number) => void;
  stateCode: string;
  setStateCode: (code: string) => void;
  timing: string;
  setTiming: (timing: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  attorney: string;
  setAttorney: (attorney: string) => void;
  othersAffected: string;
  setOthersAffected: (others: string) => void;
  classSize: string;
  setClassSize: (size: string) => void;
  consent: boolean;
  setConsent: (consent: boolean) => void;
  startLoad: () => void;
  STATES: Array<{ id: string; label: string }>;
  TIMING_OPTS: Array<{ id: string; label: string }>;
  AMOUNT_OPTS: Array<{ id: string; label: string }>;
  ATTORNEY_OPTS: Array<{ id: string; label: string }>;
  darkMode: boolean;
}

export interface StepReportProps extends WizardProps {
  go: (step: number) => void;
  loading: boolean;
  loadPct: number;
  showReportLoader: boolean;
  setShowReportLoader: (show: boolean) => void;
  result: any;
  setResult: (result: any) => void;
  spec: OptionItem | null;
  sit: SitItem | null;
  stateCode: string;
  timing: string;
  amount: string;
  attorney: string;
  isPremium: boolean;
  darkMode: boolean;
  emailCaptured: boolean;
  showEmailGate: boolean;
  setShowEmailGate: (show: boolean) => void;
  setEmailCaptured: (captured: boolean) => void;
  activeReportTab: string;
  setActiveReportTab: (tab: string) => void;
  showShareCard: boolean;
  setShowShareCard: (show: boolean) => void;
  saveReport: () => void;
  reportsGeneratedRef: React.MutableRefObject<number>;
  buy: (plan: string) => void;
  setShowPricing: (show: boolean) => void;
  [key: string]: any;
}
