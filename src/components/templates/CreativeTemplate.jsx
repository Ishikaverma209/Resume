import React from 'react';

const CreativeTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '297mm',
      fontFamily: '"Poppins", "Inter", sans-serif',
      color: '#fff',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      position: 'relative',
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 40%)',
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      padding: '50px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
      paddingBottom: '30px',
    },
    nameSection: {
      display: 'flex',
      flexDirection: 'column',
    },
    name: {
      fontSize: '48px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginTop: '5px',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '5px',
      fontSize: '14px',
      color: '#cbd5e1',
    },
    section: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: '40px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: '#ec4899',
      borderLeft: '4px solid #ec4899',
      paddingLeft: '15px',
      height: 'fit-content',
    },
    experienceItem: {
      marginBottom: '30px',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '8px',
    },
    itemTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#f8fafc',
    },
    itemDate: {
      fontSize: '14px',
      color: '#3b82f6',
      fontWeight: '600',
    },
    itemSub: {
      fontSize: '16px',
      color: '#94a3b8',
      fontWeight: '500',
      marginBottom: '10px',
    },
    itemDesc: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: '#cbd5e1',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    skillTag: {
      padding: '8px 16px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#f8fafc',
      transition: 'all 0.3s ease',
    },
    accentCircle: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
      filter: 'blur(100px)',
      opacity: '0.1',
      top: '-50px',
      right: '-50px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />
      <div style={styles.accentCircle} />
      
      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.nameSection}>
            <h1 style={styles.name}>{personalInfo.fullName}</h1>
            <div style={styles.title}>Creative Professional</div>
          </div>
          <div style={styles.contactInfo}>
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>About</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#cbd5e1', margin: 0 }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Journey</h2>
            <div>
              {experience.map(exp => (
                <div key={exp.id} style={styles.experienceItem}>
                  <div style={styles.itemHeader}>
                    <h3 style={styles.itemTitle}>{exp.position}</h3>
                    <span style={styles.itemDate}>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div style={styles.itemSub}>{exp.company}</div>
                  <p style={styles.itemDesc}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Education</h2>
            <div>
              {education.map(edu => (
                <div key={edu.id} style={styles.experienceItem}>
                  <div style={styles.itemHeader}>
                    <h3 style={styles.itemTitle}>{edu.degree}</h3>
                    <span style={styles.itemDate}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div style={styles.itemSub}>{edu.institution}</div>
                  <p style={styles.itemDesc}>{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Expertise</h2>
            <div style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <span key={index} style={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
