import { Component, Input } from "@angular/core";

@Component({
  selector: "app-no-data",
  standalone: true,
  imports: [],
  templateUrl: "./no-data.component.html",
})
export class NoDataComponent {
  @Input() icon = "ri-close-line";
  @Input() message = "No data available";
}
