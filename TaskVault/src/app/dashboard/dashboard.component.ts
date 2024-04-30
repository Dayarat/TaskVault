import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../components/TaskCard/taskCard.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { endpoint } from '../const';
import { HttpClientModule } from '@angular/common/http';
import { dashBoardService } from './servicess/dashboard.service';
import { title } from 'process';
import { CommonModule } from '@angular/common';

interface toDoDetail {
  title : string,
  description : string,
  id : string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskCardComponent, FormsModule, ReactiveFormsModule, HttpClientModule,CommonModule],
  providers:[dashBoardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  Title1 = "Title1";
  desc1 = "Desc1";
  propeties = endpoint;

  detailsComponent = {
    title : new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  }

  detailsFormGroup = new FormGroup(this.detailsComponent);
  allDetails: toDoDetail[] = [];
  selectedId: any;
  isEdit = false;

  constructor(private dashBoardService : dashBoardService) {

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // console.log(this.propeties);
    this.getAllToDoLists();
    console.log(this.allDetails);
  }

  handleSubmit() {
    // console.log(this.dashBoardService.getDetails());
  }

  handleComplete() {
    console.log('handleComplete')
    const reqestBody = {
      title : this.detailsFormGroup.controls.title.value ,
      description: this.detailsFormGroup.controls.description.value
    }
    if(reqestBody.title !== '' && reqestBody.description !== ''){
      const res = this.dashBoardService.updateDetail(reqestBody,this.selectedId).subscribe(
        (data) => {
          if(data){
            this.getAllToDoLists();
          }
        }
      );
      console.log(res);
    }
  }

  updateDetail(event: any){
    this.isEdit = true;
    this.detailsFormGroup.controls.title.setValue(event.title);
    this.detailsFormGroup.controls.description.setValue(event.description);
    this.selectedId = event.id;
  }

  deleteDetail(event: any){
    console.log(event);
  }

  getAllToDoLists() {
    this.dashBoardService.getDetails().subscribe(
      (data) => {
         data.forEach((element: { title: any; description: any; id: any; }) => {
          this.allDetails.push({
            title: element.title,
            description: element.description,
            id: element.id,
          })
         })
      },
      (error) => {
        console.error('Error fetching data:', error); // Log any errors
      }
    );
  }
}
