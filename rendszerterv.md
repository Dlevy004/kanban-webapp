# Kanban Webapp

## Rendszer célja

A rendszer célja egy modern, webalapú Kanban rendszer fejlesztése, amely hatékonyan támogatja a csapatmunkát, az egyéni munkaszervezést és a projektek átlátható kezelését.
A rendszer feladata, hogy egy egységes, valós idejű felületet biztosítson a felhasználók számára, ahol könnyen létrehozhatják, módosíthatják és követhetik a feladataikat, miközben a csapattagok közötti kommunikáció és együttműködés gördülékenyen zajlik. A cél, hogy a hagyományos, manuális feladatkezelési módszereket — például papíralapú jegyzeteket, Excel-táblákat — egy korszerű, digitális platform váltsa fel, amely átláthatóbbá, gyorsabbá és hatékonyabbá teszi a munkafolyamatokat.

A fejlesztés fő célja, hogy egy felhasználóbarát, intuitív és esztétikailag letisztult webes alkalmazás készüljön, amely nemcsak technikailag megbízható, hanem motiváló és hatékony munkakörnyezetet is teremt. A felület teljes mértékben reszponzív, így asztali számítógépen, tableten és mobiltelefonon is kényelmesen használható.

A rendszer célkitűzése nem csupán a feladatok vizuális kezelése, hanem az, hogy intelligens támogatást nyújtson a döntéshozatalban és a prioritások felállításában. Ennek érdekében az alkalmazás mesterséges intelligencia (AI) modulokat is tartalmaz.

A rendszer kiemelt célja, hogy átfogó megoldást nyújtson a csapatok kommunikációjára és feladatmenedzsmentjére egyaránt. A beépített kommentelési és értesítési funkciók lehetővé teszik, hogy a felhasználók közvetlenül a feladatkártyákon belül osszák meg megjegyzéseiket, visszajelzéseiket vagy kérdéseiket. A valós idejű frissítések biztosítják, hogy minden csapattag azonnal lássa a változásokat, így megszűnik az információk elvesztésének vagy a duplikált munkának a veszélye.

A rendszer célkitűzéseinek egyik legfontosabb eleme az átláthatóság és az egyszerűség.
A felhasználói felület minimalista megjelenést kap, amely a funkcionalitást helyezi előtérbe, de ugyanakkor támogatja a vizuális orientációt — például színek, címkék, ikonok és drag & drop interakciók segítségével. A sötét és világos mód opciói, valamint a dinamikus elrendezés lehetőségei hozzájárulnak a kellemes és személyre szabható felhasználói élményhez.

A projekt végső célja egy intelligens, skálázható és inspiráló munkafelület létrehozása, amely nemcsak egy egyszerű Kanban-tábla, hanem egy komplex, együttműködés-központú, döntéstámogató rendszer.
A Kanban Webapp így hozzájárul ahhoz, hogy a csapatok digitálisan érettebbé váljanak, csökkenjen az információvesztés, és a munkafolyamatok a lehető leghatékonyabb formában működjenek.

## Üzleti folyamatok modellje

![user-actions](./rendszerterv%20ábrák/user-actions.png)

![project-roles](./rendszerterv%20ábrák/project-roles.png)

## Követelmények

### Funkcionális követelmények

A rendszernek a felhasználók igényeihez és a Kanban-feladatkezelés céljához igazodva a következő funkciókat kell biztosítania:

**Felhasználói kezelés és jogosultságok:**

- Regisztráció és egyedi felhasználónév, bejelentkezés
    - Felhasználó létrehozhat fiókot e-mail címmel, felhasználónévvel és jelszóval.
    - A felhasználónév egyediségét a rendszer ellenőrzi (pl. 3–30 karakter, ékezetek kezelése).
    - Biztonságos bejelentkezés, munkamenet-kezelés.

- Profil és beállítások
    - Felhasználói profil (név, profilkép, rövid bio), nyelvi beállítások, sötét/világos mód.
    - Személyes statisztikák (részt vett projektek, hozzárendelt feladatok).

