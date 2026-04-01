# Extracted Gradient — Background Analysis

## 🎨 Colour Palette

| Stop | Hex Code | Description |
|------|----------|-------------|
| Start (top-center) | `#D8ECFF` | Icy white-blue |
| Mid | `#A8CBF0` | Soft sky blue |
| End (edges/bottom) | `#6FA8D8` | Medium cool blue |

---

## 🖌️ CSS Gradient Styles

### 1. Primary — Radial (closest match to the screenshot)
The background uses a **radial gradient** emanating from the top-center, creating a glowing soft blue effect.

```css
background: radial-gradient(
  ellipse 120% 80% at 50% 0%,
  #D8ECFF 0%,
  #A8CBF0 50%,
  #6FA8D8 100%
);
```

---

### 2. Linear Fallback (top → bottom)
Use this if you want a simpler top-to-bottom version:

```css
background: linear-gradient(
  180deg,
  #D8ECFF 0%,
  #A8CBF0 55%,
  #6FA8D8 100%
);
```

---

### 3. Card-Specific Version (subtle, light)
Toned down for use on cards so it doesn't overpower content:

```css
/* Card background */
background: radial-gradient(
  ellipse 150% 100% at 50% 0%,
  #EBF5FF 0%,
  #C5DFFA 60%,
  #9DC4EE 100%
);
border-radius: 16px;
box-shadow: 0 4px 24px rgba(100, 160, 220, 0.18);
```

---

### 4. Full Card Component (ready to paste)

```css
.card {
  background: radial-gradient(
    ellipse 150% 100% at 50% 0%,
    #EBF5FF 0%,
    #C5DFFA 60%,
    #9DC4EE 100%
  );
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 4px 24px rgba(100, 160, 220, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

---

## 💡 Tips

- The screenshot gradient has a **frosted glass / airy** quality — pair with `backdrop-filter: blur()` for maximum fidelity.
- Add `border: 1px solid rgba(255,255,255,0.6)` to simulate the soft light-edge highlight.
- For dark mode, shift the hex values to darker equivalents: `#1A3A5C → #0D2240`.
