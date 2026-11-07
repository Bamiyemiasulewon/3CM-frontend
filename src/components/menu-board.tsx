"use client";

import { categories, menu, type MenuCategory } from "@/data/menu";
import { Illustration, type IllustrationName } from "@/components/illustrations";
import { MenuFoodThumbnail, MenuItemControl, UnitPrice } from "@/components/quantity-control";

export function MenuBoard({ category }: { category: MenuCategory }) {
  const details = categories.find((item) => item.name === category);
  const items = menu.filter((item) => item.category === category);

  if (!details) return null;

  return (
    <article
      className={`menu-board ${category === "Drinks" ? "menu-board-dark" : ""}`}
      id={category.toLowerCase()}
    >
      <header className="menu-board-heading">
        <div>
          <span className="board-number">- BOARD / {String(categories.indexOf(details) + 1).padStart(2, "0")} -</span>
          <h3>{category}</h3>
          <p>{details.description}</p>
        </div>
        <div className="menu-board-art" aria-hidden="true">
          <Illustration kind={details.illustration as IllustrationName} />
        </div>
      </header>
      <div className="menu-rows">
        {items.map((item) => (
          <div className="menu-row" key={item.id}>
            <div className="menu-row-copy">
              <div className="menu-row-title">
                  <MenuFoodThumbnail className="menu-row-image" item={item} />
                <span>{item.name}</span>
                <span className="leader" aria-hidden="true" />
                  <span className="menu-price"><UnitPrice item={item} /></span>
              </div>
              <p>{item.description}</p>
              {item.tags.length > 0 && (
                <div className="diet-tags" aria-label={`Dietary tags: ${item.tags.join(", ")}`}>
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}
            </div>
            <MenuItemControl item={item} />
          </div>
        ))}
      </div>
    </article>
  );
}