
import React from 'react';
import { Config } from '../types';
import { Mail, Download, Code, CheckSquare, Square } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  config: Config;
  onChange: (updates: Partial<Config>) => void;
  onCopy: () => void;
  onDownload: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ config, onChange, onCopy, onDownload }) => {
  const Checkbox = ({ label, field }: { label: string, field: keyof Config }) => (
    <div 
      className="sidebar__checkbox"
      onClick={() => onChange({ [field]: !config[field] })}
    >
      {config[field] ? (
        <CheckSquare className="icon-md text-primary" />
      ) : (
        <Square className="icon-md text-light" />
      )}
      <span className="sidebar__checkbox-label">{label}</span>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__icon-box">
          <Mail className="icon-md" />
        </div>
        <h1 className="sidebar__title">Callout Automation</h1>
      </div>

      <div className="sidebar__content">
        <span className="sidebar__section-title">Store Configuration</span>
        <div className="sidebar__input-group">
          <label className="sidebar__input-label">Store View</label>
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

        <div className="sidebar__input-group">
          <label className="sidebar__input-label">Shop URL</label>
          <input 
            type="text"
            value={config.shopUrl}
            onChange={(e) => onChange({ shopUrl: e.target.value })}
            className="sidebar__input"
          />
        </div>

        <span className="sidebar__section-title">Visibility</span>
        <Checkbox label="Show Logo" field="showLogo" />
        <Checkbox label="Show Signature" field="showSignature" />
        <Checkbox label="Show Disclaimer" field="showDisclaimer" />
        <Checkbox label="Show Footer" field="showFooter" />
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '12px', color: '#64748b' }}>
          Tip: You can edit the signature and disclaimer text directly in the preview template.
        </div>
      </div>

      <div className="sidebar__actions">
        <button onClick={onDownload} className="btn btn--primary">
          <Download className="icon-sm" /> Download HTML
        </button>
        <button onClick={onCopy} className="btn btn--outline">
          <Code className="icon-sm" /> Copy Code
        </button>
      </div>
    </div>
  );
};
