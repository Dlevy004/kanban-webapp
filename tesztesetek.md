# Tesztesetek
## **Levente**
### Backend: Regisztráció

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Sikeres regisztráció érvényes adatokkal|`POST` kérés küldése egyedi `username`, `email` és valid `password` mezőkkel a `/api/auth/register` címen.|Státusz: `201K (Created)`.| Sikeres|
|Hiányzó Email|`POST` kérés küldése `email` mező nélkül.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"All fields are required."`|Sikeres|
|Hiányzó Jelszó|`POST` kérés küldése `password` mező nélkül.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"All fields are required."`|Sikeres|
|Duplikált Email|`POST` kérés küldése egy már regisztrált `email` mezővel.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"This email is already in use."`|Sikeres|
|Duplikált Felhasználónév|`POST` kérés küldése egy már regisztrált `username` mezővel.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"This username is already taken."`|Sikeres|
|Érvénytelen Email Formátum|`POST` kérés küldése érvénytelen `email` formátummal.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"User validation failed: email: Invalid email address"`|Sikeres|
|Túl rövid Felhasználónév|`POST` kérés küldése `username` mezővel, amely kevesebb mint 3 karakter.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"User validation failed: username: The username must be at least 3 characters long., email: Invalid email address"`|Sikeres|

### Backend: Bejelentkezés

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Sikeres bejelentkezés|`POST` kérés küldése érvényes `username` és `password` mezőkkel a `/api/auth/login` címen.|Státusz: `200 OK`.|Sikeres|
|Hiányzó Email|`POST` kérés küldése `email` mező nélkül.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"Email and password are required."`|Sikeres|
|Hiányzó Jelszó|`POST` kérés küldése `password` mező nélkül.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"Email and password are required."`|Sikeres|
|Érvénytelen Email Formátum|`POST` kérés küldése érvénytelen `email` formátummal.|Státusz: `401 (Unauthorized)`. Hibaüzenet: `"Invalid email or password."`|Sikeres|
|Nem létező Email|`POST` kérés küldése nem regisztrált `email` mezővel.|Státusz: `401 (Unauthorized)`. Hibaüzenet: `"Invalid email or password."`|Sikeres|
|Helytelen Jelszó|`POST` kérés küldése helytelen `password` mezővel.|Státusz: `401 (Unauthorized)`. Hibaüzenet: `"Invalid email or password."`|Sikeres|
|Üres Body|`POST` kérés küldése üres body-val.|Státusz: `400 (Bad Request)`. Hibaüzenet: `"Email and password are required."`|Sikeres|

### Frontend: Bejelentkezés

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Email mező kötelező|Üresen hagy|Sikertelen bejelentkezés, hibaüzenettel|Sikeres|
|Hibás email formátum|`test@` beírása|Sikertelen bejelentkezés, hibaüzenettel|Sikeres|
|Helyes email + üres jelszó|`test@domain.com`, jelszó üres|"A jelszót kötelező megadni" hibaüzenet|Sikeres|
|Helyes adatok megadása|`test@domain.com`, jelszó = `test`|Átirányít `index.html`-re|Sikeres|
|Checkbox működés|Rákattintás|Be-/kikapcsol|Sikeres|
|Tab sorrend|Tab-bal mozogj a mezőkön|Fókusz sorrend: email &rarr; jelszó &rarr; checkbox &rarr; link &rarr; gomb &rarr; link|Sikeres|
|Átlépés signup oldalra|Klikk a "Nincs fiókod? Regisztráció" linkre|Átvált a signup form-ra|Sikeres|

### Frontend: Regisztráció

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Username üres|A felhasználónév mező üresen hagyása|Sikertelen regisztráció, hibaüzenettel|Sikeres|
|Érvényes email ellenőrzése|`test@domain.com` beírása|Mező zöld lesz, nincs hibaüzenet|Sikeres|
|Rossz email formátum|`test@` beírása|Mező piros, hibaüzenet|Sikeres|
|Hibás jelszó|`abc` beírása|Sikertelen regisztráció, hibaüzenettel|Sikeres|
|Nem egyező jelszó ismétlés|`abcdef`, majd `abcdeg` jelszavak beírása|Hibaüzenet: "A két jelszó nem egyezik"|Sikeres|
|Sikeres regisztráció|Helyes username, email, jelszó, jelszó megerősítés megadása|Alert és átirányítás történik a bejelentkezésre|Sikeres|

