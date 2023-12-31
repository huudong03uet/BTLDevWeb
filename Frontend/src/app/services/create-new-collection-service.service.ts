import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { CreateNewCollectionComponent } from '../components/create-new-collection/create-new-collection.component';

@Injectable({ providedIn: 'root' })
export class CreateNewCollectionServiceService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  appendComponentToBody() {
    // 1. Create a component reference
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(CreateNewCollectionComponent)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    // Ensure component is destroyed on navigation
    componentRef.onDestroy(() => {
      this.appRef.detachView(componentRef.hostView);
    });
  }
}