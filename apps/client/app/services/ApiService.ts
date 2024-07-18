export class ApiService {
    static baseUrl = 'http://localhost:3100/api';
  
    static async fetchBranches() {
      const response = await fetch(`${this.baseUrl}/branches`);
      if (!response.ok) throw new Error('Error fetching branches');
      return response.json();
    }
  
    static async fetchParentItems() {
      const response = await fetch(`${this.baseUrl}/parent-items`);
      if (!response.ok) throw new Error('Error fetching parent items');
      return response.json();
    }
  }