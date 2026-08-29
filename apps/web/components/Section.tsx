import { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function Section({
  eyebrow,
  title,
  copy,
  children,
  id,
  tone = 'default'
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  children?: ReactNode;
  id?: string;
  /** `raised` gives the section a lighter ground, to break up long pages. */
  tone?: 'default' | 'raised';
}) {
  return (
    <section className={`section tone-${tone}`} id={id}>
      <div className="container">
        <Reveal>
          <div className="section-heading">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2>{title}</h2>
            {copy && <p>{copy}</p>}
          </div>
        </Reveal>
        {children && <Reveal delay={80}>{children}</Reveal>}
      </div>
    </section>
  );
}
