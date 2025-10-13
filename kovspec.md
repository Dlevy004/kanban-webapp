# Kanban Webapp

## Áttekintés

A projektünk célja egy Kanban alapú feladatkezelő alkalmazás fejlesztése, amely segíti a csapatmunkát és az egyéni munkaszervezést. Az alkalmazás lehetőséget biztosít feladatok létrehozására, kategorizálására és állapotuk nyomon követésére, tipikusan a „To Do – In Progress – Done” elrendezés szerint. A rendszerben a felhasználók regisztrálhatnak, bejelentkezhetnek, valamint csapatokat és projekteket hozhatnak létre, amelyekhez külön feladatokat rendelhetnek. A feladatokhoz leírást, határidőt és felelőst is lehet kapcsolni, így átláthatóvá válik a munka folyamata. Az alkalmazást webes felületen keresztül lehet majd elérni, és modern technológiákat tervezünk használni a fejlesztés során. A cél egy egyszerű, letisztult, reszponzív és könnyen kezelhető Kanban rendszer létrehozása, amely támogatja a hatékony együttműködést és a produktivitás növelését.

## Jelenlegi helyzet

Jelenleg sok vállalat és csapat még mindig hagyományos, papíralapú vagy táblázatos módszerekkel szervezi a feladatait. Ezek a megoldások azonban nehezen átláthatók, időigényesek, és nem teszik lehetővé a hatékony együttműködést, különösen akkor, ha több ember dolgozik ugyanazon a projekten. A feladatok státuszának követése, a határidők betartása és a felelősségek kiosztása gyakran kaotikussá válik, ami rontja a munkafolyamat hatékonyságát és a csapat teljesítményét. A digitális átállás hiánya miatt sok esetben nem valósul meg a valós idejű információmegosztás, így a projektvezetők és munkatársak nehezen tudják nyomon követni a folyamatok aktuális állapotát. Emiatt egy modern, webalapú Kanban rendszer bevezetése elengedhetetlen ahhoz, hogy az ilyen cégek és csapatok lépést tartsanak a mai munkahelyi elvárásokkal, növeljék a termelékenységet, és átláthatóbbá tegyék a feladatkezelést.

## Vágyálom rendszer

A vágyálom rendszer célja egy olyan modern, webalapú Kanban alkalmazás megvalósítása, amely teljes körűen támogatja a feladatok és projektek hatékony szervezését, a csapatmunka fejlesztését és az átlátható munkafolyamatokat. Az ideális rendszer egy gyors, reszponzív és felhasználóbarát felületet biztosít, amelyen a felhasználók egyszerűen létrehozhatják, kezelhetik és nyomon követhetik a feladataikat.

Az alkalmazás lehetővé teszi projektek és csapatok létrehozását, a feladatok különböző állapotok közti mozgatását, valamint a feladatokhoz kapcsolódó információk – például határidők, felelősök, leírások és címkék – kezelését. A felhasználók közötti együttműködést valós idejű frissítések, kommentelési lehetőség és értesítések segítik. A rendszer képes a feladatok és projektek adataiból statisztikákat készíteni, ezzel támogatva a hatékonyság növelését és az átlátható munkaszervezést.

Az ideális Kanban rendszer mesterséges intelligenciával is kiegészül: javaslatokat ad, figyelmeztet a közelgő határidőkre, és elemzéseket készít a projekt előrehaladásáról. A felhasználói élményt modern, letisztult design, sötét/világos mód, valamint kényelmes, drag & drop alapú feladatkezelés biztosítja. A cél egy olyan intelligens, interaktív és inspiráló munkafelület létrehozása, amely egyszerre szolgálja az egyéni hatékonyságot és a csapatmunkát.

## Jelenlegi üzleti folyamatok modellje

Jelenleg a csapatok és kisebb szervezetek feladatkezelése többnyire elavult, manuális módszerekre épül. A feladatokat gyakran táblázatokban, e-mailekben vagy chat-alkalmazásokban vezetik, amelyek nem biztosítanak valós idejű frissítést és átlátható nyomon követést. A változások manuális rögzítése, a kommunikáció széttagoltsága és a határidők figyelmen kívül hagyása gyakran hibákhoz és késésekhez vezet.

