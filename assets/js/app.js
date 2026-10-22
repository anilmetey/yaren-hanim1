/**
 * KLİNİK PSİKOLOG YAREN KİRAZ GÜLLER
 * Modern Etkileşim, 3D Hareket ve Form Kontrolcüsü
 * Production-Grade Vanilla ES6 Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initMobileMenu();
  initTiltCards();
  initFaqAccordion();
  initEkolModals();
  initAppointmentForm();
  initScrollSpy();
  initKvkkModal();
  initScrollProgressBar();
  initScrollReveal();
  initGroundingExercise();
  initBreathingExercise();
  initSchemaCompass();
  initBdtFlipCards();
});

/* ===================================================================
   1. MOBİL MENÜ & GEÇİŞLER
   =================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    drawer.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', toggleMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ===================================================================
   2. HAPTİC 3D TİLT ETKİSİ (Awwwards Seviyesi Kart Fiziği)
   =================================================================== */
function initTiltCards() {
  // prefers-reduced-motion kontrolü
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Mobil dokunmatik ekranlarda performansı ve parmak kaydırmayı korumak için devre dışı
  if (window.innerWidth < 1024) return;

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // Max 6 derece
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ===================================================================
   3. SIKÇA SORULAN SORULAR (FAQ Accordion & Klavye Erişilebilirliği)
   =================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer-content');

    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Diğer açık olanları kapat (Single open accordion UX)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          const otherAns = otherItem.querySelector('.faq-answer-content');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ===================================================================
   4. EKOLLER & YAKLAŞIMLAR MODAL VE VERİ KATMANI
   (10 Gerçek Klinik Ekolün Derinlemesine Açıklamaları)
   =================================================================== */
const EKOLLER_DATA = {
  emdr: {
    title: "Yetişkin ve Çocuk EMDR Terapisi",
    subtitle: "Göz Hareketleriyle Duyarsızlaştırma ve Yeniden İşleme",
    content: `
      <p><strong>EMDR Nedir?</strong> EMDR (Eye Movement Desensitization and Reprocessing), geçmişte yaşanan olumsuz yaşam deneyimlerinin ve travmatik anıların beyinde sağlıklı biçimde işlenmesini sağlayan kanıta dayalı güçlü bir psikoterapi yöntemidir.</p>
      <br>
      <p><strong>Nasıl Çalışır?</strong> Çift yönlü uyarım (göz hareketleri, ses veya hafif dokunuşlar) kullanılarak kilitlenmiş travmatik anı ağları yeniden aktive edilir. Danışan bu süreçte anıyı unutmaz; ancak anının yarattığı yoğun acı, kaygı veya suçluluk hissi duyarsızlaşır ve yerini sağlıklı pozitif inançlara bırakır.</p>
      <br>
      <p><strong>Hangi Alanlarda Etkilidir?</strong></p>
      <ul style="padding-left: 20px; margin-top: 8px;">
        <li>Travma ve Travma Sonrası Stres Bozukluğu (TSSB)</li>
        <li>Fobiler, panik atak ve anksiyete bozuklukları</li>
        <li>Yas ve kayıp süreçleri</li>
        <li>Çocukluk çağı duygusal/fiziksel yaraları</li>
        <li>Performans ve sınav kaygısı (Çocuk & Ergenlerde)</li>
      </ul>
    `
  },
  oyun_cocuk_merkezli: {
    title: "Çocuk Merkezli Oyun Terapisi (ÇMOT)",
    subtitle: "Çocuğun Doğal İletişim Dili ile Güvenli İyileşme",
    content: `
      <p><strong>Oyun Terapisi Nedir?</strong> Yetişkinler için konuşmak ne ise, çocuklar için oyun odası odur. Çocuklar duygusal çatışmalarını ve iç dünyalarını kelimeler yerine oyuncaklar aracılığıyla ifade ederler.</p>
      <br>
      <p><strong>Temel Yaklaşım:</strong> Terapist, çocuğu olduğu gibi koşulsuz kabul eder, güvenli sınırlar koyar ve çocuğun içindeki büyüme potansiyeline alan açar. Yargısız ve destekleyici ortamda çocuk, duygularını düzenlemeyi (regülasyon) ve problem çözmeyi öğrenir.</p>
      <br>
      <p><strong>Hangi Yaş & Sorunlarda Tercih Edilir?</strong> 3-10 yaş arası çocuklarda; alt ıslatma, kardeş kıskançlığı, ayrılık kaygısı, öfke nöbetleri ve boşanma süreci uyumunda son derece etkilidir.</p>
    `
  },
  deneyimsel_oyun: {
    title: "Deneyimsel Oyun Terapisi (DOT)",
    subtitle: "Travmanın ve Duygusal Yüklerin Beden-Zihin Düzeyinde İfadesi",
    content: `
      <p><strong>DOT Nedir?</strong> Byron Norton ve Carol Norton tarafından geliştirilen bu ekolde çocuk, geçmişte yaşadığı travmatik veya zorlayıcı deneyimleri oyun odasında sembolik olarak yeniden canlandırır.</p>
      <br>
      <p><strong>Terapistin Rolü:</strong> Terapist yalnızca pasif bir gözlemci değil; çocuğun oyununa verdiği rollerle aktif bir duygusal eşlikçidir. Çocuk, güçsüz hissettiği anıyı güçlü ve kontrol sahibi olduğu yeni bir deneyime dönüştürür.</p>
    `
  },
  sema: {
    title: "Şema Terapi",
    subtitle: "Çocukluk Kökenli Kök İnançların ve Yaşam Tuzaklarının Dönüşümü",
    content: `
      <p><strong>Şema Terapi Nedir?</strong> Dr. Jeffrey Young tarafından geliştirilen Şema Terapi; Bilişsel Davranışçı Terapi, bağlanma teorisi ve psikodinamik yaklaşımları birleştiren derinlemesine bir yöntemdir.</p>
      <br>
      <p><strong>Yaşam Tuzakları:</strong> Çocuklukta karşılanmayan temel duygusal ihtiyaçlar (güvenli bağlanma, özerklik, sınırlar, ifade özgürlüğü) yetişkinlikte "terk edilme", "kusurluluk", "yetersizlik" veya "fedakarlık" gibi kök şemalara yol açar.</p>
      <br>
      <p><strong>Amaç:</strong> Danışanın içindeki incinmiş çocuk modunu korumak ve 'Sağlıklı Yetişkin' tarafını güçlendirerek tekrarlayan döngüleri kırmaktır.</p>
    `
  },
  bdt: {
    title: "Bilişsel Davranışçı Terapi (BDT)",
    subtitle: "Düşünce, Duygu ve Davranış Zincirinin Yapılandırılması",
    content: `
      <p><strong>BDT Nedir?</strong> BDT, bireyin olayları algılama biçiminin (otomatik düşünceler) onun duygusal tepkilerini ve davranışlarını doğrudan belirlediği ilkesine dayanan, yapılandırılmış ve hedef odaklı bir yaklaşımdır.</p>
      <br>
      <p><strong>Seans İçi Çalışmalar:</strong> Danışan ile birlikte işlevsiz düşünce kalıpları (felaketleştirme, ya hep ya hiç düşüncesi vb.) tespit edilir, kanıt incelemeleri yapılır ve daha esnek, alternatif düşünceler geliştirilir.</p>
      <br>
      <p><strong>Uygulama Alanları:</strong> Depresyon, yaygın anksiyete bozukluğu, obsesif kompulsif bozukluk (OKB), sosyal fobi ve stres yönetimi.</p>
    `
  },
  kum_tepsisi: {
    title: "Kum Tepsisi Terapisi",
    subtitle: "Bilinçdışının Minyatür Nesneler ve Dokunsal Kumla Somutlaşması",
    content: `
      <p><strong>Kum Tepsisi Nedir?</strong> Danışanın minyatür figürler (insanlar, hayvanlar, yapılar, doğal varlıklar) kullanarak kuru veya ıslak kum üzerinde kendi üç boyutlu dünyasını yarattığı dışavurumcu bir psikoterapi tekniğidir.</p>
      <br>
      <p><strong>Avantajı:</strong> Sözel olarak ifade edilmesi çok zor olan duygular, bastırılmış anılar ve karmaşık iç dünyalar güvenli bir metafor alanı bularak dışsallaştırılır.</p>
    `
  },
  oykulerle_terapi: {
    title: "Öykülerle Terapi",
    subtitle: "Metaforların İyileştirici Gücü ile İçsel Kaynaklara Ulaşım",
    content: `
      <p><strong>Öykülerin Gücü:</strong> Masallar ve terapötik öyküler, danışanın savunma mekanizmalarını yumuşatarak dolaylı yoldan içsel bir ayna tutar.</p>
      <br>
      <p><strong>Çocuk ve Yetişkinlerde:</strong> Karakterin karşılaştığı engeller ve çözümler üzerinden danışan, kendi yaşamındaki krizlere dair yeni bakış açıları ve dayanıklılık (rezilyans) mekanizmaları geliştirir.</p>
    `
  },
  aile_danismanligi: {
    title: "Aile Danışmanlığı & Aile Oyunu Terapisi",
    subtitle: "Sistemik Yaklaşımla Aile İçi İletişim ve Bağların Güçlendirilmesi",
    content: `
      <p><strong>Aile Terapisi Yaklaşımı:</strong> Bir bireyde ortaya çıkan belirti (çocuktaki öfke nöbeti, ergenlik krizleri vb.) çoğu zaman ailenin bütününe ait bir iletişim aksamasının yansımasıdır.</p>
      <br>
      <p><strong>Aile Oyunu Terapisi:</strong> Ebeveynlerin çocuklarıyla birlikte yapılandırılmış oyun seanslarına katıldığı, bağ kurmayı ve sağlıklı ebeveynlik tutumlarını pekiştiren interaktif bir yöntemdir.</p>
    `
  }
};

function initEkolModals() {
  const modalOverlay = document.getElementById('ekol-modal-overlay');
  const modalTitle = document.getElementById('modal-title-target');
  const modalSubtitle = document.getElementById('modal-subtitle-target');
  const modalBody = document.getElementById('modal-body-target');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !closeBtn) return;

  function openEkolModal(key) {
    const data = EKOLLER_DATA[key];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.content;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Ekol kartlarına tıklama dinleyicisi
  document.querySelectorAll('[data-ekol]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const ekolKey = card.getAttribute('data-ekol');
      openEkolModal(ekolKey);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ===================================================================
   5. KVKK VE GİZLİLİK AYDINLATMA METNİ MODALI
   =================================================================== */
function initKvkkModal() {
  const kvkkOverlay = document.getElementById('kvkk-modal-overlay');
  const kvkkTriggers = document.querySelectorAll('.open-kvkk-modal');
  const kvkkClose = document.getElementById('kvkk-close-btn');

  if (!kvkkOverlay || !kvkkClose) return;

  function openKvkk() {
    kvkkOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeKvkk() {
    kvkkOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  kvkkTriggers.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    openKvkk();
  }));

  kvkkClose.addEventListener('click', closeKvkk);

  kvkkOverlay.addEventListener('click', (e) => {
    if (e.target === kvkkOverlay) closeKvkk();
  });
}

/* ===================================================================
   6. RANDEVU & ÖN GÖRÜŞME FORMU KONTROLÜ
   (Client Validation + XSS Sanitization + WhatsApp Hazırlayıcı)
   =================================================================== */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  const feedbackBox = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !feedbackBox || !submitBtn) return;

  const phoneInput = form.querySelector('#phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x[2]) {
        e.target.value = x[1] ? x[1] : '';
      } else {
        e.target.value = !x[3] ? `${x[1]} (${x[2]}` : `${x[1]} (${x[2]}) ${x[3]}` + (x[4] ? ` ${x[4]}` : '') + (x[5] ? ` ${x[5]}` : '');
      }
    });
  }

  let isSubmitting = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Alan Değerlerini Al ve Sanitize Et (XSS Engeli)
    const fullName = sanitizeInput(form.querySelector('#full-name').value.trim());
    const phone = sanitizeInput(form.querySelector('#phone').value.trim());
    const email = sanitizeInput(form.querySelector('#email').value.trim());
    const serviceType = sanitizeInput(form.querySelector('#service-type').value);
    const sessionFormat = sanitizeInput(form.querySelector('#session-format').value);
    const notes = sanitizeInput(form.querySelector('#notes').value.trim());
    const kvkkConsent = form.querySelector('#kvkk-consent').checked;

    // Doğrulama Kontrolleri
    if (fullName.length < 3) {
      showFeedback('Lütfen geçerli bir isim ve soyisim giriniz.', 'error');
      return;
    }

    const cleanPhone = phone.replace(/[\s()-]/g, '');
    if (cleanPhone.length < 10) {
      showFeedback('Lütfen geçerli bir telefon numarası giriniz (Örn: 0544 185 22 09).', 'error');
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFeedback('Lütfen geçerli bir e-posta adresi giriniz.', 'error');
      return;
    }

    if (!kvkkConsent) {
      showFeedback('Devam edebilmek için KVKK aydınlatma metnini onaylamanız gerekmektedir.', 'error');
      return;
    }

    // Gönderim Durumu Başlat (Double Submit Koruması)
    isSubmitting = true;
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span>Talebiniz Hazırlanıyor...</span>
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
    `;

    setTimeout(() => {
      // Başarılı Bildirimi
      showFeedback('Randevu talebiniz başarıyla oluşturuldu. Klinik asistanımız en kısa sürede sizinle iletişime geçecektir.', 'success');
      form.reset();
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // WhatsApp doğrudan seans mesajı hazırlığı (İsteğe bağlı hızlı yönlendirme)
      const waMessage = encodeURIComponent(
        `Merhaba Klinik Psikolog Yaren Kiraz Güller,\n\nWeb siteniz üzerinden ön görüşme / randevu talebinde bulunmak istiyorum.\n\nİsim Soyisim: ${fullName}\nTelefon: ${phone}\nTercih Edilen Hizmet: ${serviceType}\nSeans Şekli: ${sessionFormat}\nNotlar: ${notes || 'Belirtilmedi'}`
      );
      
      const promptWa = confirm('Randevu talebiniz kaydedildi. Dilerseniz bu bilgileri doğrudan WhatsApp hattımıza da iletebilirsiniz. WhatsApp açılsın mı?');
      if (promptWa) {
        window.open(`https://wa.me/905441852209?text=${waMessage}`, '_blank');
      }
    }, 900);
  });

  function showFeedback(message, type) {
    feedbackBox.textContent = message;
    feedbackBox.className = `form-feedback-box ${type}`;
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function sanitizeInput(str) {
    return str.replace(/[&<>"'/]/g, (match) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      };
      return entities[match];
    });
  }
}

/* ===================================================================
   7. SCROLL SPY & AKTİF NAVİGASYON BAĞLANTILARI
   =================================================================== */
function initScrollSpy() {
  const hashNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (hashNavLinks.length === 0) return;

  const sections = document.querySelectorAll('section[id]');
  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        hashNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// Inline Spinner Keyframe injection
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

/* ===================================================================
   8. SCROLL OKUMA İLERLEME ÇUBUĞU
   =================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ===================================================================
   9. GELİŞMİŞ SCROLL REVEAL ANİMASYONLARI
   =================================================================== */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ===================================================================
   10. EMDR & İMGELEME: GÜVENLİ / HUZURLU YER REHBERİ
   =================================================================== */
const SAFE_PLACE_STEPS = {
  1: {
    num: 1,
    title: "1. Adım: Güvenli Alanını Zihninde Canlandır (Gör)",
    badge: "🌿 Zihninde tamamen güvende, korunaklı ve sakin hissettiğin bir yer seç",
    desc: "Burası daha önce huzur bulduğun sakin bir kumsal, çam kokulu bir orman, çocukluğundan sıcak bir oda veya tamamen zihninde yarattığın hayali bir sığınak olabilir. Gözlerini hafifçe kapat veya ekrana yumuşakça odaklan. Çevrende hangi renkleri, ışıkları ve ayrıntıları görüyorsun? Bu alanda yalnızca sen varsın ve tamamen güvendesin.",
    tags: ["Sakin Deniz Kenarı", "Çam Ormanı", "Sıcak Bir Oda", "Göl Kıyısı", "Yıldızlı Gökyüzü"],
    stepText: "Adım 1 / 4 — Görsel Canlandırma"
  },
  2: {
    num: 2,
    title: "2. Adım: Huzurun Seslerine Odaklan (İşit)",
    badge: "🌊 Bu korunaklı alanda kulağına hangi sakinleştirici sesler geliyor?",
    desc: "Kıyıya vuran dalgaların yumuşak ritmi mi, ağaçların yaprakları arasından süzülen ılık rüzgar mı, uzaktaki dingin kuş sesleri mi, yoksa seni sarıp sarmalayan huzurlu bir sessizlik mi? Bu seslerin zihnindeki tüm karmaşayı ve gürültüyü nasıl yavaşlattığına izin ver.",
    tags: ["Dalga Hışırtısı", "Hafif Esinti", "Kuş Cıvıltıları", "Dingin Sessizlik", "Yağmur Sesi"],
    stepText: "Adım 2 / 4 — İşitsel Farkındalık"
  },
  3: {
    num: 3,
    title: "3. Adım: Bedensel Teması ve Isıyı Fark Et (Hisset)",
    badge: "☀️ Tenine değen ısı nasıl? Bedeninde nerede bir gevşeme hissediyorsun?",
    desc: "Ayaklarının altındaki zemine odaklan; yumuşak kumlar mı, serin çimenler mi, yoksa sıcak bir battaniye mi? Tenine dokunan ferahlatıcı esintiyi veya ılık güneşi fark et. Burnundan sakin bir nefes alıp yavaşça verirken omuzlarının, boynunun ve çene kaslarının nasıl gevşeyip rahatladığını duyumsayın.",
    tags: ["Ilık Güneş Işığı", "Yumuşak Dokunuş", "Ferahlatıcı Hava", "Gevşeyen Omuzlar"],
    stepText: "Adım 3 / 4 — Somatik Gevşeme"
  },
  4: {
    num: 4,
    title: "4. Adım: Bu Huzuru Bedeninde Mühürle (Çıpalama)",
    badge: "🦋 Kelebek Kucaklaması ile bu güven duygusunu sinir sistemine kaydet",
    desc: "Şimdi kollarını göğsünün üzerinde çaprazla ve parmak uçlarını omuzlarına yerleştir (Kelebek Kucaklaması). Aşağıdaki ritme uyarak sağ ve sol elinle sırayla çok hafifçe omuzlarına vur: Sol... Sağ... Sol... Sağ... Bu güvenli hissi tanımlayan tek bir kelime seç (örneğin 'Huzur', 'Güvendeyim') ve 3 derin nefesle bu anı içine çek.",
    tags: ["Kelebek Kucaklaması", "İki Yönlü Uyarım", "Kelime Çıpası: 'Huzur'"],
    hasBilateral: true,
    stepText: "Adım 4 / 4 — Mühürleme Tamamlandı"
  }
};

function initGroundingExercise() {
  const stepButtons = document.querySelectorAll('.grounding-step-btn');
  const contentTarget = document.getElementById('grounding-content-target');
  const progressIndicator = document.getElementById('grounding-progress-indicator');
  const nextBtn = document.getElementById('grounding-next-btn');

  if (!contentTarget || !nextBtn) return;

  let currentStep = 1;

  function renderStep(step) {
    const data = SAFE_PLACE_STEPS[step];
    if (!data) return;

    currentStep = step;

    stepButtons.forEach(btn => {
      const btnStep = parseInt(btn.getAttribute('data-step'), 10);
      if (btnStep === step) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    contentTarget.style.opacity = '0';
    contentTarget.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      let tagsHtml = '';
      if (data.tags && data.tags.length > 0) {
        tagsHtml = `
          <div class="safe-place-tags" aria-label="İlham Önerileri">
            ${data.tags.map(tag => `<span class="safe-place-tag">${tag}</span>`).join('')}
          </div>
        `;
      }

      let bilateralHtml = '';
      if (data.hasBilateral) {
        bilateralHtml = `
          <div class="butterfly-tapping-box" aria-label="Kelebek Kucaklaması İki Yönlü Uyarım">
            <div class="butterfly-wing pulse-left">
              <span>🦋</span>
              <span>Sol Omuz</span>
            </div>
            <div class="butterfly-wing pulse-right">
              <span>🦋</span>
              <span>Sağ Omuz</span>
            </div>
          </div>
        `;
      }

      contentTarget.innerHTML = `
        <h3 class="grounding-title">${data.title}</h3>
        <div class="grounding-prompt-badge">
          <span>${data.badge}</span>
        </div>
        <p class="grounding-desc">${data.desc}</p>
        ${tagsHtml}
        ${bilateralHtml}
      `;
      contentTarget.style.transition = 'all 0.3s ease';
      contentTarget.style.opacity = '1';
      contentTarget.style.transform = 'translateY(0)';
    }, 150);

    if (progressIndicator) {
      progressIndicator.textContent = data.stepText;
    }

    if (step === 4) {
      nextBtn.innerHTML = '<span>Başa Dön ve Yeniden Hisset ↻</span>';
    } else {
      nextBtn.innerHTML = '<span>Sonraki Adıma Geç →</span>';
    }
  }

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.getAttribute('data-step'), 10);
      renderStep(step);
    });
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < 4) {
      renderStep(currentStep + 1);
    } else {
      renderStep(1);
    }
  });

  // İlk adımı ilklendir
  renderStep(1);
}

/* ===================================================================
   11. REHBERLİ DİYAFRAM NEFESİ ÇEMBERİ (Box Breathing Widget)
   =================================================================== */
function initBreathingExercise() {
  const toggleBtn = document.getElementById('breathing-toggle-btn');
  const circle = document.getElementById('breathing-circle-inner');
  const stateLabel = document.getElementById('breathing-state-label');
  const timerLabel = document.getElementById('breathing-timer-label');

  if (!toggleBtn || !circle || !stateLabel || !timerLabel) return;

  let isRunning = false;
  let timerInterval = null;
  let cycleTimeout = null;

  const PHASES = [
    { state: 'Nefes Al', duration: 4, className: 'inhale' },
    { state: 'Nefesi Tut', duration: 4, className: 'hold' },
    { state: 'Yavaşça Ver', duration: 6, className: 'exhale' },
    { state: 'Dinlen', duration: 2, className: 'rest' }
  ];

  let currentPhaseIndex = 0;
  let secondsRemaining = 4;

  function runPhase() {
    if (!isRunning) return;

    const phase = PHASES[currentPhaseIndex];
    stateLabel.textContent = phase.state;
    secondsRemaining = phase.duration;
    timerLabel.textContent = `${secondsRemaining} sn`;

    circle.className = `breathing-circle-inner ${phase.className}`;
    circle.style.transition = `transform ${phase.duration}s ease-in-out`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(timerInterval);
        return;
      }
      secondsRemaining--;
      if (secondsRemaining > 0) {
        timerLabel.textContent = `${secondsRemaining} sn`;
      }
    }, 1000);

    cycleTimeout = setTimeout(() => {
      if (!isRunning) return;
      currentPhaseIndex = (currentPhaseIndex + 1) % PHASES.length;
      runPhase();
    }, phase.duration * 1000);
  }

  function startBreathing() {
    isRunning = true;
    toggleBtn.innerHTML = '<span>Egzersizi Duraklat ⏸</span>';
    toggleBtn.classList.remove('btn-primary');
    toggleBtn.classList.add('btn-secondary');
    currentPhaseIndex = 0;
    runPhase();
  }

  function stopBreathing() {
    isRunning = false;
    clearInterval(timerInterval);
    clearTimeout(cycleTimeout);
    toggleBtn.innerHTML = '<span>Nefes Egzersizini Başlat ▶</span>';
    toggleBtn.classList.remove('btn-secondary');
    toggleBtn.classList.add('btn-primary');
    stateLabel.textContent = 'Hazır';
    timerLabel.textContent = 'Başlamak için tıkla';
    circle.className = 'breathing-circle-inner';
    circle.style.transform = 'scale(1)';
  }

  toggleBtn.addEventListener('click', () => {
    if (isRunning) {
      stopBreathing();
    } else {
      startBreathing();
    }
  });
}

