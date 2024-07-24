import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [],
  templateUrl: "./loading.component.html",
})
export class LoadingComponent {
  @Input() content = "Loading ...";
}
