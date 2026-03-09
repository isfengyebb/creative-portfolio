import { cn } from '../../lib/utils';

function TimelineItem({
  title,
  subtitle,
  period,
  description,
  isLast = false,
}) {
  return (
    <div className="fade-in slide-in-from-bottom-4 animate-in flex gap-4 fill-mode-backwards duration-500">
      {/* Marker */}
      <div className="relative flex flex-col items-center">
        <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
        {!isLast && (
          <div className="mt-1 h-full w-px flex-1 bg-gradient-to-b from-primary/50 to-border" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <span className="inline-block rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {period}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm font-medium text-primary">
            {subtitle}
          </p>
        )}
        {description && (
          <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default TimelineItem;
