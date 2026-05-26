export interface Guest {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  tableNumber?: number;
  slug: string;
  rsvpStatus: "pending" | "confirmed" | "declined";
  inviteType?: "wedding" | "both-receptions" | "wedding-reception";
  plusOne?: boolean;
  mealPreference?: "veg" | "non-veg" | "vegan";
  message?: string;
  rsvpSubmittedAt?: Date;
  createdAt: Date;
}

export interface WeddingConfig {
  coupleNames: string;
  weddingDate: string;
  venue: string;
  venueMapUrl: string;
  story: string;
  heroImage: string;
  gallery: string[];
}
