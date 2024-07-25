import { Component, inject } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { ApiService } from '../../core/services/api.service';
import { Router, RouterLink } from "@angular/router";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [InputComponent, FormsModule, ButtonComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {

  private service = inject(ApiService);
  private router = inject(Router);

  videolink: string = ""
  buttonsDisabled = false;
  result:string = ""


  handleSubmit() {
    this.buttonsDisabled = true
    this.service.videoToMindMap(this.videolink).subscribe((response) => {
      this.result = response
      this.buttonsDisabled = false
       // Redirect to explore page
      this.router.navigate(["/result"]);
    });
  }

}
