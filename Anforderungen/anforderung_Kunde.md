# Kundenanforderung KA-4102 – Auslastungsüberwachung Montage

**Werk:** Werk Nord (fiktiv) · **Bereich:** Montage, Bandabschnitt 7 · **Status:** Entwurf

## 1. Ausgangslage
Die bestehende Auslastungsanzeige berechnet Stundenfenster in bestimmten Schichtkonstellationen falsch und stellt einzelne Arbeitsplätze fehlerhaft dar. Die Oberfläche gilt als veraltet.

## 2. Ziel
Transparente Live-Sicht auf die Auslastung je Arbeitsplatz (AP) und Stundenfenster, damit Überlastungen früh erkannt werden. Grundlage: geplante Prozesszeiten kombiniert mit Aufträgen, Sequenz, Bandgeschwindigkeit und Pausen.

## 3. Anforderungen

**A-01 Live-Ansicht.** Für eine ausgewählte Gruppe (Team-ID) zeigt die Website die Auslastung pro AP und Stundenfenster der laufenden Schicht inkl. Vorschau.

**A-02 Aktualisierung.** Die Anzeige aktualisiert sich alle 3 Minuten automatisch.

**A-03 Farblogik Werte.** Werte über 100 % werden rot, alle anderen grün dargestellt.

**A-04 Farblogik Stundenfenster.** Stundenfenster mit Überlastungen erhalten eine gelbe oder rote Umrandung, abhängig von Anzahl und Ausprägung der Überlastungen.

**A-05 Stammdaten.** Gruppenleiter pflegen Montagelinien, Arbeitsplätze, Schichtkalender, Pausenregelungen und Stundenfenster-Vorlagen manuell. Änderungen wirken ab dem Folgetag.

**A-06 Historisierung.** Jede Stammdatenänderung wird historisiert.

**A-07 Zugriff.** Rollenbasierte Autorisierung über das zentrale Berechtigungssystem.

**A-08 Betrieb an der Linie.** Die Website läuft an Linienmonitoren dauerhaft, ohne Anmeldung, im Intranet.

**A-09 Bereitstellung.** Nutzung über Browser/URL, keine Client-Installation.

## 4. Abgrenzung
Kein produktiver Rollout, kein Eingriff in die Produktionssteuerung, keine Personaleinsatzplanung.

## 5. Termine
MVP lauffähig und demonstrierbar bis 31.12. auf der Integrationsumgebung.
