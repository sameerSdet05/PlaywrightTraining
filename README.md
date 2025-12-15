# PlaywrightTraining 🚀

**Playwright Automation Framework – Page Object Model (POM)**

This repository contains a **Playwright-based test automation framework** designed using the **Page Object Model (POM)** architecture.
It supports **UI testing and API testing**, uses **data-driven testing**, reusable utilities, and Playwright fixtures for scalable automation.

The framework is built mainly around the **SauceDemo** application for UI automation and sample endpoints for API testing.

---

## 📌 Key Objectives

* Implement **Page Object Model (POM)** best practices
* Separate **tests, pages, fixtures, utilities, and data**
* Support **UI + API automation** in a single framework
* Enable **reusability, maintainability, and scalability**
* Practice **real-world Playwright automation patterns**

---

## 🧱 Framework Architecture (Based on Your Structure)

```
PLAYWRIGHTTRAINING/
│
├── data/
│   ├── users.csv              # User test data (CSV)
│   ├── users.json             # User test data (JSON)
│   └── users2.csv             # Additional data set
│
├── node_modules/
│
├── reports/                   # Playwright HTML reports
│
├── src/
│   ├── fixtures/
│   │   ├── authFixtures.js    # Authentication & custom fixtures
│   │   └── authFixtureWithFs.js
│   │
│   ├── pages/                 # Page Object classes (POM)
│   │   ├── SauceLoginPage.js
│   │   ├── SauceInventoryPage.js
│   │   ├── SauceCartPage.js
│   │   └── SauceCheckoutPage.js
│   │
│   ├── tests/
│   │   ├── api/               # API automation tests
│   │   └── ui/                # UI automation tests (POM-based)
│   │
│   └── utils/
│       └── productHelpers.js  # Reusable helper functions
│
├── test-results/              # Raw execution results
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

---

## 🧩 Design Pattern – Page Object Model (POM)

This framework strictly follows **POM principles**:

* Each application page has its **own class**
* Locators are defined **once** inside page classes
* Page actions are exposed via **methods**
* Test files contain **only test logic and assertions**

### ✅ Benefits

* Easy maintenance when UI changes
* Reusable page actions
* Cleaner and readable tests
* Suitable for large automation suites

---

## 🧪 Test Types Supported

### 🔹 UI Automation

* Login
* Product selection
* Cart validation
* Checkout flow
* Assertions on UI elements

### 🔹 API Automation

* REST API validation
* Status code checks
* Response body validation
* Schema & field verification

---

## 🗂 Important Folders Explained

### `src/pages`

Contains all **Page Object classes**:

* Login Page
* Inventory Page
* Cart Page
* Checkout Page

Each page handles:

* Locators
* Actions
* Page-level validations

---

### `src/tests/ui`

Contains **UI test cases** written using POM:

* Uses page classes
* No direct locators inside tests
* Focused on user scenarios

---

### `src/tests/api`

Contains **API test cases**:

* Uses Playwright’s `request` context
* Validates response status & payload

---

### `src/fixtures`

Contains **custom Playwright fixtures**:

* Authentication handling
* Reusable setup logic
* File-system–based storage state

---

### `src/utils`

Reusable utility functions:

* Product helpers
* Common validations
* Custom reusable logic

---

### `data`

External **test data**:

* CSV and JSON based data-driven testing
* Multiple user combinations

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sameerSdet05/PlaywrightTraining.git
cd PlaywrightTraining
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

| Command                         | Description              |
| ------------------------------- | ------------------------ |
| `npm test`                      | Run all tests (headless) |
| `npx playwright test --headed`  | Run tests in headed mode |
| `npx playwright test --debug`   | Debug mode               |
| `npx playwright test tests/ui`  | Run UI tests only        |
| `npx playwright test tests/api` | Run API tests only       |
| `npx playwright show-report`    | View HTML report         |

---

## 🧾 Sample POM Test Example

```js
test('Login with valid credentials', async ({page})=>{
    const loginPage = new SauceLoginPage(page);
    await loginPage.goto();
    await loginPage.isLoginFormVisible();
    await loginPage.login('standard_user','secret_sauce');
    await loginPage.isInventoryVisible();
  });

```

---

## 🌐 Application Under Test

**SauceDemo**
[https://www.saucedemo.com](https://www.saucedemo.com)

Used widely for automation practice and demos.

---

## 📚 Skills & Tools Used

* Playwright
* JavaScript
* Page Object Model (POM)
* UI Automation
* API Automation
* Data-Driven Testing
* Fixtures
* Git & GitHub

---

## 🎯 Learning Outcomes

* Build real-world Playwright frameworks
* Write scalable automation code
* Prepare for **SDET / Automation interviews**
* Understand UI + API automation in one framework

---

## 📄 License

This repository is created for **learning and training purposes**.

---