### Frontend: Bejelentkezés, regisztráció - design és reszponzív megjelenés

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Mobil nézet (320px-425px)|Kis képernyőn való megnyitás|Container teljes szélesség, border-radius nincs|Sikeres|
|Tablet nézet (768px)|Közepes képernyőn való ellenőrzés|Container középen, kerekített szélekkel|Sikeres|
|Desktop nézet (>1024px)|Széles képernyőn való megtekintés|Layout középen, margók rendben|Sikeres|
|Gomb hover effekt|Login/Signup gomb fölé a kurzor|Színe megváltozik hover esetén|Sikeres|

### Backend: Board CRUD műveletek tesztelése Thunder Client segítségével

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Auth Middleware (Token nélkül)|`GET` `/api/boards` kérés küldése `Authorization` fejléc nélkül.|Státusz: `401 Unauthorized`. | Sikeres|
|Auth Middleware (Rossz Token)|`GET` `/api/boards` kérés küldése (lejárt/hamis) tokennel.|Státusz: `401 Unauthorized`. | Sikeres|
|Board létrehozása|`POST` `/api/boards` kérés küldése érvényes `Bearer` tokennel és board adatokkal.|Státusz: `201 Created`. | Sikeres|
|Táblák Listázása (Sikeres)|`GET` `/api/boards` kérés küldése érvényes `Bearer` token|Státusz: `200 OK`.|Sikeres|
|Tábla Betöltése|`GET` `/api/boards/:id` hívása egy létező tábla ID-jával (Tokennel).|Státusz: `200 OK`. A válasz JSON-jában a columns és tasks tömbök fel vannak töltve adatokkal (nem csak ID-kkal).| Sikeres|
|Tábla Törlése|`DELETE` `/api/boards/:id` hívása egy létező tábla ID-jával (Tokennel).|Státusz: `200 OK`. Válasz üzenet: `"Board deleted successfully."`| Sikeres|

### Frontend: Board oldal mock adatokkal
|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Board Oldal (Mock Adatok)|Bejelentkezés (az `AuthPage.jsx`-ben lévő átirányítás a `/board/fake-id`-ra).|A `BoardPage` betöltődik, látszik a "Board neve", az oszlop ("Column neve") és a feladatkártyák ("Első feladat").| Sikeres|
|Board oldal frissítése|A board oldal navbarján a logora kattintás.|Az oldal frissül, a board adatai újra betöltődnek.| Sikeres|

---

## **Sándor**
### Backend: Tábla műveletek (Board CRUD)

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Tábla létrehozása (Backend)|`POST` kérés küldése `/api/boards` címre `{ "title": "Teszt Tábla" }` body-val és érvényes tokennel.|Státusz: `201 Created`. A válasz tartalmazza az új tábla `_id`-ját, `title`-jét és a `columns` tömböt.|Sikeres|
|Tábla létrehozása név nélkül|`POST` kérés küldése `/api/boards` címre üres body-val.|Státusz: `400 Bad Request` vagy `500` (validációtól függően). Hibaüzenet: Title is required.|Sikeres|
|Saját táblák lekérdezése|`GET` kérés küldése `/api/boards` címre érvényes tokennel.|Státusz: `200 OK`. A válaszban egy tömb érkezik, ami csak az adott felhasználóhoz tartozó táblákat tartalmazza.|Sikeres|
|Tábla átnevezése (Backend)|`PUT` kérés küldése `/api/boards/:id` címre `{ "title": "Módosított Név" }` body-val.|Státusz: `200 OK`. A válaszban a frissített tábla objektum érkezik az új névvel.|Sikeres|
|Tábla törlése (Backend)|`DELETE` kérés küldése `/api/boards/:id` címre.|Státusz: `200 OK`. Az adatbázisból törlődik a tábla és a hozzá tartozó referenciák.|Sikeres|

### Frontend: Dashboard és Tábla kezelés

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Dashboard betöltése|Bejelentkezés után a Dashboard oldal megnyitása.|A backendről lekért táblák kártyaként megjelennek. Ha nincs tábla, csak az "Új tábla" gomb látszik.|Sikeres|
|Új tábla létrehozása (UI)|"Új tábla" gombra kattintás -> Név megadása (pl. "Projekt A") -> OK.|Az oldal átirányít az új tábla oldalára (`/board/:id`), vagy megjelenik az új kártya a listában.|Sikeres|
|Létrehozás megszakítása| "Új tábla" gomb -> Mégse (Cancel) a felugró ablakban.|Nem történik API hívás, nem jön létre új kártya.|Sikeres|
|Navigáció a táblára|Kattintás egy meglévő tábla kártyájára (nem a gombokra).|Az alkalmazás átirányít a `/board/:id` URL-re, ahol az ID megegyezik a kártya ID-jával.|Sikeres|
|Tábla törlése (Sikeres)|Kattintás a kuka ikonra/Törlés gombra -> "OK" a megerősítő ablakban.|A tábla kártyája azonnal eltűnik a listából az oldal újratöltése nélkül.|Sikeres|
|Tábla törlés elvetése|Kattintás a kuka ikonra -> "Mégse" a megerősítő ablakban.|A párbeszédablak bezárul, a tábla megmarad a listában.|Sikeres|
|Tábla átnevezése (Sikeres)|Kattintás az "Átnevezés" gombra -> Új név megadása -> OK.|A kártyán a cím azonnal frissül az új névre az oldal újratöltése nélkül.|Sikeres|
|Átnevezés megszakítása|Kattintás az "Átnevezés" gombra -> Mégse, vagy üres név megadása.|A cím nem változik, nem történik API hívás.|Sikeres|

