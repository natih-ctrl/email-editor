import React, { useRef } from 'react';
import { Config, Section } from '../types';
import { Mail, Download, CheckSquare, Square, FileUp } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  config: Config;
  onChange: (updates: Partial<Config>) => void;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
  onImport: (html: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  config, onChange, onUpdateSection, onCopy, onDownload, onReset, onImport 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onImport(content);
      };
      reader.readAsText(file);
    }
    if (e.target) e.target.value = '';
  };

  const Checkbox = ({ label, field }: { label: string, field: keyof Config }) => (
    <div 
      className="sidebar__checkbox"
      onClick={() => onChange({ [field]: !config[field] })}
    >
      <div className="sidebar__checkbox-box">
        {config[field] ? (
          <CheckSquare className="icon-md sidebar__checkbox-icon--checked" />
        ) : (
          <Square className="icon-md sidebar__checkbox-icon--unchecked" />
        )}
      </div>
      <span className="sidebar__checkbox-label">{label}</span>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__icon-box">
          <Mail className="icon-md" strokeWidth={2.5} />
        </div>
        <h1 className="sidebar__title">Callout<br />Automation<br />Generator</h1>
      </div>

      <div className="sidebar__content">
        <div className="sidebar__section">
          <label className="sidebar__section-title">Store view</label>
          <div className="sidebar__input-group">
            <select 
              value={config.storeView}
              onChange={(e) => onChange({ storeView: e.target.value })}
              className="sidebar__select"
            >
              <option>GlassesUSA</option>
              <option>Otticals</option>
              <option>United Vision</option>
            </select>
          </div>
        </div>

        <div className="sidebar__section">
          <span className="sidebar__section-title">Layout</span>
          <div className="sidebar__checkbox-list">
            <Checkbox label="Logo" field="showLogo" />
            <Checkbox label="Signature" field="showSignature" />
            <Checkbox label="Disclaimer" field="showDisclaimer" />
            <Checkbox label="Footer" field="showFooter" />
          </div>
        </div>
      </div>

      <div className="sidebar__actions">
        <button onClick={onDownload} className="btn btn--primary">
          <Download className="icon-sm" /> Download
        </button>
        <button onClick={() => fileInputRef.current?.click()} className="btn btn--primary">
          <FileUp className="icon-sm" /> Import HTML
        </button>
        <button onClick={onCopy} className="btn btn--outline">
          Copy Code
        </button>
        <button onClick={onReset} className="btn btn--outline">
          New Email
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".html,.htm" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};