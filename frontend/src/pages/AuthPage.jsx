import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages/AuthPage.css';

function isValidUsername(username) {
  return username.length >= 3 && username.length <= 15;
}

function isValidEmail(email) {
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return emailPattern.test(email);
}

function isValidPassword(password) {
  let minLength = password.length >= 8;
  let hasLower = /[a-z]/.test(password);
  let hasUpper = /[A-Z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSpecial = /[!@#&$%_+-]/.test(password);
  
  return minLength && hasLower && hasUpper && hasNumber && hasSpecial;
}

function doPasswordMatch(psw1, psw2) {
  return psw1 === psw2;
}


function AuthPage() {
    const [isLoginView, setIsLoginView] = useState(true);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirm, setRegConfirm] = useState('');

    const [error, setError] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isValidEmail(loginEmail) || loginPassword.trim() === "") {
        return setError("Érvénytelen email cím vagy jelszó.");
        }

        try {
        const response = await axios.post('http://localhost:5500/api/auth/login', {
            email: loginEmail,
            password: loginPassword
        });

        console.log('Sikeres bejelentkezés:', response.data);

        localStorage.setItem('token', response.data.token);

        localStorage.setItem('user', JSON.stringify(response.data.user));

        navigate('/board/testid'); // TODO: replace 'testid' with actual board id after implementing dashboard

        } catch (err) {
        console.error('Bejelentkezési hiba:', err.response.data.message);
        setError(err.response.data.message || 'Hiba történt a bejelentkezés során.');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let errors = [];
        if (!isValidUsername(regUsername)) errors.push("Felhasználónév (3-15 karakter).");
        if (!isValidEmail(regEmail)) errors.push("Érvénytelen email cím.");
        if (!isValidPassword(regPassword)) errors.push("Túl gyenge jelszó.");
        if (!doPasswordMatch(regPassword, regConfirm)) errors.push("A két jelszó nem egyezik.");

        if (errors.length > 0) {
        return setError(errors.join('\n'));
        }
        
        try {
        await axios.post('http://localhost:5500/api/auth/register', {
            username: regUsername,
            email: regEmail,
            password: regPassword
        });

        alert('Sikeres regisztráció! Kérlek, jelentkezz be.');
        setIsLoginView(true);
        setRegUsername('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirm('');

        } catch (err) {
        console.error('Regisztrációs hiba:', err.response.data.message);
        setError(err.response.data.message || 'Hiba a regisztráció során.');
        }
    };

    return (
        <div className="auth-page-wrapper">
        <div className={isLoginView ? 'container' : 'container active'}>
            <div className="forms">

                {/* --- login form --- */}
                <div className="form login">
                    <img src="./public/images/kanban-logo.png" alt="kanban logo" />
                    <span className="title">Bejelentkezés</span>

                    <form onSubmit={handleLoginSubmit}>
                        <div className="input-field">
                            <input type="text" placeholder="Email cím" required 
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <img className="icon" src="./public/images/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Email ikon" />
                        </div>
                        
                        <div className="input-field">
                            <input type="password" placeholder="Jelszó" required 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <img className="icon" src="./public/images/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Lakat ikon" />
                        </div>

                        <div className="checkbox-text">
                            <div className="checkbox-content">
                                <input type="checkbox" id="logCheck" />
                                <label htmlFor="logCheck" className="text">Emlékezz rám</label>
                            </div>
                            <a href="#" className="text">Elfelejtettem a jelszavam</a>
                        </div>

                        {error && isLoginView && <div style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{error}</div>}

                        <div className="input-field button">
                            <button type="submit">Bejelentkezés</button>
                        </div>
                    </form>

                    <div className="login-signup">
                        <span className="text">Nincs fiókod?
                            <a 
                                href="#" 
                                className="text signup-link" 
                                onClick={(e) => { e.preventDefault(); setIsLoginView(false); }}
                            >
                                <strong> Regisztráció</strong>
                            </a>
                        </span>
                    </div>
                </div>

                {/* --- register form --- */}
                <div className="form signup">
                    <img src="./public/images/kanban-logo.png" alt="kanban log" />
                    <span className="title">Regisztráció</span>

                    <form onSubmit={handleRegisterSubmit}>
                        <div className="input-field">
                            <input type="text" placeholder="Felhasználónév" required 
                                value={regUsername}
                                onChange={(e) => setRegUsername(e.target.value)}
                            />
                            <img className="icon" src="./public/images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Profil ikon" />
                        </div>

                        <div className="input-field">
                            <input type="text" placeholder="Email cím" required 
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                            />
                            <img className="icon" src="./public/images/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Email ikon" />
                        </div>
                        
                        <div className="input-field">
                            <input type="password" placeholder="Jelszó létrehozása" required 
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                            />
                            <img className="icon" src="./public/images/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Lakat ikon" />
                            <div className="help-wrapper">
                                <img className="helpIcon" src="./public/images/help_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Segítség ikon" />
                                <div className="tip">
                                    <p>
                                        A jelszónak tartalmaznia kell: <br />
                                        - legalább 8 karaktert <br />
                                        - kis és nagybetűt <br />
                                        - számot <br />
                                        - speciális karaktert (!@#&$%_+-)
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="input-field">
                            <input type="password" placeholder="Jelszó megerősítése" required 
                                value={regConfirm}
                                onChange={(e) => setRegConfirm(e.target.value)}
                            />
                            <img className="icon" src="./public/images/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Lakat ikon" />
                        </div>

                        {error && !isLoginView && <div style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{error}</div>}

                        <div className="input-field button">
                            <button type="submit">Regisztráció</button>
                        </div>
                    </form>

                    <div className="login-signup">
                        <span className="text">Van már fiókod?
                            <a 
                                href="#" 
                                className="text login-link" 
                                onClick={(e) => { e.preventDefault(); setIsLoginView(true); }}
                            >
                                <strong> Bejelentkezés</strong>
                            </a>
                        </span>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
}

export default AuthPage;