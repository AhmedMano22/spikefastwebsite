import { BlogDetailsComponent } from './Analysis/blog-details/blog-details.component';
import { PopUpLoginComponent } from './pop-up-login/pop-up-login.component';
import { PrivateAnalysisComponent } from './subscriptions/private-analysis/private-analysis.component';
import { EducationalCoursesComponent } from './subscriptions/educational-courses/educational-courses.component';
import { CopyServiceComponent } from './subscriptions/copy-service/copy-service.component';
import { AutomatedTraningSysComponent } from './subscriptions/automated-traning-sys/automated-traning-sys.component';
import { CurrencyConverterComponent } from './educational-library/currency-converter/currency-converter.component';
import { EducationalArticlesComponent } from './educational-library/educational-articles/educational-articles.component';
import { IndicatorsLibraryComponent } from './educational-library/indicators-library/indicators-library.component';
import { MarketWorkingHoursComponent } from './educational-library/market-working-hours/market-working-hours.component';
import { TradingEducationBookComponent } from './educational-library/trading-education-book/trading-education-book.component';
import { ScheduleOfTradingComponent } from './educational-library/schedule-of-trading/schedule-of-trading.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './Analysis/analysis.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewsComponent } from './news/news.component';
import { ProductsComponent } from './products/products.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { TeamMemmberComponent } from './team-memmber/team-memmber.component';
import { TermsComponent } from './terms/terms.component';
import { TrainingComponent } from './training/training.component';
import { WalletComponent } from './wallet/wallet.component';
import { AboutComponent } from './about/about.component';
import { MainNotepadComponent } from './main-notepad/main-notepad.component';
import { EducationalLibraryComponent } from './educational-library/educational-library.component';
import { TradersCommunityComponent } from './traders-community/traders-community.component';
import { TradingCompanyComponent } from './trading-company/trading-company.component';

// ~~~~~~~~~~~~~~~~~~services~~~~~~~~~~~~~~~~
import { AuthGuard } from '../Services/auth-guard.service';
import { ComponentResolverService } from './../Services/component-resolver.service';
import { ResultsEvaluationComponent } from './results-evaluation/results-evaluation.component';
import { DetailsComponent } from './details/details.component';
import { EduDetailsComponent } from './edu-details/edu-details.component';
import { CopserviceDetailsComponent } from './copservice-details/copservice-details.component';
import { ForixDetailsComponent } from './forix-details/forix-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MysubscriptionsComponent } from './mysubscriptions/mysubscriptions.component';



export const CompoRoutes =[
  {path:"about",component:AboutComponent,pathMatch:"full" },

  // {path:"blog",component:AnalysisComponent,pathMatch:"full" ,resolve:{Blogs:ComponentResolverService}},
  {path:"contact",component:ContactUsComponent,pathMatch:"full" },
  {path:"news",component:NewsComponent,pathMatch:"full" },
  {path:"products",component:ProductsComponent,pathMatch:"full" },
  {path:"speaker",component:SpeakersComponent,pathMatch:"full" },
  {path:"teamMember",component:TeamMemmberComponent,pathMatch:"full" },
  {path:"terms",component:TermsComponent,pathMatch:"full" },
  {path:"training",component:TrainingComponent,pathMatch:"full" },
  {path:"wallet",component:WalletComponent,pathMatch:"full" },
  {path:"educational",component:EducationalLibraryComponent,pathMatch:"full" },
  {path:"mainNotepad",component:MainNotepadComponent,pathMatch:"full" },
  {path:"traders",component:TradersCommunityComponent,pathMatch:"full" },
  {path:"subscription",component:SubscriptionsComponent,pathMatch:"full" },
  {path:"ResultsEvaluation",component:ResultsEvaluationComponent,pathMatch:"full" },
  {path:"schedualoftrading",component:ScheduleOfTradingComponent,pathMatch:"full" },
  {path:"tradingeducationalbook",component:TradingEducationBookComponent,pathMatch:"full" },
  {path:"marketworkinghours",component:MarketWorkingHoursComponent,pathMatch:"full" },
  {path:"indicatorslibrary",component:IndicatorsLibraryComponent,pathMatch:"full" },
  {path:"currencyconverter",component:CurrencyConverterComponent,pathMatch:"full" },
  {path:"automatedtraning",component:AutomatedTraningSysComponent,pathMatch:"full" },
  {path:"copyservice",component:CopyServiceComponent,pathMatch:"full" },
  {path:"educationalcourses",component:EducationalCoursesComponent,pathMatch:"full" },
  {path:"privateanalysis",component:PrivateAnalysisComponent,pathMatch:"full" },
  {path:"LogintoEnrolled",component:PopUpLoginComponent,pathMatch:"full" },


  {path:"educationalarticles/:statue",component:EducationalArticlesComponent,pathMatch:"full" },
  {path:"analysis/:statue",component:AnalysisComponent,pathMatch:"full"},
  {path:"tradingCompanies/:statue",component:TradingCompanyComponent,pathMatch:"full" },
  {path:"BlogDetails/:id",component:BlogDetailsComponent,pathMatch:"full" },
  {path:"details/:id",component:DetailsComponent,pathMatch:"full" },
  {path:"edu-details/:id",component:EduDetailsComponent,pathMatch:"full" },
  {path:"copyService-details/:id",component:CopserviceDetailsComponent,pathMatch:"full" },
  {path:"forix-details/:id",component:ForixDetailsComponent,pathMatch:"full" },
  {path:"book-details/:id",component:BookDetailsComponent,pathMatch:"full" },
  {path:"MySubscriptions/:id",component:MysubscriptionsComponent,pathMatch:"full" },

]
