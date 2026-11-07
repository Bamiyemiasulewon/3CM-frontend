"use client";

import { useEffect, useRef, useState } from "react";
import { useCart, formatNaira } from "@/components/cart-context";
import { QuantityStepper, formatUnit } from "@/components/quantity-control";
import { getWhatsAppUrl } from "@/config/site";
import type { CartLine } from "@/components/cart-context";

export function TicketSummary({ compact = false }: { compact?: boolean }) {
  const { items, total, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return <p className="ticket-empty">Your ticket is empty. Add something from the boards.</p>;
  }

  return (
    <div className={`ticket-summary ${compact ? "ticket-summary-compact" : ""}`}>
      <div className="ticket-lines">
        {items.map((item) => (
          <div className="ticket-line" key={item.itemId}>
            <p className="ticket-line-name">
              {formatUnit(item.unit, item.quantity)} - {item.name} - {formatNaira(item.price * item.quantity)}
            </p>
            <div className="ticket-line-actions">
              <QuantityStepper
                compact={compact}
                name={item.name}
                onDecrease={() => setQuantity(item.itemId, item.quantity - 1)}
                onIncrease={() => setQuantity(item.itemId, item.quantity + 1)}
                quantity={item.quantity}
              />
              <button
                aria-label={`Remove ${item.name} from ticket`}
                className="remove-line"
                onClick={() => removeItem(item.itemId)}
                type="button"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m3 3v7m6-7v7" />
                </svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="ticket-total"><span>Total</span><strong>{formatNaira(total)}</strong></div>
    </div>
  );
}

export function TicketDrawer({ onClose }: { onClose: () => void }) {
  const { items, total } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const [fulfilment, setFulfilment] = useState<"Pickup" | "Delivery">("Pickup");
  const [errors, setErrors] = useState<string[]>([]);
  const [stage, setStage] = useState<"edit" | "review">("edit");
  const [review, setReview] = useState<{
    name: string;
    phone: string;
    fulfilment: "Pickup" | "Delivery";
    address: string;
    note: string;
    items: CartLine[];
    total: number;
  } | null>(null);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, []);

  function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const nextErrors: string[] = [];

    if (!name) nextErrors.push("Enter your name.");
    if (!phone) nextErrors.push("Enter your phone number.");
    if (fulfilment === "Delivery" && !address) nextErrors.push("Enter your delivery address.");
    if (items.length === 0) nextErrors.push("Add at least one item to your ticket.");

    if (nextErrors.length) {
      setErrors(nextErrors);
      return;
    }

    setReview({ name, phone, fulfilment, address, note, items: items.map((item) => ({ ...item })), total });
    setErrors([]);
    setStage("review");
  }

  function confirmOrder() {
    if (!review) return;
    const lines = review.items.map(
      (item) => `${formatUnit(item.unit, item.quantity)} - ${item.name} - ${formatNaira(item.price * item.quantity)}`,
    );
    const message = [
      "Hello 3CM, I would like to place an order.",
      `Name: ${review.name}`,
      `Phone: ${review.phone}`,
      review.fulfilment === "Delivery" ? `Delivery address: ${review.address}` : "Pickup",
      review.note ? `Note: ${review.note}` : "",
      "",
      ...lines,
      "",
      `Total: ${formatNaira(review.total)}`,
    ].filter(Boolean).join("\n");
    const whatsappUrl = getWhatsAppUrl(message);
    if (!whatsappUrl) {
      setErrors(["Add the restaurant WhatsApp number in the site configuration before sending."]);
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setErrors([]);
  }

  return (
    <div className="drawer-backdrop" onClick={() => onCloseRef.current()}>
      <section
        aria-labelledby="drawer-title"
        aria-modal="true"
        className="ticket-drawer"
        onClick={(event) => event.stopPropagation()}
        ref={drawerRef}
        role="dialog"
      >
        <header className="drawer-heading">
          <div>
            <span className="eyebrow">- YOUR ORDER -</span>
            <h2 id="drawer-title">{stage === "review" ? "Review ticket" : "Live ticket"}</h2>
          </div>
          <button aria-label="Close ticket" className="close-button" onClick={() => onCloseRef.current()} ref={closeButtonRef} type="button">×</button>
        </header>
        <div className="drawer-content" onFocusCapture={(event) => {
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            window.setTimeout(() => event.target instanceof HTMLElement && event.target.scrollIntoView({ block: "center" }), 250);
          }
        }}>
          {stage === "edit" ? (
            <>
              <TicketSummary />
              {items.length > 0 && <button className="clear-ticket-button" onClick={() => setConfirmingClear(true)} type="button">Clear ticket</button>}
              <form className="order-form" noValidate onSubmit={submitOrder}>
                <label>
                  Your name
                  <input autoComplete="name" defaultValue={review?.name ?? ""} name="name" required />
                </label>
                <label>
                  Phone number
                  <input autoComplete="tel" defaultValue={review?.phone ?? ""} name="phone" required type="tel" />
                </label>
                <fieldset>
                  <legend>How would you like your order?</legend>
                  <div className="fulfilment-options">
                    {(["Pickup", "Delivery"] as const).map((option) => (
                      <label className={fulfilment === option ? "fulfilment-selected" : ""} key={option}>
                        <input
                          checked={fulfilment === option}
                          name="fulfilment"
                          onChange={() => setFulfilment(option)}
                          type="radio"
                          value={option}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {fulfilment === "Delivery" && (
                  <label>
                    Delivery address
                    <textarea autoComplete="street-address" defaultValue={review?.address ?? ""} name="address" required rows={2} />
                  </label>
                )}
                <label>
                  Note <span className="optional-label">(optional)</span>
                  <textarea defaultValue={review?.note ?? ""} name="note" rows={2} />
                </label>
                {errors.length > 0 && <div aria-live="assertive" className="form-errors">{errors.map((error) => <p key={error}>{error}</p>)}</div>}
                <button className="button button-red send-order" type="submit">Send order on WhatsApp</button>
              </form>
            </>
          ) : review && (
            <section aria-labelledby="review-title" className="order-review">
              <h3 id="review-title" tabIndex={-1}>Check these details</h3>
              <dl className="review-details">
                <div><dt>Name</dt><dd>{review.name}</dd></div>
                <div><dt>Phone</dt><dd>{review.phone}</dd></div>
                <div><dt>Order method</dt><dd>{review.fulfilment}</dd></div>
                {review.fulfilment === "Delivery" && <div><dt>Address</dt><dd>{review.address}</dd></div>}
                {review.note && <div><dt>Note</dt><dd>{review.note}</dd></div>}
              </dl>
              <div aria-label="Order items" className="review-lines">
                {review.items.map((item) => (
                  <p key={item.itemId}>{formatUnit(item.unit, item.quantity)} - {item.name} - {formatNaira(item.price * item.quantity)}</p>
                ))}
              </div>
              <p className="review-total">Total <strong>{formatNaira(review.total)}</strong></p>
              {errors.length > 0 && <div aria-live="assertive" className="form-errors">{errors.map((error) => <p key={error}>{error}</p>)}</div>}
              <div className="review-actions">
                <button className="button button-outline" onClick={() => { setErrors([]); setStage("edit"); }} type="button">Go back and edit</button>
                <button className="button button-red send-order" onClick={confirmOrder} type="button">Confirm and open WhatsApp</button>
              </div>
            </section>
          )}
        </div>
        {confirmingClear && (
          <div className="confirm-backdrop">
            <section aria-labelledby="clear-title" aria-modal="true" className="clear-confirm" role="alertdialog">
              <h3 id="clear-title">Clear all items?</h3>
              <div>
                <button className="button button-red" onClick={() => { clearCart(); setConfirmingClear(false); }} type="button">Yes, clear</button>
                <button className="button button-outline" onClick={() => setConfirmingClear(false)} type="button">Keep my order</button>
              </div>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}