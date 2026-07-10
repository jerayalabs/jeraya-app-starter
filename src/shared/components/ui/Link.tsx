import type { ComponentChildren } from 'preact';
import { useLocation } from 'wouter-preact';
// import { useHashLocation } from 'wouter-preact/use-hash-location';
import { getAppBasePath } from '../../config/basePath';
import { navigate } from '../../lib/navigate';

interface LinkProps {
  to: string;
  activeClassName?: string;
  className?: string;
  children?: ComponentChildren;
  onClick?: (e: MouseEvent) => void;
}

export function Link({
  to,
  activeClassName,
  className = '',
  children,
  onClick,
}: LinkProps) {
  const base = getAppBasePath();
  const href = `${base}${to}`;

  const [location] = useLocation();

  const isActive = activeClassName ? location === to : false;

  function handleClick(e: MouseEvent) {
    onClick?.(e);

    if (!e.defaultPrevented) {
      e.preventDefault();
      e.stopPropagation();
      navigate(to);
    }
  }

  return (
    <a
      href={href}
      className={isActive ? `${className} ${activeClassName}`.trim() : className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}