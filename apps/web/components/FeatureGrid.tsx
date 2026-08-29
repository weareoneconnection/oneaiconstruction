export function FeatureGrid({
  items
}: {
  items: readonly { title: string; text: string; tag?: string }[];
}) {
  return (
    <div className="feature-grid">
      {items.map((item) => (
        <article className="feature-card" key={item.title}>
          {item.tag && <span>{item.tag}</span>}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
