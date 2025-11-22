import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Loan data types
export interface LoanData {
  id: number;
  item: string;
  borrower: string;
  borrowdate: string;
  expectedreturndate: string; 
  quantity: number;
  purpose: string;
  status: 'Aktif' | 'Dikembalikan';
  returndate: string | null; 
}


// Storage keys
const LOAN_STORAGE_KEY = 'sarpras_loans';

// Get all loans from localStorage
export function getLoans(): LoanData[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(LOAN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading loans:', error);
    return [];
  }
}

// Save a new loan to localStorage
export function saveLoan(loan: Omit<LoanData, 'id' | 'status'>): void {
  if (typeof window === 'undefined') return;
  try {
    const loans = getLoans();
    const newLoan: LoanData = {
      ...loan,
      id: Date.now(), // Simple ID generation
      status: 'Aktif',
    };
    loans.push(newLoan);
    localStorage.setItem(LOAN_STORAGE_KEY, JSON.stringify(loans));
  } catch (error) {
    console.error('Error saving loan:', error);
  }
}

// Update loan status (for return functionality if needed later)
export function updateLoanStatus(id: number, status: 'Aktif' | 'Dikembalikan', returnDate?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const loans = getLoans();
    const loanIndex = loans.findIndex(loan => loan.id === id);
    if (loanIndex !== -1) {
      loans[loanIndex].status = status;
      if (returnDate) loans[loanIndex].returndate = returnDate;
      localStorage.setItem(LOAN_STORAGE_KEY, JSON.stringify(loans));
    }
  } catch (error) {
    console.error('Error updating loan:', error);
  }
}
