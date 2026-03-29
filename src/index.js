function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`${fieldName} must be a non-empty string`);
  }
}

export function normalizePath(path) {
  assertNonEmptyString(path, "path");

  let value = path.trim();

  if (!value.startsWith("/")) {
    value = `/${value}`;
  }

  value = value.replace(/\/{2,}/g, "/");

  if (value.length > 1 && value.endsWith("/")) {
    value = value.slice(0, -1);
  }

  return value;
}

export function slugify(value) {
  assertNonEmptyString(value, "value");

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidDestinationUrl(destination) {
  if (typeof destination !== "string" || destination.trim() === "") {
    return false;
  }

  try {
    const parsed = new URL(destination);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function createLinkRecord({ key, path, destination, meta = {} }) {
  assertNonEmptyString(key, "key");
  assertNonEmptyString(destination, "destination");

  if (!isValidDestinationUrl(destination)) {
    throw new TypeError("destination must be a valid http or https URL");
  }

  return {
    key: slugify(key),
    path: normalizePath(path ?? `/go/${slugify(key)}`),
    destination: destination.trim(),
    meta: isObject(meta) ? { ...meta } : {}
  };
}

export function createLinkMap(initialLinks = []) {
  if (!Array.isArray(initialLinks)) {
    throw new TypeError("initialLinks must be an array");
  }

  const map = new Map();

  for (const link of initialLinks) {
    addLink(map, link);
  }

  return map;
}

export function addLink(map, link) {
  if (!(map instanceof Map)) {
    throw new TypeError("map must be a Map");
  }

  const record = createLinkRecord(link);

  if (map.has(record.path)) {
    throw new Error(`A link already exists for path: ${record.path}`);
  }

  map.set(record.path, record);
  return record;
}

export function resolveLink(map, path) {
  if (!(map instanceof Map)) {
    throw new TypeError("map must be a Map");
  }

  return map.get(normalizePath(path)) ?? null;
}

export function listLinks(map) {
  if (!(map instanceof Map)) {
    throw new TypeError("map must be a Map");
  }

  return Array.from(map.values());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderAnchor({ href, text, rel, target, attributes = {} }) {
  assertNonEmptyString(href, "href");
  assertNonEmptyString(text, "text");

  const attrs = {
    href,
    ...(rel ? { rel } : {}),
    ...(target ? { target } : {}),
    ...attributes
  };

  const parts = Object.entries(attrs).map(([key, value]) => {
    assertNonEmptyString(key, "attribute key");
    return `${key}="${escapeHtml(value)}"`;
  });

  return `<a ${parts.join(" ")}>${escapeHtml(text)}</a>`;
}
