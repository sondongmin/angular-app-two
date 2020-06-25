import { Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomText: string = lorem.sentence();
  enteredText: string  = '';
  timeLeft: number = 60;
  interval: any = null;
  timer: boolean = false;
  wordCount: number = 0;
  total: number = 0;
  end = false;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0 && this.timer) {
        this.timeLeft--;
      } else if (this.timer) {
        this.timeLeft = 0;
        this.end = true;
      }
    }, 1000);
  }

  count(arr1:Array<string>, arr2:Array<string>): number {
    let number = arr1.reduce((a, c) => arr2.includes(c) ? a + 1 : a, 0); 
    if (!isNaN(number)) {
      return number;
    } else {
      return 0;
    }
  }

  get WPM() {
    let wpm = (this.total+this.wordCount)/(60-this.timeLeft) * 60;
    if (!isNaN(wpm)) {
      return wpm;
    } else {
      return 0;
    }
  }

  onReset() {
    clearInterval(this.interval);
    this.end = false;
    this.total = 0;
    this.wordCount = 0;
    this.timer = false;
    this.timeLeft = 60;
    this.interval = null;
    this.randomText = lorem.sentence();
    this.enteredText = '';
  }

  onInput(value: string) {
    if (!this.timer) {
      this.startTimer();
      this.timer = true;
    }

    this.enteredText = value;
    this.wordCount = this.count(this.enteredText.split(' '), this.randomText.split(' '))
    
    if (this.enteredText.trim() === this.randomText) {
      this.randomText = lorem.sentence();
      this.enteredText = '';
      this.total += this.wordCount;
      this.wordCount = 0;
    }
  }

  compare(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) {
      return 'pending';
    }

    return randomLetter === enteredLetter ? 'correct' : 'incorrect';
  }

}
