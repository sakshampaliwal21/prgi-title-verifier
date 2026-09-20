# PRGI Title Verification System

A terminal-based tool designed to **automatically verify new publication titles** by comparing them with existing titles and checking verification rules.

Built with **Node.js**, JavaScript, and JSON data storage.

# Features

* 📝 **Title Verification**

  * Compare new titles with existing titles.
  * Calculate similarity percentage.
  * Find the closest matching title.

* 🔎 **Search Existing Titles**

  * Search titles using keywords.
  * Case-insensitive search.

* 📋 **Verification Rules**

  * Check disallowed words.
  * Check periodicity words.
  * Check common prefixes and suffixes.

* 📊 **Application History & Statistics**

  * Store previous applications.
  * View approval/rejection statistics.

* 📄 **Report Export**

  * Export verification results to a text report.

# Project Structure

```text
prgi-title-verifier/
│
├── data/
│   ├── titles.json
│   └── applications.json
├── reports/
│   └── verification-report.txt
├── src/
│   ├── app.js
│   ├── database.js
│   ├── rules.js
│   ├── similarity.js
│   └── verifier.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

# How to Run

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

# Menu

```text
1. Verify New Title
2. View Recent Applications
3. Search Existing Titles
4. View Verification Rules
5. View Statistics
6. Export Verification Report
7. Exit
```

# Technology

* JavaScript
* Node.js
* JSON
* Git & GitHub

# Disclaimer

This is a **college project prototype** and is not an official PRGI system.
