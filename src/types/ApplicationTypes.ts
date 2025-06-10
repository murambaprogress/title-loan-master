export type ApplicationStep = 
  | 'login' 
  | 'signup' 
  | 'estimate' 
  | 'progress' 
  | 'verification'
  | 'personal'
  | 'income'
  | 'vehicle'
  | 'documents'
  | 'review'
  | 'complete';

export type ApplicationStatus = 
  | 'not_started'
  | 'in_progress'
  | 'pending_verification'
  | 'completed'
  | 'approved'
  | 'rejected';

export interface PersonalInfo {
  borrowAmount: string;
  firstName: string;
  lastName: string;
  socialSecurityNo: string;
  phoneNo: string;
  identificationNo: string;
  banksName: string;
  city: string;
  zipCode: string;
  emailAddress: string;
  identificationType: string;
  idIssuingAgency: string;
  dateOfBirth: string;
  homeStreetAddress: string;
  state: string;
}

export interface IncomeInfo {
  incomeSource: string;
  employmentDuration: string;
  totalGrossMonthlyIncome: string;
  paymentFrequency: string;
  nextPayDate: string;
  lastPayDate: string;
  activeBankruptcy: string;
  directDeposit: string;
  identificationNo: string;
  hasCoApplicant: boolean;
  coApplicantData?: {
    personalInfo: Partial<PersonalInfo>;
    incomeInfo: Partial<IncomeInfo>;
  };
}

export interface VehicleInfo {
  borrowAmount: string;
  vehicleInsuranceType: string;
  originalTitle: string;
  titleIssueDate: string;
  vehicleColor: string;
  plateTagCounty: string;
  confirmPlateTag: string;
  vin: string;
  yearOfCar: string;
  modelOfCar: string;
  odometerMileage: string;
  vehicleWorth: string;
  titleStatus: string;
  titleRemarks: string;
  titleNo: string;
  plateTagState: string;
  plateTag: string;
  plateTagType: string;
  reEnterVin: string;
  makeOfCar: string;
  styleOfCar: string;
  mileageVerification: string;
  vehicleType: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  estimatedValue: string;
}

export interface ApplicationData {
  id: string;
  userId: string;
  status: ApplicationStatus;
  currentStep: ApplicationStep;
  completedSteps: ApplicationStep[];
  personalInfo: Partial<PersonalInfo>;
  incomeInfo: Partial<IncomeInfo>;
  vehicleInfo: Partial<VehicleInfo>;
  loanAmount: number;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  hasActiveApplication: boolean;
  applicationId?: string;
  accountStatus: 'active' | 'pending' | 'suspended';
  createdAt: string;
}