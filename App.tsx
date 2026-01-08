import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Preview } from './components/Preview';
import { Config, DEFAULT_CONFIG, Section } from './types';
import { Toaster, toast } from 'react-hot-toast';

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  const handleConfigChange = (newConfig: Partial<Config>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleUpdateSection = (id: string, updates: Partial<Section>) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const handleAddSection = (index: number) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'p',
      text: 'New section...',
    };
    const newSections = [...config.sections];
    newSections.splice(index + 1, 0, newSection);
    setConfig(prev => ({ ...prev, sections: newSections }));
  };

  const handleRemoveSection = (id: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== id)
    }));
  };

  const generateHTML = () => {
    const sectionsHTML = config.sections.map((section, idx) => {
      switch (section.type) {
        case 'h1':
          return `<tr><td style="padding: 16px 0;"><h1 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0;">${section.text || ''}</h1></td></tr>`;
        case 'h2':
          return `<tr><td style="padding: 12px 0;"><h2 style="font-size: 18px; font-weight: 700; color: #1f2937; margin: 0;">${section.text || ''}</h2></td></tr>`;
        case 'p':
          return `<tr><td style="padding: 8px 0;"><p style="font-size: 14px; color: #4b5563; margin: 0; line-height: 1.6;">${section.text || ''}</p></td></tr>`;
        case 'divider':
          return `<tr><td style="padding: 24px 0;"><div style="height: 1px; background-color: #e5e7eb;"></div></td></tr>`;
        case 'callout':
          return `
            <tr><td style="padding: 20px 0;">
              <p style="font-size: 14px; color: #374151; margin-bottom: 12px;">${section.text || ''}</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: ${config.brandColor}; font-weight: bold; font-size: 16px; padding-right: 12px;">${idx + 1}.</td>
                  <td><a href="${config.shopUrl}" style="background-color: #000000; color: #ffffff; padding: 10px 20px; border-radius: 50px; font-size: 11px; font-weight: bold; text-decoration: none; text-transform: uppercase;">Shop Now</a></td>
                </tr>
              </table>
            </td></tr>`;
        default: return '';
      }
    }).join('');

    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Email Template</title></head>
<body style="background: #FBFBFB; margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff;">
    <tr><td style="padding: 32px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        ${config.showLogo ? `<tr><td style="padding-bottom: 32px;"><img src="https://www.glassesusa.com/media/wysiwyg/lp20/gusa-logo-b.png" width="100"></td></tr>` : ''}
        ${sectionsHTML}
        ${config.showSignature ? `<tr><td style="padding-top: 32px;"><p style="margin: 0; font-weight: 500;">${config.signatureBest || ''}</p><p style="margin: 0; font-weight: 700;">${config.signatureName || ''}</p></td></tr>` : ''}
        ${config.showDisclaimer ? `<tr><td style="padding-top: 24px; font-size: 9px; color: #6b7280; text-align: justify; line-height: 1.2;">${config.disclaimerText || ''}</td></tr>` : ''}
      </table>
    </td></tr>
    ${config.showFooter ? `<tr><td>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #020621; color: #ffffff; text-align: center; padding: 32px 16px;">
        <tr><td style="font-size: 20px; line-height: 28px; font-weight: normal;"><b>Need help with your order?</b> We are here for you 24/7!</td></tr>
        <tr><td height="24"></td></tr>
        <tr><td align="center">
          <table align="center" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" width="108" alt="chat"></td>
              <td width="8"></td>
              <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png" width="108" alt="call us"></td>
              <td width="8"></td>
              <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png" width="108" alt="help center"></td>
            </tr>
          </table>
        </td></tr>
        <tr><td height="30"></td></tr>
        <tr><td align="center">
          <table align="center" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="fb"></td>
              <td width="36"></td>
              <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="ig"></td>
              <td width="36"></td>
              <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="tt"></td>
            </tr>
          </table>
        </td></tr>
        <tr><td height="24"></td></tr>
        <tr><td style="font-size: 14px; color: #B8C4CB;">Insurance claims tax ID: 981385007.</td></tr>
        <tr><td height="16"></td></tr>
        <tr><td align="center"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/line-border.png" width="300" style="display: block;"></td></tr>
        <tr><td height="12"></td></tr>
        <tr><td style="font-size: 12px; color: #B0BDC5;">© 2006-2026 GlassesUSA.com All Rights Reserved</td></tr>
      </table>
    </td></tr>` : ''}
  </table>
</body></html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateHTML()).then(() => toast.success('HTML Copied!'));
  };

  const handleDownload = () => {
    const blob = new Blob([generateHTML()], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `callout-${config.storeView.toLowerCase()}.html`;
    link.click();
  };

  return (
    <div className="app-container">
      <Sidebar config={config} onChange={handleConfigChange} onCopy={handleCopyCode} onDownload={handleDownload} />
      <main className="main-content">
        <div className="preview-wrapper">
          <Preview 
            config={config} 
            onUpdateSection={handleUpdateSection} 
            onAddSection={handleAddSection} 
            onRemoveSection={handleRemoveSection} 
            onConfigChange={handleConfigChange}
          />
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;