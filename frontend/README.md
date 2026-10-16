# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.39.

## Development server

To start a local development server, run:

# Auslastungsmonitor

Angular-Frontend fuer die Auslastungsuebersicht Montage, Bandabschnitt 7.

## Starten

Im Repository-Root:

```bash
npm install --prefix frontend
npm start --prefix frontend
```

Die Anwendung ist anschliessend unter `http://localhost:4200/` erreichbar.

## Browserchecks mit Playwright MCP

Die Workspace-Konfiguration in `.vscode/mcp.json` startet den Playwright-MCP-Server. Bestaetige den Server in VS Code, falls du zur Freigabe aufgefordert wirst. Starte danach die Anwendung wie oben beschrieben und bitte Copilot, mit Playwright `http://localhost:4200/` zu oeffnen, einen Browser-Workflow auszufuehren und das sichtbare Ergebnis zu pruefen.

Diese MCP-Checks steuern den Browser interaktiv. Sie erzeugen keine dauerhaften Testdateien und werden nicht mit `npm test` ausgefuehrt.

## Daten und Aktualisierung

Die Demo liest `Anforderungen/Master Data/Monitorwerte.json` direkt als statisches Asset. Die Ansicht laedt die Datei beim Start und danach alle drei Minuten erneut. Der Refresh-Button startet einen manuellen Abruf. Ein Backend/API ist im Repository noch nicht vorhanden; fuer den Integrationsbetrieb kann die HTTP-Quelle im Angular-Frontend durch den vereinbarten API-Endpunkt ersetzt werden.

Die Quelldaten enthalten bereits Auslastungs-Prozentwerte. Prozesszeit-, Pausen- und Verfuegbarkeitsberechnung ist daher nicht Teil des Frontends. Werte ueber 100 % werden rot markiert. Stundenfenster erhalten bei 1-2 ueberlasteten Arbeitsplaetzen einen gelben und ab 3 einen roten Rahmen.

## Build

```bash
npm run build --prefix frontend
```

## MVP-Grenzen

Es gibt nur Daten fuer Team 7A. Stammdatenpflege, Historisierung und Rollenautorisierung benoetigen ein Backend und das zentrale Berechtigungssystem; diese Funktionen sind im aktuellen Frontend-Prototyp nicht implementiert.
## Running unit tests
