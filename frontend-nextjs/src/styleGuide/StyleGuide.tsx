"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  entryId,
  SCHEMES,
  TABS,
  WIDTHS,
  type EntrySummary,
  type Scheme,
  type TabId,
  type WidthId,
} from "./entry";
import Preview, { type WidthCommand } from "./Preview";

const WIDTH_IDS = Object.keys(WIDTHS) as WidthId[];

interface Props {
  tab: TabId;
  groups: [string, EntrySummary[]][];
  scheme: Scheme;
  width: WidthId;
}

const groupId = (group: string) => entryId(group, "").replace(/-+$/, "");
const tabHref = (id: string) => (id === "sections" ? "/style-guide" : `/style-guide/${id}`);

// Every section, component, element and global class in resizable frames. The page's own UI
// uses none of the site's CSS, so it looks the same on every project. `?scheme=` and `?width=`
// set the starting controls, so a view can be linked.
export default function StyleGuide({ tab, groups, scheme: initialScheme, width }: Props) {
  const [scheme, setScheme] = useState(initialScheme);
  const [widthCommand, setWidthCommand] = useState<WidthCommand>({ id: width });
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [current, setCurrent] = useState<{ entry: string; group: string } | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const tabTitle = TABS.find((item) => item.id === tab)?.title;

  const updateUrl = (name: "scheme" | "width", value: string) => {
    const url = new URL(location.href);
    url.searchParams.set(name, value);
    history.replaceState(null, "", url);
  };

  // Ctrl+G, as on the site in dev: the column grid shows inside every frame.
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!event.ctrlKey || event.code !== "KeyG") return;
      event.preventDefault();
      setIsGridVisible((isVisible) => !isVisible);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // The preview crossing a line near the top of the viewport is the one being looked at.
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)?.target;
        const group = visible?.closest("section")?.id;
        if (visible && group) setCurrent({ entry: visible.id, group });
      },
      { rootMargin: "-20% 0px -79% 0px" },
    );
    document.querySelectorAll(".style-guide .preview").forEach((preview) => spy.observe(preview));
    return () => spy.disconnect();
  }, []);

  // Keep the current item in view inside the sidebar, without scrolling the page.
  useEffect(() => {
    const sidebar = sidebarRef.current;
    const link = sidebar?.querySelector<HTMLElement>(`[data-nav-entry="${current?.entry}"]`);
    if (!sidebar || !link) return;
    const top = link.offsetTop - sidebar.offsetTop;
    const bottom = top + link.offsetHeight;
    if (top < sidebar.scrollTop) sidebar.scrollTop = top - 32;
    else if (bottom > sidebar.scrollTop + sidebar.clientHeight) {
      sidebar.scrollTop = bottom - sidebar.clientHeight + 32;
    }
  }, [current]);

  return (
    <div className="style-guide">
      <header className="bar">
        <Link className="name" href="/style-guide">
          Style Guide
        </Link>
        <nav className="tabs" aria-label="Style guide">
          {TABS.map((item) => (
            <Link
              key={item.id}
              className="tab"
              href={tabHref(item.id)}
              aria-current={item.id === tab ? "page" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="controls">
          <div className="segments" role="group" aria-label="Color scheme, all frames">
            {SCHEMES.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === scheme}
                onClick={() => {
                  setScheme(id);
                  updateUrl("scheme", id);
                }}
              >
                {id}
              </button>
            ))}
          </div>
          <div className="segments" role="group" aria-label="Width, all frames">
            {WIDTH_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === widthCommand.id}
                onClick={() => {
                  setWidthCommand({ id });
                  updateUrl("width", id);
                }}
              >
                {id}
              </button>
            ))}
          </div>
          <button
            className="grid-toggle"
            type="button"
            aria-pressed={isGridVisible}
            onClick={() => setIsGridVisible((isVisible) => !isVisible)}
          >
            Grid <kbd>Ctrl G</kbd>
          </button>
        </div>
      </header>

      <div className="layout">
        <nav className="sidebar" aria-label={tabTitle} ref={sidebarRef}>
          {groups.map(([group, entries]) => (
            <div key={group} className="nav-group">
              <a
                className="nav-title"
                href={`#${groupId(group)}`}
                aria-current={current?.group === groupId(group) ? "location" : undefined}
              >
                {group}
              </a>
              <ul className="links">
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      data-nav-entry={entry.id}
                      aria-current={current?.entry === entry.id ? "location" : undefined}
                    >
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <main className="content">
          {groups.map(([group, entries]) => (
            <section key={group} className="group" id={groupId(group)}>
              <header className="group-head">
                <h2 className="group-title">{group}</h2>
                <span className="group-count">
                  {entries.length} {entries.length === 1 ? "variant" : "variants"}
                </span>
              </header>
              {entries.map((entry) => (
                <Preview
                  key={entry.id}
                  entry={entry}
                  scheme={scheme}
                  width={widthCommand}
                  isGridVisible={isGridVisible}
                />
              ))}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
