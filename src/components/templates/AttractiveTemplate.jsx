import React from 'react';

const AttractiveTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  const themeColor = '#1e3a8a'; // Deep blue
  const secondaryColor = '#3b82f6'; // Light blue
  const bgColor = '#f8fafc'; // Off-white/slate

  const styles = {
    container: {
      display: 'flex',
      minHeight: '297mm', // A4 height
      fontFamily: '"Inter", sans-serif',
      color: '#334155',
      background: 'white',
    },
    sidebar: {
      width: '35%',
      backgroundColor: themeColor,
      color: 'white',
      padding: '40px 30px',
    },
    main: {
      width: '65%',
      padding: '40px 30px',
      backgroundColor: 'white',
    },
    name: {
      fontSize: '32px',
      fontWeight: '800',
      marginBottom: '5px',
      lineHeight: 1.1,
      color: themeColor,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    title: {
      fontSize: '16px',
      fontWeight: '500',
      color: secondaryColor,
      marginBottom: '30px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    sectionTitleMain: {
      fontSize: '20px',
      fontWeight: '700',
      color: themeColor,
      borderBottom: `2px solid ${secondaryColor}`,
      paddingBottom: '8px',
      marginBottom: '20px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    sectionTitleSide: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'white',
      borderBottom: '1px solid rgba(255,255,255,0.3)',
      paddingBottom: '8px',
      marginBottom: '20px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginTop: '30px',
    },
    contactItem: {
      marginBottom: '15px',
      fontSize: '14px',
      display: 'flex',
      flexDirection: 'column',
    },
    contactLabel: {
      fontSize: '11px',
      textTransform: 'uppercase',
      opacity: 0.7,
      marginBottom: '2px',
    },
    skillTag: {
      display: 'inline-block',
      backgroundColor: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      padding: '5px 10px',
      borderRadius: '4px',
      margin: '0 8px 8px 0',
      fontSize: '13px',
    },
    item: {
      marginBottom: '25px',
      position: 'relative',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '5px',
    },
    position: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1e293b',
    },
    date: {
      fontSize: '13px',
      color: secondaryColor,
      fontWeight: '600',
    },
    company: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#64748b',
      marginBottom: '8px',
    },
    description: {
      fontSize: '14px',
      lineHeight: 1.6,
      color: '#475569',
    },
    summaryText: {
      fontSize: '14px',
      lineHeight: 1.6,
      marginBottom: '30px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{...styles.sectionTitleSide, marginTop: 0}}>Contact</h3>
          {personalInfo.email && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Email</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Phone</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Location</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div>
            <h3 style={styles.sectionTitleSide}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {skills.map((skill, index) => (
                <span key={index} style={styles.skillTag}>{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={styles.name}>{personalInfo.fullName}</h1>
          {/* We assume position isn't explicitly gathered, but could be derived or just omit */}
          <div style={styles.title}>Professional Resume</div>
          
          {personalInfo.summary && (
            <p style={styles.summaryText}>{personalInfo.summary}</p>
          )}
        </div>

        {experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={styles.sectionTitleMain}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} style={styles.item}>
                <div style={styles.itemHeader}>
                  <div style={styles.position}>{exp.position}</div>
                  <div style={styles.date}>{exp.startDate} - {exp.endDate}</div>
                </div>
                <div style={styles.company}>{exp.company}</div>
                <p style={styles.description}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 style={styles.sectionTitleMain}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={styles.item}>
                <div style={styles.itemHeader}>
                  <div style={styles.position}>{edu.degree}</div>
                  <div style={styles.date}>{edu.startDate} - {edu.endDate}</div>
                </div>
                <div style={styles.company}>{edu.institution}</div>
                <p style={styles.description}>{edu.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractiveTemplate;
