import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '@service/data.service';
import { Issue } from '@shared/interfaces/issue.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  issues$: Observable<Issue[]> = this.dataServ.issues$;
  constructor(private dataServ: DataService) { }
}
