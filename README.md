# Sadil Nethwan - Professional Personal Portfolio Website

A modern, futuristic developer & engineering portfolio website designed for **Sadil Nethwan** (BICT Undergraduate at University of Vavuniya & Electrical Engineering HND Student at CINEC Campus).

Built with **HTML5**, **CSS3 (Vanilla)**, **JavaScript (ES6+)**, and **Three.js** for interactive 3D hero background animations.

---

## 📁 Project Folder Structure

```text
portfolio/
│
├── index.html                  # Main semantic HTML5 file with full metadata & sections
│
├── css/
│   └── style.css               # Complete styling, CSS custom properties, grid layouts & responsive queries
│
├── js/
│   └── script.js               # Three.js 3D animation, typing effect, project filtering, modal popups & validation
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg         # Profile photo placeholder / avatar
│   │   ├── oil-monitoring.jpg  # Project 01: Engine Oil Quality Monitoring System image
│   │   ├── smart-car.jpg       # Project 02: Arduino 4WD Smart Car image
│   │   ├── electrocalc.jpg     # Project 03: ElectroCalc Electrical Calculator image
│   │   ├── whatsapp-ai.jpg     # Project 04: AI WhatsApp Customer Support Assistant image
│   │   └── library-system.jpg  # Project 05: Library Book Management System image
│   │
│   └── Sadil-Nethwan-CV.pdf    # Resume PDF file for view & download links
│
└── README.md                   # Documentation guide (this file)
```

---

## 🖼️ How to Place & Update Your Images

1. Open the `assets/images/` folder inside your project directory.
2. To replace the **Profile Photo**, place your headshot photo named `profile.jpg` in `assets/images/` (recommended aspect ratio `1:1` square, ~500x500px).
3. To replace **Project Showcase Images**, replace the corresponding files in `assets/images/`:
   - `oil-monitoring.jpg`
   - `smart-car.jpg`
   - `electrocalc.jpg`
   - `whatsapp-ai.jpg`
   - `library-system.jpg`

---

## 📄 How to Place & Update Your CV / Resume

1. Export your latest CV as a PDF file.
2. Name the file **`Sadil-Nethwan-CV.pdf`**.
3. Place the file inside the `assets/` directory (replacing the placeholder file).
4. Both the **"View CV (New Tab)"** and **"Download CV"** buttons on the website automatically link to `assets/Sadil-Nethwan-CV.pdf`.

---

## 🔗 How to Update Social Links & Contact Info

Open **`index.html`** in VS Code or your preferred text editor and locate/search for the following lines:

### 1. Updating LinkedIn URL
Search for `https://linkedin.com` in `index.html` and update it to your personal LinkedIn profile URL:
```html
<a href="https://www.linkedin.com/in/sadil-nethwan" target="_blank" rel="noopener noreferrer" class="contact-val">
  linkedin.com/in/sadil-nethwan
</a>
```

### 2. Updating GitHub URL
Search for `https://github.com` in `index.html` and replace it with your GitHub account link:
```html
<a href="https://github.com/sadilnethwan" target="_blank" rel="noopener noreferrer" class="contact-val">
  github.com/sadilnethwan
</a>
```

### 3. Updating Email Address
Search for `mailto:sadilnethwan@gmail.com` or `sadilnethwan@gmail.com` in `index.html` and update it with your active email address.

---

## 💻 How to Run the Website Locally in VS Code

### Method 1: Using VS Code Live Server (Recommended)
1. Launch **Visual Studio Code**.
2. Click **File > Open Folder...** and select the `portfolio` folder.
3. Open the Extensions tab (`Ctrl + Shift + X` on Windows) and search for **Live Server** (by Rita Wickramasinghe).
4. Click **Install**.
5. Open `index.html`, right-click anywhere in the editor window, and select **"Open with Live Server"**.
6. Your browser will automatically open `http://127.0.0.1:5500/index.html` with real-time hot reloading.

### Method 2: Direct Browser Opening
Double-click `index.html` directly inside Windows File Explorer to view the website in Chrome, Edge, or Firefox.

---

## 🌐 How to Publish Your Portfolio for Free on GitHub Pages

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and create a new public repository named `portfolio` or `sadilnethwan.github.io`.
2. **Push Your Project Code**:
   Initialize git and push all files to your new repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Sadil Nethwan personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Open your repository on GitHub.
   - Click on **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Choose **Branch: main** and **Folder: / (root)**, then click **Save**.
4. **Access Your Live Website**:
   After 1–2 minutes, your website will be live at:
   `https://YOUR_GITHUB_USERNAME.github.io/portfolio/`

---

## 🛠️ Built With

- **HTML5**: Semantic tags, accessibility (ARIA), and Open Graph meta tags.
- **CSS3**: Custom variables, Flexbox, CSS Grid, 3D perspective transformations, and responsive breakpoints.
- **JavaScript (ES6+)**: Custom DOM manipulation, scroll observers, client validation, modal popups.
- **Three.js**: 3D interactive particle network hero animation via CDN.
- **FontAwesome**: Modern technical icon vectors.

---

&copy; 2026 Sadil Nethwan. All Rights Reserved.
