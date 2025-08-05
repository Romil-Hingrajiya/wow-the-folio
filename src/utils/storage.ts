import { PortfolioData } from '@/types/portfolio';

const STORAGE_KEY = 'portfolioData';

export const storage = {
  // Save portfolio data to localStorage
  savePortfolioData: (data: PortfolioData): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving portfolio data to localStorage:', error);
      }
    }
  },

  // Load portfolio data from localStorage
  loadPortfolioData: (): PortfolioData | null => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch (error) {
        console.error('Error loading portfolio data from localStorage:', error);
        return null;
      }
    }
    return null;
  },

  // Clear portfolio data from localStorage
  clearPortfolioData: (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error clearing portfolio data from localStorage:', error);
      }
    }
  },

  // Check if portfolio data exists in localStorage
  hasPortfolioData: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) !== null;
    }
    return false;
  }
}; 