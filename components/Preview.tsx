import React, { useState, useRef, useEffect } from 'react';
import { Config, Section } from '../types';
import { X, Plus, Trash2, MousePointer2, Minus, Link as LinkIcon } from 'lucide-react';
import './Preview.css';

interface PreviewProps {
  config: Config;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  onAddSection: (index: number) => void;
  onRemoveSection: (id: string) => void;
  onConfigChange: (updates: Partial<Config>) => void;
}

const Toolbar: React.FC<{
  section: Section;
  onUpdate: (updates: Partial<Section>) => void;
  onClose: () => void;
}> = ({ section, onUpdate, onClose }) => {
  
  const addLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand('createLink', false, url);
    }
  };

  return (
    <div className="toolbar" onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={() => onUpdate({ type: 'h1' })}
        className={`toolbar__btn ${section.type === 'h1' ? 'toolbar__btn--active' : ''}`}
      >H1</button>
      <button 
        onClick={() => onUpdate({ type: 'h2' })}
        className={`toolbar__btn ${section.type === 'h2' ? 'toolbar__btn--active' : ''}`}
      >H2</button>
      <button 
        onClick={() => onUpdate({ type: 'p' })}
        className={`toolbar__btn ${section.type === 'p' ? 'toolbar__btn--active' : ''}`}
      >Tt</button>
      
      <div className="toolbar__divider" />
      
      <button onClick={addLink} title="Add Link" className="toolbar__btn">
        <LinkIcon className="icon-sm" />
      </button>

      <div className="toolbar__divider" />

      <button 
        onClick={() => onUpdate({ type: 'callout' })}
        className={`toolbar__btn ${section.type === 'callout' ? 'toolbar__btn--active' : ''}`}
      ><MousePointer2 className="icon-sm" /></button>
      
      <button 
        onClick={() => onUpdate({ type: 'divider' })}
        className={`toolbar__btn ${section.type === 'divider' ? 'toolbar__btn--active' : ''}`}
      ><Minus className="icon-sm" /></button>

      <div className="toolbar__divider" />

      <button onClick={onClose} className="toolbar__btn">
        <X className="icon-sm" />
      </button>
    </div>
  );
};

