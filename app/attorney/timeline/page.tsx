import'{ Metadata } from 'next';
import'CaseTimelineGenerator from '../../../components/CaseTimelineGenerator';

export'const metadata: Metadata = {
' title: 'Case Timeline Generator',
' description: 'Generate expected federal case timelines with data-backed milestones',
};

export'default function TimelinePage() {
' return <CaseTimelineGenerator />;
}
