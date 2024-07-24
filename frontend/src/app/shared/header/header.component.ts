import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  public router = inject(Router);


  constructor() {}

}
