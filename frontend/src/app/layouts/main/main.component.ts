import { Component, inject } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [InputComponent, FormsModule, ButtonComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {

  private service = inject(ApiService);

  videolink: string = ""
  buttonsDisabled = false;
  result:string = ""


  handleSubmit() {
    this.service.videoToMindMap(this.videolink).subscribe((response) => {
      this.result = response
    });
  }

}
