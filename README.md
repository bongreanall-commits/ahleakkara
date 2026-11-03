# AH LEAK x ការ៉ា (KARA STUDIO WEAR)
### E-Commerce Platform with Real-Time Stock Synchronization & Cambodia Express Checkout
*Authentic GU Japan, UNIQLO Japan, and UNIQLO Vietnam collections*

---

## 🚀 How to Host on GitHub (GitHub Pages)

This project is fully configured for **automatic hosting on GitHub Pages** using GitHub Actions!

### Step 1: Initialize Git and Push to GitHub
If you have Git installed on your computer, run these commands in your project folder:

```bash
# 1. Initialize git (if not yet initialized)
git init

# 2. Add all files to git
git add .

# 3. Commit the files
git commit -m "Initial commit for AH LEAK x KARA"

# 4. Set branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

*(Note: If you do not have Git command line installed, you can also upload your files directly on [github.com](https://github.com) or using GitHub Desktop).*

---

### Step 2: Enable GitHub Pages in Repository Settings
Once pushed to GitHub, activate GitHub Pages in 3 simple clicks:

1. Open your repository on **GitHub.com**.
2. Go to **Settings** (tab at the top) ➔ click on **Pages** (in the left sidebar).
3. Under **Build and deployment** ➔ **Source**, select:
   👉 **`GitHub Actions`** (Not "Deploy from a branch").
4. That's it! The workflow file in `.github/workflows/deploy.yml` will automatically build the React app and deploy it.
5. In 1–2 minutes, your website will be live at:
   🌐 `https://<your-username>.github.io/<your-repo-name>/`

---

## 📁 GitHub Hosting Files Included in this Repository

| File Path | Description |
| :--- | :--- |
| **`.github/workflows/deploy.yml`** | Automated GitHub Actions CI/CD workflow that builds Vite & deploys to GitHub Pages on every push |
| **`.gitignore`** | Excludes `node_modules/`, logs, and temporary cache from being committed to GitHub |
| **`client/vite.config.js`** | Configured with `base: './'` so assets load seamlessly on GitHub Pages subdomains or custom domains |
| **`client/public/404.html`** | Single Page Application (SPA) fallback to ensure smooth page refresh on GitHub Pages |
| **`client/public/data/products.json`** | All 36 authentic products embedded directly so the catalog functions 100% even on static hosting |
| **`render.yaml`** | (Optional) Configuration for 1-click free full-stack hosting on Render.com with live Node.js Express API & stock sync |

---

## 💻 How to Run Locally

### Run Unified Production Mode:
```bash
npm start
```
*Open `http://localhost:5000` in your web browser.*

### Run Development Mode (with Live Reload):
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 🌟 Key Features
1. **Homepage Design**: Exact layout with Typographic SALE poster, SPECIAL DEALS (`23.10 ▶ 29.10`), and Free Delivery progress bar.
2. **First-Time Store Selector Modal**: GU Japan, UNIQLO Japan, and UNIQLO Vietnam with strict single-store catalog filtering.
3. **Cambodia Express Checkout**:
   - 25 Cambodian Provinces selector (Phnom Penh & Provincial delivery via Virak Buntham / J&T)
   - Dynamic **KHQR** payment generator (Bakong, ABA Mobile, ACLEDA)
   - Cash on Delivery (COD) option
   - Instant order tracking code (`KH-EXP-XXXXXX`)
4. **Member Account Profile System**:
   - 1-Click Login with Google or Email/Password
   - Order history with tracking shortcuts
   - Account settings & Cambodia shipping address book
   - Change password and security management
5. **Background Stock Synchronizer**:
   - 60-second automatic stock polling daemon
   - Live inventory status tracking and manual sync trigger
