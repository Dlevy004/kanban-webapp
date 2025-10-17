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

# Implementációs terv

## Frontend

A felhasználói felület teljes egészében webes technológiákra épül, hogy a rendszer bármilyen eszközről könnyen elérhető legyen, és biztosítsa a platformfüggetlen működést. A frontend fejlesztése React keretrendszerrel valósul meg, amely modern komponensalapú felépítésével támogatja a gyors és reszponzív felhasználói élményt. A React lehetővé teszi, hogy az alkalmazás interaktív, dinamikus és vizuálisan letisztult legyen, valamint hogy a felhasználói műveletek azonnal megjelenjenek a felületen. A rendszer fő eleme a Kanban-tábla, ahol a feladatok három alapvető oszlopban helyezkednek el: „To Do”, „In Progress” és „Done”. A felhasználó a feladatokat drag & drop módszerrel mozgathatja ezek között az oszlopok között, és a módosítások valós időben frissülnek. A React technológia biztosítja a gyors adatcserét a szerver és a kliens között, így a felület mindig naprakész információkat jelenít meg. A frontend kialakítása reszponzív, ami azt jelenti, hogy a felhasználói felület automatikusan alkalmazkodik a különböző képernyőméretekhez, legyen szó asztali számítógépről, tabletről vagy mobiltelefonról. A rendszer támogatja a sötét és világos megjelenési módot is, így a felhasználók saját igényeik szerint választhatják ki a számukra kényelmesebb nézetet. A felhasználói élményt modern, letisztult design, egyértelmű navigáció és vizuálisan elkülönített státuszjelölések teszik áttekinthetővé. A React technológia alkalmazása gyors fejlesztést és könnyű bővíthetőséget biztosít, így a rendszer hosszú távon is rugalmasan fejleszthető új funkciókkal.

## Backend

A szerveroldali működést a Node.js futtatókörnyezet és az Express keretrendszer biztosítja, amelyek stabil és bővíthető alapot nyújtanak a rendszer működéséhez. A backend felelős a felhasználói hitelesítésért és jogosultságkezelésért, amely magában foglalja a regisztráció és a bejelentkezés folyamatát. A rendszer biztosítja, hogy csak érvényes felhasználói adatokkal lehessen hozzáférni a projektekhez és a feladatokhoz. Az Express segítségével kialakított REST API lehetővé teszi a frontend és a szerver közötti strukturált adatcserét, például projektek, feladatok, kommentek és értesítések kezelését. A backend biztosítja a feladatok létrehozását, módosítását, törlését és állapotuk valós idejű frissítését, valamint kezeli a felhasználók közötti kommunikációt. A rendszer valós idejű működést biztosít, ami azt jelenti, hogy ha egy felhasználó módosít egy feladatot, az a csapattagoknál azonnal megjelenik. A szerver ezenkívül értesítéseket is küld a közelgő határidőkről, az új feladat-hozzárendelésekről és a projektek állapotváltozásairól. A backend támogatja a mesterséges intelligencia integrációját is, amely elemzi a feladatokat és javaslatokat tesz a feladatprioritások meghatározására, a határidők kezelésére és a csapatterhelés kiegyensúlyozására. A Node.js és az Express együttes alkalmazása lehetővé teszi a gyors fejlesztést, az egyszerű karbantartást és a hosszú távon stabil működést.

## Adatbázis

A adatokat MongoDB adatbázisban tároljuk, amely dokumentum-orientált felépítésével ideális választás a dinamikus és változó adatszerkezetek kezeléséhez. A MongoDB jól illeszkedik a Node.js alapú környezethez, és biztosítja a rugalmas adatkezelést. Az adatbázis tárolja a felhasználók, projektek, feladatok, kommentek és értesítések adatait. Egy feladat dokumentum tartalmazza a címet, a leírást, a határidőt, a felelőst, a címkéket és az aktuális státuszt. Az adatbázisban tárolt adatok lehetővé teszik a statisztikai kimutatások és elemzések elkészítését, amelyek segítik a projekt előrehaladásának nyomon követését és a csapat hatékonyságának értékelését. A rendszerben a mesterséges intelligencia az adatbázis adatai alapján tud elemzéseket és javaslatokat készíteni, például figyelmeztetést adhat, ha egy határidő közeleg, vagy javasolhatja bizonyos feladatok priorizálását. A MongoDB rugalmas és skálázható megoldás, amely biztonságosan tárolja az adatokat, és biztosítja, hogy a felhasználók mindig naprakész információkhoz férjenek hozzá.

## Fejlesztési folyamat

A fejlesztés során modern webes környezetet és verziókövetési rendszert használunk annak érdekében, hogy a csapatmunka átlátható és hatékony legyen. A forráskód kezelése Git alapú verziókövetéssel történik, amely lehetővé teszi a változtatások nyomon követését és a hibák egyszerű visszafejtését. A fejlesztés folyamata maga is Kanban szemléletet követ, így a projekt megvalósítása tükrözi az alkalmazás működését: a feladatok vizuális táblán követhetők, státuszuk bármikor látható, és a csapattagok valós időben dolgozhatnak ugyanazon a projekten. A fejlesztés célja, hogy a rendszer hosszú távon bővíthető, karbantartható és stabil alapokon működjön, miközben a felhasználók számára gyors, megbízható és könnyen kezelhető élményt nyújtson.

# Tesztterv

A tesztelés célja annak biztosítása, hogy a Kanban Webapp minden funkciója megfelelően működjön, a rendszer stabil legyen, és megfeleljen a funkcionális specifikációban leírt követelményeknek. A tesztelés során ellenőrizzük, hogy a felhasználói felület, a backend szolgáltatások és az adatbázis közötti kommunikáció hibamentesen és összhangban működik-e.

