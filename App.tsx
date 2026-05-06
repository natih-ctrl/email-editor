import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar.tsx";
import { Preview } from "./components/Preview.tsx";
import { Config, DEFAULT_CONFIG, Section } from "./types.ts";
import { generateHTML, parseImportedEmail } from "./utils/emailHelpers";
import { Toaster, toast } from "react-hot-toast";

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  const handleConfigChange = (newConfig: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleUpdateSection = (id: string, updates: Partial<Section>) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    }));
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
      const parsedConfigUpdates = parseImportedEmail(html);

      setConfig((prev) => ({
        ...prev,
        ...parsedConfigUpdates,
        // Override sections only if the parser found some
        sections: parsedConfigUpdates.sections || prev.sections,
      }));

      toast.success("Email imported successfully!");
    } catch (e) {
      console.error("Import error:", e);
      toast.error("Failed to parse HTML file");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(generateHTML(config))
      .then(() => toast.success("HTML Copied!"));
  };

  const handleDownload = async () => {
    try {
      const data = generateHTML(config);
      const blob = new Blob([data], { type: "text/html" });

      const pickerOptions = {
        suggestedName: "callout-automation.html",
        types: [
          { description: "HTML File", accept: { "text/html": [".html"] } },
        ],
      };

      const fileHandle = await (window as any).showSaveFilePicker(
        pickerOptions,
      );
      const writableFileStream = await fileHandle.createWritable();
      await writableFileStream.write(blob);
      await writableFileStream.close();

      toast.success("File saved successfully!");
    } catch (err) {
      console.error("Error saving file:", err);
      toast.error("Failed to save file");
    }
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
