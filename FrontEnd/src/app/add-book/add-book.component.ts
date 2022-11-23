import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookssService } from '../bookss.service';
import { BookModel } from '../book/book.model';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  title:String = "Add Book";
  constructor(private bookservice:BookssService,private router: Router ) { }

  bookItem = new BookModel('','','',0,0,'');

  ngOnInit(): void {
  }

  AddBook()
  {
    this.bookservice.newBook(this.bookItem);
    console.log("called");
    alert("success");
    this.router.navigate(['book']);
  }

}