## Tesztelési eljárások

A tesztelési folyamat több szinten zajlik. Elsőként unit tesztek segítségével ellenőrizzük az egyes komponensek helyes működését, például a feladatok létrehozásának, módosításának vagy törlésének logikáját. Ezt követi az integrációs tesztelés, amely során vizsgáljuk a frontend és a backend összekapcsolt működését, hogy a felhasználói műveletek helyesen jelenjenek meg az adatbázisban és fordítva. A fejlesztés végső szakaszában alfa tesztet végzünk, amelyet a fejlesztői csapat tagjai hajtanak végre, hogy kiszűrjék a logikai és funkcionális hibákat, valamint ellenőrizzék a rendszer stabilitását. Az alfa teszt célja a hibák korai feltárása, még a nyilvános használat előtt. Ezt követően béta teszt zajlik, amelyet a fejlesztésben nem részt vevő felhasználók végeznek. A béta teszt célja annak ellenőrzése, hogy az alkalmazás valós környezetben, különböző eszközökön és böngészőkben is hibamentesen működik-e.

## Alfa teszt

Az alfa teszt során a fejlesztőcsapat minden fő funkciót ellenőriz, beleértve a regisztrációt, bejelentkezést, projekt- és feladatkezelést, kommentelést, értesítéseket és az AI-javaslatok működését. A tesztek célja, hogy a fejlesztők megbizonyosodjanak a rendszer stabil működéséről, a funkciók kompatibilitásáról, valamint a hibák azonosításáról. A tesztelés webböngészőkben történik, elsősorban Google Chrome, Mozilla Firefox és Safari környezetben, különböző felbontásokon (1280×720, 1366×768, 1920×1080). Az alfa teszt időtartama egy hét, amely alatt minden modul legalább egyszer átfogó ellenőrzésen megy keresztül.

## Béta teszt

A béta tesztet a fejlesztőcsapattól független felhasználók végzik, akik a rendszer használata közben visszajelzéseket küldenek a hibákról és a felhasználói élményről. A béta teszt célja annak megállapítása, hogy különböző platformokon – asztali gépen, laptopon, tableten és mobilon – megfelelően működik-e, illetve hogy az interfész átlátható és könnyen használható marad-e minden eszközön. A teszteléshez ugyanazok a böngészők használhatók, mint az alfa tesztnél: Chrome, Firefox, Safari, valamint Opera. A béta teszt időtartama szintén egy hét, de szükség esetén meghosszabbítható további hibajavítások elvégzéséig. A béta tesztelés során külön figyelmet fordítunk a valós idejű frissítésekre és az együttműködési funkciókra, vagyis arra, hogy több felhasználó egyidejűleg is képes legyen módosításokat végezni ugyanazon projekten belül, és ezek a változtatások minden érintett számára azonnal megjelenjenek. A tesztelés során vizsgáljuk továbbá az értesítések működését, a feladatok státuszának helyes megjelenését, valamint az AI-asszisztens javaslatainak pontosságát.

## Tesztelendő funkciók

A tesztelés során minden fő modul ellenőrzésre kerül, hogy a rendszer a specifikációban leírtaknak megfelelően működjön.
A backend service működését elsősorban a feladatkezelés, a projektlétrehozás, a felhasználói jogosultságok és az adatbázis-kommunikáció szempontjából vizsgáljuk. Fontos, hogy a backend megfelelően kezelje a REST API-kat, a felhasználókhoz és projektekhez kapcsolódó adatokat, valamint hogy a valós idejű frissítések hibamentesen továbbítódjanak a frontend felé. A frontend tesztelése során ellenőrizzük, hogy a React-alapú felület helyesen jeleníti meg a Kanban-táblát, a feladatok mozgatása drag & drop módszerrel működik-e, és hogy a felhasználói interakciók azonnal láthatók-e minden csapattagnál. Teszteljük a sötét és világos mód váltását, az értesítések megjelenését és a reszponzív megjelenítést különböző eszközökön. A felhasználói azonosítás modul esetében a regisztráció, bejelentkezés és kijelentkezés folyamatait vizsgáljuk, ellenőrizve a hibás adatok kezelését és a jogosultsági szintek megfelelő érvényesítését. A kommentelési funkció tesztje során ellenőrizzük, hogy a hozzászólások valós időben megjelennek-e minden felhasználó számára, és hogy a rendszer megfelelően menti azokat az adatbázisban. Az AI-javaslatok funkció tesztelése során vizsgáljuk, hogy a rendszer megfelelően elemzi-e a feladatokat és a határidőket, valamint képes-e értelmes javaslatokat tenni a felhasználó számára a projekt előrehaladása alapján.

## Elvárt eredmények

A tesztelés sikeres befejezése után a rendszer minden funkciója hibamentesen működik, a felhasználói műveletek valós időben frissülnek, és az alkalmazás különböző eszközökön is megfelelően használható. A rendszer stabilitása, sebessége és kompatibilitása eléri a kívánt szintet, az AI-modul pedig pontosan és konzisztensen ad javaslatokat a feladatkezelés optimalizálására. Amennyiben a tesztelés során hibát vagy rendellenes működést tapasztalunk, a fejlesztők naplózzák az eseményt, és a javításokat követően újratesztelést végeznek. A tesztelés lezárása akkor történik meg, ha minden kritikus hibát kijavítottunk, és a rendszer minden funkciója megfelel a funkcionális követelményeknek.