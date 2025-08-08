//src/app/cthulhu-therapy/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const equationPattern = /[A-Za-z0-9]+\s*=\s*∫[^ \n]+/g;
const mathRegex = /\$\$(.+?)\$\$|\$(.+?)\$/g;
const chapterSeparatorPattern = /^-{1,}\s*$/;

function wrapEquations(raw: string) {
  return raw.replace(equationPattern, (eq) => `$${eq}$`);
}

function renderParagraph(para: string, idx: number) {
  if (chapterSeparatorPattern.test(para.trim())) {
    return (
      <hr
        key={`sep-${idx}`}
        className="my-8 border-t-2 border-gray-400 w-full max-w-prose"
      />
    );
  }

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  const withMath = wrapEquations(para);

  withMath.replace(mathRegex, (match, displayEq, inlineEq, offset) => {
    if (offset > lastIndex) {
      nodes.push(withMath.slice(lastIndex, offset));
    }

    const equation = displayEq || inlineEq || "";
    const isDisplay = Boolean(displayEq);
    const mathNode = isDisplay ? (
      <BlockMath key={offset}>{equation}</BlockMath>
    ) : (
      <InlineMath key={offset}>{equation}</InlineMath>
    );

    if (isDisplay) {
      nodes.push(
        <div
          key={`block-${offset}`}
          className="my-6 text-2xl sm:text-3xl md:text-4xl"
        >
          {mathNode}
        </div>
      );
    } else {
      nodes.push(mathNode);
    }

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < withMath.length) {
    nodes.push(withMath.slice(lastIndex));
  }

  return (
    <p className="mb-6 leading-relaxed" key={idx}>
      {nodes}
    </p>
  );
}

export default function CthulhuTherapy() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(new URL("./about-cthulhu.txt", import.meta.url))
      .then((r) => r.text())
      .then(setText)
      .catch(console.error);
  }, []);

  const rawBlocks = text.split(/\n{2,}/);
  const paragraphs: string[] = [];

  rawBlocks.forEach((block) => {
    const lines = block.split(/\r?\n/);
    let buffer: string[] = [];

    lines.forEach((line) => {
      if (chapterSeparatorPattern.test(line.trim())) {
        if (buffer.length) {
          paragraphs.push(buffer.join("\n"));
          buffer = [];
        }
        paragraphs.push(line);
      } else {
        buffer.push(line);
      }
    });

    if (buffer.length) {
      paragraphs.push(buffer.join("\n"));
    }
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2 leading-tight">
          Cthulhu Therapy
        </h1>
        <p className="text-lg md:text-xl italic font-serif text-gray-700">
          Awaken unsung charms and hidden secrets of well-being.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 space-y-6 prose prose-gray lg:prose-lg">
        {paragraphs.map((para, idx) => renderParagraph(para, idx))}
      </div>
    </div>
  );
}
