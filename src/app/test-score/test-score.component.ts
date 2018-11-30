import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { load } from '@angular/core/src/render3/instructions';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { InjectSetupWrapper } from '@angular/core/testing';
export interface ITest {
  id?: number,
  testName: string,
  pointsPossible: string,
  pointsReceived: string,
  percentage: string,
  grade: number;

}


@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})

export class TestScoreComponent implements OnInit {

  tests: Array<ITest> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {

    this.tests = await this.loadTestsFromJson();
    console.log('this.tests from ngOnInit...', this.tests);
    const tests = JSON.parse(localStorage.getItem('tests'));
    if(tests && tests.length > 0) {
      this.tests=tests;
    } else {
      this.tests = await this.loadTestsFromJson();
    }

  }

  async loadTestsFromJson() {

    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();

  }

  addTest() {
    const test = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    };

    this.tests.unshift(test);
    localStorage.setItem('tests', JSON.stringify(this.tests))
    this.saveToLocalStorage();
  }

  DeleteContact(index: number) {
    this.tests.splice(index, 1);
  }

  saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.tests));
  }


}
