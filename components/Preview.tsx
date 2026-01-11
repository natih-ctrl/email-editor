import React, { useState, useRef, useEffect } from 'react';
import { Config, Section } from '../types';
import { 
  X, Plus, Link as LinkIcon, Delete, 
  Circle, MousePointerClick, ArrowDownToLine
} from 'lucide-react';
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
  isAdjacentToCallout: boolean;
  onUpdate: (updates: Partial<Section>) => void;
  onClose: () => void;
}> = ({ section, isAdjacentToCallout, onUpdate, onClose }) => {
  return (
    <div className="toolbar" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="toolbar__close-btn" title="Close Toolbar">
        <X size={18} />
      </button>

      <div className="toolbar__divider" />

      <div className="toolbar__actions">
        <button 
          onClick={() => onUpdate({ type: 'h1' })}
          className={`toolbar__action-btn ${section.type === 'h1' ? 'toolbar__action-btn--active' : ''}`}
        >H1</button>
        <button 
          onClick={() => onUpdate({ type: 'h2' })}
          className={`toolbar__action-btn ${section.type === 'h2' ? 'toolbar__action-btn--active' : ''}`}
        >H2</button>
        <button 
          disabled={isAdjacentToCallout}
          onClick={() => !isAdjacentToCallout && onUpdate({ type: 'p' })}
          className={`toolbar__action-btn ${section.type === 'p' ? 'toolbar__action-btn--active' : ''}`}
          style={isAdjacentToCallout ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
          title={isAdjacentToCallout ? "Cannot use paragraph next to a bullet" : "Paragraph"}
        >Tt</button>
        
        <button 
          onClick={() => onUpdate({ type: 'callout', showButton: false })}
          className={`toolbar__action-btn ${section.type === 'callout' && !section.showButton ? 'toolbar__action-btn--active' : ''}`}
          title="Bullet Only"
        ><Circle size={16} strokeWidth={2.5} /></button>

        <button 
          onClick={() => onUpdate({ type: 'callout', showButton: true })}
          className={`toolbar__action-btn ${section.type === 'callout' && section.showButton ? 'toolbar__action-btn--active' : ''}`}
          title="Add CTA (Button)"
        ><MousePointerClick size={16} strokeWidth={2.5} /></button>
        
        <button 
          onClick={() => onUpdate({ type: 'divider' })}
          className={`toolbar__action-btn ${section.type === 'divider' ? 'toolbar__action-btn--active' : ''}`}
          title="Divider"
        ><ArrowDownToLine size={16} strokeWidth={2.5} /></button>
      </div>
    </div>
  );
};

const SectionItem: React.FC<{
  section: Section;
  index: number;
  isActive: boolean;
  isAdjacentToCallout: boolean;
  onSetActive: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<Section>) => void;
  onAdd: (index: number) => void;
  onRemove: (id: string) => void;
}> = ({ section, index, isActive, isAdjacentToCallout, onSetActive, onUpdate, onAdd, onRemove }) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const safeText = section.text || '';
    if (contentRef.current && contentRef.current.innerHTML !== safeText) {
      contentRef.current.innerHTML = safeText;
    }
  }, [section.text]);

  const handleBlur = () => {
    if (contentRef.current) {
      let content = contentRef.current.innerHTML;
      if (content === '<br>' || content === '<div><br></div>' || content.trim() === '') {
        contentRef.current.innerHTML = '';
        content = '';
      }
      onUpdate(section.id, { text: content });
    }
  };

  const handleButtonBlur = () => {
    if (buttonRef.current) {
      onUpdate(section.id, { buttonText: buttonRef.current.innerText });
    }
  };

  return (
    <div 
      className={`section-item ${isActive ? 'section-item--active' : ''} ${section.type === 'divider' ? 'section-item--divider' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSetActive(section.id); }}
    >
      {isActive && (
        <Toolbar 
          section={section} 
          isAdjacentToCallout={isAdjacentToCallout}
          onUpdate={(u) => onUpdate(section.id, u)} 
          onClose={() => onSetActive(null)} 
        />
      )}

      {isActive && (
        <div className="section-item__floating-actions">
          <button onClick={(e) => { e.stopPropagation(); onRemove(section.id); }} className="section-action-btn btn-delete" title="Delete section">
            <Delete size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onAdd(index); }} className="section-action-btn btn-add" title="Add section after">
            <Plus size={18} />
          </button>
        </div>
      )}

      {section.type === 'divider' ? (
        <div className="preview-divider-wrapper">
          <div className="preview-divider-line" />
        </div>
      ) : section.type === 'callout' ? (
        <div className="bullet-container-wrapper">
          <div className="bullet-container">
            <div className="bullet-left-line"></div>
            <div className="bullet-content">
              <div 
                ref={contentRef}
                contentEditable
                onBlur={handleBlur}
                className="section-editor type-callout"
                data-placeholder="Start typing callout text..."
                onKeyPress={(e) => { 
                  if (e.key === 'Enter') {
                    e.preventDefault(); 
                  }
                }}
              />
              {section.showButton && (
                <div className="bullet-footer">
                  <button 
                    ref={buttonRef}
                    className="callout-button"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleButtonBlur}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {section.buttonText || 'Upload Now'}
                  </button>
                  <div className="inline-url-wrapper">
                    <button 
                      className={`url-toggle-btn ${section.url ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setShowUrlInput(!showUrlInput); }}
                      title="Enter URL"
                    >
                      <LinkIcon size={14} />
                    </button>
                    {showUrlInput && (
                      <input 
                        type="text"
                        placeholder="http://"
                        className="inline-url-input"
                        value={section.url || ''}
                        onChange={(e) => onUpdate(section.id, { url: e.target.value })}
                        onBlur={() => setShowUrlInput(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setShowUrlInput(false);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div 
          ref={contentRef}
          contentEditable
          onBlur={handleBlur}
          className={`section-editor type-${section.type}`}
          data-placeholder="Start typing your content here..."
          onKeyPress={(e) => { 
             if (e.key === 'Enter') {
               document.execCommand('insertLineBreak');
               e.preventDefault();
             }
          }}
        />
      )}
    </div>
  );
};

export const Preview: React.FC<PreviewProps> = ({ config, onUpdateSection, onAddSection, onRemoveSection, onConfigChange }) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [showLinkTool, setShowLinkTool] = useState(false);
  const [toolPosition, setToolPosition] = useState({ top: 0, left: 0 });
  
  const bestRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bestRef.current && bestRef.current.innerHTML !== config.signatureBest) {
      bestRef.current.innerHTML = config.signatureBest || '';
    }
    if (nameRef.current && nameRef.current.innerHTML !== config.signatureName) {
      nameRef.current.innerHTML = config.signatureName || '';
    }
    if (disclaimerRef.current && disclaimerRef.current.innerHTML !== config.disclaimerText) {
      disclaimerRef.current.innerHTML = config.disclaimerText || '';
    }
  }, [config.signatureBest, config.signatureName, config.disclaimerText]);

  // Handle global selection to show link tool
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0 && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Ensure the selection is within an editor
        let parent = selection.anchorNode?.parentElement;
        let isInsideEditor = false;
        while(parent) {
          if (parent.hasAttribute('contenteditable')) {
            isInsideEditor = true;
            break;
          }
          parent = parent.parentElement;
        }

        if (isInsideEditor) {
          setToolPosition({
            top: rect.top + window.scrollY - 40,
            left: rect.left + rect.width / 2
          });
          setShowLinkTool(true);
          return;
        }
      }
      setShowLinkTool(false);
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleCreateLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = prompt("Enter the URL for the selected text:");
    if (url) {
      document.execCommand('createLink', false, url);
      // We don't need to manually update state here for paragraphs because the contentRef blurs handle it
      // But we hide the tool immediately
      setShowLinkTool(false);
    }
  };

  return (
    <div className="preview-pane" onClick={() => setActiveSectionId(null)}>
      {showLinkTool && (
        <button 
          className="floating-link-tool"
          style={{ top: toolPosition.top, left: toolPosition.left }}
          onMouseDown={handleCreateLink}
        >
          <LinkIcon size={14} strokeWidth={2.5} />
          <span>Link</span>
        </button>
      )}

      {config.showLogo && (
        <div className="preview-logo-wrapper-outer">
          <table className="desktop-version-width" width="100%" align="center">
            <tbody>
              <tr><td height="12"></td></tr>
              <tr>
                <td>
                  <img 
                    className="desktop-version-logo" 
                    src="https://www.glassesusa.com/media/wysiwyg/lp20/gusa-logo-b.png" 
                    alt="Logo" 
                  />
                </td>
              </tr>
              <tr><td className="desktop-version-width-height" height="24"></td></tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="preview-container-inner">
        <div className="preview-content-list">
          {config.sections.map((section, idx) => {
            const isAdjacentToCallout = 
              (idx > 0 && config.sections[idx - 1].type === 'callout') ||
              (idx < config.sections.length - 1 && config.sections[idx + 1].type === 'callout');

            return (
              <SectionItem 
                key={section.id} 
                section={section} 
                index={idx}
                isActive={activeSectionId === section.id}
                isAdjacentToCallout={isAdjacentToCallout}
                onSetActive={setActiveSectionId}
                onUpdate={onUpdateSection} onAdd={onAddSection} onRemove={onRemoveSection}
              />
            );
          })}
          <div className="persistent-add-wrapper">
            <button onClick={() => onAddSection(config.sections.length - 1)} className="section-action-btn btn-add" title="Add final section">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {config.showSignature && (
          <div className="signature-preview">
            <p 
              ref={bestRef}
              contentEditable 
              onBlur={() => onConfigChange({ signatureBest: bestRef.current?.innerHTML || '' })}
              className="signature-text signature-text--best"
            />
            <p 
              ref={nameRef}
              contentEditable 
              onBlur={() => onConfigChange({ signatureName: nameRef.current?.innerHTML || '' })}
              className="signature-text signature-text--name"
            />
          </div>
        )}

        {config.showDisclaimer && (
          <div className="disclaimer-preview-wrapper">
            <div className="disclaimer-divider"></div>
            <div 
              ref={disclaimerRef}
              contentEditable 
              onBlur={() => {
                onConfigChange({ disclaimerText: disclaimerRef.current?.innerHTML || '' });
              }}
              className="disclaimer-preview-text"
            />
          </div>
        )}
      </div>

      {config.showFooter && (
        <footer className="template-footer">
          <table className="trans-txt-d-bc" style={{ background: '#020621', color: '#fff', textAlign: 'center', margin: 'auto', width: '100%' }} cellPadding="0" cellSpacing="0">
            <tbody>
              <tr><td height="24"></td></tr>
              <tr className="trans-txt-d-b" style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '20px', lineHeight: '28px' }}>
                <td>
                  <b className="trans-txt-d-inline" style={{ display: 'block' }}> Need help with your order? </b>
                  <span style={{ fontSize: '18px' }} className="trans-txt-d-normal"> We are here for you 24/7!</span>
                </td>
              </tr>
              <tr><td className="trans-txt-d-b-top" height="24"></td></tr>
              
              <tr className="desktop-cta-row" style={{ display: 'table', margin: 'auto' }} align="center">
                <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" className="colored" alt="chat" /></td>
                <td width="8"></td>
                <td>
                  <a href="tel:+1-844-244-1186">
                    <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png" className="colored" alt="call us" />
                  </a>
                </td>
                <td width="8"></td>
                <td>
                  <a href="https://www.glassesusa.com/help-center">
                    <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png" className="colored" alt="help center" />
                  </a>
                </td>
              </tr>

              <tr className="mobile-cta-row" style={{ display: 'table', margin: 'auto' }} align="center">
                <td><img className="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/lc-n.png" alt="chat" /></td>
                <td width="8"></td>
                <td>
                  <a href="tel:+1-844-244-1186">
                    <img className="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/cu-n.png" alt="call us" />
                  </a>
                </td>
                <td width="8"></td>
                <td>
                  <a href="https://www.glassesusa.com/help-center">
                    <img className="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/hc-n.png" alt="help center" />
                  </a>
                </td>
              </tr>

              <tr><td height="30"></td></tr>
              <tr style={{ display: 'table', margin: 'auto' }} align="center">
                <td><a href="https://www.facebook.com/GlassesUSA/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="facebook" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.instagram.com/glassesusa/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="instagram" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.tiktok.com/@glassesusa?"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="tiktok" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.youtube.com/user/GlassesUSA"><img style={{ verticalAlign: 'top' }} src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png" alt="youtube" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.pinterest.com/glassesusa/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png" alt="printerest" /></a></td>
              </tr>
              <tr><td height="38"></td></tr>
              <tr>
                <td align="center">
                  <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/line-border.png" width="300" style={{ display: 'block', margin: 'auto' }} alt="border" />
                </td>
              </tr>
              <tr><td height="12"></td></tr>
              <tr>
                <td style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '12px', lineHeight: '25px', textAlign: 'center', color: '#B0BDC5' }}>
                  © 2006-2026 Glassesusa.com All Rights Reserved
                </td>
              </tr>
              <tr><td height="24"></td></tr>
            </tbody>
          </table>
        </footer>
      )}
    </div>
  );
};