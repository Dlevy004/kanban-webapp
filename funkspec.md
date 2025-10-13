# Kanban Webapp

## Áttekintés

A projekt célja egy modern, webalapú Kanban rendszer fejlesztése, amely megkönnyíti a feladatok szervezését és a csapaton belüli együttműködést. Az alkalmazás lehetőséget biztosít a felhasználóknak regisztrációra, bejelentkezésre, projektek létrehozására, valamint ezekhez feladatok hozzáadására. A feladatok különböző oszlopokba sorolhatók (például „Teendő”, „Folyamatban”, „Kész”), amelyek a munkafolyamat aktuális állapotát jelképezik. A feladatok könnyen mozgathatók ezek között az oszlopok között, így a felhasználók valós időben követhetik a projekt előrehaladását.
A rendszer célja egy letisztult, átlátható és könnyen kezelhető felület biztosítása, amely támogatja a hatékony időgazdálkodást és feladatkezelést. A fejlesztés során modern technológiákat alkalmazunk: a frontend Reacttel, a backend Node.js és Express keretrendszerrel készül, míg az adatok tárolását MongoDB biztosítja. Az alkalmazás reszponzív lesz, így asztali gépen, tableten és mobilon is kényelmesen használható.

## Jelenlegi helyzet

A megrendelő jelenleg hagyományos, elavult módszerekkel követi nyomon a feladatokat, például táblázatok vagy papíralapú listák formájában. Ezek a megoldások nehezen átláthatók, nem támogatják a valós idejű együttműködést, és különösen több résztvevős projektek esetén lassítják a munkafolyamatot. A feladatok státuszának nyomon követése, a határidők kezelése és a felelősök kijelölése gyakran nehézkes, ami a csapat teljesítményének csökkenéséhez vezet.
A XXI. századi digitális elvárások mellett szükség van egy olyan korszerű, webalapú megoldásra, amely egyszerre átlátható, hatékony és könnyen kezelhető. A megrendelő ezért igényelt egy saját, testre szabott Kanban rendszert, amely lehetővé teszi a feladatok dinamikus kezelését, a csapattagok közötti együttműködés javítását, valamint a projektek hatékonyabb lebonyolítását.

## Vágyálom rendszer

A vágyálom rendszer célja egy teljes funkcionalitású, modern és intuitív Kanban alapú feladatkezelő platform megvalósítása, amely minden szempontból támogatja a hatékony feladatmenedzsmentet és csapatmunkát. A rendszer a felhasználók számára egy átlátható, valós idejű, interaktív felületet biztosít, amelyen keresztül egyszerűen kezelhetik a projektjeiket, feladataikat és a csapattagokkal való együttműködést.

Az ideális rendszer minden funkciója gyorsan, hibamentesen és reszponzívan működik, függetlenül a felhasznált eszköztől (asztali gép, tablet, mobiltelefon).
A felhasználói élményt egy modern, letisztult design és gördülékeny interakciók biztosítják — például drag & drop mozgathatóság, valós idejű frissülés és animált átmenetek.

### Fő funkciók és jellemzők ideális esetben:

- **Teljeskörű felhasználókezelés** - Regisztráció, bejelentkezés, új-jelszó-beállítása. Profilkép, bio és státusz megjelenítése, valamint szerepkörök (pl. szerkesztő, megfigyelő, vezető stb.) kezelése projekten belül.

- **Projekt- és csapatmenedzsment** - A felhasználók több projektet is létrehozhatnak, mindegyikhez külön táblákat rendelhetnek. Projekten belül meghívhatnak más felhasználókat, akik különböző jogosultságokkal rendelkezhetnek. Lehetőség van projektek archiválására és statisztikák megtekintésére is.

- **Kanban tábla funkciók** - A felhasználó saját oszlopokat hozhat létre (pl.: „To Do”, „In Progress”, „Done”). A kártyák drag & drop módszerrel mozgathatók, és valós időben frissülnek minden csapattag számára. A kártyákhoz leírás, határidő, felelős, címkék (tag-ek), fájlmellékletek és kommentek is kapcsolhatók. Minden módosítás automatikusan mentésre kerül.

- **Mesterséges intelligencia integráció** - AI-asszisztens segíti a feladatkezelést és a munkaszervezést: figyelmeztet, ha egy határidő közeleg, javaslatokat ad a következő lépésekre (pl.: „Ezek a feladatok régóta In Progress státuszban vannak – szeretnéd lezárni őket?”). Ezen kívül a rendszer képes rövid statisztikai összefoglalókat és elemzéseket generálni a projekt előrehaladásáról.

