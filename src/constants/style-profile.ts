export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export type BodyType = "Hourglass" | "Rectangle" | "Pear" | "Inverted Triangle" | "Apple";

export type Swatch = { hex: string; name: string };

export interface DetailedColorProfile {
  season: Season;

  subSeason: string;

  toneType: "Warm Tone (Yellow Base)" | "Cool Tone (Blue Base)";

  brightness: "High Lightness" | "Medium Lightness" | "Low Lightness";

  saturation: "Low-Mid Saturation" | "High Saturation";

  contrastScale: "Low Contrast" | "Medium Contrast" | "High Contrast";

  faceShape:
    | "Diamond Geometry"
    | "Oval Frame"
    | "Round Frame"
    | "Square Frame"
    | "Heart Frame"
    | "Long Frame";

  bodyType: BodyType;

  primarySwatches: Swatch[];

  secondarySwatches: Swatch[];

  accentSwatches: Swatch[];

  avoidColors: string[];

  beautyMap: {
    hair: string;

    lip: string;

    base: string;
  };

  fabrication: string[];

  accessories: string[];

  denimRegistry: string[];

  stylistNote: string;

  fullPalette?: string[];

  calibrationSource?: "AI Vision" | "Studio Calibrated";

  confidenceScore?: number;

  confidenceLabel?: string;
}

export const SEASON_HEX_MATRIX: Record<string, string[]> = {
  SPRING_LIGHT: [
    "#FFB3A7",
    "#FFA07A",
    "#FFC0CB",
    "#FFD1A9",
    "#FAECB4",
    "#FFF3CD",
    "#FFFDD0",
    "#E2F0D9",
    "#D4EDDA",
    "#A3E4D7",
    "#E0F7FA",
    "#AED5FA",
    "#E8DAEF",
    "#FADBD8",
    "#FCF3CF",
    "#EAFAF1",
    "#FFF8DC",
    "#FFE4E1",
    "#F9EBEA",
    "#FDEDEC",
  ],
  SPRING_TRUE: [
    "#FFB347",
    "#FFA500",
    "#FF8C42",
    "#FF7F50",
    "#FF6347",
    "#FFD166",
    "#FFC107",
    "#FFEB3B",
    "#F4C430",
    "#9ACD32",
    "#7FFF00",
    "#00FA9A",
    "#40E0D0",
    "#48D1CC",
    "#87CEEB",
    "#FF8FA3",
    "#FFB6C1",
    "#FFDAB9",
    "#FAD7A0",
    "#F39C12",
  ],
  SPRING_BRIGHT: [
    "#FF3B30",
    "#FF9500",
    "#FFCC00",
    "#4CD964",
    "#00F5D4",
    "#5AC8FA",
    "#5856D6",
    "#FF2D55",
    "#007AFF",
    "#34AADC",
    "#FFD700",
    "#FF4500",
    "#00FF7F",
    "#00FFFF",
    "#FF00FF",
    "#9932CC",
    "#FF1493",
    "#ADFF2F",
    "#00E5FF",
    "#76FF03",
  ],
  SPRING_WARM: [
    "#E67E22",
    "#F39C12",
    "#F1C40F",
    "#2ECC71",
    "#1ABC9C",
    "#D35400",
    "#FF8C00",
    "#FFA500",
    "#C5A059",
    "#9ACD32",
    "#3CB371",
    "#20B2AA",
    "#CD853F",
    "#D2691E",
    "#B8860B",
    "#F5DEB3",
    "#DEB887",
    "#E9967A",
    "#FF7F50",
    "#FF6347",
  ],
  SUMMER_LIGHT: [
    "#FADBD8",
    "#EBDEF0",
    "#E8F8F5",
    "#EBF5FB",
    "#E8E8E8",
    "#D7BDE2",
    "#A9CCE3",
    "#A2D9CE",
    "#ABEBC6",
    "#F9E79F",
    "#F5CBA7",
    "#EDBB99",
    "#EAECEE",
    "#D5D8DC",
    "#B0C4DE",
    "#E6F2F7",
    "#F0F4F8",
    "#FDF2F4",
    "#F4EEF8",
    "#EAF2F8",
  ],
  SUMMER_TRUE: [
    "#B0C4DE",
    "#A2B9D9",
    "#8DA9D6",
    "#7395B6",
    "#5B7DA6",
    "#6A89CC",
    "#A29BFE",
    "#B19CD9",
    "#D8BFD8",
    "#C9A7D8",
    "#E8B4D8",
    "#F4A6C1",
    "#F5B7B1",
    "#E59ABF",
    "#A8CBE2",
    "#9FB8AD",
    "#7FB7BE",
    "#5D8AA8",
    "#778899",
    "#C8BFE7",
  ],
  SUMMER_MUTED: [
    "#95A5A6",
    "#BDC3C7",
    "#A6B4A6",
    "#8F9E8B",
    "#708090",
    "#778899",
    "#8A9A86",
    "#9CAEA9",
    "#B2BEB5",
    "#B0C4DE",
    "#A1CAF1",
    "#87A96B",
    "#C2B280",
    "#BCB88A",
    "#D3B3B3",
    "#C8A2C8",
    "#B57EDC",
    "#A89F91",
    "#8C92AC",
    "#967BB6",
  ],
  SUMMER_COOL: [
    "#2E4053",
    "#34495E",
    "#5D6D7E",
    "#85929E",
    "#AEB6BF",
    "#1F618D",
    "#2980B9",
    "#5499C7",
    "#7FB3D5",
    "#A9CCE3",
    "#48C9B0",
    "#76D7C4",
    "#A3E4D7",
    "#BB8FCE",
    "#D2B4DE",
    "#F1948A",
    "#EC7063",
    "#7B7D7D",
    "#4682B4",
    "#B0E0E6",
  ],
  AUTUMN_SOFT: [
    "#9A7D0A",
    "#B7950B",
    "#D4AC0D",
    "#F4D03F",
    "#196F3D",
    "#229954",
    "#52BE80",
    "#A9DFBF",
    "#BA4A00",
    "#DC7633",
    "#E59866",
    "#F0B27A",
    "#A04000",
    "#CA6F1E",
    "#E67E22",
    "#F39C12",
    "#EDBB99",
    "#F6DDCC",
    "#C2B280",
    "#8A9A86",
  ],
  AUTUMN_TRUE: [
    "#B8651A",
    "#A0522D",
    "#8B4513",
    "#CD853F",
    "#D2691E",
    "#DAA520",
    "#B8860B",
    "#9B7B3C",
    "#6B8E23",
    "#556B2F",
    "#8FBC8F",
    "#2E8B57",
    "#BC8F8F",
    "#7B3F00",
    "#5C4033",
    "#C04000",
    "#E2725B",
    "#996515",
    "#704214",
    "#A0431B",
  ],
  AUTUMN_DEEP: [
    "#4A235A",
    "#154360",
    "#0E6251",
    "#145A32",
    "#7D6608",
    "#78281F",
    "#1B2631",
    "#2C3E50",
    "#512E5F",
    "#1A5276",
    "#117864",
    "#196F3D",
    "#9A7D0A",
    "#784212",
    "#6E2C00",
    "#7B241C",
    "#1C2833",
    "#212F3D",
    "#3E2723",
    "#4E342E",
  ],
  AUTUMN_WARM: [
    "#D35400",
    "#E67E22",
    "#CA6F1E",
    "#A04000",
    "#873600",
    "#6E2C00",
    "#BA4A00",
    "#DC7633",
    "#E59866",
    "#D4AC0D",
    "#B7950B",
    "#9A7D0A",
    "#7D6608",
    "#145A32",
    "#196F3D",
    "#229954",
    "#27AE60",
    "#52BE80",
    "#8B4513",
    "#A0522D",
  ],
  WINTER_DEEP: [
    "#1B2631",
    "#2C3E50",
    "#17202A",
    "#212F3D",
    "#4A235A",
    "#512E5F",
    "#0E4D92",
    "#002FA7",
    "#0B3C5D",
    "#1D2731",
    "#050505",
    "#1C1C1C",
    "#2D2D2D",
    "#3D3D3D",
    "#4A0E17",
    "#641E16",
    "#78281F",
    "#0B5345",
    "#0E6251",
    "#301934",
  ],
  WINTER_CLEAR: [
    "#FF0000",
    "#FF1493",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#8B00FF",
    "#FF00FF",
    "#FFFFFF",
    "#000000",
    "#39FF14",
    "#00E5FF",
    "#76FF03",
    "#FF007F",
    "#1F1F1F",
    "#4D4D4D",
    "#E6E6E6",
    "#1A1A1A",
    "#FF0055",
    "#00FFCC",
    "#330066",
  ],
  WINTER_TRUE: [
    "#000080",
    "#191970",
    "#000033",
    "#1C39BB",
    "#0F52BA",
    "#B22222",
    "#8B0000",
    "#4B0082",
    "#800080",
    "#660066",
    "#9400D3",
    "#008B8B",
    "#005F5F",
    "#00008B",
    "#FFFFFF",
    "#000000",
    "#C71585",
    "#DC143C",
    "#6A5ACD",
    "#2F4F4F",
  ],
  WINTER_COOL: [
    "#1F3A52",
    "#2E5B82",
    "#417CA3",
    "#69A0C3",
    "#003366",
    "#4B0082",
    "#483D8B",
    "#4A154B",
    "#6B114D",
    "#8A1C5A",
    "#B11B56",
    "#800020",
    "#004B49",
    "#005C53",
    "#042940",
    "#000000",
    "#1C1C1C",
    "#7F8C8D",
    "#FFFFFF",
    "#E0F7FA",
  ],
};

