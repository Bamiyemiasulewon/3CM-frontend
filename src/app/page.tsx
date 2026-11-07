"use client";

import { useEffect, useState } from "react";
import { CartProvider, formatNaira, useCart } from "@/components/cart-context";
import { Illustration } from "@/components/illustrations";
import { MenuBoard } from "@/components/menu-board";
import { TicketDrawer, TicketSummary } from "@/components/order-ticket";
import { MenuFoodThumbnail, MenuItemControl } from "@/components/quantity-control";
import { getWhatsAppUrl, site } from "@/config/site";
import { categories, menu, type MenuCategory } from "@/data/menu";

const schemaDays: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function firstItems<T>(items: T[], count: number) {
  return items.filter((_, index) => index < count);
}

function formatBusinessTime(time: string) {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const suffix = hour < 12 ? "am" : "pm";
  const hour12 = hour % 12 || 12;
  return minuteText === "00" ? `${hour12}${suffix}` : `${hour12}:${minuteText}${suffix}`;
}

function getStatus(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const hours = site.openingHours[values.weekday.toLowerCase() as keyof typeof site.openingHours];
  const currentMinute = Number(values.hour) * 60 + Number(values.minute);
  const [openHour, openMinute] = hours.open.split(":").map(Number);
  const [closeHour, closeMinute] = hours.close.split(":").map(Number);
  const openingMinute = openHour * 60 + openMinute;
  const closingMinute = closeHour * 60 + closeMinute;

  return currentMinute >= openingMinute && currentMinute < closingMinute
    ? `OPEN - closes ${formatBusinessTime(hours.close)}`
    : `CLOSED - opens ${formatBusinessTime(hours.open)}`;
}

