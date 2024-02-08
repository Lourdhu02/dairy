import { useState } from "react";
import "./PasswordManager.css"; 
import { useEffect } from "react";
import { RiFileCopyLine } from "react-icons/ri";
const PasswordManager = () => {

  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState({});
  
    const addPassword = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5000/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            description,
            password,
          }),
        });
    
        if (response.ok) {
          console.log('Password added successfully');
          fetchPasswords();
          setUrl('');
          setPassword('');
          setDescription('');
        } else {
          console.error('Failed to add password');
        }
      } catch (error) {
        console.error('Error adding password:', error);
      }
    }

  const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|[];\':",./<>?';
    const passwordLength = 16;
    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
  }

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await fetch('http://localhost:5000/passwords');
      if (response.ok) {
        const data = await response.json();
        setPasswords(data.passwords);
      } else {
        console.error('Failed to fetch passwords');
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  }

  const handleDescriptionClick = (password) => {
    setSelectedPassword(password);
    setShowPopup(true);
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(selectedPassword.password);
  }

  return (
    <div className="password-page">
      <div className="password-left-container">
        <div>
          <div style={{ color: "#457b9d", fontSize: "24px", marginBottom: "5px" }}>Password Generator</div>
          <form className="input-section" onSubmit={addPassword}>
            <input type="text" id="income" value={url} onChange={e => setUrl(e.target.value)} placeholder='Enter your url' required />
            <input type="text" id="" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
            <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required />
            <div style={{ display: "flex" }}>
              <button type="button" onClick={generatePassword}>Generate Password</button>
              <button type="submit">Store Password</button>
            </div>

          </form>
          {showPopup && (
          <div className="password-popup">
            <div className="popup-content">
              <div className="popup-header">
                <div className="url">URL: {selectedPassword.url}</div>
                <button onClick={() => setShowPopup(false)}>Close</button>
              </div>
              <div className="popup-body">
                <div className="password">Password: {selectedPassword.password}</div>
                <button onClick={handleCopyPassword}><RiFileCopyLine /> Copy Password</button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="password-right-container">
        <div className="password-box">
          <div className="passwords">
          <div className="passwords-list">
            {passwords.map(password => (
              <div key={password._id} className="password-description" onClick={() => handleDescriptionClick(password)}>
                {password.description}
              </div>
              ))}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordManager
