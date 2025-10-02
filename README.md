# Kelime Bulma Oyunu

Bu, harfleri tahmin ederek veya tüm kelimeyi tahmin ederek gizli kelimeyi bulmaya çalıştığınız basit bir kelime bulma oyunudur.

## Oynanış

1.  **Kelime Kutuları:** Oyun başladığında, kelime harfleri kadar boş kutu görürsünüz.
2.  **İpucu:** "İpucu Al" butonuna tıklayarak kelimenin rastgele bir harfini açığa çıkarabilirsiniz.
3.  **Harf Girişi:** Herhangi bir boş kutuya tıklayarak o kutuya tek bir harf girebilirsiniz.
    *   **Doğrulama:** Harfi girdikten ve kutudan çıktığınızda (odak kaybettiğinizde), girdiğiniz harfin doğru olup olmadığı kontrol edilir:
        *   **Geçersiz Giriş:** Eğer girdiğiniz şey harf değilse (örneğin bir rakam veya sembol), kutu kırmızı olur, sallanma animasyonu yapar ve uyarı mesajı alırsınız. Kutu içeriği silinir.
        *   **Yanlış Harf:** Eğer girdiğiniz harf kelimenin o konumdaki harfi değilse, kutu kırmızı olur, sallanma animasyonu yapar ve "Yanlış harf!" uyarısı alırsınız. Kutu içeriği silinir.
        *   **Doğru Harf:** Eğer girdiğiniz harf kelimenin o konumdaki doğru harfi ise, kutu yeşil olur, harf açığa çıkar ve "Doğru harf! Kelimeyi bulmaya çok yaklaştın." bildirimi alırsınız.
4.  **Kelime Tahmini:** En alttaki giriş alanına tüm kelimeyi yazıp "Tahmin Et" butonuna tıklayabilirsiniz.
    *   **Doğru Tahmin:** Eğer tahmininiz doğruysa, tüm harfler açığa çıkar, "Tebrikler! Kelimeyi doğru tahmin ettin!" bildirimi alırsınız ve puan kazanırsınız.
    *   **Yanlış Tahmin:** Eğer tahmininiz yanlışsa, "Yanlış tahmin! Tekrar dene." uyarısı alırsınız ve tüm kutular sallanma animasyonu yapar.
5.  **Yeni Oyun:** "Yeni Oyun" butonuna tıklayarak yeni bir kelimeyle oyuna başlayabilirsiniz.
6.  **Skor:** Her doğru tahmin için puan kazanırsınız.

## Geliştirici Bilgileri

Bu oyun, [ibrahimglmz](https://ibrahimglmz.github.io/portfolio/) tarafından geliştirilmiştir.

## Kurulum

Oyunu yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/ibrahimglmz/kelimeoyunu.git
    cd kelimeoyunu
    ```
2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    # veya yarn kullanıyorsanız:
    # yarn install
    ```
3.  **Projeyi Başlatın:**
    ```bash
    npm run dev
    # veya yarn kullanıyorsanız:
    # yarn dev
    ```

Bu adımları tamamladıktan sonra, projeniz `http://localhost:5173` (veya terminalde belirtilen başka bir port) adresinde çalışır durumda olacaktır.
