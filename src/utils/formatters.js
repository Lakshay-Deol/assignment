/**
 * Get the exact (full precision) dollar string for a value
 * @param {number} value
 * @returns {string}
 */
export const exactCurrency = (value) => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  return `${sign}$${absValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  })}`;
};

/**
 * Format a number as compact USD currency (e.g. $2.5K)
 * Returns both a display string and the exact tooltip value
 * @param {number} value
 * @returns {{ display: string, exact: string }}
 */
export const formatCurrency = (value) => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? "- " : "";
  const exact = exactCurrency(value);

  let display;
  if (absValue >= 1_000_000) {
    display = `${sign}$${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    display = `${sign}$${(absValue / 1_000).toFixed(2)}K`;
  } else if (absValue >= 1) {
    display = `${sign}$${absValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else if (absValue === 0) {
    display = "$0.00";
  } else {
    display = `${sign}$${absValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })}`;
  }

  return { display, exact };
};

/**
 * Format a holding amount with appropriate precision
 * @param {number} value
 * @returns {string}
 */
export const formatHolding = (value) => {
  if (value === 0) return "0";
  const absValue = Math.abs(value);
  if (absValue < 0.000001) return value.toExponential(2);
  if (absValue < 1) return value.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
  if (absValue < 1000) return value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
};

/**
 * Format a price value in USD
 * @param {number} value
 * @returns {{ display: string, exact: string }}
 */
export const formatPrice = (value) => {
  const exact = exactCurrency(value);
  if (value === 0) return { display: "$0.00", exact };
  const absValue = Math.abs(value);
  let display;
  if (absValue < 0.01) {
    display = `$${value.toFixed(8).replace(/0+$/, "").replace(/\.$/, "")}`;
  } else if (absValue >= 1_000_000) {
    display = `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    display = `$${(value / 1_000).toFixed(2)}K`;
  } else {
    display = `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return { display, exact };
};

/**
 * Format gain/loss with color class
 * @param {number} gain
 * @returns {{ display: string, exact: string, className: string }}
 */
export const formatGain = (gain) => {
  const exact = exactCurrency(gain);
  if (gain === 0) return { display: "$0.00", exact, className: "neutral" };
  const absGain = Math.abs(gain);
  let formatted;
  if (absGain < 0.01) {
    formatted = absGain.toFixed(4);
  } else if (absGain >= 1_000_000) {
    formatted = `${(absGain / 1_000_000).toFixed(2)}M`;
  } else if (absGain >= 1_000) {
    formatted = `${(absGain / 1_000).toFixed(2)}K`;
  } else {
    formatted = absGain.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  if (gain > 0) {
    return { display: `$${formatted}`, exact, className: "gain-positive" };
  }
  return { display: `- $${formatted}`, exact, className: "gain-negative" };
};
