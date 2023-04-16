export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      weatherCard: {
        Row: {
          cityId: number;
          cityName: string;
          latitude: number;
          longitude: number;
          order: number;
          userId: string;
        };
        Insert: {
          cityId: number;
          cityName: string;
          latitude: number;
          longitude: number;
          order: number;
          userId: string;
        };
        Update: {
          cityId?: number;
          cityName?: string;
          latitude?: number;
          longitude?: number;
          order?: number;
          userId?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
