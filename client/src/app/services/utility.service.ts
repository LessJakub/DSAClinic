import { Injectable } from '@angular/core';
import { Status } from '../shared/interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  labStatuses = ['New', 'In Progress', 'Awaiting Confirmation', 'Cancelled', 'Finished'];

  statusToText(status: Status): string {
    switch(status) {
      case Status.CANCELLED: return "Cancelled";
      case Status.FINISHED: return "Finished";
      case Status.IN_PROGRESS: return "In Progress";
      case Status.NEW: return "New";
    }
  }

  labStatusToText(status: number): string {
    
    return this.labStatuses[status];
  }

  prettyDateFromDate(time: Date): string {
    if(typeof(time) === 'string'){
      time = new Date(time);
    }

    return time?.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month:'2-digit',
      day: '2-digit',
    });
  }

  prettyTimeFromDate(time: Date): string {
    if(typeof(time) === 'string'){
      time = new Date(time);
    }

    return time?.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    });
  }

  localizeDate(date: Date): Date {
    if (date == null) {
      return null;
    }
    let local = new Date(date);
    local.setHours(local.getHours() + local.getTimezoneOffset() / -60);

    return local;
  }
}
