import React, { useRef } from "react";
import { Config, Section } from "../types.ts";
import "./Sidebar.css";

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
  config,
  onChange,
  onCopy,
  onDownload,
  onReset,
  onImport,
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
    if (e.target) e.target.value = "";
  };

  const Checkbox = ({
    label,
    field,
  }: {
    label: string;
    field: keyof Config;
  }) => (
    <div
      className="sidebar__checkbox"
      onClick={() => onChange({ [field]: !config[field] })}
    >
      <div
        className={`sidebar__checkbox-custom ${config[field] ? "checked" : ""}`}
      >
        {config[field] && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1.25 4.69304L4.60671 8.25L11.25 1.25"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="sidebar__checkbox-label">{label}</span>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__icon-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="68"
            height="68"
            rx="34"
            stroke="#1358A7"
            strokeWidth="2"
          />
          <path
            d="M34.1667 36.1579L20.8333 27.7368V44.5789H35.8333V47.9474H20.8333C19.9167 47.9474 19.1319 47.6175 18.4792 46.9579C17.8264 46.2982 17.5 45.5053 17.5 44.5789V24.3684C17.5 23.4421 17.8264 22.6491 18.4792 21.9895C19.1319 21.3298 19.9167 21 20.8333 21H47.5C48.4167 21 49.2014 21.3298 49.8542 21.9895C50.5069 22.6491 50.8333 23.4421 50.8333 24.3684V36.1579H47.5V27.7368L34.1667 36.1579ZM34.1667 32.7895L47.5 24.3684H20.8333L34.1667 32.7895ZM45.8333 53L43.5 50.6421L46.125 47.9474H39.1667V44.5789H46.125L43.4583 41.8842L45.8333 39.5263L52.5 46.2632L45.8333 53ZM20.8333 27.7368V46.2632V36.1579V36.2842V24.3684V27.7368Z"
            fill="#1358A7"
          />
        </svg>
      </div>
      <h1 className="sidebar__title">CX emails templates Generator</h1>
      <div className="divder"></div>
      <div className="sidebar__content">
        <div className="sidebar__section">
          <div className="sidebar__section-title">Layout</div>
          <div className="sidebar__checkbox-list">
            <Checkbox label="Logo" field="showLogo" />
            <Checkbox label="Signature" field="showSignature" />
            <Checkbox label="Disclaimer" field="showDisclaimer" />
            <Checkbox label="Footer" field="showFooter" />
          </div>
        </div>
      </div>
      <div className="divder"></div>
      <div className="sidebar__actions">
        <button onClick={onDownload} className="btn ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
              fill="white"
            />
          </svg>{" "}
          Download
        </button>
        <button onClick={() => fileInputRef.current?.click()} className="btn">
          Import HTML
        </button>
        <button onClick={onCopy} className="btn ">
          Copy Code
        </button>
        <button onClick={onReset} className="btn ">
          New Email
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".html,.htm"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