- Szerepkörök és jogosultságok
    - Rendszerszintű szerepkörök: admin, project owner, member, observer.
    - Jogosultságok projektenként finomhangolhatók (pl. csak olvasás, szerkesztés, adminisztráció).

**Projekt- és csapatkezelés**

- Projektek létrehozása és kezelése
    - Új projekt létrehozása névvel, leírással.
    - Projekt archiválása, törlése (műveletek auditálása).

**Kanban tábla és feladatok**

- Táblák és oszlopok kezelése
    - Testreszabható oszlopok létrehozása/átnevezése/törlése.

- Kártyák / feladatok
    - Feladatkártya mezők: cím, leírás, határidő, felelős, alfeladatok, címkék/tags, prioritás, - becsült munkaidő, státusz.
    - Fájlmellékletek feltöltése, előnézetek, verziókezelés mellékleteknél.
    - Kártyák archiválása és törlése (visszaállítás lehetősége).
    - Drag & drop a kártyák oszlopok közötti mozgatásához, a pozíció mentése szerveren.

- Keresés és szűrés
    - Keresés feladatcímekre/leírásokra, szűrők (felelős, címke, határidő, priority, státusz, dátumtartomány).

**Kommunikáció és együttműködés**

- Kommentelés
    - Kártyákhoz hozzászólások, fájlok csatolása kommentben.
    - Kommentek valós idejű frissítése WebSocket vagy hasonló technológiával.

- Activity log / audit trail
    - Minden fontos művelet rögzítése (kártya létrehozás, státuszváltás, felhasználó hozzáadása), lekérdezhető napló.

**Idő és határidő kezelés**

- Határidők és emlékeztetők
    - Határidő megadása, naptár nézet, emlékeztetők küldése (pl. 24h, 1h előtte).

- Időkövetés (opcionális)
    - Feladatokra időráfordítás rögzítése (start/stop timer), összesítések számlázáshoz vagy riporthoz.

**Statisztikák, riportok és AI támogatás**

- Dashboard
    - Projekt- és workspace-szintű dashboard: elvégzett feladatok

- AI javaslatok (K13)
    - Automatizált javaslatok: túlterhelt felhasználók, prioritás-ajánlások, lezárásra javasolt feladatok.
    - AI-szöveg segédlet feladatleírások gyors létrehozásához (opcionális, auditálható).

**Admin és tartalomkezelés**

- Admin UI
    - Felhasználók listája, projektlista, jogosultság-módosítás, rendszerbeállítások.

- Karbantartás és adatműveletek
    - Adatimport/export (CSV/JSON), tömeges műveletek, archiválás.

- Riportok és auditok
    - Rendszerszintű riportok, audit naplók és események exportálása.

**Integrációk és API**

- Nyilvános/privát REST API
    - CRUD műveletek feladatokra, projektekre, felhasználókra; OAuth2 / token alapú hitelesítés.

- Harmadik féltől származó integrációk
    - Naptár (Google Calendar), Slack/Teams értesítések, Jira/Asana importálás (opcionális).

**Lokalizáció és elérhetőség**

- Nyelvi támogatás
    - Alapértelmezett HU és EN; könnyen bővíthető további nyelvekkel.

### Nem funkcionális követelmények
A rendszer működésének minőségére, teljesítményére és biztonságára vonatkozó elvárások:

**Biztonság**

- Hitelesítés és autorizáció
    - Biztonságos jelszókezelés: erős hash (pl. bcrypt/argon2) a jelszavakhoz.

- Adatkommunikáció védelme
    - HTTPS minden végponton

- Input validáció

**Adatvédelem és megfelelés**

- GDPR kompatibilitás
    - Személyes adatok min. tárolása, felhasználói hozzájárulás és adatelérési/ törlési mechanizmusok biztosítása.
    - Adatfeldolgozási tájékoztató, adatkezelési szabályzat és cookie-kezelés.

