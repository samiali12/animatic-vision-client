export interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  role: "admin" | "user";
  created_at?: string;
  updated_at?: string;
}

