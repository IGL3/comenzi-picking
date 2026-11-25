# Comenzi → verificare și picking

Aplicație în browser pentru Quasar Comex: încarci exportul de comenzi (.xlsx) și primești:

- **Lista de verificare**: câte un rând pe produs — Canal, Cod fiscal, Id comandă, Nr. crt, Nume client, Cod produs, Cantitate, Denumire produs, Telefon livrare, Nume companie, Nume delegat. Comenzile se sortează după canal și se numerotează 1, 2, 3… (același număr pentru toate produsele unei comenzi).
- **Picking pe calupuri** de câte 20 de comenzi (se poate schimba): Nr. comandă, SKU, Cantitate, Denumire, Rând, Alveolă.
- **Locații produse**: lista de bază e inclusă în aplicație. Poți adăuga sau modifica locații pentru produse noi și le poți importa sau descărca în Excel.

Exportul de comenzi se citește doar în browser, nu se trimite nicăieri.

Sincronizare între calculatoare: completează `window.FB_CONFIG` din `index.html` cu datele proiectului Firebase. Locațiile se salvează în colecția `locatii_picking`.
