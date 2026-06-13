# 🎂 The Heaven Cake - Premium Boutique Bakery Website

An elegant, fully-responsive, single-page web application built for **The Heaven Cake** boutique bakery in Kumbla, Kasaragod, Kerala. This project showcases premium modern web design principles: Apple-inspired spacing and typography, rich glassmorphic elements, scroll-driven GSAP interactions, and an interactive WhatsApp checkout system.

---

## ✨ Features

*   **Premium Visual Branding**: Designed with a sophisticated light-theme palette featuring warm cream (`#FFFDF9`), soft peach, blush pink accents, and elegant gold highlights (`#C9A227`).
*   **Dynamic Hero Animation**: The header features a circular cake mask wrapped in a rotating dashed gold orbit ring with a planetary bead that floats dynamically and responds to cursor movements.
*   **GSAP Headline Splitting**: The main hero title features a character-by-character animation reveal that triggers staggering fade-ups on page load.
*   **Interactive ScrollStack Deck**: The About section features a custom Vanilla JS scroll stack. Images slide and stack on top of each other with progressive scaling, 3D rotations, and depth blurs as you scroll.
*   **Infinite Logo Marquee**: A decelerating cards slider under "Why Choose Us" that slows down and pauses gracefully when hovered.
*   **Live Search & Indexing Menu**: Real-time client-side search input and filter tags to index the bakery's cake catalog instantly.
*   **WhatsApp Ticket Builder**: Integrates checkout forms that compile order specifics (flavor, weight, eggless preferences, cake text, delivery time) and dynamically redirect clients to WhatsApp with a pre-filled ticket.
*   **100% Offline Compatible**: All high-definition cake photos and vector icons are hosted locally in the project directory for instant load times and zero network hotlinking dependencies.

---

## 🚀 How to Run Locally

Since this is a client-side static web application (HTML5, CSS3, ES6 JavaScript), you do not need any compilation or build steps.

### Option 1: Direct Execution
Simply double-click the `index.html` file in your file explorer to open the site in your default modern web browser.

### Option 2: Local Server (Recommended)
To test all transitions, responsive alignments, and assets under standard server conditions, serve the directory locally:
*   **Python**: `python -m http.server 8000` (Open `http://localhost:8000`)
*   **Node.js**: `npx http-server` or VS Code's **Live Server** extension.

---

## 🌐 Deploy to GitHub & Host on GitHub Pages

Follow these simple steps to push this code to your GitHub account and host it online for free:

### Step 1: Create a GitHub Repository
1. Log in to your [GitHub Account](https://github.com).
2. Go to [github.com/new](https://github.com/new).
3. Name your repository `the-heaven-cake` (e.g., `https://github.com/your-username/the-heaven-cake`).
4. Keep the repository **Public** (required for the free GitHub Pages tier) and leave "Add a README" **unchecked** (we already created one).
5. Click **Create Repository**.

### Step 2: Push the Local Repository
Open your terminal/command prompt, make sure you are in the project folder `C:\Users\ASUS\Desktop\cakekumbla`, and run the following commands (replace `<your-username>` with your actual GitHub username):

```bash
# Rename the default branch to main
git branch -M main

# Link your local folder to your remote GitHub repository
git remote add origin https://github.com/<your-username>/the-heaven-cake.git

# Push the committed code to GitHub
git push -u origin main
```

### Step 3: Enable Free Hosting via GitHub Pages
1. On your GitHub repository page, click on the **Settings** tab (gear icon at the top right).
2. On the left sidebar menu, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**, locate the **Branch** dropdown.
4. Change it from *None* to **`main`**, leave the folder as **`/ (root)`**, and click **Save**.
5. Wait about 1-2 minutes. GitHub will automatically deploy your site and display your live URL at the top of the page (e.g., `https://<your-username>.github.io/the-heaven-cake/`).

---

## 📂 Project Directory Structure

```text
cakekumbla/
├── images/                  # Local high-definition cake images & avatars
├── index.html               # Main semantic HTML5 document
├── style.css                # Premium custom CSS design system
├── script.js                # Interaction engine & animations
├── logo.png                 # Official circular drip-cake brand logo
└── README.md                # Documentation and setup guide
```
