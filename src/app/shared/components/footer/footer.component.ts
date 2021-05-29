import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer class="center">
    <p class="text-white">
      {{message}}
      <a href="{{url}}" rel="noopener" target="_blank" >{{name}}</a>
    </p>
  </footer>
  `
})
export class FooterComponent {
  @Input() url: string = 'https://merakideveloper.com/';
  @Input() message: string = '© 2021, created by'
  @Input() name: string = 'Meraki Developer'
}
