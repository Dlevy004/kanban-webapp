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

---