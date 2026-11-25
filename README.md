# Comenzi → verificare și picking

Aplicație în browser pentru Quasar Comex: încarci exportul de comenzi (.xlsx) și primești:

- **Lista de verificare**: câte un rând pe produs — Canal, Cod fiscal, Id comandă, Nr. crt, Nume client, Cod produs, Cantitate, Denumire produs, Telefon livrare, Nume companie, Nume delegat. Comenzile se sortează după canal și se numerotează 1, 2, 3… (același număr pentru toate produsele unei comenzi).
- **Picking pe calupuri** de câte 20 de comenzi (se poate schimba): Nr. comandă, SKU, Cantitate, Denumire, Rând, Alveolă.
- **Locații produse**: lista de bază e inclusă în aplicație. Poți adăuga sau modifica locații pentru produse noi și le poți importa sau descărca în Excel.

Exportul de comenzi se citește doar în browser, nu se trimite nicăieri.

Lucru în echipă: unul încarcă exportul, toți văd aceeași listă și bifează în timp real ce au verificat și cules. Pe GitHub Pages datele comune stau în Firebase (configurația în `src/firebase.json`), sub un cod de echipă care nu e scris în repo.
