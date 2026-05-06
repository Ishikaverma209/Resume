import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { LogOut, List, FileText, LogIn, Trash2, Edit } from 'lucide-react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AuthModal from './components/AuthModal';

const defaultData = {
  personalInfo: {
    fullName: "Alex Carter",
    email: "alex.carter@example.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    summary: "High-energy Creative Director and Music Producer with 8+ years of experience in the entertainment industry. Specializing in hip-hop production, event coordination, and digital brand storytelling. Passionate about merging sound and visual aesthetics to create unforgettable cultural experiences.",
  },
  experience: [
    {
      id: "1",
      company: "BeatMaster Studios",
      position: "Lead Music Producer & DJ",
      startDate: "2021-01",
      endDate: "Present",
      description: "Produced platinum-certified tracks for top-tier hip-hop artists. Headlined major music festivals across the US, managing sound engineering and live performance visuals for crowds of 20,000+.",
    },
    {
      id: "2",
      company: "Urban Rhythm Agency",
      position: "Creative Consultant",
      startDate: "2018-06",
      endDate: "2020-12",
      description: "Coordinated large-scale cultural events, including hip-hop dance competitions and underground music showcases. Developed digital marketing strategies that increased brand reach by 200%.",
    }
  ],
  education: [
    {
      id: "1",
      institution: "Academy of Contemporary Music",
      degree: "B.A. in Audio Production",
      startDate: "2014-09",
      endDate: "2018-05",
      description: "Specialized in sound design and electronic music composition. Recipient of the 'Innovative Sound' award.",
    }
  ],
  skills: ["Music Production", "DJing", "Sound Design", "Event Management", "Creative Direction", "Ableton Live", "FL Studio", "Hip-Hop Culture", "Public Speaking"],
};

function App() {
  const [resumeData, setResumeData] = useState(defaultData);
  const [user, setUser] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 1500);
  };

  useEffect(() => {
    // Parse URL hash for recovery token
    const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    const type = hashParams.get('type');
    const isRecoveryUrl = type === 'recovery';

    // If recovery link was clicked, set the session from hash tokens
    if (isRecoveryUrl && accessToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken || '' })
        .then(() => {
          setIsResettingPassword(true);
          setShowAuthModal(true);
          // Clean up hash from URL without reloading
          window.history.replaceState(null, '', window.location.pathname);
        });
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });
    }

    let recoveryDetected = isRecoveryUrl;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        recoveryDetected = true;
        setIsResettingPassword(true);
        setShowAuthModal(true);
        setUser(session?.user ?? null);
        return;
      }

      if (event === 'SIGNED_IN') {
        if (recoveryDetected) {
          // Keep the reset modal open
          setIsResettingPassword(true);
          setShowAuthModal(true);
        } else {
          showNotification("Login successfully");
          setShowAuthModal(false);
          setIsResettingPassword(false);
        }
      } else if (event === 'SIGNED_OUT') {
        showNotification("Logout successfully");
        setIsResettingPassword(false);
        recoveryDetected = false;
      } else if (event === 'USER_UPDATED') {
        if (recoveryDetected) {
          recoveryDetected = false;
          setIsResettingPassword(false);
          setShowAuthModal(false);
          showNotification("Password updated successfully!");
        }
      }
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);


  useEffect(() => {
    if (user) {
      fetchResumes();
    } else {
      setSavedResumes([]);
      setIsDashboardOpen(false);
    }
  }, [user]);

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setSavedResumes(data);
    }
  };

  const loadResume = (data) => {
    setResumeData(data);
    setIsDashboardOpen(false);
  };

  const deleteResume = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    
    const { error } = await supabase
      .from('resumes')
      .delete()
      .match({ id });
      
    if (!error) {
      showNotification("Resume deleted successfully");
      fetchResumes();
    } else {
      showNotification("Failed to delete resume");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" }
      ]
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), institution: "", degree: "", startDate: "", endDate: "", description: "" }
      ]
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill) => {
    if (!skill.trim() || resumeData.skills.includes(skill.trim())) return;
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill.trim()]
    }));
  };

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="logo-icon" style={{ background: 'var(--primary)', padding: '10px', borderRadius: '12px' }}>
              <FileText size={24} color="white" />
            </div>
            <div>
              <h1>ResumePro</h1>
              <p>Craft your story, visually.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {user ? (
              <>
                <button onClick={() => setIsDashboardOpen(!isDashboardOpen)} className="header-icon-btn" title="Dashboard">
                  <List size={20} />
                </button>
                <button onClick={handleSignOut} className="header-icon-btn" title="Sign Out">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="header-icon-btn" title="Sign In">
                <LogIn size={20} />
              </button>
            )}
          </div>
        </div>
        {isDashboardOpen && user ? (
          <div className="dashboard-container">
            <h2 className="dashboard-title">Your Saved Resumes</h2>
            {savedResumes.length === 0 ? (
              <p className="dashboard-empty">No resumes saved yet.</p>
            ) : (
              <div className="dashboard-list">
                {savedResumes.map(resume => (
                  <div key={resume.id} className="dashboard-item" onClick={() => loadResume(resume.data)}>
                    <div className="dashboard-item-info">
                      <FileText size={16} />
                      <span className="dashboard-item-title">{resume.title}</span>
                    </div>
                    <div className="dashboard-item-actions">
                      <button className="dashboard-action-btn edit" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="dashboard-action-btn delete" title="Delete" onClick={(e) => deleteResume(e, resume.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="form-container">
            <ResumeForm 
              data={resumeData}
              updatePersonalInfo={updatePersonalInfo}
              updateExperience={updateExperience}
              addExperience={addExperience}
              removeExperience={removeExperience}
              updateEducation={updateEducation}
              addEducation={addEducation}
              removeEducation={removeEducation}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />
          </div>
        )}
      </div>
      <div className="preview-container">
        <ResumePreview 
          data={resumeData} 
          user={user} 
          onSaveSuccess={fetchResumes} 
          triggerAuthModal={() => setShowAuthModal(true)}
        />
      </div>
      {showAuthModal && (
        <AuthModal 
          onClose={() => {
            setShowAuthModal(false);
            setIsResettingPassword(false);
          }} 
          isResettingPassword={isResettingPassword}
        />
      )}
      
      {notification && (
        <div className="notification-overlay">
          <div className="notification-toast">
            {notification}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