- Anonimizálás / pseudonimizálás
    - Riportoknál anonimizált adatok használata, ha lehetséges.

- Adathozzáférés
    - Felhasználó kizárólag a saját személyes adataihoz férjen hozzá (felhasználónév kivételével).

**Teljesítmény és skálázhatóság**

- Válaszidők és betöltés
    - Oldal kezdeti betöltési ideje átlagos internetkapcsolaton ≤ 2s (ideális ≤ 1s a fő felületekre).

- Skálázhatóság

**Rendelkezésre állás és mentések**

- Mentés és helyreállítás
    - Napi/óránkénti adatbázis-mentések, legalább 30-90 napos retention, rendszeres restore gyakorlatok dokumentálva.

- Monitoring és alerting
    - Rendszer- és alkalmazásszintű monitoring (CPU, memória, response time, error rate), eseményértesítések.

**Használhatóság és hozzáférhetőség**

- UX
    - Intuitív, könnyen tanulható felület – onboarding wizzard, tooltippek, egyértelmű ikonográfia.

- Akadálymentesség
    - WCAG 2.1 AA követelmények teljesítése legalább a kritikus felületeken (navigáció, űrlapok, gombok).

- Reszponzivitás
    - Mobil, tablet és desktop támogatás; touch-friendly drag & drop mobilon is.

### Törvényi előírások, szabványok és irányelvek
A fejlesztés és üzemeltetés során az alábbi jogszabályoknak és iparági ajánlásoknak kell megfelelni:

**Jogszabályok (Magyarország / EU)**

- GDPR (Általános Adatvédelmi Rendelet)
    - Személyes adatok kezelése jogszerűen, célhoz kötötten, adatminimalizálással. Felhasználói jogok (hozzáférés, helyesbítés, törlés, hordozhatóság) biztosítása.

- Infotv. (2011. évi CXII. törvény)
    - Magyar információvédelmi szabályok betartása a helyi üzemeltetés és jogi megfelelés érdekében.

- Cookie-szabályozás (EU)
    - Hozzájáruláson alapuló cookie-kezelés, cookie banner, részletes cookie policy.

**Szabványok és irányelvek**

- WCAG 2.1 AA – webes akadálymentességi ajánlások betartása kritikus funkciók esetén.

- OWASP Top 10 – webalkalmazás biztonsági kockázatok kezelése.

- ISO/IEC 27001 (ajánlott) – információbiztonsági irányítási rendszer ajánlása nagyvállalati/érzékeny környezetben.

- HTTPS/TLS konfigurációs ajánlások – erős titkosítás és modern TLS-beállítások.

**Szerzői jog és tartalom**

- Jogtiszta tartalom
    - Képek, ikonok, sablonok, importált tartalom csak jogtiszta, licencelt vagy saját előállítású lehet.

- Felelősség és moderáció
    - Felhasználók által feltöltött tartalmaknál feltételek és moderációs szabályok (pl. jogsértő tartalom eltávolítása).
    - 



## Karbantartási terv

A Kanban Webapp rendszer karbantartása biztosítja a hosszú távú megbízható működést, az adatok integritását és a biztonsági előírások betartását.  
A karbantartás célja, hogy a rendszer folyamatosan megfeleljen a felhasználói igényeknek, a technológiai fejlődésnek és a jogi előírásoknak.

### Karbantartás típusai

**1. Hibajavító karbantartás**  
Célja a fejlesztés során vagy a használat közben felmerülő hibák (bugok, működési rendellenességek) javítása.  
A hibákat a felhasználók visszajelzései, logok, monitoring eszközök alapján azonosítja a fejlesztői csapat.  
A javításokat verziókezeléssel dokumentálni kell (pl. Git issue és commit hivatkozás).

**2. Adaptív karbantartás**  
A rendszer frissítése új környezeti feltételekhez, például új böngészőverziókhoz, szerverfrissítésekhez vagy API-változásokhoz.  
Ide tartozik a Node.js, MongoDB és frontend függőségek (npm packages) frissítése is.

