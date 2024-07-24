import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Component({
  selector: "app-tags-input",
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagsInputComponent,
      multi: true,
    },
  ],

  templateUrl: "./tags-input.component.html",
})
export class TagsInputComponent implements ControlValueAccessor {
  @Output() tagsChange = new EventEmitter<string[]>();

  @Input() label: string | null = null;
  @Input() placeholder: string = "";

  _id: string = Math.random().toString(36).substring(2);
  tags: string[] = [];
  inputTagValue: string = "";

  touched = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  addTag() {
    this.markAsTouched();
    const tag = this.inputTagValue.trim();

    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.inputTagValue = "";
      this.onChange(this.tags);
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.onChange(this.tags);
  }

  removeLastTag() {
    if (this.inputTagValue.length > 0) {
      return;
    }

    this.tags.pop();
    this.onChange(this.tags);
  }

  markAsTouched(): void {
    if (this.touched) return;

    this.onTouched();
    this.touched = true;
  }

  writeValue(tags: string[]): void {
    this.tags = tags;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
