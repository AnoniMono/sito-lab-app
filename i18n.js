/* Language for the whole site: English is written in the HTML, Italian lives here.
   An element marked data-i18n="key" gets its inner HTML swapped; data-i18n-attr="alt:key,aria-label:key2"
   does the same for attributes. The choice comes from ?lang=, then what the visitor picked last time, then the
   browser's language, and is kept in localStorage. Pages and scripts can read I18N.lang and I18N.t(key, english),
   and listen for the "langchange" event. To add a language, add a block next to `it` and a button in the nav. */
(() => {
  const IT = {
    'meta.title': 'Veyra · L’assistente di laboratorio a mani libere',
    'meta.desc': 'Veyra mette la procedura di laboratorio sopra lo strumento: un assistente in realtà mista per Meta Quest 3, scritto alla scrivania in Veyra Studio e seguito al banco.',
    'lang.label': 'Lingua',
    'nav.label': 'Principale',
    'nav.bench': 'Al banco',
    'nav.desk': 'Alla scrivania',
    'nav.try': 'Prova Studio',
    'nav.team': 'Team',
    'cta.feedback': 'Dacci un feedback',
    'cta.try': 'Prova Studio nel browser',

    'hero.tag': 'L’assistente di laboratorio a mani libere.',
    'hero.lede': 'La tua procedura, accanto allo strumento. Su Meta Quest&nbsp;3 e&nbsp;3S.',

    'cmp.without': 'Senza Veyra',
    'cmp.with': 'Con Veyra',
    'cmp.knob': 'Confronta il banco senza e con Veyra',
    'cmp.bareAlt': 'Vista dal visore su un banco di laboratorio senza nulla aperto: mensole, pipette e un portatile.',
    'cmp.withAlt': 'Vista dal visore su un banco con pHmetro: un passo della procedura, una checklist, un PDF, una calcolatrice, una proteina in 3D, un timer e un pannello per disegnare strutture fluttuano attorno allo strumento vero.',
    'spot.calc': 'Calcolatrice',
    'spot.sds': 'Scheda di sicurezza',
    'spot.step': 'Passo della procedura',
    'spot.ppe': 'Checklist DPI',
    'spot.pdb': 'Struttura 3D da RCSB',
    'spot.timer': 'Timer',
    'spot.draw': 'Disegno di strutture',

    'bench.h': 'Gli occhi sul banco. Le mani sul lavoro.',
    'bench.p': 'Ogni clip è registrata dal visore, in un laboratorio vero.',
    'f1.h': 'Un passo alla volta',
    'f1.p': 'Il passo corrente resta sospeso sopra lo strumento.',
    'f1.v': 'Dal visore: il passo per lo standard a pH 4,01 sopra il pHmetro, mentre mani con i guanti tengono l’elettrodo',
    'f2.h': 'Controlli prima di iniziare',
    'f2.p': 'DPI e postazione, spuntati con un dito.',
    'f2.v': 'Dal visore: un dito spunta le voci della checklist dei dispositivi di protezione',
    'f3.h': 'Letture verificate sul momento',
    'f3.p': 'Ogni valore viene confrontato con i suoi limiti mentre lo inserisci.',
    'f3.v': 'Dal visore: letture di taratura digitate sulla tastiera fluttuante e segnate come accettate',
    'f4.h': 'Tutto da un solo menu',
    'f4.p': 'Calcolatrice, timer, note, assistente. A un tocco.',
    'f4.v': 'Dal visore: il menu di Veyra con calcolatrice, grafico, browser, disegno di strutture, timer, note, assistente e archivio',
    'f5.h': 'Disegna una molecola',
    'f5.p': 'Abbozza una struttura con un dito.',
    'f5.v': 'Dal visore: un anello benzenico disegnato e una catena aggiunta sul pannello di disegno',
    'f6.h': 'Qualsiasi struttura da RCSB',
    'f6.p': 'Apri una voce PDB in 3D e girala con la mano.',
    'f6.v': 'Dal visore: una voce RCSB aperta e la sua struttura proteica mostrata in 3D',

    'desk.h': 'Dal tuo file Word al visore.',
    'desk.p': 'Scritta e controllata alla scrivania. Mai modificata al banco.',
    'desk.tabs': 'Dal documento al visore',
    's1.n': 'Passo 1',
    's1.h': 'Importa',
    's1.d': 'Un modello locale abbozza i passi. Ogni numero arriva segnato da verificare.',
    's1.v': 'La finestra di importazione di Veyra Studio: una procedura .docx viene trascinata e importata',
    's2.n': 'Passo 2',
    's2.h': 'Fissa i limiti',
    's2.d': 'Dai un nome a ogni lettura e a cosa è corretto: <q>Pendenza fra 95 e 102&nbsp;%</q>.',
    's2.v': 'Impostazione di un limite di pendenza fra 95 e 102 per cento in Veyra Studio',
    's3.n': 'Passo 3',
    's3.h': 'Pubblica',
    's3.d': 'Quando i controlli sono puliti, un clic la manda a tutti i visori.',
    's3.v': 'Gli avvisi si azzerano e poi si clicca Pubblica in Veyra Studio',

    'try.h': 'Studio, dentro questa pagina.',
    'try.p': 'L’app vera. Fai il <b>Tour</b>, oppure costruiscine una con <b>Guidato</b>.',
    'try.tab1': '<b>Tour</b>Una procedura vera',
    'try.tab2': '<b>Guidato</b>Costruiscine una',
    'try.bar': 'Demo dal vivo',
    'try.reset': 'Ricomincia il tutorial',
    'try.fsOn': 'Schermo intero',
    'try.fsOff': 'Esci da schermo intero',
    'try.f1': 'Veyra Studio: tour',
    'try.f2': 'Veyra Studio: tutorial guidato',
    'try.imgAlt': 'Veyra Studio con la procedura di taratura del pHmetro aperta: i suoi passi in tre fasi e i limiti di accettabilità',
    'try.small': 'Studio è un’app per computer. Apri questa pagina da un computer per provarla qui.',

    'priv.eye': 'Privacy',
    'priv.h': 'Niente esce dal laboratorio.',
    'priv.p': 'Procedure, letture e voce restano su un computer del laboratorio e sui vostri visori.',
    'lab.net': 'Rete del laboratorio &middot; Wi-Fi o USB',
    'lab.noNet': 'Nessuna connessione a internet',
    'lab.pc': '<b>Il PC del laboratorio</b>Qui girano Studio, il riconoscimento vocale e l’assistente.',
    'lab.hs': '<b>I visori</b>Meta Quest 3 e 3S, al banco.',
    'lab.toHs': 'Procedure, schede di sicurezza, risposte',
    'lab.toPc': 'Letture, foto, note vocali',
    'lab.lanes': 'Il PC manda al visore procedure, schede di sicurezza, trascrizioni e risposte; il visore rimanda al PC letture, foto e note vocali.',
    'priv.c1h': 'Niente account, niente cloud',
    'priv.c1p': 'Il Wi-Fi del laboratorio o un cavo USB. Nessuna registrazione.',
    'priv.c2h': 'I modelli girano sul vostro PC',
    'priv.c2p': 'Voce, assistente e importazione girano tutti in locale.',
    'priv.c3h': 'La fotocamera guarda solo su richiesta',
    'priv.c3p': 'Solo quando chiedi che cos’è qualcosa.',

    'team.eye': 'Team',
    'team.h': 'Una sviluppatrice e un chimico.',
    'team.p': 'Veyra è costruito da due persone: una guida la tecnologia, l’altra la scienza che c’è dietro.',
    'team.r1': 'Co-fondatrice &middot; Tecnologia',
    'team.b1': 'Sviluppatrice XR. Guida la tecnologia di Veyra, dall’app per Meta&nbsp;Quest al banco a Studio alla scrivania.',
    'team.l1': 'Chi è Martina',
    'team.r2': 'Co-fondatore &middot; Scienza',
    'team.b2': 'Chimico. Guida la parte scientifica di Veyra: procedure, dati di sicurezza, calcoli e analisi, sempre fedeli alla pratica di laboratorio.',
    'team.l2': 'Chi è Filippo',

    'fb.h': 'Lavori in laboratorio? Dicci dove perdi tempo.',
    'fb.p': 'Dieci domande, circa tre minuti. Le tue risposte decidono cosa costruiamo dopo.',
    'fb.newTab': '(apre Google Moduli in una nuova scheda)',
    'fb.note': '',
    'fb.asksH': 'Cosa chiediamo',
    'fb.a1': '<b>Il tuo lavoro</b>Il tuo ruolo e l’ambito in cui lavori.',
    'fb.a2': '<b>Al banco</b>Cosa ti fa distogliere lo sguardo dall’esperimento, e quanto spesso.',
    'fb.a3': '<b>L’idea</b>Quali funzioni ti servirebbero, e cosa ti preoccupa di un visore in laboratorio.',
    'fb.a4': '<b>Il tuo laboratorio</b>Se ha già dei visori, e chi decide sui nuovi strumenti.',
    'fb.opt': 'Alla fine puoi lasciare la tua email per una chiamata di 10 minuti o per provare una prima versione. È facoltativo.',

    'foot.desc': 'Un assistente di laboratorio a mani libere per Meta Quest 3 e 3S, con Studio per scrivere le procedure alla scrivania.',
    'foot.product': 'Prodotto',
    'foot.us': 'Noi',
    'foot.privacy': 'Privacy',
    'foot.aboutH': 'Questa pagina',
    'foot.about': 'Una demo di un prodotto in sviluppo. Veyra non è ancora in vendita.',
    'foot.motto': 'Scrivila alla scrivania. Seguila al banco.',

    /* team pages */
    'tp.back': 'Torna al team',
    'tp.label': 'Team',
    'tp.next': 'Nel team anche',
    'tp.worksOn': 'Si occupa di',
    'tm.title': 'Martina Cesarini · Veyra',
    'tm.role': 'Co-fondatrice &middot; Tecnologia',
    'tm.bio': 'Sviluppatrice XR. Martina guida la tecnologia di Veyra: l’app che gira su Meta Quest al banco e Studio, l’app da scrivania dove le procedure vengono scritte e pubblicate.',
    'tm.works': 'App per il visore, Studio, voce e assistente',
    'tm.alt': 'Ritratto di Martina Cesarini',
    'tf.title': 'Filippo Rosati · Veyra',
    'tf.role': 'Co-fondatore &middot; Scienza',
    'tf.bio': 'Chimico. Filippo guida la parte scientifica di Veyra: come sono strutturate e controllate le procedure, i dati di sicurezza dietro ogni reagente, i calcoli e l’analisi dei risultati, sempre fedeli alla pratica di laboratorio.',
    'tf.works': 'Procedure, dati di sicurezza, calcoli, analisi',
    'tf.alt': 'Ritratto di Filippo Rosati',

    /* privacy page */
    'pp.title': 'Privacy · Veyra',
    'pp.back': 'Torna al sito',
    'pp.label': 'Note legali',
    'pp.h': 'Privacy',
    'pp.upd': 'Ultimo aggiornamento: 10 novembre 2026',
    'pp.h1': 'Che cos’è questa pagina',
    'pp.p1': 'Questa è la demo di un prodotto in sviluppo, curata da Martina Cesarini e Filippo Rosati. Non è un servizio commerciale e non vende nulla.',
    'pp.h2': 'Cosa raccoglie questa pagina',
    'pp.p2': 'Niente. Nessun modulo, nessuna statistica di visita, nessun cookie pubblicitario o di tracciamento.',
    'pp.l1': 'La demo di Studio gira interamente nel tuo browser e tiene quello che scrivi solo in memoria: chiudendo o ricaricando la pagina sparisce.',
    'pp.l2': 'La lingua che scegli viene ricordata nel local storage del tuo browser, e da nessun’altra parte.',
    'pp.h3': 'Il questionario',
    'pp.p3': 'Il questionario di feedback è un modulo Google, che si apre in una nuova scheda. Google tratta le tue risposte secondo la propria informativa sulla privacy. Noi leggiamo le risposte per decidere cosa costruire.',
    'pp.p4': 'Il campo email è facoltativo. Se lo compili, lo usiamo solo per organizzare la chiamata o la prova che hai chiesto, e lo cancelliamo quando non serve più. Per farlo cancellare prima, rispondi a uno qualsiasi dei nostri messaggi.',
    'pp.h4': 'Font',
    'pp.p5': 'Il testo di questo sito usa IBM Plex, caricato da Google Fonts. Quando la pagina si carica, il tuo browser contatta i server di Google, che vedono il tuo indirizzo IP.',
    'pp.h5': 'I tuoi diritti',
    'pp.p6': 'Secondo il GDPR puoi chiedere di vedere, correggere o cancellare i dati che abbiamo su di te, o opporti al loro uso. Puoi anche presentare reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).',
  };
  const dict = { it: IT };
  const supported = ['en', 'it'];
  const store = { get() { try { return localStorage.getItem('lang'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('lang', v); } catch (e) {} } };
  const pick = () => {
    const q = new URLSearchParams(location.search).get('lang');
    if (supported.includes(q)) return q;
    const saved = store.get();
    if (supported.includes(saved)) return saved;
    return /^it\b/i.test(navigator.language || '') ? 'it' : 'en';
  };
  const en = new WeakMap(); // the English each element was written with, to switch back
  const enAttr = new WeakMap();
  const I18N = {
    lang: 'en',
    t(key, fallback) { const d = dict[I18N.lang]; return d && key in d ? d[key] : fallback; },
    set(lang, opts) {
      if (!supported.includes(lang)) lang = 'en';
      const changed = lang !== I18N.lang;
      I18N.lang = lang;
      document.documentElement.lang = lang;
      const d = dict[lang] || {};
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        if (!en.has(el)) en.set(el, el.innerHTML);
        const k = el.getAttribute('data-i18n');
        el.innerHTML = lang !== 'en' && k in d ? d[k] : en.get(el);
      });
      document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        if (!enAttr.has(el)) enAttr.set(el, {});
        const orig = enAttr.get(el);
        el.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
          const [attr, k] = pair.split(':').map((s) => s.trim());
          if (!(attr in orig)) orig[attr] = el.getAttribute(attr);
          const v = lang !== 'en' && k in d ? d[k] : orig[attr];
          if (v != null) el.setAttribute(attr, v);
        });
      });
      document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      if (!(opts && opts.quiet)) store.set(lang);
      if (changed) dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    },
  };
  window.I18N = I18N;
  document.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('[data-lang]');
    if (b) I18N.set(b.dataset.lang);
  });
  // the first pass runs before the page paints (this script sits at the end of <body>), so Italian visitors never
  // see the English flash; it does not save the choice, so a browser in Italian is not pinned to it
  I18N.set(pick(), { quiet: true });
})();
