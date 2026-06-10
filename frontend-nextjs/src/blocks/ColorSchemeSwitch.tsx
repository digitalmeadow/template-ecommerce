"use client";

export default function ColorSchemeSwitch() {
  return (
    <button
      onClick={() => {
        const html = document.documentElement;
        const currentScheme = html.getAttribute("data-color-scheme");
        const newScheme = currentScheme === "dark" ? "light" : "dark";
        html.setAttribute("data-color-scheme", newScheme);
      }}
    >
      Toggle Light/Dark
    </button>
  );
}
