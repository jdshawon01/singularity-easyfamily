import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { Transaction, HealthLog, Note, Member, Task, Recipe, Subscription, PantryItem, Document, Reminder, PeriodLog } from '../types';
import { generateMockData } from '../utils/mockData';
import { en, bn } from '../locales';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

type Language = 'en' | 'bn';
type Theme = 'light' | 'dark' | 'system';

interface AppState {
  theme: Theme;
  language: Language;
  activeSection: string;
  transactions: Transaction[];
  healthLogs: HealthLog[];
  notes: Note[];
  members: Member[];
  tasks: Task[];
  reminders: Reminder[];
  recipes: Recipe[];
  subscriptions: Subscription[];
  pantryItems: PantryItem[];
  documents: Document[];
  periodLogs: PeriodLog[];
  calendarMode: 'transaction' | 'notes' | 'health' | 'show';
  isInitialMockData: boolean;
  translations: Record<string, string>;
  session: Session | null;
  loading: boolean;
  userProfile: any | null;
}

type AppAction =
  | { type: 'SET_STATE'; payload: Partial<AppState> }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'ADD_ITEM'; payload: { item: any; table: keyof AppState } }
  | { type: 'UPDATE_ITEM'; payload: { item: any; table: keyof AppState } }
  | { type: 'DELETE_ITEM'; payload: { id: string; table: keyof AppState } }
  | { type: 'SET_CALENDAR_MODE'; payload: 'transaction' | 'notes' | 'health' | 'show' }
  | { type: 'CLEAR_MOCK_DATA' };

