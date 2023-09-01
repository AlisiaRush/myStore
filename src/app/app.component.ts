import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UserLoginComponent } from './user-login/user-login.component';

@Component({
  standalone: true,
  imports: [RouterModule, NxWelcomeComponent, UserLoginComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-store';
}
