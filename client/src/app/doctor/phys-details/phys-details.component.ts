import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { ExamPhysical } from 'src/app/shared/interfaces/exam-physical';

@Component({
  selector: 'app-phys-details',
  templateUrl: './phys-details.component.html',
  styleUrls: ['./phys-details.component.css']
})
export class PhysDetailsComponent implements OnInit {

  constructor() { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();

  @Input() exam!: ExamPhysical;

  ngOnInit(): void {
  }

  closeOverlay(): void {
    this.active = false;
    this.activeChange.emit(this.active);
  }

}
