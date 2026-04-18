'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

// SVG Icons
const FolderIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2.414-.646l-6.359-7.519A2 2 0 0 0 9.474 10H6.414A2 2 0 0 1 4 8V7a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z" />
  </svg>
);

const FileIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
  </svg>
);

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ChevronDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const SearchIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const PlusIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MoreIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2"></circle>
    <circle cx="12" cy="12" r="2"></circle>
    <circle cx="12" cy="19" r="2"></circle>
  </svg>
);

const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const ShareIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const AnalyticsIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

// Mock data interfaces
interface ResearchItem {
  id: string;
  title: string;
  citation?: string;
  type: 'case' | 'statute' | 'secondary' | 'note' | 'snippet';
  dateSaved: string;
  dateModified: string;
  annotations: number;
  keyCiteStatus?: 'positive' | 'neutral' | 'negative';
  folderId: string;
}

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  description?: string;
  itemCount: number;
  sharedWith?: string[];
}

// Mock data
const MOCK_FOLDERS: Folder[] = [
  { id: 'f1', name: 'Employment Law', description: 'Wrongful termination and discrimination cases', itemCount: 8, sharedWith: ['Sarah Chen', 'Marcus Williams'] },
  { id: 'f2', name: 'Medical Malpractice', description: 'Surgical errors and diagnostic failures', itemCount: 6, parentId: 'f1' },
  { id: 'f3', name: 'Contract Disputes', description: 'Breach of contract and interpretation', itemCount: 5 },
  { id: 'f4', name: 'Negligence Research', description: 'Premises liability and personal injury', itemCount: 4 },
  { id: 'f5', name: 'Current Case - Smith v. Corp', description: 'Active litigation files', itemCount: 12, sharedWith: ['Alex Turner'] },
];

const MOCK_ITEMS: ResearchItem[] = [
  { id: 'i1', title: 'Smith v. General Motors Corp', citation: '123 F.3d 456 (6th Cir. 2019)', type: 'case', dateSaved: '2024-01-15', dateModified: '2024-03-20', annotations: 3, keyCiteStatus: 'positive', folderId: 'f5' },
  { id: 'i2', title: 'Title VII - Equal Employment Opportunity', citation: '42 U.S.C. § 2000e', type: 'statute', dateSaved: '2024-01-10', dateModified: '2024-02-10', annotations: 1, keyCiteStatus: 'positive', folderId: 'f1' },
  { id: 'i3', title: 'Discovery responses - Smith deposition excerpts', citation: 'Smith Dep. pp. 45-67', type: 'note', dateSaved: '2024-03-15', dateModified: '2024-03-18', annotations: 5, folderId: 'f5' },
  { id: 'i4', title: 'Restatement (Third) of Torts § 5', citation: 'Restatement § 5', type: 'secondary', dateSaved: '2024-01-20', dateModified: '2024-02-05', annotations: 2, folderId: 'f4' },
  { id: 'i5', title: 'Expert witness report notes', citation: 'Dr. Johnson Report', type: 'snippet', dateSaved: '2024-03-10', dateModified: '2024-03-19', annotations: 0, folderId: 'f5' },
  { id: 'i6', title: 'Medical Negligence Standard of Care', citation: '45 P.2d 123 (Cal. 2018)', type: 'case', dateSaved: '2024-02-01', dateModified: '2024-02-15', annotations: 2, keyCiteStatus: 'neutral', folderId: 'f2' },
  { id: 'i7', title: 'Comparative negligence doctrine', citation: 'UCC § 1-101', type: 'secondary', dateSaved: '2024-01-25', dateModified: '2024-03-10', annotations: 4, folderId: 'f4' },
  { id: 'i8', title: 'Contract interpretation principles', citation: '89 N.E.3d 456 (Ohio 2017)', type: 'case', dateSaved: '2024-02-20', dateModified: '2024-03-05', annotations: 1, keyCiteStatus: 'positive', folderId: 'f3' },
  { id: 'i9', title: 'Implied warranty notes', citation: 'UCC § 2-316', type: 'note', dateSaved: '2024-03-01', dateModified: '2024-03-14', annotations: 3, folderId: 'f3' },
  { id: 'i10', title: 'Premises liability summary', citation: '234 S.W.3d 789 (Tex. 2008)', type: 'snippet', dateSaved: '2024-02-10', dateModified: '2024-03-12', annotations: 0, folderId: 'f4' },
];

