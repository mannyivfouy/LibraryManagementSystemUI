import { BrowserModule } from '@angular/platform-browser';

export interface Report {
  _id?: string;
  memberID: string;
  productID: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate: Date;
  status: string;
  userID: string;
}
