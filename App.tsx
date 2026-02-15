import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar.tsx";
import { Preview } from "./components/Preview.tsx";
import { Config, DEFAULT_CONFIG, Section } from "./types.ts";
import { Toaster, toast } from "react-hot-toast";

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  const handleConfigChange = (newConfig: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleUpdateSection = (id: string, updates: Partial<Section>) => {
    setConfig((prev) => {
      const newSections = prev.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      );
      return { ...prev, sections: newSections };
    });
  };

  const handleAddSection = (index: number) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      type: "h1",
      text: "",
      buttonText: "Upload Now",
      showButton: false,
      url: "",
    };

    const newSections = [...config.sections];
    newSections.splice(index + 1, 0, newSection);
    setConfig((prev) => ({ ...prev, sections: newSections }));
  };

  const handleRemoveSection = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
    }));
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to start a new email? All current changes will be lost.",
      )
    ) {
      setConfig({
        ...DEFAULT_CONFIG,
        sections: [
          { id: Math.random().toString(36).substr(2, 9), type: "h1", text: "" },
        ],
      });
      toast.success("Started new email");
    }
  };

  const handleImport = (html: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const sections: Section[] = [];
      let importedSigBest = DEFAULT_CONFIG.signatureBest;
      let importedSigName = DEFAULT_CONFIG.signatureName;
      let importedDisclaimer = DEFAULT_CONFIG.disclaimerText;

      let hasLogo =
        !!doc.querySelector("img.desktop-version-logo") ||
        html.includes("gusalogo.png");
      let hasSignature = false;
      let hasDisclaimer = false;
      let hasFooter =
        !!doc.querySelector(".v4-footer-table") ||
        !!doc.querySelector(".trans-txt-d-bc") ||
        html.includes("Need help with your order?");

      const rows = Array.from(doc.querySelectorAll("tr"));
      const footerStartIndex = rows.findIndex(
        (tr) =>
          tr.closest(".v4-footer-table") || tr.closest(".trans-txt-d-bc"),
      );

      rows.forEach((tr, index) => {
        // Skip footer rows
        if (footerStartIndex !== -1 && index >= footerStartIndex) return;

        const td = tr.querySelector("td") as HTMLElement | null;
        if (!td) return;

        const style = td.getAttribute("style") || "";
        const innerHTML = td.innerHTML;
        const textContent = td.textContent || "";

        // Skip empty cells
        if (innerHTML === "" && textContent === "") return;

        // 1. Skip layout spacer rows (height-only rows without text)
        const height = td.getAttribute("height");
        if (height && ["40", "32", "12", "24"].includes(height)) {
          if (!textContent || textContent.length < 2) return;
        }

        // 2. Detect Divider Section
        const div = td.querySelector("div");
        if (
          div &&
          !td.querySelector("p") &&
          !td.querySelector("h1") &&
          !td.querySelector("h2")
        ) {
          const divStyle = div.getAttribute("style") || "";
          if (
            divStyle.includes("background-color") ||
            divStyle.includes("border") ||
            divStyle.includes("height: 1px")
          ) {
            if (!textContent || textContent.length < 5) {
              sections.push({
                id: Math.random().toString(36).substr(2, 9),
                type: "divider",
                text: "",
              });
              return;
            }
          }
        }

        // 3. Detect Callout Section (nested table with colored border)
        const nestedTable = td.querySelector("table");
        if (nestedTable) {
          const borderCell = nestedTable.querySelector(
            'td[width="4"]',
          ) as HTMLElement | null;
          const bcStyle = borderCell?.getAttribute("style") || "";
          const isBlue =
            bcStyle.includes("#2563EB") ||
            bcStyle.includes("rgb(37, 99, 235)") ||
            bcStyle.includes("rgb(25, 118, 210)");

          if (isBlue || bcStyle.includes("background")) {
            const contentCells = nestedTable.querySelectorAll("td");
            let contentText = "";
            let button = nestedTable.querySelector("a");

            contentCells.forEach((cell) => {
              const cellStyle = cell.getAttribute("style") || "";
              if (!cellStyle.includes("width") || !cellStyle.includes("#")) {
                const divs = cell.querySelectorAll("div");
                if (divs.length > 0) {
                  contentText = divs[0].innerHTML;
                } else {
                  contentText = cell.innerHTML;
                }
              }
            });

            if (contentText) {
              sections.push({
                id: Math.random().toString(36).substr(2, 9),
                type: "callout",
                text: contentText,
                showButton: !!button,
                buttonText: button?.textContent || "Upload Now",
                url: button?.getAttribute("href") || "",
              });
              return;
            }
          }
        }

        // 4. Detect Signature Block (two p tags that are short)
        const ps = td.querySelectorAll("p");
        if (ps.length >= 2) {
          const p1Text = ps[0].innerHTML;
          const p2Text = ps[1].innerHTML;

          if (
            p1Text.length > 0 &&
            p1Text.length < 30 &&
            p2Text.length > 0 &&
            p2Text.length < 100
          ) {
            const allText = td.textContent || "";
            if (allText.includes("Best") || allText.includes("Regards")) {
              importedSigBest = p1Text;
              importedSigName = p2Text;
              hasSignature = true;
              return;
            }
          }
        }

        // 5. Detect Disclaimer Block (small font, long text)
        if (style.includes("font-size: 12px") || style.includes("font-size: 11px")) {
          if (innerHTML.length > 100) {
            importedDisclaimer = innerHTML;
            hasDisclaimer = true;
            return;
          }
        }

        // 6. Detect Text Sections (H1, H2, P)
        const h1 = td.querySelector("h1");
        const h2 = td.querySelector("h2");
        const p = td.querySelector("p:first-child");

        if (h1) {
          const h1Text = h1.innerHTML;
          if (h1Text && h1Text.length > 0) {
            sections.push({
              id: Math.random().toString(36).substr(2, 9),
              type: "h1",
              text: h1Text,
            });
            return;
          }
        }

        if (h2) {
          const h2Text = h2.innerHTML;
          if (h2Text && h2Text.length > 0) {
            sections.push({
              id: Math.random().toString(36).substr(2, 9),
              type: "h2",
              text: h2Text,
            });
            return;
          }
        }

        if (p) {
          const pText = p.innerHTML;
          if (pText && pText.length > 0) {
            sections.push({
              id: Math.random().toString(36).substr(2, 9),
              type: "p",
              text: pText,
            });
            return;
          }
        }

        // 7. Fallback: If we have text content but no recognized tags, treat as paragraph
        if (
          textContent &&
          textContent.length > 0 &&
          !textContent.includes("<table") &&
          !hasSignature &&
          !hasDisclaimer
        ) {
          // Only add if it looks like meaningful content
          if (textContent.length > 3) {
            sections.push({
              id: Math.random().toString(36).substr(2, 9),
              type: "p",
              text: textContent,
            });
          }
        }
      });

      // Always update config
      setConfig((prev) => ({
        ...prev,
        sections: sections.length > 0 ? sections : prev.sections,
        signatureBest: importedSigBest,
        signatureName: importedSigName,
        disclaimerText: importedDisclaimer,
        showLogo: hasLogo,
        showSignature: hasSignature,
        showDisclaimer: hasDisclaimer,
        showFooter: hasFooter,
      }));

      toast.success(`Email imported successfully! Found ${sections.length} sections`);
    } catch (e) {
      console.error("Import error:", e);
      toast.error("Failed to parse HTML file");
    }
  };

  const generateHTML = () => {
    const sectionsHTML = config.sections
      .map((section) => {
        switch (section.type) {
          case "h1":
            return `<tr><td style="padding: 0 20px 16px 20px;"><h1 style="font-size: 24px; font-weight: 700; line-height: 32px; color: #020621; margin: 0; ">${section.text || ""}</h1></td></tr>`;
          case "h2":
            return `<tr><td style="padding: 0 20px 16px 20px;"><h2 style="font-size: 18px; font-weight: 700; line-height: 26px; color: #020621; margin: 0; ">${section.text || ""}</h2></td></tr>`;
          case "p":
            if (!section.text || section.text.trim() === "") return "";
            return `<tr><td style="padding: 0 20px 16px 20px;"><p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #020621; margin: 0; ">${section.text}</p></td></tr>`;
          case "divider":
            return `<tr><td style="padding: 0 20px 16px 20px;"><div style="height: 1px; background-color: #DEDEDE;"></div></td></tr>`;
          case "callout":
            return `
            
            <tr><td style="padding: 0 20px 16px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 4px; background-color: #ffffff; border-collapse: separate;">
                <tr>
                  <td width="4" style="background-color: #2563EB; border-radius: 4px 0 0 4px; font-size: 0; line-height: 0;">&nbsp;</td>
                  <td style="padding: 16px; ">
                    <div style="font-size: 16px; font-weight: 400; line-height: 24px; color: #020621;">
                      ${section.text || ""}
                    </div>
                    ${
                      section.showButton
                        ? `
                    <div style="padding-top: 16px;">
                      <a href="${section.url || "#"}" style="background-color: #020621; color: #ffffff; padding: 0px 20px;height:32px; line-height:32px; text-align: center; border-radius: 20px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block;">${section.buttonText || "Upload Now"}</a>
                    </div>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td></tr>`;
          default:
            return "";
        }
      })
      .join("");

    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600">
    <title>GlassesUSA.com</title>
    <style>
        @media only screen and (min-width: 420px) {
            body { font-family: Roboto !important; }
            .desktop-version-width { width: 524px !important; }
            img.desktop-version-logo { width: 159px !important; }
            td.desktop-version-width-height { height: 32px !important; }
            td.trans-txt-d-b-top { height: 16px; }
            .colored { display: block !important; }
            .logomobile { display: none !important; }
            span.trans-txt-d-normal { font-size: 16px !important; }
            .trans-txt-d-inline { display: inline !important; font-size: 16px !important; }
            td.footer-width-txt { width: 370px !important; }
        }
    </style>
</head>
<body style="background: #FBFBFB; margin:auto; max-width:600px; font-family: Helvetica, Roboto, sans-serif;margin-top:40px;">
    ${
      config.showLogo
        ? `<table  border="0" cellpadding="0" cellspacing="0" align="center" style="padding: 0px 20px 0px 20px;display: block;">
        <tbody>
                   <tr><td height="40"></td></tr>
            <tr>
                <td>
                      <a href="https://www.glassesusa.com">
                    <img width="100" class="desktop-version-logo" style="max-width: 159px; width: 100px;" src="https://www.glassesusa.com/media/wysiwyg/lp26/gusalogo.png" alt="glasses usa">
              </a>
                    </td>
            </tr>
            <tr><td class="desktop-version-width-height" height="32"></td></tr>
        </tbody>
    </table>`
        : ""
    }

    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
        <tbody>
          
${sectionsHTML}
            ${
              config.showSignature
                ? `
            <tr>
                <td style="padding: 16px 20px 32px 20px; font-family: Roboto, sans-serif;">
                    <p style="margin: 0; font-size: 16px; color: #020621; font-weight: 400;">${config.signatureBest}</p>
                    <p style="margin: 0; font-size: 16px; color: #020621; font-weight: 400;">${config.signatureName}</p>
                </td>
            </tr>`
                : ""
            }

            ${
              config.showDisclaimer
                ? `
            <tr>
                <td style="padding: 0 20px 0 20px;">
                    <div style="height: 1px; background-color: #DEDEDE;"></div>
                </td>
            </tr>
            <tr>
                <td style="padding: 32px 20px 0 20px; font-size: 12px; color: #3A4850; line-height: 18px; font-family: Roboto, sans-serif;">
                    ${config.disclaimerText}
                </td>
            </tr>`
                : ""
            }
            
            <tr><td height="40"></td></tr>

            ${
              config.showFooter
                ? `
            <tr>
                <td>
                    <table class="trans-txt-d-bc" style="background: #020621; color:#fff; text-align: center; margin: auto;" width="100%" align="center" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr><td height="24"></td></tr>
                            <tr class="trans-txt-d-b" style="font-style: normal; font-weight: normal; font-size:20px !important; line-height: 28px;">
                                <td>
                                    <b class="trans-txt-d-inline" style="display: block;"> Need help with your order? </b>   &nbsp;
                                    <span style="font-size: 18px;" class="trans-txt-d-normal"> We are here for you 24/7!</span>
                                </td>
                            </tr>
                            <tr><td class="trans-txt-d-b-top" height="24"></td></tr>
                            
                            <tr style="display: table; margin: auto;" align="center">
                                <td><a href="https://www.glassesusa.com/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png" class="colored" style="display: none;" alt="chat"></a></td>
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

                            <tr><td height="38"></td></tr>
                            <tr style="display: table; margin: auto;" align="center">
                                <td><a href="https://www.facebook.com/GlassesUSA/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png" alt="facebook"></a></td>
                                <td width="36"></td>
                                <td><a href="https://www.instagram.com/glassesusa/"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png" alt="instagram"></a></td>
                                <td width="36"></td>
                                <td><a href="https://www.tiktok.com/@glassesusa"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png" alt="tiktok"></a></td>
                                <td width="36"></td>
                                <td><a href="https://twitter.com/GlassesUSA"><img style="vertical-align: top;" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp26/x.png" alt="Twitter"></a></td>
                                <td width="36"></td>
                                <td><a href="https://www.youtube.com/user/GlassesUSA"><img style="vertical-align: top;" src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png" alt="youtube"></a></td>
                                <td width="36"></td>
                                <td><a href="#"><img src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png" alt="pinterest"></a></td>
                            </tr>
                            
                            <tr><td height="24"></td></tr>
                             <tr>
       
                          
                            <tr>
                                <td style="font-family: Roboto, sans-serif; font-size: 12px; line-height: 25px; text-align: center; color: #B0BDC5;">
                                    © 2006-2026 Glassesusa.com All Rights Reserved
                                </td>
                            </tr>
                            <tr><td height="24"></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>`
                : ""
            }
        </tbody>
    </table>
</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(generateHTML())
      .then(() => toast.success("HTML Copied!"));
  };

  const handleDownload = () => {
    const blob = new Blob([generateHTML()], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `callout-automation.html`;
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
