import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizePath,
  slugify,
  isValidDestinationUrl,
  createLinkRecord,
  createLinkMap,
  addLink,
  resolveLink,
  listLinks,
  renderAnchor
} from "../src/index.js";

test("normalizePath normalizes common path input", () => {
  assert.equal(normalizePath("go/tool/"), "/go/tool");
  assert.equal(normalizePath("/go//tool"), "/go/tool");
});

test("slugify converts labels into stable slugs", () => {
  assert.equal(slugify("Partner Tool"), "partner-tool");
});

test("isValidDestinationUrl validates http and https URLs", () => {
  assert.equal(isValidDestinationUrl("https://example.com"), true);
  assert.equal(isValidDestinationUrl("ftp://example.com"), false);
});

test("createLinkRecord creates a valid record", () => {
  const record = createLinkRecord({
    key: "Partner Tool",
    destination: "https://example.com?a=1"
  });

  assert.equal(record.key, "partner-tool");
  assert.equal(record.path, "/go/partner-tool");
  assert.equal(record.destination, "https://example.com?a=1");
});

test("createLinkMap and addLink store records by path", () => {
  const map = createLinkMap();

  addLink(map, {
    key: "partner-tool",
    path: "/go/partner-tool",
    destination: "https://example.com/ref"
  });

  const resolved = resolveLink(map, "/go/partner-tool");
  assert.equal(resolved.destination, "https://example.com/ref");
  assert.equal(listLinks(map).length, 1);
});

test("addLink prevents duplicate paths", () => {
  const map = createLinkMap();

  addLink(map, {
    key: "tool-1",
    path: "/go/tool",
    destination: "https://example.com/a"
  });

  assert.throws(() => {
    addLink(map, {
      key: "tool-2",
      path: "/go/tool",
      destination: "https://example.com/b"
    });
  });
});

test("renderAnchor returns safe HTML", () => {
  const html = renderAnchor({
    href: "/go/tool",
    text: "Try Tool",
    rel: "sponsored nofollow"
  });

  assert.equal(
    html,
    '<a href="/go/tool" rel="sponsored nofollow">Try Tool</a>'
  );
});
