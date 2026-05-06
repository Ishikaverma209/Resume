import React, { useState } from 'react';
import { Plus, Trash2, User, Briefcase, GraduationCap, Wrench } from 'lucide-react';

const ResumeForm = ({ 
  data, 
  updatePersonalInfo, 
  updateExperience, addExperience, removeExperience,
  updateEducation, addEducation, removeEducation,
  addSkill, removeSkill
}) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    addSkill(newSkill);
    setNewSkill("");
  };

  return (
    <div className="resume-form">
      {/* Personal Info Section */}
      <div className="form-section">
        <div className="form-section-header">
          <User size={18} /> Personal Information
        </div>
        <div className="form-section-body">
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={data.personalInfo.fullName} 
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)} 
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={data.personalInfo.email} 
              onChange={(e) => updatePersonalInfo('email', e.target.value)} 
              placeholder="e.g. jane@example.com"
            />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input 
              type="text" 
              value={data.personalInfo.phone} 
              onChange={(e) => updatePersonalInfo('phone', e.target.value)} 
              placeholder="e.g. +1 234 567 890"
            />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input 
              type="text" 
              value={data.personalInfo.location} 
              onChange={(e) => updatePersonalInfo('location', e.target.value)} 
              placeholder="e.g. New York, NY"
            />
          </div>
          <div className="input-group">
            <label>Professional Summary</label>
            <textarea 
              value={data.personalInfo.summary} 
              onChange={(e) => updatePersonalInfo('summary', e.target.value)} 
              placeholder="Briefly describe your professional background and goals..."
            />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="form-section">
        <div className="form-section-header">
          <Briefcase size={18} /> Experience
        </div>
        <div className="form-section-body">
          <div className="item-list">
            {data.experience.map((exp) => (
              <div key={exp.id} className="item-card">
                <button className="remove-btn" onClick={() => removeExperience(exp.id)} title="Remove Experience">
                  <Trash2 size={16} />
                </button>
                <div className="input-group" style={{ marginBottom: '10px' }}>
                  <label>Company</label>
                  <input 
                    type="text" 
                    value={exp.company} 
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} 
                  />
                </div>
                <div className="input-group" style={{ marginBottom: '10px' }}>
                  <label>Position</label>
                  <input 
                    type="text" 
                    value={exp.position} 
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} 
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Start Date</label>
                    <input 
                      type="text" 
                      value={exp.startDate} 
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} 
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>End Date</label>
                    <input 
                      type="text" 
                      value={exp.endDate} 
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} 
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea 
                    value={exp.description} 
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} 
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="add-btn" onClick={addExperience}>
            <Plus size={16} /> Add Experience
          </button>
        </div>
      </div>

      {/* Education Section */}
      <div className="form-section">
        <div className="form-section-header">
          <GraduationCap size={18} /> Education
        </div>
        <div className="form-section-body">
          <div className="item-list">
            {data.education.map((edu) => (
              <div key={edu.id} className="item-card">
                <button className="remove-btn" onClick={() => removeEducation(edu.id)} title="Remove Education">
                  <Trash2 size={16} />
                </button>
                <div className="input-group" style={{ marginBottom: '10px' }}>
                  <label>Institution</label>
                  <input 
                    type="text" 
                    value={edu.institution} 
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} 
                  />
                </div>
                <div className="input-group" style={{ marginBottom: '10px' }}>
                  <label>Degree / Field of Study</label>
                  <input 
                    type="text" 
                    value={edu.degree} 
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} 
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Start Date</label>
                    <input 
                      type="text" 
                      value={edu.startDate} 
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} 
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>End Date</label>
                    <input 
                      type="text" 
                      value={edu.endDate} 
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} 
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Additional Information</label>
                  <textarea 
                    value={edu.description} 
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} 
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="add-btn" onClick={addEducation}>
            <Plus size={16} /> Add Education
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="form-section">
        <div className="form-section-header">
          <Wrench size={18} /> Skills
        </div>
        <div className="form-section-body">
          <form className="skills-input-container" onSubmit={handleAddSkill}>
            <input 
              type="text" 
              value={newSkill} 
              onChange={(e) => setNewSkill(e.target.value)} 
              placeholder="Add a skill (e.g. JavaScript)"
            />
            <button type="submit" className="skills-add-btn">Add</button>
          </form>
          <div className="skills-list">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
                <button className="skill-remove" onClick={() => removeSkill(skill)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
