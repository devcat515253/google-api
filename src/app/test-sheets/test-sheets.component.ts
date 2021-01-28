import { Component, OnInit } from '@angular/core';
// import * as gapi from 'gapi';

declare var gapi: any;

@Component({
  selector: 'app-test-sheets',
  templateUrl: './test-sheets.component.html',
  styleUrls: ['./test-sheets.component.sass']
})
export class TestSheetsComponent implements OnInit {

  apiKey = 'AIzaSyCgbHaKCuF7Oh2yqGaW7k0OsRlnALHCYow';

  authorizeButton = document.getElementById('authorize-button');
  signoutButton = document.getElementById('signout-button');

  constructor() { }

  ngOnInit(): void {
    // gapi.load('client', () => this.start());

    setTimeout(() => {
      this.authorizeButton = document.getElementById('authorize-button');
      this.signoutButton = document.getElementById('signout-button');
      gapi.load('client:auth2', () => this.handleClientLoad());
    }, 500);
  }

  // tslint:disable-next-line:typedef
  start() {
    // Initializes the client with the API key and the Translate API.
    gapi.client.init({
      apiKey: this.apiKey,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
    }).then((res: any) => {
      console.log(res);
      // Executes an API request, and returns a Promise.
      // The method name `language.translations.list` comes from the API discovery.
      return gapi.client.language.translations.list({
        q: 'hello world',
        source: 'en',
        target: 'de',
      });
    }).then((response: any) => {
      console.log(response.result.data.translations[0].translatedText);
    }, (reason: any) => {
      console.log('Error: ' + reason.result.error.message);
    });
  }

  start2() {
    const scopes = 'profile';
    const discoveryDocs = ['https://people.googleapis.com/$discovery/rest?version=v1'];
    const clientId = '429513684607-3rf9o9rsaumiglf8dn1gglo1fqqg8bnb.apps.googleusercontent.com';

    gapi.client.init({
      apiKey: this.apiKey,
      discoveryDocs: [discoveryDocs],
      clientId: clientId,
      scope: scopes
    }).then((res: any) => {
      console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  // Loads the JavaScript client library and invokes `start` afterwards.

  handleClientLoad() {
    // Load the API client and auth2 library
    gapi.load('client:auth2', () => this.initClient());
  }

  initClient() {
    const scopes = 'https://www.googleapis.com/auth/spreadsheets.readonly';
    const discoveryDocs = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
    const clientId = '429513684607-3rf9o9rsaumiglf8dn1gglo1fqqg8bnb.apps.googleusercontent.com';

    gapi.client.init({
      apiKey: this.apiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientId,
      scope: scopes
    }).then( () => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      this.authorizeButton.onclick = this.handleAuthClick;
      this.signoutButton.onclick = this.handleSignoutClick;
    });
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.authorizeButton.style.display = 'none';
      this.signoutButton.style.display = 'block';
      this.listMajors();
    } else {
      this.authorizeButton.style.display = 'block';
      this.signoutButton.style.display = 'none';
    }
  }

  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  listMajors() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1-ggvvQzaQuI4eA7GKVADPG_37UY1iCseMg2rjZwyX2I',
      range: 'A1:C3',
    }).then((response) => {
      console.log(response);
      // var range = response.result;
      // if (range.values.length > 0) {
      //   this.appendPre('Name, Major:');
      //   for (let i = 0; i < range.values.length; i++) {
      //     var row = range.values[i];
      //     Print columns A and E, which correspond to indices 0 and 4.
          // this.appendPre(row[0] + ', ' + row[4]);
        // }
      // } else {
      //   this.appendPre('No data found.');
      // }
    }, (response) => {
      this.appendPre('Error: ' + response.result.error.message);
    });
  }

  // Load the API and make an API call.  Display the results on the screen.
  makeApiCall() {
    gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    }).then((resp) => {
      var p = document.createElement('p');
      var name = resp.result.names[0].givenName;
      p.appendChild(document.createTextNode('Hello, '+name+'!'));
      document.getElementById('content').appendChild(p);
    });
  }


}
