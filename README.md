# link-cloaker

[![Support Open Work](https://img.shields.io/badge/Support-Open%20Work-0A0A0A?style=flat&logo=github)](https://github.com/brandonhimpfen/support) 
[![GitHub Sponsor](https://srv-cdn.himpfen.io/badges/github/github-flat.svg)](https://github.com/sponsors/brandonhimpfen) 
[![Buy Me a Coffee](https://srv-cdn.himpfen.io/badges/buymeacoffee/buymeacoffee-flat.svg)](https://buymeacoffee.com/brandonhimpfen) 
[![Ko-Fi](https://srv-cdn.himpfen.io/badges/kofi/kofi-flat.svg)](https://ko-fi.com/brandonhimpfen) 
[![PayPal](https://srv-cdn.himpfen.io/badges/paypal/paypal-flat.svg)](https://paypal.me/brandonhimpfen)

A lightweight utility for generating clean redirect paths for tracking and affiliate URLs.

This project helps centralize long or messy outbound URLs behind simple internal paths such as `/go/tool-name` or `/r/partner-name`. It is designed for websites, newsletters, and publishing systems that want cleaner links, easier updates, and more consistent outbound link management.

It can be used as both a practical utility and a reference pattern for simple link cloaking workflows.

## Why this project exists

Outbound links are often long, inconsistent, and difficult to manage.

Affiliate links may include tracking parameters.
Marketing links may change over time.
Publisher workflows often hardcode these URLs into templates, articles, or newsletters.

The result is duplicated maintenance, harder updates, and less readable links.

This project introduces a small layer that maps clean, internal paths to destination URLs.

## Mental model

Think of the package as a redirect mapping utility:

`Content or App -> short internal path -> destination URL`

The package does not run an HTTP server on its own.

It helps define, validate, and resolve the mappings that a redirect layer can use.

## What is included

- Link map creation helpers.
- Path slug normalization.
- Destination URL validation.
- Redirect resolution helpers.
- HTML anchor rendering helper.
- Example usage demonstrating real-world integration.
- Test coverage for core behavior.

## Install

```bash
npm install link-cloaker
```

## Example

```js
import {
  createLinkMap,
  addLink,
  resolveLink,
  renderAnchor
} from "link-cloaker";

const links = createLinkMap();

addLink(links, {
  key: "partner-tool",
  path: "/go/partner-tool",
  destination: "https://example.com/signup?ref=brand"
});

const resolved = resolveLink(links, "/go/partner-tool");

console.log(resolved.destination);
// https://example.com/signup?ref=brand

console.log(
  renderAnchor({
    href: resolved.path,
    text: "Try Partner Tool",
    rel: "sponsored nofollow"
  })
);
// <a href="/go/partner-tool" rel="sponsored nofollow">Try Partner Tool</a>
```

## Link record

Each stored link follows a simple structure:

```json
{
  "key": "partner-tool",
  "path": "/go/partner-tool",
  "destination": "https://example.com/signup?ref=brand",
  "meta": {
    "label": "Partner Tool",
    "category": "affiliate"
  }
}
```

## Why this matters

Clean redirect paths improve maintainability.

When outbound links are centralized, it becomes easier to:

- update a destination in one place.
- keep public-facing links readable.
- standardize redirect behavior across systems.
- separate content from tracking-heavy URLs.

This makes link governance simpler and publishing systems easier to maintain.

## Design Principles

This project is intentionally minimal.

It focuses on mapping and resolving clean redirect paths rather than trying to become a full affiliate platform, analytics layer, or redirect server.

The design emphasizes:

- Simplicity over abstraction.
- Readability over cleverness.
- Consistency over flexibility.
- Reusability over framework lock-in.

## Non-Goals

This project does not attempt to:

- run a production redirect server.
- provide click analytics.
- replace full affiliate management platforms.
- bypass disclosure or compliance requirements.

It focuses only on defining and resolving lightweight cloaked links.

## Roadmap

This project is designed as a foundation for cleaner outbound link workflows. Future extensions may include:

- CSV and JSON import helpers.
- metadata validation rules.
- redirect middleware examples.
- optional analytics hooks.
- campaign and UTM helpers.

## Availability

View on npm:
https://www.npmjs.com/package/link-cloaker

View on GitHub:
https://github.com/brandonhimpfen/link-cloaker

## License

MIT
