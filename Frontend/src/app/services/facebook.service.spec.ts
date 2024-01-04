import { FacebookService, InitParams } from 'ngx-facebook';
 
 
export class MyComponentOrService {
 
  constructor(private fb: FacebookService) {
 
    const initParams: InitParams = {
      appId: '1234566778',
      xfbml: true,
      version: 'v2.8'
    };
 
    fb.init(initParams);
 
  }
 
}
