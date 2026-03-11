import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const PROJECT_COLORS = {
  '梧桐 MLAI': 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  'CEE-Portrait': 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
  'CEE-Lake': 'border-primary/40 bg-primary/10 text-primary',
  '个人项目': 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
};

const TECH_PATTERN =
  /\b(React|Vue|TypeScript|JavaScript|Tailwind|ECharts|Framer Motion|Node\.js|Python|AI|LLM|GPT|Dashboard|API|iframe|Monaco|Feature Store|Mage-AI|Endpoint|Pipeline|ROC|MLAI|CEE|CDP|CLP|CVM|XL|DMC)\b/g;

function highlightTech(text) {
  const parts = text.split(TECH_PATTERN);
  return parts.map((part, i) =>
    TECH_PATTERN.test(part) ? (
      <span key={i} className="font-semibold text-foreground">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function ExperienceCard({ exp, isLast = false }) {
  const [expanded, setExpanded] = useState(false);

  const projectTag = Object.keys(PROJECT_COLORS).find(
    (k) => exp.description?.includes(k) || exp.company?.includes(k)
  );
  const tagColor = projectTag ? PROJECT_COLORS[projectTag] : PROJECT_COLORS['CEE-Lake'];
  const previewHighlights = exp.highlights?.slice(0, 2) ?? [];
  const restHighlights = exp.highlights?.slice(2) ?? [];

  return (
    <div className="flex gap-4">
      {/* Timeline axis */}
      <div className="relative flex flex-col items-center">
        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-background" />
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-primary/50 to-border" />
        )}
      </div>

      {/* Card */}
      <div className="mb-6 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {exp.period}
              </span>
              {projectTag && (
                <span
                  className={cn(
                    'inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium',
                    tagColor
                  )}
                >
                  {projectTag}
                </span>
              )}
            </div>
            <h3 className="mt-1.5 text-base font-semibold text-foreground">
              {exp.position}
            </h3>
            <p className="text-sm font-medium text-primary">{exp.company}</p>
          </div>
        </div>

        {/* Preview highlights — always visible */}
        {previewHighlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {previewHighlights.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                <span>{highlightTech(item)}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Expandable rest */}
        <AnimatePresence initial={false}>
          {expanded && restHighlights.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-1.5 space-y-1.5">
                {restHighlights.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{highlightTech(item)}</span>
                  </li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        {restHighlights.length > 0 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 flex items-center gap-1 text-xs font-medium text-primary/70 transition-colors hover:text-primary"
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              ▾
            </motion.span>
            {expanded ? '收起' : `展开 ${restHighlights.length} 条详情`}
          </button>
        )}
      </div>
    </div>
  );
}

export default ExperienceCard;
