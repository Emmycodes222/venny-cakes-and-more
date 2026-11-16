import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { business } from "./config";
import images from "./assets/images";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function shouldShowPreloader(pathname) {
  if (pathname !== "/" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  try {
    return window.sessionStorage.getItem("seen") !== "1";
  } catch {
    return true;
  }
}

function pageName(pathname) {
  if (pathname === "/") return "home";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  return "not-found";
}

function PageEffects({ page }) {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.documentElement.classList.add("js", "ready");
    document.body.classList.toggle("inner-page", page !== "home");

    const titles = {
      home: "Vany Cake and More | Cakes, Treats & Bouquets",
      about: "About Vany | Vany Cake and More",
      contact: "Contact | Vany Cake and More",
      "not-found": "Page not found | Vany Cake and More"
    };
    const descriptions = {
      home: "Order birthday, anniversary, wedding and custom cakes, cupcakes, pastries, breads, snacks, food trays, desserts and more from Vany Cake and More.",
      about: "Discover Vany Cake and More: celebration cakes, pastries, refreshing drinks, desserts, bouquets and thoughtful treats prepared with care.",
      contact: "Contact Vany Cake and More about celebration cakes, pastries, zobo, yoghurt, parfait, bouquets and custom orders.",
      "not-found": "The page you requested could not be found."
    };

    document.title = titles[page];
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      descriptions[page]
    );

    const businessDetails = {
      "@context": "https://schema.org",
      "@type": "Bakery",
      name: business.name,
      description: descriptions.home,
      telephone: `+${business.whatsappNumber}`,
      sameAs: [business.instagramUrl],
      image: new URL(images.brandSquare, window.location.href).href
    };
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema) schema.textContent = JSON.stringify(businessDetails);

    const navigation = document.getElementById("nav");
    if (page !== "home") return undefined;

    const updateNavigation = () => {
      navigation?.classList.toggle("sm", window.scrollY > 60);
    };
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });

    return () => window.removeEventListener("scroll", updateNavigation);
  }, [page]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach(element => element.classList.remove("reveal"));
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (page !== "home" || !finePointer || reduceMotion) return undefined;

    const floatingImages = Array.from(document.querySelectorAll(".float"));
    let pointerX = 0;
    let pointerY = 0;
    let animationFrame = 0;

    function moveFloatingImages(event) {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        floatingImages.forEach(image => {
          const depth = Number(image.dataset.d) || 20;
          image.style.transform = `translate(${pointerX * depth}px, ${pointerY * depth}px)`;
        });
        animationFrame = 0;
      });
    }

    function tiltCards(event) {
      const card = event.target.closest?.(".card");
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(-y * 5).toFixed(2)}deg`);
    }

    function resetCardTilt(event) {
      const card = event.target.closest?.(".card");
      if (!card || card.contains(event.relatedTarget)) return;
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    }

    window.addEventListener("pointermove", moveFloatingImages, { passive: true });
    document.addEventListener("pointermove", tiltCards, { passive: true });
    document.addEventListener("pointerout", resetCardTilt);

    return () => {
      window.removeEventListener("pointermove", moveFloatingImages);
      document.removeEventListener("pointermove", tiltCards);
      document.removeEventListener("pointerout", resetCardTilt);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      floatingImages.forEach(image => {
        image.style.removeProperty("transform");
      });
    };
  }, [page]);

  return null;
}

function SiteLayout() {
  const location = useLocation();
  const page = pageName(location.pathname);
  const [loading, setLoading] = useState(() => shouldShowPreloader(location.pathname));

  const finishLoading = useCallback(() => {
    try {
      window.sessionStorage.setItem("seen", "1");
    } catch {
      // Storage can be disabled in private browsing.
    }
    document.body.classList.remove("loading");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) document.body.classList.remove("loading");
  }, [loading]);

  useEffect(() => {
    if (!loading) return undefined;
    const timer = window.setTimeout(finishLoading, 7000);
    return () => window.clearTimeout(timer);
  }, [finishLoading, loading]);

  return (
    <>
      <PageEffects page={page} />
      <Header page={page} inert={loading} />
      <Routes>
        <Route
          path="/"
          element={<HomePage loading={loading} onFinishLoading={finishLoading} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer inert={loading && page === "home"} />
      {page === "home" && !loading && (
        <WhatsAppButton
          target="_blank"
          rel="noopener noreferrer"
          id="fab"
          aria-label={`Chat with ${business.name} on WhatsApp`}
          className="whatsapp-fab"
          message={`Hello ${business.name}! I'd like to ask about your cakes and treats.`}
        />
      )}
    </>
  );
}

export default function App() {
  return <SiteLayout />;
}
