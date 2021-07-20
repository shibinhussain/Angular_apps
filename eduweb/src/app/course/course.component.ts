import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  course = [
    {
      id: 1,
      name: 'Learn Angular',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit, sed do eiusmod tempor incididunt ncididunt ut labore et dolore magna aliqua',
      image: '../../assets/angular.png',
    },
    {
      id: 2,
      name: 'Learn Javascript',
      description:
        'Lorem ipsum dolor sit amet, dolore magna aliqua., consectett, consectetur adipiscing elit, sed do consectetur adipiscing elit, s ',
      image: '../../assets/js.png',
    },
    {
      id: 3,
      name: 'Learn Typescript',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do consectetur sed do eiusmod tempor incididunt ncididunt ut labore et dolore magna aliqua.',
      image: '../../assets/ts.jpg',
    },
    {
      id: 4,
      name: 'Learn Python',
      description:
        'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor tempor tempor adipiscing elit, sed do eiusmod tempor incididunt ncididunt ut labore et dolore magna aliqua.',
      image: '../../assets/python.jpg',
    },
  ];
}
