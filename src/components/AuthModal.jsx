import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';
import { X } from 'lucide-react';

const AuthModal = ({ onClose, isResettingPassword }) => {
  const [newPassword, setNewPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully! You can now close this and sign in.");
      setTimeout(() => onClose(), 2000);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <button className="auth-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        {isResettingPassword ? (
          <>
            <h2 className="auth-modal-title">Reset Your Password</h2>
            <p className="auth-modal-subtitle">Enter your new password below.</p>
            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <input
                type="password"
                placeholder="New Password"
                className="auth-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
              {message && <p style={{ textAlign: 'center', fontSize: '0.9rem', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            </form>
          </>
        ) : (
          <>
            <h2 className="auth-modal-title">Welcome to ResumePro</h2>
            <p className="auth-modal-subtitle">Sign in to save your progress and download your professional resume.</p>
            
            <Auth
              supabaseClient={supabase}
              view="sign_in"
              showLinks={true}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#3b82f6',
                      brandAccent: '#2563eb',
                    },
                  },
                },
              }}
              providers={[]}
              redirectTo={window.location.origin}
            />
            <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              <p>Tip: Check your email for a confirmation link if you just signed up!</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
