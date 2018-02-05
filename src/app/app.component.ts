import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

/*const getCaretCoordinates: any = require('textarea-caret');*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  @ViewChild("video")
  video : HTMLVideoElement;

  readonly constraints = {audio: false, video: true};

  handleSuccess(stream) {
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', this.constraints);
    console.log('Using video device: ' + videoTracks[0].label);
    stream.oninactive = function() {
      console.log('Stream inactive');
    };
    this.video.srcObject = stream;
  }

  handleError(error) {
    console.log("error");
    console.log(error);
  }

  ngOnInit(): void {
    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then((result) => this.handleSuccess(result))
      .catch((error) => this.handleError(error));
  }

}