export const SEASON_KEYS = [
  "SPRING_LIGHT",
  "SPRING_TRUE",
  "SPRING_BRIGHT",
  "SPRING_WARM",
  "SUMMER_LIGHT",
  "SUMMER_TRUE",
  "SUMMER_MUTED",
  "SUMMER_COOL",
  "AUTUMN_SOFT",
  "AUTUMN_TRUE",
  "AUTUMN_DEEP",
  "AUTUMN_WARM",
  "WINTER_CLEAR",
  "WINTER_TRUE",
  "WINTER_DEEP",
  "WINTER_COOL",
] as const;
export type SeasonKey = (typeof SEASON_KEYS)[number];

export type StaticSeasonSpec = Pick<
  DetailedColorProfile,
  | "season"
  | "subSeason"
  | "toneType"
  | "brightness"
  | "saturation"
  | "contrastScale"
  | "primarySwatches"
  | "secondarySwatches"
  | "avoidColors"
  | "beautyMap"
  | "fabrication"
  | "accessories"
  | "denimRegistry"
>;

export const SEASONS_MASTER_DATA: Record<SeasonKey, StaticSeasonSpec> = {
  SPRING_LIGHT: {
    season: "Spring",
    subSeason: "Spring Light / PCCS Light & Soft",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "High Lightness",
    saturation: "Low-Mid Saturation",
    contrastScale: "Low Contrast",
    primarySwatches: [
      { hex: "#FFB3A7", name: "Warm Peach Blush" },
      { hex: "#FFD1A9", name: "Soft Apricot" },
      { hex: "#FFF3CD", name: "Buttermilk Chiffon" },
      { hex: "#D4EDDA", name: "Light Pistachio Mint" },
    ],
    secondarySwatches: [
      { hex: "#FDF5E6", name: "Warm Cream Ivory" },
      { hex: "#FFC0CB", name: "Light Coral Pink" },
      { hex: "#E0F7FA", name: "Soft Aquamarine" },
      { hex: "#E8DAEF", name: "Gentle Lavender-Pink" },
    ],
    avoidColors: [
      "Pure High-Contrast Black (drops heavy shadow lines on delicate features)",
      "Stark Bleached White (creates excessive facial contrast shadows)",
      "Vivid Primary Tones (overpower the soft expression matrix)",
    ],
    beautyMap: {
      hair: "Light milk chocolate brown, honey blonde highlights, or bright warm amber.",
      lip: "Clear peach gloss, warm coral tints, or soft salmon pink.",
      base: "Luminous ivory with a warm peach or golden undertone (dewy finish).",
    },
    fabrication: ["Chiffon & Organza", "Fine Knit Cotton", "Lightweight Linen"],
    accessories: ["Polished 14k Yellow Gold", "Warm Rose Gold", "Delicate Seed Pearls"],
    denimRegistry: ["Soft Bleached Blue Denim", "Pure Light Gray Denim"],
  },
  SPRING_TRUE: {
    season: "Spring",
    subSeason: "Spring True / Pure Warm Clarity",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "High Lightness",
    saturation: "High Saturation",
    contrastScale: "Medium Contrast",
    primarySwatches: [
      { hex: "#FFB347", name: "Sunlit Apricot" },
      { hex: "#FF7F50", name: "Warm Coral" },
      { hex: "#FFD166", name: "Golden Marigold" },
      { hex: "#40E0D0", name: "Warm Turquoise" },
    ],
    secondarySwatches: [
      { hex: "#FFA500", name: "Pure Tangerine" },
      { hex: "#9ACD32", name: "Clear Leaf Green" },
      { hex: "#FFB6C1", name: "Warm Pink Coral" },
      { hex: "#FAD7A0", name: "Buttery Honey" },
    ],
    avoidColors: [
      "Hazy Smoky Gray (cancels the sunlit clarity)",
      "Pure Stark Black (overwhelms the radiant warmth)",
      "Icy Cool Blue (clashes with the golden baseline)",
    ],
    beautyMap: {
      hair: "Warm honey blonde, sunlit caramel, or radiant golden brown.",
      lip: "Warm coral or sunlit peach gloss.",
      base: "Golden luminous demi-dewy finish with peach undertone.",
    },
    fabrication: ["Crisp Cotton Poplin", "Soft Pebbled Leather", "Fine Warm Silk"],
    accessories: ["Polished Yellow Gold", "Sunlit Amber", "Warm Carnelian Stone"],
    denimRegistry: ["Bright Warm Indigo", "Sunlit Mid-Wash Blue"],
  },
  SPRING_BRIGHT: {
    season: "Spring",
    subSeason: "Spring Bright / Clear Spring",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "High Lightness",
    saturation: "High Saturation",
    contrastScale: "High Contrast",
    primarySwatches: [
      { hex: "#FF3B30", name: "Vivid Coral Red" },
      { hex: "#FFCC00", name: "Sunshine Yellow" },
      { hex: "#4CD964", name: "Clear Emerald" },
      { hex: "#5AC8FA", name: "Bright Sky Aqua" },
    ],
    secondarySwatches: [
      { hex: "#FF9500", name: "Tangerine Pop" },
      { hex: "#FF2D55", name: "Hot Watermelon" },
      { hex: "#007AFF", name: "Electric Cobalt" },
      { hex: "#FFD700", name: "Pure Gold Glow" },
    ],
    avoidColors: [
      "Dusty Muted Mauve (deadens the clear vibrant glow)",
      "Ashy Beige Neutrals (turn the complexion sallow)",
      "Hazy Smoke Gray (cancels the striking eye sparkle)",
    ],
    beautyMap: {
      hair: "Bright warm chestnut, golden caramel, or vivid honey gold.",
      lip: "Bright coral or warm true red, vibrant peach blush.",
      base: "Glass-skin radiant, slightly golden, demi-dewy finish.",
    },
    fabrication: ["Smooth Patent Leather", "High-Shine Silk", "Crisp Poplin Cotton"],
    accessories: ["Polished Bright Yellow Gold", "Lacquered Enamel", "Clear Cut Crystal"],
    denimRegistry: ["Bright Medium-Wash Blue", "Crisp White Denim"],
  },
  SPRING_WARM: {
    season: "Spring",
    subSeason: "Spring Warm / True Spring",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "Medium Lightness",
    saturation: "High Saturation",
    contrastScale: "Medium Contrast",
    primarySwatches: [
      { hex: "#E67E22", name: "Sunlit Pumpkin" },
      { hex: "#F1C40F", name: "Warm Mustard" },
      { hex: "#2ECC71", name: "Fresh Leaf Green" },
      { hex: "#1ABC9C", name: "Warm Turquoise" },
    ],
    secondarySwatches: [
      { hex: "#FF8C00", name: "Dark Apricot" },
      { hex: "#CD853F", name: "Honey Tan" },
      { hex: "#D2691E", name: "Cinnamon Brown" },
      { hex: "#F5DEB3", name: "Wheat Cream" },
    ],
    avoidColors: [
      "Icy Cool Pink (clashes with the golden undertone)",
      "Pure Black (overwhelms the warm vitality)",
      "Cool Slate Blue (drains the sunny glow)",
    ],
    beautyMap: {
      hair: "Warm chestnut, copper auburn, or sun-kissed honey.",
      lip: "Rich terracotta or warm apricot, golden bronze gloss.",
      base: "Golden bronzed natural finish with warm brown mascara.",
    },
    fabrication: ["Pebble-Grain Tan Leather", "Warm Wool Twill", "Soft Brushed Cotton"],
    accessories: ["Heavy Yellow Gold", "Solid Unpolished Brass", "Natural Wooden Beads"],
    denimRegistry: ["Warm Tobacco-Wash Denim", "Honey-Tinted Indigo"],
  },
  SUMMER_LIGHT: {
    season: "Summer",
    subSeason: "Summer Light / Icy Pastel Summer",
    toneType: "Cool Tone (Blue Base)",
    brightness: "High Lightness",
    saturation: "Low-Mid Saturation",
    contrastScale: "Low Contrast",
    primarySwatches: [
      { hex: "#FADBD8", name: "Soft Cool Rose" },
      { hex: "#D7BDE2", name: "Powder Lilac" },
      { hex: "#A9CCE3", name: "Misty Blue" },
      { hex: "#A2D9CE", name: "Pale Seafoam" },
    ],
    secondarySwatches: [
      { hex: "#EBDEF0", name: "Whisper Mauve" },
      { hex: "#E8F8F5", name: "Frosted Mint" },
      { hex: "#EBF5FB", name: "Glacier White" },
      { hex: "#F5CBA7", name: "Cool Peach Cream" },
    ],
    avoidColors: [
      "Burnt Orange (clashes with the cool milky undertone)",
      "Pure Black (overpowers the airy complexion)",
      "Mustard Yellow (turns the skin sallow)",
    ],
    beautyMap: {
      hair: "Ash blonde, cool platinum, or pale rose taupe.",
      lip: "Soft cool pink gloss or dusty rose.",
      base: "Pale porcelain matte with cool pink undertone.",
    },
    fabrication: ["Sheer Organza", "Washed Linen", "Soft Brushed Cashmere"],
    accessories: ["Brushed White Gold", "Satin-Finish Sterling Silver", "Freshwater Pearls"],
    denimRegistry: ["Cool Light-Wash Blue", "Pale Sky Denim"],
  },
  SUMMER_TRUE: {
    season: "Summer",
    subSeason: "Summer True / Pure Cool Clarity",
    toneType: "Cool Tone (Blue Base)",
    brightness: "Medium Lightness",
    saturation: "Low-Mid Saturation",
    contrastScale: "Medium Contrast",
    primarySwatches: [
      { hex: "#7395B6", name: "Periwinkle Sky" },
      { hex: "#D8BFD8", name: "Soft Orchid" },
      { hex: "#F4A6C1", name: "Cool Rose Pink" },
      { hex: "#5D8AA8", name: "Slate Blue" },
    ],
    secondarySwatches: [
      { hex: "#A29BFE", name: "Lavender Mist" },
      { hex: "#9FB8AD", name: "Sage Mineral" },
      { hex: "#C8BFE7", name: "Cool Wisteria" },
      { hex: "#E59ABF", name: "Berry Rose" },
    ],
    avoidColors: [
      "Warm Orange (clashes with the cool baseline)",
      "Earthy Olive Brown (drains the rosy glow)",
      "Pure Stark Black (overpowers the soft clarity)",
    ],
    beautyMap: {
      hair: "Soft ash brown, cool walnut, or pale rose-blonde.",
      lip: "Cool rose or soft mauve-pink gloss.",
      base: "Porcelain demi-matte with rose-cool undertone.",
    },
    fabrication: ["Fine Silk Crepe", "Light Merino Wool", "Cool Cotton Voile"],
    accessories: ["Brushed White Gold", "Freshwater Pearls", "Cool Amethyst"],
    denimRegistry: ["Cool Indigo Wash", "Soft Periwinkle Denim"],
  },
  SUMMER_MUTED: {
    season: "Summer",
    subSeason: "Summer Muted / Soft Summer",
    toneType: "Cool Tone (Blue Base)",
    brightness: "Medium Lightness",
    saturation: "Low-Mid Saturation",
    contrastScale: "Low Contrast",
    primarySwatches: [
      { hex: "#95A5A6", name: "Hazy Slate" },
      { hex: "#BDC3C7", name: "Smoke Pearl" },
      { hex: "#6C3483", name: "Muted Plum" },
      { hex: "#2874A6", name: "Dusty Denim Blue" },
    ],
    secondarySwatches: [
      { hex: "#566573", name: "Cool Pewter" },
      { hex: "#85929E", name: "Foggy Steel" },
      { hex: "#D6DBDF", name: "Cloud Gray" },
      { hex: "#F5B7B1", name: "Soft Dusty Rose" },
    ],
    avoidColors: [
      "Bright Neon Tones (overwhelm the hazy softness)",
      "Pure Black & White Combo (creates too much harsh contrast)",
      "Warm Orange (clashes with the cool muted undertone)",
    ],
    beautyMap: {
      hair: "Mushroom brown, ash taupe, or muted rose blonde.",
      lip: "Muted mauve or dusty berry, cool taupe contour.",
      base: "Velvet satin finish with neutral-cool undertone.",
    },
    fabrication: ["Soft Suede", "Heathered Cashmere", "Brushed Wool Flannel"],
    accessories: ["Matte Platinum", "Antique Vintage Silver", "Smoky Quartz"],
    denimRegistry: ["Faded Mid-Wash Denim", "Stone-Washed Gray"],
  },
  SUMMER_COOL: {
    season: "Summer",
    subSeason: "Summer Cool / True Summer",
    toneType: "Cool Tone (Blue Base)",
    brightness: "Medium Lightness",
    saturation: "Low-Mid Saturation",
    contrastScale: "Medium Contrast",
    primarySwatches: [
      { hex: "#2980B9", name: "Slate Ocean" },
      { hex: "#5499C7", name: "Crisp Cornflower" },
      { hex: "#48C9B0", name: "Cool Turquoise" },
      { hex: "#BB8FCE", name: "Cool Orchid" },
    ],
    secondarySwatches: [
      { hex: "#2E4053", name: "Deep Slate" },
      { hex: "#7FB3D5", name: "Powder Sky" },
      { hex: "#D2B4DE", name: "Soft Wisteria" },
      { hex: "#F1948A", name: "Cool Coral Berry" },
    ],
    avoidColors: [
      "Warm Mustard Yellow (clashes with the cool blue undertone)",
      "Earthy Rust Orange (drains the rosy complexion)",
      "Olive Green (turns the skin tone muddy)",
    ],
    beautyMap: {
      hair: "Ash brown, cool walnut, or rose-tinted dark blonde.",
      lip: "Classic cool berry or cool orchid pink.",
      base: "Crisp demi-matte porcelain with cool pink undertone.",
    },
    fabrication: ["Smooth Silk Jersey", "Fine Merino Wool", "Cool Cotton Voile"],
    accessories: ["Polished White Gold", "High-Luster Sterling Silver", "Cool Blue Sapphire"],
    denimRegistry: ["Classic Cool Indigo", "Slate Blue Denim"],
  },
  AUTUMN_SOFT: {
    season: "Autumn",
    subSeason: "Autumn Soft / Hazy Earth",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "Medium Lightness",
    saturation: "Low-Mid Saturation",
    contrastScale: "Low Contrast",
    primarySwatches: [
      { hex: "#B7950B", name: "Hazy Olive Gold" },
      { hex: "#52BE80", name: "Soft Moss Green" },
      { hex: "#DC7633", name: "Toasted Terracotta" },
      { hex: "#E59866", name: "Warm Camel" },
    ],
    secondarySwatches: [
      { hex: "#F4D03F", name: "Soft Maize" },
      { hex: "#A9DFBF", name: "Faded Sage" },
      { hex: "#EDBB99", name: "Light Khaki Peach" },
      { hex: "#F6DDCC", name: "Warm Sand Beige" },
    ],
    avoidColors: [
      "Icy Cool Pink (clashes with the earthy undertone)",
      "Stark Pure White (creates harsh facial contrast)",
      "Bright Neon Tones (overpower the soft, hazy palette)",
    ],
    beautyMap: {
      hair: "Warm caramel, toasted hazelnut, or soft auburn.",
      lip: "Warm nude or muted brick rose with toasted cinnamon blush.",
      base: "Soft velvet finish with olive-warm undertone.",
    },
    fabrication: ["Soft Brushed Cords", "Washed Utility Canvas", "Heathered Wool"],
    accessories: ["Matte Brass", "Brushed Yellow Gold", "Tigers Eye Stone"],
    denimRegistry: ["Warm Stone-Washed Denim", "Soft Khaki Brown"],
  },
  AUTUMN_TRUE: {
    season: "Autumn",
    subSeason: "Autumn True / Pure Earthy Warm",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "Medium Lightness",
    saturation: "High Saturation",
    contrastScale: "Medium Contrast",
    primarySwatches: [
      { hex: "#B8651A", name: "Burnished Sienna" },
      { hex: "#A0522D", name: "Saddle Russet" },
      { hex: "#DAA520", name: "Goldenrod Spice" },
      { hex: "#556B2F", name: "Forest Olive" },
    ],
    secondarySwatches: [
      { hex: "#8B4513", name: "Walnut Brown" },
      { hex: "#CD853F", name: "Honey Tan" },
      { hex: "#2E8B57", name: "Pine Emerald" },
      { hex: "#BC8F8F", name: "Dusty Rose Clay" },
    ],
    avoidColors: [
      "Icy Pastel Pink (clashes with grounded warmth)",
      "Pure Black (too cold against the spice palette)",
      "Cool Slate Blue (drains the earthy glow)",
    ],
    beautyMap: {
      hair: "Warm chestnut, burnished copper, or rich amber-mahogany.",
      lip: "Burnished brick red or terracotta spice.",
      base: "Satin golden finish with warm caramel undertone.",
    },
    fabrication: ["Heavy Cotton Twill", "Oiled Saddle Leather", "Soft Brushed Wool"],
    accessories: ["Antique Brass", "Carved Tigers Eye", "Warm Hammered Bronze"],
    denimRegistry: ["Warm Tobacco Indigo", "Russet-Tinted Stone Wash"],
  },
  AUTUMN_DEEP: {
    season: "Autumn",
    subSeason: "Autumn Deep / Dark Autumn",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "Low Lightness",
    saturation: "High Saturation",
    contrastScale: "High Contrast",
    primarySwatches: [
      { hex: "#4A235A", name: "Aubergine Plum" },
      { hex: "#154360", name: "Midnight Petrol" },
      { hex: "#0E6251", name: "Pine Forest" },
      { hex: "#78281F", name: "Deep Brick Red" },
    ],
    secondarySwatches: [
      { hex: "#7D6608", name: "Dark Bronze" },
      { hex: "#512E5F", name: "Royal Mulberry" },
      { hex: "#1B2631", name: "Charcoal Onyx" },
      { hex: "#6E2C00", name: "Burnt Mahogany" },
    ],
    avoidColors: [
      "Pastel Pink (vanishes against the depth of features)",
      "Light Mint Green (clashes with the warm intensity)",
      "Powder Blue (washes out the rich complexion)",
    ],
    beautyMap: {
      hair: "Espresso brown, dark mahogany, or deep auburn.",
      lip: "Deep brick red or espresso brown with warm amber bronzer.",
      base: "Rich full-coverage with golden warm undertone.",
    },
    fabrication: ["Heavy Alligator Leather", "Structured Wool Tweed", "Dense Velvet"],
    accessories: ["Antique Bronze", "Heavy 18k Hammered Gold", "Smoky Topaz"],
    denimRegistry: ["Dark Indigo Raw Denim", "Espresso Brown Denim"],
  },
  AUTUMN_WARM: {
    season: "Autumn",
    subSeason: "Autumn Warm / True Autumn",
    toneType: "Warm Tone (Yellow Base)",
    brightness: "Medium Lightness",
    saturation: "High Saturation",
    contrastScale: "Medium Contrast",
    primarySwatches: [
      { hex: "#D35400", name: "Pumpkin Spice" },
      { hex: "#CA6F1E", name: "Burnt Sienna" },
      { hex: "#D4AC0D", name: "Ochre Gold" },
      { hex: "#196F3D", name: "Forest Pine" },
    ],
    secondarySwatches: [
      { hex: "#A04000", name: "Russet Brown" },
      { hex: "#9A7D0A", name: "Antique Brass" },
      { hex: "#27AE60", name: "Moss Emerald" },
      { hex: "#E59866", name: "Spiced Apricot" },
    ],
    avoidColors: [
      "Cool Icy Blue (clashes with the earthy warmth)",
      "Hot Magenta Pink (fights the spice palette)",
      "Pure Black (too harsh for the warm depth)",
    ],
    beautyMap: {
      hair: "Rich copper, deep auburn, or warm mahogany.",
      lip: "Burnt orange or pumpkin spice with rich ochre.",
      base: "Warm satin finish with heavy golden undertone.",
    },
    fabrication: ["Thick Shearling", "Heavy Cable Knit", "Pebbled Suede"],
    accessories: ["Raw Copper", "Natural Wood Grain", "Carved Amber"],
    denimRegistry: ["Rust-Tinted Denim", "Warm Mid-Brown Wash"],
  },
  WINTER_DEEP: {
    season: "Winter",
    subSeason: "Winter Deep / Dark Winter",
    toneType: "Cool Tone (Blue Base)",
    brightness: "Low Lightness",
    saturation: "High Saturation",
    contrastScale: "High Contrast",
    primarySwatches: [
      { hex: "#1B2631", name: "Midnight Onyx" },
      { hex: "#4A235A", name: "Royal Aubergine" },
      { hex: "#0E4D92", name: "Deep Sapphire" },
      { hex: "#4A0E17", name: "Black Cherry" },
    ],
    secondarySwatches: [
      { hex: "#17202A", name: "Cool Jet" },
      { hex: "#002FA7", name: "True Cobalt" },
      { hex: "#512E5F", name: "Dark Plum" },
      { hex: "#641E16", name: "Cool Burgundy" },
    ],
    avoidColors: [
      "Soft Pastel Peach (vanishes against the contrast)",
      "Warm Camel Beige (clashes with the cool depth)",
      "Dusty Olive (drains the porcelain glow)",
    ],
    beautyMap: {
      hair: "Jet black, deep espresso, or cool dark walnut.",
      lip: "Deep plum, midnight blackberry, or dark cherry.",
      base: "Flawless high-contrast porcelain with cool undertone.",
    },
    fabrication: ["Heavy Velvet", "Structured Brocade", "Polished Leather"],
    accessories: ["Polished Gunmetal", "Dark Obsidian Silver", "Onyx & Hematite"],
    denimRegistry: ["Pure Black Raw Denim", "Deep Indigo Selvedge"],
  },
  WINTER_CLEAR: {
    season: "Winter",
    subSeason: "Winter Clear / Crystal Winter",
    toneType: "Cool Tone (Blue Base)",
    brightness: "Medium Lightness",
    saturation: "High Saturation",
    contrastScale: "High Contrast",
    primarySwatches: [
      { hex: "#FF0000", name: "Pure Crimson" },
      { hex: "#FF1493", name: "Electric Fuchsia" },
      { hex: "#00FFFF", name: "Neon Cyan" },
      { hex: "#8B00FF", name: "Vivid Violet" },
    ],
    secondarySwatches: [
      { hex: "#FFFFFF", name: "Pure Snow White" },
      { hex: "#000000", name: "True Jet Black" },
      { hex: "#0000FF", name: "Electric Blue" },
      { hex: "#39FF14", name: "Brilliant Lime" },
    ],
    avoidColors: [
      "Hazy Muted Tones (cancel the crystal clarity)",
      "Warm Beige Neutrals (drain the cool sparkle)",
      "Dusty Earth Browns (turn the complexion flat)",
    ],
    beautyMap: {
      hair: "Crisp jet black, cool dark brunette, or icy platinum.",
      lip: "Electric fuchsia or high-shine crimson red.",
      base: "Ultra-bright clear porcelain with diamond highlighter.",
    },
    fabrication: ["Glossy Latex", "Structural Neoprene", "Crisp Mirror Silk"],
    accessories: ["Polished Brilliant Diamond", "Mirror-Finish White Gold", "Clear Crystal"],
    denimRegistry: ["Pure Bright White Denim", "Crisp Inky Black Denim"],
  },
  WINTER_TRUE: {
    season: "Winter",
    subSeason: "Winter True / Pure Cool Jewel",
    toneType: "Cool Tone (Blue Base)",
    brightness: "Medium Lightness",
    saturation: "High Saturation",
    contrastScale: "High Contrast",
    primarySwatches: [
      { hex: "#000080", name: "True Navy" },
      { hex: "#B22222", name: "Pure Ruby" },
      { hex: "#4B0082", name: "Royal Indigo" },
      { hex: "#008B8B", name: "Jewel Teal" },
    ],
    secondarySwatches: [
      { hex: "#191970", name: "Midnight Blue" },
      { hex: "#C71585", name: "Jewel Magenta" },
      { hex: "#FFFFFF", name: "Pure Snow White" },
      { hex: "#000000", name: "True Jet Black" },
    ],
    avoidColors: [
      "Warm Mustard Gold (clashes with the cool baseline)",
      "Earthy Camel Tan (drains the jewel-tone glow)",
      "Hazy Dusty Mauve (cancels the clarity)",
    ],
    beautyMap: {
      hair: "True jet black, cool dark brunette, or polished platinum.",
      lip: "True ruby red or jewel magenta with cool berry blush.",
      base: "Snowy porcelain with cool blue-pink undertone.",
    },
    fabrication: ["Heavy Silk Satin", "Fine Grain Leather", "Crisp Cool Wool"],
    accessories: ["Polished Platinum", "Brilliant Diamond Cut", "Sapphire Stone"],
    denimRegistry: ["Crisp True Indigo", "Pure Inky Black Denim"],
  },
  WINTER_COOL: {
    season: "Winter",
    subSeason: "Winter Cool / True Winter",
    toneType: "Cool Tone (Blue Base)",
    brightness: "Medium Lightness",
    saturation: "High Saturation",
    contrastScale: "High Contrast",
    primarySwatches: [
      { hex: "#1F3A52", name: "Royal Navy" },
      { hex: "#4B0082", name: "Imperial Indigo" },
      { hex: "#B11B56", name: "Jewel Magenta" },
      { hex: "#800020", name: "Royal Ruby" },
    ],
    secondarySwatches: [
      { hex: "#003366", name: "Deep Marine" },
      { hex: "#004B49", name: "Jewel Emerald" },
      { hex: "#FFFFFF", name: "Snow White" },
      { hex: "#000000", name: "True Black" },
    ],
    avoidColors: [
      "Warm Golden Yellow (clashes with the icy undertone)",
      "Earthy Rust Brown (drains the jewel-toned glow)",
      "Muted Olive Green (dulls the crisp contrast)",
    ],
    beautyMap: {
      hair: "Cool jet black, icy ash brunette, or platinum silver.",
      lip: "Deep royal ruby red or magenta with icy pink blush.",
      base: "Snowy white velvet matte with cool pink undertone.",
    },
    fabrication: ["Liquid Silk Satin", "Heavy Grain Leather", "Crisp Cool Wool"],
    accessories: ["Brilliant Platinum", "Solid Silver Chunks", "Cool Diamond Cut"],
    denimRegistry: ["Crisp Cool Indigo", "Icy Light Blue Denim"],
  },
};

