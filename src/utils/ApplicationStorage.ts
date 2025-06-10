import { ApplicationData, ApplicationStep, ApplicationStatus, UserProfile } from '../types/ApplicationTypes';

class ApplicationStorage {
  private static instance: ApplicationStorage;
  private storageKey = 'titleLoanApp';

  static getInstance(): ApplicationStorage {
    if (!ApplicationStorage.instance) {
      ApplicationStorage.instance = new ApplicationStorage();
    }
    return ApplicationStorage.instance;
  }

  saveApplication(applicationData: ApplicationData): void {
    const data = this.getAllData();
    data.applications[applicationData.id] = applicationData;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getApplication(applicationId: string): ApplicationData | null {
    const data = this.getAllData();
    return data.applications[applicationId] || null;
  }

  getUserApplication(userId: string): ApplicationData | null {
    const data = this.getAllData();
    return Object.values(data.applications).find(app => app.userId === userId) || null;
  }

  saveUser(user: UserProfile): void {
    const data = this.getAllData();
    data.users[user.id] = user;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getUser(userId: string): UserProfile | null {
    const data = this.getAllData();
    return data.users[userId] || null;
  }

  getUserByEmail(email: string): UserProfile | null {
    const data = this.getAllData();
    return Object.values(data.users).find(user => user.email === email) || null;
  }

  updateApplicationStep(applicationId: string, step: ApplicationStep, stepData: any): void {
    const data = this.getAllData();
    const application = data.applications[applicationId];
    
    if (application) {
      application.currentStep = step;
      if (!application.completedSteps.includes(step)) {
        application.completedSteps.push(step);
      }
      
      // Update specific step data
      switch (step) {
        case 'personal':
          application.personalInfo = { ...application.personalInfo, ...stepData };
          break;
        case 'income':
          application.incomeInfo = { ...application.incomeInfo, ...stepData };
          break;
        case 'vehicle':
          application.vehicleInfo = { ...application.vehicleInfo, ...stepData };
          break;
        case 'estimate':
          application.loanAmount = stepData.loanAmount;
          break;
      }
      
      application.updatedAt = new Date().toISOString();
      this.saveApplication(application);
    }
  }

  createApplication(userId: string, loanAmount: number = 4500): ApplicationData {
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const application: ApplicationData = {
      id: applicationId,
      userId,
      status: 'in_progress',
      currentStep: 'estimate',
      completedSteps: [],
      personalInfo: {},
      incomeInfo: {},
      vehicleInfo: {},
      loanAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.saveApplication(application);
    
    // Update user to have active application
    const user = this.getUser(userId);
    if (user) {
      user.hasActiveApplication = true;
      user.applicationId = applicationId;
      this.saveUser(user);
    }

    return application;
  }

  completeApplication(applicationId: string): void {
    const data = this.getAllData();
    const application = data.applications[applicationId];
    
    if (application) {
      application.status = 'completed';
      application.submittedAt = new Date().toISOString();
      application.updatedAt = new Date().toISOString();
      this.saveApplication(application);
    }
  }

  private getAllData(): { users: Record<string, UserProfile>, applications: Record<string, ApplicationData> } {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    return { users: {}, applications: {} };
  }

  clearAllData(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export default ApplicationStorage;