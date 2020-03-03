import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor() { }
  private missionConfirmedSource = new Subject<string>();
  private missionAnnouncedSource = new Subject<string>();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  confirmMission(param) {
    this.missionConfirmedSource.next(param);
  }
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
}
