import { navigate as hashNavigate } from "wouter-preact/use-hash-location";
import { getAppBasePath } from './../config/basePath';

const basePath = getAppBasePath();

function normalize(path: string) {
  return (
    "/" +
    path
      .replace(/^\/+/, "")
      .replace(/\/{2,}/g, "/")
      .replace(/\/$/, "")
  );
}

export function navigate(url: string, replace = false) {
  const target = normalize(url);

  const current = window.location.hash.replace(/^#/, "") || "/";

  if (current === target) {
    return;
  }

  const fullPath = basePath + target;

  return hashNavigate(fullPath, { replace });
}