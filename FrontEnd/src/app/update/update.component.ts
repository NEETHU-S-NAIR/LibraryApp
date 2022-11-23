import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../book/book.model';
import { BookssService } from '../bookss.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  bookItem = new BookModel('','','',0,0,'');

  constructor(private router : Router,private bookservice:BookssService) { }

  ngOnInit(): void {
    let bookId = localStorage.getItem("editBookId");
    this.bookservice.getbook(bookId).subscribe((data)=>{
      this.bookItem = JSON.parse(JSON.stringify(data));
    })
  }
  editbook(){
    this.bookservice.editBook(this.bookItem);
    localStorage.removeItem('editBookId')
    alert("Success");
    this.router.navigate(['book']);
  }
}