- **Felhasználói élmény és design** - Modern, reszponzív UI, amely sötét/világos módot is tartalmaz. A feladatok státusza színek és ikonok segítségével könnyen átlátható. Az animációk, tooltippek és modális ablakok segítik a könnyű navigációt.

## Jelenlegi üzleti folyamatok modellje

A jelenlegi feladatkezelési folyamatok sok esetben még mindig elavult, széttagolt és manuális megoldásokra épülnek. Számos csapat és vállalkozás táblázatokat, e-mailt, csevegőprogramokat vagy egyszerű jegyzeteket használ a projektek nyomon követésére. Ezek a módszerek bár alapvetően működőképesek, hosszú távon nehezen kezelhetők, átláthatatlanok és nem alkalmasak a valós idejű együttműködésre.

A legtöbb kisebb vállalkozás, cég, vagy iskolai projektcsoport  a következő módon dolgozik: a feladatokat egy közös Excel-táblázatban vezetik, amelyben oszlopok jelzik a státuszokat (pl. „Feladat neve”, „Felelős”, „Határidő”, „Állapot”). Ez a megoldás azonban nem teszi lehetővé a hatékony kommunikációt és az azonnali visszajelzést. Ha egy feladat állapota megváltozik, a csapattagoknak manuálisan kell frissíteniük a táblázatot, és külön e-mailben értesíteniük egymást. Ez gyakran hibákhoz, elfelejtett határidőkhöz vagy duplikált munkához vezet.

Egy másik elterjedt, de szintén nehézkes módszer az, amikor a csapatok különböző chat-alkalmazásokban (például Messenger, Discord, MS Teams) egyeztetnek a feladatokról. Bár ezek a platformok gyors kommunikációt tesznek lehetővé, a feladatok és információk hamar elvesznek a beszélgetésekben. Ilyen környezetben nincs lehetőség rendszerezett nyomon követésre, a határidők követése pedig a felhasználók memóriájára van bízva.

A nagyobb szervezeteknél ugyan előfordulhat valamilyen projektmenedzsment szoftver használata (pl. Trello), azonban ezek gyakran bonyolultak, túl sok funkcióval rendelkeznek, vagy fizetős modellekre épülnek, ami korlátozza a kisebb csapatok hozzáférését. Sok felhasználó számára ezek a rendszerek túlbonyolítottak, így nem használják ki a bennük rejlő lehetőségeket. Ennek következtében a feladatkezelés és együttműködés továbbra is nehézkes marad, és a csapatok sok időt veszítenek adminisztrációval a tényleges munka helyett.

### A hagyományos módszerek jellemző problémái:
- **Korlátozott átláthatóság** -  Nehéz egy pillantással megállapítani, hol tart egy projekt, ki mivel foglalkozik.

- **Hiányzik a határidők kezelése** - Nincs automatikus emlékeztető vagy figyelmeztetés, ha valami közeleg vagy elmarad.

- **Nehezen skálázható** - A táblázatos és manuális módszerek nem alkalmasak nagyobb csapatok vagy összetettebb projektek kezelésére.

Mindezek miatt a jelenlegi folyamat időigényes, széttagolt és hibalehetőségekkel teli.
A hatékonyság növeléséhez szükség van egy központi, vizuális és valós idejű platformra, amely egy helyen gyűjti össze az összes feladatot, információt és kommunikációt.

## Igényelt üzleti folyamatok

