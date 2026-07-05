// ponytail: STEWARD_EMAIL — replace with a real support inbox when one exists
export const STEWARD_EMAIL = "milaadmin@gmail.com";

export const THEME_STORAGE_KEY = "mila-theme";

export const VIBES = [
  "Casual",
  "Business Casual",
  "Business Attire",
  "Formal",
  "Date Night",
] as const;

export const CREDIT_PACKS: { id: string; name: string; description: string; price: string }[] = [
  {
    id: "mila_pack_small",
    name: "Mila Daily Pack",
    description: "+10 styling credits — a week of effortless looks.",
    price: "$1.99",
  },
  {
    id: "mila_pack_large",
    name: "Mila Studio Pack",
    description: "+50 styling credits — for the seriously well-dressed.",
    price: "$5.99",
  },
  {
    id: "mila_pack_unlimited",
    name: "Mila Unlimited",
    description: "Unlimited daily styling — your studio never closes.",
    price: "$14.99",
  },
];
