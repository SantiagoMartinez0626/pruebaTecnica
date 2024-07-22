import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaTecnica';
  specialTileIndex = 0;
  isSidebarOpen = false;

  constructor(public dialog: MatDialog) { }

  openDialog(color: string): void {
    this.dialog.open(DialogContentComponent, {
      data: { color: color }
    });
  }

  moveTile(direction: string): void {
    const cols = 3;
    const rows = 3;

    let newIndex: number;

    switch (direction) {
      case 'up':
        newIndex = (this.specialTileIndex - cols + (cols * rows)) % (cols * rows);
        break;
      case 'down':
        newIndex = (this.specialTileIndex + cols) % (cols * rows);
        break;
      case 'left':
        newIndex = (this.specialTileIndex % cols === 0) ? this.specialTileIndex + cols - 1 : this.specialTileIndex - 1;
        break;
      case 'right':
        newIndex = (this.specialTileIndex % cols === cols - 1) ? this.specialTileIndex - cols + 1 : this.specialTileIndex + 1;
        break;
      default:
        return;
    }

    const grid = Array.from(document.querySelectorAll('.grid-tile'));

    if (grid[newIndex] && grid[this.specialTileIndex]) {
      const temp = grid[newIndex].className;
      grid[newIndex].className = grid[this.specialTileIndex].className;
      grid[this.specialTileIndex].className = temp;

      this.specialTileIndex = newIndex;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}