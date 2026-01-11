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
    setConfig(prev => {
      const newSections = prev.sections.map(s => s.id === id ? { ...s, ...updates } : s);
      return { ...prev, sections: newSections };
    });
  };

  const handleAddSection = (index: number) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'p',
      text: '',
      buttonText: 'Upload Now',
      showButton: false,
      url: ''
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

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start a new email? All current changes will be lost.')) {
      setConfig({
        ...DEFAULT_CONFIG,
        sections: [{ id: Math.random().toString(36).substr(2, 9), type: 'p', text: '' }]
      });
      toast.success('Started new email');
    }
  };

  const handleImport = (html: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const sections: Section[] = [];
      const cells = doc.querySelectorAll('td');
      cells.forEach(td => {
        const h1 = td.querySelector('h1');
        const h2 = td.querySelector('h2');
        const p = td.querySelector('p');
        
        if (h1) sections.push({ id: Math.random().toString(36).substr(2, 9), type: 'h1', text: h1.innerHTML });
        else if (h2) sections.push({ id: Math.random().toString(36).substr(2, 9), type: 'h2', text: h2.innerHTML });
        else if (p && !p.classList.contains('signature-text') && !p.closest('.template-footer')) {
           sections.push({ id: Math.random().toString(36).substr(2, 9), type: 'p', text: p.innerHTML });
        }
      });

      if (sections.length > 0) {
        setConfig(prev => ({
          ...prev,
          sections: sections
        }));
        toast.success('Imported sections from HTML');
      } else {
        toast.error('Could not find compatible sections in HTML');
      }
    } catch (e) {
      toast.error('Failed to parse HTML');
    }
  };

  const generateHTML = () => {
    const sectionsHTML = config.sections.map((section) => {
      switch (section.type) {
        case 'h1':
          return `<tr><td style="padding: 16px 40px;"><h1 style="font-size: 24px; font-weight: 700; line-height: 32px; color: #0F0F0F; margin: 0; font-family: Roboto, Helvetica, Arial, sans-serif;">${section.text || ''}</h1></td></tr>`;
        case 'h2':
          return `<tr><td style="padding: 16px 40px;"><h2 style="font-size: 18px; font-weight: 700; line-height: 26px; color: #0F0F0F; margin: 0; font-family: Roboto, Helvetica, Arial, sans-serif;">${section.text || ''}</h2></td></tr>`;
        case 'p':
          return `<tr><td style="padding: 16px 40px;"><p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #0F0F0F; margin: 0; font-family: Roboto, Helvetica, Arial, sans-serif;">${section.text || ''}</p></td></tr>`;
        case 'divider':
          return `<tr><td style="padding: 24px 40px;"><div style="height: 1px; background-color: #DEDEDE;"></div></td></tr>`;
        case 'callout':
          return `
            <tr><td style="padding: 16px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px; background-color: #ffffff; border-collapse: separate;">
                <tr>
                  <td width="4" style="background-color: #277BDA; border-radius: 4px 0 0 4px; font-size: 0; line-height: 0;">&nbsp;</td>
                  <td style="padding: 16px; font-family: Roboto, Helvetica, Arial, sans-serif;">
                    <div style="font-size: 16px; font-weight: 400; line-height: 24px; color: #0F0F0F;">
                      ${section.text || ''}
                    </div>
                    ${section.showButton ? `
                    <div style="padding-top: 16px;">
                      <a href="${section.url || '#'}" style="background-color: #0F0F0F; color: #ffffff; padding: 8px 24px; text-align: center; border-radius: 16px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block;">${section.buttonText || 'Upload Now'}</a>
                    </div>` : ''}
                  </td>
                </tr>
              </table>
            </td></tr>`;
        default: return '';
      }
    }).join('');

    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600">
    <title>GlassesUSA.com</title>
    <style>
        @media only screen and (min-width: 420px) {
            body {
                font-family: Roboto !important;
            }

            .desktop-version-width {
                width: 524px !important;
            }

            img.desktop-version-logo {
                width: 159px !important;
            }

            td.desktop-version-width-height {
                height: 38px !important;
            }

            td.trans-txt-d-b-top {
                height: 16px;
            }

            .colored {
                display: block !important;
            }

            .logomobile {
                display: none !important;
            }

            span.trans-txt-d-normal {
                font-size: 16px !important;
            }

            .trans-txt-d-inline {
                display: inline !important;
                font-size: 16px !important;
            }

            td.footer-width-txt {
                width: 370px !important;
            }
        }
    </style>
</head>
<body style="background: #FBFBFB; margin:auto; max-width:600px; font-family: Helvetica, Roboto, sans-serif;">
    <table class="desktop-version-width" width="335" border="0" cellpadding="0" cellspacing="0" align="center">
        <tbody>
            <tr><td height="12"></td></tr>
            <tr>
                <td>
                    <img width="100" class="desktop-version-logo" style="max-width: 159px; width: 100px;" src="https://www.glassesusa.com/media/wysiwyg/lp20/gusa-logo-b.png" alt="glasses usa">
                </td>
            </tr>
            <tr><td class="desktop-version-width-height" height="24"></td></tr>
        </tbody>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff;">
        <tbody>
            ${sectionsHTML}

            ${config.showSignature ? `
            <tr>
                <td style="padding: 40px 40px 24px 40px; font-family: Roboto, sans-serif;">
                    <p style="margin: 0; font-size: 16px; color: #0F0F0F; font-weight: 400;">${config.signatureBest}</p>
                    <p style="margin: 0; font-size: 16px; color: #0F0F0F; font-weight: 400;">${config.signatureName}</p>
                </td>
            </tr>` : ''}

            ${config.showDisclaimer ? `
            <tr>
                <td style="padding: 0 40px;">
                    <div style="height: 1px; background-color: #DEDEDE;"></div>
                </td>
            </tr>
            <tr>
                <td style="padding: 24px 40px; font-size: 12px; color: #3A4850; line-height: 18px; text-align: justify; font-family: Roboto, sans-serif;">
                    ${config.disclaimerText}
                </td>
            </tr>` : ''}
            
            ${config.showFooter ? `
            <tr>
                <td>
                    <table class="trans-txt-d-bc" style="background: #020621; color:#fff; text-align: center; margin: auto;" width="100%" align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr><td height="24"></td></tr>
                            <tr class="trans-txt-d-b" style="font-style: normal; font-weight: normal; font-size:20px !important; line-height: 28px;">
                                <td>
                                    <b class="trans-txt-d-inline" style="display: block;"> Need help with your order? </b>
                                    <span style="font-size: 18px;" class="trans-txt-d-normal"> We are here for you 24/7!</span>
                                </td>
                            </tr>
                            <tr><td class="trans-txt-d-b-top" height="24"></td></tr>
                            
                            <tr style="display: table; margin: auto;" align="center">
                                <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" class="colored" style="display: none;" alt="chat"></td>
                                <td width="8"></td>
                                <td>
                                    <a href="tel:+1-844-244-1186">
                                        <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png" class="colored" style="display: none;" alt="call us">
                                    </a>
                                </td>
                                <td width="8"></td>
                                <td>
                                    <a href="https://www.glassesusa.com/help-center">
                                        <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png" class="colored" style="display: none;" alt="help center">
                                    </a>
                                </td>
                            </tr>
                            
                            <tr style="display: table; margin: auto;" align="center">
                                <td><img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/lc-n.png" alt="chat"></td>
                                <td width="8"></td>
                                <td>
                                    <a href="tel:+1-844-244-1186">
                                        <img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/cu-n.png" alt="call us">
                                    </a>
                                </td>
                                <td width="8"></td>
                                <td>
                                    <a href="https://www.glassesusa.com/help-center">
                                        <img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/hc-n.png" alt="help center">
                                    </a>
                                </td>
                            </tr>

                            <tr><td height="30"></td></tr>
                            <tr style="display: table; margin: auto;" align="center">
                                <td><a href="https://www.facebook.com/GlassesUSA/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="facebook"></a></td>
                                <td width="36"></td>
                                <td><a href="https://www.instagram.com/glassesusa/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="instagram"></a></td>
                                <td width="36"></td>
                                <td><a href="https://www.tiktok.com/@glassesusa?"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="tiktok"></a></td>
                                <td width="36"></td>
                                <td><a href="https://www.youtube.com/user/GlassesUSA"><img style="vertical-align: top;" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png" alt="youtube"></a></td>
                                <td width="36"></td>
                                <td><a href="https://www.pinterest.com/glassesusa/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png" alt="printerest"></a></td>
                            </tr>
                            <tr><td height="38"></td></tr>
                            <tr>
                                <td width="300" align="center">
                                    <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/line-border.png" width="300" style="display: block; margin: auto;" alt="">
                                </td>
                            </tr>
                            <tr><td height="12"></td></tr>
                            <tr>
                                <td style="font-family: Roboto, sans-serif; font-size: 12px; line-height: 25px; text-align: center; color: #B0BDC5;">
                                    © 2006-2026 Glassesusa.com All Rights Reserved
                                </td>
                            </tr>
                            <tr><td height="24"></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>` : ''}
        </tbody>
    </table>
</body>
</html>`;
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
      <Sidebar 
        config={config} 
        onChange={handleConfigChange} 
        onUpdateSection={handleUpdateSection}
        onCopy={handleCopyCode} 
        onDownload={handleDownload} 
        onReset={handleReset}
        onImport={handleImport}
      />
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