export function matrixForSubSeason(season: Season, subSeason: string): string[] {
  const s = (subSeason || "").toLowerCase();
  if (season === "Spring") {
    if (s.includes("bright") || s.includes("clear")) return SEASON_HEX_MATRIX.SPRING_BRIGHT;
    if (s.includes("true")) return SEASON_HEX_MATRIX.SPRING_TRUE;
    if (s.includes("warm")) return SEASON_HEX_MATRIX.SPRING_WARM;
    return SEASON_HEX_MATRIX.SPRING_LIGHT;
  }
  if (season === "Summer") {
    if (s.includes("muted") || s.includes("soft")) return SEASON_HEX_MATRIX.SUMMER_MUTED;
    if (s.includes("true")) return SEASON_HEX_MATRIX.SUMMER_TRUE;
    if (s.includes("cool")) return SEASON_HEX_MATRIX.SUMMER_COOL;
    return SEASON_HEX_MATRIX.SUMMER_LIGHT;
  }
  if (season === "Autumn") {
    if (s.includes("deep") || s.includes("dark")) return SEASON_HEX_MATRIX.AUTUMN_DEEP;
    if (s.includes("true")) return SEASON_HEX_MATRIX.AUTUMN_TRUE;
    if (s.includes("warm")) return SEASON_HEX_MATRIX.AUTUMN_WARM;
    return SEASON_HEX_MATRIX.AUTUMN_SOFT;
  }
  if (s.includes("deep") || s.includes("dark")) return SEASON_HEX_MATRIX.WINTER_DEEP;
  if (s.includes("bright") || s.includes("clear")) return SEASON_HEX_MATRIX.WINTER_CLEAR;
  if (s.includes("true")) return SEASON_HEX_MATRIX.WINTER_TRUE;
  return SEASON_HEX_MATRIX.WINTER_COOL;
}

