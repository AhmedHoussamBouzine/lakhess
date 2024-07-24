import { Component, inject } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [InputComponent,FormsModule,ButtonComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {

  videolink:string = ""
  buttonsDisabled = false;


  handleSubmit() {}

}
