import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  inputAddonClass,
  inputBaseClass,
  InputSize,
  inputSizeClasses,
  InputType,
} from "./input.properties";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [],
  templateUrl: "./input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  @Input() input: InputType = "text";
  @Input() size: InputSize = "md";
  @Input() label: string | null = null;
  @Input() inputId: string = "";
  @Input() name: string = "";
  @Input() placeholder: string = "";
  @Input() options: { value: string; label: string }[] = [];
  @Input() multiple: boolean = false;
  @Input() required: boolean = false;
  @Input() preIcon: string | null = null;
  @Input() postIcon: string | null = null;
  @Input() addon: string | null = null;
  @Input() enablePasswordToggle: boolean = false;
  @Input() containerClass: string = "";
  @Input() rows: number = 3;
  @Input()
  set disabled(disabled: boolean) {
    this.inputClasses = disabled
      ? this.inputClasses + " opacity-50 pointer-events-none"
      : this.inputClasses.replace("opacity-50 pointer-events-none", "");
  }

  inputClasses = inputBaseClass.join(" ");
  addonClasses = inputAddonClass.join(" ");
  iconClasses = "";
  showPassword = false;
  value: any;

  touched = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(
    private cdRef: ChangeDetectorRef,
    private ref: ElementRef,
  ) {}

  ngOnInit(): void {
    // Add classes based on the input size
    this.inputClasses += " " + inputSizeClasses[this.size].join(" ");

    // Add classes for icons
    if (this.preIcon) this.inputClasses += " pl-10";
    if (this.postIcon) this.inputClasses += " pr-10";
    this.input == "textarea"
      ? (this.iconClasses += " py-2.5 items-start")
      : (this.iconClasses += " items-center");

    // Add classes for addon
    if (this.addon) this.inputClasses += " rounded-l-none";
    this.addon && this.input == "textarea"
      ? (this.addonClasses += " py-2.5 items-start")
      : (this.addonClasses += " items-center");
  }

  ngAfterViewInit(): void {
    // Get addon via content projection
    const inputAddon = this.ref.nativeElement.querySelector(
      "[ngprojectas=input-addon]",
    );
    if (!this.addon && inputAddon) {
      this.inputClasses += " rounded-l-none";
      this.cdRef.detectChanges();
    }
  }

  togglePasswordVisibility(): void {
    if (!this.enablePasswordToggle) return;

    this.showPassword = !this.showPassword;
    this.input = this.showPassword ? "text" : "password";
    this.postIcon = this.showPassword ? "ri-eye-off-line" : "ri-eye-line";
  }

  onInput(event: Event): void {
    this.markAsTouched();
    if (this.disabled) return;

    if (this.input === "select" && this.multiple) {
      const target = event.target as HTMLSelectElement;
      const selectedOptions = Array.from(target.selectedOptions);
      this.value = selectedOptions.map((option) => option.value);
    } else {
      const target = event.target as HTMLInputElement;
      this.value = target.value;
    }

    this.onChange(this.value);
  }

  markAsTouched(): void {
    if (this.touched) return;

    this.onTouched();
    this.touched = true;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
