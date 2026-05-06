import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, Palette, Save } from 'lucide-react';
import PlainTemplate from './templates/PlainTemplate';
import AttractiveTemplate from './templates/AttractiveTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import { supabase } from '../supabaseClient';

const ResumePreview = ({ data, user, onSaveSuccess, triggerAuthModal }) => {
  const [template, setTemplate] = useState('creative');
  const [isSaving, setIsSaving] = useState(false);
  const componentRef = useRef();

  const handleSave = async (isAuto = false) => {
    if (!user) return;
    
    setIsSaving(true);
    const title = isAuto 
      ? `Auto-saved: ${data.personalInfo.fullName || "Resume"}`
      : prompt("Enter a name for this resume:", data.personalInfo.fullName || "My Resume");
    
    if (!title && !isAuto) {
      setIsSaving(false);
      return;
    }
    
    const { error } = await supabase
      .from('resumes')
      .insert([{ user_id: user.id, title: title || "Untitled Resume", data }]);
    
    setIsSaving(false);
    
    if (!error) {
      if (!isAuto) alert("Resume saved successfully!");
      if (onSaveSuccess) onSaveSuccess();
    } else {
      if (!isAuto) alert("Failed to save resume.");
      console.error("Save error:", error);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      triggerAuthModal();
      return;
    }
    
    const element = componentRef.current;
    const fileName = `${data.personalInfo.fullName || 'resume'}_${Date.now()}.pdf`;
    
    const opt = {
      margin:       0,
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // 1. Generate PDF as blob for storage
      const pdfWorker = html2pdf().set(opt).from(element);
      const pdfBlob = await pdfWorker.output('blob');

      // 2. Upload to Supabase Storage
      const storagePath = `${user.id}/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(storagePath, pdfBlob);

      if (uploadError) {
        console.error("Upload error:", uploadError);
      }

      // 3. Save form data to Database
      const { error: dbError } = await supabase
        .from('resumes')
        .insert([{ 
          user_id: user.id, 
          title: data.personalInfo.fullName || "Untitled Resume", 
          data: data,
          // We can also store the file path if we add a column later, 
          // but for now the user can see them in Storage.
        }]);

      if (!dbError && onSaveSuccess) onSaveSuccess();

      // 4. Trigger browser download for the user
      pdfWorker.save();
      
    } catch (err) {
      console.error("PDF process error:", err);
      alert("There was an error generating or saving your resume.");
    }
  };

  return (
    <>
      <div className="preview-controls">
        <div className="template-selector">
          <Palette size={20} className="text-primary" />
          <label htmlFor="template-select">Template Style:</label>
          <select 
            id="template-select" 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="creative">Vibrant & Creative (DJ/Hip-hop)</option>
            <option value="attractive">Modern Blue (Professional)</option>
            <option value="executive">Executive Corporate (Formal)</option>
            <option value="minimal">Minimalist Elegant (Clean)</option>
            <option value="plain">Classic Plain (Simple)</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="save-btn" onClick={() => handleSave(false)} disabled={isSaving}>
            <Save size={18} /> {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button className="download-btn" onClick={handleDownload}>
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>

      <div className="resume-paper-wrapper">
        <div className="resume-paper" ref={componentRef}>
          {template === 'plain' && <PlainTemplate data={data} />}
          {template === 'attractive' && <AttractiveTemplate data={data} />}
          {template === 'creative' && <CreativeTemplate data={data} />}
          {template === 'executive' && <ExecutiveTemplate data={data} />}
          {template === 'minimal' && <MinimalTemplate data={data} />}
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
