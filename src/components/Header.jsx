import { useState } from "react";
import { Link } from "react-router-dom";
import images from "../assets/images";

const links = {
  home: [
    { href: "/about", label: "About" },
    { href: "/#menu", label: "Our treats" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" }
  ],
  about: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About", current: true },
    { href: "/#menu", label: "Our treats" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" }
  ],
  contact: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#menu", label: "Our treats" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact", current: true }
  ],
  "not-found": [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#menu", label: "Our treats" },
    { href: "/#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" }
  ]
};

export default function Header({ page, inert = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = page === "home";

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header id="nav" className={isHome ? "" : "sm"} inert={inert}>
      <Link
        to={isHome ? "/#top" : "/"}
        className="logo"
        aria-label="Vany Cake and More home"
        onClick={closeMenu}
      >
        <span className="brand-coin">
          <img className="brand-mark" src={images.brandLogo} alt="" />
        </span>
        <span className="brand-name">
          <strong>Vany</strong>
          <small>CAKE AND MORE</small>
        </span>
      </Link>
      <nav
        id="links"
        className={menuOpen ? "open" : ""}
        aria-label="Main navigation"
      >
        {links[page].map(link => (
          <Link
            to={link.href}
            aria-current={link.current ? "page" : undefined}
            key={link.label}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        className={`btn gold ${isHome ? "nav-order" : "nav-cta"}`}
        to={page === "contact" ? "#event-form" : "/contact"}
      >
        {page === "contact" ? "Send an enquiry" : "Make an enquiry"}
      </Link>
      <button
        id="burger"
        className={menuOpen ? "open" : ""}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-controls="links"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
