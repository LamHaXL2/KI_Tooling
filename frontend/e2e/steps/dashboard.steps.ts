import { expect, type Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

type RequestTracker = {
    count: number;
    beforeRefresh: number;
};

const requestTrackers = new WeakMap<Page, RequestTracker>();

function getRequestTracker(page: Page): RequestTracker {
    const tracker = requestTrackers.get(page);
    if (!tracker) {
        throw new Error('Der Datenabruf-Tracker wurde nicht initialisiert.');
    }
    return tracker;
}

Given('ich öffne den Schichtmonitor', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('table')).toBeVisible();
});

Then('sehe ich die Überschrift {string}', async ({ page }, title: string) => {
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
});

Then('wird das Team {string} angezeigt', async ({ page }, team: string) => {
    await expect(page.locator('#team-select option:checked')).toHaveText(team);
});

Then('werden {int} Arbeitsplätze angezeigt', async ({ page }, count: number) => {
    await expect(page.locator('.metric-workstations .metric-value')).toContainText(String(count));
});

Then('wird die aktuelle Überlast mit {int} Arbeitsplätzen angezeigt', async ({ page }, count: number) => {
    await expect(page.locator('.metric-current .metric-value')).toContainText(new RegExp(`${count}\\s*/\\s*\\d+`));
});

When('ich Team {string} auswähle', async ({ page }, team: string) => {
    await page.locator('#team-select').selectOption(team);
    await expect(page.locator('.metric-workstations .metric-note')).toHaveText(`in Team ${team}`);
});

Then('beträgt die durchschnittliche Auslastung {string}', async ({ page }, average: string) => {
    await expect(page.locator('.metric-average .metric-value')).toContainText(average);
});

Then('sehe ich {int} Stundenfenster', async ({ page }, count: number) => {
    await expect(page.locator('tbody tr')).toHaveCount(count);
});

Then('hat das letzte Stundenfenster keine Messwerte', async ({ page }) => {
    await expect(page.locator('tbody tr').last().locator('.empty-cell')).toHaveCount(10);
});

Then('ist das Stundenfenster {string} als {string} markiert', async ({ page }, timeRange: string, severity: string) => {
    const severityClass = severity.toLocaleLowerCase('de-DE') === 'warnung' ? 'warning' : 'critical';
    await expect(page.getByRole('row', { name: new RegExp(timeRange) })).toHaveClass(
        new RegExp(`overload-${severityClass}`)
    );
});

Given('ich öffne den Schichtmonitor und zähle die Datenabrufe', async ({ page }) => {
    const tracker = { count: 0, beforeRefresh: 0 };
    requestTrackers.set(page, tracker);
    await page.route('**/assets/Monitorwerte.json', async (route) => {
        tracker.count += 1;
        await route.continue();
    });
    await page.goto('/');
});

When('ich die Daten manuell aktualisiere', async ({ page }) => {
    const tracker = getRequestTracker(page);
    tracker.beforeRefresh = tracker.count;
    await page.getByRole('button', { name: 'Daten jetzt aktualisieren' }).click();
});

Then('wird ein weiterer Datenabruf gestartet', async ({ page }) => {
    const tracker = getRequestTracker(page);
    await expect.poll(() => tracker.count).toBe(tracker.beforeRefresh + 1);
    await expect(page.getByRole('table')).toBeVisible();
});

Given('der erste Datenabruf fehlschlägt', async ({ page }) => {
    let failFirstRequest = true;
    await page.route('**/assets/Monitorwerte.json', async (route) => {
        if (failFirstRequest) {
            failFirstRequest = false;
            await route.abort();
            return;
        }

        await route.continue();
    });
    await page.goto('/');
});

Then('wird der Ladefehler angezeigt', async ({ page }) => {
    await expect(page.getByRole('alert')).toBeVisible();
});

When('ich den erneuten Versuch starte', async ({ page }) => {
    await page.getByRole('button', { name: 'Erneut versuchen' }).click();
});

Then('werden die Monitordaten angezeigt', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveCount(0);
});