export interface SeasonalPaletteSpec {
  key: string;
  season: Season;
  label: string;
  characteristics: string;
  palette: string[];
  makeup: string;
  styling: string;
}

export const MASTER_SEASONAL_PALETTES: Record<string, SeasonalPaletteSpec> = {
  "spring-light": {
    key: "spring-light",
    season: "Spring",
    label: "Spring Light",
    characteristics: "High Lightness, Soft Warmth, Delicate Clarity",
    palette: SEASON_HEX_MATRIX.SPRING_LIGHT,
    makeup: "Clear peach gloss, soft salmon pink, luminous ivory base.",
    styling: "Chiffon, fine cotton knits, polished 14k yellow gold, seed pearls.",
  },
  "spring-bright": {
    key: "spring-bright",
    season: "Spring",
    label: "Spring Bright (Clear Spring)",
    characteristics: "High Saturation, Striking Clarity, Vivid Warmth",
    palette: SEASON_HEX_MATRIX.SPRING_BRIGHT,
    makeup: "Bright coral or warm red lip, vibrant peach blush, glass-skin radiant base.",
    styling: "Smooth patent leather, high-shine silks, highly polished bright yellow gold.",
  },
  "spring-true": {
    key: "spring-true",
    season: "Spring",
    label: "Spring True",
    characteristics: "Pure Warm Spring Vitality, Medium Clarity, Sunlit Brightness",
    palette: SEASON_HEX_MATRIX.SPRING_TRUE,
    makeup: "Warm coral lip, sunlit peach blush, golden luminous base.",
    styling: "Crisp poplin, soft pebbled leather, polished yellow gold, sunlit amber accents.",
  },
  "spring-warm": {
    key: "spring-warm",
    season: "Spring",
    label: "Spring Warm",
    characteristics: "Pure Warmth, Medium-High Saturation, Sunny Vitality",
    palette: SEASON_HEX_MATRIX.SPRING_WARM,
    makeup: "Rich terracotta or warm apricot lip, golden bronzed base, warm brown mascara.",
    styling:
      "Pebble-grain tan leather, warm wooden accents, solid unpolished brass, heavy yellow gold.",
  },
  "summer-light": {
    key: "summer-light",
    season: "Summer",
    label: "Summer Light",
    characteristics: "High Lightness, Icy Coolness, Milky Pastels",
    palette: SEASON_HEX_MATRIX.SUMMER_LIGHT,
    makeup: "Soft cool pink gloss, dusty rose blush, pale porcelain matte base.",
    styling: "Sheer organza, washed linen, brushed white gold, satin-finish sterling silver.",
  },
  "summer-muted": {
    key: "summer-muted",
    season: "Summer",
    label: "Summer Muted (Soft Summer)",
    characteristics: "Low Saturation, Ashy/Hazy Tones, Soft Coolness",
    palette: SEASON_HEX_MATRIX.SUMMER_MUTED,
    makeup: "Muted mauve or dusty berry lip, cool taupe contour, velvet satin base.",
    styling: "Soft suede, heathered cashmere, matte platinum, antique vintage silver.",
  },
  "summer-true": {
    key: "summer-true",
    season: "Summer",
    label: "Summer True",
    characteristics: "Pure Cool Summer Clarity, Medium Lightness, Rose & Periwinkle Base",
    palette: SEASON_HEX_MATRIX.SUMMER_TRUE,
    makeup: "Cool rose lip, soft orchid blush, porcelain demi-matte base.",
    styling: "Fine silk crepe, light merino wool, brushed white gold, freshwater pearls.",
  },
  "summer-cool": {
    key: "summer-cool",
    season: "Summer",
    label: "Summer Cool",
    characteristics: "Pure Coolness, Medium Clarity, Slate/Oceanic Tones",
    palette: SEASON_HEX_MATRIX.SUMMER_COOL,
    makeup:
      "Classic berry or cool orchid lip, soft lavender highlight, crisp demi-matte porcelain base.",
    styling:
      "Smooth silk jersey, fine merino wool, polished white gold, high-luster sterling silver.",
  },
  "autumn-soft": {
    key: "autumn-soft",
    season: "Autumn",
    label: "Autumn Soft",
    characteristics: "Low Saturation, Earthy Warmth, Hazy Olive/Khaki",
    palette: SEASON_HEX_MATRIX.AUTUMN_SOFT,
    makeup: "Warm nude lip, toasted cinnamon blush, soft velvet olive-undertone base.",
    styling: "Soft brushed cords, washed utility canvas, matte brass, brushed yellow gold.",
  },
  "autumn-true": {
    key: "autumn-true",
    season: "Autumn",
    label: "Autumn True",
    characteristics: "Pure Earthy Warmth, Medium Saturation, Forest & Spice Baseline",
    palette: SEASON_HEX_MATRIX.AUTUMN_TRUE,
    makeup: "Burnished brick lip, warm sienna blush, satin golden base.",
    styling: "Heavy cotton twill, oiled saddle leather, antique brass, carved tigers eye.",
  },
  "autumn-deep": {
    key: "autumn-deep",
    season: "Autumn",
    label: "Autumn Deep (Dark Autumn)",
    characteristics: "Low Lightness, Rich Dark Contrast, Heavy Warmth",
    palette: SEASON_HEX_MATRIX.AUTUMN_DEEP,
    makeup:
      "Deep brick red or espresso brown lip, warm amber bronzer, rich full-coverage gold base.",
    styling:
      "Heavy alligator leather, structured wool tweeds, antique bronze, heavy 18k hammered gold.",
  },
  "autumn-warm": {
    key: "autumn-warm",
    season: "Autumn",
    label: "Autumn Warm",
    characteristics: "Pure Earthy Warmth, Spicy Saturation, Forest Shades",
    palette: SEASON_HEX_MATRIX.AUTUMN_WARM,
    makeup: "Burnt orange, pumpkin spice or rich ochre lip, heavy warm ginger blush.",
    styling: "Thick shearling, heavy cable knits, raw copper, natural wood grain elements.",
  },
  "winter-deep": {
    key: "winter-deep",
    season: "Winter",
    label: "Winter Deep (Dark Winter)",
    characteristics: "Low Lightness, Extreme Dark Contrast, Midnight Coolness",
    palette: SEASON_HEX_MATRIX.WINTER_DEEP,
    makeup:
      "Deep plum, midnight blackberry or dark cherry lip, flawless high-contrast porcelain base.",
    styling: "Heavy velvet, thick structured brocade, polished gunmetal, dark obsidian silver.",
  },
  "winter-clear": {
    key: "winter-clear",
    season: "Winter",
    label: "Winter Clear",
    characteristics: "High Saturation, Neon-Crisp Clarity, Striking Contrast",
    palette: SEASON_HEX_MATRIX.WINTER_CLEAR,
    makeup:
      "Electric fuchsia or high-shine crimson red lip, crisp diamond highlighter, ultra-bright clear base.",
    styling:
      "Glossy latex, stiff structural neoprene, polished brilliant diamonds, mirror-finish white gold.",
  },
  "winter-true": {
    key: "winter-true",
    season: "Winter",
    label: "Winter True",
    characteristics: "Pure Cool Jewel Tones, High Contrast, Royal Saturation",
    palette: SEASON_HEX_MATRIX.WINTER_TRUE,
    makeup: "True ruby red lip, cool berry blush, snowy porcelain base.",
    styling: "Heavy silk satin, polished platinum, fine grain leather, brilliant diamond cut.",
  },
  "winter-cool": {
    key: "winter-cool",
    season: "Winter",
    label: "Winter Cool",
    characteristics: "Pure Icy Coolness, High Contrast, Royal/Jewel Tones",
    palette: SEASON_HEX_MATRIX.WINTER_COOL,
    makeup: "Deep royal ruby red or magenta lip, icy pink blush, snowy white velvet base.",
    styling:
      "Liquid silk satin, premium heavy grain leather, brilliant platinum, solid silver chunks.",
  },
};

