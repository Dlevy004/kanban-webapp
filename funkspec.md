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