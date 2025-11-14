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