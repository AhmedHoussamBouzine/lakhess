import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  links = [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Terms of Service", path: "/terms-of-service" },
    { label: "Privacy Policy", path: "/privacy-policy" },
  ];
  currYear = new Date().getFullYear();
}
