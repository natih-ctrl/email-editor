import React, { useState, useRef, useEffect } from 'react';
import { Config, Section } from '../types';
import { 
  X, Plus, Delete,
  Circle, ArrowDownToLine, Check, Link2, MousePointer2, Link as LinkIcon, Link2Off
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
  onUpdate: (updates: Partial<Section>) => void;
  onClose: () => void;
}> = ({ section, onUpdate, onClose }) => {
  const changeType = (newType: Section['type'], showButton: boolean = false) => {
    // We only update the type and button visibility to preserve existing text and links
    onUpdate({ 
      type: newType, 
      showButton
    });
  };

  return (
    <div className="toolbar-v4" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="toolbar-v4__btn toolbar-v4__btn--close">
        <X size={18} color="#2563EB" strokeWidth={2.5} />
      </button>
      <div className="toolbar-v4__divider" />
      <div className="toolbar-v4__actions">
        <button 
          onClick={() => changeType('h1')} 
          className={`toolbar-v4__btn ${section.type === 'h1' ? 'active' : ''}`}
        >H1</button>
        <button 
          onClick={() => changeType('h2')} 
          className={`toolbar-v4__btn ${section.type === 'h2' ? 'active' : ''}`}
        >H2</button>
        <button 
          onClick={() => changeType('p')} 
          className={`toolbar-v4__btn ${section.type === 'p' ? 'active' : ''}`}
        >Tt</button>
        <button 
          onClick={() => changeType('callout', false)} 
          className={`toolbar-v4__btn ${section.type === 'callout' && !section.showButton ? 'active' : ''}`}
        >
          <Circle size={18} strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => changeType('callout', true)} 
          className={`toolbar-v4__btn ${section.type === 'callout' && section.showButton ? 'active' : ''}`}
        >
          <MousePointer2 size={18} strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => changeType('divider')} 
          className={`toolbar-v4__btn ${section.type === 'divider' ? 'active' : ''}`}
        >
          <ArrowDownToLine size={18} strokeWidth={1.5} />
        </button>
      </div>
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
  const btnTextRef = useRef<HTMLButtonElement>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    const safeText = section.text || '';
    if (contentRef.current && contentRef.current.innerHTML !== safeText) {
      contentRef.current.innerHTML = safeText;
    }
  }, [section.text, section.type]);

  useEffect(() => {
    if (btnTextRef.current && btnTextRef.current.innerHTML !== (section.buttonText || 'Upload Now')) {
      btnTextRef.current.innerHTML = section.buttonText || 'Upload Now';
    }
  }, [section.buttonText, section.type]);

  const handleBlur = () => {
    if (contentRef.current) {
      onUpdate(section.id, { text: contentRef.current.innerHTML });
    }
  };

  const handleBtnBlur = () => {
    if (btnTextRef.current) {
      onUpdate(section.id, { buttonText: btnTextRef.current.innerHTML });
    }
  };

  const getPlaceholder = () => {
    switch (section.type) {
      case 'h1': return 'Type your main heading...';
      case 'h2': return 'Type your sub-heading...';
      case 'callout': return 'Start typing callout content...';
      default: return 'Start typing your content here...';
    }
  };

  return (
    <div 
      className={`section-item-v4 ${isActive ? 'active' : ''}`} 
      onClick={(e) => { e.stopPropagation(); onSetActive(section.id); }}
    >
      {isActive && (
        <Toolbar 
          section={section} 
          onUpdate={(u) => onUpdate(section.id, u)} 
          onClose={() => onSetActive(null)} 
        />
      )}
      
      {isActive && (
        <div className="section-v4-side-actions">
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove(section.id); }} 
            className="v4-side-btn v4-side-btn--remove"
            title="Remove Section"
          >
            <Delete size={18} strokeWidth={2} color="#1F2937" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(index); }} 
            className="v4-side-btn v4-side-btn--add"
            title="Add Section Below"
          >
            <Plus size={20} strokeWidth={2} color="#1F2937" />
          </button>
        </div>
      )}

      {section.type === 'divider' ? (
        <div className="v4-divider-wrap"><div className="v4-divider-line" /></div>
      ) : section.type === 'callout' ? (
        <div className="v4-callout-card" key={`callout-${section.id}`}>
          <div className="v4-callout-border" />
          <div className="v4-callout-content">
            <div 
              key={`editor-${section.id}-${section.type}`} 
              ref={contentRef} contentEditable onBlur={handleBlur} 
              className="v4-editor v4-callout-text" 
              data-placeholder={getPlaceholder()} 
            />
            {section.showButton && (
              <div className="v4-callout-actions-row">
                <button 
                  ref={btnTextRef}
                  className="v4-callout-btn" 
                  contentEditable 
                  onBlur={handleBtnBlur}
                  onClick={(e) => e.stopPropagation()}
                >
                  {section.buttonText || 'Upload Now'}
                </button>
                {showUrlInput ? (
                  <div className="v4-inline-url-input" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="text" 
                      placeholder="https://" 
                      value={section.url || ''} 
                      onChange={(e) => onUpdate(section.id, { url: e.target.value })}
                      onKeyDown={(e) => { if (e.key === 'Enter') setShowUrlInput(false); }}
                      onBlur={() => setShowUrlInput(false)}
                      autoFocus
                    />
                    <button onMouseDown={(e) => { e.preventDefault(); setShowUrlInput(false); }} className="v4-inline-url-close">
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <button 
                    className={`v4-callout-link-toggle ${section.url ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setShowUrlInput(true); }}
                  >
                    <Link2 size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div 
          key={`editor-${section.id}-${section.type}`} 
          ref={contentRef} contentEditable onBlur={handleBlur} 
          className={`v4-editor type-${section.type}`} 
          data-placeholder={getPlaceholder()} 
          onKeyPress={(e) => { if (e.key === 'Enter') { document.execCommand('insertLineBreak'); e.preventDefault(); } }}
        />
      )}
    </div>
  );
};

export const Preview: React.FC<PreviewProps> = ({ config, onUpdateSection, onAddSection, onRemoveSection, onConfigChange }) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [showLinkTool, setShowLinkTool] = useState(false);
  const [isUrlInputMode, setIsUrlInputMode] = useState(false);
  const [urlValue, setUrlValue] = useState('https://');
  const [hasExistingLink, setHasExistingLink] = useState(false);
  const [toolPosition, setToolPosition] = useState({ top: 0, left: 0 });
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const bestRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  // Sync state to refs when they mount or when config values change
  useEffect(() => {
    if (config.showSignature) {
      if (bestRef.current) bestRef.current.innerHTML = config.signatureBest || '';
      if (nameRef.current) nameRef.current.innerHTML = config.signatureName || '';
    }
    if (config.showDisclaimer) {
      if (disclaimerRef.current) disclaimerRef.current.innerHTML = config.disclaimerText || '';
    }
  }, [
    config.signatureBest, 
    config.signatureName, 
    config.disclaimerText, 
    config.showSignature, 
    config.showDisclaimer
  ]);

  const syncContent = () => {
    const updates: Partial<Config> = {};
    if (disclaimerRef.current) updates.disclaimerText = disclaimerRef.current.innerHTML;
    if (bestRef.current) updates.signatureBest = bestRef.current.innerHTML;
    if (nameRef.current) updates.signatureName = nameRef.current.innerHTML;
    
    if (Object.keys(updates).length > 0) {
      onConfigChange(updates);
    }

    if (activeSectionId) {
      const activeEl = document.querySelector('.section-item-v4.active .v4-editor');
      if (activeEl) onUpdateSection(activeSectionId, { text: activeEl.innerHTML });
    }
  };

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0 && selection.rangeCount > 0 && previewContainerRef.current) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const containerRect = previewContainerRef.current.getBoundingClientRect();

        const anchorNode = selection.anchorNode;
        const anchorParent = anchorNode?.nodeType === 3 ? anchorNode.parentElement : (anchorNode as HTMLElement);
        const editableZone = anchorParent?.closest('[contenteditable="true"]');

        if (editableZone && rect.top >= containerRect.top && rect.bottom <= containerRect.bottom) {
          const existingLink = anchorParent?.closest('a');
          if (existingLink) {
            setHasExistingLink(true);
            const currentHref = existingLink.getAttribute('href') || 'https://';
            if (!isUrlInputMode) setUrlValue(currentHref);
          } else {
            setHasExistingLink(false);
            if (!isUrlInputMode) setUrlValue('https://');
          }

          setToolPosition({
            top: rect.top - containerRect.top + previewContainerRef.current.scrollTop - 48,
            left: rect.left - containerRect.left + rect.width / 2
          });
          
          setSavedRange(range.cloneRange());
          setShowLinkTool(true);
        } else if (!isUrlInputMode) {
          setShowLinkTool(false);
        }
      } else if (!isUrlInputMode) {
        setShowLinkTool(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [isUrlInputMode]);

  const toggleUrlInput = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsUrlInputMode(true);
  };

  const removeLink = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }
    document.execCommand('unlink', false);
    document.execCommand('removeFormat', false);
    syncContent();
    setShowLinkTool(false);
    setIsUrlInputMode(false);
  };

  const applyLink = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }

    const trimmed = urlValue.trim();
    if (!trimmed || trimmed === 'https://' || trimmed === 'http://') {
      document.execCommand('unlink', false);
      document.execCommand('removeFormat', false);
    } else {
      document.execCommand('createLink', false, urlValue);
    }
    
    syncContent();
    setIsUrlInputMode(false);
    setShowLinkTool(false);
    setUrlValue('https://');
  };

  return (
    <div className="v4-preview-pane" ref={previewContainerRef} onClick={() => setActiveSectionId(null)}>
      {showLinkTool && (
        <div 
          className={`v4-link-tool ${isUrlInputMode ? 'expanded' : ''}`} 
          style={{ top: toolPosition.top, left: toolPosition.left }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {!isUrlInputMode ? (
            <button className={`v4-link-circle ${hasExistingLink ? 'has-link' : ''}`} onMouseDown={toggleUrlInput}>
              <LinkIcon size={16} />
            </button>
          ) : (
            <div className="v4-link-input-wrap">
              <input 
                type="text" value={urlValue} onChange={(e) => setUrlValue(e.target.value)} 
                autoFocus placeholder="https://..." onKeyDown={(e) => e.key === 'Enter' && applyLink()}
              />
              <div className="v4-link-input-btns">
                <button onMouseDown={applyLink} className="v4-apply" title="Apply Link"><Check size={16} /></button>
                <button onMouseDown={removeLink} className="v4-remove" title="Unlink & Clear Style"><Link2Off size={16} /></button>
                <button onMouseDown={() => setIsUrlInputMode(false)} title="Close"><X size={16} /></button>
              </div>
            </div>
          )}
        </div>
      )}

      {config.showLogo && (
        <div className="v4-logo-header">
           <img className="desktop-version-logo" src="https://www.glassesusa.com/media/wysiwyg/lp26/gusalogo.png" alt="GlassesUSA" />
        </div>
      )}

      <div className="v4-main-body">
        <div className="v4-sections-list">
          {config.sections.map((section, idx) => (
            <SectionItem 
              key={section.id} 
              section={section} 
              index={idx} 
              isActive={activeSectionId === section.id} 
              onSetActive={setActiveSectionId} 
              onUpdate={onUpdateSection} 
              onAdd={onAddSection} 
              onRemove={onRemoveSection} 
            />
          ))}
        </div>

        {config.showSignature && (
          <div className="v4-signature">
            <p ref={bestRef} contentEditable onBlur={syncContent} suppressContentEditableWarning />
            <p ref={nameRef} contentEditable onBlur={syncContent} suppressContentEditableWarning />
          </div>
        )}

        {config.showDisclaimer && (
          <div className="v4-disclaimer">
            <div className="v4-disclaimer-div" />
            <div ref={disclaimerRef} contentEditable onBlur={syncContent} className="v4-disclaimer-text" suppressContentEditableWarning />
          </div>
        )}
      </div>

      {config.showFooter && (
        <table className="v4-footer-table" width="100%" cellPadding="0" cellSpacing="0" style={{ background: '#020621', color: '#fff', textAlign: 'center', margin: 'auto' }}>
          <tbody>
            <tr><td height="24"></td></tr>
            <tr className="trans-txt-d-b" style={{ fontStyle: 'normal', fontWeight: 'normal', lineHeight: '28px' }}>
              <td>
                <b className="trans-txt-d-inline" style={{ display: 'block' }}>Need help with your order?</b>
                <span className="trans-txt-d-normal" style={{ fontSize: '18px' }}>We are here for you 24/7!</span>
              </td>
            </tr>
            <tr><td className="trans-txt-d-b-top" height="24"></td></tr>
            <tr style={{ display: 'table', margin: 'auto' }}>
              <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" className="colored" style={{ display: 'none' }} alt="chat" /></td>
              <td width="8"></td>
              <td><a href="tel:+1-844-244-1186"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png" className="colored" style={{ display: 'none' }} alt="call us" /></a></td>
              <td width="8"></td>
              <td><a href="https://www.glassesusa.com/help-center"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png" className="colored" style={{ display: 'none' }} alt="help center" /></a></td>
            </tr>
            <tr style={{ display: 'table', margin: 'auto' }}>
              <td><img className="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/lc-n.png" alt="chat" /></td>
              <td width="8"></td>
              <td><a href="tel:+1-844-244-1186"><img className="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/cu-n.png" alt="call us" /></a></td>
              <td width="8"></td>
              <td><a href="https://www.glassesusa.com/help-center"><img className="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/hc-n.png" alt="help center" /></a></td>
            </tr>
            <tr><td height="30"></td></tr>
            <tr style={{ display: 'table', margin: 'auto' }}>
              <td><a href="#"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="facebook" /></a></td>
              <td width="36"></td>
              <td><a href="#"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="instagram" /></a></td>
              <td width="36"></td>
              <td><a href="#"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="tiktok" /></a></td>
              <td width="36"></td>
              <td><a href="#"><img style={{ verticalAlign: 'top' }} src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp26/x.png" alt="X" /></a></td>
              <td width="36"></td>
              <td><a href="#"><img style={{ verticalAlign: 'top' }} src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png" alt="youtube" /></a></td>
              <td width="36"></td>
              <td><a href="#"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png" alt="pinterest" /></a></td>
            </tr>
            <tr><td height="38"></td></tr>
            <tr><td align="center"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/line-border.png" width="300" style={{ display: 'block', margin: 'auto' }} alt="" /></td></tr>
            <tr><td height="12"></td></tr>
            <tr><td className="v4-footer-copy-td" style={{ fontSize: '12px', color: '#B0BDC5' }}>© 2006-2026 Glassesusa.com All Rights Reserved</td></tr>
            <tr><td height="40"></td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};