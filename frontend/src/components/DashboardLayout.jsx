import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import KanbanLogo from '../assets/kanban-logo-wout-bg.png';
import KanbanDarkLogo from '../assets/light-kanban-logo.png';
import '../pages/DashboardPage.css';
import ThemeToggle from './ThemeToggle.jsx';

const VICCEK = [
"Mire táncolnak a programozók a buliban? – Algoritmusra.",
  "Hány programozó kell egy villanykörte becsavarásához? – Egy sem, mert az hardverhiba.",
  "Hogy hívják az állandóan hibázó programozó csoportot? – ERRORISTA CSOPORT.",
  "A programozó találkozik egy beszélő békával. A béka megszólal: 'Csókolj meg, és királylánnyá változom!' A programozó zsebre teszi. A béka újra könyörög: 'De tényleg, csókolj meg, és a tiéd leszek!' A programozó válaszol: 'Tudod, rengeteg a munkám, egy csaj csak púp lenne a hátamon. De egy beszélő béka... az cool.'",
  "Ön most egy 'bosnyák vírust' kapott. Mivel nem rendelkezünk programozói tapasztalattal, ez a vírus a bizalom elvén működik. Kérjük, törölje le minden fájlját, és küldje tovább ezt az üzenetet ismerőseinek. Köszönjük az együttműködést!",
  "A világon 10 féle ember létezik: aki ismeri a kettes számrendszert, és aki nem.",
  "Mi a hardver? Az a számítógép-alkatrész, amit rugdosni lehet, ha lefagy a szoftver.",
  "Mit mondott Bill Gates a feleségének a nászéjszaka után? – Drágám, ez még csak a béta verzió volt!",
  "Hogy hívják a programozó bokszolót? – Linux Lewis.",
  "A pesszimista látja a sötét alagutat. Az optimista látja a fényt az alagút végén. A programozó látja a közeledő vonatot.",
  "Mi a különbség a Windows és egy vírus között? – A vírus ingyen is működik.",
  "Miért halt meg a programozó a zuhany alatt? – Mert a samponra rá volt írva: Lather, Rinse, Repeat (Habosítsd, öblítsd, ismételd).",
  "Honnan lehet tudni, hogy a szőke nő fel akart menni a netre? – A billentyűzeten van a lábnyoma.",
  "Hogy hívják a templomok közti hálózatot? – PapLAN.",
  "Hogy hívják az informatikus nyomozót? – Numlock Holmes.",
  "Két programozó beszélget: – Milyen a barátnőd? – Objektumorientált.",
  "Miért teremtette Isten a világot 6 nap alatt? – Mert nem volt kompatibilitási problémája az előző verzióval.",
  "Mit csinál az internetező rab a börtönben? – Letölti a büntetését.",
  "Mit mond a processzor a memóriának? – Felejts el!",
  "A programozó vizsgázik. – A 0 az hamis, az 1 pedig igaz, nemde? – 1.",
  "Miért Chuck Norris a világ legjobb programozója? – Mert olyan kódot ír, ami saját magát képes optimalizálni.",
  "Két informatikus beszélget: – Képzeld, tegnap az éjszakai klubban megismerkedtem egy csinos szőke nővel. – Szerencsés fickó! – Felhívtam a lakásra, ittunk egy kicsit, átöleltem... – És aztán? – Egyszer csak azt mondja: 'Vetkőztess le!' – Nahát! – Levettem a nadrágját, aztán a bugyiját is, aztán lefektettem az új laptopom mellé az asztalra. – Nocsak, vettél egy új laptopot? Milyen processzorral?",
  "Hogyan próbálnak meggazdagodni az objektumorientált programozók? – Öröklődés által."
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  const [napiVicc, setNapiVicc] = useState('');

  useEffect(() => {
    const randomVicc = VICCEK[Math.floor(Math.random() * VICCEK.length)];
    setNapiVicc(randomVicc);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/auth');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="dashboard-page-wrapper">
      <div className="dashboard-centered-content">

        <nav className="dashboard-navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          <div className="dashboard-logo" style={{ flexShrink: 0 }}>
            <img src={KanbanLogo} alt="Kanban App Logo" className="lightMode-icon kanban-logo-img" />
            <img src={KanbanDarkLogo} alt="Kanban App Logo" className="darkMode-icon hide kanban-logo-img" />
          </div>

          <div className="joke-container" style={{ 
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
              
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'var(--color-text)', 
            fontSize: '0.95rem',
            opacity: 0.9,            
            whiteSpace: 'normal',     
            lineHeight: '1.4',   
            width: 'fit-content',
            pointerEvents: 'none'     
          }}> 
            <span style={{ maxWidth: '600px' }}>
              {napiVicc}
            </span>
          </div>

          <div className="dashboard-user-info" style={{ flexShrink: 0 }}>
            <ThemeToggle />

            {isProfilePage ? (
              <button className="dashboard-profile-btn" onClick={handleDashboard}>
                Dashboard
              </button>
            ) : (
              <button className="dashboard-profile-btn" onClick={handleProfile}>
                Profil
              </button>
            )}
            
            <button className="dashboard-logout-btn" onClick={handleLogout}>
              Kijelentkezés
            </button>
          </div>
        </nav>
        
        <Outlet />

      </div>
    </div>
  );
}