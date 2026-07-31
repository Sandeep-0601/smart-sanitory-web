export type ToiletStatus = 'Green' | 'Yellow' | 'Orange' | 'Red' | 'Blue';

export interface ToiletData {
  id: string;
  name: string;
  location: [number, number]; // lat, lng
  status: ToiletStatus;
  waterLevel: number; // 0-100
  dustbinLevel: number; // 0-100
  odourLevel: 'Low' | 'Medium' | 'High';
  temperature: number; // Celsius
  humidity: number; // 0-100
  occupancy: number; // count
  doorStatus: 'Open' | 'Closed';
  lightStatus: 'Working' | 'Faulty';
  lastCleaned: Date;
  cleanerAssigned?: string;
  aiScore: number; // 0-100
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Alert {
  id: string;
  toiletId: string;
  type: 'Water Low' | 'Dustbin Full' | 'Bad Odour' | 'Power Failure' | 'High Occupancy' | 'Complaint Received';
  message: string;
  timestamp: Date;
  status: 'Unread' | 'Read' | 'Resolved';
}

export interface CleanerTask {
  id: string;
  toiletId: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: number; // minutes
  status: 'Pending' | 'Accepted' | 'In Progress' | 'Completed';
}