const initialState: AppState = {
  theme: 'dark',
  language: 'en',
  activeSection: 'dashboard',
  transactions: [],
  healthLogs: [],
  notes: [],
  members: [],
  tasks: [],
  reminders: [],
  recipes: [],
  subscriptions: [],
  pantryItems: [],
  documents: [],
  periodLogs: [],
  calendarMode: 'show',
  isInitialMockData: false,
  translations: en,
  session: null,
  loading: true,
  userProfile: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_STATE':
        return { ...state, ...action.payload };
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      return { ...state, language: action.payload, translations: action.payload === 'en' ? en : bn };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'ADD_ITEM': {
        const table = action.payload.table as keyof AppState;
        const currentItems = state[table] as any[];
        return { ...state, [table]: [action.payload.item, ...currentItems] };
    }
    case 'UPDATE_ITEM': {
        const table = action.payload.table as keyof AppState;
        const currentItems = state[table] as any[];
        return { ...state, [table]: currentItems.map(i => i.id === action.payload.item.id ? action.payload.item : i) };
    }
    case 'DELETE_ITEM': {
        const table = action.payload.table as keyof AppState;
        const currentItems = state[table] as any[];
        return { ...state, [table]: currentItems.filter(i => i.id !== action.payload.id) };
    }
    case 'SET_CALENDAR_MODE':
      return { ...state, calendarMode: action.payload };
    case 'CLEAR_MOCK_DATA':
        return {
            ...state,
            transactions: state.transactions.filter(i => !i.is_mock),
            healthLogs: state.healthLogs.filter(i => !i.is_mock),
            notes: state.notes.filter(i => !i.is_mock),
            members: state.members.filter(i => !i.is_mock),
            tasks: state.tasks.filter(i => !i.is_mock),
            reminders: state.reminders.filter(i => !i.is_mock),
            subscriptions: state.subscriptions.filter(i => !i.is_mock),
            pantryItems: state.pantryItems.filter(i => !i.is_mock),
            documents: state.documents.filter(i => !i.is_mock),
            periodLogs: state.periodLogs.filter(i => !i.is_mock),
            isInitialMockData: false,
        };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  t: (key: string) => string;
  addItem: (table: string, item: any) => Promise<any>;
  updateItem: (table: string, item: any) => Promise<any>;
  deleteItem: (table: string, id: string) => Promise<any>;
  setGuestMode: () => void;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedTheme) dispatch({ type: 'SET_THEME', payload: savedTheme });
    if (savedLang) dispatch({ type: 'SET_LANGUAGE', payload: savedLang });

    supabase.auth.getSession().then(({ data: { session } }) => {
        dispatch({ type: 'SET_STATE', payload: { session, loading: false } });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        dispatch({ type: 'SET_STATE', payload: { session } });
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = useCallback(async (userId: string) => {
    dispatch({ type: 'SET_STATE', payload: { loading: true } });
    try {
        const tables = ['members', 'transactions', 'health_logs', 'notes', 'tasks', 'reminders', 'subscriptions', 'pantry_items', 'documents', 'period_logs'];
        const results = await Promise.all(tables.map(table => supabase.from(table).select('*').eq('user_id', userId)));
        
        const newState: Partial<AppState> = {};
        tables.forEach((table, index) => {
            const key = table.replace(/_(\w)/g, (_, c) => c.toUpperCase());
            const formattedKey = key.endsWith('s') ? key : `${key}s`;
            newState[formattedKey as keyof AppState] = (results[index].data as any) || [];
        });

        dispatch({ type: 'SET_STATE', payload: { ...newState, loading: false, isInitialMockData: false } });
    } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: 'SET_STATE', payload: { loading: false } });
    }
  }, []);

  useEffect(() => {
    if (state.session) {
      fetchData(state.session.user.id);
    } else if (!state.loading && !state.session && !state.isInitialMockData) {
      // This handles the case where a user logs out or session expires
      // but prevents re-loading mock data if guest mode was explicitly set.
      setGuestMode();
    }
  }, [state.session, state.loading, state.isInitialMockData, fetchData]);

  const setGuestMode = () => {
    dispatch({type: 'SET_STATE', payload: {...generateMockData(), isInitialMockData: true, loading: false, session: null }});
  };

  const addItem = async (table: string, item: any) => {
    if (!state.session) { // Guest mode
      const newItem = { ...item, id: `mock_${Date.now()}`, is_mock: true };
      dispatch({ type: 'ADD_ITEM', payload: { item: newItem, table: `${table}s` as keyof AppState }});
      return newItem;
    }
    const itemWithUser = { ...item, user_id: state.session.user.id };
    delete itemWithUser.id; // Let Supabase generate ID
    const { data, error } = await supabase.from(table).insert(itemWithUser).select();
    if (error) throw error;
    dispatch({ type: 'ADD_ITEM', payload: { item: data[0], table: `${table}s` as keyof AppState }});
    return data[0];
  };

  const updateItem = async (table: string, item: any) => {
    if (item.is_mock) { // Guest mode
        dispatch({ type: 'UPDATE_ITEM', payload: { item, table: `${table}s` as keyof AppState }});
        return item;
    }
    if (!state.session) throw new Error("User not authenticated");
    const { data, error } = await supabase.from(table).update(item).eq('id', item.id).select();
    if (error) throw error;
    dispatch({ type: 'UPDATE_ITEM', payload: { item: data[0], table: `${table}s` as keyof AppState }});
    return data[0];
  };

  const deleteItem = async (table: string, id: string) => {
    const itemToDelete = (state[`${table}s` as keyof AppState] as any[]).find(i => i.id === id);
    if (itemToDelete?.is_mock) { // Guest mode
        dispatch({ type: 'DELETE_ITEM', payload: { id, table: `${table}s` as keyof AppState }});
        return;
    }
    if (!state.session) throw new Error("User not authenticated");
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    dispatch({ type: 'DELETE_ITEM', payload: { id, table: `${table}s` as keyof AppState }});
  };

  const t = (key: string): string => state.translations[key] || key;

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = state.theme === 'dark' || (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    document.querySelector('html')?.setAttribute('lang', state.language);
  }, [state.theme, state.language]);

  return (
    <AppContext.Provider value={{ state, dispatch, t, addItem, updateItem, deleteItem, setGuestMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
