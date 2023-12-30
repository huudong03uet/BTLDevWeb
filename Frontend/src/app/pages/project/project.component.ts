import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent  {
  @ViewChild('box1') box1!: ElementRef;
  @ViewChild('box2') box2!: ElementRef;
  @ViewChild('box3') box3!: ElementRef;

  ngAfterViewInit() {
    const boxes = {
      box1: this.box1.nativeElement,
      box2: this.box2.nativeElement,
      box3: this.box3.nativeElement
    };

    const resizers = document.getElementsByClassName('resizer');
    for (let i = 0; i < resizers.length; i++) {
      const resizer = resizers[i];
      resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        function resize(e: MouseEvent) {
          if (resizer.classList.contains('vertical')) {
            resizeX(e);
          } else {
            resizeY(e);
          }
          e.preventDefault();
        }

        function stopResize() {
          document.removeEventListener('mousemove', resize);
        }

        function resizeX(e: MouseEvent) {
          const bodyWidth = 100 / document.body.clientWidth;
          const leftWidth = (parseFloat(getComputedStyle(boxes.box1, '').width) + e.movementX) * bodyWidth ;
          
          
          console.log("parseFloat", parseFloat(getComputedStyle(boxes.box1, '').width))
          console.log("e.movementX", e.movementX)
          console.log("bodyWidth", bodyWidth)
          console.log("leftWidth", leftWidth)
          console.log("\n\n\n")


          boxes.box1.style.width = leftWidth + '%';
          boxes.box2.style.width = (100 - leftWidth) + '%';
          boxes.box3.style.width = (100 - leftWidth) + '%';
        }

        function resizeY(e: MouseEvent) {
          const bodyHeight = 100 / document.body.clientHeight;
          const topHeight = (parseFloat(getComputedStyle(boxes.box2, '').height) + e.movementY) * bodyHeight;
          boxes.box2.style.height = topHeight + '%';
          boxes.box3.style.height = (100 - topHeight) + '%';
        }
      });
    }
  }

  
  // dayLaTinhNang() {
  //     console.log("day la tinh nang")
  // }

}