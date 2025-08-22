export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  member_ids?: string[];
  is_mock?: boolean;
}

export interface HealthLog {
  id: string;
  user_id: string;
  type: 'weight' | 'blood_pressure' | 'temperature' | 'period' | 'medication' | 'exercise';
  value: string;
  notes?: string;
  date: Date;
  member_id: string;
  is_mock?: boolean;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  date: Date;
  category?: string;
  is_mock?: boolean;
}

export interface Member {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  age?: number;
  avatar?: string;
  height?: number;
  weight?: number;
  gender?: 'male' | 'female' | 'other';
  blood_group?: string;
  blood_pressure?: string;
  health_status?: string;
  diseases?: string;
  allergies?: string;
  health_goals?: string;
  food_preferences?: string[];
  taste_preferences?: string[];
  hobbies?: string[];
  phone?: string;
  notes?: string;
  is_mock?: boolean;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: Date;
  assigned_to?: string;
  priority: 'low' | 'medium' | 'high';
  is_mock?: boolean;
}

export interface Reminder {
  id:string;
  user_id: string;
  title: string;
  date: Date;
  completed: boolean;
  notes?: string;
  is_mock?: boolean;
}

export interface Recipe {
  id: string;
  user_id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cooking_time: number;
  servings: number;
  category: string;
  saved: boolean;
  is_mock?: boolean;
}

export interface CalendarMode {
  type: 'transaction' | 'notes' | 'health' | 'show';
  label: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  renewal_date: Date;
  category: 'Entertainment' | 'Utilities' | 'Work' | 'Other';
  is_mock?: boolean;
}

export interface PantryItem {
  id: string;
  user_id: string;
  name: string;
  quantity: number;
  unit: 'kg' | 'g' | 'l' | 'ml' | 'pcs' | 'unit';
  expiry_date?: Date;
  is_mock?: boolean;
}

export interface Document {
  id: string;
  user_id: string;
  name: string;
  category: 'ID' | 'Passport' | 'Medical' | 'Financial' | 'Education' | 'Other';
  upload_date: Date;
  file_url?: string;
  is_mock?: boolean;
}

export interface PeriodLog {
  id: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
  symptoms: string[];
  notes?: string;
  is_mock?: boolean;
}