/* ===================================================================
   11. LÜKS SPLASH SCREEN (Karşılama Ekranı Geçişi)
   =================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // Oturum boyunca sadece 1 kez göster (Kullanıcı aynı sekmede gezerken her seferinde beklemesin)
  try {
    if (sessionStorage.getItem('ykg_splash_shown')) {
      splash.style.display = 'none';
      return;
    }
    sessionStorage.setItem('ykg_splash_shown', 'true');
  } catch (e) {
    // sessionStorage erişim hatası (Safari private mode vb.) durumunda güvenli devam
  }

  function dismissSplash() {
    if (splash.classList.contains('fade-out')) return;
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 800);
  }

  // 1.4 saniye sonra yumuşak kayboluş
  const autoDismiss = setTimeout(dismissSplash, 1400);

  // Ziyaretçi beklemek istemezse tıklayarak anında geçebilir
  splash.addEventListener('click', () => {
    clearTimeout(autoDismiss);
    dismissSplash();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
      clearTimeout(autoDismiss);
      dismissSplash();
    }
  }, { once: true });
}

/* ===================================================================
   12. ŞEMA TERAPİ DUYGU & MOD PUSULASI
   =================================================================== */
const SCHEMA_MODES_DATA = {
  incinmis_cocuk: {
    tag: "Tespit Edilen Şema Modu",
    title: "İncinmiş Çocuk Modu",
    desc: "Çocuklukta karşılanmamış sevgi, görülme ve kabul ihtiyaçlarının tetiklendiği; kişinin kendini savunmasız, yetersiz ve yalnız hissettiği an.",
    voice: "Şu an içindeki küçük çocuk şefkate ve anlayışa ihtiyaç duyuyor; kendine biraz mola ver ve derin bir nefes al. Yetersiz değilsin; sadece yorgunsun ve güvende olmayı özlüyorsun."
  },
  cezalandirici_ebeveyn: {
    tag: "Tespit Edilen Şema Modu",
    title: "Cezalandırıcı / Talepkâr Ebeveyn Modu",
    desc: "Çocuklukta içselleştirilen katı beklentiler, onaylanmama korkusu ve en ufak bir hata veya dinlenme halinde kendine acımasızca öfke duyma hali.",
    voice: "Mükemmel olmak zorunda değilsin; olduğun halinle değerlisin. Hatalar senin yetersiz olduğunu değil, sadece insan olduğunu gösterir. İçindeki o sert sesi sustur ve kendine şefkatle yaklaş."
  },
  terk_edilme: {
    tag: "Tespit Edilen Şema Modu",
    title: "Terk Edilme & Güvensizlik Modu",
    desc: "Geçmişteki ayrılık, tutarsız ilgi veya duygusal yalnızlık anılarının tetiklendiği; ilişkilerde aşırı kaygı, dışlanma veya bırakılma korkusu.",
    voice: "Şu an güvendesin ve yetişkin halinle kendi ayaklarının üzerinde durabilirsin. Yalnızlık anlık bir duygudur; hayatındaki bağları koruyabilir ve yenilerini inşa edebilirsin."
  },
  saglikli_yetiskin: {
    tag: "Tespit Edilen Şema Modu",
    title: "Sağlıklı Yetişkin Modu",
    desc: "Duygularını kabul eden, sınırlarını sağlıklı çizebilen ve kendine bilgelikle rehberlik edebilen en dengeli içsel haliniz.",
    voice: "Harika bir dengedesin. Bu farkındalığı koruyarak karşılaştığın zorlukları sağduyu, öz-şefkat ve sükunetle aşabilirsin."
  }
};