export default function FoldersPage() {
  // State management
  const [selectedFolderId, setSelectedFolderId] = useState<string>('f5'); // Current case as default
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['f1', 'f5']));
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date-saved' | 'date-modified' | 'title' | 'type'>('date-modified');
  const [filterType, setFilterType] = useState<string>('all');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showQuickSaveModal, setShowQuickSaveModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newCitation, setNewCitation] = useState('');
  const [showFolderAnalysis, setShowFolderAnalysis] = useState(false);

  // Get current folder
  const currentFolder = MOCK_FOLDERS.find(f => f.id === selectedFolderId);

  // Get items for current folder
  const folderItems = MOCK_ITEMS.filter(item => item.folderId === selectedFolderId);

  // Filter and sort items
  const filteredItems = folderItems
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.citation?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-saved':
          return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
        case 'date-modified':
          return new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  // Toggle item selection
  const toggleItemSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  // Select all items
  const selectAllItems = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(item => item.id)));
    }
  };

  // Get folder analysis stats
  const getFolderAnalysis = () => {
    const stats = {
      totalItems: folderItems.length,
      caseCount: folderItems.filter(i => i.type === 'case').length,
      statuteCount: folderItems.filter(i => i.type === 'statute').length,
      secondaryCount: folderItems.filter(i => i.type === 'secondary').length,
      totalAnnotations: folderItems.reduce((sum, i) => sum + i.annotations, 0),
      dateRange: {
        oldest: new Date(Math.min(...folderItems.map(i => new Date(i.dateSaved).getTime()))).toLocaleDateString(),
        newest: new Date(Math.max(...folderItems.map(i => new Date(i.dateSaved).getTime()))).toLocaleDateString(),
      },
    };
    return stats;
  };

  const analysis = getFolderAnalysis();

  const typeColors: Record<string, { bg: string; text: string }> = {
    case: { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--link)' },
    statute: { bg: 'rgba(34, 197, 94, 0.1)', text: 'var(--data-positive)' },
    secondary: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' },
    note: { bg: 'rgba(244, 114, 182, 0.1)', text: '#f472b6' },
    snippet: { bg: 'rgba(251, 146, 60, 0.1)', text: '#fb923c' },
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)' }}>
      <style>{`
        @media (max-width: 768px) {
          .folders-sidebar-grid { grid-template-columns: 1fr !important; }
          .folders-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .folders-analysis-grid { grid-template-columns: 1fr !important; }
          .folders-filter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {/* Header */}
      <div style={{ background: 'var(--chrome-bg)', color: 'white', padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <FolderIcon size={28} />
            <h1 style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-legal)', margin: 0, letterSpacing: '-0.025em' }}>
              Research Folders
            </h1>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0, fontFamily: 'var(--font-ui)' }}>
            Organize cases, statutes, and research materials by folder. Share with team members and track annotations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px' }} className="folders-sidebar-grid">

        {/* Sidebar - Folder Tree */}
        <div style={{ background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--bdr)', padding: '16px', height: 'fit-content', maxHeight: '80vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text2, #42403C)' }}>
              Folders
            </div>
            <button
              onClick={() => setShowNewFolderModal(true)}
              title="Create new folder"
              style={{
                background: 'var(--surf)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                padding: '4px 6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--chrome-bg)',
                transition: 'all 200ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surf)')}
            >
              <PlusIcon size={14} />
            </button>
          </div>

          {/* Folder List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {MOCK_FOLDERS.filter(f => !f.parentId).map(folder => {
              const isSelected = selectedFolderId === folder.id;
              const isExpanded = expandedFolders.has(folder.id);
              const childFolders = MOCK_FOLDERS.filter(f => f.parentId === folder.id);

              return (
                <div key={folder.id}>
                  <button
                    onClick={() => setSelectedFolderId(folder.id)}
                    style={{
                      width: '100%',
                      background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      border: 'none',
                      padding: '8px 8px',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 200ms',
                      borderLeft: isSelected ? '2px solid var(--link)' : '2px solid transparent',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      color: isSelected ? 'var(--link)' : 'var(--text-primary)',
                      fontWeight: isSelected ? 600 : 500,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) (e.currentTarget.style.background = 'var(--surf)');
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) (e.currentTarget.style.background = 'transparent');
                    }}
                  >
                    {childFolders.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFolder(folder.id);
                        }}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text2, #42403C)' }}
                      >
                        {isExpanded ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
                      </button>
                    )}
                    {childFolders.length === 0 && <div style={{ width: '14px' }} />}
                    <FolderIcon size={16} />
                    <span style={{ flex: 1, textAlign: 'left' }}>{folder.name}</span>
                    <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 400 }}>
                      {folder.itemCount}
                    </div>
                  </button>

                  {/* Child Folders */}
                  {isExpanded && childFolders.map(child => (
                    <button
                      key={child.id}
                      onClick={() => setSelectedFolderId(child.id)}
                      style={{
                        width: '100%',
                        background: selectedFolderId === child.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                        border: 'none',
                        padding: '8px 8px 8px 28px',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 200ms',
                        borderLeft: selectedFolderId === child.id ? '2px solid var(--link)' : '2px solid transparent',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '14px',
                        color: selectedFolderId === child.id ? 'var(--link)' : 'var(--text-primary)',
                        fontWeight: selectedFolderId === child.id ? 600 : 500,
                      }}
                      onMouseEnter={(e) => {
                        if (selectedFolderId !== child.id) (e.currentTarget.style.background = 'var(--surf)');
                      }}
                      onMouseLeave={(e) => {
                        if (selectedFolderId !== child.id) (e.currentTarget.style.background = 'transparent');
                      }}
                    >
                      <FolderIcon size={16} />
                      <span style={{ flex: 1, textAlign: 'left' }}>{child.name}</span>
                      <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 400 }}>
                        {child.itemCount}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Folder Header with Actions */}
          {currentFolder && (
            <div style={{ background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--bdr)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', margin: 0, color: 'var(--text-primary)' }}>
                    {currentFolder.name}
                  </h2>
                  {currentFolder.description && (
                    <p style={{ fontSize: '14px', color: 'var(--text2, #42403C)', margin: '4px 0 0', fontFamily: 'var(--font-ui)' }}>
                      {currentFolder.description}
                    </p>
                  )}
                </div>

                {/* Folder Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setShowFolderAnalysis(!showFolderAnalysis)}
                    title="Folder analysis"
                    style={{
                      background: showFolderAnalysis ? 'var(--gold)' : 'var(--surf)',
                      border: '1px solid var(--bdr)',
                      borderRadius: '2px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: showFolderAnalysis ? 'white' : 'var(--text-primary)',
                      transition: 'all 200ms',
                      fontFamily: 'var(--font-ui)',
                    }}
                  >
                    <AnalyticsIcon size={16} />
                    Analysis
                  </button>

                  <button
                    title="Share folder"
                    style={{
                      background: currentFolder.sharedWith && currentFolder.sharedWith.length > 0 ? 'var(--link)' : 'var(--surf)',
                      border: '1px solid var(--bdr)',
                      borderRadius: '2px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: currentFolder.sharedWith && currentFolder.sharedWith.length > 0 ? 'white' : 'var(--text-primary)',
                      transition: 'all 200ms',
                      fontFamily: 'var(--font-ui)',
                    }}
                    onMouseEnter={(e) => {
                      if (!currentFolder.sharedWith?.length) (e.currentTarget.style.background = 'var(--link)');
                    }}
                    onMouseLeave={(e) => {
                      if (!currentFolder.sharedWith?.length) (e.currentTarget.style.background = 'var(--surf)');
                    }}
                  >
                    <ShareIcon size={16} />
                    {currentFolder.sharedWith?.length ? `Shared (${currentFolder.sharedWith.length})` : 'Share'}
                  </button>

                  <button
                    onClick={() => setShowQuickSaveModal(true)}
                    title="Quick save item"
                    style={{
                      background: 'var(--gold)',
                      border: 'none',
                      borderRadius: '2px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'white',
                      transition: 'all 200ms',
                      fontFamily: 'var(--font-ui)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <PlusIcon size={16} />
                    Add Item
                  </button>
                </div>
              </div>

              {/* Folder Statistics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--bdr)' }} className="folders-stats-grid">
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                    {currentFolder.itemCount}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Total Items
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-mono)' }}>
                    {analysis.totalAnnotations}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Annotations
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--data-positive)', fontFamily: 'var(--font-mono)' }}>
                    {analysis.dateRange.oldest}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Date Range Start
                  </div>
                </div>
                {currentFolder.sharedWith && currentFolder.sharedWith.length > 0 && (
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-mono)' }}>
                      {currentFolder.sharedWith.length}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Team Members
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Folder Analysis Panel */}
          {showFolderAnalysis && (
            <div style={{ background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--bdr)', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-ui)', margin: '0 0 16px', color: 'var(--text-primary)' }}>
                Folder Analysis
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="folders-analysis-grid">
                {/* Content Type Breakdown */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text2, #42403C)', marginBottom: '12px' }}>
                    Content Type Distribution
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontFamily: 'var(--font-ui)' }}>Cases</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '120px', height: '8px', background: 'var(--surf)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${(analysis.caseCount / analysis.totalItems) * 100}%`, height: '100%', background: 'var(--link)' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-mono)' }}>
                          {analysis.caseCount}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontFamily: 'var(--font-ui)' }}>Statutes</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '120px', height: '8px', background: 'var(--surf)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${(analysis.statuteCount / analysis.totalItems) * 100}%`, height: '100%', background: 'var(--data-positive)' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive)', fontFamily: 'var(--font-mono)' }}>
                          {analysis.statuteCount}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontFamily: 'var(--font-ui)' }}>Secondary Sources</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '120px', height: '8px', background: 'var(--surf)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${(analysis.secondaryCount / analysis.totalItems) * 100}%`, height: '100%', background: 'var(--link-visited)' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#a855f7', fontFamily: 'var(--font-mono)' }}>
                          {analysis.secondaryCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jurisdiction & Date Stats */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text2, #42403C)', marginBottom: '12px' }}>
                    Quick Stats
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'var(--surf)', borderRadius: '3px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 500 }}>Date Range</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                        {analysis.dateRange.oldest} to {analysis.dateRange.newest}
                      </div>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--surf)', borderRadius: '3px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 500 }}>Total Annotations</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginTop: '4px' }}>
                        {analysis.totalAnnotations}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search, Filter, Sort Bar */}
          <div style={{ background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--bdr)', padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px 140px', gap: '12px', alignItems: 'flex-end' }} className="folders-filter-grid">
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text2, #42403C)', display: 'flex' }}><SearchIcon size={16} /></span>
                <input
                  type="text"
                  placeholder="Search by title or citation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '2px',
                    border: '1px solid var(--bdr)',
                    background: 'var(--surf)',
                    fontSize: '14px',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-primary)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Filter by Type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  padding: '10px 8px',
                  borderRadius: '2px',
                  border: '1px solid var(--bdr)',
                  background: 'var(--surf)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <option value="all">All Types</option>
                <option value="case">Cases</option>
                <option value="statute">Statutes</option>
                <option value="secondary">Secondary</option>
                <option value="note">Notes</option>
                <option value="snippet">Snippets</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                style={{
                  padding: '10px 8px',
                  borderRadius: '2px',
                  border: '1px solid var(--bdr)',
                  background: 'var(--surf)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                }}
              >
                <option value="date-modified">Modified</option>
                <option value="date-saved">Saved</option>
                <option value="title">Title A-Z</option>
                <option value="type">Type</option>
              </select>

              {/* Results Count */}
              <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 500, textAlign: 'right' }}>
                {filteredItems.length} of {folderItems.length}
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedItems.size > 0 && (
            <div style={{ background: 'var(--gold)', borderRadius: '4px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '16px', color: 'white', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
              <div style={{ fontSize: '14px' }}>
                {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
              </div>
              <button
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '2px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              >
                Move to Folder
              </button>
              <button
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '2px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              >
                Export
              </button>
              <button
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '2px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  marginLeft: 'auto',
                }}
                onClick={() => setSelectedItems(new Set())}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              >
                Clear
              </button>
            </div>
          )}

          {/* Items List */}
          <div style={{ background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--bdr)' }}>
            {/* Items Header with Select All */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surf)' }}>
              <input
                type="checkbox"
                checked={selectedItems.size === filteredItems.length && filteredItems.length > 0}
                onChange={selectAllItems}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: 'var(--link)',
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2, #42403C)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {filteredItems.length === 0 ? 'No items' : `${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''}`}
              </span>
            </div>

            {/* Items */}
            {filteredItems.length === 0 ? (
              <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text2, #42403C)' }}>
                <p style={{ fontSize: '14px', margin: 0, fontFamily: 'var(--font-ui)' }}>
                  {folderItems.length === 0 ? 'This folder is empty' : 'No items match your filters'}
                </p>
              </div>
            ) : (
              <div>
                {filteredItems.map((item, idx) => {
                  const isSelected = selectedItems.has(item.id);
                  const itemColor = typeColors[item.type];

                  return (
                    <div
                      key={item.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: idx < filteredItems.length - 1 ? '1px solid var(--bdr)' : 'none',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        background: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                        transition: 'all 200ms',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) (e.currentTarget.style.background = 'var(--surf)');
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) (e.currentTarget.style.background = 'transparent');
                      }}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleItemSelection(item.id)}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: 'var(--link)',
                          marginTop: '2px',
                          flexShrink: 0,
                        }}
                      />

                      {/* Item Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          {/* Icon */}
                          <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px', flexShrink: 0 }}>
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '3px',
                                background: itemColor.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: itemColor.text,
                              }}
                            >
                              <FileIcon size={14} />
                            </div>
                          </div>

                          {/* Title & Citation */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                              {item.citation && (
                                <>
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {item.citation}
                                  </span>
                                  <span>•</span>
                                </>
                              )}
                              <span style={{ whiteSpace: 'nowrap' }}>
                                Saved {new Date(item.dateSaved).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Badges & Status */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                            {/* Type Badge */}
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '2px 8px',
                                borderRadius: '3px',
                                fontSize: '12px',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                background: itemColor.bg,
                                color: itemColor.text,
                                fontFamily: 'var(--font-ui)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {item.type}
                            </span>

                            {/* Annotations Badge */}
                            {item.annotations > 0 && (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '3px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  background: 'var(--link)',
                                  color: 'white',
                                  fontFamily: 'var(--font-mono)',
                                }}
                              >
                                {item.annotations}
                              </span>
                            )}

                            {/* KeyCite Status */}
                            {item.keyCiteStatus && (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '2px 8px',
                                  borderRadius: '3px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  textTransform: 'capitalize',
                                  background: item.keyCiteStatus === 'positive' ? 'var(--data-positive-bg, #EAF4EF)' : item.keyCiteStatus === 'negative' ? 'var(--data-negative-bg, #FAEAEA)' : 'rgba(100, 100, 100, 0.1)',
                                  color: item.keyCiteStatus === 'positive' ? 'var(--data-positive)' : item.keyCiteStatus === 'negative' ? 'var(--data-negative)' : 'var(--text2, #42403C)',
                                  fontFamily: 'var(--font-ui)',
                                }}
                              >
                                KC: {item.keyCiteStatus}
                              </span>
                            )}

                            {/* Menu Button */}
                            <button
                              title="Item options"
                              style={{
                                background: 'transparent',
                                border: 'none',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'var(--text2, #42403C)',
                                transition: 'color 200ms',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2, #42403C)')}
                            >
                              <MoreIcon size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'var(--card)',
            borderRadius: '4px',
            border: '1px solid var(--bdr)',
            padding: '24px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px', fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}>
              Create New Folder
            </h3>
            <input
              type="text"
              placeholder="Folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '2px',
                border: '1px solid var(--bdr)',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName('');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '2px',
                  border: '1px solid var(--bdr)',
                  background: 'var(--surf)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName('');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '2px',
                  border: 'none',
                  background: 'var(--gold)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                Create Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Save Modal */}
      {showQuickSaveModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'var(--card)',
            borderRadius: '4px',
            border: '1px solid var(--bdr)',
            padding: '24px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px', fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}>
              Quick Save to {currentFolder?.name}
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text2, #42403C)', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-ui)' }}>
                Case Citation or Title
              </label>
              <input
                type="text"
                placeholder="e.g., Smith v. Corp, 123 F.3d 456 (6th Cir. 2019) or statute/title"
                value={newCitation}
                onChange={(e) => setNewCitation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '2px',
                  border: '1px solid var(--bdr)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-ui)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowQuickSaveModal(false);
                  setNewCitation('');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '2px',
                  border: '1px solid var(--bdr)',
                  background: 'var(--surf)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowQuickSaveModal(false);
                  setNewCitation('');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '2px',
                  border: 'none',
                  background: 'var(--gold)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Related Tools */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { name: 'Find & Print', href: '/attorney/find-print', desc: 'Find, print and export legal documents' },
              { name: 'Alerts', href: '/attorney/alerts', desc: 'Real-time citation and case alerts' },
              { name: 'Secondary Sources', href: '/attorney/secondary-sources', desc: 'Legal secondary sources and treatises' },
              { name: 'Advanced Search', href: '/attorney/advanced-search', desc: 'Advanced legal research search tools' },
            ].map(tool => (
              <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 200ms' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
