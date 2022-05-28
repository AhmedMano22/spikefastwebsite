import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {
  firstName;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.firstName = data.name
   }

  ngOnInit(): void {
  }

}
