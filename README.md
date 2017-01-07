# Project Campus
Bei der AR-App (Codename: Project Campus) handelt es sich um eine Augmented Reality 
Version des beliebten Geländespiels Schnitzeljagd. 
Das Umfeld des Spiels ist auf den Campus Minden begrenzt und soll die 
Erstis bei der Entdeckung des FH Gelände spielerisch unterstützen.

Dazu werden auf dem FH Gelände an den diversen Hotspots wie Mensa, Bibliothek, etc. 
geobasierende Augmented Reality Objekte platziert. Diese Objekte sind durch 
lösen von spannend aufgebauten Rätsel auffindbar und verraten einem Details 
über den aktuellen Hotspot. Ist ein Rätsel gelöst, verrät es 
Informationen über den Standort des nächsten AR-Objekts.


## Project Campus starten
Um das Spiel zu starten, muss zunächst Argon 4 App aus dem App Store geladen werden. 

[![Foo](http://linkmaker.itunes.apple.com/assets/shared/badges/de-de/appstore-lrg.svg)](https://itunes.apple.com/de/app/argon4/id1089308600?mt=8)

_Eine Version für Android ist bereits in Arbeit, wird aber vermutlich bis 
Abschluss des KSWE Moduls nicht verfügbar sein._

Nach starten der Argon 4 App muss folgende URL in der Adresszeile beuscht werden.

https://cemizm.github.io/project-campus/


## Eine lokale Kopie ausführen
Um die Project Campus App auf dem lokalen Computer auszuführen, 
muss wie folgt vorgegangen werden.

### Repository clonen
* git clone https://github.com/cemizm/project-campus.git

### Node.js Module installieren
* npm install -g bower
* npm install

### Lokalen Webserserver starten
* npm start

Nun kann in der Argon 4 App der lokale Webserver besucht werden. 
Dazu muss sichergestellt werden das der Lokale Computer und das 
Mobilgerät sich im selben Netzwerk befinden. 


## Lokale Kopie auf Github pages deployen
Die Project Campus App kann ebenfalls auf Github Pages abgelegt werden. 
Dazu wird das gh-pages NPM Paket verwendet, welches bereits 
in den Abhängigkeiten hinterlegt ist.  

### Deploy on Github pages

* npm install
* npm run deploy