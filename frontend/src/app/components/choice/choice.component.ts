import { Component, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-choice",
  standalone: true,
  imports: [],
  templateUrl: "./choice.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChoiceComponent,
      multi: true,
    },
  ],
})
export class ChoiceComponent implements OnInit, ControlValueAccessor {
  @Input() label: string | null = null;
  @Input() choices: { label: string; value: string; id?: string }[] = [];
  @Input() name: string = Math.random().toString(36).substring(2);
  @Input() multiple: boolean = false;
  @Input() isToggle: boolean = false;

  inputClass: string = "";

  value: any;
  touched = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnInit(): void {
    // Generate a unique id for each choice
    this.choices = this.choices.map((choice) => {
      choice.id = choice.id || Math.random().toString(36).substring(2);
      return choice;
    });

    this.inputClass += this.multiple ? " rounded" : " rounded-full";
  }

  onChoice($event: Event) {
    this.markAsTouched();

    const target = $event.target as HTMLInputElement;
    const value = target.value;

    // If it's a radio input, we set the value directly
    if (!this.multiple) {
      this.value = value;
      this.onChange(this.value);
      return;
    }

    // Otherwise
    // If we have a single choice, we toggle the value (true | false)
    if (this.choices.length === 1) {
      this.value = !this.value;
    } else {
      // If we have multiple choices, we toggle the value in the array
      this.value = this.value.includes(value)
        ? this.value.filter((v: string) => v !== value)
        : [...this.value, value];
    }

    this.onChange(this.value);
  }

  isChecked(value: any): boolean {
    if (this.multiple) {
      return this.choices.length === 1
        ? this.value // If we have a single choice, we check if the value is true
        : this.value && this.value.includes(value); // If we have multiple choices, we check if the value is in the array
    }

    // Otherwise, we check if the value is the same as the input value
    return this.value === value;
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
}