export const MOOD_COLLECT_DEFAULT: DetailedColorProfile = {
  season: "Spring",

  subSeason: "Spring Soft / PCCS Light & Soft",

  toneType: "Warm Tone (Yellow Base)",

  brightness: "High Lightness",

  saturation: "Low-Mid Saturation",

  contrastScale: "Low Contrast",

  faceShape: "Diamond Geometry",

  bodyType: "Inverted Triangle",

  primarySwatches: [
    { hex: "#FFB3A7", name: "Warm Peach Blush" },

    { hex: "#FFD1A9", name: "Soft Apricot" },

    { hex: "#FFF3CD", name: "Buttermilk Chiffon" },

    { hex: "#D4EDDA", name: "Light Pistachio Mint" },
  ],

  secondarySwatches: [
    { hex: "#FDF5E6", name: "Warm Cream Ivory" },

    { hex: "#FFC0CB", name: "Light Coral Pink" },

    { hex: "#E0F7FA", name: "Soft Aquamarine" },

    { hex: "#E8DAEF", name: "Gentle Lavender-Pink" },
  ],

  accentSwatches: [
    { hex: "#FFA07A", name: "Light Salmon Coral" },

    { hex: "#AED5FA", name: "Warm Sky Blue" },

    { hex: "#F2A172", name: "Soft Salmon Apricot" },
  ],

  avoidColors: [
    "Pure High-Contrast Black (Swallows delicate features and drops heavy shadow lines)",

    "Stark Bleached White (Creates excessive facial contrast shadows)",

    "Strong / Vivid Primary Tones (Completely overpowers the soft expression matrix)",
  ],

  beautyMap: {
    hair: "Light milk chocolate brown, honey blonde highlights, or bright warm amber tones. Avoid ashy or jet black colors.",

    lip: "Clear peach gloss, warm coral tints, or soft salmon pink.",

    base: "Clear, luminous ivory with a warm peach or golden undertone (Dewy finish).",
  },

  fabrication: ["Chiffon & Organza", "Fine Knit Cotton", "Lightweight Linen"],

  accessories: ["Polished 14k Yellow Gold", "Warm Rose Gold", "Delicate Seed Pearls"],

  denimRegistry: ["Soft Bleached Blue Denim", "Pure Dark Gray Denim"],

  stylistNote:
    "Studio Diagnostic: Your canvas thrives on high lightness paired with delicate, low-to-medium saturation. Warm milk-pastels instantly clear away surface shadows and lift the jaw parameters effortlessly, maintaining a natural, lit-from-within glow.",

  fullPalette: SEASON_HEX_MATRIX.SPRING_LIGHT,
};

