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
          return `<tr><td style="padding: 16px 0;"><h1 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0; font-family: inherit;">${section.text || ''}</h1></td></tr>`;
        case 'h2':
          return `<tr><td style="padding: 12px 0;"><h2 style="font-size: 18px; font-weight: 700; color: #1f2937; margin: 0; font-family: inherit;">${section.text || ''}</h2></td></tr>`;
        case 'p':
          return `<tr><td style="padding: 8px 0;"><p style="font-size: 14px; color: #4b5563; margin: 0; line-height: 1.6; font-family: inherit;">${section.text || ''}</p></td></tr>`;
        case 'divider':
          return `<tr><td style="padding: 24px 0;"><div style="height: 1px; background-color: #e5e7eb;"></div></td></tr>`;
        case 'callout':
          return `
            <tr><td style="padding: 20px 0; font-family: inherit;">
              <p style="font-size: 14px; color: #374151; margin-bottom: 12px; margin-top: 0;">${section.text || ''}</p>
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="color: ${config.brandColor}; font-weight: bold; font-size: 16px; padding-right: 12px;">${idx + 1}.</td>
                  <td><a href="${config.shopUrl}" style="background-color: #000000; color: #ffffff; padding: 10px 20px; border-radius: 50px; font-size: 11px; font-weight: bold; text-decoration: none; text-transform: uppercase; display: inline-block;">Shop Now</a></td>
                </tr>
              </table>
            </td></tr>`;
        default: return '';
      }
    }).join('');

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600" />
    <title>GlassesUSA.com</title>
    <style type="text/css">
        @media only screen and (min-width: 420px) {
            body {
                font-family: Roboto, Arial, sans-serif !important;
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
        .disclaimer-content a {
            color: #0066cc;
            text-decoration: underline;
        }
    </style>
</head>
<body style="background: #FBFBFB; margin:auto; max-width:600px; font-family: Helvetica, Arial, sans-serif;">
    <!-- Logo section -->
    <table class="desktop-version-width" width="335" border="0" cellpadding="0" cellspacing="0" align="center">
        <tbody>
            <tr><td height="32"></td></tr>
            ${config.showLogo ? `
            <tr>
                <td>
                    <img width="100" class="desktop-version-logo" style="max-width: 159px; width: 100px;" src="https://www.glassesusa.com/media/wysiwyg/lp20/gusa-logo-b.png" alt="glasses usa" />
                </td>
            </tr>` : ''}
            <tr><td class="desktop-version-width-height" height="24"></td></tr>
        </tbody>
    </table>

    <!-- Main Content section -->
    <table class="desktop-version-width" width="335" border="0" cellpadding="0" cellspacing="0" align="center">
        <tbody>
            ${sectionsHTML}
            
            ${config.showSignature ? `
            <tr>
              <td style="padding-top: 40px;">
                <p style="margin: 0; font-size: 14px; color: #111827; font-weight: 500;">${config.signatureBest || ''}</p>
                <p style="margin: 0; font-size: 14px; color: #111827; font-weight: 700;">${config.signatureName || ''}</p>
              </td>
            </tr>` : ''}

            ${config.showDisclaimer ? `
            <tr><td style="padding-top: 24px;"><div style="height: 1px; background-color: #f3f4f6; width: 100%;"></div></td></tr>
            <tr>
              <td class="disclaimer-content" style="padding: 16px 0 32px 0; font-size: 9px; color: #6b7280; text-align: justify; line-height: 1.4;">
                ${config.disclaimerText || ''}
              </td>
            </tr>` : ''}
        </tbody>
    </table>

    <!-- Footer section -->
    <table class="trans-txt-d-bc" style="background: #020621; color:#fff; text-align: center; margin: auto;" width="100%" align="center" cellpadding="0" cellspacing="0">
        <tbody>
            <tr><td height="32"></td></tr>
            <tr class="trans-txt-d-b" style="font-style: normal; font-weight: normal; font-size:20px !important; line-height: 28px;">
                <td>
                    <b class="trans-txt-d-inline" style="display: block;"> Need help with your order? </b>
                    <span style="font-size: 18px;" class="trans-txt-d-normal"> We are here for you 24/7!</span>
                </td>
            </tr>
            <tr><td class="trans-txt-d-b-top" height="24"></td></tr>
            
            <!-- Desktop CTAs (Hidden on mobile via CSS) -->
            <tr style="display: table; margin: auto;" align="center">
                <td><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" class="colored" style="display: none;" alt="chat" /></td>
                <td width="8"></td>
                <td><a href="tel:+1-844-244-1186"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png" class="colored" style="display: none;" alt="call us" /></a></td>
                <td width="8"></td>
                <td><a href="https://www.glassesusa.com/help-center"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png" class="colored" style="display: none;" alt="help center" /></a></td>
            </tr>
            
            <!-- Mobile CTAs (Hidden on desktop via CSS) -->
            <tr style="display: table; margin: auto;" align="center">
                <td><img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/lc-n.png" alt="chat" /></td>
                <td width="8"></td>
                <td><a href="tel:+1-844-244-1186"><img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/cu-n.png" alt="call us" /></a></td>
                <td width="8"></td>
                <td><a href="https://www.glassesusa.com/help-center"><img class="logomobile" width="108" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/hc-n.png" alt="help center" /></a></td>
            </tr>
            
            <tr><td height="30"></td></tr>
            <tr style="display: table; margin: auto;" align="center">
                <td><a href="https://www.facebook.com/GlassesUSA/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="facebook" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.instagram.com/glassesusa/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="instagram" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.tiktok.com/@glassesusa?"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="tiktok" /></a></td>
                <td width="36"></td>
                <td><a href="https://twitter.com/GlassesUSA"><img style="vertical-align: top;" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/twiter.png" alt="Twitter" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.youtube.com/user/GlassesUSA"><img style="vertical-align: top;" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png" alt="youtube" /></a></td>
                <td width="36"></td>
                <td><a href="https://www.pinterest.com/glassesusa/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png" alt="pinterest" /></a></td>
            </tr>
            <tr><td height="24"></td></tr>
            <tr>
                <td class="footer-width-txt" width="300" style="font-style: normal; font-weight: 300; font-size: 14px; display: table; margin: auto; color: #B8C4CB; line-height: 21px;"> For any insurance claims, please note that the GlassesUSA.com federal tax identification is 981385007. </td>
            </tr>
            <tr><td height="16"></td></tr>
            <tr>
                <td width="300" align="center">
                    <img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/line-border.png" width="300" style="display: block; margin: auto;" alt="" />
                </td>
            </tr>
            <tr><td height="12"></td></tr>
            <tr>
                <td style="font-style: normal; font-weight: normal; font-size: 12px; line-height: 25px; text-align: center; color: #B0BDC5;">
                    © 2006-2026 GlassesUSA.com All Rights Reserved</td>
            </tr>
            <tr><td height="32"></td></tr>
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
