
# React CRT Post Screen

A retro DOS-style CRT loading screen transition created with React and Tailwind CSS, mimicking a vintage computer boot-up sequence. This component provides a nostalgic and engaging loading experience for any web application.
---

## ✨ Features

- **Authentic Boot Sequence:** Simulates a classic BIOS startup with customizable boot messages.
- **Animated Typing Effect:** Each line of the boot sequence is typed out character by character.
- **Dynamic Progress Bar:** A progress bar loads after the initial POST (Power-On Self-Test) messages.
- **Immersive CRT Effects:**
    - **Convex Screen:** A clever combination of gradients and box-shadows creates the illusion of a curved CRT monitor.
    - **Scanlines:** A subtle, moving horizontal line that mimics the refresh pattern of old monitors.
    - **Screen Flicker:** Gentle, intermittent flickering adds to the analog feel.
    - **Blinking Cursor:** A classic block cursor that blinks during typing and while awaiting commands.
- **Power-Off Transition:** A smooth and satisfying animation where the screen collapses into a thin horizontal line and fades out, just like turning off an old CRT.
- **Modern Tech Stack:** Built with React, TypeScript, and styled with Tailwind CSS for a responsive and maintainable codebase.
- **Easy Integration:** Designed to be easily dropped into any React project as a loading gate for your main application content.

---

## 🚀 How It Works

The application is structured into three main components:

1.  **`App.tsx`**: The main container that orchestrates the entire loading process. It uses React state to manage when the loading is "finished" (simulating data fetching or asset loading) and when to trigger the final transition animation.

2.  **`LoadingScreen.tsx`**: This is the heart of the boot sequence. It handles:
    - The typing animation for the `BOOT_MESSAGES` array.
    - The progress bar animation that follows the typing.
    - The final `crt-off` animation when signaled by the parent `App` component.
    - Rendering all the visual CRT effects (scanlines, flicker, convex overlay).

3.  **`MainContent.tsx`**: A placeholder for your actual application. It's hidden initially and fades in smoothly once the `LoadingScreen` has completed its "power-off" animation.

The retro aesthetic is achieved using the `VT323` monospace font and a combination of custom CSS keyframe animations and Tailwind CSS utility classes defined within `index.html`.

---

## 🔧 Getting Started & Customization

This component is designed to be easily customized and integrated into your own projects.

### To Run Locally:

This project is set up to run in a web-based development environment. Simply load the files, and the development server will handle the rest.

### To Customize:

1.  **Change Boot Messages:**
    - Open `components/LoadingScreen.tsx`.
    - Modify the `BOOT_MESSAGES` array with your own custom startup text. Empty strings will be rendered as blank lines.

    ```javascript
    const BOOT_MESSAGES = [
      'Your OS v1.0',
      'Copyright (C) Your Company 2024',
      '',
      'Loading awesome content...',
      // ... more messages
    ];
    ```

2.  **Adjust Timings:**
    - **Overall Load Time:** In `App.tsx`, change the `setTimeout` duration in the `useEffect` hook. This simulates how long your app takes to load its data.
      ```javascript
      // App.tsx
      setTimeout(() => {
        setIsAppReady(true);
      }, 8000); // 8 seconds
      ```
    - **Typing & Animation Speed:** You can tweak the `typingSpeed` constant in `LoadingScreen.tsx` and the duration of the CSS animations in the `<style>` tag of `index.html`.

3.  **Integrate Your App:**
    - Replace the content of `components/MainContent.tsx` with your own application's root component. The fade-in transition will work automatically.
---
