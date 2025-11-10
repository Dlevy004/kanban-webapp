# Használat

## Node.js

- A működéshez telepíteni kell a Node.js-t, amivel együtt fog érkezni az npm is, erre szükség lesz.

## Backend

- A backend mappában létrehozunk egy .env nevű fájlt, ennek tartalma a következő:
  - MONGO_URI=mongodb+srv://kanban_admin:kanban_buborek_admin@cluster0.5wyq7jz.mongodb.net/?appName=Cluster0
  - JWT_SECRET=ez_egy_nagyon_titkos_es_hosszu_kulcs_amit_senki_nem_talal_ki
    - Ennek a helyére érdemes lehet generáltatni egy valóban titkos kulcsot.
- Node-js-t telepítve a backend mappába navigálunk egy terminállal, az 'npm install' parancsot kiadva letöltődnek a szükséges fájlok.
- Az 'npm start' parancsot kiadva elindul a backend.

## Frontend

- Frontend mappába navigálva szintén 'npm install' először.
- Ezután 'npm run dev' parancsot kiadva indítjuk el a frontend-et.

## Oldal elérése böngészőből

- A frontend elindulása után ki fogja írni az oldal eléréshez szükséges localhost-os linket a terminál.
