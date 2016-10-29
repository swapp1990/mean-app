import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Response, Http} from "@angular/http";
import {TreeNode} from "primeng/primeng";

@Component({
  selector: 'my-autocomplete',
  template: ``
})

export class AutoCompleteColumn implements OnInit {
  results: string[];
  
  name: string;

  constructor(
    private http: Http) {

  }


  search(event) {
    this.results = [];
    this.results.push('January');
    this.results.push('February');
    this.results.push('March');
  }

  ngOnInit(): void {
  }
}
