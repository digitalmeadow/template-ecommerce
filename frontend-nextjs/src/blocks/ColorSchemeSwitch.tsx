"use client";

export default function ColorSchemeSwitch() {
  return (
    <button
      onClick={() => {
        const html = document.documentElement;
        const currentScheme = html.getAttribute("data-color-scheme");
        const nextScheme = currentScheme === "dark" ? "light" : "dark";
        html.setAttribute("data-color-scheme", nextScheme);
      }}
    >
      Toggle Light/Dark
    </button>
  );
}
