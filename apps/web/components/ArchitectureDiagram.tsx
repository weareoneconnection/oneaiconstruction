import type { Dictionary } from '../lib/i18n/dictionaries';

export function ArchitectureDiagram({ t }: { t: Dictionary }) {
  return (
    <div className="architecture-diagram">
      {t.demos.architecture.layers.map((layer, index) => (
        <div className="arch-layer" key={layer.name}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <strong>{layer.name}</strong>
            <p>{layer.items}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