**3. Tökéletesítő (preventív) karbantartás**  
A teljesítmény, biztonság és felhasználói élmény növelését szolgáló fejlesztések.  
Például gyorsabb betöltési idők, optimalizált adatbázis-lekérdezések, caching és UI fejlesztések.

**4. Fejlesztő (evolúciós) karbantartás**  
Új funkciók hozzáadása a felhasználói igények alapján (pl. új AI-funkciók, integrációk, riportok).  
Ezek külön fejlesztési sprintekben, verziókövetett módon kerülnek bevezetésre.

---

### Karbantartási folyamat

| **Tevékenység** | **Leírás** | **Gyakoriság** |
|------------------|-------------|----------------|
| Rendszer- és szervermonitorozás | CPU, memória, hálózati terhelés és hibák figyelése. | Folyamatos |
| Biztonsági frissítések | Függőségek, Node.js és MongoDB verziók frissítése. | Havonta |
| Mentések ellenőrzése | Adatbázis-mentések és visszaállítási tesztek ellenőrzése. | Hetente |
| Log elemzés | Hibanaplók és audit trail vizsgálata. | Hetente |
| Felhasználói visszajelzések feldolgozása | Support csatornákon beérkező hibák és igények elemzése. | Folyamatos |
| Verziófrissítés dokumentálása | Changelog és release notes készítése. | Minden kiadáskor |

---

### Mentési és visszaállítási terv

- **Adatbázis-mentés:** Automatikus, napi mentés a MongoDB adatbázisról (pl. `mongodump`), verziózott formában.  
- **Mentési stratégia:**  
  - Napi inkrementális mentés  
  - Heti teljes mentés  
  - 30–90 napos retention idő  
- **Visszaállítási teszt:** Havonta legalább egyszer tesztelni kell az adatvisszaállítást fejlesztői környezetben.  
- **Mentések helye:** Külön, titkosított tárhely (pl. AWS S3, Google Cloud Storage).  
- **Kritikus esemény esetén:**  
  - Incidensnapló nyitása  
  - Adat-helyreállítás 24 órán belül  

---

### Verziókezelés és dokumentáció

A rendszer forráskódja **Git** alapú verziókezelésben van (GitHub).  
A főág (`main`) stabil kiadásokat tartalmaz, a fejlesztések `feature/*` ágakon zajlanak.  
Minden kiadáshoz kötelező:  
- Verziószám (`v1.2.0` formátumban)  
- Changelog (módosítások rövid leírása)  
- Tesztelési jegyzőkönyv vagy QA dokumentum
- 



## Telepítési terv

A Kanban Webapp egy webes alkalmazás, így külön telepítést a felhasználói oldalon nem igényel.  
A rendszer egy modern böngészőn keresztül érhető el, és a szerveroldali futtatásról az üzemeltető gondoskodik.

### Webes alkalmazás esetén

- A szoftver használatához nincs szükség külön telepítésre.  
- A felhasználónak elegendő egy ajánlott, naprakész böngésző telepítése, például:  
  **Google Chrome**, **Mozilla Firefox**, **Microsoft Edge**, **Opera** vagy **Safari**.  
- A webes felület a szerverről tölthető be egy egyszerű URL megadásával, például:  
  `https://kanban-webapp.hu`  
- A kliens (felhasználói gép) közvetlenül a webszerverhez kapcsolódik az interneten keresztül.  
- Az alkalmazás automatikusan betöltődik, a felhasználó bejelentkezés után azonnal használhatja.  

### Fejlesztői és szerveroldali telepítés (belső használatra)

- A forráskód a projekt GitHub repozitóriumából érhető el.  
- A fejlesztők Node.js és MongoDB környezetben futtatják a rendszert.  
- A projekt futtatásához elegendő az alábbi lépések végrehajtása:
  ```bash
  git clone https://github.com/<org>/kanban-webapp.git
  cd kanban-webapp
  npm install
  npm start