function initSchemaCompass() {
  const buttons = document.querySelectorAll('.schema-mood-btn');
  const resultCard = document.getElementById('schema-result-card');

  if (!buttons.length || !resultCard) return;

  function renderMode(modeKey) {
    const data = SCHEMA_MODES_DATA[modeKey];
    if (!data) return;

    buttons.forEach(btn => {
      if (btn.getAttribute('data-mode') === modeKey) {
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-checked', 'false');
      }
    });

    resultCard.style.opacity = '0';
    resultCard.style.transform = 'translateY(8px)';

    setTimeout(() => {
      resultCard.innerHTML = `
        <div class="schema-mode-badge-wrap">
          <span class="schema-mode-tag">${data.tag}</span>
        </div>
        <h4 class="schema-result-title">${data.title}</h4>
        <p class="schema-result-desc">${data.desc}</p>
        <div class="schema-voice-box">
          <div class="schema-voice-header">
            <span>🌿</span>
            <span>Sağlıklı Yetişkinin Şefkatli Sesi Diyor ki:</span>
          </div>
          <p class="schema-voice-quote">"${data.voice}"</p>
        </div>
        <div class="schema-cta-row">
          <a href="iletisim.html" class="btn btn-primary" style="padding: 11px 22px; font-size: 0.875rem;">
            <span>Bu Şemalarınızı Güvenli Bir Alanda Dönüştürmek İçin Randevu Alın</span>
            <span class="btn-nested-icon" aria-hidden="true">→</span>
          </a>
        </div>
      `;
      resultCard.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      resultCard.style.opacity = '1';
      resultCard.style.transform = 'translateY(0)';
    }, 150);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modeKey = btn.getAttribute('data-mode');
      renderMode(modeKey);
    });
  });

  const initialActive = document.querySelector('.schema-mood-btn.active');
  const initialMode = initialActive ? initialActive.getAttribute('data-mode') : 'incinmis_cocuk';
  renderMode(initialMode);
}

/* ===================================================================
   13. BDT 3D ÇEVRİLEBİLİR DÜŞÜNCE TUZAĞI KARTLARI
   =================================================================== */
function initBdtFlipCards() {
  const cards = document.querySelectorAll('.bdt-flip-card');

  cards.forEach(card => {
    const inner = card.querySelector('.bdt-card-inner');
    if (!inner) return;

    function toggleFlip(e) {
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      inner.classList.toggle('is-flipped');
    }

    card.addEventListener('click', toggleFlip);

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inner.classList.toggle('is-flipped');
      }
    });
  });
}



