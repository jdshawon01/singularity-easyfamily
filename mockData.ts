import { faker } from '@faker-js/faker';
import { Transaction, HealthLog, Note, Member, Task, Subscription, PantryItem, Document, Reminder, PeriodLog } from '../types';

export const generateMockData = () => {
  const members: Member[] = [
    { id: 'mock-1', user_id: 'guest', name: 'Abir Ahmed', relationship: 'Husband', age: 35, height: 175, weight: 78, gender: 'male', blood_group: 'O+', is_mock: true },
    { id: 'mock-2', user_id: 'guest', name: 'Sumaiya Ahmed', relationship: 'Wife', age: 32, height: 160, weight: 58, gender: 'female', blood_group: 'A+', is_mock: true },
    { id: 'mock-3', user_id: 'guest', name: 'Ayaan Ahmed', relationship: 'Son', age: 8, height: 130, weight: 30, gender: 'male', blood_group: 'O+', is_mock: true },
  ];

  const transactions: Transaction[] = Array.from({ length: 20 }, (_, i) => {
    const type = faker.helpers.arrayElement<'income' | 'expense'>(['income', 'expense']);
    return {
      id: faker.string.uuid(),
      user_id: 'guest',
      type,
      amount: faker.number.int({ min: 50, max: 5000 }),
      category: type === 'income' ? 'Salary' : faker.helpers.arrayElement(['Food & Dining', 'Transportation', 'Utilities', 'Shopping']),
      description: faker.finance.transactionDescription(),
      date: faker.date.recent({ days: 30 }),
      member_ids: [faker.helpers.arrayElement(members.map(m => m.id))],
      is_mock: true,
    };
  });

  const healthLogs: HealthLog[] = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    user_id: 'guest',
    type: faker.helpers.arrayElement(['weight', 'exercise', 'medication']),
    value: faker.helpers.arrayElement(['75 kg', '30 mins', 'Vitamin D']),
    notes: faker.lorem.sentence(),
    date: faker.date.recent({ days: 30 }),
    member_id: faker.helpers.arrayElement(members.map(m => m.id)),
    is_mock: true,
  }));

  const tasks: Task[] = [
    { id: 'mock-t1', user_id: 'guest', title: 'Pay electricity bill', completed: false, priority: 'high', due_date: new Date('2025-08-25'), assigned_to: 'mock-1', is_mock: true },
    { id: 'mock-t2', user_id: 'guest', title: 'Buy groceries', completed: false, priority: 'medium', due_date: new Date('2025-08-23'), is_mock: true },
    { id: 'mock-t3', user_id: 'guest', title: 'Ayaan\'s school meeting', completed: true, priority: 'high', due_date: new Date('2025-08-20'), assigned_to: 'mock-2', is_mock: true },
    { id: 'mock-t4', user_id: 'guest', title: 'Plan weekend trip', completed: false, priority: 'low', is_mock: true },
  ];
  
  const reminders: Reminder[] = [
    { id: 'mock-r1', user_id: 'guest', title: 'Doctor\'s Appointment', date: new Date('2025-08-28T10:00:00'), completed: false, is_mock: true },
    { id: 'mock-r2', user_id: 'guest', title: 'Submit insurance claim', date: new Date('2025-08-30T17:00:00'), completed: false, is_mock: true },
  ];

  const subscriptions: Subscription[] = [
    { id: 'mock-s1', user_id: 'guest', name: 'Netflix', amount: 850, renewal_date: new Date('2025-09-10'), category: 'Entertainment', is_mock: true },
    { id: 'mock-s2', user_id: 'guest', name: 'Internet Bill', amount: 1200, renewal_date: new Date('2025-09-05'), category: 'Utilities', is_mock: true },
    { id: 'mock-s3', user_id: 'guest', name: 'Spotify', amount: 450, renewal_date: new Date('2025-09-15'), category: 'Entertainment', is_mock: true },
  ];

  const pantryItems: PantryItem[] = [
    { id: 'mock-p1', user_id: 'guest', name: 'Rice', quantity: 5, unit: 'kg', is_mock: true },
    { id: 'mock-p2', user_id: 'guest', name: 'Lentils (Dal)', quantity: 1, unit: 'kg', is_mock: true },
    { id: 'mock-p3', user_id: 'guest', name: 'Onions', quantity: 2, unit: 'kg', is_mock: true },
    { id: 'mock-p4', user_id: 'guest', name: 'Eggs', quantity: 12, unit: 'pcs', expiry_date: new Date('2025-09-05'), is_mock: true },
    { id: 'mock-p5', user_id: 'guest', name: 'Milk', quantity: 1, unit: 'l', expiry_date: new Date('2025-08-25'), is_mock: true },
  ];

  const documents: Document[] = [
    { id: 'mock-d1', user_id: 'guest', name: 'Abir - NID Card', category: 'ID', upload_date: new Date('2025-01-15'), is_mock: true },
    { id: 'mock-d2', user_id: 'guest', name: 'Ayaan - Birth Certificate', category: 'ID', upload_date: new Date('2025-02-20'), is_mock: true },
    { id: 'mock-d3', user_id: 'guest', name: 'Apartment Rental Agreement', category: 'Financial', upload_date: new Date('2025-03-10'), is_mock: true },
  ];

  const periodLogs: PeriodLog[] = [
    { id: 'mock-pl1', user_id: 'guest', startDate: new Date('2025-07-20'), endDate: new Date('2025-07-24'), symptoms: ['Cramps', 'Bloating'], is_mock: true },
    { id: 'mock-pl2', user_id: 'guest', startDate: new Date('2025-06-22'), endDate: new Date('2025-06-26'), symptoms: ['Headache'], is_mock: true },
  ];

  const notes: Note[] = [];
  const recipes: Recipe[] = [];

  return { members, transactions, healthLogs, tasks, subscriptions, pantryItems, documents, notes, recipes, reminders, periodLogs };
};
