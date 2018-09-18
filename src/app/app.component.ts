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
  deferredPrompt:any;

  ngOnInit() {
    setTimeout(() => {
      this.gethere();
    }, 200);

  
    window.addEventListener('beforeinstallprompt', function (e) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // showAddToHomeScreen();
      return false;
    });

    function showAddToHomeScreen() {
      var a2hsBtn = <HTMLElement>document.querySelector(".ad2hs-prompt");
      a2hsBtn.style.display = "flex";
      a2hsBtn.addEventListener("click", () => {

        alert("called")
        var a2hsBtn = <HTMLElement>document.querySelector(".ad2hs-prompt");
        // hide our user interface that shows our A2HS button
        a2hsBtn.style.display = 'none';
  
        if (this.deferredPrompt) {
          // Show the prompt
          alert("before prompt")
          this.deferredPrompt.prompt();
          alert("after prompt")
  
          // Wait for the user to respond to the prompt
          this.deferredPrompt.userChoice
            .then(function (choiceResult) {
              if (choiceResult.outcome === 'accepted') {
                alert('User accepted the A2HS prompt');
              } else {
                alert('User dismissed the A2HS prompt');
              }
              this.deferredPrompt = null;
            });
         }
      });
    }


    window.addEventListener('appinstalled', function (evt) {
      alert('installed');
    });


  }
  public gethere() {
    this.githubService.getUserDetails().subscribe(val => this.resData = val);
  }

  /**
   * for banner cusomization start
   */
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     // Prevent Chrome 67 and earlier from automatically showing the prompt
  //     console.log('before installed');
  //     e.preventDefault();
  //     // Stash the event so it can be triggered later on the button event.
  //     this.deferredPrompt = e;
  //     this.openBanner();
  //     return false;
  //   });
  // }
  // openBanner() {
  //   if (this.deferredPrompt) {
  //     this.deferredPrompt.prompt();
  //     // Wait for the user to respond to the prompt
  //     this.deferredPrompt.userChoice
  //       .then((choiceResult) => {
  //         if (choiceResult.outcome === 'accepted') {
  //           alert('User accepted the prompt');
  //         } else {
  //           alert('User dismissed the prompt');
  //         }
  //         this.deferredPrompt = null;
  //       });
  //   }
  // }
  /**
   * Banner customization end
   */
}
