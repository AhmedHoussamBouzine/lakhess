import { NgTemplateOutlet } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
  ButtonColors,
  ButtonSizes,
  buttonBaseClass,
  buttonColorClasses,
  buttonSizeClasses,
} from "./button.properties";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: "./button.component.html",
})
export class ButtonComponent implements OnInit {
  @Input() color: ButtonColors = "primary";
  @Input() size: ButtonSizes = "md";
  @Input() class: string = "";
  @Input() pill: boolean = false;
  @Input() preIcon: string | null = null;
  @Input() postIcon: string | null = null;
  @Input() type: "button" | "submit" | "reset" = "button";

  @Input()
  set disabled(value: boolean) {
    if (value) {
      this.buttonClasses += " opacity-50 pointer-events-none";
    } else {
      this.buttonClasses = this.buttonClasses.replace(
        " opacity-50 pointer-events-none",
        "",
      );
    }
  }

  buttonClasses = buttonBaseClass.join(" ");

  ngOnInit(): void {
    // Add custom classes
    this.buttonClasses += ` ${this.class}`;

    // Add color classes
    this.buttonClasses += ` ${buttonColorClasses[this.color].join(" ")}`;

    // Add size classes
    this.buttonClasses += ` ${buttonSizeClasses[this.size].join(" ")}`;

    // Add pill classes
    this.buttonClasses += this.pill ? " rounded-full" : " rounded-lg";
  }
}