export type StudioTelemetry = {
  pass1Raw: { ambientLighting: string; biologicalUndertone: string; computedContrast: string };
  interceptTriggered: boolean;
  gatekeeperNotes: string[];
  pass2OverrideInputs: {
    ambientLighting: string;
    biologicalUndertone: string;
    computedContrast: string;
    sensorClippingEvent: boolean;
  };
  forcedDiagnostic: boolean;
  source?: "live" | "stress-test" | "manual";
};
export const SEASON_PALETTES: Record<Season, { tagline: string }> = {
  Spring: { tagline: "Warm, luminous clarity — sunlit honey, fresh coral, lifted apricot." },
  Summer: { tagline: "Cool, ash-filtered softness — dusty rose, fog blue, mineral lilac." },
  Autumn: { tagline: "Warm, grounded saturation — burnished gold, terracotta, deep olive." },
  Winter: { tagline: "Cool, high-pigment clarity — true crimson, ink navy, glacial white." },
};

export const SEASON_EDUCATION: Record<Season, string> = {
  Spring:
    "Spring complexions glow under warm, light-filled palettes. Embrace clarity over darkness, and let sun-kissed pastels lift your features.",
  Summer:
    "Summer skin reads best in cool, muted, and softly blended tones. Think misted lavender, ash rose, and powder blue.",
  Autumn:
    "Autumn thrives on rich, earthy depth. Ground yourself in burnished gold, warm olive, and spiced rust.",
  Winter:
    "Winter demands crisp, high-contrast drama. True jewel tones and stark blacks and whites create unforgettable impact.",
};

