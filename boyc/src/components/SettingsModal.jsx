import { useTheme } from '../context/ThemeContext';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const { primaryColor, secondaryColor, updatePrimaryColor, updateSecondaryColor, resetTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Theme Settings</h2>
        
        <div className="settings-content">
          <div className="color-picker-group">
            <label htmlFor="primaryColor">Primary Color (Accents)</label>
            <div className="color-input-wrapper">
              <input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => updatePrimaryColor(e.target.value)}
              />
              <span className="color-value">{primaryColor}</span>
            </div>
          </div>

          <div className="color-picker-group">
            <label htmlFor="secondaryColor">Secondary Color (Background)</label>
            <div className="color-input-wrapper">
              <input
                id="secondaryColor"
                type="color"
                value={secondaryColor}
                onChange={(e) => updateSecondaryColor(e.target.value)}
              />
              <span className="color-value">{secondaryColor}</span>
            </div>
          </div>

          <button className="reset-btn" onClick={resetTheme}>
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
