import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'company';
  data: any[] | any = [];
  filteredData: any[] = [];
  slide: string = 'assets/images/edit.png';
  slide1: string = 'assets/images/save.png';
  myForm: FormGroup | any;
  companies: any[] | any = [];
  edit: boolean = false;
  edits: boolean = true;
  editdata: any;
  editid: any;
  editcheck: boolean = false;
  editch: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      company: [''],
      editcomp: [''],
    });

    this.http.get('http://localhost:3000/posts').subscribe((response) => {
      this.data = response;
      this.companies = response;
    });

    this.myForm.get('company').valueChanges.subscribe((value: any) => {
      this.myForm.get('editcomp').setValue(value);
      this.editdata = value;
    });
    this.myForm.get('editcomp').valueChanges.subscribe((value: any) => {
      this.editch = value;
    });
  }

  filterData(filterValue: string | any) {
    const comp: any | string = (filterValue.target as HTMLInputElement).value;
    if (this.myForm.value.company.length >= 1) {
      this.filteredData = this.data
        .filter((item: any) => item.check.includes(comp.toLowerCase()))
        .map((item: any) => ({ name: item.name }));
    } else {
      this.filteredData = [];
    }
  }

  editd() {
    this.edit = true;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].name == this.editdata) {
        this.editid = this.data[i].id;
      }
    }
    this.editcheck = true;
    this.edits = false;
  }

  save() {
    if (this.editcheck) {
      const data = {
        name: this.editch,
        check: this.editch.toLowerCase(),
        email: '',
      };
      const url = 'http://localhost:3000/posts';

      this.http.post(url, data).subscribe();
    }
    this.edits = true;
    this.edit = false;
  }

}
