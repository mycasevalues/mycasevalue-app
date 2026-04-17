# Dynamic Chart Components - Usage Guide

These wrapper components enable automatic code splitting for heavy chart libraries, improving initial page load performance by deferring non-critical dependencies.

## Available Dynamic Components

- `DynamicTrendSparkline` - D3-based trend sparkline (80px x 48px)
- `DynamicFilingVolumeTrend` - D3-based filing volume chart
- `DynamicHorizontalBarChart` - Recharts-based horizontal bar chart
- `DynamicUSChoropleth` - D3-based US state choropleth map
- `DynamicOutcomeSankey` - D3-Sankey outcome flow diagram

## How They Work

Each component:
1. Uses Next.js `dynamic()` for automatic code splitting
2. Shows a `LoadingSkeleton` with shimmer animation while loading
3. Only loads the underlying chart library when component is rendered
4. Preserves all original props and functionality

## Usage Example

### Single Component Import
```tsx
import { DynamicTrendSparkline } from '@/components/dynamic';

export default function CasesPage() {
  return (
    <DynamicTrendSparkline 
      nosCode="1110" 
      width={80} 
      height={48} 
    />
  );
}
```

### Multiple Component Imports
```tsx
import { 
  DynamicTrendSparkline, 
  DynamicHorizontalBarChart, 
  DynamicOutcomeSankey 
} from '@/components/dynamic';

export default function AnalyticsPage() {
  return (
    <>
      <DynamicTrendSparkline nosCode="1110" width={100} height={40} />
      <DynamicHorizontalBarChart data={chartData} />
      <DynamicOutcomeSankey data={sankeyData} />
    </>
  );
}
```

### Migration from Static to Dynamic

**Before (static import - slower initial load):**
```tsx
import TrendSparkline from '@/components/charts/TrendSparkline';

export default function CasesPage() {
  return <TrendSparkline nosCode="1110" />;
}
```

**After (dynamic import - faster initial load):**
```tsx
import { DynamicTrendSparkline as TrendSparkline } from '@/components/dynamic';

export default function CasesPage() {
  return <TrendSparkline nosCode="1110" />;
}
```

## Benefits

- **Reduced Initial Bundle**: Heavy D3 and Recharts libraries deferred
- **Faster First Paint**: Non-critical visualizations load asynchronously
- **Better Core Web Vitals**: Improved LCP (Largest Contentful Paint)
- **Automatic Placeholders**: Loading skeletons maintain layout stability
- **Seamless UX**: Smooth appearance with no visual jump

## Props Pass-Through

All props from the original components are supported:

```tsx
// All these props work as expected:
<DynamicTrendSparkline 
  nosCode="1110"           // Original prop
  width={80}               // Original prop
  height={48}              // Original prop
  aria-label="Trend"       // Standard props
  className="custom-class" // Standard props
/>
```

## Server-Side Rendering

All dynamic wrappers have `ssr: true` enabled, supporting:
- Static generation (SSG)
- Server-side rendering (SSR)
- Incremental Static Regeneration (ISR)

## Loading Skeleton Appearance

The skeleton shows a shimmer animation that:
- Provides visual feedback during load
- Prevents layout shift (maintains component dimensions)
- Matches the chart's visual style

## Browser Support

Works in all modern browsers that support:
- ES2020+ JavaScript
- Dynamic imports
- CSS Grid/Flexbox
