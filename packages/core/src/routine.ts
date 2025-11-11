import type { Tag } from './ingredients';

const STEP_WEIGHT: Record<Tag, number> = {
  cleanser: 10, 'exfoliant-aha': 20, 'exfoliant-bha': 20, toner: 30, essence: 35,
  vitc: 40, niacinamide: 45, azelaic: 47, retinoid: 50, benzoyl: 50,
  peptides: 55, hydrating: 60, humectant: 60, eye: 65,
  moisturizer: 70, oil: 75, occlusive: 80, spf: 90
};

export type RoutineContext = 'AM' | 'PM';

export function computeStep(tags: Tag[], ctx: RoutineContext): number {
  let weight = Math.min(...tags.map(t => STEP_WEIGHT[t] ?? 60));
  if (ctx === 'AM') {
    if (tags.includes('retinoid')) weight = 85;
    if (tags.includes('spf')) weight = 90;
    if (tags.includes('vitc')) weight = 45;
  } else {
    if (tags.includes('spf')) weight = 15; // flag later
    if (tags.includes('retinoid')) weight = 50;
  }
  if (tags.includes('cleanser')) weight = 10;
  return weight;
}

export function buildRoutine(
  products: { id: string; name: string; imageUrl?: string | null; tags: Tag[] }[],
  ctx: RoutineContext
) {
  const items = products.map(p => {
    const step = computeStep(p.tags, ctx);
    const warnings: string[] = [];
    if (ctx === 'PM' && p.tags.includes('spf')) warnings.push('SPF is for AM only');
    if (p.tags.includes('retinoid') && (p.tags.includes('benzoyl') || p.tags.includes('exfoliant-aha') || p.tags.includes('exfoliant-bha')))
      warnings.push('Avoid layering retinoids with strong acids or benzoyl peroxide.');
    if (p.tags.includes('vitc') && p.tags.includes('benzoyl'))
      warnings.push('Vitamin C may be deactivated by benzoyl peroxide; separate by time.');
    return { ...p, step, warnings };
  }).sort((a,b)=>a.step-b.step);

  return items.map((x,i)=>({ ...x, step: i+1 }));
}
