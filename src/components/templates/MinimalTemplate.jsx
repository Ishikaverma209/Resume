import React from 'react';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  const styles = {
    container: {
      padding: '50px 60px',
      fontFamily: '"Playfair Display", serif',
      color: '#1a1a1a',
      lineHeight: '1.6',
      background: '#fff',
      minHeight: '297mm',
    },
    header: {
      marginBottom: '50px',
      borderLeft: '4px solid #1a1a1a',
      paddingLeft: '25px',
    },
    name: {
      fontSize: '42px',
      fontWeight: '400',
      margin: '0 0 10px 0',
      letterSpacing: '-1px',
    },
    contact: {
      fontSize: '14px',
      color: '#666',
      display: 'flex',
      gap: '20px',
      fontFamily: '"Inter", sans-serif',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '13px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      color: '#999',
      marginBottom: '20px',
      fontFamily: '"Inter", sans-serif',
    },
    item: {
      marginBottom: '25px',
    },
    itemTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px',
    },
    itemSubtitle: {
      fontSize: '15px',
      color: '#555',
      marginBottom: '8px',
      fontStyle: 'italic',
    },
    date: {
      fontSize: '12px',
      color: '#999',
      marginBottom: '10px',
      fontFamily: '"Inter", sans-serif',
    },
    description: {
      fontSize: '14px',
      color: '#444',
      textAlign: 'justify',
      fontFamily: '"Inter", sans-serif',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    skill: {
      fontSize: '13px',
      color: '#1a1a1a',
      paddingBottom: '2px',
      borderBottom: '1px solid #ddd',
      fontFamily: '"Inter", sans-serif',
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.name}>{personalInfo.fullName}</h1>
        <div style={styles.contact}>
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>About</h2>
          <p style={styles.description}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={styles.item}>
              <div style={styles.date}>{exp.startDate} — {exp.endDate}</div>
              <div style={styles.itemTitle}>{exp.position}</div>
              <div style={styles.itemSubtitle}>{exp.company}</div>
              <p style={styles.description}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} style={styles.item}>
              <div style={styles.date}>{edu.startDate} — {edu.endDate}</div>
              <div style={styles.itemTitle}>{edu.degree}</div>
              <div style={styles.itemSubtitle}>{edu.institution}</div>
              <p style={styles.description}>{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Expertise</h2>
          <div style={styles.skillsContainer}>
            {skills.map((skill, i) => (
              <span key={i} style={styles.skill}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
