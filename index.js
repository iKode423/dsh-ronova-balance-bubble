/** Host half of the Ronova balance bubble bundle: declares the durable threshold. */
const DEFAULT_THRESHOLD = 10;
const MIN_THRESHOLD = 0;
const MAX_THRESHOLD = 10000;

const kSchema = Symbol.for('schemastery');

const thresholdMeta = {
  step: 1,
  min: MIN_THRESHOLD,
  max: MAX_THRESHOLD,
  default: DEFAULT_THRESHOLD,
  volatile: true
};

/** Fresh JSON each time: the settings projector mutates the copy it hydrates. */
function thresholdJson() {
  return { type: 'number', meta: { ...thresholdMeta } };
}

/**
 * Schemastery-compatible Config without a build-time dependency.
 *
 * The settings service projects the node through `toJSON()` and only accepts
 * volatile fields for live writes; Cordis validates through `~standard`.
 */
export const Config = {
  [kSchema]: true,
  type: 'object',
  meta: {},
  dict: {
    threshold: {
      [kSchema]: true,
      type: 'number',
      meta: thresholdMeta,
      toJSON() {
        return thresholdJson();
      }
    }
  },
  toJSON() {
    return {
      type: 'object',
      meta: {},
      dict: { threshold: thresholdJson() }
    };
  },
  '~standard': {
    version: 1,
    vendor: 'ronova-balance-bubble',
    validate(value) {
      const input = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
      const raw = input.threshold;
      if (raw === undefined || raw === null || raw === '') {
        return { value: { threshold: DEFAULT_THRESHOLD } };
      }
      const parsed = typeof raw === 'number' ? raw : Number(raw);
      if (!Number.isFinite(parsed) || parsed < MIN_THRESHOLD || parsed > MAX_THRESHOLD) {
        return {
          issues: [{
            message: `threshold must be a number between ${MIN_THRESHOLD} and ${MAX_THRESHOLD}`,
            path: ['threshold']
          }]
        };
      }
      return { value: { threshold: Math.trunc(parsed) } };
    }
  }
};

/** No Host-side runtime work; the Client owns the bubble and settings row. */
export function apply() {}
