import { Component, OnInit } from '@angular/core';
import { BookssService } from '../bookss.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  title:String = "Book";

  Book = [{
    bookName : '',
    bookAuthorname : '',
    bookReleasedate : '',
    bookPrice : '',
    bookRate : '',
    bookImageurl : ''
  }]
  imageWidth: number = 50;
  imageMargin: number = 2;

  showImage: boolean = false;

  constructor(private bookService : BookssService,private router : Router) { }
  toggleImage(): void{
    this.showImage = !this.showImage;
  }

  deleteRemove(book:any){
    this.bookService.deletebook(book._id)
    .subscribe((data) => {
      this.Book = this.Book?.filter(p => p!== book);
    })
    }
    editbook(book:any){
      localStorage.setItem("editBookId",book._id.toString());
      this.router.navigate(['update']);
    }

  ngOnInit(): void { 
    this.bookService.getbooks().subscribe((data:any)=>{
      this.Book=JSON.parse(JSON.stringify(data));
    })
  }

}