export const SEASON_DETAIL: Record<
  Season,
  { primary: Swatch[]; secondary: Swatch[]; accent: Swatch[]; avoid: string[]; beauty: string[] }
> = {
  Spring: {
    primary: [
      { hex: "#FFE5A8", name: "Light Cream" },
      { hex: "#F7B7A3", name: "Peach Pastel" },
      { hex: "#FFE0B2", name: "Milky Apricot" },
      { hex: "#C8E6C9", name: "Soft Mint" },
    ],
    secondary: [
      { hex: "#F5F5F0", name: "Dull Ivory" },
      { hex: "#B0BEC5", name: "Soft Fog Grey" },
      { hex: "#D7CCC8", name: "Chalk Camel" },
      { hex: "#E0F2F1", name: "Clear Ice Aqua" },
    ],
    accent: [
      { hex: "#FF8C61", name: "Warm Coral" },
      { hex: "#4DB6AC", name: "Sage Teal" },
      { hex: "#FFB74D", name: "Pastel Mandarin" },
    ],
    avoid: ["High-Contrast Black", "Bleached White", "Vivid Primaries"],
    beauty: [
      "Hair: Warm Honey Blonde, Soft Chestnut, Golden Brown",
      "Lip: Peach Gloss, Warm Coral Tint, Apricot Balm",
      "Base: No. 21 Warm Dewy Foundation, Luminous BB Cream",
    ],
  },
  Summer: {
    primary: [
      { hex: "#B0BEC5", name: "Fog Blue" },
      { hex: "#D8BFD8", name: "Dusty Lilac" },
      { hex: "#F5F5F0", name: "Soft Ivory" },
      { hex: "#A5D6A7", name: "Powder Sage" },
    ],
    secondary: [
      { hex: "#E0F2F1", name: "Ice Aqua" },
      { hex: "#F8BBD0", name: "Rose Quartz" },
      { hex: "#CFD8DC", name: "Silver Mist" },
      { hex: "#E1BEE7", name: "Muted Orchid" },
    ],
    accent: [
      { hex: "#7986CB", name: "Periwinkle" },
      { hex: "#80CBC4", name: "Seafoam" },
      { hex: "#CE93D8", name: "Soft Amethyst" },
    ],
    avoid: ["Orange-Red Saturated Tones", "Warm Earth Brown", "Neon or Highly Fluorescent Hues"],
    beauty: [
      "Hair: Ash Blonde, Soft Pearl Brown, Cool Espresso",
      "Lip: Dusty Rose, Cool Pink, Mauve Tint",
      "Base: No. 21 Cool Porcelain Foundation, Matte Velvet Finish",
    ],
  },
  Autumn: {
    primary: [
      { hex: "#D4A24C", name: "Burnished Gold" },
      { hex: "#C97B3D", name: "Terracotta" },
      { hex: "#8D6E63", name: "Deep Camel" },
      { hex: "#5B7053", name: "Olive Moss" },
    ],
    secondary: [
      { hex: "#3E2723", name: "Coffee Bean" },
      { hex: "#5D4037", name: "Rich Umber" },
      { hex: "#A1887F", name: "Taupe Stone" },
      { hex: "#D7CCC8", name: "Warm Sand" },
    ],
    accent: [
      { hex: "#BF360C", name: "Burnt Sienna" },
      { hex: "#F9A825", name: "Antique Gold" },
      { hex: "#33691E", name: "Forest Pine" },
    ],
    avoid: ["Cool Pastel Pink", "Icy Blue Tones", "Bright White Near the Face"],
    beauty: [
      "Hair: Rich Auburn, Warm Chocolate, Caramel Highlights",
      "Lip: Brick Red, Warm Berry, Cinnamon Tint",
      "Base: No. 23 Warm Beige Foundation, Satin Finish",
    ],
  },
  Winter: {
    primary: [
      { hex: "#1A237E", name: "Ink Navy" },
      { hex: "#B71C1C", name: "True Crimson" },
      { hex: "#FFFFFF", name: "Glacial White" },
      { hex: "#4A148C", name: "Deep Amethyst" },
    ],
    secondary: [
      { hex: "#212121", name: "Charcoal" },
      { hex: "#C0C0C0", name: "Platinum" },
      { hex: "#000000", name: "Pure Black" },
      { hex: "#880E4F", name: "Burgundy" },
    ],
    accent: [
      { hex: "#00BCD4", name: "Electric Turquoise" },
      { hex: "#E91E63", name: "Fuchsia" },
      { hex: "#FFEA00", name: "Citrine" },
    ],
    avoid: ["Muted Beige or Camel", "Soft Pastel Orange", "Dusty or Washed-Out Tones"],
    beauty: [
      "Hair: Jet Black, Platinum Silver, Cool Ash Brown",
      "Lip: True Red, Fuchsia, Berry Stain",
      "Base: No. 17 - No. 19 Cool Ivory Foundation, Full Coverage Matte",
    ],
  },
};

export const AESTHETIC_MOODS: Array<{ id: string; name: string; desc: string; img: string }> = [
  {
    id: "minimal",
    name: "Quiet Minimal",
    desc: "Clean lines, restrained palette, architectural silhouettes.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=300&fit=crop",
  },
  {
    id: "romantic",
    name: "Soft Romantic",
    desc: "Flowing fabrics, delicate details, muted florals.",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=300&fit=crop",
  },
  {
    id: "edgy",
    name: "Urban Edge",
    desc: "Leather, hardware, monochrome, confident structure.",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=300&fit=crop",
  },
  {
    id: "preppy",
    name: "Classic Preppy",
    desc: "Tailored blazers, crisp shirts, timeless polish.",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=300&fit=crop",
  },
  {
    id: "boho",
    name: "Modern Boho",
    desc: "Layered textures, earth tones, effortless movement.",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=300&fit=crop",
  },
  {
    id: "glam",
    name: "Old Hollywood Glam",
    desc: "Silk, satin, statement accessories, dramatic elegance.",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200&h=300&fit=crop",
  },
];

