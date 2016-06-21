'use strict';

app.component('vfSvg', {
  template: `<svg aria-hidden="true" class="slds-icon slds-icon-standard-account slds-icon--small">
              <use xlink:href="" ng-attr-xlink:href="{{$ctrl.href}}"></use>
            </svg>`,
  bindings: {
    baseUrl: '<',
    url: '<'
  },
  controller: function VfSvgController( ) {
    var ctrl = this;
    this.href = ctrl.baseUrl + ctrl.url;
    console.log(this.href);
  }
});
