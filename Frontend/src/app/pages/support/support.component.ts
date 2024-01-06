import { Component } from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss', '../../pages/settings/style-settings.scss']
})
export class SupportComponent {
  textFile = "Không có tệp nào được chọn";

  mess = '';
  name = '';
  mail = '';
  file: any;
  subject = '';

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      this.textFile = file.name;
      this.file = file;
    } else {
      this.textFile = "Không có tệp nào được chọn"
    }
  }

  question_answering = [
    {
      question: "How do I sign up on your website?",
      answer: "To sign up, simply click the 'Register' button at the top corner of the page and fill in the required information."
    },
    {
      question: "How do I share my own code snippet on the website?",
      answer: "To share your code, you can use the 'Share' feature on the code editing page."
    },
    {
      question: "How do I contact the creator of a Pen?",
      answer: "You can leave a comment on any public Pen. Click the \"Comments\" link in the Pen editor view, or visit the Details page."
    },
    {
      question: "What version of [library] does CODE use?",
      answer: "We have our current list of library versions here."
    },
    {
      question: "What are forks?",
      answer: "A fork is a complete copy of a Pen or Project that you can save to your own account and modify. Your forked copy comes with everything the original author wrote, including all of the code and any dependencies."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "If you forget your password, use the password recovery feature on the login page and follow the instructions to reset your password."
    }
  ]

  constructor (private myService: HostService, 
      private toastr: ToastrService,
    ) {
      // set top-center position and auto close delay
      this.toastr.toastrConfig.positionClass = 'toast-top-center';


    }

  onSubmit() {

    axios.post(this.myService.getApiHost() + `/send-email/support?name=${this.name}&email=${this.mail}&message=${this.mess}&subject=${this.subject}`).then((response) => {
      console.log(response.data);
      this.toastr.success('Your message has been sent successfully', '');
    }).catch((error) => {
      console.error('Error:', error);
      this.toastr.error('Your message has not been sent', '');
    });
  }

}