A jelenlegi folyamat így időigényes, nehezen kezelhető és nem támogatja a hatékony csapatmunkát. Ezért van szükség egy korszerű, webalapú Kanban rendszerre, amely egyesíti a feladatkezelést, az együttműködést és az átlátható projektkövetést egyetlen, központi platformon.

## Igényelt üzleti folyamatok

A felhasználó a főoldalon keresztül szeretne bejelentkezni (felhasználónév, jelszó) vagy új fiókot regisztrálni (felhasználónév, e-mail, jelszó). A sikeres bejelentkezést követően a felhasználó hozzáférést kap a saját projektjeihez és csapataihoz.
Az alkalmazás fő felülete egy Kanban-tábla, ahol a feladatok az ‘To Do – In Progress – Done’ oszlopok között mozgathatók drag & drop módszerrel. A felhasználó létrehozhat új projektet, amelyhez meghívhat más csapattagokat, és létrehozhat külön feladatokat leírással, határidővel, felelőssel és címkékkel. A feladatok módosíthatók, áthelyezhetők és archiválhatók. A rendszer valós idejű frissítéseket biztosít: ha egy csapattag módosít egy feladatot, az azonnal megjelenik minden érintett felhasználó számára.
Az alkalmazás értesítéseket küld a közelgő határidőkről, a hozzárendelt új feladatokról és a projektállapot változásairól. Az alkalmazás további funkciója az adatelemzés és a mesterséges intelligencia által generált javaslatok: figyelmeztet a túlterhelt tagokra, ajánl feladatprioritásokat, és vizualizálja a projekt előrehaladását. A cél, hogy a jelenlegi manuális, táblázatos vagy papíralapú feladatkezelést egy modern, webalapú, átlátható és automatizált folyamattal váltsuk ki, amely támogatja a hatékony együttműködést és növeli a produktivitást.

## Követelménylista

| Modul                |  ID  | Név                       |  v. | Kifejtés |
|----------------------|------|---------------------------|-----|----------|
| Jogosultság          |  K1  | Bejelentkezési felület    | 1.0 | A felhasználó e-mail címe és jelszava megadásával beléphet az alkalmazásba.|
| Jogosultság          |  K2  | Regisztráció              | 1.0 | A felhasználó új fiókot hozhat létre, e-mail, felhasználónév és jelszó megadásával.|
| Feladatkezelés       |  K3  | Feladat létrehozása       | 1.0 | A felhasználó új feladatot hozhat létre egy projekten belül.|
| Feladatkezelés       |  K4  | Feladat módosítása        | 1.0 | A felhasználó módosíthatja egy meglévő feladat adatait.|
| Feladatkezelés       |  K5  | Feladat törlése           | 1.0 | A felhasználó törölhet egy meglévő feladatot a projektből.|
| Projektkezelés       |  K6  | Projekt létrehozása       | 1.0 | A felhasználó (vagy csapatvezető) új projektet hozhat létre név és leírás megadásával.|
| Projektkezelés       |  K7  | Csapattagok kezelése      | 1.0 | Tagok meghívása, eltávolítása, szerepkörök módoítása|
| Kommunikáció         |  K8  | Kommentelés               | 1.0 | A felhasználók feladatokhoz megjegyzéseket fűzhetnek.|
| Kommunikáció         |  K9  | Értesítések               | 1.0 | A rendszer értesítéseket küld.|
| Felhasználói felület |  K10 | Drag & Drop kezelőfelület | 1.0 | A Kanban-tábla interaktív módon használható.|
| Felhasználói felület |  K11 | Sötét / Világos mód       | 1.0 | A felhasználó választhat megjelenési módot.|
| Felhasználói felület |  K12 | Reszponzív design         | 1.0 | Az alkalmazás minden eszközről kényelmesen használható.|
| Extra funkció        |  K13 | AI javaslatok             | 1.0 | A rendszer mesterséges intelligencia segítségével javaslatokat ad.|




## Forgatókönyv

A forgatókönyvek célja, hogy bemutassák a rendszer egy-egy tipikus használati folyamatát,
hogyan érik el a felhasználók a kívánt célt a Kanban Webapp használatával.

