# Project Blueprint

## Overview
This project, "wc-reputation," is a Next.js application designed as a read-only dashboard. It visualizes public on-chain behavior for WalletConnect-connected wallets, aiming to provide a reputation score based on activity.

## Style, Design, and Features

### Visual Aesthetics
- **Modern Components:** Incorporates modern UI elements.
- **Visually Balanced Layout:** Clean spacing and polished styles.
- **Colors:** Utilizes a wide range of color concentrations and hues for a vibrant look, with specific use of `rgba(61, 152, 243, 0.65)` for a top notice ticker background and `rgba(76, 136, 239, 0.71)` for call-out boxes. `7CFFB2` (light green) is used for heading highlights in boxes.
- **Typography:** Expressive and relevant fonts, with varied sizes for emphasis (hero text, section headlines, etc.).
- **Texture:** Subtle noise texture applied to the main background for a tactile feel.
- **Visual Effects:** Multi-layered drop shadows for depth, with cards having soft, deep shadows.
- **Iconography:** Incorporates icons (e.g., WalletConnect logo, spinning globe) to enhance understanding.
- **Interactivity:** Buttons (`primary-btn`) and other interactive elements have shadow and color "glow" effects.

### Layout & Responsiveness
- Mobile responsive design, adapting to different screen sizes.

### Core Components & Sections
- **Landing Page (`/app/page.tsx`):**
    - **Network Lines Background:** Fixed, semi-transparent `network-lines.svg` with `mixBlendMode: "screen"`.
    - **Base Dark Background:** Fixed linear gradient background (`#05080c` to `#081a1f`).
    - **Spinning Globe Animation:** A large, semi-transparent globe with a `spin` animation, border, radial gradient, and box shadow.
    - **Top Notice Ticker:** A fixed, blue banner with scrolling text ("No airdrops. No rewards. No eligibility. Informational use only.").
    - **Hero Section:** Main title, subtitle, call-to-action button ("Get Your WalletConnect Score"), and feature cards (Multi-Chain, Read-Only, Strict Scoring).
    - **"What is WalletConnect Reputation?" Section:** Explains the system's purpose.
    - **"How WalletConnect Reputation Works" Section:** Detailed explanation with a flow diagram and four descriptive boxes (Wallet Activity, Reputation Scoring, On-chain Signals, Ecosystem Context).
    - **Grid Section (Connect Wallet, Analyze Behavior, Score Calculation, Reputation Output):** Step-by-step process.
    - **"Why WalletConnect Only?" Section:** Justification for the WalletConnect-centric approach.
    - **"What We Measure" Section:** Explains key metrics (Longevity, Consistency, Chain Diversity, Interaction Quality).
    - **"For projects and ecosystems" Section:** Details benefits for broader ecosystems with six descriptive boxes (Wallet Reputation Signals, Identity Context Layer, Analytics Dashboard, Developer Data Access, Ecosystem Insights, Data Integrity Focus) and CTA buttons for Documentation and Contact.
    - **"Transparency & Safety" Section:** Emphasizes read-only nature and data source.
    - **Non-Affiliation Notice:** Disclaimer about project independence.
    - **Final CTA:** Reiteration of the call to action for analyzing reputation.
    - **Footer:** WalletConnect logo and project tagline.
- **Dashboard Page (`/app/dashboard/page.tsx`):** (Implied from routing, not detailed in provided code).
- **API Endpoint (`/app/api/analyze/route.ts`):** (Implied, not detailed).

### Functionality
- **Routing:** Uses Next.js App Router for navigation (`/`, `/dashboard`).
- **Client Components:** Uses `"use client"` where interactivity is required (e.g., `Landing` component).
- **Server Components:** Default for components in `/app`.
- **Animations:** Uses CSS `@keyframes` for `ticker` and `spin` animations.

### Accessibility (A11Y) Standards
- Assumes implementation of features for diverse users, but no specific details provided in the current context.

## Plan for Current Request

The user requested to fix a spinning globe animation in `app/page.tsx`, stating that the `@keyframes spin` rule was missing.

1. **Re-read `app/page.tsx`:** Confirmed the content of the file.
2. **Verify `@keyframes spin`:** The `@keyframes spin` rule is already present in the `<style jsx global>` block at the bottom of `app/page.tsx`.

### Conclusion:
The requested fix is not necessary as the `@keyframes spin` rule is already defined in the file. No changes are required.