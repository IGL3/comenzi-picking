# Comenzi → verificare și picking (Quasar Comex)

Aplicație într-o singură pagină (UI în română): încarci exportul de comenzi (.xlsx); comenzile se sortează alfabetic după canal
și primesc Nr. crt 1, 2, 3… în această ordine (același număr pentru toate produsele unei comenzi). Lista de verificare are câte un rând pe produs,
în ordinea cerută de utilizator: Canal, Cod fiscal, Id comandă, Nr. crt, Nume client, Cod produs, Cantitate, Denumire produs, Telefon livrare,
Nume companie, Nume delegat; Nr. crt rămâne normal (fără evidențiere, chiar dacă se repetă), iar doar cantitățile 2+ au etichetă turcoaz (fără fundal colorat pe rând, ca să nu se confunde cu verdele de la bife) (și la Picking; la printare sunt încadrate). Picking-ul e pe calupuri de 20 de comenzi, coloane în ordinea: (Cules) Nr. comandă, SKU, Cantitate, Denumire, Rând, Alveolă. Exportul se citește doar în browser.

## Temă
60% #1A1C21 (fundal, meniu) · 30% #ECE6DA (suprafețe: carduri, tabele, câmpuri, cu text închis) · 10% #00D8F2 (doar detalii mici: secțiunea activă,
bare de progres, etichete 2+, R/A, bulina de conectare). Verde/roșu rămân pentru cules/lipsă. Stilul temei e blocul `<style id="tema">` din
`src/pagina.html` (copie în `src/tema.css`), pus după stilul de bază ca să-l suprascrie.

## Lucru în echipă
Unul încarcă exportul → lista devine comună pentru toți. Dacă există deja o listă, încărcarea întreabă:
„Adaugă în continuare” (ex. lista de la prânz: comenzile noi primesc numerele de după ultima, ID-urile deja existente sunt sărite,
sortarea după canal se face doar în lista nouă, iar fiecare listă are calupurile ei) sau „Înlocuiește lista” (de la 1, șterge bifele).
Filtrul „Arată” alege toate listele sau doar una; Excelul și printarea folosesc filtrul.
Printare: la Picking se printează doar calupul deschis (butonul de sus devine „Printează calupul N”, plus buton în subsolul calupului; fără calup deschis: toate). Butonul „Printează” deschide direct fereastra de printare (iframe ascuns, fără descărcare); doar în pagina Claude, unde printarea e blocată, descarcă fișierul .html.
Bife în timp real: „Verificat” pe comandă (lista de verificare) și „Cules” pe linie (picking), cu numele celui care a bifat („Numele tău”, ținut în localStorage).
Picking: calupurile apar închise (acordeon), se deschid pe rând; liniile sunt ordonate după rând și alveolă. Ținut apăsat pe cantitate (550 ms)
deschide un editor −/+ care permite doar scăderea (0 = lipsă); OK cu cantitate mai mică bifează automat linia și o colorează roșu (verde = cules complet). Când toate liniile sunt bifate, „Trimite la facturare” blochează calupul
(„Redeschide calupul” îl deblochează). Secțiunea „Facturare” arată calupurile trimise ca la Picking (închise, se deschid pe rând), un rând pe comandă, coloane: (Facturat) Nr., Id comandă, Nume client, Produse (cantitate culeasă × SKU, cu „din N” la lipsă), Denumire produse; selectare totală: buton „Selectează tot calupul” + bifa „Toate” în calup și butonul „Selectează toate comenzile” sus (toate calupurile trimise); plus Excel.
Secțiunea „Ambalare” arată comenzile bifate „Facturat”; departamentul de ambalare le bifează „Trimis” după ce le ambalează. Rândul de cifre din antet a fost scos (cifrele stau doar în Dashboard). Bara de conexiune (stare, Numele tău, email, Ieși din cont) stă doar în secțiunea „Setări”. „Dashboard” (pe ziua aleasă): Total comenzi, De pickuit, Pickuite (toate liniile bifate),
Facturate, De ambalat (facturate, netrimise), Ambalate și trimise, SKU fără locație (cardul duce la Locații), plus bara de progres (fără tabele pe canale/calupuri, la cererea utilizatorului).
Calendar: listele se salvează pe zile (YYYY-MM-DD). Bara de zi (‹ › Azi, Calendar, Șterge) + zona de încărcare apar doar în Lista de verificare (în Dashboard doar navigarea pe zile; celelalte secțiuni arată data în titlu); ziua aleasă se aplică tuturor secțiunilor;
calendarul marchează zilele cu liste (numărul de comenzi). Ștergere („Șterge liste”): o listă anume din zi (bifele ei se golesc, numerele celorlalte rămân), toată ziua sau toate listele din toate zilele (cu a doua confirmare; locațiile rămân).
Date: colecțiile `zi` (doc `m_<zi>` {day,listId,file,at,by,n,parts,rev,bsize,tranches:[{from,to,at,by,file}]} + bucăți `p_<zi>_<i>` {day,listId,rev,orders}
câte 150 de comenzi, citite cu where('day','=='); doc `index` {days:{<zi>:{n,tr}|null}} pentru calendar; fiecare comandă are `t` = indexul listei;
vechiul doc `meta`/`p0..` e mutat automat pe ziua lui), `bife/<listId>` {v:{nr:{n,t}|null}, p:{"nr_sku":{n,t}|null}, q:{"nr_sku":{q,n,t}|null} (cantitate culeasă mai mică), s:{"from-to":{n,t}|null} (calupuri trimise), f:{nr:{n,t}|null} (facturat), a:{nr:{n,t}|null} (ambalat și trimis)}, `locatii/<sku>` {sku,c,a,t,n},
`zi/faraloc` {items:{<sku>:{p,d}|null}, bf} = SKU-urile fără locație văzute în toate listele (completat la încărcare; `bf` = căutarea o singură dată prin zilele vechi);
secțiunea Locații arată „Fără locație în toate listele” (cu ziua listei), iar meniul arată totalul; cardul din Dashboard rămâne pe ziua aleasă.

