"use client";

import { useCart, formatNaira } from "@/components/cart-context";
import { FoodImage } from "@/components/food-image";
import type { MenuItem, MenuUnit } from "@/data/menu";
import type { IllustrationName } from "@/components/illustrations";

export function formatUnit(unit: MenuUnit, quantity: number) {
  return `${quantity} ${quantity === 1 ? unit : `${unit}s`}`;
}

export function QuantityStepper({
  name,
  quantity,
  onDecrease,
  onIncrease,
  compact = false,
}: {
  name: string;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`quantity-control ${compact ? "quantity-control-compact" : ""}`} aria-label={`${name} quantity`}>
      <button aria-label={`Remove one ${name}`} disabled={quantity <= 0} onClick={onDecrease} type="button">-</button>
      <span aria-live="polite">{quantity}</span>
      <button aria-label={`Add one ${name}`} disabled={quantity >= 20} onClick={onIncrease} type="button">+</button>
    </div>
  );
}

export function MenuItemControl({ item }: { item: MenuItem }) {
  const { items, addItem, setQuantity } = useCart();
  const quantity = items.find((line) => line.itemId === item.id)?.quantity ?? 0;

  if (!quantity) {
    return <button aria-label={`Add ${item.name} to ticket`} className="add-button" onClick={() => addItem(item)} type="button">Add</button>;
  }

  return (
    <QuantityStepper
      name={item.name}
      onDecrease={() => setQuantity(item.id, quantity - 1)}
      onIncrease={() => addItem(item)}
      quantity={quantity}
    />
  );
}

export function MenuFoodThumbnail({ item, className }: { item: MenuItem; className?: string }) {
  return (
    <FoodImage
      className={className}
      image={item.image}
      illustration={item.illustration as IllustrationName}
      name={item.name}
    />
  );
}

export function UnitPrice({ item }: { item: MenuItem }) {
  return <>{item.startingAt ? "From " : ""}{formatNaira(item.price)} / {item.unit}</>;
}