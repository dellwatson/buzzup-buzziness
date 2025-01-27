export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

// utils.js

export const formatViewCount = (count) => {
  const num = Number(count);
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  }
  return count; // Return original if less than 1k
};

export const formatPublishedDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const intervalCount = Math.floor(seconds / interval.seconds);
    if (intervalCount > 0) {
      return `${intervalCount} ${interval.label}${
        intervalCount > 1 ? "s" : ""
      } ago`;
    }
  }

  return "just now"; // For very recent posts
};
