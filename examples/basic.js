import {
  createLinkMap,
  addLink,
  resolveLink,
  renderAnchor
} from "../src/index.js";

const links = createLinkMap();

addLink(links, {
  key: "Travel Insurance",
  path: "/go/travel-insurance",
  destination: "https://example.com/insurance?ref=solo-travel",
  meta: {
    category: "affiliate",
    label: "Travel Insurance Partner"
  }
});

const link = resolveLink(links, "/go/travel-insurance");

console.log(link);
console.log(renderAnchor({
  href: link.path,
  text: "Compare travel insurance options",
  rel: "sponsored nofollow"
}));
