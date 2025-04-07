export interface Appointment {
    appointmentID?: number;
    patientID: number;
    doctorID: number;
    timeSlot: string; 
  }
  export interface AppointmentData {
    appointmentID?: number;
    patientID: number;
    doctorID: number;
    timeSlot: string;
    status: string;
  }