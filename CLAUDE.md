# Comenzi → verificare și picking (Quasar Comex)

Aplicație într-o singură pagină (UI în română): încarci exportul de comenzi (.xlsx); comenzile se sortează alfabetic după canal
și primesc Nr. crt 1, 2, 3… în această ordine (același număr pentru toate produsele unei comenzi). Lista comenzi (fostă „Lista de verificare”, cheie `verif`) are câte un rând pe produs,
în ordinea cerută de utilizator: Canal, Cod fiscal, Id comandă, Nr. crt, Nume client, Cod produs, Cantitate, Denumire produs, Telefon livrare,
Nume companie, Nume delegat; Nr. crt rămâne normal (fără evidențiere, chiar dacă se repetă), iar doar cantitățile 2+ au etichetă turcoaz (fără fundal colorat pe rând, ca să nu se confunde cu verdele de la bife) (și la Picking; la printare sunt încadrate). Picking-ul (în meniu „Picking”, fost „Picking pe calupuri”) e pe calupuri de 20 de comenzi, coloane în ordinea: (Cules) Nr. comandă, SKU, Cantitate, Denumire, Rând, Alveolă. Exportul se citește doar în browser.

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
Bife în timp real: „Cules” pe linie (picking; Lista comenzi nu mai are căsuță de bifat, iar meniul arată doar numărul de comenzi), cu numele celui care a bifat („Numele tău”, ținut în localStorage).
Picking pe telefon (sub 700px): în loc de tabel, fiecare linie e un card (Nr. comandă, locația „R2 A14”, „cantitate × SKU” cu cantitatea îngroșată, apoi denumirea), fără căsuță: apăsarea pe card bifează/debifează, apăsarea lungă oriunde pe card deschide editorul de cantitate. Picking: calupurile apar închise (acordeon), se deschid pe rând; liniile sunt ordonate după rând și alveolă. Ținut apăsat pe cantitate (550 ms)
deschide un editor −/+ care permite doar scăderea (0 = lipsă); OK cu cantitate mai mică bifează automat linia și o colorează roșu (verde = cules complet). Administratorii au în subsolul calupului deschis „Bifează tot calupul” / „Debifează tot calupul”. Când toate liniile sunt bifate, „Trimite la facturare” blochează calupul
(„Redeschide calupul” îl deblochează). Secțiunea „Facturare” arată calupurile trimise ca la Picking (închise, se deschid pe rând), coloane: (Facturat) Nr., Canal, Id comandă, Nume client, SKU, Comandat, Cules (cantitatea culeasă mai mică are o etichetă roșie, la fel ca eticheta turcoaz de la 2+, cu cifra neagră), Denumire produs; bifa „Toate” din antetul tabelului bifează/debifează toate comenzile calupului; plus Excel.
Consecvență: o comandă contează ca facturată/ambalată (în Ambalare și Dashboard) doar dacă e culeasă complet și calupul ei e trimis la facturare; debifarea unei linii la Picking (sau „Debifează tot calupul”) șterge și bifele Facturat/Trimis ale comenzii; „Redeschide calupul” doar le ascunde până la retrimitere. Secțiunea „Ambalare” arată comenzile bifate „Facturat” (un rând pe comandă: (Trimis) Nr., Id comandă, Nume client (cu telefonul de livrare dedesubt), Produse = cantitate culeasă × SKU, Denumire produse); departamentul de ambalare le bifează „Trimis” după ce le ambalează; selectare totală (doar administratori): butonul „Selectează toate comenzile (trimise)” și bifa „Toate” din capul tabelului. Pe telefon (sub 700px): câte un card pe comandă (Nr., Id, client, telefon sub nume, apoi fiecare produs „cantitate × SKU denumire”), fără căsuță; apăsarea pe card o bifează ca ambalată (verde, „Ambalată”). Pe telefon (sub 860px) meniul din stânga e ascuns: bara de sus are butonul ☰, logo-ul și numele secțiunii (turcoaz, 19px, semibold); ☰ îl deschide ca sertar peste pagină (se închide la alegerea unei secțiuni, pe fundal sau cu Esc). Logo-ul Quasar & Co. (mască din `src/logo.png`, injectată de build ca `__LOGO__`) stă sus în meniu și în bara de telefon: bej (#ECE6DA) pe meniul închis, la fel pe tema deschisă și pe cea închisă a browserului (varianta albastră pe disc bej a fost respinsă); e link spre `#dashboard`: click deschide Dashboard și reîncarcă pagina (ca un refresh), click cu rotița/Ctrl deschide aplicația pe Dashboard în tab nou. Rândul de cifre din antet a fost scos (cifrele stau doar în Dashboard). Bara de conexiune (stare, Numele tău, email, Ieși din cont) stă doar în secțiunea „Setări”. „Dashboard” (pe ziua aleasă; titlurile cardurilor 17px, semibold): Total comenzi, De pickuit (duce la Picking), De facturat (fost „Pickuite”: aceeași cifră ca „de facturat” din tabul Facturare = comenzile din calupurile trimise, încă nebifate Facturat; duce la Facturare),
Comenzi cu probleme (comenzi cu cel puțin o linie culeasă cu cantitate mai mică, fără numere pe card; roșu dacă sunt; fiecare apăsare duce la următoarea comandă cu probleme: la Facturare, cu calupul ei deschis și comanda evidențiată turcoaz, sau la Picking dacă calupul nu e trimis; înlocuiește mesajul roșu de sub bara de progres), Facturate, De ambalat (facturate, netrimise; duce la Ambalare), Ambalate și trimise, SKU fără locație (PRIMUL card, total din toate listele, la fel în fiecare zi; triunghi galben cu „!” pe tot cardul, în fundal, estompat, sub text, dacă există produse fără locație de peste 7 zile; cardul duce la Locații), Retururi (al doilea card, cifra galbenă #E5A400, la fel în fiecare zi: câte retururi sunt în așteptare, adică fără STATUSUL COM, din total; duce la Retururi), plus bara de progres (fără tabele pe canale/calupuri, la cererea utilizatorului).
Calendar: listele se salvează pe zile (YYYY-MM-DD). Bara de zi (‹ › Azi, Calendar, Șterge) + zona de încărcare apar doar în Lista de verificare (în Dashboard doar navigarea pe zile; celelalte secțiuni arată data în titlu); ziua aleasă se aplică tuturor secțiunilor;
calendarul marchează zilele cu liste (numărul de comenzi). Ștergere („Șterge liste”): o listă anume din zi (bifele ei se golesc, numerele celorlalte rămân), toată ziua sau toate listele din toate zilele (cu a doua confirmare; locațiile rămân).
Date: colecțiile `zi` (doc `m_<zi>` {day,listId,file,at,by,n,parts,rev,bsize,tranches:[{from,to,at,by,file}]} + bucăți `p_<zi>_<i>` {day,listId,rev,orders}
câte 150 de comenzi, citite cu where('day','=='); doc `index` {days:{<zi>:{n,tr}|null}} pentru calendar; fiecare comandă are `t` = indexul listei;
vechiul doc `meta`/`p0..` e mutat automat pe ziua lui), `bife/<listId>` {v:{nr:{n,t}|null}, p:{"nr_sku":{n,t}|null}, q:{"nr_sku":{q,n,t}|null} (cantitate culeasă mai mică), s:{"from-to":{n,t}|null} (calupuri trimise), f:{nr:{n,t}|null} (facturat), a:{nr:{n,t}|null} (ambalat și trimis)}, `locatii/<sku>` {sku,c,a,t,n},
`zi/faraloc` {items:{<sku>:{p,d}|null}, bf} = SKU-urile fără locație văzute în toate listele (completat la încărcare; `bf` = căutarea o singură dată prin zilele vechi);
secțiunea Locații arată „Fără locație în toate listele” (cu ziua listei), iar meniul arată totalul; cardul din Dashboard rămâne pe ziua aleasă.

## Meniu
Ordinea secțiunilor: Dashboard, Lista comenzi, Picking, Facturare, Ambalare, FBE, Inventar, Retururi, Locații produse, Setări.
FBE (cheie `fbe`) e deocamdată goală. Inventar (cheie `inv`) are două subsecțiuni comutabile (butoane sus, ultima aleasă ținută în localStorage `inv_sub`): „Inventar produse” (deocamdată goală) și „Inventar ambalaje”.

## Inventar ambalaje
Înlocuiește Excelul „Consumabile_2026.xlsx” (35 de produse și 9 inventare, 30.04–11.11.2026, importate o dată din `src/ambalaje.json`,
injectat de build ca `__AMBALAJE__` și scris automat în doc când lipsește). Convenția din Excel: „Intrări” la un inventar = ce a intrat DUPĂ el,
până la următorul; Consum = ultimul inventar în care produsul a fost numărat + intrările de atunci încoace − inventarul de acum
(formulele vechi greșite din Excel nu se mai folosesc). Consumul negativ e roșu (de obicei intrări trecute la alt inventar).
„Stoc acum” = ultimul inventar numărat + intrările de după el. Desktop: tabel cu Denumire fixă la stânga, câte 3 coloane pe inventar
(Inventar, Intrări, Consum), derulat automat la ultimul; telefon: alegi inventarul și completezi pe carduri (denumirea 22px și SKU 18px, îngroșate; câmpurile „Inventar” și „Intrări”). Câmpurile se salvează la fiecare
schimbare (Enter = produsul următor). „Inventar nou” (dată, implicit azi), ✕ pe antet șterge un inventar; „Adaugă produs”, ✎/✕ pe rând
modifică/șterg produsul. „Descarcă Excel”: același format ca vechiul fișier, cu formule corecte pentru consum.
Date: `zi/invamb` {tip:'invamb', p:{<pid>:{d,sku,o}|null}, x:{<AAAALLZZ_xxx>:{d:'YYYY-MM-DD', v:{<pid>:{i,e}}, t, n}|null}}.

## Retururi
Secțiunea „Retururi” (cheie de acces `ret`) e centralizatorul de retururi, cu capul de tabel din centralizator_retururi.xlsx:
PLATFORMA, DATA COM, DATA RETUR, NR DE COMANDA, CLIENT, MOTIVUL, STATUSUL COM, OBSERVATII (+ Modifică/Șterge). Formular de adăugare/modificare
(platforma din listă, date cu calendar, motivul cu sugestii din cele folosite, „S-a întors azi” pune data de azi în STATUSUL COM; gol = „în așteptare”),
căutare, filtru pe platformă și status, „Importă din Excel” (caută foaia cu capul de tabel; rândurile identice se sar doar câte există deja) și
„Descarcă Excel” (aceleași coloane, datele ca date Excel dd.mm.yyyy). Platformele se normalizează (eMAG RO/BG/HU, Trendyol RO/BG/GR, Fashion Days RO/BG,
Altex, Pepita HU, Skroutz); datele scrise greșit se corectează automat (`fixRet`, și pentru STATUSUL COM când e doar o dată: an „202”/„226”/„20026”, „0” în plus, cifre lipite, an greșit în viitor sau cu ani în urmă — după cealaltă dată sau data din STATUSUL COM; la import și o dată la încărcare); ce nu se poate deduce rămâne text roșu punctat. Ordinea: cele introduse ultimele sus. Pe telefon (sub 700px): câte un card pe retur, text mare și centrat (platforma, nr. comenzii mare, client, „Comandă … · Retur …”, motivul, statusul sau „în așteptare”, observații, Modifică/Șterge).
Date: `zi/ret_<an>` {tip:'retururi', items:{<id>:{p,dc,dr,nr,c,m,s,o,k,t,n}|null}} (în colecția `zi`, ca să meargă cu regulile Firestore existente),
citite cu where('tip','=='). Datele clienților nu se pun în repo (e public): centralizatorul se importă din aplicație.

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
  primul cont confirmat poate crea echipa („Sunt administratorul: creează echipa”). Administratorii văd în „Setări” partea „Echipă” (bife de acces pe secțiuni pentru fiecare cont: Lista comenzi, Picking, Facturare, Ambalare, FBE, Inventar, Retururi, Locații; salvate în `echipa/membri.acces[<email cu „.” înlocuit de „,”>]` = listă de chei verif/pick/fact/amb/fbe/inv/ret/loc; fără listă = acces la toate; Dashboard și Setări le văd toți, administratorii văd tot; e o restricție de interfață, nu de bază de date; adaugă/scot emailuri,
  rol de administrator, mutarea datelor vechi de pe `teams/<cod>` din localStorage). Datele: `firma/quasar/<zi|bife|locatii>/<doc>`.
  Regulile Firestore sunt în `firebase/firestore.rules` (se copiază în consola Firebase → Firestore → Rules).

## La orice modificare
1. Editează `src/pagina.html` (sau actualizează `src/locatii.json`).
2. `python3 build.py`.
3. Republică pagina Claude cu `index.html`.
4. Commit + push pe `main`.
