import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  template: `
  <footer>
    <p>
      {{message}}
      <a href="{{url}}" rel="noopener" target="_blank" >{{name}}</a>
    </p>
  </footer>
  `
})
export class FooterComponent implements OnInit {
  @Input() url: string = 'https://merakideveloper.com/';
  @Input() message: string = '© 2021, created by'
  @Input() name: string = 'Meraki Developer'

  constructor() { }

  ngOnInit(): void {
  }

}
