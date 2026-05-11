/**
 * Narrow WordPress REST shapes we accept. Headless setups vary; unknown fields are ignored.
 * Supports `_embed` for featured media and optional `acf` objects from ACF REST exposure.
 */
export interface WPRenderedField {
  rendered: string;
}

export interface WPMediaEmbed {
  source_url?: string;
  alt_text?: string;
}

export interface WPEmbedded {
  "wp:featuredmedia"?: WPMediaEmbed[];
}

export interface WPMenuPost {
  id: number;
  slug: string;
  title: WPRenderedField;
  excerpt?: WPRenderedField;
  content?: WPRenderedField;
  featured_media?: number;
  acf?: Record<string, unknown>;
  _embedded?: WPEmbedded;
}
