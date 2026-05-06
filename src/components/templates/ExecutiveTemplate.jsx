import React from 'react';

const ExecutiveTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  const styles = {
    container: {
      padding: '0',
      fontFamily: '"Inter", sans-serif',
      color: '#333',
      lineHeight: '1.5',
      background: '#fff',
      minHeight: '297mm',
    },
    sidebar: {
      background: '#1e293b',
      color: '#f8fafc',
      padding: '40px 30px',
      width: '35%',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    main: {
      padding: '40px 40px',
      width: '65%',
    },
    layout: {
      display: 'flex',
      minHeight: '297mm',
    },
    name: {
      fontSize: '32px',
      fontWeight: '800',
      margin: '0 0 5px 0',
      color: '#fff',
      lineHeight: '1.1',
    },
    title: {
      fontSize: '14px',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1e293b',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '8px',
      marginBottom: '15px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    sidebarTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#94a3b8',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    contactItem: {
      fontSize: '13px',
      marginBottom: '8px',
      display: 'flex',
      flexDirection: 'column',
    },
    contactLabel: {
      color: '#64748b',
      fontSize: '11px',
      fontWeight: '600',
    },
    item: {
      marginBottom: '20px',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '2px',
    },
    itemTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1e293b',
    },
    itemSubtitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#475569',
    },
    itemDate: {
      fontSize: '12px',
      color: '#64748b',
      fontWeight: '500',
    },
    description: {
      fontSize: '13px',
      color: '#475569',
      marginTop: '6px',
      textAlign: 'justify',
    },
    skillBadge: {
      display: 'inline-block',
      background: '#334155',
      color: '#f1f5f9',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '11px',
      margin: '0 5px 5px 0',
      fontWeight: '500',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.layout}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div>
            <h1 style={styles.name}>{personalInfo.fullName}</h1>
            <p style={styles.title}>Professional Profile</p>
          </div>

          <div>
            <h3 style={styles.sidebarTitle}>Contact</h3>
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Email</span>
              <span>{personalInfo.email}</span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Phone</span>
              <span>{personalInfo.phone}</span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Location</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>

          <div>
            <h3 style={styles.sidebarTitle}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {skills.map((skill, i) => (
                <span key={i} style={styles.skillBadge}>{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.main}>
          {personalInfo.summary && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Summary</h2>
              <p style={styles.description}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Professional Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} style={styles.item}>
                  <div style={styles.itemHeader}>
                    <span style={styles.itemTitle}>{exp.position}</span>
                    <span style={styles.itemDate}>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div style={styles.itemSubtitle}>{exp.company}</div>
                  <p style={styles.description}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} style={styles.item}>
                  <div style={styles.itemHeader}>
                    <span style={styles.itemTitle}>{edu.degree}</span>
                    <span style={styles.itemDate}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div style={styles.itemSubtitle}>{edu.institution}</div>
                  <p style={styles.description}>{edu.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
