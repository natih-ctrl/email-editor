import React, { useState, useRef, useEffect } from "react";
import { Config, Section } from "../types";
import "./Preview.css";
import {
  X,
  Plus,
  Delete,
  Circle,
  ArrowDownToLine,
  Check,
  Link2,
  MousePointer2,
  Link as LinkIcon,
  Link2Off,
} from "lucide-react";

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

  onRemove: () => void;
}> = ({ section, onUpdate, onRemove }) => {
  const changeType = (
    newType: Section["type"],
    showButton: boolean = false,
  ) => {
    onUpdate({
      type: newType,
      showButton,
    });
  };

  return (
    <div className="toolbar-v4" onClick={(e) => e.stopPropagation()}>
      <div className="toolbar-v4__actions">
        <button
          onClick={() => changeType("h1")}
          className={`toolbar-v4__btn ${section.type === "h1" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M0 10V0H2V4H6V0H8V10H6V6H2V10H0ZM12 10V2H10V0H14V10H12Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
        <button
          onClick={() => changeType("h2")}
          className={`toolbar-v4__btn ${section.type === "h2" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
          >
            <path
              d="M0 10V0H2V4H6V0H8V10H6V6H2V10H0ZM10 10V6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4H16V2H10V0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V4C18 4.55 17.8042 5.02083 17.4125 5.4125C17.0208 5.80417 16.55 6 16 6H12V8H18V10H10Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
        <button
          onClick={() => changeType("p")}
          className={`toolbar-v4__btn ${section.type === "p" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
          >
            <path
              d="M3.75 12V2.25H0V0H9.75V2.25H6V12H3.75ZM10.5 12V6H8.25V3.75H15V6H12.75V12H10.5Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
        <button
          onClick={() => changeType("callout", false)}
          className={`toolbar-v4__btn ${section.type === "callout" && !section.showButton ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 16C6.89333 16 5.85333 15.79 4.88 15.37C3.90667 14.95 3.06 14.38 2.34 13.66C1.62 12.94 1.05 12.0933 0.63 11.12C0.21 10.1467 0 9.10667 0 8C0 6.89333 0.21 5.85333 0.63 4.88C1.05 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.05 4.88 0.63C5.85333 0.21 6.89333 0 8 0C9.10667 0 10.1467 0.21 11.12 0.63C12.0933 1.05 12.94 1.62 13.66 2.34C14.38 3.06 14.95 3.90667 15.37 4.88C15.79 5.85333 16 6.89333 16 8C16 9.10667 15.79 10.1467 15.37 11.12C14.95 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.95 11.12 15.37C10.1467 15.79 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
        <button
          onClick={() => changeType("callout", true)}
          className={`toolbar-v4__btn ${section.type === "callout" && section.showButton ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M8.77317 16.0573C8.65244 16.0841 8.53171 16.0976 8.41098 16.0976H8.04878C6.93537 16.0976 5.88902 15.8863 4.90976 15.4637C3.93049 15.0412 3.07866 14.4677 2.35427 13.7433C1.62988 13.0189 1.0564 12.1671 0.633841 11.1878C0.21128 10.2085 0 9.1622 0 8.04878C0 6.93537 0.21128 5.88902 0.633841 4.90976C1.0564 3.93049 1.62988 3.07866 2.35427 2.35427C3.07866 1.62988 3.93049 1.0564 4.90976 0.633841C5.88902 0.21128 6.93537 0 8.04878 0C9.1622 0 10.2085 0.21128 11.1878 0.633841C12.1671 1.0564 13.0189 1.62988 13.7433 2.35427C14.4677 3.07866 15.0412 3.93049 15.4637 4.90976C15.8863 5.88902 16.0976 6.93537 16.0976 8.04878V8.41098C16.0976 8.53171 16.0841 8.65244 16.0573 8.77317L14.4878 8.29024V8.04878C14.4878 6.25122 13.864 4.72866 12.6165 3.4811C11.3689 2.23354 9.84634 1.60976 8.04878 1.60976C6.25122 1.60976 4.72866 2.23354 3.4811 3.4811C2.23354 4.72866 1.60976 6.25122 1.60976 8.04878C1.60976 9.84634 2.23354 11.3689 3.4811 12.6165C4.72866 13.864 6.25122 14.4878 8.04878 14.4878H8.29024L8.77317 16.0573ZM14.9104 16.5L11.4695 13.0591L10.4634 16.0976L8.04878 8.04878L16.0976 10.4634L13.0591 11.4695L16.5 14.9104L14.9104 16.5Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
        <button
          onClick={() => changeType("divider")}
          className={`toolbar-v4__btn ${section.type === "divider" ? "active" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M16 16H0V14.2227H16V16ZM8.88867 9.04492L10.3115 7.64453L11.5557 8.88867L8 12.4443L4.44434 8.88867L5.68848 7.64453L7.11133 9.04492V3.55566H8.88867V9.04492ZM16 1.77734H0V0H16V1.77734Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>

        <div className="toolbar-v4__divider" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="toolbar-v4__btn"
          title="Delete Section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
              fill="#D34E15"
            />
          </svg>
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

  // 1. Force this to false so the input is HIDDEN by default on load
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    const safeText = section.text || "";
    if (contentRef.current && contentRef.current.innerHTML !== safeText) {
      contentRef.current.innerHTML = safeText;
    }
  }, [section.text, section.type]);

  useEffect(() => {
    if (
      btnTextRef.current &&
      btnTextRef.current.innerHTML !== (section.buttonText || "Upload Now")
    ) {
      btnTextRef.current.innerHTML = section.buttonText || "Upload Now";
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
      case "h1":
        return "Type your main heading...";
      case "h2":
        return "Type your sub-heading...";
      case "callout":
        return "Start typing callout content...";
      default:
        return "Start typing your content here...";
    }
  };

  return (
    <div
      className={`section-item-v4 ${isActive ? "active-section" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSetActive(section.id);
      }}
    >
      {isActive && (
        <Toolbar
          section={section}
          onUpdate={(u) => onUpdate(section.id, u)}
          onRemove={() => onRemove(section.id)}
        />
      )}

      {section.type === "divider" ? (
        <div className="v4-divider-wrap">
          <div className="v4-divider-line" />
        </div>
      ) : section.type === "callout" ? (
        <div className="v4-callout-card" key={`callout-${section.id}`}>
          <div className="v4-callout-border" />
          <div className="v4-callout-content">
            <div
              key={`editor-${section.id}-${section.type}`}
              ref={contentRef}
              contentEditable
              suppressContentEditableWarning
              onBlur={handleBlur}
              className="v4-editor v4-callout-text"
              data-placeholder={getPlaceholder()}
            />
            {section.showButton && (
              <div className="v4-callout-actions-row">
                <button
                  ref={btnTextRef}
                  className="v4-callout-btn"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={handleBtnBlur}
                  onClick={(e) => e.stopPropagation()}
                >
                  {section.buttonText || "Upload Now"}
                </button>

                {/* 2. Logic: The input only shows if showUrlInput is true. It starts false. */}
                {showUrlInput ? (
                  <div
                    className="v4-inline-url-input"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      placeholder="https://"
                      value={section.url || ""}
                      onChange={(e) =>
                        onUpdate(section.id, { url: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setShowUrlInput(false);
                      }}
                      onBlur={() => setShowUrlInput(false)}
                      autoFocus
                    />
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setShowUrlInput(false);
                      }}
                      className="v4-inline-url-close"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    // 3. This button is the trigger. You must click it to see the input.
                    className={`v4-callout-link-toggle ${section.url ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUrlInput(true);
                    }}
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
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          className={`v4-editor type-${section.type}`}
          data-placeholder={getPlaceholder()}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              document.execCommand("insertLineBreak");
              e.preventDefault();
            }
          }}
        />
      )}
    </div>
  );
};

export const Preview: React.FC<PreviewProps> = ({
  config,
  onUpdateSection,
  onAddSection,
  onRemoveSection,
  onConfigChange,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [showLinkTool, setShowLinkTool] = useState(false);
  const [isUrlInputMode, setIsUrlInputMode] = useState(false);
  const [urlValue, setUrlValue] = useState("https://");
  const [hasExistingLink, setHasExistingLink] = useState(false);
  const [toolPosition, setToolPosition] = useState({ top: 0, left: 0 });
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const bestRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (config.showSignature) {
      if (bestRef.current)
        bestRef.current.innerHTML = config.signatureBest || "";
      if (nameRef.current)
        nameRef.current.innerHTML = config.signatureName || "";
    }
    if (config.showDisclaimer) {
      if (disclaimerRef.current)
        disclaimerRef.current.innerHTML = config.disclaimerText || "";
    }
  }, [
    config.signatureBest,
    config.signatureName,
    config.disclaimerText,
    config.showSignature,
    config.showDisclaimer,
  ]);

  const syncContent = () => {
    const updates: Partial<Config> = {};
    if (disclaimerRef.current)
      updates.disclaimerText = disclaimerRef.current.innerHTML;
    if (bestRef.current) updates.signatureBest = bestRef.current.innerHTML;
    if (nameRef.current) updates.signatureName = nameRef.current.innerHTML;

    if (Object.keys(updates).length > 0) {
      onConfigChange(updates);
    }

    if (activeSectionId) {
      const activeEl = document.querySelector(
        ".section-item-v4.active .v4-editor",
      );
      if (activeEl)
        onUpdateSection(activeSectionId, { text: activeEl.innerHTML });
    }
  };

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (
        selection &&
        selection.toString().trim().length > 0 &&
        selection.rangeCount > 0 &&
        previewContainerRef.current
      ) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const containerRect =
          previewContainerRef.current.getBoundingClientRect();

        const anchorNode = selection.anchorNode;
        const anchorParent =
          anchorNode?.nodeType === 3
            ? anchorNode.parentElement
            : (anchorNode as HTMLElement);
        const editableZone = anchorParent?.closest('[contenteditable="true"]');

        if (
          editableZone &&
          rect.top >= containerRect.top &&
          rect.bottom <= containerRect.bottom
        ) {
          const existingLink = anchorParent?.closest("a");
          if (existingLink) {
            setHasExistingLink(true);
            const currentHref = existingLink.getAttribute("href") || "https://";
            if (!isUrlInputMode) setUrlValue(currentHref);
          } else {
            setHasExistingLink(false);
            if (!isUrlInputMode) setUrlValue("https://");
          }

          setToolPosition({
            top:
              rect.top -
              containerRect.top +
              previewContainerRef.current.scrollTop -
              48,
            left: rect.left - containerRect.left + rect.width / 2,
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

    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, [isUrlInputMode]);

  const toggleUrlInput = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUrlInputMode(true);
  };

  const removeLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }
    document.execCommand("unlink", false);
    document.execCommand("removeFormat", false);
    syncContent();
    setShowLinkTool(false);
    setIsUrlInputMode(false);
  };

  const applyLink = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }

    const trimmed = urlValue.trim();
    if (!trimmed || trimmed === "https://" || trimmed === "http://") {
      document.execCommand("unlink", false);
      document.execCommand("removeFormat", false);
    } else {
      document.execCommand("createLink", false, urlValue);
    }

    syncContent();
    setIsUrlInputMode(false);
    setShowLinkTool(false);
    setUrlValue("https://");
  };

  return (
    <div
      className="v4-preview-pane"
      ref={previewContainerRef}
      onClick={() => setActiveSectionId(null)}
    >
      {showLinkTool && (
        <div
          className={`v4-link-tool ${isUrlInputMode ? "expanded" : ""}`}
          style={{ top: toolPosition.top, left: toolPosition.left }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {!isUrlInputMode ? (
            <button
              className={`v4-link-circle ${hasExistingLink ? "has-link" : ""}`}
              onMouseDown={toggleUrlInput}
            >
              <LinkIcon size={16} />
            </button>
          ) : (
            <div className="v4-link-input-wrap">
              <input
                type="text"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                autoFocus
                placeholder="https://..."
                onKeyDown={(e) => e.key === "Enter" && applyLink()}
              />
              <div className="v4-link-input-btns">
                <button
                  onMouseDown={applyLink}
                  className="v4-apply"
                  title="Apply Link"
                >
                  <Check size={16} />
                </button>
                <button
                  onMouseDown={removeLink}
                  className="v4-remove"
                  title="Unlink & Clear Style"
                >
                  <Link2Off size={16} />
                </button>
                <button
                  onMouseDown={() => setIsUrlInputMode(false)}
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {config.showLogo && (
        <div className="v4-logo-header">
          <a href="https://www.glassesusa.com" target="_black">
            <img
              className="desktop-version-logo"
              src="https://www.glassesusa.com/media/wysiwyg/lp26/gusalogo.png"
              alt="GlassesUSA"
            />
          </a>
        </div>
      )}

      <div className="v4-main-body">
        <div className="v4-sections-list">
          {/* This map will render SectionItem. Since SectionItem initializes state to false, inputs are hidden by default */}

          {config.sections.map((section, idx) =>
            idx > 0 ? (
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
            ) : (
              ""
            ),
          )}

          <button
            className="v4-add-last-section-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddSection(config.sections.length);
            }}
            title="Add New Section"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="#1F1F1F" />
            </svg>
          </button>
        </div>

        {config.showSignature && (
          <div className="v4-signature">
            <p
              ref={bestRef}
              contentEditable
              onBlur={syncContent}
              suppressContentEditableWarning
            />
            <p
              ref={nameRef}
              contentEditable
              onBlur={syncContent}
              suppressContentEditableWarning
            />
          </div>
        )}

        {config.showDisclaimer && (
          <div className="v4-disclaimer">
            <div className="v4-disclaimer-div" />
            <div
              ref={disclaimerRef}
              contentEditable
              onBlur={syncContent}
              className="v4-disclaimer-text"
              suppressContentEditableWarning
            />
          </div>
        )}
      </div>

      {config.showFooter && (
        <table
          className="v4-footer-table"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{
            background: "#020621",
            color: "#fff",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <tbody>
            <tr>
              <td height="24"></td>
            </tr>
            <tr
              className="trans-txt-d-b"
              style={{
                fontStyle: "normal",
                fontWeight: "normal",
                lineHeight: "28px",
              }}
            >
              <td>
                <b className="trans-txt-d-inline" style={{ display: "block" }}>
                  Need help with your order?
                </b>
                &nbsp;
                <span
                  className="trans-txt-d-normal"
                  style={{ fontSize: "18px" }}
                >
                  We are here for you 24/7!
                </span>
              </td>
            </tr>
            <tr>
              <td className="trans-txt-d-b-top" height="24"></td>
            </tr>
            <tr style={{ display: "table", margin: "auto" }}>
              <td>
                <a href="https://www.glassesusa.com/">
                  <img
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/chat-cta.png"
                    className="colored"
                    style={{ display: "none" }}
                    alt="chat"
                  />
                </a>
              </td>
              <td width="8"></td>
              <td>
                <a href="tel:+1-844-244-1186">
                  <img
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/call-cta.png"
                    className="colored"
                    style={{ display: "none" }}
                    alt="call us"
                  />
                </a>
              </td>
              <td width="8"></td>
              <td>
                <a href="https://www.glassesusa.com/help-center">
                  <img
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/help-cta.png"
                    className="colored"
                    style={{ display: "none" }}
                    alt="help center"
                  />
                </a>
              </td>
            </tr>
            <tr style={{ display: "table", margin: "auto" }}>
              <td>
                <a href="https://www.glassesusa.com/">
                  <img
                    className="logomobile"
                    width="108"
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/lc-n.png"
                    alt="chat"
                  />
                </a>
              </td>
              <td width="8"></td>
              <td>
                <a href="tel:+1-844-244-1186">
                  <img
                    className="logomobile"
                    width="108"
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/cu-n.png"
                    alt="call us"
                  />
                </a>
              </td>
              <td width="8"></td>
              <td>
                <a href="https://www.glassesusa.com/help-center">
                  <img
                    className="logomobile"
                    width="108"
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/hc-n.png"
                    alt="help center"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td height="38"></td>
            </tr>
            <tr style={{ display: "table", margin: "auto" }}>
              <td>
                <a href="https://www.facebook.com/GlassesUSA/">
                  <img
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/facebook.png"
                    alt="facebook"
                  />
                </a>
              </td>
              <td width="36"></td>
              <td>
                <a href="https://www.instagram.com/glassesusa/">
                  <img
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/instagram.png"
                    alt="instagram"
                  />
                </a>
              </td>
              <td width="36"></td>
              <td>
                <a href="https://twitter.com/GlassesUSA">
                  <img
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/tiktok.png"
                    alt="tiktok"
                  />
                </a>
              </td>
              <td width="36"></td>
              <td>
                <a href="https://twitter.com/GlassesUSA">
                  <img
                    style={{ verticalAlign: "top" }}
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp26/x.png"
                    alt="X"
                  />
                </a>
              </td>
              <td width="36"></td>
              <td>
                <a href="https://www.youtube.com/user/GlassesUSA">
                  <img
                    style={{ verticalAlign: "top" }}
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/youtube.png"
                    alt="youtube"
                  />
                </a>
              </td>
              <td width="36"></td>
              <td>
                <a href="https://www.pinterest.com/glassesusa/">
                  <img
                    src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/lp21/pinterest.png"
                    alt="pinterest"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td height="24"></td>
            </tr>
            <tr>
              <td align="center">
                <img
                  src="https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/wysiwyg/hp21/line-border.png"
                  width="300"
                  style={{ display: "block", margin: "auto" }}
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td height="12"></td>
            </tr>
            <tr>
              <td
                className="v4-footer-copy-td"
                style={{ fontSize: "12px", color: "#B0BDC5" }}
              >
                © 2006-2026 Glassesusa.com All Rights Reserved
              </td>
            </tr>
            <tr>
              <td height="24"></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
