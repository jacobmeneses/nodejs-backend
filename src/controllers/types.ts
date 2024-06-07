import { Request } from 'express';

export interface IUser {
  id: number;
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export function diffDays(date1: any, date2: any, { abs = true } = {}) {
  // Parse the dates
  const dt1 : any = new Date(date1);
  const dt2 : any= new Date(date2);

  // Calculate the time difference in milliseconds
  const timeDiff = abs ? Math.abs(dt2 - dt1) : dt2 - dt1;

  // Convert time difference from milliseconds to days
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return diffDays;
}
