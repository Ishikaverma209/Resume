import React from 'react';

const PlainTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  const styles = {
    container: {
      padding: '40px',
      fontFamily: '"Times New Roman", Times, serif',
      color: '#000',
      lineHeight: 1.4,
    },
    header: {
      textAlign: 'center',
      borderBottom: '1px solid #000',
      paddingBottom: '20px',
      marginBottom: '20px',
    },
    name: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    contact: {
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap',
    },
    section: {
      marginBottom: '25px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderBottom: '1px solid #000',
      paddingBottom: '5px',
      marginBottom: '15px',
    },
    item: {
      marginBottom: '15px',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    itemSub: {
      display: 'flex',
      justifyContent: 'space-between',
      fontStyle: 'italic',
      marginBottom: '8px',
    },
    description: {
      fontSize: '14px',
      textAlign: 'justify',
    },
    skillsList: {
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.name}>{personalInfo.fullName}</h1>
        <div style={styles.contact}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.description}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{exp.position}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={styles.itemSub}>
                <span>{exp.company}</span>
              </div>
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
              <div style={styles.itemHeader}>
                <span>{edu.degree}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div style={styles.itemSub}>
                <span>{edu.institution}</span>
              </div>
              <p style={styles.description}>{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.skillsList}>
            {skills.join(' • ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlainTemplate;