## **András**
### Frontend: Dashboard, Profile - design és reszponzív megjelenés

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Mobil nézet (320px-425px)|Kis képernyőn való megnyitás|Container teljes szélesség, border-radius nincs|Sikeres|
|Tablet nézet (768px)|Közepes képernyőn való ellenőrzés|Container középen, kerekített szélekkel|Sikeres|
|Desktop nézet (>1024px)|Széles képernyőn való megtekintés|Layout középen, margók rendben|Sikeres|
|Gomb hover effekt|Gombok fölé a kurzor|Színe megváltozik hover esetén|Sikeres|

### Frontend: Profile

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Kép feltöltése kép nélkül|Nem választunk ki új profilképet|Hibaüzenet: "Először válassz egy képet!"|Sikeres|
|Nem egyező jelszó|`abcdef`, majd `abcdeg` jelszavak beírása|Hibaüzenet: "Az új jelszavak nem egyeznek!"|Sikeres|
|Nem megfelelő jelszó|`abcdef`, majd `abcdef` jelszavak beírása|Hibaüzenet: "Az új jelszó nem felel meg a követelményeknek! (Minimum 8 karakter, kis- és nagybetű, szám, speciális karakter)"|Sikeres|

### Frontend: Dashboard

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Profil gomb|Bejelentkezett állapotban a "Profil" gombra kattintás.|Átnavigál a profile oldalra.|Sikeres|
|Kijelentkezés gomb|Bejelentkezett állapotban a "Kijelntkezés" gombra kattintás.|Átirányít a bejelentkezési oldalra.|Sikeres|
|Tábla megnyitása|Kattintás egy meglévő projekt tábla kártyájára.|Átirányít a kattintott tábla oldalára|Sikeres|




## **Attila**
### Frontend: Téma kezelés (ThemeProvider, ThemeToggle)

|Leírás|Lépések|Várt eredmény|Állapot|
|------|-------|-------------|--------|
|Alapértelmezett világos téma|localStorage törlése → rendszer: light → app indítása|Téma: `light`, root `data-theme="light"`|Sikeres|
|Alapértelmezett sötét téma|localStorage törlése → rendszer: dark → app indítása|Téma: `dark`, root `data-theme="dark"`|Sikeres|
|Mentett téma betöltése|`localStorage.app-theme = "dark"` → app indítása|Téma `dark`, rendszerbeállítástól függetlenül|Sikeres|
|Root data-theme frissül|Indítás light módban → toggleTheme()|Root `data-theme` `dark`-ra vált|Sikeres|
|Téma mentése localStorage-be|Indítás → toggleTheme()|`app-theme` értéke módosul (`light` ↔ `dark`)|Sikeres|
|Rendszer-téma változás átvétele|Nincs localStorage → indul light → rendszer dark event|Téma automatikusan `dark` lesz|Sikeres|
|Rendszer-téma ignorálása mentett témával|`localStorage=light` → rendszer dark event|Téma marad `light`|Sikeres|
|useTheme provider nélkül|Komponens useTheme() hívással provider nélkül|Hiba: „useTheme must be used within ThemeProvider”|Sikeres|
|Light mód UI|`theme="light"` → komponens render|Ikon: ☀️, felirat: Light, aria-label: „Váltás sötét módra”|Sikeres|
|Dark mód UI|`theme="dark"` → komponens render|Ikon: 🌙, felirat: Dark, aria-label: „Váltás világos módra”|Sikeres|
|Toggle működik|Render → gombra kattintás|`toggleTheme()` egyszer lefut|Sikeres|
|Gomb nem submitol formot|Formban render → kattintás|Nem fut form submit, csak a téma vált|Sikeres|
|ARIA label jelenléte|Komponens render → gomb ellenőrzése|Megfelelő `aria-label` beállítva|Sikeres|
