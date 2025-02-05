import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() data: any[] = [];
  @Output() page = new EventEmitter<number>();
  
  changePage(pageNumber: number): void {
    this.page.emit(pageNumber);
  }
  

  
}
