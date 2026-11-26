# Generează index.html din src/pagina.html + src/locatii.json (+ src/firebase.json, configurația proiectului Firebase, dacă există).
import pathlib, json
r = pathlib.Path(__file__).parent
s = (r / "src/pagina.html").read_text(encoding="utf-8")
j = (r / "src/locatii.json").read_text(encoding="utf-8").replace("<", "\\u003c")
fb = r / "src/firebase.json"
cfg = json.dumps(json.loads(fb.read_text(encoding="utf-8")), separators=(",", ":")).replace("<", "\\u003c") if fb.exists() else "null"
import base64
logo = "data:image/png;base64," + base64.b64encode((r / "src/logo.png").read_bytes()).decode()
vf = r / "src/vies.json"
vies = json.dumps(json.loads(vf.read_text(encoding="utf-8"))["proxy"]) if vf.exists() else "null"
(r / "index.html").write_text(s.replace("__LOCATII__", j).replace("__FIREBASE__", cfg).replace("__VIES__", vies).replace("__LOGO__", logo), encoding="utf-8")
print("index.html generat", "(cu Firebase)" if fb.exists() else "(fără Firebase)")
