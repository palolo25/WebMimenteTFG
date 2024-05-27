export interface Appointment {
    id: string;
    id_user: string;
    id_prof: string;
    date: string | Date;
    start_time: string | Date;
    end_time: string | Date;
    price: number;
    state: string;
    created?: number;
    profName?: string;
    userName?: string;
    userEmail?: string;
    idProfile?:number;
    imgProf?: string;
    imgUser?: string;
  }