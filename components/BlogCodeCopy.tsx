"use client";

import { useEffect } from "react";

const COPY_TEXT = "Copy";
const COPIED_TEXT = "Copied";
const ERROR_TEXT = "Error";

function getCodeText(pre: HTMLPreElement): string {
  const code = pre.querySelector("code");
  return (code?.textContent ?? pre.textContent ?? "").trimEnd();
}

export default function BlogCodeCopy() {
  useEffect(() => {
    const disposers: Array<() => void> = [];
    const blocks =
      document.querySelectorAll<HTMLPreElement>(".blog-content pre");

    blocks.forEach((pre) => {
      if (pre.querySelector(".code-copy-button")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-button";
      button.textContent = COPY_TEXT;
      button.setAttribute("aria-label", "Copy code to clipboard");

      const onClick = async () => {
        const codeText = getCodeText(pre);
        if (!codeText) return;

        try {
          await navigator.clipboard.writeText(codeText);
          button.textContent = COPIED_TEXT;
          button.classList.add("is-copied");
        } catch {
          button.textContent = ERROR_TEXT;
          button.classList.remove("is-copied");
        }

        window.setTimeout(() => {
          button.textContent = COPY_TEXT;
          button.classList.remove("is-copied");
        }, 1500);
      };

      button.addEventListener("click", onClick);
      pre.appendChild(button);

      disposers.push(() => {
        button.removeEventListener("click", onClick);
        button.remove();
      });
    });

    return () => {
      disposers.forEach((dispose) => dispose());
    };
  }, []);

  return null;
}
