import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-taskCard',
  standalone: true,
  imports: [],
  templateUrl: './taskCard.component.html',
  styleUrl: './taskCard.component.css'
})
export class TaskCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id : string = '';
  @Output() updateClicked: EventEmitter<{ title: string, description: string  , id: string }> = new EventEmitter<{ title: string , description: string , id: string }>();
  @Output() deleteClicked: EventEmitter<{ id: string }> = new EventEmitter<{ id: string  }>();

  handleUpdate() {
    this.updateClicked.emit({title: this.title,description:this.description, id: this.id});
  }

  handleDelete() {
     this.deleteClicked.emit({ id: this.id });

  }
}
