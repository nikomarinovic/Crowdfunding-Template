# BelaBlok Crowdfunding Template

A **modern, responsive, and reusable crowdfunding website UI template** built with HTML, CSS, and JavaScript.  
This template is designed for **school projects, demos, or personal practice**, and allows anyone to easily replace content, rewards, and investment data with their own.

> [!IMPORTANT]
> This is a front-end template only. **No real investments or transactions are processed.** All data, numbers, and terms are fictional.

---

## Live Demo

You can view the template live on Netlify:  

[https://belablok-crowdfunding.netlify.app](https://belablok-crowdfunding.netlify.app)

---

## Project Structure

```
Crowdfunding-Template/
├─ pages/
│  ├─ index.html               # Main landing page
│  ├─ privacy-policy.html      # Privacy policy page
│  ├─ terms-of-service.html    # Terms of service page
│  └─ investment-terms.html    # Investment terms page
├─ css/
│  ├─ styles.css               # Main styles
│  └─ legal.css                # Styles for legal pages
├─ js/
│  └─ script.js                # JavaScript for interactivity
├─ assets/                     # Images, icons, logo
└─ README.md                   # Project documentation
```

---

## Features

- Fully **responsive design** — works on desktop, tablet, and mobile  
- Modern **UI/UX inspired by real crowdfunding platforms**  
- **Customizable investment calculations** (equity %, minimum investment)  
- **Reward tiers** and backer statistics  
- **Roadmap and timeline sections**  
- **Legal pages**: Privacy Policy, Terms of Service, Investment Terms  
- **CSS variables** for easy theming (colors, shadows, gradients)  
- **Reusable template** — anyone can clone and replace their own content  

---

## Design & Styling

- **Google Fonts:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)  
- **Tailwind-inspired CSS variables** for colors, borders, gradients, shadows  
- Smooth animations: `fadeInUp`, `pulse`, `float`  
- Flexible **grid layouts** for rewards, features, and comparison sections  

---

## How to Use

1. **Clone the repository:**

```bash
git clone https://github.com/Nmarino8/Crowdfunding-Template.git
```
2.	Open in VS Code or any code editor
3.	Replace content:
-	`pages/index.html` → Main page, hero section, rewards, roadmap, investment info
-	`pages/privacy-policy.html` → Add your own privacy policy
-	`pages/terms-of-service.html` → Add your own terms
-	`pages/investment-terms.html` → Add your investment data
4.	Customize styling:
-	Modify `css/styles.css` or `css/legal.css`
-	Change colors, fonts, gradients using CSS variables
5.	Preview locally:
Open `index.html` in your browser.
6.	Optional: Deploy with GitHub Pages
-	Go to Settings → Pages → Branch: main → Root folder
-	Your template will be live at `https://<username>.github.io/Crowdfunding-Template/`

---

## Example Customization

Reward Card Example (HTML)

```html
<div class="reward-card featured">
  <div class="reward-header">
    <div class="reward-icon">🏆</div>
    <div class="reward-price">€100</div>
  </div>
  <h3 class="reward-title">Gold Supporter</h3>
  <ul class="reward-benefits">
    <li>Early access to product</li>
    <li>Exclusive updates</li>
    <li>Special thank-you mention</li>
  </ul>
  <button class="btn-reward featured-btn">Select Reward</button>
</div>
```

> [!TIP]
> You can copy the structure for any number of reward tiers.

---

## Technologies

<img src="https://skillicons.dev/icons?i=html,css,js,netlify,github" />

---

## Author
- Bela Blok — Project / Template Name
- Owner / Developer: Niko Marinović
-	GitHub: https://github.com/Nmarino8￼

---

> [!NOTE]
> All numbers, rewards, and terms in this project are examples only
> Designed to help students learn front-end development
> Contributions welcome — feel free to open issues or pull requests

---
