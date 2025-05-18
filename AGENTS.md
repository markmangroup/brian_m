# Codex Agent Guide

This repository hosts a collection of small React experiments. Use these instructions when delegating tasks to Codex or other automation tools.

## Environment Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Copy `.env.example` to `.env` and provide Firebase credentials if needed.
3. Start the dev server with `npm start` or run tests using `npm test`.
4. Build the production bundle via `npm run build`.

## Testing Instructions
- Always run `npm test` before proposing changes.
- Add or update tests inside `src/__tests__` when modifying components.

## Repository Structure
- UI components live in `src/components`.
- Tests reside in `src/__tests__`.
- Styles are managed with Tailwind CSS via `index.css`.

## Pull Request Guidelines
- Prefix PR titles with `[brian_m]` followed by a concise description.
- Ensure the test suite passes before submitting a PR.

