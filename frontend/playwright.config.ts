import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: './e2e/features/**/*.feature',
    steps: './e2e/steps/**/*.ts',
    language: 'de'
});

export default defineConfig({
    testDir,
    fullyParallel: true,
    reporter: 'list',
    use: {
        baseURL: 'http://127.0.0.1:4200',
        trace: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],
    webServer: {
        command: 'npm start',
        url: 'http://127.0.0.1:4200/',
        reuseExistingServer: true,
        timeout: 120_000
    }
});