function Header({
  onOpenTicket,
  onSelectCategory,
}: {
  onOpenTicket: () => void;
  onSelectCategory: (category: MenuCategory) => void;
}) {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("CHECKING HOURS");

  useEffect(() => {
    const update = () => setStatus(getStatus(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const links: { label: string; href: string; category?: MenuCategory }[] = [
    { label: "Rice", href: "#rice", category: "Rice" },
    { label: "Spaghetti", href: "#spaghetti", category: "Spaghetti" },
    { label: "Cakes", href: "#cakes", category: "Cakes" },
    { label: "Drinks", href: "#drinks", category: "Drinks" },
    { label: "Orders", href: "#orders" },
  ];

  function orderNow() {
    if (itemCount > 0) onOpenTicket();
    else onSelectCategory("Rice");
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a aria-label="3CM home" className="brand" href="#home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">3</span>
        <span className="brand-copy">
          <strong>3CM</strong>
        </span>
      </a>
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        <span /><span /><span />
      </button>
      <nav aria-label="Main navigation" className={menuOpen ? "main-nav nav-open" : "main-nav"}>
        {links.map(({ label, href, category }) => (
          <a
            href={href}
            key={label}
            onClick={(event) => {
              setMenuOpen(false);
              if (!category) return;
              event.preventDefault();
              onSelectCategory(category);
            }}
          >
            {label}
          </a>
        ))}
        <span className="status-chip"><i aria-hidden="true" />{status}</span>
        <button className="button button-red header-order" onClick={orderNow} type="button">
          Order now
        </button>
      </nav>
    </header>
  );
}

function Hero() {
  const [today, setToday] = useState("TODAY");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const date = new Date();
      const weekday = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
      const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
      setToday(`${weekday} - ${month} ${date.getDate()}`);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const specials = firstItems(menu.filter((item) => item.featured), 4);

  return (
    <section aria-labelledby="hero-title" className="hero section-rule" id="home">
      <div className="hero-copy">
        <div className="hero-date">{today}</div>
        <p className="eyebrow">- FRESHLY COOKED TODAY -</p>
        <h1 className="misprint-heading" id="hero-title">Today&apos;s Specials</h1>
        <p className="hero-tagline">- hot from the pot -</p>
        <div className="special-list">
          {specials.map((item, index) => (
            <article className="special-item" key={item.id}>
              <span className="item-number">No. {String(index + 1).padStart(2, "0")}</span>
              <div className="special-copy">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                {item.tags.length > 0 && <span className="diet-tags"><span>{item.tags.join(" / ")}</span></span>}
              </div>
              <strong>{formatNaira(item.price)} / {item.unit}</strong>
              <MenuItemControl item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const messages = [...site.marqueeMessages, ...site.marqueeMessages];
  return (
    <div aria-label={site.marqueeMessages.join(". ")} className="marquee" role="region">
      <div aria-hidden="true" className="marquee-track">
        {messages.map((message, index) => (
          <span key={`${message}-${index}`}>{message}<b aria-hidden="true">+</b></span>
        ))}
      </div>
    </div>
  );
}

function MenuSection({
  expanded,
  openCategories,
  onToggle,
  onToggleCategory,
}: {
  expanded: boolean;
  openCategories: Set<MenuCategory>;
  onToggle: () => void;
  onToggleCategory: (category: MenuCategory) => void;
}) {
  const intro = categories.find((category) => category.name === "Rice")?.description;

  return (
    <section aria-labelledby="menu-title" className="menu-section section-rule" id="menu">
      <div className="section-heading menu-section-heading">
        <div>
          <p className="eyebrow">- PICK YOUR PLATE -</p>
          <h2 className="green-heading" id="menu-title">The Whole Menu</h2>
          {intro && <p className="menu-intro">{intro}</p>}
          <button
            aria-controls="menu-panel"
            aria-expanded={expanded}
            className="button button-red menu-toggle"
            onClick={onToggle}
            type="button"
          >
            {expanded ? "Hide menu" : "View menu"}
          </button>
        </div>
      </div>
      <div
        aria-hidden={!expanded}
        className={`menu-panel ${expanded ? "menu-panel-expanded" : ""}`}
        id="menu-panel"
        inert={!expanded}
      >
        <div className="menu-panel-inner">
          <div aria-label="Dietary legend" className="menu-legend">
            <span>S - Spicy</span><span>V - Vegetarian</span><span>E - Egg</span><span>D - Dairy</span>
          </div>
          <div className="menu-grid">
            {categories.map((category) => (
              <MenuBoard
                category={category}
                expanded={openCategories.has(category.name)}
                key={category.name}
                onToggle={() => onToggleCategory(category.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Favourites() {
  const favourites = firstItems(menu.filter((item) => item.featured), 5);

  return (
    <section aria-labelledby="favourites-title" className="favourites-section" id="favourites">
      <div className="favourites-inner">
        <p className="eyebrow eyebrow-cream">- ON THE BOARD -</p>
        <h2 id="favourites-title">Everybody&apos;s<br />Favourites</h2>
        <div className="favourite-list">
          {favourites.map((item, index) => (
            <article className="favourite-row" key={item.id}>
              <span className="item-number">No. {String(index + 1).padStart(2, "0")}</span>
              <MenuFoodThumbnail className="favourite-image" item={item} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <strong>{formatNaira(item.price)} / {item.unit}</strong>
              <MenuItemControl item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderAhead({ onOpenTicket }: { onOpenTicket: () => void }) {
  return (
    <section aria-labelledby="orders-title" className="order-ahead section-rule" id="orders">
      <div className="order-ahead-copy">
        <p className="eyebrow">- ORDER AHEAD -</p>
        <h2 className="green-heading" id="orders-title">Good things take a ticket.</h2>
        <ol className="order-steps">
          <li><span>01</span><strong>Pick your food</strong><p>Choose your food and add it to the ticket.</p></li>
          <li><span>02</span><strong>Choose pickup or delivery</strong><p>Tell us how you would like to get your food.</p></li>
          <li><span>03</span><strong>Send it on WhatsApp</strong><p>We will confirm the details with you there.</p></li>
        </ol>
        <button className="button button-outline" onClick={onOpenTicket} type="button">Open your ticket</button>
      </div>
      <aside aria-label="Live order ticket" className="live-ticket">
        <div className="ticket-card-heading">
          <span>LIVE TICKET</span>
          <span aria-hidden="true" className="ticket-status-dot" />
        </div>
        <TicketSummary compact />
        <button className="ticket-card-link" onClick={onOpenTicket} type="button">Review ticket <span aria-hidden="true">↗</span></button>
      </aside>
    </section>
  );
}

function PartyOrders() {
  const quoteUrl = getWhatsAppUrl("Hello 3CM, I would like to request a quote for a cake or party order.");

  return (
    <section aria-labelledby="party-title" className="party-section section-rule" id="party-orders">
      <div className="party-board">
        <div className="party-copy">
          <p className="eyebrow eyebrow-cream">- A LITTLE MORE TO GO AROUND -</p>
          <h2 id="party-title">Cakes &amp; party orders</h2>
          <p>Whole cakes and party trays of jollof or fried rice. Tell us what you have in mind and we can talk through the details.</p>
          {quoteUrl ? (
            <a className="button button-mustard" href={quoteUrl} rel="noreferrer" target="_blank">Request a quote</a>
          ) : (
            <button className="button button-mustard" disabled title="Add the WhatsApp number in src/config/site.ts">Request a quote</button>
          )}
        </div>
        <div aria-hidden="true" className="party-art"><Illustration kind="whole-cake" /><Illustration kind="pot" /></div>
        <div className="party-stats">
          <div><span>MINIMUM ORDER</span><strong>{site.minimumCakeOrder}</strong></div>
          <div><span>LEAD TIME</span><strong>{site.cakeLeadTime}</strong></div>
          <div><span>DELIVERY AREA</span><strong>{site.deliveryArea}</strong></div>
        </div>
        <div className="party-feature"><span>ON THE BOARD</span><strong>Whole cakes<br />Party rice trays</strong></div>
      </div>
    </section>
  );
}

function Footer() {
  const instagram = site.instagram.startsWith("[") ? null : `https://instagram.com/${site.instagram.replace(/^@/, "")}`;
  const whatsapp = getWhatsAppUrl("Hello 3CM, I have a question about the menu.");

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#home">3CM</a>
          <p>{site.tagline}</p>
        </div>
        <div className="footer-column"><span>VISIT</span><p>{site.address}</p><p>{site.phone}</p></div>
        <div className="footer-column"><span>HOURS</span><p>{site.hoursSummary}</p></div>
        <div className="footer-column"><span>FIND US</span>
          {whatsapp ? <a href={whatsapp} rel="noreferrer" target="_blank">WhatsApp</a> : <p>WhatsApp: {site.whatsappNumber}</p>}
          {instagram ? <a href={instagram} rel="noreferrer" target="_blank">Instagram</a> : <p>Instagram: {site.instagram}</p>}
        </div>
      </div>
      <div className="footer-bottom"><span>3CM</span><a href="#home">BACK TO TOP ↑</a></div>
    </footer>
  );
}

function Restaurant() {
  const { itemCount, total, toast, undo } = useCart();
  const [ticketOpen, setTicketOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<MenuCategory>>(() => new Set());

  function toggleMenu() {
    setMenuExpanded((expanded) => !expanded);
  }

  function toggleCategory(category: MenuCategory) {
    setOpenCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  function selectCategory(category: MenuCategory) {
    setMenuExpanded(true);
    setOpenCategories((current) => new Set(current).add(category));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      const target = document.getElementById(category.toLowerCase());
      if (!target) return;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: targetTop, behavior: reducedMotion ? "auto" : "smooth" });
    }, reducedMotion ? 0 : 380);
  }

  const hours = Object.entries(site.openingHours).map(([day, range]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${schemaDays[day]}`,
    opens: range.open,
    closes: range.close,
  }));
  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    ...(site.address.startsWith("[") ? {} : { address: site.address }),
    ...(site.phone.startsWith("[") ? {} : { telephone: site.phone }),
    openingHoursSpecification: hours,
    ...(site.instagram.startsWith("[") ? {} : { sameAs: [`https://instagram.com/${site.instagram.replace(/^@/, "")}`] }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }} />
      <Header onOpenTicket={() => setTicketOpen(true)} onSelectCategory={selectCategory} />
      <main>
        <Hero />
        <Marquee />
        <MenuSection
          expanded={menuExpanded}
          onToggle={toggleMenu}
          onToggleCategory={toggleCategory}
          openCategories={openCategories}
        />
        <Favourites />
        <OrderAhead onOpenTicket={() => setTicketOpen(true)} />
        <PartyOrders />
      </main>
      <Footer />
      {itemCount > 0 && (
        <div className="ticket-dock">
          <div><strong>{itemCount} {itemCount === 1 ? "item" : "items"}</strong><span>{formatNaira(total)}</span></div>
          <button className="button button-red" onClick={() => setTicketOpen(true)} type="button">View ticket</button>
        </div>
      )}
      {ticketOpen && <TicketDrawer onClose={() => setTicketOpen(false)} />}
      {toast && (
        <div aria-live="polite" className="cart-toast" role="status">
          <span>{toast.message}</span>
          <button onClick={undo} type="button">Undo</button>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return <CartProvider><Restaurant /></CartProvider>;
}
