"use client";

import { categories, type MenuCategoryData, type MenuItem } from "@/data/menu";
import { MenuFoodThumbnail, MenuItemControl, UnitPrice } from "@/components/quantity-control";

function MenuRows({ items }: { items: MenuItem[] }) {
  return (
    <div className="menu-rows">
      {items.map((item) => (
        <div className="menu-row" key={item.id}>
          <div className="menu-row-copy">
            <div className="menu-row-title">
              <MenuFoodThumbnail className="menu-row-image" item={item} />
              <span>{item.name}</span>
              <span aria-hidden="true" className="leader" />
              <span className="menu-price"><UnitPrice item={item} /></span>
            </div>
            <p>{item.description}</p>
            {item.tags.length > 0 && (
              <div aria-label={`Dietary tags: ${item.tags.join(", ")}`} className="diet-tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            )}
          </div>
          <MenuItemControl item={item} />
        </div>
      ))}
    </div>
  );
}

export function MenuBoard({
  category,
  expanded,
  onToggle,
}: {
  category: MenuCategoryData;
  expanded: boolean;
  onToggle: () => void;
}) {
  const categoryId = category.name.toLowerCase();
  const optionCount = category.items.length;

  return (
    <article
      className={`menu-board ${category.name === "Drinks" ? "menu-board-dark" : ""} ${expanded ? "menu-board-open" : ""}`}
      id={categoryId}
    >
      <button
        aria-controls={`menu-items-${categoryId}`}
        aria-expanded={expanded}
        className="menu-board-toggle"
        onClick={onToggle}
        type="button"
      >
        <span className="menu-board-toggle-copy">
          <span className="board-number">- BOARD / {String(categories.indexOf(category) + 1).padStart(2, "0")} -</span>
          <span className="menu-board-title">{category.name}</span>
          <span className="menu-board-description">{category.description}</span>
        </span>
        <span className="menu-board-toggle-meta">
          <span className="category-option-count">{optionCount} {optionCount === 1 ? "option" : "options"}</span>
          <svg aria-hidden="true" className="category-chevron" viewBox="0 0 24 24">
            <path d="m5 9 7 7 7-7" />
          </svg>
        </span>
      </button>
      <div
        aria-hidden={!expanded}
        className={`category-panel ${expanded ? "category-panel-open" : ""}`}
        id={`menu-items-${categoryId}`}
        inert={!expanded}
      >
        <div className="category-panel-inner">
          <MenuRows items={category.items} />
          {category.extras && category.extras.length > 0 && (
            <section aria-label={`${category.name} extras`} className="menu-extras">
              <h4>Extras</h4>
              <MenuRows items={category.extras} />
            </section>
          )}
        </div>
      </div>
    </article>
  );
}