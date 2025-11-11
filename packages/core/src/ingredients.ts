export type Tag =
  | 'cleanser' | 'exfoliant-aha' | 'exfoliant-bha' | 'toner'
  | 'vitc' | 'niacinamide' | 'azelaic' | 'retinoid'
  | 'benzoyl' | 'peptides' | 'hydrating' | 'humectant'
  | 'moisturizer' | 'occlusive' | 'oil' | 'spf' | 'essence' | 'eye';

const RX = {
  cleanser: /(cleanser|cleansing|face wash|micellar|sulfate)/i,
  aha: /(glycolic|lactic|mandelic|aha(?!-free))/i,
  bha: /(salicylic|beta-hydroxy|bha(?!-free))/i,
  vitc: /(ascorbic|ascorbyl|tetrahexyldecyl ascorbate|vitamin\s*c)/i,
  niacinamide: /niacinamide/i,
  azelaic: /azelaic/i,
  retinoid: /(retinol|retinal|retinaldehyde|tretinoin|adapalene|retinoate)/i,
  benzoyl: /benzoyl\s*peroxide/i,
  peptides: /peptide/i,
  hydrating: /(hyaluronic|glycerin|urea|betaine|panthenol)/i,
  moisturizer: /(cream|lotion|moisturizer|emulsion|ceramide|cholesterol)/i,
  occlusive: /(petrolatum|dimethicone|lanolin|shea|squalane)/i,
  oil: /\boil\b/i,
  toner: /\btoner\b|\btonic\b/i,
  essence: /\bessence\b/i,
  eye: /\beye\s*(cream|serum|gel)\b/i,
  spf: /(spf|sunscreen|avobenzone|zinc oxide|titanium dioxide)/i,
};

export function inferTags(ingredients: string | null, name: string): Tag[] {
  const text = `${ingredients ?? ''} ${name}`;
  const tags = new Set<Tag>();
  if (RX.cleanser.test(text)) tags.add('cleanser');
  if (RX.aha.test(text)) tags.add('exfoliant-aha');
  if (RX.bha.test(text)) tags.add('exfoliant-bha');
  if (RX.toner.test(text)) tags.add('toner');
  if (RX.essence.test(text)) tags.add('essence');
  if (RX.vitc.test(text)) tags.add('vitc');
  if (RX.niacinamide.test(text)) tags.add('niacinamide');
  if (RX.azelaic.test(text)) tags.add('azelaic');
  if (RX.retinoid.test(text)) tags.add('retinoid');
  if (RX.benzoyl.test(text)) tags.add('benzoyl');
  if (RX.peptides.test(text)) tags.add('peptides');
  if (RX.hydrating.test(text)) { tags.add('hydrating'); tags.add('humectant'); }
  if (RX.moisturizer.test(text)) tags.add('moisturizer');
  if (RX.occlusive.test(text)) tags.add('occlusive');
  if (RX.oil.test(text)) tags.add('oil');
  if (RX.eye.test(text)) tags.add('eye');
  if (RX.spf.test(text)) tags.add('spf');
  return Array.from(tags);
}