A projekt célja, hogy a csapatok és egyéni felhasználók számára egyszerűbbé és hatékonyabbá tegye a feladatkezelést egy modern, webalapú Kanban rendszer segítségével. Az alkalmazás lehetővé teszi, hogy a felhasználók regisztráljanak vagy bejelentkezzenek, majd hozzáférjenek saját projektjeikhez és csapataikhoz. A bejelentkezés után a felhasználó egy áttekinthető, interaktív Kanban-táblán dolgozik, ahol a feladatok különböző állapotok között mozgathatók (To Do – In Progress – Done) drag & drop módszerrel. A felhasználó új projekteket hozhat létre, meghívhat más csapattagokat, valamint létrehozhat és szerkeszthet feladatokat, amelyekhez leírást, határidőt, felelőst és címkéket rendelhet. A rendszer valós idejű frissítést biztosít, így ha egy csapattag módosít egy feladatot vagy annak állapotát, az azonnal láthatóvá válik minden érintett felhasználó számára. Ezáltal megszűnik a manuális adatfrissítés igénye, és a csapat mindig naprakész információkkal dolgozhat. Az alkalmazás automatikus értesítéseket küld a közelgő határidőkről, új feladat-hozzárendelésekről és a projektek állapotváltozásairól, így a felhasználók könnyen követhetik a munkafolyamatokat. A beépített statisztikai és elemző funkciók segítségével a rendszer képes grafikonokat és riportokat készíteni a feladatok előrehaladásáról, a csapatteljesítményről és a projekt állapotáról. A mesterséges intelligencia további támogatást nyújt azáltal, hogy figyelmeztet a túlterhelt csapattagokra, javaslatokat tesz a feladatprioritások átrendezésére, valamint elemzi a munkafolyamatokat a hatékonyság növelése érdekében. A digitális Kanban rendszer bevezetésével a jelenlegi, manuális és nehezen átlátható feladatkezelés helyét egy automatizált, központosított és valós idejű megoldás veszi át. Ennek eredményeképpen csökken az adminisztrációs teher, javul az együttműködés, és nő a csapatok produktivitása. A felhasználók számára a rendszer egyszerűen kezelhető, reszponzív felületet biztosít, ahol gyorsan hozzáférhetnek a feladataikhoz, áttekinthetik a projekt aktuális állapotát, és azonnali visszajelzést kapnak a munkájukról. A cél, hogy a feladatkezelés ne legyen többé időrabló adminisztráció, hanem hatékony, átlátható és motiváló folyamat.

## Követelménylista

| Modul                |  ID  | Név                       |  v. | Kifejtés |
|----------------------|------|---------------------------|-----|----------|
| Jogosultság          |  K1  | Bejelentkezési felület    | 1.0 | A felhasználó az e-mail címe és jelszava megadásával bejelentkezhet. A rendszer ellenőrzi az adatokat. Hibás adat esetén hibaüzenetet kap.|
| Jogosultság          |  K2  | Regisztráció              | 1.0 | A felhasználó e-mail, felhasználónév és jelszó megadásával új fiókot hozhat létre. A rendszer ellenőrzi az e-mail egyediségét, és sikeres regisztráció után a felhasználó bejelentkezhet.|
| Feladatkezelés       |  K3  | Feladat létrehozása       | 1.0 | A felhasználó új feladatot hozhat létre egy projekten belül. A feladat megadható címmel, leírással, határidővel, felelőssel és címkékkel.|
| Feladatkezelés       |  K4  | Feladat módosítása        | 1.0 | A felhasználó szerkesztheti a feladat adatait, módosíthatja az állapotát, valamint drag & drop módszerrel áthelyezheti azt másik oszlopba.|
| Feladatkezelés       |  K5  | Feladat törlése           | 1.0 | A felhasználó törölhet egy meglévő feladatot a projektből. A törlés előtt megerősítés szükséges.|
| Projektkezelés       |  K6  | Projekt létrehozása       | 1.0 | A felhasználó új projektet hozhat létre név és leírás megadásával. A projekthez feladatokat és csapattagokat lehet rendelni.|
| Projektkezelés       |  K7  | Csapattagok kezelése      | 1.0 | Tagok meghívása, eltávolítása, szerepkörök módosítása|
| Kommunikáció         |  K8  | Kommentelés               | 1.0 | A felhasználók kommentet írhatnak a feladatokhoz, hogy megosszák a megjegyzéseiket, visszajelzéseiket. A hozzászólások valós időben frissülnek.|
| Kommunikáció         |  K9  | Értesítések               | 1.0 | A rendszer automatikus értesítést küld, ha új feladatot rendelnek a felhasználóhoz, ha módosítás történt, vagy ha közeleg a határidő.|
| Felhasználói felület |  K10 | Drag & Drop kezelőfelület | 1.0 | A feladatokat a Kanban-táblán belül egérrel mozgathatjuk az oszlopok között (To Do → In Progress → Done). A változások valós időben mentődnek.|
| Felhasználói felület |  K11 | Sötét / Világos mód       | 1.0 | A felhasználó választhat a sötét és világos megjelenés között. A választás elmentésre kerül, és automatikusan érvényes bejelentkezés után.|
| Felhasználói felület |  K12 | Reszponzív design         | 1.0 | Az alkalmazás bármilyen eszközről elérhető, és automatikusan alkalmazkodik a kijelző méretéhez (mobil, tablet, asztali nézet).|
| Extra funkció        |  K13 | AI javaslatok             | 1.0 | A rendszer mesterséges intelligencia segítségével elemzi a feladatokat és javaslatokat tesz a priorizálásra, határidők kezelésére, valamint figyelmeztet a túlterheltségre.|