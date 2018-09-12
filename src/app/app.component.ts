import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public githubService: GithubService) { }
  title = 'app';
  resData: any = {};
  deferredPrompt;

  ngOnInit() {
    setTimeout(() => {
      this.gethere();
    }, 200);

    /**
     * for banner cusomization start
     */

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      console.log('before installed');
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredPrompt = e;
      return false;
    });

    // button click event to show the promt
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('display-mode is standalone');
      alert('standalone');
    }
    window.addEventListener('appinstalled', (event) => {
      alert('installed');
    });
  }
  openBanner() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            alert('User accepted the prompt');
          } else {
            alert('User dismissed the prompt');
          }
          this.deferredPrompt = null;
        });
    }
  }
  /**
   * Banner customization end
   */



  gethere() {
    this.githubService.getUserDetails().subscribe(val => this.resData = val);
  }
}
