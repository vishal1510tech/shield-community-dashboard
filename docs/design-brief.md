# Design Brief: ShieldCommunity Threat Intelligence Dashboard
**Domain:** `threats.shieldcommunity.io`

---

## 1. Brand Personality (3 Adjectives)
- **Clinical**: Precise, objective, devoid of marketing fluff or decorative theatricality.
- **Utilitarian**: High data density, functional hierarchy, engineered for operator speed and readability.
- **Vigilant**: Alert, structured, dependable like an operational security console or radar telemetry system.

*(Banned buzzwords avoided: "modern", "clean", "sleek")*

---

## 2. Real-World Reference Brands & Specific Inspirations

### Reference 1: PostHog & Cloudflare Dashboard
- **What to borrow**: Dense, structured grid borders (1px hairline rules), terminal-style monospace telemetry logs, sharp square edges, and zero decorative backdrop blur or floating glow effects. Data is king.

### Reference 2: Stripe Press & Monzo Internal Ops
- **What to borrow**: Asymmetric multi-column layouts, strict typographic hierarchy with tight headline leading, high-contrast monospace table indicators, and restrained color allocation where accent colors serve strictly as data indicators.

---

## 3. Visual System Tokens

### Typographic Pairing
- **Primary / Display**: *Space Grotesk* (Sans-serif with grotesque character, tight tracking for headers).
- **Data / Telemetry / Mono**: *IBM Plex Mono* or *JetBrains Mono* (Used for all threat indicators, IP addresses, scores, timestamps, and metadata).

### Color Palette (Restrained, Max 1 Primary Accent)
- **Base Background**: `#090d16` (Deep obsidian slate)
- **Surface Layer**: `#111827` (Panel background)
- **Hairline Borders**: `#1f2937` (1px crisp structural grid borders)
- **Primary Accent**: `#2563eb` (Signal Blue — used strictly for active navigation & primary action focus)
- **Text Primary**: `#f8fafc`
- **Text Secondary / Muted**: `#94a3b8`
- **Text Tertiary**: `#64748b`
- **Status Accents (Data-only)**:
  - High Risk: `#f43f5e` (Rose)
  - Med Risk: `#f59e0b` (Amber)
  - Low Risk / Clean: `#10b981` (Emerald)

### Spacing Scale
- Strict 8px grid rhythm: `8px (0.5rem)`, `16px (1rem)`, `24px (1.5rem)`, `32px (2rem)`, `48px (3rem)`, `64px (4rem)`.

### Border Radius & Shadow Rules
- **Border Radius**: 2px / 4px maximum (`rounded-sm`). Zero pill buttons (`rounded-full`), zero super-rounded cards (`rounded-2xl`).
- **Shadow Rules**: No drop shadows or floating glow orbs (`shadow-2xl` / `shadow-blue-500/50` banned). Elevation is conveyed purely through 1px border lines and subtle surface fill contrast (`bg-slate-900` vs `bg-slate-950`).

---

## 4. Asymmetric Layout Strategy

**Layout Structure:** *Operational Telemetry Split Console* (NOT hero + 3 cards + testimonials + CTA).

- **Global Header**: Fixed top bar with domain context (`threats.shieldcommunity.io`), live engine status indicator, and tab navigation.
- **Left Column (35% width)**: Ingestion & Inspection Panel.
  - Form for submitting indicators.
  - Real-time parameter sanitization breakdown box showing stripped PII tokens.
  - Preset indicator templates for quick testing.
- **Right Main Column (65% width)**: Telemetry Log & Interactive Analytics.
  - Top: Data density toggle & live feed filtering controls.
  - Center: Tabbed view switching between real-time streaming feed table and category density bar chart.
  - Bottom: System status telemetry bar (SQLite state, query execution duration, schema version).
