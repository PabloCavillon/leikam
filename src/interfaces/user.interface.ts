export type UserRole = 'Admin' | 'Technician' | 'Client' | 'God';

export interface User {
  id: string; 
  username: string;
  password: string;
  role: UserRole;
  active: boolean;
}