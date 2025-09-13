# Theme System Guide

This project now includes a comprehensive theme system that supports light mode, dark mode, and system preference detection.

## Features

- **Three theme modes**: Light, Dark, and System (follows OS preference)
- **Persistent storage**: User's theme choice is saved in localStorage
- **Smooth transitions**: All theme changes are animated
- **CSS Variables**: Consistent theming across all components
- **TypeScript support**: Fully typed theme context

## How to Use

### 1. Theme Toggle Component

The theme toggle is automatically included in the Navbar and provides three options:
- **Light**: Always use light theme
- **Dark**: Always use dark theme  
- **System**: Follow the user's OS preference

### 2. Using Theme in Components

#### CSS Classes

Use these utility classes for consistent theming:

```tsx
// Text colors
<div className="text-primary">Primary text</div>
<div className="text-secondary">Secondary text</div>
<div className="text-muted">Muted text</div>

// Background colors
<div className="bg-primary">Primary background</div>
<div className="bg-secondary">Secondary background</div>
<div className="bg-tertiary">Tertiary background</div>

// Accent colors
<div className="text-accent">Accent text</div>
<div className="bg-accent">Accent background</div>

// Borders
<div className="border-theme">Theme border</div>
<div className="border-theme-light">Light theme border</div>
```

#### CSS Variables

You can also use CSS variables directly in your styles:

```css
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}
```

#### React Context

Access theme state in React components:

```tsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, actualTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Actual theme: {actualTheme}</p>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark
      </button>
    </div>
  );
}
```

### 3. Available CSS Variables

#### Light Theme
- `--color-bg-primary`: #ffffff
- `--color-bg-secondary`: #f8fafc
- `--color-bg-tertiary`: #f1f5f9
- `--color-text-primary`: #1e293b
- `--color-text-secondary`: #64748b
- `--color-text-muted`: #94a3b8
- `--color-border`: #e2e8f0
- `--color-accent`: #3b82f6

#### Dark Theme
- `--color-bg-primary`: #0f172a
- `--color-bg-secondary`: #1e293b
- `--color-bg-tertiary`: #334155
- `--color-text-primary`: #f8fafc
- `--color-text-secondary`: #cbd5e1
- `--color-text-muted`: #94a3b8
- `--color-border`: #334155
- `--color-accent`: #60a5fa

### 4. Updating Existing Components

To update existing components to use the theme system:

1. Replace hardcoded colors with theme classes:
   ```tsx
   // Before
   <div className="bg-gray-800 text-white">
   
   // After
   <div className="bg-secondary text-primary">
   ```

2. Use accent colors for interactive elements:
   ```tsx
   // Before
   <button className="bg-blue-600 hover:bg-blue-700">
   
   // After
   <button className="bg-accent hover:bg-accent-hover">
   ```

3. Use theme-aware borders:
   ```tsx
   // Before
   <div className="border-gray-300">
   
   // After
   <div className="border-theme">
   ```

### 5. Custom Theme Colors

To add custom theme colors, update the CSS variables in `app.css`:

```css
:root {
  --color-custom: #your-light-color;
}

.dark {
  --color-custom: #your-dark-color;
}
```

Then create a utility class:

```css
.text-custom {
  color: var(--color-custom);
}
```

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful fallback to light theme for older browsers
- System preference detection via `prefers-color-scheme`

## Performance

- Theme changes are optimized with CSS transitions
- No unnecessary re-renders
- localStorage is used for persistence
- System preference changes are handled efficiently