const SectionItem: React.FC<{
  section: Section;
  index: number;
  isActive: boolean;
  onSetActive: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<Section>) => void;
  onAdd: (index: number) => void;
  onRemove: (id: string) => void;
}> = ({ section, index, isActive, onSetActive, onUpdate, onAdd, onRemove }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const safeText = section.text || '';
    if (contentRef.current && contentRef.current.innerHTML !== safeText) {
      contentRef.current.innerHTML = safeText;
    }
  }, [section.text]);

  const handleBlur = () => {
    if (contentRef.current) {
      onUpdate(section.id, { text: contentRef.current.innerHTML });
    }
  };

  if (section.type === 'divider') {
    return (
      <div 
        className={`preview-divider ${isActive ? 'section-item--active' : ''}`}
        onClick={(e) => { e.stopPropagation(); onSetActive(section.id); }}
        style={{ padding: '24px 0' }}
      >
        {isActive && <Toolbar section={section} onUpdate={(u) => onUpdate(section.id, u)} onClose={() => onSetActive(null)} />}
        <div style={{ height: '1px', background: '#e5e7eb', width: '100%' }} />
      </div>
    );
  }

  return (
    <div 
      className={`section-item ${isActive ? 'section-item--active' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSetActive(section.id); }}
    >
      {isActive && <Toolbar section={section} onUpdate={(u) => onUpdate(section.id, u)} onClose={() => onSetActive(null)} />}

      <div className="section-item__actions" style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}>
        <button onClick={(e) => { e.stopPropagation(); onRemove(section.id); }} className="action-btn action-btn--delete"><Trash2 className="icon-xs" /></button>
        <button onClick={(e) => { e.stopPropagation(); onAdd(index); }} className="action-btn"><Plus className="icon-xs" /></button>
      </div>

      <div 
        ref={contentRef}
        contentEditable
        onBlur={handleBlur}
        className={`section-editor ${'type-' + section.type}`}
        onKeyPress={(e) => { if (e.key === 'Enter') document.execCommand('insertLineBreak'); }}
      />
      
      {section.type === 'callout' && (
        <div className="callout-footer">
          <span className="callout-number">{index + 1}.</span>
          <button className="callout-button">{section.buttonText || 'Shop Now'}</button>
        </div>
      )}
    </div>
  );
};

export const Preview: React.FC<PreviewProps> = ({ config, onUpdateSection, onAddSection, onRemoveSection, onConfigChange }) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isDisclaimerFocused, setIsDisclaimerFocused] = useState(false);
  
  const bestRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bestText = config.signatureBest || '';
    const nameText = config.signatureName || '';
    const discText = config.disclaimerText || '';

    if (bestRef.current && bestRef.current.innerHTML !== bestText) {
      bestRef.current.innerHTML = bestText;
    }
    if (nameRef.current && nameRef.current.innerHTML !== nameText) {
      nameRef.current.innerHTML = nameText;
    }
    if (disclaimerRef.current && disclaimerRef.current.innerHTML !== discText) {
      disclaimerRef.current.innerHTML = discText;
    }
  }, [config.signatureBest, config.signatureName, config.disclaimerText]);

  const handleAddDisclaimerLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = prompt("Enter the URL for the selected text:");
    if (url) {
      document.execCommand('createLink', false, url);
      // Trigger update manually since blur might not have happened yet
      if (disclaimerRef.current) {
        onConfigChange({ disclaimerText: disclaimerRef.current.innerHTML });
      }
    }
  };

  return (
    <div className="preview-pane" onClick={() => setActiveSectionId(null)}>
      {config.showLogo && (
        <div className="preview-header">
          <img src="https://www.glassesusa.com/media/wysiwyg/lp20/gusa-logo-b.png" width="100" alt="Logo" />
        </div>
      )}

      <div className="preview-content">
        {config.sections.map((section, idx) => (
          <SectionItem 
            key={section.id} section={section} index={idx}
            isActive={activeSectionId === section.id}
            onSetActive={setActiveSectionId}
            onUpdate={onUpdateSection} onAdd={onAddSection} onRemove={onRemoveSection}
          />
        ))}
      </div>

      <div className="footer-info" style={{ padding: '0 1.5rem 1.5rem' }}>
        {config.showSignature && (
          <div className="signature" style={{ padding: '1rem 0', cursor: 'text' }}>
            <p 
              ref={bestRef}
              contentEditable 
              onBlur={() => onConfigChange({ signatureBest: bestRef.current?.innerHTML || '' })}
              style={{ margin: 0, fontWeight: 500, outline: 'none' }} 
            />
            <p 
              ref={nameRef}
              contentEditable 
              onBlur={() => onConfigChange({ signatureName: nameRef.current?.innerHTML || '' })}
              style={{ margin: 0, fontWeight: 700, outline: 'none' }} 
            />
          </div>
        )}
        {config.showDisclaimer && (
          <div className="disclaimer-wrapper" style={{ position: 'relative' }}>
            {isDisclaimerFocused && (
              <button 
                className="disclaimer-link-tool"
                onMouseDown={handleAddDisclaimerLink}
                title="Add link to selected text"
              >
                <LinkIcon size={12} /> Add Link
              </button>
            )}
            <div 
              ref={disclaimerRef}
              contentEditable 
              onFocus={() => setIsDisclaimerFocused(true)}
              onBlur={() => {
                // Use a small timeout to allow click events on the link tool to register first
                setTimeout(() => setIsDisclaimerFocused(false), 200);
                onConfigChange({ disclaimerText: disclaimerRef.current?.innerHTML || '' });
              }}
              className="disclaimer" 
              style={{ outline: 'none', cursor: 'text', padding: '1rem 0', borderTop: '1px solid #f3f4f6' }}
            />
          </div>
        )}
      </div>

      {config.showFooter && (
        <footer className="main-footer">
          <div className="main-footer__container">
            <div className="main-footer__help-text">
              <b>Need help with your order?</b>
              <span className="main-footer__help-subtext" style={{ fontSize: '16px', fontWeight: 400 }}>We are here for you 24/7!</span>
            </div>
            
            <div className="footer-assets-grid">
               <div className="footer-pill-btn">
                 <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" width="108" alt="Live Chat" />
               </div>
               <div className="footer-pill-btn">
                 <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png" width="108" alt="Call Us" />
               </div>
               <div className="footer-pill-btn">
                 <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png" width="108" alt="Help Center" />
               </div>
            </div>

            <div className="footer-social-grid" style={{ gap: '24px' }}>
              <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="Facebook" />
              <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="Instagram" />
              <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="TikTok" />
              <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/twiter.png" alt="Twitter" />
              <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png" alt="YouTube" />
              <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png" alt="Pinterest" />
            </div>

            <p className="footer-tax-info" style={{ marginTop: '24px' }}>
              Insurance claims tax ID: 981385007.
            </p>
            <div className="footer-line-separator"></div>
            <div className="footer-copyright">
              © 2006-2026 Glassesusa.com All Rights Reserved
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};