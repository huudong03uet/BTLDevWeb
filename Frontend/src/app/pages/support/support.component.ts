import { Component } from '@angular/core';
import axios from 'axios';
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
      question: "How do I verify my email?",
      answer: "Click the link in the verification email from verify@code.io (be sure to check your spam folder or other email tabs if it's not in your inbox).\nOr, send an email with the subject \"Verify\" to verify@code.io from the email address you use for your CODE account."
    },
    {
      question: "My Pen loads infinitely or crashes the browser.",
      answer: "It's likely an infinite loop in JavaScript that we could not catch. To fix, add ?turn_off_js=true to the end of the URL (on any page, like the Pen or Project editor, your Profile page, or the Dashboard) to temporarily turn off JavaScript. When you're ready to run the JavaScript again, remove ?turn_off_js=true and refresh the page."
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
      question: "Receipts, account cancellation and more",
      answer: "If you're investigating a charge from CODE, need a receipt or need to cancel your account check out our comprehensive doc at the link below."
    }
  ]

  constructor (private myService: HostService) {}

  onSubmit() {

    axios.post(this.myService.getApiHost() + `/send-email/support?name=${this.name}&email=${this.mail}&message=${this.mess}&subject=${this.subject}`).then((response) => {
      console.log(response.data);
      alert('done');
    }).catch((error) => {
      console.error('Error:', error);
      alert('Khong done');
    });
  }

}