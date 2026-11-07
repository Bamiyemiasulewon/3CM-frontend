import type { ReactNode } from "react";

export type IllustrationName =
  | "jollof"
  | "fried-rice"
  | "spaghetti"
  | "cake-piece"
  | "whole-cake"
  | "cupcake"
  | "water"
  | "soft-drink"
  | "plantain"
  | "cutlery"
  | "pot";

const artwork: Record<IllustrationName, ReactNode> = {
  jollof: (
    <>
      <ellipse cx="50" cy="59" rx="37" ry="19" fill="#00604E" />
      <ellipse cx="47" cy="55" rx="37" ry="19" fill="#F5EEDC" stroke="#1A1A17" strokeWidth="3" />
      <ellipse cx="47" cy="53" rx="25" ry="12" fill="#F4421F" stroke="#1A1A17" strokeWidth="2" />
      <path d="M29 53c7-8 12 7 19-1s12 6 19-2" fill="none" stroke="#F8C84F" strokeWidth="4" />
      <circle cx="39" cy="48" r="2" fill="#1A1A17" />
      <circle cx="58" cy="57" r="2" fill="#1A1A17" />
      <path d="M24 64h45" stroke="#1A1A17" strokeWidth="2" />
    </>
  ),
  "fried-rice": (
    <>
      <ellipse cx="52" cy="60" rx="35" ry="17" fill="#F4421F" />
      <ellipse cx="48" cy="55" rx="35" ry="17" fill="#F5EEDC" stroke="#1A1A17" strokeWidth="3" />
      <path d="M24 55c7-12 15 5 23-5 8-9 14 7 25-2" fill="none" stroke="#F8C84F" strokeWidth="8" />
      <path d="m33 47 4 3m17-2 4 3m-19 9 4-2m14 1 4-3" stroke="#00604E" strokeWidth="3" />
      <circle cx="43" cy="52" r="2" fill="#F4421F" />
      <circle cx="62" cy="56" r="2" fill="#F4421F" />
    </>
  ),
  spaghetti: (
    <>
      <ellipse cx="48" cy="60" rx="34" ry="17" fill="#00604E" />
      <ellipse cx="45" cy="55" rx="34" ry="17" fill="#F5EEDC" stroke="#1A1A17" strokeWidth="3" />
      <path d="M23 56c10-15 17 13 27-1s15 11 25-3M28 52c8 11 12-13 22 1s14-10 20 1" fill="none" stroke="#F4421F" strokeWidth="3" />
      <path d="M71 17v31m-7-31v12m7-12v12m7-12v12" stroke="#1A1A17" strokeWidth="3" strokeLinecap="round" />
      <path d="M71 48c-1 13-7 13-10 4" fill="none" stroke="#F8C84F" strokeWidth="3" />
    </>
  ),
  "cake-piece": (
    <>
      <path d="m20 66 8-31 47 17-8 25z" fill="#00604E" />
      <path d="m16 62 8-31 47 17-8 25z" fill="#F8C84F" stroke="#1A1A17" strokeWidth="3" />
      <path d="m24 31 12-10 44 17-9 10z" fill="#F5EEDC" stroke="#1A1A17" strokeWidth="3" />
      <path d="m24 42 45 16m-48-5 45 16" stroke="#F4421F" strokeWidth="4" />
      <circle cx="43" cy="26" r="5" fill="#F4421F" stroke="#1A1A17" strokeWidth="2" />
    </>
  ),
  "whole-cake": (
    <>
      <ellipse cx="49" cy="69" rx="31" ry="10" fill="#00604E" />
      <path d="M20 43h58v24c0 12-58 12-58 0z" fill="#F8C84F" stroke="#1A1A17" strokeWidth="3" />
      <ellipse cx="49" cy="43" rx="29" ry="12" fill="#F5EEDC" stroke="#1A1A17" strokeWidth="3" />
      <path d="M24 46c4 8 9 5 13 0 5 10 10 7 14 0 5 10 10 7 14 0 5 9 9 7 12 0" fill="none" stroke="#F4421F" strokeWidth="4" />
      <circle cx="49" cy="35" r="5" fill="#F4421F" stroke="#1A1A17" strokeWidth="2" />
    </>
  ),
  cupcake: (
    <>
      <path d="m27 48 7 28h31l7-28z" fill="#F8C84F" stroke="#1A1A17" strokeWidth="3" />
      <path d="M26 48c-8-12 5-18 13-14 3-16 25-15 27 0 12-3 17 10 9 14z" fill="#F4421F" stroke="#1A1A17" strokeWidth="3" />
      <path d="m38 52 3 19m9-19v19m10-19-3 19" stroke="#00604E" strokeWidth="3" />
      <circle cx="51" cy="25" r="4" fill="#F8C84F" stroke="#1A1A17" strokeWidth="2" />
    </>
  ),
  water: (
    <>
      <path d="M42 14h18v10l6 7v44c0 5-28 5-28 0V31l4-7z" fill="#F4421F" />
      <path d="M38 10h18v10l6 7v44c0 5-28 5-28 0V27l4-7z" fill="#F5EEDC" stroke="#1A1A17" strokeWidth="3" />
      <path d="M39 47h22v16H39z" fill="#00604E" stroke="#1A1A17" strokeWidth="2" />
      <path d="M45 31v10m9-10v10" stroke="#F8C84F" strokeWidth="3" />
      <path d="M43 54h14m-14 5h14" stroke="#F5EEDC" strokeWidth="2" />
    </>
  ),
  "soft-drink": (
    <>
      <path d="M42 18h16v13l7 8v33c0 6-30 6-30 0V39l7-8z" fill="#F8C84F" />
      <path d="M38 14h16v13l7 8v33c0 6-30 6-30 0V35l7-8z" fill="#F4421F" stroke="#1A1A17" strokeWidth="3" />
      <path d="M34 47h28v15H34z" fill="#F5EEDC" stroke="#1A1A17" strokeWidth="2" />
      <path d="M40 52h15m-15 5h10" stroke="#00604E" strokeWidth="3" />
      <path d="M43 19h8" stroke="#1A1A17" strokeWidth="3" />
    </>
  ),
  plantain: (
    <>
      <path d="M21 61c4-26 35-40 58-26-12 29-34 40-58 26z" fill="#F4421F" />
      <path d="M17 56c4-26 35-40 58-26-12 29-34 40-58 26z" fill="#F8C84F" stroke="#1A1A17" strokeWidth="3" />
      <path d="M21 53c17-17 32-19 48-18M26 59c13-8 26-11 38-14" fill="none" stroke="#00604E" strokeWidth="3" />
      <path d="m17 55-4 4m63-31 4-3" stroke="#1A1A17" strokeWidth="3" />
    </>
  ),
  cutlery: (
    <>
      <path d="M28 16v22m-8-22v14c0 6 3 9 8 9s8-3 8-9V16m-8 23v39" fill="none" stroke="#F4421F" strokeWidth="7" strokeLinecap="round" />
      <path d="M24 13v22m-8-22v14c0 6 3 9 8 9s8-3 8-9V13m-8 23v39" fill="none" stroke="#1A1A17" strokeWidth="3" strokeLinecap="round" />
      <path d="M62 15c-10 7-13 25-2 30v30m0-30c10-7 12-20 8-30" fill="none" stroke="#00604E" strokeWidth="7" />
      <path d="M58 12c-10 7-13 25-2 30v30m0-30c10-7 12-20 8-30" fill="none" stroke="#1A1A17" strokeWidth="3" />
    </>
  ),
  pot: (
    <>
      <path d="M26 36h48v30c0 8-48 8-48 0z" fill="#F4421F" />
      <path d="M22 32h48v30c0 8-48 8-48 0z" fill="#00604E" stroke="#1A1A17" strokeWidth="3" />
      <path d="M18 28h56m-39-8h22" stroke="#1A1A17" strokeWidth="4" strokeLinecap="round" />
      <path d="M29 42h34m-34 8h34" stroke="#F8C84F" strokeWidth="3" />
      <path d="M34 18c-5-7 4-8 0-14m17 14c-5-7 4-8 0-14" fill="none" stroke="#F4421F" strokeWidth="3" />
    </>
  ),
};

const labels: Record<IllustrationName, string> = {
  jollof: "Illustration of a plate of jollof rice",
  "fried-rice": "Illustration of a plate of fried rice",
  spaghetti: "Illustration of spaghetti and a fork",
  "cake-piece": "Illustration of a piece of cake",
  "whole-cake": "Illustration of a whole cake",
  cupcake: "Illustration of a cupcake",
  water: "Illustration of a bottled water",
  "soft-drink": "Illustration of a soft drink bottle",
  plantain: "Illustration of fried plantain",
  cutlery: "Illustration of a spoon and fork",
  pot: "Illustration of a cooking pot",
};

export function Illustration({ kind }: { kind: IllustrationName }) {
  return (
    <svg
      aria-label={labels[kind]}
      className="illustration"
      role="img"
      viewBox="0 0 100 100"
    >
      <defs>
        <pattern id="halftone" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#1A1A17" opacity="0.35" />
        </pattern>
      </defs>
      {artwork[kind]}
      <path d="M10 80h80v10H10z" fill="url(#halftone)" opacity="0.25" />
    </svg>
  );
}