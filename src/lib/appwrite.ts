import { Client, Account, Databases, ID } from 'appwrite';

// Initialize Appwrite client
export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67d92f36002f8cf36a7c');

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Authentication utilities
export const appwriteAuth = {
  // Create a new account
  createAccount: async (email: string, password: string, name: string) => {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      
      if (newAccount) {
        return await appwriteAuth.login(email, password);
      }
      
      return newAccount;
    } catch (error) {
      console.error('Appwrite error:', error);
      throw error;
    }
  },
  
  // Login with email and password
  login: async (email: string, password: string) => {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Login with GitHub
  loginWithGitHub: async (successUrl: string, failureUrl: string) => {
    try {
      return account.createOAuth2Session('github', successUrl, failureUrl);
    } catch (error) {
      console.error('GitHub login error:', error);
      throw error;
    }
  },
  
  // Get current user
  getCurrentUser: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const user = await appwriteAuth.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }
};
