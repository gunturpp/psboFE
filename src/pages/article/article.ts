import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { ArticleDetailPage } from "../article-detail/article-detail";
import { Http } from "@angular/http";
import { DataProvider } from "../../providers/data/data";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: "page-article",
  templateUrl: "article.html"
})
export class ArticlePage {
  token: any;
  articles: any;
  penulis = [];
  constructor(
    public toastCtrl: ToastController,
    public loadingProvider: LoadingProvider,
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidEnter() {
    this.token = localStorage.getItem("tokenPatriot");
    this.getArticle();

    console.log("ionViewDidLoad ArticlePage");
  }
  readmore(detail) {
    this.navCtrl.push('ArticleDetailPage', { detail: detail });
  }
  getArticle() {
    this.loadingProvider.show();
    this.data
      .article(this.token)
      .then(article => {
        let temp: any;
        let admin = [];
        temp = article;
        if (temp.status == false) {
          // this.navCtrl.parent.parent.setRoot(LoginPage);
          // localStorage.removeItem("tokenPatriot");
          this.loadingProvider.hide();
        } else {
          this.articles = temp.data;
          console.log("artikel", this.articles);
          for (var i = 0; i < this.articles.length; i++) {
            admin[i] = this.articles[i].admin;
            this.penulis[i] = admin[i].nama;
          }
          console.log("admin", admin);
          console.log("penulis", this.penulis);
          this.loadingProvider.hide();
        }
      })
      .catch(err => {
        console.log("error", err);
        this.loadingProvider.hide();
        this.failToast();
      });
  }
  failToast() {
    const toast = this.toastCtrl.create({
      message: 'Gagal meminta artikel',
      duration: 3000,
    });
    toast.present();
  }
  
}
