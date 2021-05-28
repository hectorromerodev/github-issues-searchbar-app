import { Component, OnInit } from '@angular/core';
import { DataService } from '@service/data.service';
import { Issue } from '@shared/interfaces/issue.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  issues$: Observable<Issue[]> = this.dataServ.issues$;
  constructor(
    private dataServ: DataService
  ) { }

  ngOnInit(): void {
  }

}
