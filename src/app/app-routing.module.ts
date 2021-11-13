import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "**", redirectTo: "signup" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
