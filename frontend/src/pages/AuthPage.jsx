import React, { useState } from "react";
import '../pages/AuthPage.css';

function AuthPage() {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className={isLoginView ? 'container' : 'container active'}>
            <div className="forms">

                {/* --- login form --- */}
                <div className="form login">
                    <img src="./public/images/kanban-logo.png" alt="kanban logo" />
                    <span className="title">Bejelentkezés</span>

                    <form>
                        <div className="input-field">
                            <input type="text" placeholder="Email cím" required />
                            <img className="icon" src="./public/images/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Email ikon" />
                        </div>
                        
                        <div className="input-field">
                            <input type="password" placeholder="Jelszó" required />
                            <img className="icon" src="./public/images/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Lakat ikon" />
                        </div>

                        <div className="checkbox-text">
                            <div className="checkbox-content">
                                <input type="checkbox" id="logCheck" />
                                <label htmlFor="logCheck" className="text">Emlékezz rám</label>
                            </div>
                            <a href="#" className="text">Elfelejtettem a jelszavam</a>
                        </div>

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

                    <form>
                        <div className="input-field">
                            <input type="text" placeholder="Felhasználónév" required />
                            <img className="icon" src="./public/images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Profil ikon" />
                        </div>

                        <div className="input-field">
                            <input type="text" placeholder="Email cím" required />
                            <img className="icon" src="./public/images/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Email ikon" />
                        </div>
                        
                        <div className="input-field">
                            <input type="password" placeholder="Jelszó létrehozása" required />
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
                            <input type="password" placeholder="Jelszó megerősítése" required />
                            <img className="icon" src="./public/images/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="Lakat ikon" />
                        </div>

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
    );
}

export default AuthPage;