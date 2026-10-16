# RVG-Bench

Project website for **RVG-Bench: A Benchmark for Reasoning-Driven Audio-Visual Temporal Grounding**.

Project page: https://fyrisk.github.io/RVG-Bench/

Paper, code, and dataset: **Coming soon**.

The page includes the full main results table from the arXiv manuscript: 22 models and a human reference, with visual/audio-visual input settings and per-type, single-step, multi-step, and overall scores. Metric definitions and the human-reference protocol accompany the table; narrow screens support horizontal scrolling.

This repository contains the static project website. Open `index.html` locally or serve this directory with `python -m http.server 8000`.

GitHub Pages publishing source: `main` branch, repository root (`/`).

Four interactive examples cover causal, character-centric, ordinal, and multi-step reasoning. Each includes a full video with audio, the final reference answer, and a button to play the annotated interval. Media provenance is recorded in `assets/cases/sources.json`.
