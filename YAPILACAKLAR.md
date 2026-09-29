# Yapılacaklar

## Mobil mağaza yayını

- [ ] Maraton uygulamasının doğrulanmış geliştirici/yasal kişi adını netleştir ve `/privacy` ile `/support` metinlerine ekle.
- [ ] E-posta üzerinden hesap silme taleplerinin gerçek tamamlanma süresini netleştir; doğrulandıktan sonra `/delete-account` sayfasına ekle.
- [ ] Apple Developer hesabındaki gerçek Team ID'yi edin. Ardından `/.well-known/apple-app-site-association` dosyasını `com.ahmeterensiranli.maraton` uygulaması ve `/referral/*`, `/friend/*`, `/group/*` yolları için oluştur.
- [ ] Google Play Console'daki **App signing key certificate** SHA-256 parmak izini edin. Upload veya debug anahtarı kullanmadan `/.well-known/assetlinks.json` dosyasını `com.ahmeterensiranli.maraton` paketi için oluştur.
- [ ] `destek@maratonapp.com` adresinin e-posta alabildiğini doğrula.
- [ ] `.well-known` dosyaları eklendikten sonra canlı HTTPS alan adında redirect olmadan `200`, geçerli JSON ve `Content-Type: application/json` döndüklerini doğrula.

## Deployment sonrası kontrol

- [ ] `/privacy`, `/terms`, `/support` ve `/delete-account` sayfalarının canlıda `200` döndüğünü doğrula.
- [ ] Footer bağlantılarını ve destek/hesap silme `mailto:` bağlantılarını canlıda kontrol et.
- [ ] Canlı `sitemap.xml` içinde dört yeni sayfanın bulunduğunu doğrula.