## VIES (TVA pentru firme din alte țări)
Țara se deduce din canal: PepitaHU/eMAG HU → HU, eMAG BG/Trendyol BG/Fashion Days BG → BG, Trendyol GR/Skroutz → EL (codul VIES al Greciei);
restul (România) nu se verifică. Codul fiscal se curăță (fără prefix de țară; la HU primele 8 cifre din formatul 12345678-2-25) și se verifică
automat în VIES; rezultatul se salvează în `bife/<listId>.x["<CC><nr>"]` {ok,name,t,n} ca să nu se verifice din nou. Celula Cod fiscal
(Lista de verificare) e verde = plătitor TVA, roșu = neplătitor, gri = se verifică, contur punctat = VIES indisponibil (buton „reîncearcă”).
Browserul întreabă întâi proxy-ul Apps Script din `src/vies.json` {"proxy":"https://script.google.com/macros/s/…/exec"} (cod în
`apps-script/vies-proxy.gs`), apoi VIES direct. În pagina Claude, cererile către alte site-uri sunt blocate, deci verificarea merge doar pe GitHub.

## Fișiere
- `src/pagina.html` — sursa; `src/locatii.json` — lista de bază de locații `[[sku, rand, alveola], ...]` (din locatii_aplicatie_comenzi.xlsx).
- `src/firebase.json` — configurația proiectului Firebase al aplicației (dacă lipsește, pagina de pe GitHub merge doar local).
- `index.html` — generat cu `python3 build.py`; nu-l edita de mână.

## Două publicări, aceeași sursă
- Pagina Claude: https://claude.ai/artifact/6BER2wjVDKSPE3H1NgV4kk (capabilități `db` + `downloads`; colecțiile de mai sus la rădăcina db).
- GitHub Pages: https://igl3.github.io/comenzi-picking/ — fără `window.claude`; logare Firebase Auth cu email și parolă (cont nou cere numele,
  care devine displayName și apare la bife; emailul trebuie confirmat; sesiunea rămâne salvată în browser, iar fereastra de logare apare doar dacă nu ești conectat). Acces doar pentru emailurile din doc `echipa/membri` {emails:[], admini:[]};
  primul cont confirmat poate crea echipa („Sunt administratorul: creează echipa”). Administratorii văd în „Setări” partea „Echipă” (adaugă/scot emailuri,
  rol de administrator, mutarea datelor vechi de pe `teams/<cod>` din localStorage). Datele: `firma/quasar/<zi|bife|locatii>/<doc>`.
  Regulile Firestore sunt în `firebase/firestore.rules` (se copiază în consola Firebase → Firestore → Rules).

## La orice modificare
1. Editează `src/pagina.html` (sau actualizează `src/locatii.json`).
2. `python3 build.py`.
3. Republică pagina Claude cu `index.html`.
4. Commit + push pe `main`.
