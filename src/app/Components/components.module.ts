import { ComponentResolverService } from './../Services/component-resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {NgxPaginationModule} from 'ngx-pagination';
import { CountdownModule } from 'ngx-countdown';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CompoRoutes} from './Compo.Routes';

import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewsComponent } from './news/news.component';
import { ProductsComponent } from './products/products.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { TeamMemmberComponent } from './team-memmber/team-memmber.component';
import { TermsComponent } from './terms/terms.component';
import { TrainingComponent } from './training/training.component';
import { WalletComponent } from './wallet/wallet.component';
import { EducationalLibraryComponent } from './educational-library/educational-library.component';
import { TradersCommunityComponent } from './traders-community/traders-community.component';
import { TradingCompanyComponent } from './trading-company/trading-company.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { MainNotepadComponent } from './main-notepad/main-notepad.component';

// import shared module
import { LayoutsModule } from '../../app/Layouts/layouts.module';
import { ResultsEvaluationComponent } from './results-evaluation/results-evaluation.component';
import { ScheduleOfTradingComponent } from './educational-library/schedule-of-trading/schedule-of-trading.component';
import { TradingEducationBookComponent } from './educational-library/trading-education-book/trading-education-book.component';
import { EducationalArticlesComponent } from './educational-library/educational-articles/educational-articles.component';
import { IndicatorsLibraryComponent } from './educational-library/indicators-library/indicators-library.component';
import { CurrencyConverterComponent } from './educational-library/currency-converter/currency-converter.component';
import { MarketWorkingHoursComponent } from './educational-library/market-working-hours/market-working-hours.component';
import { EducationalCoursesComponent } from './subscriptions/educational-courses/educational-courses.component';
import { PrivateAnalysisComponent } from './subscriptions/private-analysis/private-analysis.component';
import { AutomatedTraningSysComponent } from './subscriptions/automated-traning-sys/automated-traning-sys.component';
import { CopyServiceComponent } from './subscriptions/copy-service/copy-service.component';
import { PopUpLoginComponent } from './pop-up-login/pop-up-login.component';
import { BlogDetailsComponent } from './Analysis/blog-details/blog-details.component';
import { DetailsComponent } from './details/details.component';
import { EduDetailsComponent } from './edu-details/edu-details.component';
import { CopserviceDetailsComponent } from './copservice-details/copservice-details.component';
import { ForixDetailsComponent } from './forix-details/forix-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MysubscriptionsComponent } from './mysubscriptions/mysubscriptions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
];
@NgModule({
  declarations: [

    AboutComponent,
    ContactUsComponent,
    NewsComponent,
    ProductsComponent,
    SpeakersComponent,
    TeamMemmberComponent,
    TermsComponent,
    TrainingComponent,
    WalletComponent,
    EducationalLibraryComponent,
    MainNotepadComponent,
    TradersCommunityComponent,
    TradingCompanyComponent,
    SubscriptionsComponent,
    ResultsEvaluationComponent,
    TradingEducationBookComponent,
    EducationalArticlesComponent,
    IndicatorsLibraryComponent,
    CurrencyConverterComponent,
    MarketWorkingHoursComponent,
    ScheduleOfTradingComponent,
    TradingEducationBookComponent,
    MarketWorkingHoursComponent,
    IndicatorsLibraryComponent,
    EducationalArticlesComponent,
    CurrencyConverterComponent,
    EducationalCoursesComponent,
    PrivateAnalysisComponent,
    AutomatedTraningSysComponent,
    CopyServiceComponent,
    AutomatedTraningSysComponent,
    EducationalCoursesComponent,
    PrivateAnalysisComponent,
    PopUpLoginComponent,
    BlogDetailsComponent,
    DetailsComponent,
    EduDetailsComponent,
    CopserviceDetailsComponent,
    ForixDetailsComponent,
    BookDetailsComponent,
    MysubscriptionsComponent

  ],
  providers:[
],
  imports: [
    ...materialModules,
    MatDialogModule,
    CommonModule,
    LayoutsModule,
    NgxPaginationModule,
    CountdownModule,
    HttpClientModule,
    NgbPaginationModule, NgbAlertModule,
    TranslateModule.forChild({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      }
    }),
    RouterModule.forChild(CompoRoutes)
  ],
  exports:[
    ...materialModules
  ]

})

export class ComponentsModule { }

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}


