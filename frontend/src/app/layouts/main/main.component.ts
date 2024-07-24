import { Component, inject } from '@angular/core';
import { StorageService } from '../../core/data/storage.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
})
export class MainComponent {

  public storage = inject(StorageService);


}
