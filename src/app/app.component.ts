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
  editData: any;
  editId: any;
  editCheck: boolean = false;
  editCh: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      company: [''],
      editcomp: [''],
    });

    this.getData();

    this.myForm.get('company').valueChanges.subscribe((value: any) => {
      this.myForm.get('editcomp').setValue(value);
      this.editData = value;
    });
    this.myForm.get('editcomp').valueChanges.subscribe((value: any) => {
      this.editCh = value;
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

  ediTd() {
    this.edit = true;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].name == this.editData) {
        this.editId = this.data[i].id;
      }
    }
    this.editCheck = true;
    this.edits = false;
  }

  save() {
    if (this.editCheck) {
      const data = {
        name: this.editCh,
        check: this.editCh.toLowerCase(),
        email: '',
      };
      const url = 'http://localhost:3000/posts';

      this.http.post(url, data).subscribe();
    }else{
      const data = {
        name: this.editCh,
        check: this.editCh.toLowerCase(),
        email: '',
      };
      const url = 'http://localhost:3000/posts';

      this.http.post(url, data).subscribe();

    }
    this.edits = true;
    this.edit = false;
    
  }

  getData(){
    this.http.get('http://localhost:3000/posts').subscribe((response) => {
      this.data = response;
      this.companies = response;
    });
  }

}