### Forgatókönyv 1 – Bejelentkezés és projekt létrehozás
Szereplők:
Felhasználó, Webalkalmazás, Szerver, Adatbázis

Előfeltétel:
A felhasználó regisztrált és rendelkezik érvényes fiókkal.

Lépések:
A felhasználó megnyitja a Kanban Webapp webes felületét.
A bejelentkezési űrlapon megadja az e-mail címét és jelszavát.
A rendszer ellenőrzi az adatokat az adatbázisban.
Sikeres bejelentkezés után a felhasználó a főoldalra kerül, ahol láthatja a projektjeit.
A „+ Új projekt” gombra kattintva megadja a projekt nevét és leírását.
A rendszer létrehozza a projektet és automatikusan hozzáadja az alapértelmezett oszlopokat: To Do, In Progress, Done.

Eredmény:
A felhasználó létrehozott egy új projektet, ami készen áll feladatok hozzáadására.

### Forgatókönyv 2 – Feladat létrehozása és mozgatása

Szereplők:
Felhasználó, Webalkalmazás

Előfeltétel:
A felhasználó be van jelentkezve és megnyitott egy meglévő projektet.

Lépések:
A felhasználó az „To Do” oszlopban rákattint az „Új feladat” gombra.
Megadja a feladat címét, leírását, határidejét, valamint kijelöli a felelőst.
A rendszer elmenti a feladatot és megjeleníti azt a táblán.
Amikor a felhasználó dolgozni kezd rajta, a kártyát drag & drop módszerrel áthúzza az „In Progress” oszlopba.
A változás valós időben megjelenik minden csapattag számára.

Eredmény:
A feladat státusza megváltozik, és az állapotváltás minden résztvevőnél azonnal látható.

### Forgatókönyv 3 – AI javaslat és értesítés határidő előtt

Szereplők:
Felhasználó, AI-asszisztens, Webalkalmazás

Előfeltétel:
A projektben van legalább egy „In Progress” feladat, amelyhez közeleg a határidő.

Lépések:
Az AI-modul elemzi a feladatok határidejét és státuszát.
Észleli, hogy egy feladat határideje hamarosan lejár.
A rendszer automatikus értesítést küld a felhasználónak:
„A ‘Backend API fejlesztés’ feladat határideje 1 napon belül lejár.”
Az AI javaslatot küld: „Szeretnéd áthelyezni a ‘Frontend integráció’ feladatot későbbre, hogy be tudd fejezni a folyamatban lévő munkát?”
A felhasználó dönthet a javaslat elfogadásáról vagy elutasításáról.

Eredmény:
A rendszer segíti a határidők kezelését és a munka optimalizálását.


## Fogalomtár
### Fogalom:                          	Meghatározás:
Kanban tábla:                       Olyan vizuális felület, amely oszlopokban (To Do, In Progress, Done) jeleníti meg a feladatok állapotát.
Feladatkártya:                      Egy adott feladatot megjelenítő kártya, amelyet az oszlopok között lehet mozgatni.
Oszlop:                             A feladat státuszát jelző kategória (pl. Teendő, Folyamatban, Kész).
Drag & Drop:                        Egérrel történő húzás és elengedés funkció, amellyel a feladatkártyák mozgathatók.
Projekt:                            Egy konkrét munkafolyamatot tartalmazó egység, amely több feladatot foglal magába.
Felelős (Assignee):                 A feladathoz rendelt személy, aki annak elvégzéséért felelős.
AI-asszisztens:                     Mesterséges intelligencia alapú modul, amely javaslatokat és figyelmeztetéseket ad a határidők és terhelés alapján.
Reszponzív design:	                A felület automatikusan igazodik az eszköz képernyőméretéhez (mobil, tablet, asztali).
Értesítés:	                        Automatikus üzenet, amely tájékoztatja a felhasználót egy változásról vagy határidőről.
MongoDB:	                          Dokumentum-alapú adatbázis, amely JSON-szerű objektumokat tárol.
Express.js:	                        Backend keretrendszer Node.js alapokon, REST API-k fejlesztéséhez.
React:                          	  Frontend keretrendszer komponensalapú webes felületek készítéséhez.