export const BODY_TYPE_INFO: Record<BodyType, { tagline: string; description: string }> = {
  Hourglass: {
    tagline: "Balanced curves with a defined waist.",
    description:
      "Your shoulders and hips are roughly equal, with a noticeably narrower waist. Emphasize your waistline with fitted styles, wrap dresses, and belted silhouettes. Avoid boxy cuts that hide your natural curve.",
  },
  Rectangle: {
    tagline: "A straight, athletic silhouette.",
    description:
      "Your shoulders, waist, and hips are fairly aligned. Create curves with ruffles, peplum, and structured jackets. High-waisted bottoms and layered tops add dimension to your frame.",
  },
  Pear: {
    tagline: "Narrower shoulders, fuller hips.",
    description:
      "Your hips are wider than your shoulders. Balance your silhouette by drawing attention upward with statement necklines, structured shoulders, and eye-catching tops. A-line skirts work beautifully.",
  },
  "Inverted Triangle": {
    tagline: "Broader shoulders, narrower hips.",
    description:
      "Your shoulders are wider than your hips. Soften the upper body with V-necks and fluid fabrics, while adding volume below with flared pants and A-line skirts.",
  },
  Apple: {
    tagline: "Weight centered in the midsection.",
    description:
      "Your midsection is your fullest area with slimmer legs and hips. Draw the eye upward with empire waists and open necklines, while highlighting your legs with straight or slim-cut trousers.",
  },
};

export const UNDERTONES = ["Cool", "Warm", "Neutral"] as const;
export const SEASONS = ["Spring", "Summer", "Autumn", "Winter"] as const;
export const BODIES = ["Hourglass", "Rectangle", "Pear", "Inverted Triangle", "Apple"] as const;
export const FACE_SHAPES = ["Oval", "Round", "Square", "Heart", "Diamond", "Oblong"] as const;
export const HAIR_TYPES = ["Straight/Fine", "Wavy", "Curly", "Coily/Textured"] as const;

export const FACE_SHORT_TO_FULL: Record<string, DetailedColorProfile["faceShape"]> = {
  Oval: "Oval Frame",
  Diamond: "Diamond Geometry",
  Square: "Square Frame",
  Round: "Round Frame",
  Heart: "Heart Frame",
  Long: "Long Frame",
};
export const FACE_FULL_TO_SHORT: Record<string, string> = Object.fromEntries(
  Object.entries(FACE_SHORT_TO_FULL).map(([k, v]) => [v, k]),
);
export const CONTRAST_SHORT_TO_FULL: Record<string, DetailedColorProfile["contrastScale"]> = {
  "Low Contrast": "Low Contrast",
  "Medium Contrast": "Medium Contrast",
  "High Contrast": "High Contrast",
};
export const CONTRAST_FULL_TO_SHORT: Record<string, string> = {
  "Low Contrast": "Low Contrast",
  "Medium Contrast": "Medium Contrast",
  "High Contrast": "High Contrast",
};

export function seasonTone(s: Season): DetailedColorProfile["toneType"] {
  return (["Spring", "Autumn"] as Season[]).includes(s)
    ? "Warm Tone (Yellow Base)"
    : "Cool Tone (Blue Base)";
}
export function seasonBrightness(s: Season): DetailedColorProfile["brightness"] {
  if (s === "Spring" || s === "Summer") return "High Lightness";
  if (s === "Winter") return "Medium Lightness";
  return "Low Lightness";
}
export function seasonSaturation(s: Season): DetailedColorProfile["saturation"] {
  return s === "Winter" ? "High Saturation" : "Low-Mid Saturation";
}

export function splitBeauty(b: string, fallback: string): string {
  const idx = b.indexOf(":");
  return idx >= 0 ? b.slice(idx + 1).trim() : b || fallback;
}
export type MatrixOption = { value: string; title: string; description: string };

export const BODY_OPTIONS: MatrixOption[] = [
  {
    value: "Inverted Triangle",
    title: "Inverted Triangle",
    description: "A confident shoulder line that softens gently toward the hip.",
  },
  {
    value: "Hourglass",
    title: "Hourglass",
    description: "Shoulders and hips that echo each other, drawn in at the waist.",
  },
  {
    value: "Pear",
    title: "Pear",
    description: "A graceful lower silhouette with a softer shoulder line.",
  },
  {
    value: "Rectangle",
    title: "Rectangle",
    description: "A long, even line from shoulder to hip — clean and architectural.",
  },
  {
    value: "Apple",
    title: "Apple",
    description:
      "Volume that sits beautifully through the middle, balanced by slim wrists and ankles.",
  },
];

export const BEAUTY_PREFERENCE_TAGS = [
  "Dewy Base",
  "Glass Skin",
  "Monochromatic Peach",
  "Minimalist",
  "Bold Lip",
  "Blurred Velvet Finish",
  "Soft Smoke",
  "Editorial Brow",
  "Lacquered Lash",
  "Skin-First",
] as const;
export type Tone = "Cool" | "Warm" | "Neutral";
export const MANUAL_SEASON_GROUPS: {
  season: Season;
  keys: { key: keyof typeof SEASONS_MASTER_DATA; label: string }[];
}[] = [
  {
    season: "Spring",
    keys: [
      { key: "SPRING_LIGHT", label: "Spring Light" },
      { key: "SPRING_BRIGHT", label: "Spring Bright" },
      { key: "SPRING_WARM", label: "Spring Warm" },
    ],
  },
  {
    season: "Summer",
    keys: [
      { key: "SUMMER_LIGHT", label: "Summer Light" },
      { key: "SUMMER_MUTED", label: "Summer Muted" },
      { key: "SUMMER_COOL", label: "Summer Cool" },
    ],
  },
  {
    season: "Autumn",
    keys: [
      { key: "AUTUMN_SOFT", label: "Autumn Soft" },
      { key: "AUTUMN_TRUE", label: "Autumn True" },
      { key: "AUTUMN_DEEP", label: "Autumn Deep" },
      { key: "AUTUMN_WARM", label: "Autumn Warm" },
    ],
  },
  {
    season: "Winter",
    keys: [
      { key: "WINTER_DEEP", label: "Winter Deep" },
      { key: "WINTER_CLEAR", label: "Winter Clear" },
      { key: "WINTER_TRUE", label: "Winter True" },
      { key: "WINTER_COOL", label: "Winter Cool" },
    ],
  },
];

export const KNOWN_SEASON_GROUPS: {
  season: Season;
  tiles: { id: string; label: string; key: keyof typeof SEASONS_MASTER_DATA }[];
}[] = [
  {
    season: "Spring",
    tiles: [
      { id: "spring-light", label: "Light Spring", key: "SPRING_LIGHT" },
      { id: "spring-true", label: "True Spring", key: "SPRING_TRUE" },
      { id: "spring-bright", label: "Bright Spring", key: "SPRING_BRIGHT" },
      { id: "spring-warm", label: "Warm Spring", key: "SPRING_WARM" },
    ],
  },
  {
    season: "Summer",
    tiles: [
      { id: "summer-light", label: "Light Summer", key: "SUMMER_LIGHT" },
      { id: "summer-true", label: "True Summer", key: "SUMMER_TRUE" },
      { id: "summer-muted", label: "Muted Summer", key: "SUMMER_MUTED" },
      { id: "summer-cool", label: "Cool Summer", key: "SUMMER_COOL" },
    ],
  },
  {
    season: "Autumn",
    tiles: [
      { id: "autumn-soft", label: "Soft Autumn", key: "AUTUMN_SOFT" },
      { id: "autumn-true", label: "True Autumn", key: "AUTUMN_TRUE" },
      { id: "autumn-deep", label: "Deep Autumn", key: "AUTUMN_DEEP" },
      { id: "autumn-warm", label: "Warm Autumn", key: "AUTUMN_WARM" },
    ],
  },
  {
    season: "Winter",
    tiles: [
      { id: "winter-clear", label: "Clear Winter", key: "WINTER_CLEAR" },
      { id: "winter-true", label: "True Winter", key: "WINTER_TRUE" },
      { id: "winter-deep", label: "Deep Winter", key: "WINTER_DEEP" },
      { id: "winter-cool", label: "Cool Winter", key: "WINTER_COOL" },
    ],
  },
];
