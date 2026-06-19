import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

vi.mock("@squircle-js/react", () => ({
  Squircle: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => (asChild ? children : React.createElement("div", null, children)),
}));

afterEach(() => {
  cleanup();
});
