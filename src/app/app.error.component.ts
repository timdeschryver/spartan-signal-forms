import {Component} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-error',
  template: `
    <small class="text-[0.8rem] font-medium text-destructive"><ng-content/></small>
  `
})
export class AppErrorComponent {
}
