// src/api/cityActivities.ts
export interface Activity {
  id: string;
  name: string;
  shortDescription?: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  pictures: string[];
  bookingLink: string;
  minimumDuration: string;
}
