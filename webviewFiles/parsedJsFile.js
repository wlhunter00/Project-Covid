let e = null
    , t = null
    , n = null
    , i = 0;
const a = "https://www.iubenda.com/privacy-policy/37070270"
    , o = "https://www.iubenda.com/privacy-policy/37070270/cookie-policy"
    , r = "https://www.notion.so/coronavirus/Terms-and-conditions-90a31bc4c9e64f54992cb3660e2e5b28"
    , s = "https://forms.gle/CghwQGaTjzRmxg4C8"
    , l = "https://www.buymeacoffee.com/tGJba8O"
    , d = window.location.origin + "/assets/img/coffee.gif"
    , u = new function () {
        let e = this;
        this.countries = new he,
            this.cookies = new ue,
            this.cookieName = "ytoken",
            this.body = be("body"),
            this.xToken = e.body.getAttribute("data-a"),
            this.yToken = e.body.getAttribute("data-b"),
            this.zToken = e.body.getAttribute("data-c"),
            this.failMessage = "Oops, we couldn't load the app. Try reloading the page. If the problem persists, contact us at hello@progressier.com",
            e.body.removeAttribute("data-a"),
            e.body.removeAttribute("data-b"),
            e.body.removeAttribute("data-c"),
            this.header = function () {
                let t = {
                    [e.yToken]: e.xToken,
                    "x-date-req": e.zToken
                };
                return t
            }
            ,
            this.getCheckpoints = async function (t) {
                try {
                    let t = await fe("GET", "/get-checkpoints", null, e.header())
                        , n = t.data || [];
                    return e.parseEntities(n, "date"),
                        n
                } catch (t) {
                    new M({
                        msg: e.failMessage
                    })
                }
            }
            ,
            this.getNews = async function (t, n) {
                try {
                    let i = await fe("GET", "/get-news?c=" + t + "&q=coronavirus+" + n, null, e.header())
                        , a = i.data || [];
                    return a
                } catch (e) {
                    console.log(e)
                }
            }
            ,
            this.getPlaces = async function () {
                try {
                    let t = await fe("GET", "/get-places?privateParams=true", null, e.header())
                        , n = (JSON.parse(JSON.stringify(t)),
                            t.data || [])
                        , i = e.buildMasterRegions(n, []);
                    return e.parseEntities(i, "lastUpdated"),
                        e.createEmptyCountries(i),
                        i
                } catch (t) {
                    new M({
                        msg: e.failMessage
                    })
                }
            }
            ,
            this.createEmptyCountries = function (t) {
                e.countries.list.forEach(function (e) {
                    let n = t.findIndex(t => t.country === e.code);
                    if (n > -1)
                        return;
                    let i = {
                        id: e.code,
                        nonaffected: !0,
                        infected: 0,
                        dead: 0,
                        recovered: 0,
                        name: e.name,
                        country: e.code
                    };
                    t.push(i)
                })
            }
            ,
            this.buildMasterRegions = function (t, n) {
                t.forEach(function (i) {
                    if (i.isMaster)
                        return;
                    let a = n.find(e => e.country === i.country)
                        , o = parseInt(i.infected || 0)
                        , r = parseInt(i.sick || 0)
                        , s = parseInt(i.dead || 0)
                        , l = parseInt(i.recovered || 0)
                        , c = i.lastUpdated
                        , d = e.countries.longitude(i.country) || i.longitude
                        , u = e.countries.zoom(i.country) || 3
                        , p = e.countries.latitude(i.country) || i.latitude;
                    if ("number" != typeof o)
                        return;
                    a ? (a.longitude = o > a.infected ? d : a.longitude,
                        a.latitude = o > a.infected ? p : a.latitude,
                        a.infected += o,
                        a.recovered += l,
                        a.dead += s,
                        a.sick += r,
                        a.subregions += 1,
                        a.lastUpdated = g.compare(c, a.lastUpdated) ? a.lastUpdated : c) : n.push({
                            country: i.country,
                            name: e.countries.name(i.country),
                            id: i.country,
                            infected: o,
                            recovered: l,
                            dead: s,
                            sick: r,
                            subregions: 1,
                            isMaster: !0,
                            lastUpdated: i.lastUpdated,
                            longitude: d,
                            latitude: p,
                            zoom: u
                        });
                    let h = t.filter(function (e) {
                        return e.country === i.country
                    });
                    h.length > 1 && (i.isSub = !0,
                        i.zoom = u)
                });
                let i = n.filter(function (e) {
                    return e.subregions > 1
                })
                    , a = t.concat(i);
                return a
            }
            ,
            this.getHistory = async function (t, n) {
                try {
                    let i = await fe("GET", "/get-history?id=" + t, null, e.header())
                        , a = i.data || [];
                    return t.length < 3 && (a.name = e.countries.name(t)),
                        e.parseHistoryObj(a),
                        a.history.forEach(function (t) {
                            e.parseEntity(t)
                        }),
                        a.history.sort(R("day")),
                        a
                } catch (t) {
                    n || new M({
                        msg: e.failMessage
                    }),
                        console.log(t)
                }
            }
            ,
            this.parseHistoryObj = async function (t) {
                !t.country && t.id && t.id.length < 5 && (t.country = t.id),
                    t.pop || (t.pop = e.countries.getParam(t.country, "pop")),
                    t.history && t.history.length > 0 && t.history.forEach(function (e) {
                        e.pop = t.pop
                    })
            }
            ,
            this.getRegions = async function (t) {
                try {
                    e.countries.getParam(t, "regions");
                    let n = []
                        , i = await e.getPlaces()
                        , a = i.find(e => e.id === t);
                    if (!a)
                        return [];
                    let o = a.isSub;
                    return o && (t = a.country),
                        i.forEach(function (e) {
                            e.country === t && n.push(e)
                        }),
                        n
                } catch (e) {
                    console.log(e)
                }
            }
            ,
            this.parseEntities = function (t, n, i) {
                return t ? t.length < 1 ? t : (t.forEach(function (t, n) {
                    e.parseEntity(t)
                }),
                    t.sort(R(n)),
                    void (i && t.reverse())) : []
            }
            ,
            this.parseEntity = function (t) {
                if (!t)
                    return {};
                t.infected = parseInt(t.infected) || 0,
                    t.dead = parseInt(t.dead) || 0,
                    t.recovered = parseInt(t.recovered) || 0,
                    e.calculateSick(t),
                    e.calculateFatalityRate(t),
                    e.calculateRecoveryRate(t),
                    e.calculateActiveRate(t),
                    e.calculateCasesPerMillion(t),
                    e.calculateDeathsPerMillion(t)
            }
            ,
            this.calculateCasesPerMillion = function (t) {
                let n = t.infected
                    , i = t.country
                    , a = e.countries.getParam(i, "pop");
                t.pop;
                if (!t.pop & t.isMaster && a && (t.pop = a),
                    !t.pop)
                    return void (t.casesPerMillion = 0);
                let o = n / t.pop * 1e6;
                t.casesPerMillion = o < .001 ? .001 : parseFloat(o.toFixed(2))
            }
            ,
            this.calculateDeathsPerMillion = function (t) {
                let n = t.dead || 0
                    , i = t.country
                    , a = e.countries.getParam(i, "pop");
                t.pop;
                if (!t.pop & t.isMaster && a && (t.pop = a),
                    !t.pop)
                    return void (t.deathsPerMillion = 0);
                let o = n / t.pop * 1e6;
                t.deathsPerMillion = o < .001 ? .001 : parseFloat(o.toFixed(2))
            }
            ,
            this.calculateFatalityRate = function (e) {
                let t = e.dead
                    , n = e.infected
                    , i = (t / n * 100 || 0).toFixed(2) || 0;
                isFinite(i) || (i = (0).toFixed(2)),
                    e.fatalityRate = parseFloat(i)
            }
            ,
            this.calculateActiveRate = function (e) {
                e.activeRate = 100 - e.fatalityRate - e.recoveryRate
            }
            ,
            this.calculateRecoveryRate = function (e) {
                let t = e.recovered
                    , n = e.infected
                    , i = (t / n * 100 || 0).toFixed(2) || 0;
                isFinite(i) || (i = (0).toFixed(2)),
                    e.recoveryRate = parseFloat(i)
            }
            ,
            this.calculateSick = function (e) {
                e.sick = parseInt(e.infected || 0) - parseInt(e.dead || 0) - parseInt(e.recovered || 0),
                    e.sick < 0 && (e.sick = 0)
            }
            ,
            this.init = function () {
                navigator.cookieEnabled || new Q("You must enable cookies for this app to work").render()
            }
            ,
            this.init()
    }
    , p = new function () {
        let e = this;
        this.options = ["EN", "TW", "FR", "RU", "KR", "DE", "IT", "ES", "HU", "GR", "TR", "PL", "PT", "CZ"],
            this.lang = null,
            this.countries = new he,
            this.cookies = new ue,
            this.cookieName = "lang",
            this.attributions = {
                DE: "German translation by Matthias Schaffer, Fiona Georgia, Benni Neubacher, Miszel Brzakalik, Stephan Crummenauer, Laura Hoffmann, Mike Hahn, Henri Hollmann, Manuel Lapuente Gonzalez, Christian Chvala",
                IT: "Italian translation by Alessandro Palazzesi, Lorenzo Geromel, Ester Memoli, Lorenzo Di Capua",
                ES: "Spanish translation by Luis Astorquiza, Wilmar Echeverry, Julio Gustavo Bustamante Mera, Mateo Llera, Alejandro Ortiz Obregon, Gerard López López, Jesus Antonio Castro, David Domínguez Martínez, Daniel Ramos, Joana Fernández, Frederick Ferro, Hugo Villegas, Timothy Arce, Francisco Javier Rojas, Andrés Aguirre, Ismael Jorge HP, Carlos Ivan Rivera Avalos, Julia Manuela Rizo, Laura Rivas, Luis G. Corral, Pablo de Andres, Fernando Sancho, Hector A Lopez Rdz, Sebastián Haddad, Darwin Josue Pilaloa Zea, Alexis Noria, Jonathan Vargas Vargas, Luisa Fernanda Vaca Correa, Ferney Palacio, Sergio Nicolás Melo Torres ",
                HU: "Hungarian translation by Nagy Adam, Attila Böjte, Lili Repkó",
                GR: "Greek translation by Marianna Chatzigianni, Christos Makris, Kostas Kayioulis, Vidianos Giannitsis",
                TR: "Turkish translation by Selçuk Göktekin, Enes Aslan, Muhammed Aziz Ulak, Mesut Levent Turgut, İklim Uluca, Aytaç Semi Soylu, Murat Kucukgirgin, Devrim Barış Yıldırım, Berkay Tutal, Alper Çevik, Selim Düzgün, Fatih kiraz, Ugur Korkmazyurek, İsmail Ay, Burak Muratoglu, Canberk Çetinkaya, Burak Emer, Selim Gormus, Nafi Kabakoğlu, Baran Aluz, Timucin Dograr, Abdülkadir Tetik",
                PL: "Polish translation by Marcin Ostrowski, Mikołaj Zaremba (Hexandcube), Wiktoria Dudek, Dominik Piestrzyński",
                PT: "Portuguese translation by Caio Verneck de Oliveira, Osório Costa,  Markel Lindo, Matheus Araujo, Paulo Bauken Cabral Sampaio, Rui Oliveira, Camila Sehn Bonatto, Luis G. Corral, Carlos Gouveia, Adriano Bini, Bruno Leonardo Vilas Boas Colonnese, Bruno Simoneto, Zehon Gebber Vaz, Samuel Barros, Bruno Perdigão, Valdo Raya",
                CZ: "Czech translation by Milan Welser, Roman Praslička, Filip Kavan, Niki Vostrovska, Vojtěch Hermann, Michael Weidenhoffer, Ondrej Rethy, Tomáš Hampl, Jabiru Jabiru, Martin Pospíšil, Zdenek Vcela, Matěj Vácha, Anna Slapničková"
            },
            this.map = {
                LI: "DE",
                AT: "DE",
                CH: "FR",
                BE: "FR",
                CD: "FR",
                MX: "ES",
                CO: "ES",
                AR: "ES",
                PE: "ES",
                VE: "ES",
                CL: "ES",
                EC: "ES",
                GT: "ES",
                CU: "ES",
                BO: "ES",
                DO: "ES",
                HN: "ES",
                PY: "ES",
                SV: "ES",
                NI: "ES",
                CR: "ES",
                PA: "ES",
                UY: "ES",
                GQ: "ES",
                CY: "GR",
                BR: "PT",
                AO: "PT",
                MZ: "PT",
                GW: "PT",
                CV: "PT",
                ST: "PT"
            },
            this.getAttribution = function () {
                return e.attributions[e.lang]
            }
            ,
            this.set = function (t) {
                e.options.includes(t) && (e.lang = t,
                    e.cookies.set(e.cookieName, t, 9999),
                    be("body").setAttribute("data-language", t),
                    v.rerender())
            }
            ,
            this.init = function () {
                e.updateTime();
                let t = e.cookies.get(e.cookieName)
                    , n = e.getCountry()
                    , i = t || e.map[n] || n;
                e.lang = i && e.options.includes(i) ? i : e.options[0],
                    be("body").setAttribute("data-language", e.lang)
            }
            ,
            this.getCountry = function () {
                return be("body").getAttribute("data-country")
            }
            ,
            this.getENCountry = function () {
                let t = e.getCountry();
                return ["GB", "CA", "IE", "NZ", "AU", "ZA"].includes(t) ? t : "US"
            }
            ,
            this.getESCountry = function () {
                let t = e.getCountry();
                return ["MX", "CO", "AR", "PE", "VE", "CL", "EC", "GT", "CU", "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "GQ"].includes(t) ? t : "ES"
            }
            ,
            this.getPTCountry = function () {
                let t = e.getCountry();
                return ["AO", "BR", "MZ", "GW", "CV", "ST"].includes(t) ? t : "PT"
            }
            ,
            this.selector = function (t) {
                let n = ge("div", "language-selector-inner", {
                    parent: t,
                    click: function () {
                        e.modal(n)
                    }
                })
                    , i = ge("div", "language-selector-button", {
                        parent: n
                    });
                ge("img", {
                    src: e.languageFlag(e.lang),
                    parent: i
                }),
                    ge("span", "language-selector-title", {
                        parent: i,
                        text: e.languageName(e.lang)
                    })
            }
            ,
            this.languageName = function (t) {
                return "EN" === t ? "English" : e.countries.language(t)
            }
            ,
            this.getLocale = function () {
                let t = e.lang;
                return "EN" === t ? e.getENCountry() : "ES" === t ? e.getESCountry() : "PT" === t ? e.getPTCountry() : t || "US"
            }
            ,
            this.languageFlag = function (t) {
                return "EN" === t ? e.countries.flag(e.getENCountry()) : "ES" === t ? e.countries.flag(e.getESCountry()) : "PT" === t ? e.countries.flag(e.getPTCountry()) : e.countries.flag(t)
            }
            ,
            this.openTranslateForm = function () {
                window.open("https://forms.gle/4JRG5zBh13drMUa86", "_blank")
            }
            ,
            this.clickOnLanguageItem = function (t) {
                "translate" === t ? e.openTranslateForm() : e.set(t)
            }
            ,
            this.modal = function (t) {
                let n = [];
                e.options.forEach(function (t) {
                    n.push({
                        img: e.languageFlag(t),
                        name: e.languageName(t),
                        value: t
                    })
                }),
                    new G({
                        node: t,
                        callback: e.clickOnLanguageItem,
                        options: n,
                        title: A("language")
                    })
            }
            ,
            this.updateTime = function () {
                moment.locale("RU", {
                    relativeTime: {
                        future: "через %s",
                        past: "%s назад",
                        s: "несколько секунд",
                        ss: "%d секунд",
                        m: "минуту",
                        mm: "%d минуты",
                        h: "час",
                        hh: "%d часа",
                        d: "день",
                        dd: "%d дня",
                        M: "месяц",
                        MM: "%d месяца",
                        y: "год",
                        yy: "%d года"
                    }
                }),
                    moment.locale("CZ", {
                        relativeTime: {
                            future: "za %s",
                            past: "před %s",
                            s: "několik sekund",
                            ss: "%d sekund",
                            m: "minuta",
                            mm: "%d minutami",
                            h: "hodinou",
                            hh: "%d hodinami",
                            d: "dnem",
                            dd: "%d dny",
                            M: "měsíc",
                            MM: "%d měsíce",
                            y: "rokem",
                            yy: "%d lety"
                        }
                    }),
                    moment.locale("PT", {
                        relativeTime: {
                            future: "em %s",
                            past: "%s atrás",
                            s: "alguns segundos",
                            ss: "%d segundos",
                            m: "um minuto",
                            mm: "%d minutos",
                            h: "hora",
                            hh: "%d horas",
                            d: "um dia",
                            dd: "%d dias",
                            M: "um mês",
                            MM: "%d meses",
                            y: "um ano",
                            yy: "%d anos"
                        }
                    }),
                    moment.locale("PL", {
                        relativeTime: {
                            future: "w %s",
                            past: "%s temu",
                            s: "kilka sekund",
                            ss: "%d sekund",
                            m: "minutę",
                            mm: "%d minuty",
                            h: "godzinę",
                            hh: "%d godziny",
                            d: "dzień",
                            dd: "%d dni",
                            M: "miesiąc",
                            MM: "%d miesiące",
                            y: "rok",
                            yy: "%d lata"
                        }
                    }),
                    moment.locale("TR", {
                        relativeTime: {
                            future: "%s içinde",
                            past: "%s önce",
                            s: "birkaç saniye",
                            ss: "%d saniye",
                            m: "bir dakika",
                            mm: "%d dakika",
                            h: "bir saat",
                            hh: "%d saat",
                            d: "bir gün",
                            dd: "%d gün",
                            M: "bir ay",
                            MM: "%d ay",
                            y: "bir yıl",
                            yy: "%d yıl"
                        }
                    }),
                    moment.locale("GR", {
                        relativeTime: {
                            future: "την %s",
                            past: "πριν %s",
                            s: "μερικά δευτερόλεπτα",
                            ss: "%d δευτερόλεπτα",
                            m: "ένα λεπτό",
                            mm: "%d λεπτά",
                            h: "μία ώρα",
                            hh: "%d ώρες",
                            d: "μιά ημέρα",
                            dd: "%d ημέρες",
                            M: "ένα μήνα",
                            MM: "%d μήνες",
                            y: "ένα έτος",
                            yy: "%d έτη"
                        }
                    }),
                    moment.locale("HU", {
                        relativeTime: {
                            future: "ben %s",
                            past: "ezelőtt %s",
                            s: "pár másodperce",
                            ss: "%d másodperce",
                            m: "egy perce",
                            mm: "%d perce",
                            h: "egy órája",
                            hh: "%d órája",
                            d: "egy nap",
                            dd: "%d napja",
                            M: "egy hónapja",
                            MM: "%d hónapja",
                            y: "egy éve",
                            yy: "%d éve"
                        }
                    }),
                    moment.locale("ES", {
                        relativeTime: {
                            future: "en %s",
                            past: "%s atrás",
                            s: "unos pocos segundos",
                            ss: "%d segundos",
                            m: "un minuto",
                            mm: "%d minutos",
                            h: "una hora",
                            hh: "%d horas",
                            d: "un día",
                            dd: "%d días",
                            M: "un mes",
                            MM: "%d meses",
                            y: "un año",
                            yy: "%d años"
                        }
                    }),
                    moment.locale("IT", {
                        relativeTime: {
                            future: "in %s",
                            past: "%s fa",
                            s: "pochi secondi",
                            ss: "%d secondi",
                            m: "un minuto",
                            mm: "%d minuti",
                            h: "un'ora",
                            hh: "%d ore",
                            d: "un giorno",
                            dd: "%d giorni",
                            M: "un mese",
                            MM: "%d mesi",
                            y: "un anno",
                            yy: "%d anni"
                        }
                    }),
                    moment.locale("DE", {
                        relativeTime: {
                            future: "in %s",
                            past: "vor %s",
                            s: "ein paar Sekunden",
                            ss: "%d Sekunden",
                            m: "eine Minute",
                            mm: "%d Minuten",
                            h: "eine Stunde",
                            hh: "%d Stunden",
                            d: "einen Tag",
                            dd: "%d Tage",
                            M: "ein Monat",
                            MM: "%d Monate",
                            y: "ein Jahr",
                            yy: "%d Jahre"
                        }
                    }),
                    moment.locale("FR", {
                        relativeTime: {
                            future: "dans %s",
                            past: "il y a %s",
                            s: "quelques secondes",
                            ss: "%d secondes",
                            m: "une minute",
                            mm: "%d minutes",
                            h: "une heure",
                            hh: "%d heures",
                            d: "un jour",
                            dd: "%d jours",
                            M: "un mois",
                            MM: "%d mois",
                            y: "un an",
                            yy: "%d ans"
                        }
                    }),
                    moment.locale("TW", {
                        relativeTime: {
                            future: "%s内",
                            past: "%s前",
                            s: "几秒",
                            m: "1分",
                            mm: "%d分",
                            h: "1小時",
                            hh: "%d小時",
                            d: "1天",
                            dd: "%d天",
                            M: "1個月",
                            MM: "%d個月",
                            y: "1年",
                            yy: "%d年"
                        }
                    }),
                    moment.locale("KR", {
                        relativeTime: {
                            future: "%s 후",
                            past: "%s 전",
                            s: "몇 초",
                            m: "1분",
                            mm: "%d분",
                            h: "1시간",
                            hh: "%d시간",
                            d: "1일",
                            dd: "%d일",
                            M: "1달",
                            MM: "%d달",
                            y: "1년",
                            yy: "%d년"
                        }
                    })
            }
            ,
            this.init()
    }
    , h = new function () {
        let e = this;
        this.setUrl = function (e) {
            let t = window.location.origin + window.location.pathname + window.location.search;
            history.replaceState({
                page: e,
                previous: t
            }, "", e)
        }
            ,
            this.replace = function (t, n) {
                let i = "/";
                t.forEach(function (e, n) {
                    i += t[n],
                        t[n + 1] && (i += "/")
                }),
                    i += window.location.search ? window.location.search : "",
                    e.pushState(i)
            }
            ,
            this.pushState = function (e) {
                let t = window.location.origin + e
                    , n = window.location.origin + window.location.pathname + window.location.search;
                t !== n && history.pushState({
                    page: t,
                    previous: n
                }, "", t)
            }
            ,
            this.getParam = function (e) {
                let t = new URLSearchParams(window.location.search)
                    , n = t.get(e);
                return n
            }
            ,
            this.get = function () {
                let e = window.location.pathname
                    , t = e.split("/");
                return t[1]
            }
            ,
            this.getSubPath = function () {
                let e = window.location.pathname
                    , t = e.split("/");
                return t[2]
            }
            ,
            this.resetParam = function () {
                e.pushState(window.location.origin + window.location.pathname)
            }
            ,
            this.setParam = function (t) {
                let n = new URLSearchParams(window.location.search);
                for (var i of n.entries()) {
                    var a = i[0]
                        , o = i[1]
                        , r = t[a];
                    null === r ? delete t[a] : r || (t[a] = o)
                }
                let s = window.location.pathname + "?";
                for (x in t)
                    t[x] && (s += x + "=" + t[x] + "&");
                let l = s.slice(-1);
                "&" !== l && "?" !== l || (s = s.slice(0, s.length - 1)),
                    e.pushState(s)
            }
    }
    , m = new function () {
        let e = this;
        this.list = [],
            this.cache = [],
            this.cacheable = ["/get-checkpoints", "/get-regions", "/get-news", "/get-history", "/get-places?privateParams=true", "/get-data", "/get-place-reports", "/get-place", "/get-report", "/get-taiwan-masks"],
            this.max = 35,
            this.register = function (t, n, i) {
                e.cache.length > e.max && (e.cache = e.cache.slice(2, e.cache.length - 1)),
                    e.cache.push({
                        route: t,
                        promise: n,
                        data: i
                    })
            }
            ,
            this.isCacheable = function (t) {
                let n = null;
                return e.cacheable.forEach(function (e) {
                    (e === t || t.includes(e)) && (n = !0)
                }),
                    n
            }
            ,
            this.find = function (t, n) {
                let i = e.isCacheable(t);
                if (i)
                    for (let i = 0; i < e.cache.length; i++) {
                        let a = e.cache[i];
                        if (a.route === t && ((!n || a.data) && (n || !a.data))) {
                            if (n) {
                                let e = me(n, a.data);
                                if (e)
                                    continue
                            }
                            return a.promise
                        }
                    }
                return null
            }
    }
    , f = (new function () {
        let e = this;
        this.loadDate = moment().toISOString(),
            this.timer = null,
            this.displayAfter = 12e5,
            this.element = null,
            this.check = function () {
                let t = moment().diff(moment(e.loadDate));
                t > e.displayAfter && (e.render(),
                    clearInterval(e.timer))
            }
            ,
            this.reloadPage = function () {
                location.reload(!0)
            }
            ,
            this.render = function () {
                e.element = ge("div", "backdrop", {
                    parent: be("body")
                });
                let t = ge("div", "update-reloader", {
                    parent: e.element,
                    click: e.reloadPage
                });
                ge("i", ["fa", "fa-redo-alt"], {
                    parent: t
                }),
                    ge("span", {
                        parent: t,
                        text: window.innerWidth > 991 ? "Click to update" : "Tap to update"
                    })
            }
            ,
            this.init = function () {
                e.timer = setInterval(function () {
                    e.check()
                }, 1e3)
            }
            ,
            this.init()
    }
        ,
    {
        map: {
            EN: "World Map",
            FR: "Carte du monde",
            TW: "地圖",
            KR: "지도",
            DE: "Karte",
            IT: "Mappa",
            ES: "Mapa",
            HU: "Térkép",
            GR: "Χάρτης",
            TR: "Harita",
            PL: "Mapa",
            PT: "Mapa",
            CZ: "Mapa",
            RU: "Карта"
        },
        documentation: {
            EN: "Documentation"
        },
        blog: {
            EN: "Blog"
        },
        compareWith: {
            EN: "Compare {t} with",
            FR: "Comparer {t} avec",
            TW: "將{t}與",
            KR: "{t}와",
            DE: "Vergleiche {t} mit",
            IT: "Confronta {t} con",
            ES: "Compare {t} con",
            HU: "Hasonlítsa össze",
            GR: "Συγκρίνετε το {t} με",
            TR: "{T} ile karşılaştır",
            PL: "Porównaj {t} z",
            PT: "Compare {t} com",
            CZ: "Porovnejte {t} s",
            RU: "Сравните {t} с"
        },
        flags: {
            EN: "Flags",
            FR: "Drapeaux",
            TW: "標誌",
            KR: "플래그",
            DE: "Flaggen",
            IT: "Bandiere",
            ES: "Banderas",
            HU: "Zászlók",
            GR: "Σημαίες",
            TR: "Bayraklar",
            PL: "Flagi",
            PT: "Bandeiras",
            CZ: "Vlajky",
            RU: "Флаги"
        },
        all: {
            EN: "All",
            FR: "Tous",
            TW: "一切",
            KR: "모두",
            DE: "Alles",
            IT: "Tutti",
            ES: "Todas",
            HU: "Minden",
            GR: "Ολα",
            TR: "Herşey",
            PL: "Wszystko",
            PT: "Todos",
            CZ: "Všechno",
            RU: "Все"
        },
        regionDetails: {
            EN: "Details",
            FR: "Détails",
            TW: "細節",
            KR: "세부",
            DE: "Einzelheiten",
            IT: "Dettagli",
            ES: "Detalles",
            HU: "Részletek",
            GR: "Λεπτομέριες",
            TR: "ayrıntılar",
            PL: "Detale",
            PT: "Detalhes",
            CZ: "Podrobnosti",
            RU: "подробности"
        },
        show: {
            EN: "Show {nb}",
            FR: "Afficher {nb}",
            TW: "顯示{nb}",
            KR: "{nb} 보이기",
            DE: "Zeige {nb}",
            IT: "Mostra {nb}",
            ES: "Mostrar {nb}",
            HU: "Mutasd {nb}",
            GR: "Προβολή {nb}",
            TR: "{nb} Göster",
            PL: "Pokaż {nb}",
            PT: "Mostre {nb}",
            CZ: "Ukázat {nb}",
            RU: "Показать {nb}"
        },
        showAll: {
            EN: "Show all",
            FR: "Afficher tout",
            TW: "顯示所有",
            KR: "모두 보이기",
            DE: "Zeige alles",
            IT: "Mostra tutto",
            ES: "Mostrar todo",
            HU: "Mutasd az összeset",
            GR: "Προβολή όλων",
            TR: "Hepsini Göster",
            PL: "Pokaż wszystko",
            PT: "Mostre tudo",
            CZ: "Ukázat vše",
            RU: "Показать все"
        },
        stacked: {
            EN: "Stacked",
            FR: "Empilés",
            TW: "堆疊式",
            KR: "쌓인",
            ES: "Apilado",
            DE: "Gestapelt",
            IT: "Accatastare",
            HU: "Halmozott",
            GR: "Στοιβάζονται",
            TR: "Yığılmış",
            PL: "Ułożone",
            PT: "Empilhados",
            CZ: "Skládaný",
            RU: "сложены"
        },
        recent: {
            EN: "Past {nb} days",
            FR: "{nb} derniers jours",
            TW: "過去{nb}天",
            KR: "지난 {nb} 일",
            DE: "Letzte {nb} Tage",
            IT: "{nb} giorni precedenti",
            ES: "Últimos {nb} días",
            HU: "Az elmúlt {nb} nap",
            GR: "Τελευταίες {nb} ημέρες",
            TR: "Son {nb} gün",
            PL: "Ostatnie {nb} dni",
            PT: "Últimos {nb} dias",
            CZ: "Posledních {nb} dní",
            RU: "Последние {nb} дней"
        },
        allTime: {
            EN: "All time",
            FR: "Depuis le début",
            TW: "從一開始",
            KR: "처음부터",
            DE: "Von Anfang an",
            IT: "Dall'inizio",
            ES: "Desde el principio",
            HU: "Elölről",
            GR: "Από την αρχή",
            TR: "Başlangıçtan beri",
            PL: "Od początku",
            PT: "Do começo",
            CZ: "Od začátku",
            RU: "С самого начала"
        },
        overview: {
            EN: "Overview",
            FR: "Vue d'ensemble",
            TW: "總覽",
            KR: "개요",
            DE: "Überblick",
            IT: "Panoramica",
            ES: "Visión general",
            HU: "Áttekintés",
            GR: "Επισκόπηση",
            TR: "Genel bakış",
            PL: "Przegląd",
            PT: "Visão geral",
            CZ: "Přehled",
            RU: "обзор"
        },
        coronalytics: {
            EN: "Coronalytics"
        },
        reset: {
            EN: "Reset"
        },
        language: {
            EN: "Language",
            TW: "語言",
            FR: "Langue",
            KR: "언어",
            DE: "Sprache",
            IT: "Lingua",
            ES: "Lenguaje",
            HU: "Nyelv",
            GR: "Γλώσσα",
            TR: "Dil",
            PL: "Język",
            PT: "Língua",
            CZ: "Jazyk",
            RU: "Язык"
        },
        clickToLearn: {
            EN: "Click to learn more",
            FR: "Cliquez pour en savoir plus",
            ES: "Haz click para aprender mas",
            IT: "Clicca per saperne di più",
            DE: "Klicke, um mehr zu lernen",
            PT: "Clique para aprender mais",
            TW: "點擊了解更多",
            KR: "자세한 내용을 보려면 클릭하십시오",
            HU: "Kattintson további információra",
            GR: "Κάντε κλικ για να μάθετε περισσότερα",
            TR: "Daha fazla bilgi için tıklayın",
            PL: "Kliknij by dowiedzieć się więcej",
            CZ: "Kliknutím získáte další informace",
            RU: "Нажмите, чтобы узнать больше"
        },
        likeApp: {
            EN: "Enjoying the app?",
            FR: "Vous aimez cette appli ?",
            ES: "¿Te gusta esta app?",
            IT: "Ti piace questa app?",
            DE: "Mögen Sie diese App?",
            PT: "Você gosta deste app?",
            TW: "你喜歡這個APP嗎？",
            KR: "이 앱이 마음에 드십니까?",
            HU: "Tetszik ez az alkalmazás?",
            GR: "Σας αρέσει αυτή η εφαρμογή;",
            TR: "Bu uygulamayı beğendin mi?",
            PL: "Czy podoba Ci się ta aplikacja?",
            CZ: "Líbí se vám tato aplikace?",
            RU: "Вам нравится это приложение?"
        },
        buyCoffee: {
            EN: "Buy us a coffee",
            FR: "Offrez-nous un café",
            ES: "Regálanos un cafecito",
            IT: "Compraci un caffè",
            DE: "Kaufen Sie uns einen Kaffee",
            PT: "Compre-nos um café",
            TW: "幫我們買杯咖啡吧",
            KR: "커피를 사주세요",
            HU: "Vegyen egy kávét",
            GR: "Αγοράστε μας έναν καφέ",
            TR: "Bize bir kahve al",
            PL: "Kup nam kawę",
            CZ: "Kupte nám kávu",
            RU: "Купи нам кофе"
        },
        needYourHelp: {
            EN: "We need your help.",
            FR: "Nous avons besoin de votre aide.",
            ES: "Necesitamos tu ayuda.",
            IT: "Abbiamo bisogno del tuo aiuto.",
            DE: "Wir brauchen Ihre Hilfe.",
            PT: "Nós precisamos da sua ajuda.",
            TW: "我們需要你的支持。",
            KR: "우리는 당신의 도움이 필요합니다.",
            HU: "Szükségünk van a segítségedre.",
            GR: "Χρειαζόμαστε τη βοήθειά σου.",
            TR: "Yardımına ihtiyacımız var.",
            PL: "Potrzebujemy Twojej pomocy.",
            PT: "Nós precisamos da sua ajuda.",
            CZ: "Potřebujeme tvou pomoc.",
            RU: "Мы нуждаемся в твоей помощи."
        },
        casesDistribution: {
            EN: "Outcome of cases",
            FR: "Résolution des cas",
            ES: "Resolución de caso",
            IT: "Risoluzione del caso",
            DE: "Falllösung",
            PT: "Resolução de caso",
            KR: "결과 양성자 구성비",
            TW: "即時疫情",
            HU: "Az esetek kimenetele",
            GR: "Επίλυση υποθέσεων",
            TR: "Vaka çözünürlüğü",
            PL: "Rezultat zachorowań",
            CZ: "Výsledek případů",
            RU: "Разрешение случая"
        },
        casesEvolution: {
            EN: "Evolution",
            FR: "Evolution",
            TW: "演化",
            KR: "진화",
            DE: "Evolution",
            IT: "Evoluzione",
            ES: "Evolución",
            HU: "Evolúció",
            GR: "Εξέλιξη",
            TR: "Evrim",
            PL: "Rozwój",
            PT: "Evolução",
            CZ: "Vývoj",
            RU: "эволюция"
        },
        charts: {
            EN: "Graphs",
            TW: "圖形",
            FR: "Graphiques",
            KR: "그래프",
            DE: "Graph",
            IT: "Grafico",
            ES: "Grafico",
            HU: "Grafikon",
            GR: "Γραφική παράσταση",
            TR: "Grafik",
            PL: "Wykres",
            PT: "Gráfico",
            CZ: "Graf",
            RU: "диаграммы"
        },
        new: {
            EN: "New",
            TW: "新",
            FR: "Nouveau",
            KR: "새로운",
            DE: "Neu",
            IT: "Nuovo",
            ES: "Nuevo",
            HU: "Új",
            GR: "Νέος",
            TR: "Yeni",
            PL: "Nowy",
            PT: "Novo",
            CZ: "Nový",
            RU: "новый"
        },
        analytics: {
            EN: "Analytics",
            TW: "分析",
            FR: "Analyser",
            KR: "분석하다",
            DE: "Analysieren",
            IT: "Analizzare",
            ES: "Analizar",
            HU: "Elemez",
            GR: "Αναλύει",
            TR: "çözümlemek",
            PL: "Analizować",
            PT: "Analisar",
            CZ: "Analyzovat",
            RU: "аналитика"
        },
        cancel: {
            EN: "Cancel",
            TW: "取消",
            FR: "Annuler",
            KR: "취소",
            DE: "Stornieren",
            IT: "Annulla",
            ES: "Cancelar",
            HU: "Megszünteti",
            GR: "Ματαίωση",
            TR: "İptal etmek",
            PL: "Anulować",
            PT: "Cancelar",
            CZ: "Zrušení",
            RU: "Отмена"
        },
        select: {
            EN: "Select",
            TW: "選擇",
            FR: "Sélectionner",
            KR: "고르다",
            DE: "Wählen",
            IT: "Selezionare",
            ES: "Seleccione",
            HU: "Választ",
            GR: "Επιλέγω",
            TR: "Seçmek",
            PL: "Wybierz",
            PT: "Selecione",
            CZ: "Vybrat",
            RU: "Выбрать"
        },
        linear: {
            EN: "Linear",
            TW: "線性的",
            FR: "Linéaire",
            KR: "선형",
            DE: "Linear",
            IT: "Lineare",
            ES: "Lineal",
            HU: "Lineáris",
            GR: "γραμμικός",
            TR: "Doğrusal",
            PL: "Liniowy",
            PT: "Linear",
            CZ: "Lineární",
            RU: "линейный"
        },
        startDay: {
            EN: "Relative time",
            FR: "Temps relatif",
            TW: "相對時間",
            KR: "상대 시간",
            DE: "Relative Zeit",
            IT: "Tempo relativo",
            ES: "Tiempo relativo",
            HU: "Relatív idő",
            GR: "Σχετικός χρόνος",
            TR: "Göreli zaman",
            PL: "Czas względny",
            PT: "Tempo relativo",
            CZ: "Relativní čas",
            RU: "Относительное время"
        },
        logarithmic: {
            EN: "Logarithmic",
            TW: "對數",
            FR: "Logarithmique",
            KR: "로그",
            DE: "Logarithmisch",
            IT: "Logaritmico",
            ES: "Logarítmico",
            HU: "logaritmikus",
            GR: "Λογαριθμική",
            TR: "Logaritmik",
            PL: "Logarytmiczny",
            PT: "Logarítmica",
            CZ: "Logaritmické",
            RU: "логарифмический"
        },
        population: {
            EN: "Population",
            TW: "人口",
            FR: "Population",
            KR: "인구",
            DE: "Population",
            IT: "Popolazione",
            ES: "Población",
            HU: "Népesség",
            GR: "πληθυσμός",
            TR: "Nüfus",
            PL: "Populacja",
            PT: "População",
            CZ: "Populace",
            RU: "Население"
        },
        casesPerMillion: {
            EN: "Cases per million",
            FR: "Cas par million",
            KR: "100만명당 확진자 수",
            DE: "Fälle pro Million",
            IT: "Casi per milione",
            ES: "Casos por millón",
            TW: "每百萬確診案例",
            HU: "Esetek milliónként",
            GR: "περιπτώσεις ανά εκατομμύριο",
            TR: "Milyon başına vaka",
            PL: "Przypadków na milion",
            PT: "Casos por milhão",
            CZ: "Případů na milion",
            RU: "Выявлено на миллион"
        },
        deathsPerMillion: {
            EN: "Deaths per million",
            FR: "Décès par million",
            ES: "Muertes por millón",
            IT: "Deceduto per milione",
            DE: "Verstorben pro Million",
            TW: "每百萬死亡人數",
            HU: "Millió halál",
            GR: "Θάνατοι ανά εκατομμύριο",
            TR: "Milyon başına ölüm",
            PL: "Zmarłych na milion",
            PT: "Óbitos por milhão",
            CZ: "Úmrtí na milion",
            KR: "100만명당 사망자",
            RU: "Умерло на миллион"
        },
        darkMode: {
            EN: "Theme",
            FR: "Thème",
            TW: "主題",
            KR: "테마",
            DE: "Thema",
            IT: "Tema",
            ES: "Tema",
            HU: "Téma",
            GR: "Θέμα",
            TR: "Tema",
            PL: "Motyw",
            PT: "Tema",
            CZ: "Motiv",
            RU: "Тема"
        },
        preferences: {
            EN: "Preferences",
            FR: "Préférences",
            TW: "優先",
            DE: "Einstellungen",
            IT: "Preferenze",
            ES: "Preferencias",
            HU: "Preferenciák",
            GR: "Προτιμήσεις",
            TR: "Tercihler",
            PL: "Preferencje",
            PT: "Preferências",
            CZ: "Preference",
            RU: "Настройки"
        },
        filterMap: {
            EN: "Filter",
            FR: "Filtrer",
            TW: "過濾",
            DE: "Filter",
            IT: "Filtro",
            ES: "Filtro",
            HU: "Szűrő",
            GR: "Φίλτρο",
            TR: "Filtre",
            PL: "Filtr",
            PT: "Filtro",
            CZ: "Filtr",
            RU: "Фильтр"
        },
        countries: {
            EN: "Countries",
            FR: "Pays",
            TW: "國家",
            KR: "국가",
            DE: "Länder",
            IT: "Paesi",
            ES: "Países",
            HU: "Országok",
            GR: "Χώρες",
            TR: "Ülkeler",
            PL: "Kraje",
            PT: "Países",
            CZ: "Země",
            RU: "Страны"
        },
        day: {
            EN: "Day",
            FR: "Jour",
            TW: "Day",
            KR: "일째",
            DE: "Tag",
            IT: "Giorno",
            ES: "Día",
            HU: "Nap",
            GR: "Ημέρα",
            TR: "Gün",
            PL: "Dzień",
            PT: "Dia",
            CZ: "Den",
            RU: "День"
        },
        world: {
            EN: "World",
            FR: "Monde",
            TW: "全球",
            KR: "글로벌",
            DE: "Weltweit",
            IT: "Globale",
            ES: "Global",
            HU: "Globális",
            GR: "Παγκόσμια",
            TR: "Küresel",
            PL: "Świat",
            CZ: "Svět",
            RU: "Мир"
        },
        api: {
            EN: "API"
        },
        masks: {
            EN: "Masks",
            FR: "Masques",
            TW: "口罩",
            KR: "마스크"
        },
        searchRegions: {
            EN: "Search {nb} regions",
            FR: "Chercher {nb} régions",
            TW: "搜尋",
            KR: "지역 검색",
            DE: "Suche nach {nb} Regionen",
            IT: "Cerca regioni",
            ES: "Buscar {nb} regiones",
            HU: "Régió keresése",
            GR: "Αναζήτηση περιοχής",
            TR: "Bölge ara",
            PL: "Szukaj regionu",
            PT: "Buscar região",
            CZ: "Hledat oblast",
            RU: "Поиск {nb} регионов"
        },
        name: {
            EN: "Name",
            FR: "Nom",
            TW: "名稱",
            KR: "이름",
            IT: "Nome",
            ES: "Nombre",
            HU: "Név",
            GR: "Όνομα",
            TR: "İsim",
            PL: "Nazwa",
            PT: "Nome",
            CZ: "Jméno",
            RU: "Название"
        },
        share: {
            EN: "Share",
            FR: "Partager",
            ES: "Compartir",
            IT: "Condividere",
            KR: "공유",
            TW: "分享",
            DE: "Teilen",
            HU: "Ossza meg",
            GR: "μερίδιο",
            TR: "Paylaş",
            PL: "Podziel się",
            PT: "Compartilhar",
            CZ: "Sdílej",
            RU: "Поделиться"
        },
        today: {
            EN: "Today",
            FR: "Aujourd'hui",
            TW: "今天",
            KR: "오늘",
            DE: "Heute",
            IT: "Oggi",
            ES: "Hoy",
            HU: "Ma",
            GR: "σήμερα",
            TR: "Bugün",
            PL: "Dzisiaj",
            PT: "Hoje",
            CZ: "Dnes",
            RU: "Cегодня"
        },
        lastUpdate: {
            EN: "Updated",
            FR: "Mise à jour",
            TW: "資料更新時間",
            KR: "최근 업데이트",
            DE: "Update",
            IT: "Aggiornamento",
            ES: "Actualización",
            HU: "Utolsó frissítés",
            GR: "Τελευταία ενημέρωση",
            TR: "Son güncelleme",
            PL: "Aktualizacja",
            PT: "Atualização",
            CZ: "Aktualizováno",
            RU: "обновление"
        },
        infected: {
            EN: "Total cases",
            FR: "Total des cas",
            TW: "感染病毒總數",
            KR: "총 확진자 수",
            DE: "Gesamtfälle",
            IT: "Casi totali",
            ES: "Casos totales",
            HU: "Összes eset",
            GR: "Συνολικά κρούσματα",
            TR: "Toplam vaka",
            PL: "Wszystkie przypadki",
            PT: "Casos Confirmados",
            CZ: "Celkem případů",
            RU: "Выявлено"
        },
        recovered: {
            EN: "Recoveries",
            FR: "Rétablissements",
            TW: "治癒",
            KR: "완치자",
            DE: "Geheilt",
            IT: "Guariti",
            ES: "Recuperados",
            HU: "Gyógyult",
            GR: "Ανάρρωσαν",
            TR: "İyileşen",
            PL: "Wyzdrowieli",
            PT: "Recuperados",
            CZ: "Uzdravení",
            RU: "Выздоровело"
        },
        dead: {
            EN: "Deaths",
            FR: "Décès",
            TW: "死亡",
            KR: "사망자",
            DE: "Verstorben",
            IT: "Deceduti",
            ES: "Fallecidos",
            HU: "Elhunyt",
            GR: "Απεβίωσαν",
            TR: "Ölü",
            PL: "Zmarłych",
            PT: "Óbitos",
            CZ: "Úmrtí",
            RU: "Умерло"
        },
        sick: {
            EN: "Active cases",
            FR: "Cas actifs",
            TW: "目前感染",
            KR: "실시간 확진자",
            DE: "Aktive Fälle",
            IT: "Casi attivi",
            ES: "Casos activos",
            HU: "Jelenleg beteg",
            GR: "Νοσούν τώρα",
            TR: "Halen Hasta",
            PL: "Obecnie chorzy",
            PT: "Casos ativos",
            CZ: "Momentálně nemocní",
            RU: "Активные"
        },
        adultMasks: {
            EN: "Adult masks",
            FR: "Masques pour adultes",
            TW: "成人口罩剩餘數",
            KR: "성인용 마스크"
        },
        childMasks: {
            EN: "Child masks",
            FR: "Masques pour enfants",
            TW: "兒童口罩剩餘數",
            KR: "어린이용 마스크"
        },
        addMissingRegion: {
            EN: "Report a case",
            FR: "Reporter un cas",
            TW: "回報病例",
            KR: "누락된 지역 추가하기",
            DE: "Region hinzufügen",
            IT: "Aggiungi regione",
            ES: "Añadir Región",
            HU: "Régió hozzáadása",
            GR: "Εισάγεται περιοχή",
            TR: "Bölge ekle",
            PL: "Dodaj region",
            PT: "Adicionar região",
            CZ: "Nahlásit případ",
            RU: "Сообщить о случае"
        },
        embed: {
            EN: "Embed",
            FR: "Intégrer",
            TW: "嵌入",
            KR: "임베드",
            DE: "Einbetten",
            IT: "Incorpora",
            ES: "Integrar",
            HU: "Beágyazott",
            GR: "Ενσωμάτωση",
            TR: "Gömülü",
            PT: "Incorporar",
            CZ: "Vložit",
            RU: "Встроить"
        },
        contactUs: {
            EN: "Contact us",
            FR: "Nous contacter",
            TW: "聯絡我們",
            KR: "개발진에게 연락하기",
            DE: "Kontaktiere uns",
            IT: "Contattaci",
            ES: "Contáctanos",
            HU: "Kapcsolatfelvétel",
            GR: "Επικοινωνία",
            TR: "Bize ulaşın",
            PL: "Skontaktuj się z nami",
            PT: "Contate-nos",
            CZ: "Kontaktujte nás",
            RU: "Связаться с нами"
        },
        fatalityRate: {
            EN: "Fatality rate",
            FR: "Taux de létalité",
            TW: "死亡率",
            KR: "치사율",
            DE: "Sterblichkeitsrate",
            IT: "Tasso di letalità",
            ES: "Tasa de letalidad",
            HU: "Halálozási arány",
            GR: "Ποσοστό Θνησιμότητας",
            TR: "Ölüm Oranı",
            PL: "Procent śmiertelności",
            PT: "Taxa de letalidade",
            CZ: "Smrtnost",
            RU: "Уровень смертности"
        },
        recoveryRate: {
            EN: "Recovery rate",
            FR: "Taux de rétablissement",
            TW: "治癒率",
            KR: "완치율",
            DE: "Heilungsrate",
            IT: "Tasso di guarigione",
            ES: "Tasa de recuperación",
            HU: "Gyógyulási arány",
            GR: "Ποσοστό Ανάρρωσης",
            TR: "İyileşme Oranı",
            PL: "Procent wyzdrowienia",
            PT: "Taxa de recuperação",
            CZ: "Míra uzdravení",
            RU: "Уровень выздоровления"
        },
        sortList: {
            EN: "Sort list",
            FR: "Trier la liste",
            TW: "排序列表",
            KR: "리스트 정렬",
            DE: "Sortieren nach",
            IT: "Ordina per",
            ES: "Ordenar por",
            HU: "Rendezés",
            GR: "Ταξινόμηση κατά",
            TR: "Sırala",
            PL: "Sortuj",
            PT: "Ordenar por",
            CZ: "Třídit podle",
            RU: "Сортировать по"
        },
        installTheApp: {
            EN: "Install the app",
            FR: "Installer l'appli",
            TW: "安裝APP",
            KR: "앱 다운로드",
            DE: "App installieren",
            IT: "Installa l’app",
            ES: "Instalar la aplicación",
            HU: "Alkalmazás telepítése",
            GR: "Εγκατάσταση εφαρμογής",
            TR: "Uygulamayı yükle",
            PL: "Zainstaluj aplikację",
            PT: "Instale o app",
            CZ: "Instalovat aplikaci",
            RU: "Установить приложение"
        },
        linkCopied: {
            EN: "Link copied",
            FR: "Lien copié",
            TW: "複製連結",
            KR: "링크 복사"
        },
        infectedNew: {
            EN: "New cases",
            FR: "Nouveaux cas",
            TW: "新增病例",
            KR: "새 케이스",
            DE: "Neue Fälle",
            IT: "Nuovi casi",
            ES: "Nuevos casos",
            HU: "Új esetek",
            GR: "Νέα κρούσματα",
            TR: "Yeni vakalar",
            PL: "Nowe przypadki",
            PT: "Novos casos",
            CZ: "Nové případy",
            RU: "Новые случаи"
        }
    })
    , g = new function () {
        let e = this;
        this.embedded = !!h.getParam("embed"),
            this.countries = new he,
            this.all = [],
            this.places = [],
            this.reports = [],
            this.persons = [],
            this.config = {
                infected: {
                    name: function () {
                        return A("infected")
                    },
                    color: "rgba(255, 65, 108, 1)",
                    bg: "rgba(255, 65, 108, 0.1)",
                    middle: "rgba(255, 65, 108, 0.75)"
                },
                dead: {
                    name: function () {
                        return A("dead")
                    },
                    color: "rgba(134, 67, 230, 1)",
                    bg: "rgba(134, 67, 230, 0.1)",
                    middle: "rgba(134, 67, 230, 0.65)"
                },
                recovered: {
                    name: function () {
                        return A("recovered")
                    },
                    color: "rgba(97, 206, 129, 1)",
                    bg: "rgba(97, 206, 129, 0.1)",
                    middle: "rgba(97, 206, 129, 0.65)"
                },
                sick: {
                    name: function () {
                        return A("sick")
                    },
                    color: "rgba(40, 110, 255, 1)",
                    bg: "rgba(40, 110, 255, 0.1)",
                    middle: "rgba(40, 110, 255, 0.65)"
                }
            },
            this.masks = {
                adult: {
                    name: function () {
                        return A("adultMasks")
                    },
                    bg: "rgba(59, 172, 226, 0.3)",
                    color: "rgba(59, 172, 226, 1)"
                },
                child: {
                    name: function () {
                        return A("childMasks")
                    },
                    bg: "rgba(206, 121, 21, 0.43)",
                    color: "rgba(206, 121, 21, 1)"
                }
            },
            this.init = async function () {
                e.loading = new Q,
                    e.loading.render(),
                    await e.get(),
                    e.loading.remove(),
                    v && v.rerender()
            }
            ,
            this.get = async function () {
                await Promise.all([e.getLatest(), e.getCheckpoints()])
            }
            ,
            this.getLatest = async function () {
                e.places = await u.getPlaces()
            }
            ,
            this.getCheckpoints = async function (t) {
                e.checkpoints = await u.getCheckpoints()
            }
            ,
            this.getMostRecentCheckpoint = function () {
                let t = e.checkpoints || []
                    , n = null;
                return t.forEach(function (e) {
                    if (e.hide)
                        return;
                    n || (n = e);
                    let t = moment(e.id).isAfter(moment(n.id));
                    t && (n = e)
                }),
                    n || {}
            }
            ,
            this.calculate = function (t) {
                let n = 0
                    , i = e.getMostRecentCheckpoint();
                return (n = parseFloat(i[t])) || (n = 0),
                    n
            }
            ,
            this.getPlaceById = function (t) {
                return e.places.find(e => e.id === t)
            }
            ,
            this.dead = function () {
                return e.getMostRecentCheckpoint().dead
            }
            ,
            this.infected = function () {
                return e.getMostRecentCheckpoint().infected
            }
            ,
            this.recovered = function () {
                return e.getMostRecentCheckpoint().recovered
            }
            ,
            this.sick = function () {
                return e.getMostRecentCheckpoint().sick
            }
            ,
            this.getAffected = function (t, n) {
                let i = [...e.places];
                return i.sort(R(t)),
                    n && i.reverse(),
                    i
            }
            ,
            this.lastUpdated = function (t) {
                let n = null;
                return t.forEach(function (t) {
                    if (!n)
                        return void (n = t.lastUpdated);
                    let i = t.lastUpdated;
                    if (i) {
                        let t = e.compare(i, n)
                            , a = moment(i).isAfter(moment());
                        t && !a && (n = i)
                    }
                }),
                    n
            }
            ,
            this.compare = function (e, t) {
                return !(!moment(e).isValid() || !moment(t).isValid()) && moment(e).isAfter(moment(t))
            }
            ,
            this.countriesAffected = function (e, t) {
                let n = [];
                return t.forEach(function (e) {
                    let t = n.find(t => t.id === e.country)
                        , i = parseInt(e.infected || 0)
                        , a = parseInt(e.sick || 0)
                        , o = parseInt(e.dead || 0)
                        , r = parseInt(e.recovered || 0);
                    "number" == typeof i && (t ? (t.infected += i,
                        t.recovered += r,
                        t.dead += o,
                        t.sick += a) : n.push({
                            id: e.country,
                            infected: i,
                            recovered: r,
                            dead: o,
                            sick: a
                        }))
                }),
                    n.sort(R(e)),
                    n.reverse(),
                    n
            }
            ,
            this.matchSearch = function (t, n) {
                if (!n && t.isMaster)
                    return !0;
                if (!n && t.isSub)
                    return !0;
                if (!n && !t.isMaster && !t.isSub)
                    return !0;
                let i = X(n)
                    , a = X(t.name)
                    , o = X(e.countries.name(t.country))
                    , r = e.countries.findByName(i);
                return (!r || o === i) && (!(!r || t.country !== t.id) || !!(!i || o.includes(i) || i.includes(a) || i.includes(o) || a.includes(i)) && (!(!i && t.isSub) && (i && t.isMaster,
                    !0)))
            }
            ,
            this.calculateNew = function (t, n) {
                if (t && t.history) {
                    let e = t.history
                        , i = moment.utc().startOf("day")
                        , a = moment.utc().diff(i, "hours")
                        , o = a > 18
                        , r = moment().utc().format("YYYYMMDD")
                        , s = ""
                        , l = e.findIndex(e => e.day === r);
                    if (l < 0) {
                        if (!e[e.length - 1] || !e[e.length - 2])
                            return 0;
                        s = e[e.length - 1][n] - e[e.length - 2][n]
                    } else {
                        let t = e[l - 1] ? e[l][n] - e[l - 1][n] : e[l][n]
                            , i = e[l - 2] ? e[l - 1][n] - e[l - 2][n] : e[l][n];
                        s = t,
                            !o && t <= .3 * i && (s = i),
                            o || 0 !== t || (s = i)
                    }
                    return !s || s < 0 ? 0 : s || 0
                }
                if (e.checkpoints) {
                    let t = e.checkpoints[0][n] - e.checkpoints[1][n];
                    return t < 0 ? 0 : t
                }
                return 0
            }
    }
    , b = new function () {
        let e = this;
        this.countries = new he,
            this.modes = {
                infected: {
                    name: g.config.infected.name,
                    color: g.config.infected.color
                },
                dead: {
                    name: g.config.dead.name,
                    color: g.config.dead.color
                },
                recovered: {
                    name: g.config.recovered.name,
                    color: g.config.recovered.color
                },
                sick: {
                    name: g.config.sick.name,
                    color: g.config.sick.color
                }
            },
            this.zoom = function () {
                return y && y.content && y.content.zoom ? y.content.zoom : 4
            }
            ,
            this.worldBounds = [0, 1, 5, 20, 50, 100, 500, 1e3, 2e3, 4e3, 1e4, 2e4, 4e4, 8e4, 1e5, 3e5, 1e6],
            this.config = {
                bounds: e.worldBounds,
                sizes: [0, 2, 4, 4, 6, 9, 11, 12, 13, 14, 15, 20, 22, 24, 25, 30, 42, 45, 50],
                infected: ["#fff", "#ffffe4", "#fdefd4", "#fedccc", "#fec7c3", "#ffb2bb", "#fe6d8e", "#fd5078", "#f33863", "#da375d", "#c03656", "#8c3448", "#713341", "#533139", "#303030", "#000", "#000", "#000"],
                dead: ["#fff", "#e0d3f1", "#d9c3f5", "#d4b2ff", "#c79aff", "#b981ff", "#b376ff", "#8e60ff", "#8949de", "#7d37da", "#812ef1", "#771df1", "#7b19ff", "#6d0fea", "#6007d8", "#5409b9", "#3f0192", "#360775"],
                sick: ["#fff", "#d9e5fb", "#d0dffb", "#bfd5ff", "#a4c3ff", "#82acfd", "#74a1f9", "#5a90f9", "#4d89ff", "#3579ff", "#397af7", "#2972ff", "#145eef", "#195ad8", "#0e4fce", "#0044c7", "#043aa2", "#05338a", "#022871"],
                recovered: ["#fff", "#d8ecdf", "#d5ffe4", "#bef9d3", "#a7ffc6", "#88fdb1", "#9cefb8", "#79efa1", "#5cf18f", "#3bf57b", "#28e669", "#24ff6f", "#2ad08b", "#25d089", "#1ad688", "#18ca80", "#0fbf8e", "#05ad7e"]
            },
            this.createPlaceFeature = function (t, n, i, a) {
                let o = e.getPlaceStyle(t, n, i, e.zoom());
                return a && n ? L.geoJSON(a, o) : L.circleMarker([t.latitude, t.longitude], o)
            }
            ,
            this.isShowable = function (t, n, i) {
                let a = e.countries.zoom(t.country) || 5;
                return !t.invisible && (!!t[i] && (!!t.alwaysShow || !(t.isMaster && n >= a) && !(t.isSub && n < a)))
            }
            ,
            this.bubbleIndicator = function (t, n, i) {
                let a = parseFloat(t || 0)
                    , o = e.config
                    , r = -1
                    , s = e.worldBounds;
                return s.forEach(function (e, t) {
                    r > -1 || (a !== e ? a > e && a < s[t + 1] ? r = t : a > e && !s[t + 1] && (r = t) : r = t)
                }),
                    o[n][r]
            }
            ,
            this.getPlaceStyle = function (t, n, i, a) {
                i = re(i, "mode");
                let o = t && t[i] ? t[i] : 0
                    , r = !0
                    , s = e.modes[i].color
                    , l = s
                    , c = e.bubbleIndicator(o, "sizes", !(!t || !t.isSub) && t.isSub)
                    , d = .2
                    , u = 2
                    , p = !0;
                if (n) {
                    let t = e.bubbleIndicator(o, i);
                    s = t,
                        d = "var(--zoneOpacity)",
                        u = 2,
                        r = 2,
                        l = "#fff" === t ? "#a9a9a9" : t,
                        o || (u = 1)
                } else
                    n || e.isShowable(t, a, i) || (d = 0,
                        u = 0,
                        r = 0,
                        l = "transparent",
                        s = "transparent",
                        p = !1,
                        c = 0);
                let h = {
                    place: t,
                    color: l,
                    show: p,
                    radius: c,
                    fillColor: s,
                    fillOpacity: d,
                    weight: u,
                    stroke: r
                };
                return h
            }
            ,
            this.getTileConfig = function (e, t) {
                let n = [{
                    countries: [""],
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    attributions: [{
                        link: "https://openstreetmap.org/copyright",
                        name: "&copy; OpenStreetMap contributors"
                    }]
                }, {
                    countries: ["DE", "AT", "LI"],
                    url: "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png",
                    attributions: [{
                        link: "https://openstreetmap.org/copyright",
                        name: "&copy; OpenStreetMap contributors"
                    }, {
                        link: "https://www.openstreetmap.de/",
                        name: "&copy; OpenStreetMap - Deutschland"
                    }]
                }, {
                    countries: ["FR", "BE", "LU", "CD"],
                    url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
                    attributions: [{
                        link: "https://openstreetmap.org/copyright",
                        name: "&copy; OpenStreetMap contributors"
                    }, {
                        link: "https://www.openstreetmap.fr/",
                        name: "&copy; OpenStreetMap - France"
                    }]
                }, {
                    countries: ["AZ", "AM", "TR", "IN", "GE", "KZ", "UZ", "PK", "AF", "CN"],
                    url: "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
                    attributions: [{
                        link: "http://stamen.com/",
                        before: "Map titles by",
                        name: "Stamen Design"
                    }, {
                        link: "http://creativecommons.org/licenses/by/3.0",
                        before: "under",
                        name: "CC BY 3.0"
                    }, {
                        link: "https://openstreetmap.org/copyright",
                        before: "Data by",
                        name: "OpenStreetMap contributors"
                    }, {
                        link: "http://creativecommons.org/licenses/by-sa/3.0",
                        before: "under",
                        name: "CC BY SA"
                    }]
                }]
                    , i = n.find(e => e.countries.includes(p.getCountry())) || n[0];
                if (e && !t)
                    return {
                        url: "",
                        attribution: ""
                    };
                t && (i = n[3]);
                let a = "";
                return i.attributions.forEach(function (e) {
                    e.before && (a += e.before + " "),
                        a += '<a href="' + e.link + '" target="_blank"/>' + e.name + "</a>"
                }),
                    t ? {
                        url: "",
                        attribution: ""
                    } : {
                            url: i.url,
                            attribution: a
                        }
            }
            ,
            this.showTooltip = function (t) {
                if (window.innerWidth < 991)
                    return "";
                let n = ye(".map-tooltip");
                n.forEach(function (e) {
                    e.remove()
                });
                let i = t.infected
                    , a = t.dead
                    , o = t.recovered;
                t.sick;
                e.tooltip = ge("div"),
                    e.tooltip.classList.add("map-tooltip", "Tooltip", "main-map"),
                    e.tooltip.innerHTML = "",
                    be(".map").appendChild(e.tooltip);
                let r = ge("img");
                r.setAttribute("src", e.countries.flag(t.country, t.state)),
                    e.tooltip.appendChild(r);
                let s = ge("div");
                s.classList.add("map-tooltip-title"),
                    e.tooltip.appendChild(s);
                let l = ge("div");
                if (l.textContent = t.name,
                    s.appendChild(l),
                    t.infected) {
                    let n = ge("div", "map-tooltip-new", {
                        parent: e.tooltip
                    });
                    u.getHistory(t.id).then(function (e) {
                        let t = g.calculateNew(e, "infected");
                        t && (n.textContent = "+" + ae(t))
                    })
                }
                let c = ge("div", ["map-tooltip-line", "infected"]);
                c.innerHTML = "<span>" + ae(i) + "</span><span>" + A("infected") + "</span>",
                    i && e.tooltip.appendChild(c);
                let d = ge("div", ["map-tooltip-line", "recovered"]);
                d.innerHTML = "<span>" + ae(o) + "</span><span>" + A("recovered") + "</span>",
                    o && e.tooltip.appendChild(d);
                let p = ge("div", ["map-tooltip-line", "dead"]);
                return p.innerHTML = "<span>" + ae(a) + "</span><span>" + A("dead") + "</span>",
                    a && e.tooltip.appendChild(p),
                    e.tooltip
            }
    }
    ;
let y = new H;
new function () {
    this.logo = window.location.origin + "/assets/img/logo/512.png?v=3"
}
    ;
let v = null
    , w = null
    , k = null
    , T = window.location.pathname.split("/");
switch (T[1]) {
    case "admin":
        g.init(),
            w = new function () {
                let e = this;
                this.loggedin = !1,
                    this.console = null,
                    this.isLoggedIn = function (t) {
                        return new Promise(function (n, i) {
                            fe("POST", "/verify-identity", {
                                password: t
                            }).then(function () {
                                return e.loggedin = !0,
                                    n()
                            }).catch(function () {
                                return e.loggedin = !1,
                                    n()
                            })
                        }
                        )
                    }
                    ,
                    this.prompt = async function () {
                        let t = prompt("Please enter the password");
                        await e.isLoggedIn(t),
                            e.loggedin || alert("wrong password")
                    }
                    ,
                    this.init = async function () {
                        await e.isLoggedIn(),
                            e.loggedin || await e.prompt(),
                            e.loggedin && e.start()
                    }
                    ,
                    this.start = function () {
                        e.console = new function () {
                            let e = this;
                            this.selector = "#mainContainer",
                                this.places = [],
                                this.checkpoints = [],
                                this.reports = [],
                                this.editing = {
                                    dataType: null,
                                    id: null
                                },
                                this.temp = null,
                                this.placePage = 0,
                                this.reportPage = 0,
                                this.checkpointPage = 0,
                                this.reportNumberPerQuery = 500,
                                this.reportStartAt = null,
                                this.pageNumber = function (t) {
                                    switch (t) {
                                        case "reports":
                                            return e.reportPage;
                                        case "places":
                                            return e.placePage;
                                        case "checkpoints":
                                            return e.checkpointPage
                                    }
                                }
                                ,
                                this.itemsPerReportPage = 10,
                                this.itemsPerPlacePage = 10,
                                this.itemsPerCheckpointPage = 5,
                                this.itemsPerPage = function (t) {
                                    switch (t) {
                                        case "reports":
                                            return e.itemsPerReportPage;
                                        case "places":
                                            return e.itemsPerPlacePage;
                                        case "checkpoints":
                                            return e.itemsPerCheckpointPage
                                    }
                                }
                                ,
                                this.other = null,
                                this.perPageOptions = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                                this.countries = function () {
                                    let e = (new he).list
                                        , t = [];
                                    return e.forEach(function (e) {
                                        t.push({
                                            id: e.code,
                                            name: e.name
                                        })
                                    }),
                                        t
                                }
                                ,
                                this.sections = {
                                    checkpoints: {
                                        actions: {
                                            type: "buttons",
                                            buttons: ["edit"]
                                        },
                                        id: {
                                            type: "string",
                                            disabled: !0
                                        },
                                        hide: {
                                            type: "boolean"
                                        },
                                        infected: {
                                            type: "number"
                                        },
                                        dead: {
                                            type: "number"
                                        },
                                        recovered: {
                                            type: "number"
                                        },
                                        createdAt: {
                                            type: "date",
                                            disabled: !0
                                        }
                                    },
                                    places: {
                                        actions: {
                                            type: "buttons",
                                            buttons: ["edit", "fetch", "history"]
                                        },
                                        id: {
                                            type: "string",
                                            disabled: !0
                                        },
                                        hide: {
                                            type: "boolean"
                                        },
                                        country: {
                                            type: "select",
                                            data: function () {
                                                return e.countries()
                                            }
                                        },
                                        pop: {
                                            type: "number"
                                        },
                                        name: {
                                            type: "string"
                                        },
                                        longitude: {
                                            type: "number"
                                        },
                                        latitude: {
                                            type: "number"
                                        },
                                        state: {
                                            type: "string"
                                        },
                                        invisible: {
                                            type: "boolean"
                                        },
                                        alwaysShow: {
                                            type: "boolean"
                                        },
                                        latestReport: {
                                            type: "date",
                                            disabled: !0
                                        },
                                        createdAt: {
                                            type: "date",
                                            disabled: !0
                                        }
                                    },
                                    reports: {
                                        actions: {
                                            type: "buttons",
                                            buttons: ["edit"]
                                        },
                                        id: {
                                            type: "string",
                                            disabled: !0
                                        },
                                        hide: {
                                            type: "boolean"
                                        },
                                        placeId: {
                                            type: "select",
                                            data: function () {
                                                return e.places
                                            }
                                        },
                                        infected: {
                                            type: "number"
                                        },
                                        dead: {
                                            type: "number"
                                        },
                                        recovered: {
                                            type: "number"
                                        },
                                        date: {
                                            type: "date"
                                        },
                                        createdAt: {
                                            type: "date",
                                            disabled: !0
                                        }
                                    }
                                },
                                this.getCheckpoints = async function () {
                                    let t = await fe("GET", "/get-checkpoints");
                                    e.checkpoints = t.data || []
                                }
                                ,
                                this.saveCheckpoint = async function (e) {
                                    await fe("POST", "/update-checkpoint", e)
                                }
                                ,
                                this.updateCheckpoint = async function () {
                                    if ("checkpoints" !== e.temp.dataType)
                                        return;
                                    if (!e.temp.id)
                                        return;
                                    let t = e.checkpoints.findIndex(t => t.id === e.temp.id)
                                        , n = e.checkpoints[t]
                                        , i = !0 === e.temp.hide || !1 === e.temp.hide ? e.temp.hide : n.hide
                                        , a = {
                                            createdAt: e.temp.createdAt || n.createdAt,
                                            infected: e.temp.infected || n.infected,
                                            dead: e.temp.dead || n.dead,
                                            recovered: e.temp.recovered || n.recovered,
                                            id: e.temp.id,
                                            hide: i
                                        };
                                    e.checkpoints[t] = a,
                                        e.saveCheckpoint(a),
                                        e.rerender("checkpoints")
                                }
                                ,
                                this.makeCheckpoint = function (t) {
                                    let n = [];
                                    e.places.forEach(function (i) {
                                        let a = [];
                                        e.reports.forEach(function (e) {
                                            e.hide || e.placeId === i.id && a.push(e)
                                        }),
                                            a.sort(R("date")),
                                            a.reverse();
                                        for (let e = 0; e < a.length; e++) {
                                            let i = moment(a[e].date).utc().format("YYYYMMDD");
                                            if (i === t) {
                                                n.push(a[e]);
                                                break
                                            }
                                        }
                                    });
                                    let i = {
                                        infected: 0,
                                        dead: 0,
                                        recovered: 0
                                    };
                                    return n.forEach(function (e) {
                                        Object.keys(i).forEach(function (t) {
                                            e[t] && "number" == typeof e[t] && e[t] > 0 && (i[t] += e[t])
                                        }),
                                            i.createdAt = e.date
                                    }),
                                        i
                                }
                                ,
                                this.getMoreReports = function () {
                                    e.sort("reports", "date"),
                                        e.reportStartAt = e.reports[e.reports.length - 1].date,
                                        e.get("reports")
                                }
                                ,
                                this.toggleEditing = function (t, n) {
                                    e.editing.dataType = t,
                                        e.editing.id = n,
                                        e.render()
                                }
                                ,
                                this.sort = function (t, n) {
                                    e[t].sort(R(n)),
                                        e[t].reverse(),
                                        e.rerender(t)
                                }
                                ,
                                this.create = async function (t) {
                                    let n = {
                                        dataType: t
                                    }
                                        , i = await fe("POST", "/add-data", n);
                                    return e[t].unshift(i),
                                        e.toggleEditing(t, i.id),
                                        e.rerender(t),
                                        i.id
                                }
                                ,
                                this.get = async function (t) {
                                    let n = {
                                        dataType: t
                                    };
                                    "reports" === t && (n.startAt = e.reportStartAt,
                                        n.limit = e.reportNumberPerQuery);
                                    let i = await fe("POST", "/get-data", n);
                                    e.pushEntities(t, i.data),
                                        e.sort(t, "createdAt")
                                }
                                ,
                                this.pushEntities = async function (t, n) {
                                    n.forEach(function (n) {
                                        let i = e[t].findIndex(e => e.id === n.id);
                                        i > -1 ? e[t][i] = n : e[t].push(n)
                                    })
                                }
                                ,
                                this.save = async function () {
                                    if (!e.temp || !e.temp.id)
                                        return void e.discard();
                                    "checkpoints" === e.temp.dataType ? e.updateCheckpoint() : await fe("POST", "/update-data", e.temp);
                                    let t = e[e.temp.dataType].findIndex(t => t.id === e.temp.id);
                                    if (t > -1)
                                        for (var n in e.temp)
                                            e[e.temp.dataType][t][n] = e.temp[n];
                                    e.discard()
                                }
                                ,
                                this.update = async function (t, n, i) {
                                    for (var a in e.temp || (e.temp = {}),
                                        t)
                                        e.temp[a] = t[a];
                                    e.temp.id = i,
                                        e.temp.dataType = n
                                }
                                ,
                                this.discard = function () {
                                    e.toggleEditing(null, null),
                                        e.temp = null,
                                        e.render()
                                }
                                ,
                                this.remove = async function (t, n) {
                                    let i = confirm("Are you sure you want to delete this?");
                                    if (!i)
                                        return void e.discard();
                                    await fe("POST", "/delete-data", {
                                        dataType: n,
                                        id: t
                                    });
                                    let a = e[n].findIndex(e => e.id === t);
                                    a > -1 && e[n].splice(a, 1),
                                        e.discard()
                                }
                                ,
                                this.renderTableHeader = function (t, n) {
                                    let i = ge("tr");
                                    t.appendChild(i);
                                    for (let t in e.sections[n]) {
                                        let a = ge("th");
                                        a.classList.add(e.sections[n][t].type),
                                            a.textContent = t,
                                            a.addEventListener("click", function () {
                                                e.sort(n, t)
                                            }),
                                            i.appendChild(a)
                                    }
                                }
                                ,
                                this.renderSection = function (t, n) {
                                    if (!n)
                                        return;
                                    n.innerHTML = "";
                                    let i = ge("div");
                                    if (i.textContent = t,
                                        i.classList.add("console-section-title"),
                                        n.appendChild(i),
                                        "checkpoints" !== t && "reports" !== t) {
                                        let n = ge("i");
                                        n.classList.add("feather", "feather-plus-circle"),
                                            (e.editing.dataType || e.editing.id) && n.classList.add("disabled"),
                                            n.addEventListener("click", function () {
                                                e.create(t)
                                            }),
                                            i.appendChild(n)
                                    }
                                    let a = ge("table");
                                    n.appendChild(a),
                                        e.renderTableHeader(a, t),
                                        e.renderTableRows(a, t),
                                        e.renderPageList(n, t),
                                        e.renderItemPerPageSelector(n, t)
                                }
                                ,
                                this.placeHistoryModal = function (t) {
                                    let n = e.places.find(e => e.id === t);
                                    new function (e, t) {
                                        let n = this;
                                        this.placeData = e,
                                            this.data = [],
                                            this.onClose = t,
                                            this.id = n.placeData.id,
                                            this.active = null,
                                            this.element = null,
                                            this.container = null,
                                            this.columns = {
                                                id: {
                                                    type: "string",
                                                    disabled: !0
                                                },
                                                hide: {
                                                    type: "boolean"
                                                },
                                                infected: {
                                                    type: "number"
                                                },
                                                dead: {
                                                    type: "number"
                                                },
                                                recovered: {
                                                    type: "number"
                                                },
                                                date: {
                                                    type: "date"
                                                }
                                            },
                                            this.sort = function () {
                                                n.data.sort(R("date")),
                                                    n.data.reverse()
                                            }
                                            ,
                                            this.getData = async function () {
                                                let e = await fe("POST", "/get-all-reports-by-place", {
                                                    id: n.id
                                                });
                                                n.data = e.data,
                                                    n.sort()
                                            }
                                            ,
                                            this.remove = function () {
                                                n.element.remove(),
                                                    n.onClose()
                                            }
                                            ,
                                            this.make = function () {
                                                n.element = ge("div"),
                                                    n.element.classList.add("backdrop"),
                                                    be("body").appendChild(n.element);
                                                let e = ge("div");
                                                e.classList.add("admin-history-modal"),
                                                    n.element.appendChild(e);
                                                let t = ge("i");
                                                t.classList.add("admin-history-modal-x"),
                                                    t.addEventListener("click", n.remove),
                                                    t.classList.add("feather", "feather-x"),
                                                    e.appendChild(t);
                                                let i = ge("h3");
                                                i.classList.add("admin-history-modal-title"),
                                                    i.textContent = n.placeData.name,
                                                    e.appendChild(i);
                                                let a = ge("button");
                                                a.classList.add("admin-history-modal-btn"),
                                                    a.addEventListener("click", async function () {
                                                        e.classList.add("unclickable"),
                                                            await n.create(),
                                                            e.classList.remove("unclickable")
                                                    }),
                                                    a.textContent = "New report",
                                                    e.appendChild(a),
                                                    n.container = ge("div"),
                                                    n.container.classList.add("admin-history-modal-container"),
                                                    e.appendChild(n.container)
                                            }
                                            ,
                                            this.setActiveReport = function (e) {
                                                n.active = e,
                                                    ye(".admin-history-report-row").forEach(function (t) {
                                                        let n = t.getAttribute("data-report-id");
                                                        n === e ? t.classList.add("active") : t.classList.remove("active")
                                                    })
                                            }
                                            ,
                                            this.render = function () {
                                                n.container.innerHTML = "";
                                                let e = ge("table");
                                                n.container.appendChild(e);
                                                let t = ge("tr");
                                                e.appendChild(t);
                                                for (let e in n.columns) {
                                                    let n = ge("th");
                                                    n.textContent = e,
                                                        t.appendChild(n)
                                                }
                                                n.data.forEach(function (t) {
                                                    let i = ge("tr");
                                                    i.classList.add("admin-history-report-row"),
                                                        i.setAttribute("data-report-id", t.id),
                                                        t.id === n.active && i.classList.add("active"),
                                                        i.addEventListener("click", function () {
                                                            n.setActiveReport(t.id, i)
                                                        }),
                                                        e.appendChild(i);
                                                    for (let e in n.columns) {
                                                        let a = n.columns[e].type
                                                            , o = ge("td");
                                                        i.appendChild(o);
                                                        let r = null;
                                                        switch (a) {
                                                            case "string":
                                                                r = n.makeString(t.id, e, t[e]);
                                                                break;
                                                            case "number":
                                                                r = n.makeNumber(t.id, e, t[e]);
                                                                break;
                                                            case "boolean":
                                                                r = n.makeBoolean(t.id, e, t[e]);
                                                                break;
                                                            case "date":
                                                                r = n.makeDate(t.id, e, t[e])
                                                        }
                                                        r && o.appendChild(r)
                                                    }
                                                })
                                            }
                                            ,
                                            this.update = async function (e, t, i) {
                                                let a = {
                                                    dataType: "reports",
                                                    id: e,
                                                    [t]: i
                                                }
                                                    , o = n.data.find(t => t.id === e);
                                                o[t] = i,
                                                    n.sort(),
                                                    n.render(),
                                                    await fe("POST", "/update-data", a)
                                            }
                                            ,
                                            this.makeString = function (e, t, i) {
                                                let a = ge("input");
                                                a.setAttribute("type", "text"),
                                                    a.value = i || "";
                                                let o = n.columns[t].disabled;
                                                return o && a.classList.add("disabled"),
                                                    a
                                            }
                                            ,
                                            this.verifyNumber = function (e, t, i) {
                                                i = parseInt(i || 0);
                                                let a = n.data.findIndex(t => t.id === e);
                                                if (a < 0)
                                                    return !0;
                                                let o = n.data[a - 1]
                                                    , r = n.data[a + 1];
                                                return !(o && (o[t] || 0) < i) && !(r && (r[t] || 0) > i)
                                            }
                                            ,
                                            this.makeNumber = function (e, t, i) {
                                                let a = ge("input");
                                                a.setAttribute("type", "number");
                                                let o = n.verifyNumber(e, t, i);
                                                return o || a.classList.add("invalid"),
                                                    a.value = parseFloat(i) || 0,
                                                    a.addEventListener("change", function (i) {
                                                        let o = parseInt(i.target.value)
                                                            , r = n.verifyNumber(e, t, o);
                                                        r ? (a.classList.remove("invalid"),
                                                            n.update(e, t, o)) : a.classList.add("invalid")
                                                    }),
                                                    a
                                            }
                                            ,
                                            this.makeBoolean = function (e, t, i) {
                                                let a = ge("div")
                                                    , o = de(22)
                                                    , r = ge("input");
                                                r.setAttribute("type", "checkbox"),
                                                    r.setAttribute("id", o),
                                                    r.checked = !!i,
                                                    r.addEventListener("change", function (i) {
                                                        n.update(e, t, i.target.checked)
                                                    }),
                                                    a.appendChild(r);
                                                let s = ge("label");
                                                return s.setAttribute("for", o),
                                                    a.appendChild(s),
                                                    a
                                            }
                                            ,
                                            this.makeDate = function (e, t, i) {
                                                let a = ge("div")
                                                    , o = moment().utcOffset()
                                                    , r = de(20)
                                                    , s = ge("input");
                                                s.setAttribute("type", "date"),
                                                    s.addEventListener("keydown", function (e) {
                                                        e.preventDefault(),
                                                            e.stopPropagation()
                                                    }),
                                                    s.setAttribute("max", moment().utc().format("YYYY[-]MM[-]DD")),
                                                    s.setAttribute("min", "2020-01-20"),
                                                    s.setAttribute("id", r),
                                                    s.value = i ? moment(i).utc().format("YYYY[-]MM[-]DD") : "";
                                                let l = n.columns[t].disabled;
                                                return l ? a.classList.add("disabled") : s.addEventListener("change", function (i) {
                                                    let a = moment(i.target.value).add(o, "minutes").toISOString()
                                                        , r = moment()
                                                        , s = moment(a).isAfter(r);
                                                    s && (a = r.toISOString()),
                                                        a = moment.utc(a).startOf("day").add(5, "minutes").toISOString(),
                                                        n.update(e, t, a)
                                                }),
                                                    a.appendChild(s),
                                                    a
                                            }
                                            ,
                                            this.create = async function () {
                                                let e = await fe("POST", "/add-data", {
                                                    dataType: "reports"
                                                });
                                                e.placeId = n.id,
                                                    n.data.unshift(e),
                                                    n.sort(),
                                                    n.update(e.id, "placeId", e.placeId),
                                                    n.render(),
                                                    n.setActiveReport(e.id)
                                            }
                                            ,
                                            this.init = async function () {
                                                n.make(),
                                                    await n.getData(),
                                                    n.render()
                                            }
                                            ,
                                            this.init()
                                    }
                                        (n, e.render)
                                }
                                ,
                                this.renderItemPerPageSelector = function (t, n) {
                                    let i = ge("div");
                                    i.classList.add("per-page-picker"),
                                        t.appendChild(i);
                                    let a = ge("span");
                                    a.textContent = "Results per page",
                                        i.appendChild(a);
                                    let o = ge("select");
                                    o.addEventListener("change", function (t) {
                                        let i = parseInt(t.target.value);
                                        "reports" === n ? e.itemsPerReportPage = i : "places" === n ? e.itemsPerPlacePage = i : "checkpoints" === n && (e.itemsPerCheckpointPage = i),
                                            e.rerender(n)
                                    }),
                                        i.appendChild(o),
                                        e.perPageOptions.forEach(function (t) {
                                            let i = ge("option");
                                            i.setAttribute("value", t),
                                                i.textContent = t,
                                                ("reports" === n && t === e.itemsPerReportPage || "places" === n && t === e.itemsPerPlacePage || "checkpoints" === n && t === e.itemsPerCheckpointPage) && i.setAttribute("selected", "true"),
                                                o.appendChild(i)
                                        })
                                }
                                ,
                                this.makeButtons = function (t, n, i, a, o) {
                                    let r = ge("span");
                                    r.classList.add("console-button-cell");
                                    let s = n.buttons
                                        , l = e.editing.dataType === i && e.editing.id === o;
                                    if (s.includes("delete")) {
                                        let t = ge("i");
                                        t.classList.add("feather", "feather-trash"),
                                            t.addEventListener("click", function () {
                                                e.remove(o, i)
                                            }),
                                            r.appendChild(t),
                                            new ee(t, "Delete")
                                    }
                                    if (s.includes("fetch")) {
                                        let t = ge("i");
                                        t.classList.add("feather", "feather-file-plus"),
                                            t.addEventListener("click", function () {
                                                e.openRegionModal(o)
                                            }),
                                            r.appendChild(t),
                                            new ee(t, "New report for this region")
                                    }
                                    if (s.includes("history")) {
                                        let t = ge("i");
                                        t.classList.add("feather", "feather-list"),
                                            t.addEventListener("click", function () {
                                                e.placeHistoryModal(o)
                                            }),
                                            r.appendChild(t),
                                            new ee(t, "New report for this region")
                                    }
                                    if (s.includes("edit") && l) {
                                        let t = ge("i");
                                        t.classList.add("feather", "feather-check"),
                                            t.addEventListener("click", function () {
                                                let t = confirm("If you press OK, your changes will be saved. Else, they'll be cancelled.");
                                                t ? e.save() : e.discard()
                                            }),
                                            r.appendChild(t),
                                            new ee(t, "Confirm")
                                    }
                                    if (s.includes("edit") && !l) {
                                        let t = ge("i");
                                        t.classList.add("feather", "feather-edit-2"),
                                            t.addEventListener("click", function () {
                                                e.toggleEditing(i, o)
                                            });
                                        let n = e.editing.dataType && e.editing.id && (e.editing.dataType !== i || e.editing.id !== o);
                                        n && t.classList.add("disabled"),
                                            r.appendChild(t),
                                            new ee(t, "Manually edit")
                                    }
                                    return r
                                }
                                ,
                                this.renderTableRow = function (t, n, i) {
                                    let a = ge("tr");
                                    n.appendChild(a);
                                    let o = e.editing.dataType === t && e.editing.id === i.id;
                                    if (o && a.classList.add("editable"),
                                        "places" === t) {
                                        let e = moment().diff(moment(i.latestReport), "minutes");
                                        e < 60 && (a.style.background = "#89ff89")
                                    }
                                    for (var r in "checkpoints" === t && moment().utc().format("YYYYMMDD") == i.id && a.classList.add("disabled"),
                                        e.sections[t])
                                        e.renderTableCell(t, r, a, i)
                                }
                                ,
                                this.renderTableCell = function (t, n, i, a) {
                                    let o = ge("td");
                                    o.classList.add(e.sections[t][n].type),
                                        e.sections[t][n].disabled && o.classList.add("disabled", "disabled"),
                                        i.appendChild(o);
                                    let r = null;
                                    switch (e.sections[t][n].type) {
                                        case "string":
                                            r = e.makeString(a[n], e.sections[t][n], t, n, a.id);
                                            break;
                                        case "select":
                                            r = e.makeSelect(a[n], e.sections[t][n], t, n, a.id);
                                            break;
                                        case "number":
                                            r = e.makeNumber(a[n], e.sections[t][n], t, n, a.id);
                                            break;
                                        case "boolean":
                                            r = e.makeBoolean(a[n], e.sections[t][n], t, n, a.id);
                                            break;
                                        case "date":
                                            r = e.makeDate(a[n], e.sections[t][n], t, n, a.id);
                                            break;
                                        case "buttons":
                                            r = e.makeButtons(a[n], e.sections[t][n], t, n, a.id)
                                    }
                                    o.appendChild(r)
                                }
                                ,
                                this.renderTableRows = function (t, n) {
                                    let i = e.pageNumber(n) * e.itemsPerPage(n)
                                        , a = i + e.itemsPerPage(n);
                                    for (let o = i; o < a; o++) {
                                        let i = e[n][o];
                                        if (!i)
                                            break;
                                        e.renderTableRow(n, t, i)
                                    }
                                }
                                ,
                                this.renderSections = function () {
                                    for (let t in e.sections) {
                                        let n = t + "Node";
                                        e[n] = ge("div"),
                                            e[n].classList.add("console-section"),
                                            e.element.appendChild(e[n]),
                                            e.renderSection(t, e[n])
                                    }
                                }
                                ,
                                this.renderPageList = function (t, n) {
                                    let i = ge("div");
                                    i.classList.add("console-page-list"),
                                        t.appendChild(i);
                                    let a = e[n].length / e.itemsPerPage(n);
                                    for (let t = 0; t < a; t++) {
                                        let a = t.toString()
                                            , o = ge("div");
                                        o.classList.add("console-page-item"),
                                            "reports" === n && e.reportPage === t ? o.classList.add("disabled") : "places" === n && e.placePage === t ? o.classList.add("disabled") : "checkpoints" === n && e.checkpointPage === t && o.classList.add("disabled"),
                                            o.textContent = a,
                                            o.addEventListener("click", function () {
                                                e.changePage(a, n)
                                            }),
                                            i.appendChild(o)
                                    }
                                    if ("reports" === n) {
                                        let t = ge("div");
                                        t.textContent = "Load more",
                                            t.classList.add("console-page-item"),
                                            t.addEventListener("click", e.getMoreReports),
                                            t.style.width = "100px",
                                            i.appendChild(t)
                                    }
                                }
                                ,
                                this.renderConsole = function () {
                                    let t = be(e.selector);
                                    t.innerHTML = "",
                                        e.element = ge("section"),
                                        e.element.classList.add("console"),
                                        t.appendChild(e.element)
                                }
                                ,
                                this.render = function () {
                                    e.renderConsole(),
                                        e.renderSections()
                                }
                                ,
                                this.rerender = function (t) {
                                    switch (t) {
                                        case "reports":
                                            e.renderSection(t, e.reportsNode);
                                            break;
                                        case "places":
                                            e.addLatestReportIntoRegion(),
                                                e.renderSection(t, e.placesNode);
                                            break;
                                        case "checkpoints":
                                            e.renderSection(t, e.checkpointsNode)
                                    }
                                }
                                ,
                                this.changePage = function (t, n) {
                                    if ("reports" === n)
                                        e.reportPage = parseInt(t);
                                    else if ("places" === n)
                                        e.placePage = parseInt(t);
                                    else {
                                        if ("checkpoints" !== n)
                                            return;
                                        e.checkpointPage = parseInt(t)
                                    }
                                    e.rerender(n)
                                }
                                ,
                                this.makeString = function (t, n, i, a, o) {
                                    let r = ge("input");
                                    return r.setAttribute("type", "text"),
                                        r.value = t || "",
                                        r.addEventListener("keyup", function (t) {
                                            e.update({
                                                [a]: t.target.value
                                            }, i, o)
                                        }),
                                        r
                                }
                                ,
                                this.makeSelect = function (t, n, i, a, o) {
                                    let r = ge("select");
                                    if (!n.data())
                                        throw "You must specify a data option for the select option";
                                    r.addEventListener("change", function (t) {
                                        e.update({
                                            [a]: t.target.value
                                        }, i, o)
                                    });
                                    let s = !1;
                                    n.data().forEach(function (e) {
                                        let n = ge("option");
                                        n.setAttribute("value", e.id),
                                            n.setAttribute("label", e.name || e.id),
                                            e.id === t && (s = !0,
                                                n.setAttribute("selected", "selected")),
                                            r.appendChild(n)
                                    });
                                    let l = ge("option");
                                    return l.setAttribute("value", ""),
                                        l.setAttribute("label", ""),
                                        s || l.setAttribute("selected", "selected"),
                                        r.appendChild(l),
                                        r
                                }
                                ,
                                this.makeNumber = function (t, n, i, a, o) {
                                    let r = ge("input");
                                    r.setAttribute("type", "number");
                                    let s = t || 0;
                                    return n.data && "function" == typeof n.data && (s = n.data(o)),
                                        r.value = s,
                                        r.addEventListener("change", function (t) {
                                            e.update({
                                                [a]: parseFloat(t.target.value)
                                            }, i, o)
                                        }),
                                        r
                                }
                                ,
                                this.makeBoolean = function (t, n, i, a, o) {
                                    let r = ge("div")
                                        , s = de(22)
                                        , l = ge("input");
                                    l.setAttribute("type", "checkbox"),
                                        l.setAttribute("id", s),
                                        l.checked = !!t,
                                        l.addEventListener("change", function (t) {
                                            e.update({
                                                [a]: t.target.checked
                                            }, i, o)
                                        }),
                                        r.appendChild(l);
                                    let c = ge("label");
                                    return c.setAttribute("for", s),
                                        r.appendChild(c),
                                        r
                                }
                                ,
                                this.makeDate = function (t, n, i, a, o) {
                                    let r = ge("div")
                                        , s = de(20)
                                        , l = ge("input");
                                    return l.setAttribute("type", "datetime-local"),
                                        l.setAttribute("id", s),
                                        l.value = t ? t.slice(0, 16) : "",
                                        l.addEventListener("change", function (t) {
                                            let n = moment(t.target.value).toISOString();
                                            e.update({
                                                [a]: n
                                            }, i, o)
                                        }),
                                        r.appendChild(l),
                                        r
                                }
                                ,
                                this.init = async function () {
                                    await e.downloadAll(),
                                        e.addLatestReportIntoRegion(),
                                        e.render()
                                }
                                ,
                                this.downloadAll = async function () {
                                    await Promise.all([e.get("reports"), e.get("places"), e.getCheckpoints()])
                                }
                                ,
                                this.openRegionModal = function (t) {
                                    e.reports.sort(R("date")),
                                        e.reports.reverse();
                                    let n = e.places.find(e => e.id === t)
                                        , i = e.reports.find(e => e.placeId === t) || {}
                                        , a = {
                                            infected: parseInt(i.infected || 0),
                                            dead: parseInt(i.dead || 0),
                                            recovered: parseInt(i.recovered || 0)
                                        };
                                    e.newReportModal = ge("div"),
                                        e.newReportModal.classList.add("backdrop"),
                                        be("body").appendChild(e.newReportModal);
                                    let o = ge("div");
                                    o.classList.add("modal"),
                                        e.newReportModal.appendChild(o);
                                    let r = ge("div");
                                    r.classList.add("admin-console-modal-titles"),
                                        o.appendChild(r);
                                    let s = ge("h4");
                                    s.textContent = "Create new report",
                                        r.appendChild(s);
                                    let l = ge("p");
                                    l.textContent = n.name,
                                        r.appendChild(l);
                                    let c = ge("div");
                                    c.classList.add("admin-console-modal-numbers"),
                                        o.appendChild(c);
                                    let d = function (e, t) {
                                        let n = ""
                                            , o = ""
                                            , r = e.target.parentNode;
                                        i[t] > e.target.value ? o = t + " cannot be less than in the previous report" : i.infected > a.infected || i.dead > a.dead || i.recovered > a.recovered ? o = "All fields must be higher than the previous report" : a.dead + a.recovered > a.infected ? o = "Dead + Recovered cannot be superior to Infected" : a[t] < 0 ? o = t + " cannot be negative" : a[t] > 20 && a[t] > 2 * i[t] && (n = "This is a lot more than the latest report. Please double check this is correct"),
                                            o ? (r.setAttribute("data-error", o),
                                                r.removeAttribute("data-warning"),
                                                h.classList.add("disabled")) : n ? (r.setAttribute("data-warning", n),
                                                    r.removeAttribute("data-error"),
                                                    h.classList.remove("disabled")) : (r.removeAttribute("data-error"),
                                                        r.removeAttribute("data-warning"),
                                                        h.classList.remove("disabled"))
                                    };
                                    for (let e in a) {
                                        e.toString();
                                        let t = ge("div");
                                        t.classList.add("admin-console-modal-sec"),
                                            c.appendChild(t);
                                        let n = ge("div");
                                        n.classList.add("admin-console-modal-sec-title"),
                                            n.textContent = e,
                                            t.appendChild(n);
                                        let i = ge("input");
                                        i.setAttribute("type", "number"),
                                            i.value = a[e],
                                            i.addEventListener("input", function (t) {
                                                a[e] = parseInt(t.target.value),
                                                    d(t, e)
                                            }),
                                            t.appendChild(i);
                                        let o = ge("div");
                                        t.appendChild(o);
                                        let r = ge("div");
                                        r.textContent = "Latest:" + a[e],
                                            o.appendChild(r)
                                    }
                                    let u = ge("div");
                                    u.classList.add("admin-console-modal-row"),
                                        o.appendChild(u);
                                    let p = ge("button");
                                    p.textContent = "Cancel",
                                        p.addEventListener("click", function () {
                                            e.newReportModal.remove()
                                        }),
                                        u.appendChild(p);
                                    let h = ge("button");
                                    h.classList.add("disabled"),
                                        h.textContent = "Create this report",
                                        h.addEventListener("click", function (n) {
                                            e.createUpdateReport(n, t, a, i)
                                        }),
                                        u.appendChild(h)
                                }
                                ,
                                this.createUpdateReport = async function (t, n, i, a) {
                                    t.target.classList.add("disabled");
                                    let o = !(!a || !a.date) && moment().utc().isSame(a.date, "day")
                                        , r = "";
                                    r = o ? a.id : await e.create("reports");
                                    let s = moment().toISOString();
                                    e.temp = {
                                        id: r,
                                        infected: i.infected,
                                        dead: i.dead,
                                        recovered: i.recovered,
                                        hide: !1,
                                        placeId: n,
                                        date: s,
                                        dataType: "reports"
                                    },
                                        await e.save(),
                                        e.newReportModal.remove(),
                                        e.rerender("reports"),
                                        e.rerender("places")
                                }
                                ,
                                this.addLatestReportIntoRegion = async function () {
                                    let t = [...e.reports];
                                    t.sort(R("date")),
                                        t.reverse(),
                                        e.places.forEach(function (e) {
                                            let n = t.find(t => t.placeId === e.id);
                                            n && n.date && (e.latestReport = n.date)
                                        })
                                }
                                ,
                                this.init()
                        }
                    }
                    ,
                    this.init()
            }
            ;
        break;
    case "chart":
        k = new C("#mainContainer", T[2], T[3], !0, T[4]);
        break;
    default:
        g.init(),
            v = new U
}
function C(e, t, n, i, a) {
    let o = this;
    this.selector = e,
        this.embedded = i,
        this.property = a,
        this.region = t,
        this.type = n,
        this.container = be(o.selector),
        this.cookies = new ue,
        this.element = null,
        this.additional = null,
        this.canvas = null,
        this.reports = null,
        this.report = null,
        this.places = null,
        this.place = null,
        this.config = null,
        this.graph = null,
        this.allowSwitch = !0,
        this.allowSick = !0,
        this.casesDistribution = !1,
        this.daysToShow = 7,
        this.render = async function () {
            if (o.canvas = ge("canvas"),
                "new" === o.region && "infected" === o.type)
                await o.globalNewCases();
            else if ("new" === o.region && "dead" === o.type)
                await o.globalNewCases();
            else if ("new" === o.region && "recovered" === o.type)
                await o.globalNewCases();
            else if ("new" === o.region && "sick" === o.type)
                await o.globalNewCases();
            else if ("evolution" === o.region && "infected" === o.type)
                await o.globalEvolution();
            else if ("evolution" === o.region && "dead" === o.type)
                await o.globalEvolution();
            else if ("evolution" === o.region && "recovered" === o.type)
                await o.globalEvolution();
            else if ("evolution" === o.region && "sick" === o.type)
                await o.globalEvolution();
            else if (o.region && "infected" === o.type && "new" === o.property)
                await o.countryNewCases();
            else if (o.region && "dead" === o.type && "new" === o.property)
                await o.countryNewCases();
            else if (o.region && "recovered" === o.type && "new" === o.property)
                await o.countryNewCases();
            else if (o.region && "sick" === o.type && "new" === o.property)
                await o.countryNewCases();
            else if (o.region && "infected" === o.type)
                await o.evolutionByCountry();
            else if (o.region && "recovered" === o.type)
                await o.evolutionByCountry();
            else if (o.region && "dead" === o.type)
                await o.evolutionByCountry();
            else if (o.region && "sick" === o.type)
                await o.evolutionByCountry();
            else if ("global" === o.region && "distribution" === o.type)
                await o.globalCasesDistribution();
            else {
                if (!o.region || "distribution" !== o.type)
                    throw "Unknown chart type";
                await o.countryCasesDistribution()
            }
            if (!o.config)
                return o.element.remove(),
                    null;
            o.element.innerHTML = "",
                o.element.appendChild(o.canvas),
                o.graph = new N(o.config)
        }
        ,
        this.getDaysToShow = function (e) {
            o.daysToShow = !1;
            let t = o.getCookie(e, !0);
            switch (e) {
                case "casesEvolution":
                    o.daysToShow = !1;
                    break;
                case "casesDistribution":
                case "infectedNew":
                    o.daysToShow = !!t && (parseInt(t) || 7)
            }
            [!1, 7, 30, 90].includes(o.daysToShow) || (o.daysToShow = !1)
        }
        ,
        this.makeThatTypes = function (e) {
            let t = []
                , n = ["infected"]
                , i = ["infected"];
            switch (e) {
                case "casesEvolution":
                    i = ["infected"],
                        t = o.getCookie(e) || i,
                        n = ["infected", "dead", "sick", "recovered"];
                    break;
                case "casesDistribution":
                    i = ["dead", "recovered", "sick"],
                        t = ["dead", "recovered", "sick"],
                        n = ["dead", "recovered", "sick"];
                    break;
                case "infectedNew":
                    i = ["infected"],
                        t = o.getCookie(e) || i,
                        n = ["infected", "dead", "recovered", "sick"]
            }
            Array.isArray(t) || (t = i);
            let a = [];
            t.forEach(function (e) {
                n.includes(e) && a.push(e)
            }),
                a.length < 1 && (a = i),
                o.types = a
        }
        ,
        this.computeHeight = function () {
            if (!o.element)
                return 0;
            let e = o.element.closest(".section-el-chart");
            if (!e)
                return 0;
            let t = e.offsetHeight;
            return t || 0
        }
        ,
        this.make = function () {
            let e = be(o.selector);
            o.element = ge("div", "Embeddable-Chart", {
                parent: e
            });
            ge("img", "Embeddable-Chart-Loader", {
                parent: o.element,
                src: (new Q).icon
            })
        }
        ,
        this.extractCheckpointNumber = function (e, t, n) {
            if (!n)
                return;
            let i = null;
            switch (e) {
                case "dead":
                    i = parseInt(t.dead);
                    break;
                case "recovered":
                    i = parseInt(t.recovered);
                    break;
                case "infected":
                    i = parseInt(t.infected);
                    break;
                case "sick":
                    i = parseInt(t.sick);
                    break;
                default:
                    throw "this type of chart (" + e + ") is not supported"
            }
            i && "number" == typeof i && n.push(i)
        }
        ,
        this.globalEvolution = async function () {
            await Promise.all([o.getCheckpoints(), o.getLatest()]),
                (!o.types || o.types.length < 1) && (o.types = ["infected"]);
            let e = "casesEvolution";
            o.makeThatTypes(e),
                o.getDaysToShow(e),
                o.makeChartTitle(e),
                o.element.parentNode.style.overflow = "hidden";
            let t = [];
            o.checkpoints.forEach(function (e, n) {
                e.hide || t.push(moment.utc(e.id).format("MMM DD"))
            }),
                t.reverse();
            let n = [];
            o.types.forEach(function (e) {
                let t = {
                    numbers: [],
                    name: re(e, "textId"),
                    bg: re(e, "bg"),
                    color: re(e, "color")
                };
                o.checkpoints.forEach(function (n, i) {
                    t.numbers.push(n[e])
                }),
                    t.numbers.reverse(),
                    n.push(t)
            }),
                o.config = {
                    type: "line",
                    canvas: o.canvas,
                    datasets: n,
                    axisYNames: !0,
                    labels: t,
                    isLogarithmic: (new B).on,
                    axisXNames: !0,
                    customTooltip: function (e) {
                        new W(this, e, n, t)
                    }
                }
        }
        ,
        this.getHistory = async function () {
            o.place || (o.place = [],
                o.place = await u.getHistory(o.region))
        }
        ,
        this.getLatest = async function (e) {
            o.places || (o.places = await u.getPlaces())
        }
        ,
        this.getCheckpoints = async function () {
            o.checkpoints || (o.checkpoints = await u.getCheckpoints())
        }
        ,
        this.extractCheckpointGrowth = function (e, t, n, i, a) {
            if (!e[n - 1])
                return;
            let o = null;
            switch (a) {
                case "dead":
                    o = parseInt(t.dead) - parseInt(e[n - 1].dead);
                    break;
                case "recovered":
                    o = parseInt(t.recovered) - parseInt(e[n - 1].recovered);
                    break;
                case "infected":
                    o = parseInt(t.infected) - parseInt(e[n - 1].infected);
                    break;
                case "sick":
                    o = parseInt(t.sick) - parseInt(e[n - 1].sick);
                    break;
                default:
                    throw "this type of chart " + a + " is not supported"
            }
            (o || "number" == typeof o) && (o <= 0 && (o = 0),
                i.push(o))
        }
        ,
        this.countryCasesDistribution = async function () {
            await o.getHistory();
            let e = o.place.history || []
                , t = "casesDistribution";
            o.getDaysToShow(t),
                o.makeThatTypes(t),
                o.makeChartTitle(t);
            let n = [];
            e.forEach(function (e, t) {
                n.push(moment.utc(e.day).format("MMM DD"))
            }),
                o.daysToShow && n.length > o.daysToShow && (n = n.slice(n.length - o.daysToShow, n.length));
            let i = []
                , a = {};
            o.types.forEach(function (t) {
                a[t] = 0;
                let n = {
                    numbers: [],
                    name: re(t, "textId"),
                    bg: re(t, "color"),
                    color: re(t, "color")
                }
                    , r = t;
                "dead" === t && (r = "fatalityRate"),
                    "recovered" === t && (r = "recoveryRate"),
                    "sick" === t && (r = "activeRate"),
                    e.forEach(function (e, i) {
                        let o = parseFloat(e[r] || 0);
                        a[t] += o,
                            n.numbers.push(o)
                    }),
                    o.daysToShow && n.numbers.length > o.daysToShow && (n.numbers = n.numbers.slice(n.numbers.length - o.daysToShow, n.numbers.length)),
                    i.push(n)
            });
            for (let e in a)
                if (0 === a[e])
                    return void o.container.parentNode.remove();
            n.length < 2 ? o.container.parentNode.innerHTML = "" : o.config = {
                type: "bar",
                canvas: o.canvas,
                datasets: i,
                axisYNames: !1,
                labels: n,
                stacked: !0,
                axisXNames: !0,
                customTooltip: function (e) {
                    new W(this, e, i, n, "percent")
                }
            }
        }
        ,
        this.countryNewCases = async function () {
            await o.getHistory();
            let e = o.place.history || []
                , t = "infectedNew";
            o.getDaysToShow(t),
                o.makeThatTypes(t),
                o.makeChartTitle(t);
            let n = [];
            e.forEach(function (e, t) {
                0 !== t && n.push(moment.utc(e.day).format("MMM DD"))
            }),
                o.daysToShow && n.length > o.daysToShow && (n = n.slice(n.length - o.daysToShow, n.length));
            let i = [];
            o.types.forEach(function (t) {
                let n = {
                    numbers: [],
                    name: re(t, "textId"),
                    bg: re(t, "color"),
                    color: re(t, "color")
                };
                e.forEach(function (i, a) {
                    0 !== a && o.extractCheckpointGrowth(e, i, a, n.numbers, t)
                }),
                    o.daysToShow && n.numbers.length > o.daysToShow && (n.numbers = n.numbers.slice(n.numbers.length - o.daysToShow, n.numbers.length)),
                    i.push(n)
            }),
                n.length < 2 ? o.container.parentNode.innerHTML = "" : o.config = {
                    type: "bar",
                    canvas: o.canvas,
                    datasets: i,
                    axisYNames: !0,
                    labels: n,
                    stacked: !1,
                    axisXNames: !0,
                    customTooltip: function (e) {
                        new W(this, e, i, n, "plus")
                    }
                }
        }
        ,
        this.makeChartTitle = function (e) {
            o.container.parentNode.querySelectorAll(".chart-title").forEach(function (e) {
                e.remove()
            });
            let t = ge("h3", "chart-title", {
                parent: o.container.parentNode,
                textId: e
            });
            if ("casesDistribution" === e) {
                new ee(ge("i", ["feather", "feather-help-circle"], {
                    parent: t,
                    click: function () {
                        window.open("https://www.notion.so/coronavirus/How-to-interpret-the-outcome-of-cases-graph-012481c67f71488dbda8e08b6ebd129e", "_blank")
                    }
                }), A("clickToLearn"))
            }
            o.makeIndividualizeButton(t, e),
                o.makeDateLengthButton(t, e),
                o.makeLogButton(t, e)
        }
        ,
        this.makeDateLengthButton = function (e, t) {
            if ("casesEvolution" === t)
                return;
            let n = [{
                value: 7,
                name: function () {
                    return A("recent").replace("{nb}", 7)
                }
            }, {
                value: 30,
                name: function () {
                    return A("recent").replace("{nb}", 30)
                }
            }, {
                value: 90,
                name: function () {
                    return A("recent").replace("{nb}", 90)
                }
            }, {
                value: !1,
                name: function () {
                    return A("allTime")
                }
            }]
                , i = function (e) {
                    o.daysToShow = e,
                        console.log(o.daysToShow),
                        o.setCookie(t, !0, o.daysToShow),
                        o.render()
                }
                , a = o.daysToShow ? A("recent").replace("{nb}", o.daysToShow) : A("allTime");
            console.log(a);
            let r = ge("div", "chart-scale-selector", {
                parent: e,
                text: a,
                click: function () {
                    new G({
                        node: r,
                        callback: i,
                        options: n
                    })
                }
            })
        }
        ,
        this.makeIndividualizeButton = function (e, t) {
            if ("casesEvolution" !== t && "infectedNew" !== t)
                return;
            let n = !o.checkIfResourceExists("dead") && !o.types.includes("dead")
                , i = !o.checkIfResourceExists("recovered") && !o.types.includes("recovered")
                , a = !o.types.includes("sick") && (n || i)
                , r = [{
                    value: "infected",
                    bg: re("infected", "bg"),
                    color: re("infected", "color"),
                    name: function () {
                        return A("infected")
                    }
                }, {
                    value: "dead",
                    disabled: n,
                    bg: re("dead", "bg"),
                    color: re("dead", "color"),
                    name: function () {
                        return A("dead")
                    }
                }, {
                    value: "recovered",
                    disabled: i,
                    bg: re("recovered", "bg"),
                    color: re("recovered", "color"),
                    name: function () {
                        return A("recovered")
                    }
                }];
            ("casesEvolution" === t || h.getParam("showActive")) && r.push({
                value: "sick",
                disabled: a,
                bg: re("sick", "bg"),
                color: re("sick", "color"),
                name: function () {
                    return A("sick")
                }
            });
            let s = function (e) {
                let n = o.types.indexOf(e);
                n > -1 ? o.types.splice(n, 1) : o.types.push(e),
                    o.setCookie(t, !1, o.types),
                    o.render()
            }
                , l = ge("div", "chart-scale-selector", {
                    parent: e,
                    html: o.types.length === r.length ? A("showAll") : 1 === o.types.length ? A(o.types[0]) : A("show").replace("{nb}", o.types.length),
                    click: function () {
                        new G({
                            multiple: !0,
                            value: o.types,
                            node: l,
                            callback: s,
                            options: r
                        })
                    }
                })
        }
        ,
        this.makeLogButton = function (e, t) {
            if ("casesEvolution" !== t)
                return;
            let n = ge("div", "chart-buttons", {
                parent: e
            });
            new B(function () {
                o.render()
            }
            ).picker(n)
        }
        ,
        this.globalCasesDistribution = async function () {
            await Promise.all([o.getCheckpoints(), o.getLatest()]);
            let e = JSON.parse(JSON.stringify(o.checkpoints));
            e.sort(R("id"));
            let t = "casesDistribution";
            o.makeThatTypes(t),
                o.getDaysToShow(t),
                o.makeChartTitle(t);
            let n = [];
            e.forEach(function (e, t) {
                n.push(moment.utc(e.id).format("MMM DD"))
            }),
                o.daysToShow && n.length > o.daysToShow && (n = n.slice(n.length - o.daysToShow, n.length));
            let i = [];
            o.types.forEach(function (t) {
                let n = {
                    numbers: [],
                    name: re(t, "textId"),
                    bg: re(t, "color"),
                    color: re(t, "color")
                }
                    , a = t;
                "dead" === t && (a = "fatalityRate"),
                    "recovered" === t && (a = "recoveryRate"),
                    "sick" === t && (a = "activeRate"),
                    e.forEach(function (e, t) {
                        e.hide || n.numbers.push(e[a] || 0)
                    }),
                    o.daysToShow && n.numbers.length > o.daysToShow && (n.numbers = n.numbers.slice(n.numbers.length - o.daysToShow, n.numbers.length)),
                    i.push(n)
            }),
                o.config = {
                    type: "bar",
                    canvas: o.canvas,
                    datasets: i,
                    labels: n,
                    stacked: !0,
                    axisXNames: !0,
                    customTooltip: function (e) {
                        new W(this, e, i, n, "percent")
                    }
                }
        }
        ,
        this.getCookieName = function (e, t) {
            let n = "";
            switch (e) {
                case "casesEvolution":
                    n = "evolutiontypes";
                    break;
                case "infectedNew":
                    n = t ? "newcaseszoom" : "newcasestypes";
                    break;
                case "casesDistribution":
                    n = "casesdistributionzoom"
            }
            return n
        }
        ,
        this.setCookie = function (e, t, n) {
            try {
                let i = o.getCookieName(e, t);
                if (!i)
                    return null;
                o.cookies.set(i, n, 9999)
            } catch (e) {
                console.log(e)
            }
        }
        ,
        this.getCookie = function (e, t) {
            try {
                let n = o.getCookieName(e, t);
                if (!n)
                    return null;
                let i = o.cookies.get(n);
                return i.includes(",") ? i.split(",") : "dead" === i || "infected" === i || "sick" === i || "recovered" === i ? [i] : "false" !== i && ("true" === i || i)
            } catch (e) {
                return null
            }
        }
        ,
        this.globalNewCases = async function () {
            await Promise.all([o.getCheckpoints(), o.getLatest()]);
            let e = JSON.parse(JSON.stringify(o.checkpoints));
            e.sort(R("id")),
                (!o.types || o.types.length < 1) && (o.types = ["infected"]);
            let t = "infectedNew";
            o.getDaysToShow(t),
                o.makeThatTypes(t),
                o.makeChartTitle(t);
            let n = [];
            e.forEach(function (e, t) {
                0 !== t && n.push(moment.utc(e.id).format("MMM DD"))
            }),
                o.daysToShow && n.length > o.daysToShow && (n = n.slice(n.length - o.daysToShow, n.length));
            let i = [];
            o.types.forEach(function (t) {
                let n = {
                    numbers: [],
                    name: re(t, "textId"),
                    bg: re(t, "color"),
                    color: re(t, "color")
                };
                e.forEach(function (i, a) {
                    i.hide || 0 !== a && o.extractCheckpointGrowth(e, i, a, n.numbers, t)
                }),
                    o.daysToShow && n.numbers.length > o.daysToShow && (n.numbers = n.numbers.slice(n.numbers.length - o.daysToShow, n.numbers.length)),
                    i.push(n)
            }),
                o.config = {
                    type: "bar",
                    canvas: o.canvas,
                    datasets: i,
                    labels: n,
                    axisYNames: !0,
                    stacked: !1,
                    axisXNames: !0,
                    customTooltip: function (e) {
                        new W(this, e, i, n, "plus")
                    }
                }
        }
        ,
        this.checkIfResourceExists = function (e) {
            if (!o.place)
                return !0;
            if (!o.place.history)
                return !0;
            let t = 0;
            return o.place.history.forEach(function (n) {
                n[e] && (t += parseInt(n[e]))
            }),
                t > 0
        }
        ,
        this.evolutionByCountry = async function () {
            await o.getHistory();
            let e = o.place.history || [];
            e.sort(R("day"));
            let t = "casesEvolution";
            o.getDaysToShow(t),
                o.makeThatTypes(t),
                o.makeChartTitle(t),
                o.element.parentNode.style.overflow = "hidden";
            let n = [];
            e.forEach(function (e, t) {
                n.push(moment.utc(e.day).format("MMM DD"))
            });
            let i = [];
            o.types.forEach(function (t) {
                let n = 0
                    , a = {
                        numbers: [],
                        name: re(t, "textId"),
                        bg: re(t, "bg"),
                        color: re(t, "color")
                    };
                e.forEach(function (e, i) {
                    let o = parseInt(e[t]);
                    n += o,
                        a.numbers.push(o)
                }),
                    0 !== n && i.push(a)
            }),
                n.length < 2 ? o.container.parentNode.innerHTML = "" : o.config = {
                    type: "line",
                    canvas: o.canvas,
                    datasets: i,
                    axisYNames: !0,
                    labels: n,
                    axisXNames: !0,
                    isLogarithmic: (new B).on,
                    customTooltip: function (e) {
                        new W(this, e, i, n)
                    }
                }
        }
        ,
        this.init = async function () {
            o.types = [],
                o.container.innerHTML = "",
                o.make(),
                o.render()
        }
        ,
        this.embedPopup = function (e) {
            let t = ge("div", "backdrop", {
                parent: be("body")
            });
            t.addEventListener("click", function (e) {
                e.target === e.currentTarget && t.remove()
            });
            let n = ge("div", "Embeddable-Chart-Embed", {
                parent: t
            })
                , i = window.location.origin + "/chart/" + o.region + "/" + o.type;
            o.property && (i += "/" + o.property),
                i += "?embed=true";
            let a = ge("div");
            a.textContent = A("embed"),
                n.appendChild(a);
            let r = ge("code")
                , s = o.computeHeight() || 380;
            r.textContent = '<iframe style="width:100%"; width="560" height="' + s + '" src="' + i + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                n.appendChild(r),
                new te(n, e, 0, 0)
        }
        ,
        this.init()
}
function S(e, t, n, i) {
    if (i)
        return e.removeAttribute("style"),
            e.parentNode.classList.add("nooverflow"),
            e.parentNode.removeAttribute("style"),
            e.style.width = "calc(100% + 50px)",
            void (e.parentNode.scrollLeft = 2e6);
    let a = (window.innerWidth > 991 ? 70 : 50) * t;
    a < window.innerWidth && (a = window.innerWidth),
        e.style.setProperty("width", a + "px", "important"),
        e.parentNode.scrollLeft = a,
        e.parentNode.classList.remove("nooverflow"),
        e.parentNode.style["overflow-x"] = "auto !important"
}
function P() {
    let e = new Q;
    e.render(),
        (new V).set(null),
        v && v.main && v.main.drawer && (v.main.drawer.render(),
            v.main.drawer.relaunch(!0),
            h.setUrl(window.location.origin + "/toll"),
            setTimeout(function () {
                e.remove()
            }, 200))
}
function E(e, t) {
    let n;
    return t || (t = 1),
        /^#([A-Fa-f0-9]{3}){1,2}$/.test(e) ? (3 == (n = e.substring(1).split("")).length && (n = [n[0], n[0], n[1], n[1], n[2], n[2]]),
            "rgba(" + [(n = "0x" + n.join("")) >> 16 & 255, n >> 8 & 255, 255 & n].join(",") + "," + t + ")") : e
}
function R(e) {
    let t = 1;
    return "-" === e[0] && (t = -1,
        e = e.substr(1)),
        function (n, i) {
            return ((n[e] || 0) < (i[e] || 0) ? -1 : (n[e] || 0) > (i[e] || 0) ? 1 : 0) * t
        }
}
function M(e) {
    let t = this;
    this.msg = e.msg,
        this.button = e.button,
        this.buttonFn = e.buttonFn,
        this.element = null,
        this.className = "Content-Unavailable",
        this.make = function () {
            t.remove(),
                t.element = ge("div", t.className, {
                    parent: be("body")
                }),
                t.msg && ge("div", "Content-Unavailable-Wording", {
                    html: t.msg,
                    parent: t.element
                }),
                t.button && ge("button", "btn-secondary", {
                    html: t.button || "",
                    parent: t.element,
                    click: t.buttonFn ? t.buttonFn : t.onclick
                })
        }
        ,
        this.onclick = function () {
            t.remove()
        }
        ,
        this.remove = function () {
            ye("." + t.className).forEach(function (e) {
                e.remove()
            })
        }
        ,
        this.make()
}
function I(e, t) {
    return e > t ? 1 : t > e ? -1 : 0
}
function N(e) {
    let t = this;
    this.type = e.type || "",
        this.datasets = e.datasets || [],
        this.labels = e.labels || [],
        this.canvas = e.canvas,
        this.axisXNames = e.axisXNames,
        this.axisYNames = e.axisYNames,
        this.stacked = e.stacked,
        this.onClick = e.onClick,
        this.isLogarithmic = e.isLogarithmic || !1,
        this.customTooltip = e.customTooltip,
        this.chart = null,
        this.rerender = function () {
            t.chart = null,
                t.make()
        }
        ,
        this.getEdge = function (e) {
            let n = [];
            if (t.datasets.forEach(function (e) {
                if (!e.numbers)
                    return;
                [...e.numbers].forEach(function (e) {
                    n.push(e)
                })
            }),
                n.sort(I),
                "min" === e) {
                let e = n[0];
                return e > 0 && (e = 0),
                    e
            }
            if ("max" === e) {
                return n[n.length - 1]
            }
        }
        ,
        this.formatTick = function (e, n, i) {
            if (e > t.getEdge("max"))
                return;
            if (!t.isLogarithmic)
                return oe(e);
            return [10, 100, 1e3, 1e4, 1e5, 1e6, 1e7].includes(e) ? oe(e) : void 0
        }
        ,
        this.makeScales = function () {
            let e = {
                yAxes: [{
                    gridLines: {
                        display: !0,
                        drawBorder: !1
                    },
                    ticks: {
                        fontSize: 9,
                        fontColor: "#aab7c2",
                        callback: t.formatTick,
                        display: t.axisYNames,
                        precision: 0,
                        min: t.getEdge("min")
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: !1,
                        drawBorder: !1
                    },
                    ticks: {
                        fontSize: 9,
                        fontColor: "#aab7c2",
                        display: t.axisXNames,
                        precision: 0,
                        min: 0,
                        mirror: !0
                    }
                }]
            };
            return t.stacked && (e.xAxes[0].stacked = !0,
                e.yAxes[0].stacked = !0),
                t.isLogarithmic && (e.yAxes[0].type = "logarithmic"),
                e
        }
        ,
        this.makeDatasets = function () {
            let e = [];
            return t.datasets.forEach(function (n) {
                let i = {
                    data: n.numbers,
                    backgroundColor: n.bg,
                    borderColor: n.color,
                    pointBackgroundColor: n.color,
                    lineTension: 0,
                    pointBorderColor: n.color,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 10
                };
                if ("line" === t.type) {
                    let t = JSON.parse(JSON.stringify(i));
                    i.data = n.numbers.slice(0, n.numbers.length - 1),
                        t.borderWidth = 0,
                        t.borderDash = [2, 2],
                        e.push(t)
                } else
                    "radar" === t.type && (i.label = n.label);
                e.push(i)
            }),
                e
        }
        ,
        this.makeTooltipConfig = function () {
            let e = {
                enabled: !0
            };
            if (t.customTooltip)
                return e.enabled = !1,
                    e.custom = t.customTooltip,
                    e
        }
        ,
        this.make = function () {
            if ("undefined" == typeof Chart || !Chart)
                return;
            let e = {
                title: {
                    display: !0
                },
                legend: {
                    display: !1
                },
                onClick: t.processOnClick,
                pan: {
                    enabled: !1,
                    mode: "x",
                    speed: 50,
                    threshold: 100
                },
                zoom: {
                    drag: !1,
                    enabled: !1,
                    mode: "x",
                    speed: 100,
                    sensitivity: 10
                },
                tooltips: t.makeTooltipConfig(),
                scales: t.makeScales(),
                layout: {
                    padding: {
                        left: 30,
                        right: 0,
                        top: 30,
                        bottom: 30
                    }
                },
                responsive: !0,
                maintainAspectRatio: !1,
                devicePixelRatio: 2,
                animation: {
                    duration: 200,
                    easing: "easeInQuint"
                }
            };
            "bar" === t.type ? e.animation = {
                duration: 0
            } : "radar" === t.type && (e.scale = {
                pointLabels: {
                    display: window.innerWidth > 991,
                    fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
                    fontSize: 14,
                    fontColor: "rgb(170, 183, 194)"
                },
                gridLines: {
                    color: "rgba(170, 183, 194, 0.20)"
                },
                angleLines: {
                    color: "rgba(170, 183, 194, 0.20)"
                },
                ticks: {
                    display: !1,
                    min: -.05,
                    max: 1
                }
            }),
                t.chart = new Chart(t.canvas, {
                    type: t.type,
                    data: {
                        labels: t.labels,
                        datasets: t.makeDatasets()
                    },
                    options: e
                })
        }
        ,
        this.processOnClick = function (e, n) {
            let i = t.chart.getElementsAtEvent(e);
            if (!i || !i[0])
                return;
            let a = i[0]._index;
            t.onClick && t.onClick(e, n, a)
        }
        ,
        this.make()
}
function A(e) {
    let t = f[e];
    if (!t)
        throw "String " + e + " doesn't exist";
    return t[p.lang] || t.EN
}
function D(e) {
    let t = this;
    this.selector = e,
        this.id = de(22),
        this.classNameOpen = "open",
        this.classNameSemi = "semi",
        this.classNameClose = "close",
        this.classNameInit = "init",
        this.classNameTransition = "transitioning",
        this.className = "drawer",
        this.embedded = g.embedded,
        this.countries = new he,
        this.element = null,
        this.isOpen = !1,
        this.minimum = .01,
        this.semiOpen = .65,
        this.fullyClosed = .95,
        this.initial = .8,
        this.breakpoint = .5,
        this.autoOpen = .2,
        this.relaunch = function (e) {
            let n = t.countries.getParam(t.getSelected(), "regions");
            e || n ? t.open() : t.semi()
        }
        ,
        this.close = function () {
            t.inner && (t.isOpen = !1,
                t.inner.scrollTop = 0,
                t.element.classList.remove(t.classNameOpen),
                t.element.classList.remove(t.classNameInit),
                t.element.classList.add(t.classNameClose),
                t.element.classList.remove(t.classNameSemi),
                t.element.classList.add(t.classNameTransition),
                t.element.style.top = window.innerHeight * t.fullyClosed + "px")
        }
        ,
        this.semi = function () {
            setTimeout(function () {
                t.inner && (t.isOpen = !1,
                    t.inner.scrollTop = 0,
                    t.element.classList.add(t.classNameSemi),
                    t.element.classList.remove(t.classNameOpen),
                    t.element.classList.remove(t.classNameClose),
                    t.element.classList.remove(t.classNameInit),
                    t.element.classList.add(t.classNameTransition),
                    t.element.style.top = window.innerHeight * t.semiOpen + "px")
            }, 300)
        }
        ,
        this.open = function () {
            setTimeout(function () {
                t.inner && (t.isOpen = !0,
                    t.inner.scrollTop = 0,
                    t.element.classList.add(t.classNameOpen),
                    t.element.classList.remove(t.classNameClose),
                    t.element.classList.remove(t.classNameInit),
                    t.element.classList.remove(t.classNameSemi),
                    t.element.classList.add(t.classNameTransition),
                    t.element.style.top = window.innerHeight * t.minimum + "px")
            }, 300)
        }
        ,
        this.initialize = function () {
            t.inner && (t.isOpen = !1,
                t.inner.scrollTop = 0,
                t.element.classList.remove(t.classNameOpen),
                t.element.classList.remove(t.classNameClose),
                t.element.classList.remove(t.classNameSemi),
                t.element.classList.add(t.classNameInit),
                t.element.classList.add(t.classNameTransition),
                t.element.style.top = window.innerHeight * t.initial + "px")
        }
        ,
        this.reposition = function (e) {
            e < window.innerHeight * t.minimum || e > window.innerHeight * t.fullyClosed || (t.isOpen = !1,
                t.element.classList.remove(t.classNameOpen),
                t.element.classList.remove(t.classNameTransition),
                t.element.style.top = e + "px")
        }
        ,
        this.onTouchMove = function (e) {
            if (t.isOpen)
                return;
            e.touches[0].pageY,
                t.inner.scrollTop,
                e.target.closest(".section-chart-list, .section-el-map")
        }
        ,
        this.onTouchEnd = function (e) {
            let n = e.changedTouches[0].pageY
                , i = n / window.innerHeight
                , a = t.touchStartY - n
                , o = t.inner.scrollTop;
            if (!e.target.closest(".section-el-map, .section-chart-list"))
                if (t.isOpen && a < -100 && 0 === o)
                    t.initialize();
                else {
                    if (t.isOpen)
                        return;
                    a > -100 && i < .6 ? t.open() : a < -100 && i < .6 ? t.initialize() : i >= .6 && i <= .8 && a < 0 ? t.initialize() : i >= .6 && i <= .8 && a > 0 ? t.open() : i > .8 && a > 0 ? t.open() : i > .8 && a < 0 && t.close()
                }
        }
        ,
        this.touchStartY = 0,
        this.onTouchStart = function (e) {
            t.touchStartY = e.changedTouches[0].pageY,
                t.isOpen || t.open()
        }
        ,
        this.getSelected = function () {
            return (new V).get()
        }
        ,
        this.make = function () {
            t.element = ge("div", t.className),
                t.element.addEventListener("touchmove", t.onTouchMove, {
                    passive: !0
                }),
                t.element.addEventListener("touchend", t.onTouchEnd, {
                    passive: !0
                }),
                t.element.addEventListener("touchstart", t.onTouchStart, {
                    passive: !0
                }),
                window.innerWidth > 991 && t.element.addEventListener("click", function (e) {
                    e.target === e.currentTarget && (window.innerWidth > 991 && (new V).set(null),
                        t.initialize())
                }),
                be(t.selector).prepend(t.element);
            let e = ge("div", "drawer-close-btn");
            e.addEventListener("click", function () {
                window.innerWidth > 991 && (new V).set(null),
                    t.initialize()
            }),
                t.element.appendChild(e),
                t.inner = ge("div", "drawer-inner", {
                    id: t.id
                }),
                t.inner.addEventListener("scroll", function (e) {
                    t.inner.scrollTop > 0 ? t.element.classList.add("scrolling") : t.element.classList.remove("scrolling")
                }),
                t.element.appendChild(t.inner),
                t.close(),
                (t.getSelected() || "toll" === y.current || window.innerWidth < 991) && (t.render(),
                    t.semi())
        }
        ,
        this.reset = function () {
            t.close()
        }
        ,
        this.render = function (e) {
            e || t.reset(),
                t.inner.innerHTML = "",
                new function (e, t) {
                    let n = this;
                    this.element = null,
                        this.selector = e,
                        this.globalOnly = t,
                        this.countries = new he,
                        this.getSelected = function () {
                            return n.globalOnly ? null : (new V).get()
                        }
                        ,
                        this.findPlace = function () {
                            let e = g.getPlaceById(n.getSelected()) || null;
                            return e && e.invisible ? null : e
                        }
                        ,
                        this.getData = async function () {
                            n.getSelected() ? await n.getHistory() : await n.getCheckpoints()
                        }
                        ,
                        this.getHistory = async function () {
                            n.findPlace() && (n.place = await u.getHistory(n.getSelected()))
                        }
                        ,
                        this.getCheckpoints = async function () {
                            n.checkpoints = await u.getCheckpoints()
                        }
                        ,
                        this.findProperty = function (e) {
                            let t = n.findPlace()
                                , i = t ? t[e] || 0 : g.calculate([e]);
                            return i
                        }
                        ,
                        this.calculateInfected = function () {
                            return n.findProperty("infected") || 0
                        }
                        ,
                        this.calculateDead = function () {
                            return n.findProperty("dead") || 0
                        }
                        ,
                        this.calculateRecovered = function () {
                            return n.findProperty("recovered") || 0
                        }
                        ,
                        this.calculateSick = function () {
                            let e = n.findProperty("sick");
                            return (!e || e < 1) && (e = 0),
                                e
                        }
                        ,
                        this.calculateFatalityRate = function () {
                            return n.findProperty("fatalityRate") || 0
                        }
                        ,
                        this.calculateRecoveryRate = function () {
                            return n.findProperty("recoveryRate") || 0
                        }
                        ,
                        this.calculateNew = function (e, t) {
                            return g.calculateNew(n.place, t)
                        }
                        ,
                        this.calculateCaseClosed = function () {
                            let e = n.findProperty("dead")
                                , t = n.findProperty("infected");
                            if (!t)
                                return 0;
                            let i = n.findProperty("recovered")
                                , a = t - e - i;
                            return 0 === e || 0 === i ? 0 : a
                        }
                        ,
                        this.calculateDaySinceStart = function () {
                            let e = n.findProperty("infected");
                            return e ? n.place && n.place.history && n.place.history.length > 1 ? n.place.history.length || 1 : n.checkpoints ? n.checkpoints.length : 1 : 0
                        }
                        ,
                        this.calculateCasesPerMillion = function () {
                            let e = n.findProperty("casesPerMillion");
                            return e
                        }
                        ,
                        this.calculateDeathsPerMillion = function () {
                            let e = n.findProperty("deathsPerMillion");
                            return e
                        }
                        ,
                        this.shouldCalculatePop = function () {
                            return !!n.place
                        }
                        ,
                        this.makePopulation = function () {
                            let e = n.findProperty("pop");
                            return e ? parseInt(e) : "-"
                        }
                        ,
                        this.isRegion = function () {
                            return n.findPlace()
                        }
                        ,
                        this.getChartMode = function () {
                            let e = h.getParam("mode");
                            return re(e, "mode")
                        }
                        ,
                        this.make = function () {
                            let e = be(n.selector);
                            e && (e.innerHTML = "",
                                n.element = ge("section", "stats", {
                                    parent: e
                                }))
                        }
                        ,
                        this.renderPlaceLocation = function () {
                            let e = n.findPlace()
                                , t = ge("div", "section-place-details", {
                                    parent: n.element
                                });
                            if (e) {
                                let i = ge("img", "section-place-details-flag", {
                                    parent: t,
                                    src: n.countries.flag(e.country, e.state)
                                });
                                e.isSub && i.addEventListener("click", function () {
                                    (new V).set(e.country),
                                        v && v.main && v.main.drawer && v.main.drawer.render(!0)
                                })
                            }
                            let i = ge("div", "section-place-details-container", {
                                parent: t
                            })
                                , a = ge("h1", "section-place-details-name", {
                                    parent: i
                                });
                            ge("span", {
                                parent: a,
                                text: e && e.name ? e.name : A("world")
                            });
                            if (n.renderPlaceBtns(a),
                                e) {
                                let e = ge("div", "section-place-details-subtitle", {
                                    parent: i
                                });
                                n.renderPlaceUpdate(e),
                                    n.renderPlaceSrc(e)
                            }
                            n.renderHighlights(t)
                        }
                        ,
                        this.renderPlaceUpdate = function (e) {
                            let t = n.findPlace()
                                , i = ge("span");
                            i.classList.add("section-place-details-updatedate"),
                                new ie(i, t.lastUpdated),
                                e.appendChild(i)
                        }
                        ,
                        this.renderPlaceBtns = function (e) {
                            if ("toll" === y.current)
                                return;
                            let t = n.findPlace()
                                , i = ge("div");
                            i.classList.add("section-place-btns-container"),
                                e.appendChild(i);
                            let a = ge("i");
                            a.classList.add("feather", "feather-share-2"),
                                a.addEventListener("click", function () {
                                    $(t ? t.infected : null, t ? t.name : null)
                                }),
                                i.appendChild(a)
                        }
                        ,
                        this.renderPlaceFooter = function () {
                            let e = ge("div", "section-notes-list", {
                                parent: n.element
                            });
                            n.renderPlaceNote(e)
                        }
                        ,
                        this.renderPlaceNote = function (e) {
                            let t = n.findPlace();
                            t && ge("span", "section-el-warning", {
                                parent: e,
                                html: le(t.country)
                            })
                        }
                        ,
                        this.renderPlaceSrc = function (e) {
                            let t = n.findPlace();
                            if (!t)
                                return;
                            let i = n.countries.source(t.country)
                                , a = ge("span", "section-container-source", {
                                    parent: e
                                });
                            a.innerHTML = i.length > 1 ? "<span>●  Sources: </span>" : "<span>●  Source: </span>",
                                i.forEach(function (e) {
                                    e.n && e.l && (a.innerHTML += '<a href="' + e.l + '" target="_blank">' + e.n + "</a>")
                                })
                        }
                        ,
                        this.changePlace = function (e) {
                            e ? ((new V).set(e),
                                e && v && v.main && v.main.drawer && v.main.drawer.render(!0)) : y.change("toll")
                        }
                        ,
                        this.renderBreadcrumb = function () {
                            let e = n.findPlace()
                                , t = ge("div", "section-container-breadcrumb", {
                                    parent: n.element
                                })
                                , i = ge("div", "section-container-breadcrumb-nav", {
                                    parent: t
                                });
                            if (ge("span", "map-icon", {
                                parent: i,
                                click: function () {
                                    h.setParam({
                                        selected: null
                                    }),
                                        (new V).set(null),
                                        y.change("map")
                                }
                            }),
                                ge("span", "world", {
                                    parent: i,
                                    textId: "world",
                                    click: P
                                }),
                                !e)
                                return;
                            let a = e.isSub ? n.countries.name(e.country) : e.name
                                , o = ge("span", "map-country", {
                                    parent: i,
                                    click: function () {
                                        n.changePlace(e.country)
                                    }
                                });
                            if (e && !e.isSub && o.classList.add("disabled"),
                                ge("img", "flag-img", {
                                    parent: o,
                                    src: n.countries.flag(e.country)
                                }),
                                ge("span", {
                                    parent: o,
                                    text: a
                                }),
                                !e.isSub)
                                return;
                            let r = ge("span", ["map-region", "disabled"], {
                                parent: i
                            });
                            ge("img", "flag-img", {
                                parent: r,
                                src: n.countries.flag(e.country, e.state)
                            }),
                                ge("span", {
                                    text: e.name,
                                    parent: r
                                })
                        }
                        ,
                        this.renderHighlights = function (e) {
                            let t = n.findPlace();
                            if (!t)
                                return;
                            let i = ge("div", "section-container-highlights", {
                                parent: e
                            })
                                , a = ge("div", ["section-highlights-box", "infected"], {
                                    parent: i
                                });
                            _(function (e) {
                                a.innerHTML = '<div class="section-el-number">' + K(e, "plus") + '</div><div  class="section-el-name">' + A("infectedNew") + "</div>"
                            }, n.calculateNew(t, "infected"));
                            let o = ge("div", ["section-highlights-box", "dead"], {
                                parent: i
                            });
                            _(function (e) {
                                o.innerHTML = '<div class="section-el-number">' + K(e, "plus") + '</div><div  class="section-el-name">' + A("dead") + "</div>"
                            }, n.calculateNew(t, "dead"))
                        }
                        ,
                        this.renderCoronalyticsMsg = async function () {
                            let e = n.findPlace();
                            if (!e)
                                return;
                            let t = ge("div", "coronalytics-fab", {
                                parent: n.element,
                                click: function (e) {
                                    if ("input" === e.target.tagName.toLowerCase())
                                        return e.preventDefault(),
                                            void e.stopPropagation();
                                    if (t.classList.contains("open"))
                                        return void t.classList.remove("open");
                                    t.classList.add("open");
                                    let n = t.querySelector("input");
                                    setTimeout(function () {
                                        (new z).set(n, "end")
                                    }, 100)
                                }
                            })
                                , i = await u.getPlaces()
                                , a = [];
                            i.forEach(function (t) {
                                if (t.invisible)
                                    return;
                                let i = e.id === t.id;
                                !t.nonaffected && t.infected || (i = !0);
                                let o = {
                                    id: t.id,
                                    disabled: i,
                                    value: t.name,
                                    desc: t.isSub ? n.countries.name(t.country) : ""
                                };
                                a.push(o)
                            }),
                                a.sort(R("value"));
                            let o = ge("label", "coronalytics-fab-input", {
                                parent: t
                            });
                            new O({
                                label: o,
                                placeholder: A("compareWith").replace("{t}", e.name) + "...",
                                options: a,
                                callback: function (t) {
                                    y.change("analytics"),
                                        h.setParam({
                                            compared: e.id + "," + t
                                        })
                                },
                                customClass: "coronalytics-search-fab"
                            })
                        }
                        ,
                        this.renderSecondaryNumbers = function () {
                            let e = n.findPlace()
                                , t = ge("div", "section-secondary-numbers", {
                                    parent: n.element
                                })
                                , i = [{
                                    mode: "infected",
                                    animate: !1,
                                    nb: n.calculateInfected
                                }, {
                                    mode: "dead",
                                    animate: !1,
                                    nb: n.calculateDead
                                }, {
                                    mode: "sick",
                                    animate: !1,
                                    nb: n.calculateCaseClosed
                                }, {
                                    mode: "population",
                                    animate: !1,
                                    onlyIf: n.shouldCalculatePop,
                                    nb: n.makePopulation
                                }, {
                                    mode: "casesPerMillion",
                                    animate: !1,
                                    onlyIf: n.shouldCalculatePop,
                                    nb: n.calculateCasesPerMillion
                                }, {
                                    mode: "deathsPerMillion",
                                    animate: !1,
                                    onlyIf: n.shouldCalculatePop,
                                    nb: n.calculateDeathsPerMillion
                                }, {
                                    mode: "fatalityRate",
                                    animate: !1,
                                    nb: n.calculateFatalityRate
                                }, {
                                    mode: "recovered",
                                    animate: !1,
                                    nb: n.calculateRecovered
                                }, {
                                    mode: "recoveryRate",
                                    animate: !1,
                                    nb: n.calculateRecoveryRate
                                }];
                            i.forEach(function (n, i) {
                                if (n.onlyIf && "function" == typeof n.onlyIf && !n.onlyIf())
                                    return;
                                let a = n.nb()
                                    , o = n.mode
                                    , r = ge("div", "section-el")
                                    , s = re(o, "link");
                                s && (r.classList.add("section-el-link"),
                                    r.addEventListener("click", function () {
                                        window.open(s, "_blank")
                                    })),
                                    t.appendChild(r);
                                let l = re(o, "icon");
                                if (l) {
                                    let e = l.split(" ")
                                        , t = ge("i");
                                    t.classList.add("section-el-ico"),
                                        e.forEach(function (e) {
                                            t.classList.add(e)
                                        }),
                                        r.appendChild(t)
                                }
                                let c = ge("div", "section-el-inner", {
                                    parent: r
                                })
                                    , d = ge("div", "section-el-number", {
                                        parent: c
                                    });
                                n.animate ? _(function (e) {
                                    d.innerHTML = K(e, re(o, "number"))
                                }, a) : d.innerHTML = K(a, re(o, "number")),
                                    e && "FR" === e.id && n.mode;
                                ge("div", "section-el-name", {
                                    text: re(o, "textId"),
                                    parent: c
                                })
                            })
                        }
                        ,
                        this.renderCharts = function () {
                            let e = [{
                                type: "chart",
                                onlyIf: function () {
                                    let e = n.findPlace();
                                    return !(!e || !e.infected)
                                },
                                chart: function (e) {
                                    new C("#" + e, n.getSelected(), n.getChartMode(), !1, "new")
                                }
                            }, {
                                type: "chart",
                                onlyIf: function () {
                                    let e = n.findPlace();
                                    return !(!e || !e.infected)
                                },
                                chart: function (e) {
                                    new C("#" + e, n.getSelected(), n.getChartMode())
                                }
                            }, {
                                type: "chart",
                                onlyIf: function () {
                                    let e = n.findPlace();
                                    return !(!e || !e.infected)
                                },
                                chart: function (e) {
                                    new C("#" + e, n.getSelected(), "distribution")
                                }
                            }, {
                                type: "chart",
                                onlyIf: function () {
                                    return !n.findPlace()
                                },
                                chart: function (e) {
                                    new C("#" + e, "new", "infected")
                                }
                            }, {
                                type: "chart",
                                onlyIf: function () {
                                    return !n.findPlace()
                                },
                                chart: function (e) {
                                    new C("#" + e, "evolution", "infected")
                                }
                            }, {
                                type: "chart",
                                onlyIf: function () {
                                    return !n.findPlace()
                                },
                                chart: function (e) {
                                    new C("#" + e, "global", "distribution")
                                }
                            }];
                            e.forEach(function (e) {
                                let t = ge("div", "section-chart-list", {
                                    parent: n.element
                                });
                                if (!e.onlyIf())
                                    return;
                                let i = de(25);
                                ge("div", "section-el-chart", {
                                    parent: t,
                                    id: i
                                }),
                                    e.chart(i)
                            })
                        }
                        ,
                        this.renderSmallMap = function () {
                            let e = n.findPlace();
                            if (!e || !e.infected)
                                return;
                            let t = ge("div");
                            t.classList.add("section-el-map");
                            let i = de(25);
                            t.setAttribute("id", i),
                                n.element.appendChild(t),
                                new function (e, t, n) {
                                    let i = this;
                                    this.selector = e,
                                        this.countries = new he,
                                        this.geoJson = null,
                                        this.version = 21,
                                        this.placeId = t,
                                        this.wholeZones = !1,
                                        this.map = null,
                                        this.id = de(12),
                                        this.viewMode = n || "map",
                                        this.element = null,
                                        this.container = null,
                                        this.mode = function () {
                                            return re(h.getParam("mode"), "mode")
                                        }
                                        ,
                                        this.selectedBorder = "rgb(41, 84, 255)",
                                        this.selectedBg = "rgba(41, 84, 255, 0.7)",
                                        this.getRegions = async function () {
                                            i.places = await u.getRegions(i.placeId)
                                        }
                                        ,
                                        this.make = function () {
                                            i.element = ge("div", "region-page-local-map", {
                                                parent: be(i.selector)
                                            }),
                                                i.buttons = ge("div", "region-page-local-map-buttons", {
                                                    parent: i.element
                                                }),
                                                i.container = ge("div", "region-page-local-map-container", {
                                                    parent: i.element
                                                }),
                                                i.list = ge("div", "region-page-local-map-list", {
                                                    parent: i.element
                                                })
                                        }
                                        ,
                                        this.renderButtons = function () {
                                            i.buttons.innerHTML = "",
                                                i.switchButtons.forEach(function (e) {
                                                    let t = ge("button", {
                                                        parent: i.buttons
                                                    });
                                                    e.id === i.viewMode && t.classList.add("active"),
                                                        t.addEventListener("click", function () {
                                                            i.viewMode = e.id,
                                                                i.renderButtons(),
                                                                i.renderMiniMap()
                                                        }),
                                                        ge("i", ["feather", e.icon], {
                                                            parent: t
                                                        }),
                                                        ge("span", {
                                                            text: e.tooltip,
                                                            parent: t
                                                        })
                                                })
                                        }
                                        ,
                                        this.countryId = function () {
                                            return i.places[0].country
                                        }
                                        ,
                                        this.sortFeatures = function () {
                                            let e = i.mode();
                                            i.geoJson.features.sort(function (t, n) {
                                                let a = i.findPlaceForFeature(t)
                                                    , o = i.findPlaceForFeature(n)
                                                    , r = a ? a[e] : 0;
                                                return (o ? o[e] : 0) - r
                                            })
                                        }
                                        ,
                                        this.render = function () {
                                            try {
                                                i.sortFeatures(),
                                                    i.renderMiniMap(),
                                                    i.renderRegionsList()
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }
                                        ,
                                        this.renderPieChart = function () {
                                            let e = ve(i.id)
                                                , t = ge("canvas");
                                            e.appendChild(t);
                                            let n = 0
                                                , a = [{
                                                    numbers: [],
                                                    color: [],
                                                    bg: []
                                                }]
                                                , o = []
                                                , r = [];
                                            i.geoJson.features.forEach(function (e) {
                                                let t = a[0].numbers
                                                    , s = i.findPlaceForFeature(e) || {}
                                                    , l = i.getPlaceStyle(s)
                                                    , c = s ? s[i.mode()] : 0
                                                    , d = (!t[t.length - 1] || t[t.length - 1],
                                                        s && s.id && s.id === i.placeId)
                                                    , u = d ? i.selectedBorder : l.fillColor
                                                    , p = getComputedStyle(document.body).getPropertyValue("--zoneOpacity")
                                                    , h = E(d ? i.selectedBg : l.color, p)
                                                    , m = s.name || ""
                                                    , f = s.id || "";
                                                n += c || 0,
                                                    t.push(c),
                                                    a[0].color.push(u),
                                                    a[0].bg.push(h),
                                                    o.push(m),
                                                    r.push(f)
                                            }),
                                                new N({
                                                    type: "doughnut",
                                                    canvas: t,
                                                    datasets: a,
                                                    labels: o,
                                                    customTooltip: function (e) {
                                                        new W(this, e, a, o)
                                                    },
                                                    onClick: function (e, t, n) {
                                                        let a = r[n];
                                                        a && i.changePlace(a)
                                                    }
                                                })
                                        }
                                        ,
                                        this.renderRegionsList = function () {
                                            i.list.innerHTML = "",
                                                ve(i.id);
                                            let e = ge("table", "region-page-local-map-container-list", {
                                                parent: i.list
                                            })
                                                , t = ge("tr", {
                                                    parent: e
                                                })
                                                , n = i.hasRecovered()
                                                , a = i.hasDead();
                                            [{
                                                name: function () {
                                                    return "#"
                                                }
                                            }, {
                                                name: function () {
                                                    return A("name")
                                                }
                                            }, {
                                                name: function () {
                                                    return A("infected")
                                                },
                                                id: "infected"
                                            }, {
                                                name: function () {
                                                    return A("dead")
                                                },
                                                id: "dead",
                                                onlyIf: function () {
                                                    return a
                                                }
                                            }, {
                                                name: function () {
                                                    return A("recovered")
                                                },
                                                id: "recovered",
                                                onlyIf: function () {
                                                    return n
                                                }
                                            }].forEach(function (e) {
                                                if (e.onlyIf && !e.onlyIf())
                                                    return;
                                                let n = ge("th", {
                                                    text: e.name(),
                                                    parent: t
                                                });
                                                e.id ? n.addEventListener("click", function () {
                                                    h.setParam({
                                                        mode: e.id
                                                    }),
                                                        i.render()
                                                }) : n.classList.add("unsortable")
                                            }),
                                                i.geoJson.features.forEach(function (t, o) {
                                                    let r = i.findPlaceForFeature(t)
                                                        , s = r && r.name ? r.name : t.properties.name
                                                        , l = r && r.infected ? r.infected : 0
                                                        , c = r && r.dead ? r.dead : 0
                                                        , d = r && r.recovered ? r.recovered : 0
                                                        , u = r && r.id ? r.id : ""
                                                        , p = ge("tr", {
                                                            parent: e
                                                        });
                                                    u === i.placeId && p.classList.add("active"),
                                                        u && p.addEventListener("click", function () {
                                                            i.changePlace(u)
                                                        }),
                                                        ge("td", {
                                                            parent: p,
                                                            text: o + 1
                                                        }),
                                                        ge("td", {
                                                            text: s,
                                                            parent: p
                                                        });
                                                    let h = ge("td", "region-page-local-map-container-subtitle", {
                                                        parent: p,
                                                        text: l ? ae(l) : "-"
                                                    });
                                                    if ("infected" !== i.mode() && h.classList.add("secondary"),
                                                        h.style.color = "var(--infected)",
                                                        a) {
                                                        let e = ge("td", "region-page-local-map-container-subtitle", {
                                                            parent: p,
                                                            text: c ? ae(c) : "-"
                                                        });
                                                        "dead" !== i.mode() && e.classList.add("secondary"),
                                                            e.style.color = "var(--dead)"
                                                    }
                                                    if (n) {
                                                        let e = ge("td", "region-page-local-map-container-subtitle", {
                                                            parent: p,
                                                            text: d ? ae(d) : "-"
                                                        });
                                                        "recovered" !== i.mode() && e.classList.add("secondary"),
                                                            e.style.color = "var(--recovered)"
                                                    }
                                                })
                                        }
                                        ,
                                        this.findPlaceForFeature = function (e) {
                                            let t = i.places.find(t => t.name === e.properties.name);
                                            return t || (t = i.places.find(t => t.id === e.properties.id)),
                                                t
                                        }
                                        ,
                                        this.hasRecovered = function () {
                                            let e = 0;
                                            return i.geoJson.features.forEach(function (t) {
                                                let n = i.findPlaceForFeature(t);
                                                n && n.recovered && "number" == typeof n.recovered && (e += n.recovered)
                                            }),
                                                !!e
                                        }
                                        ,
                                        this.hasDead = function () {
                                            let e = 0;
                                            return i.geoJson.features.forEach(function (t) {
                                                let n = i.findPlaceForFeature(t);
                                                n && n.dead && "number" == typeof n.dead && (e += n.dead)
                                            }),
                                                !!e
                                        }
                                        ,
                                        this.renderMiniMap = function () {
                                            i.map = null,
                                                i.id = de(12),
                                                i.container.innerHTML = "",
                                                i.element.setAttribute("data-type", i.mode()),
                                                ge("div", "region-page-local-map-container-inner", {
                                                    id: i.id,
                                                    parent: i.container
                                                }),
                                                (i.switchButtons.find(e => e.id === i.viewMode) || i.switchButtons[0]).fn()
                                        }
                                        ,
                                        this.renderMap = function () {
                                            i.createMap(),
                                                i.createRegions()
                                        }
                                        ,
                                        this.getPlaceStyle = function (e) {
                                            return b.getPlaceStyle(e, !0, i.mode())
                                        }
                                        ,
                                        this.highlightBubble = function (e) {
                                            i.map.eachLayer(function (t) {
                                                if (t.options.place)
                                                    if (t.options.place.id === e || t.options.place.id === i.placeId) {
                                                        let e = i.selectedBorder;
                                                        t.setStyle({
                                                            color: e,
                                                            fillColor: i.selectedBg
                                                        })
                                                    } else
                                                        t.setStyle(i.getPlaceStyle(t.options.place))
                                            })
                                        }
                                        ,
                                        this.resetStyles = function () {
                                            i.map.eachLayer(function (e) {
                                                e.options.place && e.options.place.id !== i.placeId && e.setStyle(i.getPlaceStyle(e.options.place))
                                            })
                                        }
                                        ,
                                        this.createRegions = function () {
                                            let e = [];
                                            i.geoJson.features.forEach(function (t) {
                                                let n = i.findPlaceForFeature(t);
                                                n || (n = {
                                                    id: de(21),
                                                    nonaffected: !0,
                                                    country: i.places[0].country,
                                                    name: t.properties.name,
                                                    infected: 0,
                                                    dead: 0,
                                                    recovered: 0,
                                                    sick: 0
                                                });
                                                let a = b.createPlaceFeature(n, !0, i.mode(), t).bindTooltip(function (e) {
                                                    return b.showTooltip(n)
                                                }).on("tooltipopen", function () {
                                                    i.highlightBubble(n.id)
                                                }).on("tooltipclose", function () {
                                                    i.resetStyles()
                                                }).on("click", function () {
                                                    n.infected && !n.nonaffected && i.changePlace(n.id)
                                                });
                                                e.push(a)
                                            });
                                            let t = new L.featureGroup(e);
                                            t.addTo(i.map),
                                                i.map.fitBounds(t.getBounds()),
                                                i.map.touchZoom.disable(),
                                                i.map.doubleClickZoom.disable(),
                                                i.map.scrollWheelZoom.disable(),
                                                i.map.dragging.disable(),
                                                setTimeout(function () {
                                                    i.highlightBubble(i.placeId)
                                                }, 200)
                                        }
                                        ,
                                        this.changePlace = function (e) {
                                            (new V).set(e),
                                                v && v.main && v.main.drawer && v.main.drawer.render(!0)
                                        }
                                        ,
                                        this.createMap = function () {
                                            i.map = L.map(i.id, {
                                                tap: !1,
                                                worldCopyJump: !1,
                                                zoomSnap: 1,
                                                maxBoundsViscosity: 0,
                                                zoomControl: !1,
                                                attributionControl: !1
                                            })
                                        }
                                        ,
                                        this.loadGeoJson = async function () {
                                            i.geoJson = await fe("GET", "/assets/geojson/" + i.countryId() + ".json?v=" + i.version)
                                        }
                                        ,
                                        this.init = async function () {
                                            await i.getRegions(),
                                                !i.places || i.places.length < 1 || (i.make(),
                                                    await i.loadGeoJson(),
                                                    setTimeout(function () {
                                                        i.render()
                                                    }, 200))
                                        }
                                        ,
                                        this.switchButtons = [{
                                            id: "map",
                                            tooltip: "Country map",
                                            icon: "feather-map",
                                            fn: i.renderMap
                                        }, {
                                            id: "pie",
                                            tooltip: "Case distribution",
                                            icon: "feather-pie-chart",
                                            fn: i.renderPieChart
                                        }, {
                                            id: "list",
                                            tooltip: "Region table",
                                            icon: "feather-list",
                                            fn: i.renderRegionsList
                                        }],
                                        this.init()
                                }
                                    ("#" + i, n.getSelected())
                        }
                        ,
                        this.render = function () {
                            (new V).updateDocTitle(n.getSelected()),
                                n.findPlace() || n.element.classList.add("noplace"),
                                n.element.innerHTML = "",
                                n.renderBreadcrumb(),
                                n.renderPlaceLocation(),
                                n.renderSecondaryNumbers(),
                                n.renderSmallMap(),
                                n.renderCharts(),
                                n.renderPlaceFooter(),
                                new function (e, t) {
                                    let n = this;
                                    this.wrapper = e,
                                        this.place = t || {},
                                        this.element = null,
                                        this.make = function () {
                                            n.element = ge("div"),
                                                n.element.classList.add("like-this-page"),
                                                n.wrapper.appendChild(n.element)
                                        }
                                        ,
                                        this.share = function () {
                                            $(n.place ? n.place.infected : null, n.place ? n.place.name : null)
                                        }
                                        ,
                                        this.buy = function () {
                                            window.open(l, "_blank")
                                        }
                                        ,
                                        this.render = function () {
                                            n.element.innerHTML = "";
                                            let e = ge("h3");
                                            e.textContent = A("likeApp") + " " + A("needYourHelp"),
                                                n.element.appendChild(e);
                                            let t = ge("div");
                                            t.classList.add("like-this-page-container"),
                                                n.element.appendChild(t);
                                            let i = ge("button");
                                            i.classList.add("like-this-page-share"),
                                                i.textContent = A("share"),
                                                i.addEventListener("click", n.share),
                                                t.appendChild(i);
                                            // TODO: Get rid of this
                                            let a = ge("button");
                                            a.classList.add("donate-btn"),
                                                a.innerHTML = '<img src="' + d + '" />' + A("buyCoffee"),
                                                a.addEventListener("click", n.buy),
                                                t.appendChild(a)
                                        }
                                        ,
                                        this.init = function () {
                                            n.make(),
                                                n.render()
                                        }
                                        ,
                                        this.init()
                                }
                                    (n.element, n.findPlace()),
                                n.element.classList.add("place-wrapper-fully-loaded"),
                                setTimeout(function () {
                                    n.renderCoronalyticsMsg()
                                }, 500)
                        }
                        ,
                        this.init = async function () {
                            await n.getData(),
                                be(n.selector) && (n.make(),
                                    n.element && n.render())
                        }
                        ,
                        this.init()
                }
                    ("#" + t.id)
        }
        ,
        this.removeAll = function () {
            ye("." + t.className).forEach(function (e) {
                e.remove()
            })
        }
        ,
        this.waitForInit = async function () {
            return new Promise(function (e, t) {
                let n = setInterval(function () {
                    if (g && g.places && g.places.length > 1)
                        return clearInterval(n),
                            e()
                }, 20)
            }
            )
        }
        ,
        this.autoCorrect = function () {
            let e = t.getSelected();
            e && (g.places.find(t => t.id === e) || (new V).set(null))
        }
        ,
        this.init = async function () {
            t.removeAll(),
                "api" !== y.current && "taiwan" !== y.current && "analytics" !== y.current && (t.embedded || (await t.waitForInit(),
                    t.removeAll(),
                    t.autoCorrect(),
                    t.make()))
        }
        ,
        this.init()
}
function z() {
    this.position = function (e, t) {
        if (!e)
            return;
        let n = document.createRange()
            , i = window.getSelection()
            , a = e.childNodes ? e.childNodes[0] : e;
        n.setStart(a, t),
            n.collapse(!0),
            i.removeAllRanges(),
            i.addRange(n),
            e.focus(),
            n.detach(),
            e.scrollTop = e.scrollHeight
    }
        ,
        this.set = function (e, t) {
            let n = document.createRange()
                , i = window.getSelection();
            n.selectNodeContents(e),
                n.collapse("end" !== t),
                i.removeAllRanges(),
                i.addRange(n),
                e.focus(),
                n.detach(),
                e.scrollTop = e.scrollHeight
        }
}
function H() {
    let e = this;
    this.pageSize = new function () {
        let e = this;
        this.calculate = function () {
            let e = .01 * window.innerHeight;
            document.documentElement.style.setProperty("--vh", e + "px")
        }
            ,
            this.timer = null,
            this.init = function () {
                e.calculate(),
                    window.addEventListener("resize", () => {
                        clearTimeout(e.timer),
                            e.timer = setTimeout(e.calculate, 200)
                    }
                    )
            }
            ,
            this.init()
    }
        ,
        this.content = null,
        this.originalTitle = document.title,
        this.toggleDark = function () {
            be("body").classList.toggle("dark")
        }
        ,
        this.showTW = function () {
            return "TW" === p.getCountry() || "TW" === p.lang
        }
        ,
        this.showKR = function () {
            return "KR" === p.getCountry() || "KR" === p.lang
        }
        ,
        this.sections = [{
            id: "map",
            render: function (e) {
                y.content = new q(e)
            }
        }, {
            id: "taiwan",
            render: function (e) {
                y.content = new function (e) {
                    let t = this;
                    this.element = null,
                        this.embedded = g.embedded,
                        this.map = null,
                        this.selector = e,
                        this.sorter = "nb",
                        this.hovering = null,
                        this.id = de(22),
                        this.lastUpdate = null,
                        this.mode = null,
                        this.modes = {
                            adult: {
                                name: g.masks.adult.name,
                                bg: g.masks.adult.bg,
                                color: g.masks.adult.color
                            },
                            child: {
                                name: g.masks.child.name,
                                bg: g.masks.child.bg,
                                color: g.masks.child.color
                            }
                        },
                        this.setMode = function () {
                            let e = h.getParam("mode") || "";
                            t.modes[e] ? t.mode = e : t.mode = "adult"
                        }
                        ,
                        this.make = async function () {
                            t.element = ge("section"),
                                t.element.classList.add("map"),
                                t.embedded && t.element.classList.add("embedded"),
                                t.element.setAttribute("id", t.id),
                                be(t.selector).appendChild(t.element)
                        }
                        ,
                        this.getData = async function () {
                            let e = await fe("GET", "/get-taiwan-masks");
                            t.lastUpdate = moment(e.lastUpdate).format("YYYY[/]MM[/]DD, HH[:]mm"),
                                t.places = e.places,
                                t.geolocated && t.places.push({
                                    isMe: !0,
                                    lat: t.latitude,
                                    lng: t.longitude
                                })
                        }
                        ,
                        this.getLocation = async function () {
                            let e = await (new ce).get() || {};
                            e && e.latitude && e.longitude ? t.geolocated = !0 : t.geolocated = !1,
                                t.latitude = e.latitude || 25.041718,
                                t.longitude = e.longitude || 121.543715
                        }
                        ,
                        this.makeSiteLink = function () {
                            if (!t.embedded)
                                return;
                            let e = ge("a");
                            e.classList.add("site-link"),
                                e.setAttribute("href", "https://progressier.com"),
                                e.setAttribute("target", "_blank"),
                                e.textContent = "progressier.com",
                                be(t.selector).appendChild(e)
                        }
                        ,
                        this.getPlaceStyle = function (e) {
                            t.mode;
                            let n = e.isMe
                                , i = 10
                                , a = t.modes[t.mode].color
                                , o = a
                                , r = 2
                                , s = .6;
                            return n && (a = "rgba(220, 28, 28, 0.2)",
                                o = "rgba(220, 28, 28, 1)",
                                i = 10,
                                s = 1,
                                r = 30),
                            {
                                place: e,
                                color: a,
                                radius: i,
                                fillColor: o,
                                fillOpacity: s,
                                weight: r,
                                stroke: !0
                            }
                        }
                        ,
                        this.render = function () {
                            t.createMap(),
                                t.addBubbles(),
                                t.makeSiteLink()
                        }
                        ,
                        this.createMap = function () {
                            let e = L.GridLayer.prototype._initTile;
                            L.GridLayer.include({
                                _initTile: function (t) {
                                    e.call(this, t);
                                    var n = this.getTileSize();
                                    t.style.width = n.x + 1 + "px",
                                        t.style.height = n.y + 1 + "px"
                                }
                            }),
                                t.map = L.map(t.id, {
                                    worldCopyJump: !0,
                                    zoomSnap: 1,
                                    zoomControl: !1,
                                    attributionControl: !1
                                }).setView([t.latitude, t.longitude], 15);
                            let n = L.latLng(-89.98155760646617, -180)
                                , i = L.latLng(89.99346179538875, 180)
                                , a = L.latLngBounds(n, i);
                            t.map.setMaxBounds(a),
                                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                                    maxZoom: 20,
                                    minZoom: 11,
                                    attribution: 'Map by &copy; <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a> | <a target="javascript:void(0)">© 2020 Scriby, Inc. All Rights Reserved.</a>'
                                }).addTo(t.map),
                                L.control.attribution({
                                    position: "bottomright"
                                }).addTo(t.map),
                                L.control.zoom({
                                    position: "bottomright"
                                }).addTo(t.map)
                        }
                        ,
                        this.goToMaps = function (e) {
                            window.open("http://maps.google.com/?daddr=" + e, "_blank")
                        }
                        ,
                        this.addBubbles = function () {
                            let e = t.places;
                            e.forEach(function (e) {
                                let n = L.circleMarker([e.lat, e.lgn || e.lng], t.getPlaceStyle(e));
                                e.isMe || n.bindTooltip(function (n) {
                                    return t.showTooltip(e)
                                }),
                                    n.on("click", function () {
                                        t.goToMaps(e.a)
                                    }),
                                    n.addTo(t.map)
                            })
                        }
                        ,
                        this.changeView = function (e) {
                            t.modes[e] && (t.mode = e,
                                h.setParam({
                                    mode: e
                                }),
                                t.render())
                        }
                        ,
                        this.showTooltip = function (e) {
                            t.tooltip = ge("div"),
                                t.tooltip.classList.add("map-tooltip", "Tooltip", "long"),
                                t.tooltip.innerHTML = "";
                            let n = ge("div");
                            n.classList.add("map-tooltip-name"),
                                n.textContent = e.n,
                                t.tooltip.appendChild(n);
                            let i = ge("div");
                            i.classList.add("map-tooltip-desc", "grey"),
                                i.textContent = e.a,
                                t.tooltip.appendChild(i);
                            let a = ge("div");
                            a.classList.add("map-tooltip-desc"),
                                a.textContent = t.modes.adult.name() + ": " + e.am,
                                t.tooltip.appendChild(a);
                            let o = ge("div");
                            o.classList.add("map-tooltip-desc"),
                                o.textContent = t.modes.child.name() + ": " + e.cm,
                                t.tooltip.appendChild(o);
                            let r = ge("div");
                            r.classList.add("map-tooltip-desc"),
                                r.textContent = A("lastUpdate") + ": " + t.lastUpdate,
                                t.tooltip.appendChild(r);
                            let s = ge("i");
                            return s.classList.add("feather", "feather-navigation", "map-tooltip-icon"),
                                s.addEventListener("click", function () {
                                    t.goToMaps(address)
                                }),
                                t.tooltip.appendChild(s),
                                t.tooltip
                        }
                        ,
                        this.init = async function () {
                            t.loading = new Q,
                                t.loading.render(),
                                t.setMode(),
                                await t.make(),
                                await t.getLocation(),
                                await t.getData(),
                                t.element.parentNode && (t.render(),
                                    t.loading.remove())
                        }
                        ,
                        this.init()
                }
                    (e)
            }
        }, {
            id: "toll",
            render: function (e) {
                y.content = new q(e)
            }
        }, {
            id: "analytics",
            render: function (e) {
                new function (e) {
                    let t = this;
                    this.container = be("#mainContainer"),
                        this.zones = e || null,
                        this.allPlaces = null,
                        this.element = null,
                        this.contents = null,
                        this.places = [],
                        this.countries = new he,
                        this.version = 1,
                        this.chartId = "infected",
                        this.alignToStart = !0,
                        this.logarithmic = !0,
                        this.stacked = !0,
                        this.defaultColors = ["#3498db", "#f1c40f", "#ff416c", "#16a085", "#9124f4", "#2ecc71", "#756d9c", "#f39c12", "#27ae60", "#e67e22", "#1abc9c", "#d35400", "#a94136", "#e74c3c", "#c0392b", "#f69785", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#9ba37e", "#b49255", "#b49255", "#2980b9"],
                        this.max = 7,
                        this.separator = "|",
                        this.isOld = !1,
                        this.changePlaces = async function (e) {
                            let n = new Q;
                            n.render(),
                                t.zones = e || [],
                                await t.downloadAll(),
                                t.sort(),
                                t.render(),
                                t.updateUrl(),
                                n.remove()
                        }
                        ,
                        this.getActivePlaces = function () {
                            return t.places.filter(function (e) {
                                return t.zones.includes(e.id)
                            })
                        }
                        ,
                        this.updateUrl = function () {
                            let e = null;
                            t.zones && t.zones.length > 0 && (e = t.zones.join(",")),
                                h.setParam({
                                    compared: e
                                });
                            let n = t.getPageTitle() || "Coronalytics | Analyse & Predict COVID-19";
                            Y({
                                title: n,
                                description: "View this comparison of the spread of coronavirus across regions and countries"
                            })
                        }
                        ,
                        this.getPageTitle = function () {
                            if (!h.getParam("compared"))
                                return;
                            let e = h.getParam("compared").split(",");
                            if (!e || e.length < 2 || e.length > 7)
                                return;
                            if (!t.allPlaces && t.allPlaces.length < 1)
                                return;
                            let n = "Coronalytics | COVID-19 in ";
                            return e.forEach(function (i, a) {
                                let o = t.allPlaces.find(e => e.id === i);
                                o && (n += o.name || "",
                                    e[a + 1] && (n += ", "))
                            }),
                                n
                        }
                        ,
                        this.changeMode = function (e) {
                            t.chartId = e,
                                t.render()
                        }
                        ,
                        this.hasZones = function () {
                            return t.zones && "object" == typeof t.zones && t.zones.length > 1
                        }
                        ,
                        this.render = function () {
                            t.hasZones() ? t.element.classList.remove("noregion") : t.element.classList.add("noregion"),
                                t.makeColors(),
                                t.renderChart(),
                                t.renderMenu(),
                                t.renderTopRow()
                        }
                        ,
                        this.makeColors = function () {
                            t.places.forEach(function (e) {
                                let n = t.zones.indexOf(e.id) || 0;
                                e.opacity = t.getCurrentConfig().opacity,
                                    e.color = E(t.defaultColors[n], 1),
                                    e.bg = E(t.defaultColors[n], e.opacity)
                            })
                        }
                        ,
                        this.spliceZone = function (e) {
                            let n = t.zones.indexOf(e);
                            !n < 0 || (t.zones.splice(n, 1),
                                t.changePlaces(t.zones))
                        }
                        ,
                        this.addPlace = function (e) {
                            t.zones.length >= t.max ? new ne("error", "You can compare a maximum of " + t.max + " regions simultaneously. Remove a region first to add another.").send() : t.zones.includes(e) || (t.zones.push(e),
                                t.changePlaces(t.zones))
                        }
                        ,
                        this.toggleMenu = function (e) {
                            "close" === e ? t.menu.classList.remove("open") : t.menu.classList.add("open")
                        }
                        ,
                        this.renderMenu = function () {
                            let e = t.getCurrentConfig();
                            t.menu.innerHTML = "";
                            let n = t.getActivePlaces()
                                , i = (ge("h2", {
                                    parent: t.menu,
                                    textId: "coronalytics"
                                }),
                                    []);
                            t.allPlaces.forEach(function (e) {
                                if (e.invisible)
                                    return;
                                let n = t.zones.indexOf(e.id) > -1;
                                !e.nonaffected && e.infected || (n = !0);
                                let a = {
                                    id: e.id,
                                    disabled: n,
                                    value: e.name,
                                    desc: e.isSub ? t.countries.name(e.country) : ""
                                };
                                i.push(a)
                            }),
                                new O({
                                    label: ge("label", "coronalytics-search", {
                                        parent: t.menu
                                    }),
                                    placeholder: Z(),
                                    options: i,
                                    callback: t.addPlace
                                }),
                                ge("div", "coronalytics-menu-collapse", {
                                    click: function () {
                                        t.toggleMenu("close")
                                    },
                                    parent: t.menu
                                });
                            let a = ge("div", "coronalytics-regions", {
                                parent: t.menu
                            });
                            n.forEach(function (e, i) {
                                let o = ge("div", "coronalytics-region", {
                                    parent: a,
                                    background: e.color,
                                    click: function (i) {
                                        let a = i.target.tagName;
                                        if ("I" === a) {
                                            if (n.length < 2)
                                                return;
                                            o.classList.add("fade"),
                                                setTimeout(function () {
                                                    t.spliceZone(e.id)
                                                }, 400)
                                        } else
                                            "A" !== a && o.classList.toggle("open")
                                    }
                                })
                                    , r = ge("div", "coronalytics-region-top-row", {
                                        parent: o
                                    })
                                    , s = ge("div", "coronalytics-region-identity", {
                                        parent: r
                                    });
                                ge("i", ["feather", "feather-x", n.length < 2 ? "disabled" : "notdisabled"], {
                                    parent: s
                                });
                                let l = ge("span", "coronalytics-region-title", {
                                    parent: s,
                                    text: e.name
                                });
                                ge("img", {
                                    parent: l,
                                    src: t.countries.flag(e.country || e.id, e.state)
                                });
                                let c = e.country || e.id
                                    , d = t.countries.source(c)
                                    , u = (e.isSub ? t.countries.name(c) : e.name,
                                        ge("div", "coronalytics-place-details", {
                                            parent: o
                                        }))
                                    , p = ge("div", "coronalytics-source-lastupdate", {
                                        parent: u
                                    });
                                ge("div", "coronalytics-source-country", {
                                    parent: u,
                                    text: t.countries.name(e.country)
                                });
                                let m = ge("span", "coronalytics-source", {
                                    parent: u
                                });
                                new ie(p, e.lastUpdated),
                                    d.forEach(function (e, t) {
                                        if (!e.n || !e.l)
                                            return;
                                        let n = ge("a", null, {
                                            text: e.n,
                                            target: "_blank",
                                            href: e.l,
                                            parent: m
                                        });
                                        t > 0 && n.classList.add("separated")
                                    }),
                                    ge("span", "coronalytics-sources-note", {
                                        parent: u,
                                        html: le(c)
                                    }),
                                    ge("button", "coronalytics-sources-goto", {
                                        parent: u,
                                        textId: "regionDetails",
                                        click: function () {
                                            if (window.innerWidth < 991)
                                                window.open(window.location.origin + "/tracking/" + J(e.name), "_blank");
                                            else {
                                                let t = new Q;
                                                t.render(),
                                                    y.change("map"),
                                                    h.setParam({
                                                        selected: e.id
                                                    }),
                                                    setTimeout(function () {
                                                        t.remove()
                                                    }, 1e3)
                                            }
                                        }
                                    })
                            });
                            let o = ge("div", "coronalytics-sources", {
                                parent: t.menu,
                                click: function (e) {
                                    e.target === e.currentTarget && t.menu.classList.toggle("open")
                                }
                            });
                            t.isOld && e.oldDisclaimer && ge("div", {
                                parent: o,
                                text: "*Before February 1st, data may be incomplete or unavailable."
                            })
                        }
                        ,
                        this.makeLabels = function () {
                            let e = t.getCurrentConfig()
                                , n = []
                                , i = JSON.parse(JSON.stringify(t.getActivePlaces()));
                            return i.sort(function (e, t) {
                                return e.history.length - t.history.length
                            }),
                                i.reverse(),
                                i[0].history.forEach(function (i, a) {
                                    let o = "";
                                    o = t.alignToStart && e.alignToStart ? A("day") + " " + (a + 1) : moment(i.day, "YYYYMMDD").format("MMM DD");
                                    let r = i.day.includes("202001");
                                    r && (t.isOld = !0,
                                        o += "*"),
                                        n.push(o)
                                }),
                                n
                        }
                        ,
                        this.renderLineChart = function (e) {
                            let n = t.makeLabels()
                                , i = []
                                , a = t.getCurrentConfig().value;
                            t.getActivePlaces().forEach(function (e, o) {
                                let r = [];
                                if (e.history.forEach(function (e, t) {
                                    r.push(e[a])
                                }),
                                    !t.alignToStart) {
                                    let t = n.length - e.history.length;
                                    if (t > 0)
                                        for (let e = 0; e < t; e++)
                                            r.unshift(0)
                                }
                                i.push({
                                    numbers: r,
                                    bg: e.bg,
                                    color: e.color,
                                    id: e.id,
                                    name: e.name
                                })
                            }),
                                S(e.parentNode, 0, 0, !0),
                                new N({
                                    type: "line",
                                    canvas: e,
                                    datasets: i,
                                    labels: n,
                                    axisXNames: !0,
                                    axisYNames: !0,
                                    isLogarithmic: t.logarithmic,
                                    customTooltip: function (e) {
                                        new W(this, e, i, n, t.getCurrentConfig().number)
                                    }
                                })
                        }
                        ,
                        this.renderBarChart = function (e) {
                            let n = t.makeLabels()
                                , i = [];
                            t.getActivePlaces().forEach(function (e, t) {
                                let a = [];
                                e.history.forEach(function (t, n) {
                                    a.push(t.infected - (e && e.history[n - 1] ? e.history[n - 1].infected : 0))
                                });
                                let o = n.length - e.history.length;
                                if (o > 0)
                                    for (let e = 0; e < o; e++)
                                        a.unshift(0);
                                i.push({
                                    numbers: a,
                                    bg: e.bg,
                                    color: e.color,
                                    name: e.name,
                                    id: e.id
                                })
                            });
                            let a = 1.5 * i[0].numbers.length;
                            t.stacked || (n = n.slice(n.length - 5, n.length),
                                i.forEach(function (e) {
                                    e.numbers = e.numbers.slice(e.numbers.length - 5, e.numbers.length)
                                })),
                                S(e.parentNode, a, 0, !0),
                                new N({
                                    type: "bar",
                                    canvas: e,
                                    labels: n,
                                    datasets: i,
                                    axisYNames: !0,
                                    axisXNames: !0,
                                    stacked: t.stacked,
                                    customTooltip: function (e) {
                                        new W(this, e, i, n, "plus")
                                    }
                                })
                        }
                        ,
                        this.renderRadarChart = async function (e) {
                            let n = await u.getPlaces()
                                , i = ["infected", "dead", "fatalityRate", "casesPerMillion", "deathsPerMillion"]
                                , a = [A(i[0]), A(i[1]), A(i[2]), A(i[3]), A(i[4])]
                                , o = []
                                , r = []
                                , s = [];
                            i.forEach(function (e) {
                                let t = re(e, "number");
                                s.push(t);
                                let i = JSON.parse(JSON.stringify(n));
                                i.sort(R(e)),
                                    i.reverse(),
                                    r.push(i[0][e])
                            }),
                                t.getActivePlaces().forEach(function (e) {
                                    let t = e.history[e.history.length - 1]
                                        , n = [];
                                    i.forEach(function (e) {
                                        let i = t[e] || 0;
                                        n.push(i)
                                    }),
                                        o.push({
                                            alwaysDisplay: !0,
                                            numberTypes: s,
                                            numbers: [],
                                            real: n,
                                            bg: e.bg,
                                            color: e.color,
                                            name: e.name
                                        })
                                }),
                                o.forEach(function (e) {
                                    e.real.forEach(function (t, n) {
                                        let i = function (e, t) {
                                            let n = Math.cbrt(e)
                                                , i = Math.cbrt(t);
                                            return (n - 0) / (i - 0)
                                        }(t, r[n]);
                                        e.numbers.push(i)
                                    })
                                }),
                                S(e.parentNode, 0, 0, !0),
                                new N({
                                    type: "radar",
                                    datasets: o,
                                    labels: a,
                                    isLogarithmic: !0,
                                    canvas: e,
                                    customTooltip: function (e) {
                                        new W(this, e, o, a, t.getCurrentConfig().number)
                                    }
                                })
                        }
                        ,
                        this.renderPieChart = function (e) {
                            let n = []
                                , i = [{
                                    numbers: [],
                                    bg: [],
                                    color: [],
                                    labels: []
                                }];
                            t.getActivePlaces().forEach(function (e) {
                                let t = e.history[e.history.length - 1];
                                i[0].numbers.push(t.infected),
                                    i[0].color.push(e.color),
                                    i[0].bg.push(e.bg),
                                    n.push(e.name),
                                    i[0].labels.push(e.name)
                            }),
                                new N({
                                    type: "doughnut",
                                    datasets: i,
                                    labels: n,
                                    canvas: e,
                                    customTooltip: function (e) {
                                        new W(this, e, i, n, t.getCurrentConfig().numberType)
                                    }
                                })
                        }
                        ,
                        this.renderTopRow = function () {
                            t.topRow.innerHTML = "";
                            let e = t.getCurrentConfig()
                                , n = ge("span", "coronalytics-chart-type", {
                                    parent: t.topRow,
                                    click: function () {
                                        new G({
                                            node: n,
                                            callback: t.changeMode,
                                            options: t.typeOptions,
                                            title: A("analytics")
                                        })
                                    }
                                });
                            ge("i", e.icon, {
                                parent: n
                            }),
                                ge("span", {
                                    parent: n,
                                    text: e.name
                                }),
                                t.options = ge("div", "compare-page-options-row", {
                                    parent: t.topRow
                                }),
                                t.renderOptions()
                        }
                        ,
                        this.resetPlaces = function () {
                            t.changePlaces()
                        }
                        ,
                        this.renderChart = function () {
                            t.chart.innerHTML = "";
                            let e = ge("canvas", {
                                parent: t.chart
                            })
                                , n = t.getCurrentConfig();
                            n.render(e, n.value)
                        }
                        ,
                        this.downloadAll = async function () {
                            let e = [];
                            t.zones.forEach(function (n) {
                                let i = t.places.find(e => e.id === n);
                                if (i)
                                    return;
                                let a = u.getHistory(n, !0).then(function (e) {
                                    let n = JSON.parse(JSON.stringify(e));
                                    t.places.push(n)
                                });
                                e.push(a)
                            }),
                                e.length < 1 || await Promise.all(e)
                        }
                        ,
                        this.getCurrentConfig = function () {
                            let e = t.typeOptions.find(e => e.value === t.chartId) || t.typeOptions[0];
                            return e
                        }
                        ,
                        this.make = function () {
                            ye(".coronalytics").forEach(function (e) {
                                e.remove()
                            }),
                                t.element = ge("div", "coronalytics", {
                                    parent: t.container
                                }),
                                t.container = ge("div", "coronalytics-container", {
                                    parent: t.element
                                }),
                                t.menu = ge("div", "coronalytics-menu", {
                                    parent: t.container,
                                    touchstart: t.touchMenu,
                                    click: t.touchMenu
                                }),
                                t.chart = ge("div", "coronalytics-charts", {
                                    parent: t.container
                                }),
                                t.topRow = ge("div", "coronalytics-options", {
                                    parent: t.container
                                }),
                                t.bottomRow = ge("div", "coronalytics-footer", {
                                    parent: t.container
                                })
                        }
                        ,
                        this.touchMenu = function (e) {
                            t.menu.classList.contains("open") || e.target === e.currentTarget && t.toggleMenu("open")
                        }
                        ,
                        this.renderOptions = function () {
                            t.options.innerHTML = "";
                            let e = t.getCurrentConfig()
                                , n = [{
                                    textId: "startDay",
                                    value: "alignToStart"
                                }, {
                                    textId: "logarithmic",
                                    value: "logarithmic"
                                }, {
                                    textId: "stacked",
                                    value: "stacked"
                                }]
                                , i = function (e) {
                                    let n = !t[e];
                                    t[e] = n,
                                        t.render()
                                }
                                , a = []
                                , o = ge("div", "compare-page-options-row-desktop", {
                                    parent: t.options
                                });
                            n.forEach(function (n) {
                                n.name = A(n.textId),
                                    n.disabled = !e[n.value],
                                    n.color = "var(--primary)";
                                let r = n.disabled ? "disabled" : ""
                                    , s = ge("div", r, {
                                        parent: o
                                    })
                                    , l = de(11)
                                    , c = ge("input", {
                                        parent: s,
                                        type: "checkbox",
                                        id: l,
                                        change: function () {
                                            i(n.value)
                                        }
                                    });
                                t[n.value] && e[n.value] && (c.setAttribute("checked", "checked"),
                                    a.push(n.value)),
                                    ge("label", {
                                        parent: s,
                                        for: l,
                                        text: n.name
                                    })
                            });
                            let r = ge("div", "compare-page-options-row-mobile", {
                                parent: t.options,
                                click: function () {
                                    new G({
                                        node: r,
                                        value: a,
                                        callback: i,
                                        options: n
                                    })
                                }
                            });
                            ge("div", ["compare-page-options-row-mobile", "share"], {
                                parent: t.options,
                                click: $
                            })
                        }
                        ,
                        this.sort = function () {
                            t.places.sort(function (e, t) {
                                return t.history.length - e.history.length
                            })
                        }
                        ,
                        this.typeOptions = [{
                            value: "date",
                            icon: "fa fa-bullseye",
                            textId: "overview",
                            opacity: .03,
                            logarithmic: !1,
                            alignToStart: !1,
                            render: t.renderRadarChart
                        }, {
                            value: "infected",
                            oldDisclaimer: !0,
                            opacity: .03,
                            logarithmic: !0,
                            alignToStart: !0,
                            render: t.renderLineChart
                        }, {
                            value: "dead",
                            oldDisclaimer: !0,
                            opacity: .03,
                            logarithmic: !0,
                            alignToStart: !0,
                            render: t.renderLineChart
                        }, {
                            value: "infectedNew",
                            icon: "fa fa-bar-chart",
                            textId: "infectedNew",
                            opacity: 1,
                            stacked: !0,
                            oldDisclaimer: !0,
                            logarithmic: !1,
                            alignToStart: !1,
                            render: t.renderBarChart
                        }, {
                            value: "casesPerMillion",
                            oldDisclaimer: !0,
                            opacity: .03,
                            logarithmic: !0,
                            alignToStart: !0,
                            render: t.renderLineChart
                        }, {
                            value: "deathsPerMillion",
                            oldDisclaimer: !0,
                            opacity: .03,
                            logarithmic: !0,
                            alignToStart: !0,
                            render: t.renderLineChart
                        }, {
                            value: "fatalityRate",
                            oldDisclaimer: !0,
                            opacity: .03,
                            logarithmic: !0,
                            alignToStart: !0,
                            render: t.renderLineChart
                        }],
                        this.catchZones = async function () {
                            if (t.zones && t.zones.length > 0)
                                return void t.updateUrl();
                            let e = h.getParam("compared");
                            if (e) {
                                let n = e.split(",");
                                if (n && n.length > 0) {
                                    let e = !0;
                                    n.forEach(function (n) {
                                        let i = t.allPlaces.find(e => e.id === n);
                                        i || (e = !1)
                                    }),
                                        e && (t.zones = n.slice(0, t.max))
                                }
                            }
                            (!t.zones || t.zones.length < 1) && await t.autoGenerateZoneList(),
                                (!t.zones || t.zones.length < 1) && (t.zones = ["US", "DE", "FR", "GB", "ES"])
                        }
                        ,
                        this.autoGenerateZoneList = async function () {
                            let e = await (new ce).get() || {};
                            e && e.latitude && e.longitude && (t.zones = await new function (e) {
                                let t = this;
                                this.howmany = e.howmany,
                                    this.placeId = e.placeId,
                                    this.longitude = e.longitude || 0,
                                    this.latitude = e.latitude || 0,
                                    this.returnPlace = e.returnPlace || !1,
                                    this.place = {},
                                    this.places = [],
                                    this.closest = [],
                                    this.inCountry = null,
                                    this.download = async function () {
                                        let e = await u.getPlaces();
                                        t.places = JSON.parse(JSON.stringify(e)),
                                            t.place = t.places.find(e => e.id === t.placeId),
                                            t.longitude && t.latitude || (t.longitude = t.place.longitude,
                                                t.latitude = t.place.latitude,
                                                (t.place.isSub || 2 === t.placeId.length) && (t.inCountry = t.place.country))
                                    }
                                    ,
                                    this.make = function () {
                                        t.places.forEach(function (e) {
                                            if (e.invisible)
                                                return;
                                            if (!e.longitude)
                                                return;
                                            if (!e.latitude)
                                                return;
                                            if (t.placeId && 2 === t.placeId.length && t.placeId === e.id)
                                                return;
                                            if (t.placeId && e.id === t.placeId)
                                                return void (e.diff = 1e-8);
                                            if (t.placeId && t.inCountry && e.country !== t.inCountry)
                                                return;
                                            if (t.placeId && !t.inCountry && e.isSub)
                                                return;
                                            let n = 0;
                                            e.longitude > t.longitude ? n += e.longitude - t.longitude : n += t.longitude - e.longitude,
                                                e.latitude > t.latitude ? n += e.latitude - t.latitude : n += t.latitude - e.latitude,
                                                e.diff = n || 1e-9
                                        });
                                        let e = t.places.filter(e => e.diff > 0);
                                        e.sort(R("diff")),
                                            console.log(e);
                                        let n = e[0].isSub;
                                        e.forEach(function (i, a) {
                                            if (n && (!i.isSub || i.country !== e[0].country))
                                                return;
                                            if (!n && i.isSub)
                                                return;
                                            if (t.closest.length > t.howmany - 1)
                                                return;
                                            let o = t.returnPlace ? i : i.id;
                                            t.closest.push(o)
                                        })
                                    }
                                    ,
                                    this.get = async function () {
                                        try {
                                            return await t.download(),
                                                t.make(),
                                                t.closest
                                        } catch (e) {
                                            return console.log(e),
                                                null
                                        }
                                    }
                            }
                                ({
                                    howmany: 5,
                                    longitude: e.longitude,
                                    latitude: e.latitude
                                }).get())
                        }
                        ,
                        this.makeTitle = function (e) {
                            if (!e)
                                return null;
                            let n = [];
                            e.forEach(function (i, a) {
                                if (a > 2)
                                    return;
                                let o = t.allPlaces.find(e => e.id === i);
                                o && (n.push(o.country),
                                    n.push(o.name),
                                    e[a + 1] && n.push(t.separator))
                            });
                            let i = e.length - 2 - 1;
                            return i > 0 && n.push(i),
                                n
                        }
                        ,
                        this.makeTypeOptions = function () {
                            t.typeOptions.forEach(function (e) {
                                e.name = e.textId ? A(e.textId) : re(e.value, "textId"),
                                    e.icon = e.icon || re(e.value, "icon"),
                                    e.number = re(e.value, "number")
                            })
                        }
                        ,
                        this.init = async function () {
                            let e = new Q;
                            e.render();
                            try {
                                t.allPlaces = await u.getPlaces(),
                                    t.makeTypeOptions(),
                                    await t.catchZones(),
                                    t.zones && (await t.downloadAll(),
                                        t.sort()),
                                    t.make(),
                                    t.render(),
                                    e.remove(),
                                    t.updateUrl()
                            } catch (t) {
                                console.log(t),
                                    h.setParam({
                                        compared: null
                                    }),
                                    e.remove()
                            }
                        }
                        ,
                        this.init()
                }
            }
        }, {
            id: "api",
            render: function (e) {
                new function (e) {
                    let t = this;
                    this.element = null,
                        this.modal = null,
                        this.selector = e,
                        this.whyfree = "https://www.notion.so/coronavirus/Why-isn-t-the-Coronavirus-API-free-3791a3a37260471c9c54549fb9947893",
                        this.documentation = "https://www.notion.so/coronavirus/Covid-19-Coronavirus-API-d1ce9d47e64c473bbc9a034661477e84",
                        this.stripe = null,
                        this.stripeElements = null,
                        this.stripeCard = null,
                        this.stripeCardDomId = de(11),
                        this.stripeSecret = null,
                        this.stripeApiKey = function () {
                            if (window.location.origin.includes("127.0.0.1:5000"))
                                return !1;
                            return !0
                        }() ? "pk_live_baP4x9rE9AGm40NSo85L2p0A" : "pk_test_nZRBu6VLHdPXpChQYHf5aLAw",
                        this.products = [{
                            id: "100k",
                            name: "100K requests",
                            price: 299
                        }, {
                            id: "1m",
                            name: "1M requests",
                            price: 499
                        }, {
                            id: "5m",
                            name: "5M requests",
                            price: 999
                        }],
                        this.explanation = "The number of API requests included in your plan. 1 request = 1 GET to any of our endpoints with your API key. You can buy another API key or top up your existing key when you exceed the limit.",
                        this.email = "",
                        this.firstName = "",
                        this.lastName = "",
                        this.make = function () {
                            t.element = ge("section"),
                                t.element.classList.add("api-shop"),
                                be(t.selector).appendChild(t.element)
                        }
                        ,
                        this.currentChoice = t.products[0],
                        this.changeCurrentChoice = function (e) {
                            t.currentChoice = e
                        }
                        ,
                        this.appendStripe = function () {
                            let e = be("#" + t.domId);
                            e || ge("script", {
                                id: t.domId,
                                src: "https://js.stripe.com/v3/",
                                parent: be("body")
                            })
                        }
                        ,
                        this.initStripeElements = function () {
                            "undefined" != typeof Stripe && Stripe ? (t.stripe = Stripe(t.stripeApiKey),
                                t.stripeElements = t.stripe.elements(),
                                t.createBuyModal(),
                                t.createStripeElementsInstance()) : setTimeout(function () {
                                    t.initStripeElements()
                                }, 100)
                        }
                        ,
                        this.makePaymentIntent = async function () {
                            let e = await fe("POST", "/make-payment-intent", {
                                productId: t.currentChoice.id
                            });
                            t.stripeSecret = e.data
                        }
                        ,
                        this.openBuyModal = async function () {
                            t.loading = new Q,
                                t.loading.render(),
                                t.appendStripe(),
                                await t.makePaymentIntent(),
                                t.initStripeElements(),
                                t.loading.remove()
                        }
                        ,
                        this.displayStripeError = function (e) {
                            t.errors.innerHTML = "",
                                t.errors.textContent = e || ""
                        }
                        ,
                        this.getApiKey = async function () {
                            try {
                                let e = await fe("POST", "/confirm-payment", {
                                    payment: t.paymentId,
                                    email: t.email
                                });
                                if (!e || !e.data)
                                    throw "No api key";
                                t.key = e.data,
                                    t.showKeyModal()
                            } catch (e) {
                                t.displayStripeError("There was an unexpected issue generating your API key. Try again, but if it doesn't work, no worries, please contact us at hello@progressier.com and we'll fix the problem for you!")
                            }
                        }
                        ,
                        this.showKeyModal = async function () {
                            t.modal.remove(),
                                t.modal = null,
                                t.modal = ge("div", "backdrop", {
                                    parent: be("body")
                                });
                            let e = ge("div", "api-shop-modal", {
                                parent: t.modal
                            })
                                , n = (ge("div", "api-shop-modal-title", {
                                    text: "Your API key",
                                    parent: e
                                }),
                                    ge("div", "api-shop-modal-desc", {
                                        parent: e,
                                        html: "We also sent your API key to <strong>" + t.email + '</strong>. <a href="mailto:hello@progressier.com" target="_blank">Tell us</a> what you\'re building  — we can probably help!'
                                    }),
                                    ge("code", ["api-shop-modal-code", "can-select"], {
                                        parent: e,
                                        text: t.key
                                    }),
                                    ge("div", "api-shop-modal-footer", {
                                        parent: e
                                    }));
                            ge("button", ["api-shop-modal-cancel", "secondary"], {
                                text: "Done",
                                click: t.destroyModal,
                                parent: n
                            }),
                                ge("button", ["api-shop-modal-validate", "primary"], {
                                    text: "View API Documentation",
                                    parent: n,
                                    click: function () {
                                        window.open(t.documentation, "_blank")
                                    }
                                })
                        }
                        ,
                        this.confirmPayment = async function (e) {
                            let n = e.target;
                            n.classList.add("loading");
                            let i = t.verifyForm();
                            if (i)
                                return t.displayStripeError(i),
                                    void n.classList.remove("loading");
                            if (!t.paymentId) {
                                let e = await t.stripe.confirmCardPayment(t.stripeSecret, {
                                    payment_method: {
                                        card: t.stripeCard,
                                        billing_details: {
                                            name: t.firstName + " " + t.lastName,
                                            email: t.email
                                        }
                                    }
                                });
                                if (e.error)
                                    return t.displayStripeError(e.error.message),
                                        void n.classList.remove("loading");
                                "succeeded" === e.paymentIntent.status && (t.paymentId = e.paymentIntent.id)
                            }
                            await t.getApiKey(),
                                n.classList.remove("loading")
                        }
                        ,
                        this.createStripeElementsInstance = function () {
                            t.stripeCard = t.stripeElements.create("card", {
                                style: {
                                    base: {
                                        iconColor: "#c4f0ff",
                                        color: "#36363c",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        fontSmoothing: "antialiased",
                                        ":-webkit-autofill": {
                                            color: "#999"
                                        },
                                        "::placeholder": {
                                            color: "#999"
                                        },
                                        iconColor: "#999"
                                    },
                                    invalid: {
                                        iconColor: "#FF416C",
                                        color: "#FF416C"
                                    }
                                }
                            }),
                                t.stripeCard.mount("#" + t.stripeCardDomId),
                                t.stripeCard.addEventListener("change", function (e) {
                                    t.displayStripeError(e.message)
                                })
                        }
                        ,
                        this.verifyForm = function () {
                            t.email;
                            let e = new function (e) {
                                this.email = e,
                                    this.valid = function () {
                                        let t = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(e);
                                        if (!t)
                                            return !1;
                                        let n = /[%<>?&*^\]\[\/#\{\}\\~;]/.test(e);
                                        return !n
                                    }
                            }
                                (t.email).valid();
                            return t.email && e ? t.firstName ? t.lastName ? void 0 : "You must enter a valid last name" : "You must enter a valid first name" : "You must enter a valid email"
                        }
                        ,
                        this.updateForm = function (e, n) {
                            t[e] = n
                        }
                        ,
                        this.createBuyModal = function () {
                            t.modal = ge("div", "backdrop", {
                                parent: be("body")
                            });
                            let e = ge("div", "api-shop-modal", {
                                parent: t.modal
                            })
                                , n = (ge("div", "api-shop-modal-title", {
                                    parent: e,
                                    text: "Buy an API key (" + t.currentChoice.name + ")"
                                }),
                                    ge("img", "api-shop-modal-powered", {
                                        parent: e,
                                        src: window.location.origin + "/assets/img/powered_by_stripe.png"
                                    }),
                                    ge("div", "api-shop-modal-form", {
                                        parent: e
                                    }))
                                , i = ge("div", "api-shop-modal-row", {
                                    parent: n
                                })
                                , o = (ge("input", "api-shop-modal-first-name", {
                                    parent: i,
                                    type: "text",
                                    placeholder: "First name",
                                    input: function (e) {
                                        t.updateForm("firstName", e.target.value)
                                    }
                                }),
                                    ge("input", "api-shop-modal-last-name", {
                                        parent: i,
                                        type: "text",
                                        placeholder: "Last name",
                                        input: function (e) {
                                            t.updateForm("lastName", e.target.value)
                                        }
                                    }),
                                    ge("div", "api-shop-modal-row", {
                                        parent: n
                                    }));
                            ge("input", "api-shop-modal-email", {
                                parent: o,
                                type: "text",
                                placeholder: "Email",
                                input: function (e) {
                                    t.updateForm("email", e.target.value)
                                }
                            }),
                                ge("div", "api-shop-container", {
                                    id: t.stripeCardDomId,
                                    parent: n
                                });
                            t.errors = ge("div", "api-shop-error", {
                                parent: e
                            });
                            ge("div", "api-shop-disclaimer", {
                                parent: e,
                                html: 'By purchasing access to our API, you agree to our <a href="' + r + '" target="_blank">Terms</a> and <a href="' + a + '" target="_blank">Privacy Policy</a>'
                            });
                            let s = ge("div", "api-shop-modal-footer", {
                                parent: e
                            });
                            ge("button", ["api-shop-modal-cancel", "secondary"], {
                                parent: s,
                                text: "Cancel",
                                click: t.destroyModal
                            });
                            t.pay = ge("button", ["api-shop-modal-validate", "primary"], {
                                parent: s,
                                text: "Pay $" + t.currentChoice.price,
                                click: t.confirmPayment
                            })
                        }
                        ,
                        this.destroyModal = function () {
                            t.paymentId = null,
                                t.stripeSecret = null,
                                t.modal.remove()
                        }
                        ,
                        this.render = function () {
                            t.element.innerHTML = "";
                            let e = ge("div", "api-shop-inner", {
                                parent: t.element
                            })
                                , n = (ge("div", "api-shop-title", {
                                    parent: e,
                                    text: "The Coronavirus API"
                                }),
                                    ge("div", "api-shop-content", {
                                        parent: e
                                    }))
                                , i = (ge("span", {
                                    parent: n,
                                    text: "This API enables you to retrieve the toll of the coronavirus in real-time. It's the very same API we're using on this website. Buy an API key now to get started."
                                }),
                                    ge("a", "api-shop-link", {
                                        parent: n,
                                        target: "_blank",
                                        href: t.whyfree,
                                        text: "Why isn't this free?"
                                    }),
                                    ge("div", "api-shop-products", {
                                        parent: e
                                    }));
                            t.products.forEach(function (e) {
                                let n = ge("div", "api-shop-product", {
                                    parent: i
                                })
                                    , a = ge("input", {
                                        parent: n,
                                        name: "apiShopChoices",
                                        id: e.id,
                                        type: "radio",
                                        value: e.id,
                                        change: function () {
                                            t.changeCurrentChoice(e)
                                        }
                                    });
                                e.id === t.currentChoice.id && a.setAttribute("checked", !0);
                                let o = ge("label", {
                                    parent: n,
                                    text: e.name + "- $" + e.price,
                                    for: e.id
                                });
                                new ee(o, t.explanation)
                            });
                            let a = ge("div", "api-shop-buttons", {
                                parent: e
                            });
                            ge("button", ["api-shop-button", "primary"], {
                                parent: a,
                                text: "Get access now",
                                click: t.openBuyModal
                            }),
                                ge("button", ["api-shop-button", "secondary"], {
                                    parent: a,
                                    text: "View API Documentation",
                                    click: function () {
                                        window.open(t.documentation, "_blank")
                                    }
                                })
                        }
                        ,
                        this.changePageTitle = function () {
                            Y({
                                title: "Coronavirus API | Get access to COVID-19 data",
                                description: "With the Coronavirus COVID-19 API, you get access to extensive historical data collected from the start of the epidemic in over 700 individual regions and countries."
                            })
                        }
                        ,
                        this.init = function () {
                            t.changePageTitle(),
                                t.make(),
                                t.render()
                        }
                        ,
                        this.init()
                }
                    (e)
            }
        }],
        this.current = h.get() || "map",
        this.change = function (t, n) {
            e.current = t,
                e.content = null,
                h.replace([e.current]),
                h.setParam({
                    compared: null
                }),
                n || v.rerender()
        }
        ,
        this.getCurrent = function () {
            let t = e.sections.find(t => t.id === e.current);
            return t || (t = e.sections[0]),
                be("body").setAttribute("data-current-view", t.id),
                t
        }
        ,
        h.getParam("embed") ? be("body").classList.add("is-embedded") : be("body").classList.remove("is-embedded"),
        window.addEventListener("popstate", function (e) {
            e && e.state && e.state.page && (h.setUrl(e.state.page),
                new function () {
                    y = new H,
                        v = new U
                }
            )
        }),
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && be("body").classList.add("is-ios")
}
function U() {
    let e = this;
    this.element = null,
        this.headerSelector = "header",
        this.mainSelector = "#mainContainer",
        this.footerSelector = "footer",
        this.sidebar = new function (e) {
            let t = this;
            this.selector = e,
                this.element = null,
                this.sections = y.sections,
                this.container = be(t.selector),
                this.hamburger = null,
                this.inner = null,
                this.settings = null,
                this.sourcesPopup = function () {
                    window.open("https://www.notion.so/coronavirus/What-are-your-sources-4f3f962953f1418da96eae1b5fe06039", "_target")
                }
                ,
                this.embedPopup = function () {
                    y.change("map");
                    let e = window.location.href.includes("?") ? window.location.href + "&embed=true" : window.location.href + "?embed=true"
                        , t = be("body")
                        , n = ge("div", "backdrop", {
                            parent: t,
                            click: function (e) {
                                e.target === e.currentTarget && n.remove()
                            }
                        })
                        , i = ge("div", "Global-Embed-Popup", {
                            parent: n
                        });
                    ge("div", {
                        textId: "embed",
                        parent: i
                    }),
                        ge("code", {
                            parent: i,
                            text: '<iframe style="width:100%"; width="560" height="380" src="' + e + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                        })
                }
                ,
                this.launchRegionsSearch = function () {
                    new j({
                        node: be("body"),
                        autofocus: !1
                    })
                }
                ,
                this.openForm = function () {
                    window.open(s, "_blank")
                }
                ,
                this.openDocumentation = function () {
                    window.open("https://www.notion.so/coronavirus/Coronavirus-app-Documentation-d1ce9d47e64c473bbc9a034661477e84", "_blank")
                }
                ,
                this.openMailTo = function () {
                    window.open("mailto:hello@progressier.com", "_blank")
                }
                ,
                this.currentSection = function () {
                    return y.current || "map"
                }
                ,
                this.toggleMenu = function () {
                    t.container.classList.toggle("open")
                }
                ,
                this.make = function () {
                    g.embedded || (t.container.addEventListener("click", function (e) {
                        e.target === e.currentTarget && t.toggleMenu()
                    }),
                        t.container.innerHTML = "",
                        t.hamburger = ge("i", ["feather", "feather-menu", "header-hamburger"], {
                            parent: t.container,
                            "data-new": A("new"),
                            click: t.toggleMenu
                        }),
                        t.element = ge("div", "header-inner", {
                            parent: t.container
                        }))
                }
                ,
                this.renderSettings = function () {
                    t.settings = ge("div", "header-settings", {
                        parent: t.element
                    }),
                        ge("div", "header-settings-title", {
                            textId: "preferences",
                            parent: t.settings
                        });
                    let e = [{
                        name: function () {
                            return A("darkMode")
                        },
                        content: function (e) {
                            new function (e) {
                                let t = this;
                                this.container = e,
                                    this.body = be("body"),
                                    this.className = "dark",
                                    this.cookieName = "darkmode",
                                    this.element = null,
                                    this.cookies = new ue,
                                    this.id = de(11),
                                    this.on = !1,
                                    this.toggle = function (e) {
                                        e ? (t.on = !0,
                                            t.body.classList.add(t.className),
                                            t.setCookie("on")) : (t.on = !1,
                                                t.body.classList.remove(t.className),
                                                t.setCookie("off"))
                                    }
                                    ,
                                    this.getCookie = function () {
                                        let e = t.cookies.get(t.cookieName);
                                        "on" === e && t.toggle(!0)
                                    }
                                    ,
                                    this.setCookie = function (e) {
                                        t.cookies.set(t.cookieName, e, 9999)
                                    }
                                    ,
                                    this.make = function () {
                                        t.element = ge("div"),
                                            t.element.classList.add("dark-mode-toggle"),
                                            t.container.appendChild(t.element)
                                    }
                                    ,
                                    this.render = function () {
                                        t.element.innerHTML = "";
                                        let e = ge("input", {
                                            parent: t.element,
                                            type: "checkbox",
                                            id: t.id,
                                            change: function (e) {
                                                t.toggle(e.target.checked),
                                                    v.rerender()
                                            }
                                        });
                                        t.on && e.setAttribute("checked", "checked"),
                                            ge("label", {
                                                parent: t.element,
                                                for: t.id
                                            })
                                    }
                                    ,
                                    this.init = function () {
                                        t.getCookie(),
                                            t.make(),
                                            t.render()
                                    }
                                    ,
                                    this.init()
                            }
                                (e)
                        }
                    }, {
                        name: function () {
                            return A("language")
                        },
                        content: function (e) {
                            t.renderLanguage(e)
                        }
                    }, {
                        name: function () {
                            return A("charts")
                        },
                        content: function (e) {
                            (new B).picker(e)
                        }
                    }, {
                        name: function () {
                            return A("flags")
                        },
                        content: function (e) {
                            (new F).picker(e)
                        }
                    }];
                    e.forEach(function (e) {
                        let n = ge("div", "header-settings-el", {
                            parent: t.settings
                        });
                        ge("div", "header-settings-el-title", {
                            text: e.name(),
                            parent: n
                        });
                        let i = ge("div", "header-settings-el-content", {
                            parent: n
                        });
                        e.content(i)
                    })
                }
                ,
                this.renderLanguage = function (e) {
                    let t = ge("div", "language-selector", {
                        parent: e
                    });
                    p.selector(t)
                }
                ,
                this.renderMenu = function () {
                    if (g.embedded)
                        return;
                    ge("div", "header-logo", {
                        text: "The Coronavirus App",
                        parent: t.element,
                        click: function () {
                            window.location.href = window.location.origin
                        }
                    }),
                        ge("div", "header-powered", {
                            html: 'powered by <a href="https://progressier.com" target="_blank"><img style="width:100px" src="https://progressier.com/assets/img/logo-full.svg" /></a>',
                            parent: t.element
                        }),
                        t.inner = ge("div", "header-sections", {
                            parent: t.element
                        });
                    let e = t.currentSection()
                        , n = ["map", "toll", "taiwan", "korea", "api", "analytics"];
                    t.menu.forEach(function (i, a) {
                        if (i.onlyIf && "function" == typeof i.onlyIf && !i.onlyIf())
                            return;
                        let o = ge("div", "header-section");
                        (i.id && i.id === e || !n.includes(e) && "map" === i.id) && o.classList.add("active"),
                            i.last && o.setAttribute("data-new", A("new")),
                            t.inner.appendChild(o),
                            o.addEventListener("click", function () {
                                t.toggleMenu(),
                                    i.fn(i.id)
                            }),
                            ge("i", i.icon, {
                                parent: o
                            }),
                            ge("div", {
                                textId: i.textId,
                                parent: o
                            })
                    })
                }
                ,
                this.render = function () {
                    g.embedded || (t.element.innerHTML = "",
                        t.renderMenu(),
                        t.renderDonate(),
                        t.renderSettings(),
                        t.renderLanguageAttribution(),
                        t.renderDisclaimer())
                }
                ,
                this.renderDisclaimer = function () {
                    ge("div", "header-legalese", {
                        parent: t.element,
                        html: '<span>© 2020 Scriby, Inc. All Rights Reserved. <br> <a target="_blank" href="' + r + '">Terms</a> | <a target="_blank" href="' + a + '">Privacy</a> | <a target="_blank" href="' + o + '">Cookie Policy</a>'
                    })
                }
                ,
                // TODO: Get rid of this
                this.renderDonate = function () {
                    ge("button", "donate-btn", {
                        parent: t.element,
                        html: '<img src="' + d + '" />' + A("buyCoffee"),
                        click: function () {
                            window.open(l, "_blank")
                        }
                    })
                }
                ,
                this.renderLanguageAttribution = function () {
                    let e = p.getAttribution();
                    e && ge("div", "header-language-attribution", {
                        text: e,
                        parent: t.element
                    })
                }
                ,
                this.init = function () {
                    g.embedded || (t.make(),
                        t.render())
                }
                ,
                this.isMobile = function () {
                    return window.innerWidth < 991
                }
                ,
                this.changeView = function (e) {
                    (new V).set(null),
                        y.change(e)
                }
                ,
                this.openBlog = function () {
                    window.open("https://medium.com/@kevinbasset", "_blank")
                }
                ,
                this.menu = [{
                    icon: ["fa", "fa-map-marker"],
                    id: "map",
                    textId: "map",
                    fn: t.changeView
                }, {
                    icon: ["fa", "fa-area-chart"],
                    id: "analytics",
                    textId: "coronalytics",
                    fn: t.changeView
                }, {
                    icon: ["fa", "fa-list"],
                    textId: "countries",
                    onlyIf: t.isMobile,
                    fn: t.launchRegionsSearch
                }, {
                    icon: ["feather", "feather-mask"],
                    id: "taiwan",
                    textId: "masks",
                    onlyIf: y.showTW,
                    fn: t.changeView
                }, {
                    icon: ["feather", "feather-book"],
                    textId: "blog",
                    fn: t.openBlog,
                    last: !0
                }, {
                    icon: ["fa", "fa-bolt"],
                    id: "api",
                    textId: "api",
                    fn: t.changeView
                }, {
                    icon: ["fa", "fa-code"],
                    textId: "embed",
                    fn: t.embedPopup
                }, {
                    icon: ["fa", "fa-flag"],
                    textId: "addMissingRegion",
                    fn: t.openForm
                }, {
                    icon: ["feather", "feather-align-left"],
                    textId: "documentation",
                    fn: t.openDocumentation
                }, {
                    icon: ["fa", "fa-at"],
                    textId: "contactUs",
                    fn: t.openMailTo
                }, {
                    icon: ["feather", "feather-plus-circle"],
                    id: "pwa",
                    textId: "installTheApp",
                    fn: async function () {
                        try {
                            await progressier.install()
                        } catch (e) {
                            console.log(e),
                                new ne("error", "The app may already be installed or your browser may not support this function").send()
                        }
                    }
                }],
                this.init()
        }
            (e.headerSelector),
        this.main = new function (e) {
            let t = this;
            this.selector = e,
                this.footer = null,
                this.init = function () {
                    be(t.selector).innerHTML = "";
                    let n = y.getCurrent();
                    n && (n.render(e),
                        window.innerWidth < 991 && (t.topbar = new function (e) {
                            let t = this;
                            this.selector = e,
                                this.embedded = g.embedded,
                                this.body = be("body"),
                                this.container = be(t.selector),
                                this.countries = new he,
                                this.disallowed = ["api", "analytics"],
                                this.allowFilter = ["taiwan", "map", "toll", "tracking"],
                                this.element = null,
                                this.make = function () {
                                    t.element = ge("div", "app-top-bar", {
                                        parent: t.container
                                    })
                                }
                                ,
                                this.launchRegionsSearch = function () {
                                    new j({
                                        node: t.body,
                                        autofocus: !0
                                    })
                                }
                                ,
                                this.launchFilterSelection = function (e) {
                                    let n = []
                                        , i = "taiwan" === y.current ? g.masks : g.config;
                                    for (let e in i)
                                        n.push({
                                            color: i[e].color,
                                            bg: i[e].bg,
                                            name: i[e].name(),
                                            value: e
                                        });
                                    new G({
                                        node: e.target,
                                        callback: t.changeMode,
                                        options: n,
                                        title: A("filterMap")
                                    })
                                }
                                ,
                                this.changeMode = function (e) {
                                    h.setParam({
                                        mode: e
                                    }),
                                        v.rerender()
                                }
                                ,
                                this.getQuery = function () {
                                    return h.getParam("query")
                                }
                                ,
                                this.viewGlobal = function (e) {
                                    h.setParam({
                                        selected: null
                                    }),
                                        (new V).set(null),
                                        v && v.main && v.main.drawer && setTimeout(function () {
                                            v.main.drawer.render(),
                                                v.main.drawer.open()
                                        }, 200)
                                }
                                ,
                                this.render = function () {
                                    t.element.innerHTML = "";
                                    let e = ge("div", "app-top-bar-inner", {
                                        parent: t.element
                                    });
                                    ge("div", "app-top-bar-search", {
                                        parent: e,
                                        "data-placeholder": Z(),
                                        click: t.launchRegionsSearch
                                    }),
                                        ge("div", "app-top-bar-search-shortcut", {
                                            parent: e
                                        }),
                                        ge("div", "app-top-bar-back-world", {
                                            textId: "world",
                                            parent: e,
                                            click: t.viewGlobal
                                        })
                                }
                                ,
                                this.init = function () {
                                    t.disallowed.includes(y.current) || t.embedded || (t.make(),
                                        t.render())
                                }
                                ,
                                this.init()
                        }
                            (t.selector)),
                        t.drawer = new D("body"))
                }
                ,
                this.init()
        }
            (e.mainSelector),
        this.cta = new function () {
            let e = this;
            e.element = null,
                this.onShare = function () {
                    window.open("https://progressier.com", "_blank")
                }
                ,
                this.init = function () {
                    e.element = ge("div", "action-buttons", {
                        parent: be("body")
                    }),
                        ge("button", "action-buttons-share", {
                            html: 'Powered by <a href="javascript:void(0)"> <img style="width:100px" src="https://progressier.com/assets/img/logo-full.svg" /></a>',
                            click: e.onShare,
                            parent: e.element
                        }),
                        // TODO: Get rid of this
                        ge("button", "action-buttons-donate", {
                            parent: e.element,
                            html: '<img src="' + d + '" />' + A("buyCoffee"),
                            click: function () {
                                window.open(l, "_blank")
                            }
                        })
                }
                ,
                this.init()
        }
        ,
        this.current = h.get(),
        this.rerender = function () {
            e.sidebar.render(),
                e.main.init()
        }
        ,
        this.autoCorrect = function () {
            let t = h.get()
                , n = y.sections.find(e => e.id === t);
            "tracking" === t && (n = !0),
                n || (h.replace(["map"]),
                    (new V).set(t),
                    e.current = "map")
        }
        ,
        this.autoCorrect()
}
function G(e) {
    let t = this;
    this.node = e.node,
        this.callback = e.callback,
        this.options = e.options,
        this.value = e.value,
        this.multiple = e.multiple,
        this.title = e.title,
        this.element = null,
        this.onClick = function (e) {
            t.remove(),
                t.send(e)
        }
        ,
        this.send = function (e) {
            t.callback(e)
        }
        ,
        this.animate = function () {
            t.inner.classList.add("showing")
        }
        ,
        this.remove = function () {
            t.inner.classList.remove("showing"),
                setTimeout(function () {
                    t.element.remove()
                }, 300)
        }
        ,
        this.isSelected = function (e) {
            if (!t.value)
                return !1;
            if ("string" == typeof t.value) {
                if (e === t.value)
                    return !0
            } else if ("object" == typeof t.value && t.value.includes(e))
                return !0;
            return !1
        }
        ,
        this.init = function () {
            let e = be("body");
            if (t.element = ge("div", "type-filter-backdrop", {
                parent: e,
                click: function (e) {
                    e.target === e.currentTarget && t.remove()
                }
            }),
                setTimeout(t.animate, 200),
                t.inner = ge("div", "type-filter", {
                    parent: t.element
                }),
                t.multiple && t.inner.classList.add("multiple"),
                t.title)
                ge("div", "type-filter-title", {
                    text: t.title,
                    parent: t.inner
                });
            ge("div", "type-filter-close", {
                parent: t.inner,
                click: t.remove
            });
            t.options.forEach(function (e) {
                let n = t.isSelected(e.value)
                    , i = ge("div", "type-filter-el", {
                        parent: t.inner,
                        click: function () {
                            t.onClick(e.value)
                        }
                    });
                if (e.disabled && i.classList.add("disabled"),
                    n && i.classList.add("selected"),
                    e.color) {
                    let t = ge("div", "type-filter-color", {
                        parent: i
                    });
                    t.style.background = n ? e.color : e.bg,
                        t.style.border = "2px solid " + e.color
                }
                e.icon && ge("div", "type-filter-icon", {
                    parent: i,
                    classes: e.icon.split(" ")
                }),
                    e.img && ge("img", "type-filter-img", {
                        parent: i,
                        src: e.img
                    }),
                    e.name && ge("div", "type-filter-name", {
                        parent: i,
                        text: "function" == typeof e.name ? e.name() : e.name
                    })
            }),
                new te(t.inner, t.node, 0, 0)
        }
        ,
        this.init()
}
function F(e) {
    let t = this;
    this.cookies = new ue,
        this.callback = e,
        this.cookieName = "no_regional_flags",
        this.on = !1,
        this.config = [{
            name: function () {
                return A("all")
            },
            value: !1
        }, {
            name: function () {
                return A("countries")
            },
            value: !0
        }],
        this.toggle = function (e) {
            e ? (t.on = !0,
                t.setCookie("on")) : (t.on = !1,
                    t.setCookie("off"))
        }
        ,
        this.getCookie = function () {
            "on" === t.cookies.get(t.cookieName) && t.toggle(!0)
        }
        ,
        this.setCookie = function (e) {
            t.cookies.set(t.cookieName, e, 9999)
        }
        ,
        this.change = function (e) {
            t.toggle(e),
                t.callback ? t.callback() : v.rerender()
        }
        ,
        this.picker = function (e) {
            let n = ge("div", "chart-scale-selector", {
                parent: e,
                textId: t.on ? "countries" : "all",
                click: function () {
                    new G({
                        node: n,
                        callback: t.change,
                        options: t.config,
                        title: A("flags")
                    })
                }
            })
        }
        ,
        this.getCookie()
}
function B(e) {
    let t = this;
    this.cookies = new ue,
        this.callback = e,
        this.cookieName = "logarithmic_charts",
        this.on = !1,
        this.config = [{
            name: function () {
                return A("linear")
            },
            value: !1
        }, {
            name: function () {
                return A("logarithmic")
            },
            value: !0
        }],
        this.toggle = function (e) {
            e ? (t.on = !0,
                t.setCookie("on")) : (t.on = !1,
                    t.setCookie("off"))
        }
        ,
        this.getCookie = function () {
            "on" === t.cookies.get(t.cookieName) && t.toggle(!0)
        }
        ,
        this.setCookie = function (e) {
            t.cookies.set(t.cookieName, e, 9999)
        }
        ,
        this.change = function (e) {
            t.toggle(e),
                t.callback ? t.callback() : v.rerender()
        }
        ,
        this.picker = function (e) {
            let n = ge("div", "chart-scale-selector", {
                parent: e,
                textId: t.on ? "logarithmic" : "linear",
                click: function () {
                    new G({
                        node: n,
                        callback: t.change,
                        options: t.config,
                        title: A("charts")
                    })
                }
            })
        }
        ,
        this.getCookie()
}
function O(e) {
    let t = this;
    this.label = e.label,
        this.options = e.options,
        this.callback = e.callback,
        this.placeholder = e.placeholder || "",
        this.customClass = e.customClass,
        this.searchFn = e.searchFn,
        this.id = de(22),
        this.dropdown = null,
        this.binding = null,
        this.className = "search-dropdown-container",
        this.searchTerm = "",
        this.make = function () {
            t.dropdown = ge("div", t.className, {
                parent: be("body")
            }),
                t.customClass && t.dropdown.classList.add(t.customClass),
                t.binding = new te(t.dropdown, t.input, 0, 0, !0),
                t.listenForClose()
        }
        ,
        this.choose = function (e) {
            t.input.value = "",
                t.destroy(),
                t.callback(e)
        }
        ,
        this.isolateString = function (e) {
            return e ? se(e, t.searchTerm) : ""
        }
        ,
        this.render = function (e) {
            t.options.forEach(function (n, i) {
                let a = t.searchFn ? t.searchFn(n) : ""
                    , o = t.isolateString(n.value)
                    , r = t.isolateString(n.desc);
                if (!e && t.searchFn && !a)
                    return;
                if (!(e || t.searchFn || o || r))
                    return;
                let s = ge("div", "search-dropdown-item", {
                    parent: t.dropdown,
                    click: function () {
                        t.choose(n.id)
                    }
                });
                n.disabled && s.classList.add("disabled"),
                    n.icon ? ge("i", n.icon, {
                        parent: s
                    }) : n.img && ge("img", {
                        src: n.img,
                        parent: s
                    }),
                    ge("span", "search-dropdown-title", {
                        html: o || n.value,
                        parent: s
                    }),
                    ge("span", "search-dropdown-desc", {
                        html: r || n.desc,
                        parent: s
                    })
            })
        }
        ,
        this.listenForClose = function () {
            be("body").addEventListener("click", t.onBodyClick)
        }
        ,
        this.onBodyClick = function (e) {
            let n = e.target.closest("." + t.className)
                , i = t.label.contains(e.target);
            n || i || (t.input.value = "",
                be("body").removeEventListener("click", t.onBodyClick),
                t.input.blur(),
                t.destroy())
        }
        ,
        this.destroy = function () {
            ye("." + t.className).forEach(function (e) {
                e.remove()
            })
        }
        ,
        this.start = function (e, n) {
            t.searchTerm = e.target.value || "",
                t.destroy(),
                (e.target.value || n) && (t.make(),
                    t.render(n))
        }
        ,
        this.bind = function () {
            t.label.setAttribute("for", t.id),
                t.input = ge("input", {
                    id: t.id,
                    placeholder: t.placeholder,
                    parent: t.label,
                    input: t.start,
                    focus: function (e) {
                        t.start(e, !0)
                    },
                    click: function (e) {
                        e.target.value || t.start(e, !0)
                    }
                })
        }
        ,
        this.init = function () {
            t.bind()
        }
        ,
        this.init()
}
function W(e, t, n, i, a) {
    let o = this;
    this.type = a,
        this.chart = e,
        this.tooltip = t,
        this.datasets = n,
        this.labels = i,
        this.id = "chartjs-tooltip",
        this.element = null,
        this.findIndex = function () {
            try {
                o.title = o.tooltip && o.tooltip.title && o.tooltip.title[0] ? o.tooltip.title[0] : "",
                    o.index = o.title ? o.labels.indexOf(o.title) : -1,
                    o.index < 0 && o.tooltip && o.tooltip.dataPoints && o.tooltip.dataPoints[0] && (o.index = o.tooltip.dataPoints[0].index,
                        o.title = o.labels[o.index])
            } catch (e) {
                console.log(e)
            }
        }
        ,
        this.remove = function () {
            0 !== o.tooltip.opacity && (o.element = ve(o.id),
                o.element && (o.element.innerHTML = ""))
        }
        ,
        this.make = function () {
            let n = o.chart._chart.canvas.parentNode
                , i = t.caretX
                , a = t.caretY - 100;
            if (i > window.innerWidth / 2 ? i = i - 160 - 30 : i += 20,
                a > n.offsetTop + 250 ? a = n.offsetTop + 250 : a < n.offsetTop + 30 && (a += 120),
                o.element || (o.element = ge("div"),
                    o.element.id = o.id),
                o.element.style.opacity = .9,
                o.element.style.width = "160px",
                o.element.style.background = "var(--card)",
                o.element.style["z-index"] = 9999999999,
                o.element.style["box-shadow"] = "var(--box-shadow)",
                o.element.style["border-radius"] = "10px",
                o.element.style.left = e._chart.canvas.offsetLeft + i + "px",
                o.element.style.position = "absolute",
                o.element.style.top = e._chart.canvas.offsetTop + a + "px",
                o.element.style.fontFamily = t._bodyFontFamily,
                o.element.style.fontSize = t.bodyFontSize + "px",
                o.element.style.fontStyle = t._bodyFontStyle,
                o.element.style.padding = t.yPadding + "px " + t.xPadding + "px",
                0 === o.tooltip.opacity)
                return void (o.element.style.opacity = 0);
            o.element.innerHTML = "",
                n.appendChild(o.element),
                window.innerWidth > 991 && (o.element.addEventListener("mouseenter", function () {
                    o.element.remove()
                }),
                    n.addEventListener("mouseleave", function () {
                        o.element.remove()
                    })),
                setTimeout(function () {
                    n.addEventListener("click", function () {
                        o.element.remove()
                    })
                }, 1e3);
            let r = ge("div")
                , s = '<div style="width:100%;text-align:center;margin-top:5px;font-size:14px;font-weight:600;margin-bottom:10px;">' + o.title + "</div>";
            s += "<div>",
                o.datasets.forEach(function (e) {
                    let t = o.makeNameString(e)
                        , n = o.makeNumberString(e);
                    if (!n && !e.alwaysDisplay)
                        return;
                    let i = '<span style="margin-right:4px;background:' + e.color + "; border-color:" + e.bg + '; border-width: 2px;width:13px;height:13px;border-radius:50%;display:inline-flex;flex:none"></span>';
                    s += '<div style="white-space:nowrap;display:flex;padding:4px;">' + i + ('<strong style="display:inline-block;width:90px;flex:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + t + "</strong>") + ('<span style="font-size:11px;text-align:right;display:inline-flex;justify-content:flex-end;width:100%;">' + (n || "-") + "</span>") + "</div>"
                }),
                s += "</div>",
                r.innerHTML = s,
                o.element.appendChild(r)
        }
        ,
        this.makeNumberString = function (e) {
            let t = e[e.real ? "real" : "numbers"][o.index]
                , n = e.numberTypes ? e.numberTypes[o.index] : o.type;
            return t ? K(t, n) : null
        }
        ,
        this.makeNameString = function (e) {
            if (o.datasets && 1 === o.datasets.length && !e.name) {
                let t = e.numbers[o.index]
                    , n = 0;
                return o.datasets[0].numbers.forEach(function (e) {
                    n += e
                }),
                    K(t / n * 100, "percent")
            }
            return e.name
        }
        ,
        this.init = function () {
            o.findIndex(),
                o.remove(),
                o.make()
        }
        ,
        this.init()
}
function K(e, t) {
    switch ("number" != typeof e && (e = 0),
    t) {
        case "plus":
            return e ? "<sub>+</sub>" + ae(parseInt(e)) : "-";
        case "percent":
            return e ? ae(e.toFixed(2)) + "<sub>%</sub>" : "-";
        case "perMillion":
            return e < 1 ? "<1/M" : ae(Math.ceil(e)) + "/M";
        default:
            return e ? ae(e) : "-"
    }
}
function Z() {
    let e = g.places
        , t = A("searchRegions") + "...";
    return !e || e.length < 1 ? t = t.replace("{nb}", "") : (t.includes("{nb}") && (t = t.replace("{nb}", e.length)),
        t)
}
function j(e) {
    let t = this;
    this.container = e.node,
        this.onRegionHover = e.onRegionHover,
        this.onSearch = e.onSearch,
        this.autofocus = e.autofocus,
        this.element = null,
        this.embedded = g.embedded,
        this.countries = new he,
        this.input = null,
        this.cancel = null,
        this.mode = function () {
            return h.getParam("mode") || "infected"
        }
        ,
        this.sorter = t.mode(),
        this.searching = "",
        this.searchMap = function (e) {
            e.length > 0 ? t.cancel.classList.remove("hide") : t.cancel.classList.add("hide"),
                t.searching = e,
                t.renderRegions()
        }
        ,
        this.highlightBubble = function (e) {
            t.onRegionHover && "function" == typeof t.onRegionHover && t.onRegionHover(e)
        }
        ,
        this.changeSorter = function (e) {
            t.adjustScroll(!0),
                window.innerWidth > 991 ? t.changeMode(e) : (t.changeMode(e),
                    t.renderRegions())
        }
        ,
        this.startSorter = function (e) {
            t.sorterConfig.forEach(function (e) {
                e.name = re(e.value, "textId");
                let t = re(e.value, "icon");
                t ? e.icon = t : (e.color = re(e.value, "color"),
                    e.bg = re(e.value, "bg"))
            }),
                new G({
                    node: e.target,
                    callback: t.changeSorter,
                    options: t.sorterConfig,
                    title: A("sortList")
                })
        }
        ,
        this.remove = function (e) {
            t.sidebar.remove()
        }
        ,
        this.searchTimer = null,
        this.onInput = function (e) {
            t.adjustScroll(!0),
                clearTimeout(t.searchTimer),
                t.searchTimer = setTimeout(function () {
                    t.searchMap(e.target.value)
                }, 300)
        }
        ,
        this.renderTopbar = function () {
            t.topBar.innerHTML = "";
            let e = ge("div", "app-top-bar-inner", {
                parent: t.topBar
            })
                , n = ge("div", "app-top-bar-inner-back", {
                    parent: e,
                    click: function (e) {
                        e.target.classList.add("disabled"),
                            t.adjustScroll(!0),
                            t.remove(!0)
                    }
                });
            setTimeout(function () {
                n.classList.add("animate")
            }, 100),
                t.input = ge("input", "app-top-bar-search", {
                    parent: e,
                    input: t.onInput,
                    value: t.searching || "",
                    type: "text",
                    placeholder: Z()
                }),
                t.autofocus && (t.input.setAttribute("autofocus", !0),
                    (new z).set(t.input, "end"));
            let i = ge("div", "map-sidebar-right-btns", {
                parent: e
            });
            t.cancel = ge("div", "map-sidebar-clear", {
                parent: i,
                click: t.resetInput
            }),
                t.searching || t.cancel.classList.add("hide")
        }
        ,
        this.launchFilterSelection = function (e) {
            let n = []
                , i = g.config;
            for (let e in i)
                n.push({
                    color: i[e].color,
                    bg: i[e].bg,
                    name: i[e].name(),
                    value: e
                });
            new G({
                node: e.target,
                callback: t.changeMode,
                options: n,
                title: A("filterMap")
            })
        }
        ,
        this.changeMode = function (e) {
            h.setParam({
                mode: e
            }),
                "date" !== e && "name" !== e ? (t.render(),
                    y.change("map")) : t.render()
        }
        ,
        this.resetInput = function () {
            t.input.value = "",
                t.input.dispatchEvent(new Event("input")),
                t.onRegionHover || t.remove()
        }
        ,
        this.make = function () {
            t.sidebar = ge("div", "map-sidebar", {
                parent: t.container
            }),
                t.subButtons = ge("div", "app-sub-buttons", {
                    parent: t.sidebar
                }),
                t.topBar = ge("div", "app-top-bar", {
                    parent: t.sidebar
                }),
                t.regionList = ge("div", ["map-sidebar-section", "column"], {
                    parent: t.sidebar
                })
        }
        ,
        this.clickOnPlace = function (e) {
            window.innerWidth > 991 || t.remove(),
                y.content && y.content.adjustZoom && y.content.updateDrawer ? y.content.updateDrawer(e.id, !0) : ((new V).set(e.id),
                    window.location.reload())
        }
        ,
        this.matchSearch = function (e) {
            return g.matchSearch(e, t.searching)
        }
        ,
        this.renderRegions = function () {
            t.regionList.innerHTML = "";
            let e = t.mode();
            t.content = ge("div", "map-sidebar-section-content", {
                parent: t.regionList,
                scroll: function (e) {
                    i = e.target.scrollTop
                }
            });
            let n = "name" !== e;
            g.getAffected(e, n).forEach(function (n) {
                let i = n.id.toString()
                    , a = re(e, "mode")
                    , o = "number" == typeof n[e] ? n[e] : n.infected
                    , r = n.nonaffected || !o;
                if (n.nonaffected && !re(e, "showNonAffected"))
                    return;
                if (n.invisible)
                    return;
                if (!t.matchSearch(n))
                    return;
                if (n.isSub && !t.searching)
                    return;
                let s = ge("div", "map-sidebar-section-item", {
                    parent: t.content,
                    mouseenter: function () {
                        t.highlightBubble(i)
                    },
                    click: function (e) {
                        t.clickOnPlace(n)
                    }
                });
                r && s.classList.add("disabled"),
                    n.isSub && s.classList.add("is-sub"),
                    t.searching && s.classList.add("is-searching"),
                    n.id;
                let l = ge("div", "map-sidebar-section-item-img", {
                    parent: s
                })
                    , c = (ge("img", "flag-img", {
                        src: t.countries.flag(n.country, n.state),
                        parent: l
                    }),
                        ge("div", "map-sidebar-section-item-details", {
                            parent: s
                        }))
                    , d = se(n.name, t.searching)
                    , u = ge("div", "map-sidebar-section-item-title", {
                        html: t.searching && d ? d : n.name,
                        parent: c
                    });
                if (n.isSub) {
                    let e = t.countries.name(n.country)
                        , i = se(e, t.searching);
                    ge("span", "map-sidebar-section-item-country", {
                        html: t.searching && i ? i : e,
                        parent: u
                    })
                }
                let p = ge("div", "map-sidebar-section-item-desc", {
                    parent: c
                });
                n.nonaffected || new ie(p, n.lastUpdated);
                let h = ge("div", "map-sidebar-section-item-nb", {
                    parent: s,
                    html: K(o, re(e, "number"))
                });
                a && h.classList.add(a)
            }),
                t.adjustScroll()
        }
        ,
        this.adjustScroll = function (e) {
            e && (i = 0),
                i && (t.content.scrollTop = i)
        }
        ,
        this.render = function () {
            t.renderTopbar(),
                t.renderSubButtons(),
                t.renderRegions()
        }
        ,
        this.renderSubButtons = function () {
            t.subButtons.innerHTML = "",
                t.world = ge("div", "map-world-nbs", {
                    parent: t.subButtons,
                    textId: "world",
                    click: P
                }),
                t.sort = ge("div", "map-sidebar-sort", {
                    parent: t.subButtons,
                    click: t.startSorter,
                    text: re(t.mode(), "textId")
                })
        }
        ,
        this.init = function () {
            t.embedded || (t.make(),
                t.render())
        }
        ,
        this.sorterConfig = [{
            value: "infected"
        }, {
            value: "casesPerMillion"
        }, {
            value: "recovered"
        }, {
            value: "recoveryRate"
        }, {
            value: "dead"
        }, {
            value: "fatalityRate"
        }, {
            value: "deathsPerMillion"
        }, {
            value: "sick"
        }, {
            value: "date"
        }, {
            value: "name"
        }],
        this.init()
}
function V() {
    let e = this;
    this.countries = new he,
        this.get = function () {
            let t = h.getParam("selected");
            if (t)
                return t;
            let n = h.get()
                , i = h.getSubPath();
            return "tracking" === n && i ? e.findPlaceByUrl(i) : void 0
        }
        ,
        this.findPlaceByUrl = function (e) {
            let t = g.places;
            if (t)
                for (let n = 0; n < t.length; n++) {
                    if (J(t[n].name) === e)
                        return t[n].id
                }
        }
        ,
        this.findPlace = function (e) {
            return g && g.getPlaceById ? g.getPlaceById(e) : null
        }
        ,
        this.updateDocTitle = function (t) {
            let n = e.findPlace(t)
                , i = "The Coronavirus App";
            if (t && !n)
                return;
            if (n && n.infected && n.name ? i = "{name} Coronavirus (Live): {nb} Cases | The Coronavirus App".replace("{name}", n.name).replace("{nb}", ae(n.infected)) : y.originalTitle && !y.originalTitle.includes("Cases") && (i = y.originalTitle),
                Y({
                    title: i
                }),
                !n)
                return;
            Y({
                url: "https://coronavirus.app/tracking/" + (J(n.name) || "")
            });
            let a = e.countries.name(n.country);
            Y({
                description: "Everything you need to know about the {nb} Coronavirus Covid-19 cases in {name}. View charts, historical data, fatality rate, recovery rate, total and new cases in {countryName} and the rest of the world.".replace("{name}", n.name).replace("{nb}", ae(n.infected)).replace("{countryName}", a)
            })
        }
        ,
        this.replacePlaceUrl = function (t) {
            if (!t)
                return void h.replace(["map"]);
            let n = e.findPlace(t);
            if (!n || !n.name)
                return void h.setParam({
                    selected: t
                });
            let i = J(n.name) || null;
            i && (h.replace(["tracking", i]),
                h.setParam({
                    selected: null
                }))
        }
        ,
        this.set = function (t) {
            e.replacePlaceUrl(t),
                e.updateDocTitle(t)
        }
}
function Y(e) {
    e.title && (document.title = e.title,
        be('meta[property="og:title"]').setAttribute("content", e.title)),
        e.description && (be('meta[name="description"]').setAttribute("content", e.description),
            be('meta[property="og:description"]').setAttribute("content", e.description)),
        e.url && (be('link[rel="canonical"]').setAttribute("href", e.url),
            be('meta[property="og:url"]').setAttribute("content", e.url))
}
function J(e) {
    return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ÿ.,!?=+;’'"]/g, "").replace(/[\s]/g, " ").replace(/[ ()\/\\]/g, "-").toLowerCase()
}
function _(e, t, n) {
    n || (n = t - parseInt(.04 * t));
    let i = n.toString().split(".")
        , a = i && i[1] ? i[0].length : 0
        , o = parseFloat(((t > n ? t - n : n - t) / 10).toFixed(a));
    t < 100 && (o = 1);
    let r = t - n
        , s = n
        , l = t > n ? o : -o
        , c = l < 0
        , d = Math.abs(Math.floor(.8 / r))
        , u = setInterval(function () {
            (s += l) >= t && !c || s <= t && c ? (e(s = t),
                clearInterval(u)) : e(s)
        }, d)
}
function q(i) {
    let a = this;
    this.element = null,
        this.embedded = g.embedded,
        this.map = null,
        this.selector = i,
        this.countries = new he,
        this.cookies = new ue,
        this.sorter = "nb",
        this.hovering = null,
        this.id = de(20),
        this.sidebar = null,
        this.mode = null,
        this.wholeZones = !1,
        this.regionSearch = null,
        this.showingMasters = !0,
        this.mode = null,
        this.modes = b.modes,
        this.getPlaceStyle = function (e) {
            return b.getPlaceStyle(e, a.wholeZones, a.mode, a.zoom)
        }
        ,
        this.defaultZoom = function () {
            if (n)
                return n;
            let e = p.getCountry()
                , t = 5;
            if (e) {
                let n = a.countries.zoom(e);
                n && (t = n)
            }
            return t
        }
        ,
        this.zoom = a.defaultZoom(),
        this.saveDefaultCoordinates = async function () {
            if (a.embedded)
                return;
            if (window.location.pathname.includes("/tracking"))
                return;
            if (e && t)
                return;
            let n = p.getCountry()
                , i = a.countries.longitude(n)
                , o = a.countries.latitude(n);
            if (i && o)
                return e = o,
                    t = i,
                    void a.render();
            let r = await (new ce).get() || {};
            r && r.latitude && r.longitude && (e = r.latitude,
                t = r.longitude,
                a.render())
        }
        ,
        this.defaultCoordinates = function () {
            return e && t ? [e, t] : [37.0902, -95.7129]
        }
        ,
        this.makeSiteLink = function () {
            if (!a.embedded)
                return;
            let e = ge("a");
            e.classList.add("site-link"),
                e.setAttribute("href", "https://progressier.com"),
                e.setAttribute("target", "_blank"),
                e.textContent = "progressier.com",
                be(a.selector).appendChild(e)
        }
        ,
        this.makeSidebar = function () {
            window.innerWidth > 991 && (a.makeNumbers(),
                a.regionSearch = new j({
                    node: be("#mainContainer"),
                    onRegionHover: a.highlightBubble,
                    autofocus: !1
                }))
        }
        ,
        this.makeNumbers = function () {
            new function (e) {
                let t = this;
                this.selector = "#mainContainer",
                    this.embedded = g.embedded,
                    this.mode = h.getParam("mode"),
                    this.newObject = e,
                    this.oldObject = {
                        infected: 0,
                        dead: 0,
                        recovered: 0
                    },
                    this.changeView = function (e) {
                        t.mode = e,
                            h.setParam({
                                mode: e
                            }),
                            y.change("map")
                    }
                    ,
                    this.make = function () {
                        let e = t.mode
                            , n = re(e, "mode");
                        ye(".map-sidebar-numbers").forEach(function (e) {
                            t.oldObject.infected = parseInt(e.getAttribute("data-infected")),
                                t.oldObject.dead = parseInt(e.getAttribute("data-dead")),
                                t.oldObject.recovered = parseInt(e.getAttribute("data-recovered")),
                                e.remove()
                        });
                        let i = ge("div");
                        i.classList.add("map-sidebar-numbers"),
                            i.setAttribute("data-infected", t.newObject.infected),
                            i.setAttribute("data-recovered", t.newObject.recovered),
                            i.setAttribute("data-dead", t.newObject.dead),
                            be(t.selector).appendChild(i);
                        [["infected"], ["dead", "recovered"]].forEach(function (e, a) {
                            let o = 0 === a
                                , r = ge("div");
                            r.classList.add("map-sidebar-section"),
                                i.appendChild(r),
                                e.forEach(function (e) {
                                    let i = ge("div", "map-sidebar-card", {
                                        parent: r,
                                        "data-title": e,
                                        click: function () {
                                            t.changeView(e)
                                        }
                                    })
                                        , a = t.newObject[e];
                                    i.textContent = 0 === a ? "-" : ae(a),
                                        e === n && i.classList.add("active"),
                                        o || i.setAttribute("data-text", re(e, "textId"))
                                })
                        })
                    }
                    ,
                    this.init = function () {
                        t.embedded || be(t.selector) && t.make()
                    }
                    ,
                    this.init()
            }
                ({
                    infected: g.calculate("infected"),
                    dead: g.calculate("dead"),
                    recovered: g.calculate("recovered")
                })
        }
        ,
        this.changeSorting = function (e) {
            a.sorter = e,
                a.render()
        }
        ,
        this.highlightBubble = function (e) {
            a.map.eachLayer(function (t) {
                if (t.options.place)
                    if (t.options.place.id === e) {
                        let e = "rgb(41, 84, 255)";
                        t.setStyle({
                            color: e,
                            fillColor: "rgba(41, 84, 255, 0.7)"
                        }),
                            t.openTooltip()
                    } else
                        t.setStyle(a.getPlaceStyle(t.options.place))
            })
        }
        ,
        this.resetStyles = function () {
            a.map.eachLayer(function (e) {
                e.options.place && e.setStyle(a.getPlaceStyle(e.options.place))
            })
        }
        ,
        this.updateDrawer = function (e, t) {
            a.embedded || (e && (new V).set(e),
                v && v.main && v.main.drawer && (v.main.drawer.render(),
                    v.main.drawer.relaunch(t)))
        }
        ,
        this.adjustZoom = function (e, t, n) {
            a.map && a.map.panTo([n, t])
        }
        ,
        this.hideDrawer = function () {
            a.embedded || v.main.drawer && (v.main.drawer.close(),
                v.main.drawer.reset())
        }
        ,
        this.createModal = function (e) {
            if (a.embedded) {
                let t = window.location.origin + "/" + e;
                window.open(t, "_blank")
            } else
                a.updateDrawer(e)
        }
        ,
        this.changeView = function (e) {
            a.modes[e] && (a.mode = e,
                h.setParam({
                    mode: e
                }),
                a.regionSearch && a.regionSearch.renderRegions(),
                a.render())
        }
        ,
        this.createMap = function () {
            var i = L.GridLayer.prototype._initTile;
            L.GridLayer.include({
                _initTile: function (e) {
                    i.call(this, e);
                    var t = this.getTileSize();
                    e.style.width = t.x + 1 + "px",
                        e.style.height = t.y + 1 + "px"
                }
            }),
                a.map = L.map(a.id, {
                    worldCopyJump: !0,
                    zoomSnap: 1,
                    maxBoundsViscosity: 0,
                    zoomControl: !1,
                    attributionControl: !1
                }).setView(a.defaultCoordinates(), a.defaultZoom());
            let o = L.latLng(-89.98155760646617, -360)
                , r = L.latLng(89.99346179538875, 360)
                , s = L.latLngBounds(o, r);
            a.map.setMaxBounds(s),
                a.map.on("zoomend", function (e, t) {
                    let i = a.map.getZoom();
                    a.zoom = i,
                        n = i,
                        a.resetStyles()
                }),
                a.map.on("movestart", function (e, t) {
                    a.hideDrawer()
                }),
                a.map.on("moveend", function (n, i) {
                    let o = a.map.getCenter();
                    t = o.lng,
                        e = o.lat
                });
            let l = b.getTileConfig(a.wholeZones);
            L.tileLayer(l.url, {
                maxZoom: 10,
                minZoom: 3,
                attribution: l.attribution
            }).addTo(a.map),
                L.control.attribution({
                    position: "bottomright"
                }).addTo(a.map),
                L.control.zoom({
                    position: "bottomright"
                }).addTo(a.map)
        }
        ,
        this.createPlaceFeature = function (e) {
            return b.createPlaceFeature(e, a.wholeZones, a.mode)
        }
        ,
        this.addOneFeature = function (e) {
            a.createPlaceFeature(e).bindTooltip(function (t) {
                return t && t.options && !t.options.fillOpacity ? "" : b.showTooltip(e)
            }).on("tooltipopen", function (t, n) {
                a.highlightBubble(e.id)
            }).on("tooltipclose", function (e, t) {
                a.resetStyles()
            }).on("click", function (t, n) {
                if (e.nonaffected)
                    return;
                if (t && t.target && t.target && t.target.options && !t.target.options.fillOpacity)
                    return;
                if (a.embedded) {
                    let t = e.isMaster ? "?selected=" + e.id : "/" + e.id + "?selected=" + e.id;
                    return void window.open(window.location.origin + t, "_blank")
                }
                window.innerWidth > 991 ? a.createModal(e.id) : a.updateDrawer(e.id)
            }).addTo(a.map)
        }
        ,
        this.addBubbles = function () {
            g.places.forEach(function (e) {
                e.isSub && a.wholeZones || !a.wholeZones && e.nonaffected || a.addOneFeature(e)
            })
        }
        ,
        this.render = function () {
            be(a.selector).innerHTML = "",
                a.make(),
                a.createMap(),
                a.addBubbles(),
                a.makeSiteLink(),
                a.makeSidebar(),
                a.resetStyles(),
                setTimeout(function () {
                    a.recenterAroundSelected()
                }, 500)
        }
        ,
        this.recenterAroundSelected = function () {
            let e = (new V).get();
            if (e) {
                let t = g.places.find(t => t.id === e);
                t && (a.adjustZoom(t.zoom || 5, t.longitude, t.latitude),
                    a.highlightBubble(e),
                    a.updateDrawer(t.id))
            }
        }
        ,
        this.setMode = function () {
            let e = h.getParam("mode") || "";
            a.mode = re(e, "mode")
        }
        ,
        this.make = function () {
            a.element = ge("section", "map", {
                id: a.id,
                parent: be(a.selector)
            }),
                a.embedded && a.element.classList.add("embedded")
        }
        ,
        this.changePageTitle = function () {
            Y({
                title: "The Coronavirus App",
                description: "Track the spread of the Coronavirus COVID-19 epidemic, browse an interactive map, view fatality rate and recoveries, check affected regions in real-time and more."
            })
        }
        ,
        this.init = async function () {
            a.saveDefaultCoordinates(),
                a.changePageTitle(),
                a.setMode(),
                a.render()
        }
        ,
        this.init()
}
function X(e) {
    return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ÿ.,!?=+;'"]/g, "").replace(/[\s]/g, " ").toLowerCase()
}
function Q(e) {
    let t = this;
    this.element = null,
        this.text = e || "",
        this.className = "loading-screen",
        this.icon = window.location.origin + "/assets/img/icons/loading.svg",
        this.make = function () {
            t.remove(),
                t.element = ge("div", t.className);
            let e = ge("div", "loading-screen-inner", {
                parent: t.element
            });
            ge("img", {
                src: t.icon,
                parent: e
            });
            t.text && ge("div", {
                text: t.text,
                parent: e
            })
        }
        ,
        this.render = function () {
            be("body").appendChild(t.element)
        }
        ,
        this.remove = function () {
            ye("." + t.className).forEach(function (e) {
                e.remove()
            })
        }
        ,
        this.make()
}
function $(e, t) {
    let n = e && e > 1 && t ? ae(e) + " coronavirus cases in " + t : "The Coronavirus App "
        , i = "Track the spread of the coronavirus";
    "/analytics" !== window.location.pathname && "/api" !== window.location.pathname || (n = document.title,
        i = be('meta[name="description"]').getAttribute("content")),
        new function (e, t, n) {
            let i = this;
            this.title = e,
                this.description = t,
                this.link = n,
                this.prompt = async function () {
                    if (void 0 !== navigator.share && navigator.share)
                        return await navigator.share({
                            title: i.title,
                            text: i.description,
                            url: n
                        }),
                            !0
                }
                ,
                this.copy = function () {
                    new function (e) {
                        let t = this;
                        this.string = e,
                            this.copier = function (e) {
                                e.clipboardData.setData("text/html", t.string),
                                    e.clipboardData.setData("text/plain", t.string),
                                    e.preventDefault()
                            }
                            ,
                            this.copy = function () {
                                document.addEventListener("copy", t.copier),
                                    document.execCommand("copy"),
                                    document.removeEventListener("copy", t.copier)
                            }
                            ,
                            this.copy()
                    }
                        (i.link)
                }
                ,
                this.shareUrl = "https://www.addthis.com/bookmark.php?&s={i}&url={u}",
                this.iconUrl = window.location.origin + "/assets/img/other/{i}.png",
                this.shares = [{
                    color: "#4dc247",
                    id: "whatsapp"
                }, {
                    color: "#3b5998",
                    id: "facebook"
                }, {
                    color: "#1da1f2",
                    id: "twitter"
                }, {
                    color: "#4a154b",
                    id: "slack"
                }],
                this.modal = function () {
                    i.element = ge("div"),
                        i.element.classList.add("share-modal", "backdrop"),
                        i.element.addEventListener("click", function (e) {
                            e.target === e.currentTarget && i.element.remove()
                        }),
                        be("body").appendChild(i.element);
                    let e = ge("div");
                    e.classList.add("share-modal-inner", "modal"),
                        i.element.appendChild(e);
                    let t = ge("i");
                    t.classList.add("share-modal-close", "feather", "feather-x"),
                        t.addEventListener("click", function () {
                            i.element.remove()
                        }),
                        e.appendChild(t);
                    let a = ge("h3");
                    a.innerHTML = A("share") + ": <i>" + i.description + "</i>",
                        e.appendChild(a);
                    let o = ge("div");
                    o.classList.add("share-modal-list"),
                        e.appendChild(o),
                        i.shares.forEach(function (e) {
                            let t = ge("div");
                            t.classList.add("share-modal-btn"),
                                t.addEventListener("click", function () {
                                    let t = i.shareUrl.replace("{i}", e.id).replace("{u}", n);
                                    window.open(t, "_blank")
                                }),
                                t.style.background = e.color,
                                o.appendChild(t);
                            let a = ge("img");
                            a.setAttribute("src", i.iconUrl.replace("{i}", e.id)),
                                t.appendChild(a)
                        });
                    let r = ge("div");
                    r.classList.add("share-modal-btn"),
                        r.addEventListener("click", function () {
                            i.copy(),
                                i.congratulate()
                        }),
                        o.appendChild(r);
                    let s = ge("i");
                    s.classList.add("feather", "feather-copy"),
                        r.appendChild(s)
                }
                ,
                this.init = async function () {
                    let e = await i.prompt();
                    e || i.modal()
                }
                ,
                this.congratulate = function () {
                    new ne("success", A("linkCopied")).send()
                }
                ,
                this.init()
        }
            (i, n, window.location.href)
}
function ee(e, t, n) {
    let i = this;
    this.node = e,
        this.element = null,
        this.line1 = t,
        this.line2 = n,
        this.className = "Tooltip",
        this.binding = null,
        this.make = function () {
            let e = be("." + i.className);
            e && e.remove(),
                i.element = ge("div", i.className);
            ge("div", {
                html: i.line1,
                parent: i.element
            });
            let t = ge("div", "grey", {
                html: i.line2
            });
            i.line2 && i.element.appendChild(t),
                be("body").appendChild(i.element),
                i.binding = new te(i.element, i.node, 0, 0),
                i.node.addEventListener("mouseleave", function () {
                    i.destroy()
                }, {
                    once: !0
                })
        }
        ,
        this.destroy = function () {
            i.element.remove()
        }
        ,
        this.init = function () {
            i.node.addEventListener("mouseenter", function () {
                i.make()
            })
        }
        ,
        this.init()
}
function te(e, t, n, i, a) {
    let o = this;
    this.el = e,
        this.ref = t,
        this.top = n || 0,
        this.left = i || 0,
        this.bindWidth = a,
        this.timer = null,
        this.destroy = function () {
            clearInterval(o.timer),
                o.timer = null,
                o.el.remove()
        }
        ,
        this.bind = function () {
            if (!o.ref || !o.el)
                return void o.destroy();
            let e = parseInt(o.ref.getBoundingClientRect().top)
                , t = o.ref.getBoundingClientRect().left;
            if (!e && !t)
                return void o.destroy();
            let n = o.ref.offsetWidth
                , i = o.ref.offsetHeight
                , r = o.bindWidth ? n : o.el.offsetWidth
                , s = o.el.offsetHeight
                , l = parseInt(e + o.top + i)
                , c = t + n / 2 - r / 2 + o.left
                , d = be("body").offsetWidth
                , u = be("body").offsetHeight;
            c + r > d - 10 && (c = d - r - 10),
                l + s > u - 10 && (l = parseInt(u - s - 10)),
                c < 0 && (c = 0),
                l < 0 && (l = 0),
                o.el.style.top = 10 * (l / 10).toFixed() + "px",
                o.el.style.left = 10 * (c / 10).toFixed() + "px",
                a && (o.el.style.width = r + "px"),
                o.el.style.visibility = "visible"
        }
        ,
        this.go = function () {
            this.bind(),
                this.timer = setInterval(o.bind, 200)
        }
        ,
        this.go()
}
function ne(e, t, n) {
    let i = this;
    this.type = e,
        this.msg = t,
        this.hideAfter = n || !1 === n ? n : 3e3,
        this.node = null,
        this.code = null,
        this.element = null,
        this.stylize = function () {
            let e = ve("NotificationStyle");
            e && e.remove();
            let t = de(20)
                , n = window.location.origin
                , i = be("head")
                , a = ge("style");
            a.setAttribute("id", "NotificationStyle"),
                a.innerHTML = ".Notification-error:before{background-image: url(" + n + "/assets/img/checkmark-error.svg?v=" + t + ")}\n\t\t.Notification-success:before{background-image: url(" + n + "/assets/img/checkmark-success.svg?v=" + t + ")}\n\t\t.Notification-warning:before{background-image: url(" + n + "/assets/img/checkmark-error.svg?v=" + t + ")}\n\t\t.Notification-info:before{background-image: url(" + n + "/assets/img/checkmark-success.svg?v=" + t + ")}",
                i.appendChild(a)
        }
        ,
        this.format = function () {
            var e = i.msg;
            try {
                e = JSON.parse(i.msg)
            } catch (e) { }
            ("object" == typeof i.msg || e.includes("{") || e.includes("[")) && (i.code = JSON.stringify(e),
                i.msg = "An error occurred")
        }
        ,
        this.send = function () {
            this.msg && (this.destroyAll(),
                this.format(),
                this.stylize(),
                this.make(),
                this.show())
        }
        ,
        this.make = function () {
            i.element = ge("div", ["Notification", "Notification-" + i.type]);
            let e = ge("div", "Notification-Inner", {
                parent: i.element
            })
                , t = (ge("i", ["feather", "feather-x"], {
                    parent: ge("span", "Notification-Close", {
                        parent: i.element,
                        click: i.hide
                    })
                }),
                    ge("div", "Notification-Content", {
                        text: i.msg,
                        parent: e
                    }),
                    ge("div", ["Notification-Code", "hide"], {
                        text: i.code
                    }))
                , n = ge("div", "Notification-Btn", {
                    click: function () {
                        t.classList.remove("hide")
                    }
                });
            i.code && e.appendChild(n),
                i.operationId && e.appendChild(undo),
                i.code && e.appendChild(t),
                be("body").appendChild(i.element)
        }
        ,
        this.show = function () {
            setTimeout(function () {
                i.element.classList.add("visible")
            }, 100),
                i.hideAfter && "number" == typeof i.hideAfter && setTimeout(function () {
                    i.hide()
                }, i.hideAfter)
        }
        ,
        this.hide = function () {
            i.element && (i.element.classList.remove("visible"),
                setTimeout(function () {
                    i.destroyAll()
                }, 500))
        }
        ,
        this.destroyAll = function () {
            var e = ye(".Notification");
            e && e.forEach(function (e) {
                e.remove()
            })
        }
}
function ie(e, t) {
    let n = this;
    this.node = e,
        this.date = t,
        this.timer = null,
        this.destroy = function () {
            clearInterval(this.timer),
                this.timer = null
        }
        ,
        this.make = function () {
            n.node || n.destroy(),
                be("body").contains(n.node) || n.destroy();
            n.date || moment().toISOString();
            n.node.textContent = A("lastUpdate") + " " + n.format()
        }
        ,
        this.format = function () {
            return moment(n.date).locale(p.lang).fromNow()
        }
        ,
        this.checkDate = function () {
            moment(n.date).isBefore(moment()) || (n.date = moment().toISOString())
        }
        ,
        this.start = function () {
            if (n.checkDate(),
                !n.node)
                throw "You must specify a node";
            n.make(),
                this.timer = setInterval(function () {
                    n.make()
                }, 500)
        }
        ,
        this.start()
}
function ae(e) {
    let t = {
        FR: {
            thousands: " ",
            decimals: ","
        },
        PT: {
            thousands: " ",
            decimals: ","
        },
        CZ: {
            thousands: " ",
            decimals: ","
        },
        HU: {
            thousands: " ",
            decimals: ","
        },
        PL: {
            thousands: " ",
            decimals: ","
        },
        ES: {
            thousands: ".",
            decimals: ","
        },
        IT: {
            thousands: ".",
            decimals: ","
        },
        DE: {
            thousands: ".",
            decimals: ","
        },
        TR: {
            thousands: ".",
            decimals: ","
        },
        GR: {
            thousands: ".",
            decimals: ","
        },
        DE: {
            thousands: ".",
            decimals: ","
        },
        EN: {
            thousands: ",",
            decimals: "."
        }
    };
    e || (e = 0);
    let n = p.lang
        , i = t[n] ? t[n] : t.EN
        , a = e.toString().split(".");
    return a[0] = a[0].replace(/\B(?=(\d{3})+(?!\d))/g, i.thousands),
        a.join(i.decimals)
}
function oe(e) {
    let t = parseInt(e)
        , n = [{
            value: 1,
            symbol: ""
        }, {
            value: 1e3,
            symbol: "K"
        }, {
            value: 1e6,
            symbol: "M"
        }, {
            value: 1e9,
            symbol: "B"
        }]
        , i = 0;
    for (i = n.length - 1; i > 0 && !(t >= n[i].value); i--)
        ;
    return (t / n[i].value).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + n[i].symbol
}
function re(e, t) {
    let n = [{
        id: "infected",
        mode: "infected",
        showNonAffected: !0,
        number: "absolute",
        icon: "fa fa-user-plus",
        textId: "infected",
        color: g.config.infected.color,
        bg: g.config.infected.bg
    }, {
        id: "dead",
        mode: "dead",
        number: "absolute",
        showNonAffected: !1,
        textId: "dead",
        icon: "fa fa-remove",
        color: g.config.dead.color,
        bg: g.config.dead.bg
    }, {
        id: "recovered",
        mode: "recovered",
        number: "absolute",
        showNonAffected: !1,
        icon: "fa fa-home",
        textId: "recovered",
        color: g.config.recovered.color,
        bg: g.config.recovered.bg,
        link: "https://www.notion.so/coronavirus/About-the-recoveries-653a92c31fee4abba9bbc58e55d0d13f"
    }, {
        id: "sick",
        mode: "sick",
        number: "absolute",
        textId: "sick",
        showNonAffected: !1,
        icon: "fa fa-spinner",
        color: g.config.sick.color,
        bg: g.config.sick.bg,
        link: "https://www.notion.so/coronavirus/About-the-active-cases-be37b6d329cb47a5988e961402217e83"
    }, {
        id: "fatalityRate",
        mode: "dead",
        number: "percent",
        showNonAffected: !1,
        icon: "fa fa-percent",
        textId: "fatalityRate",
        color: g.config.dead.color,
        bg: g.config.dead.bg,
        link: "https://www.notion.so/coronavirus/About-the-fatality-rate-8baf4b3bf1134dd3b647646cd1c6599e"
    }, {
        id: "activeRate",
        mode: "sick",
        number: "percent",
        showNonAffected: !1,
        icon: "fa fa-percent",
        textId: "sick",
        color: g.config.sick.color,
        bg: g.config.sick.bg
    }, {
        id: "recoveryRate",
        mode: "recovered",
        number: "percent",
        showNonAffected: !1,
        icon: "fa fa-refresh",
        textId: "recoveryRate",
        color: g.config.recovered.color,
        bg: g.config.recovered.bg
    }, {
        id: "casesPerMillion",
        mode: "infected",
        number: "perMillion",
        showNonAffected: !1,
        icon: "fa fa-users",
        textId: "casesPerMillion",
        color: g.config.infected.color,
        bg: g.config.infected.bg,
        link: "https://www.notion.so/coronavirus/What-s-that-weird-population-infection-percentage-d7623b9a770b4225bed8d46943d73394"
    }, {
        id: "deathsPerMillion",
        mode: "dead",
        number: "perMillion",
        showNonAffected: !1,
        icon: "fa fa-user-times",
        textId: "deathsPerMillion",
        color: g.config.dead.color,
        bg: g.config.dead.bg,
        link: "https://www.notion.so/coronavirus/What-s-that-weird-population-infection-percentage-d7623b9a770b4225bed8d46943d73394"
    }, {
        id: "date",
        mode: "infected",
        number: "absolute",
        showNonAffected: !1,
        textId: "lastUpdate",
        icon: "feather feather-clock",
        color: g.config.infected.color,
        bg: g.config.infected.bg
    }, {
        id: "name",
        mode: "infected",
        number: "absolute",
        showNonAffected: !0,
        textId: "name",
        icon: "feather feather-align-left",
        color: g.config.infected.color,
        bg: g.config.infected.bg
    }, {
        id: "population",
        mode: "infected",
        number: "absolute",
        showNonAffected: !1,
        icon: "fa fa-male",
        textId: "population",
        color: g.config.infected.color,
        bg: g.config.infected.bg
    }]
        , i = n.find(t => t.id === e) || n[0];
    switch (t) {
        case "textId":
            return A(i.textId);
        default:
            return i[t]
    }
}
function se(e, t) {
    let n = X(t)
        , i = X(e);
    if (!e || "null" === e || !t)
        return "";
    let a = i.indexOf(n);
    return a < 0 ? "" : e.slice(0, a) + '<span class="search-match">' + e.slice(a, a + t.length) + "</span>" + e.slice(a + t.length, e.length)
}
function le(e) {
    let t = "";
    switch (e) {
        case "FR":
            t = 'Since June 3rd, the French government no longer reports probable cases from EHPAD/EMS. We have therefore removed them from the total. Our numbers align with those provided by the French government on their <a href="https://dashboard.covid19.data.gouv.fr/" target="_blank">official dashboard</a> and by the Ministry of Health on their <a target="_blank" href="https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde">Sante Publique</a> platform. However, due to an increasing number of inconsistencies between the two, the numbers we show on our app may fluctuate. Additionally, since March 25th, the French Ministry of Health no longer shares the total number of cases per region. We now extrapolate it from the number of "hospitalized patients". <a href="https://www.notion.so/How-we-extrapolate-the-cases-per-region-in-France-c3d2368d65e74c0abb818f4cc597098b" target="_blank">Learn more</a>';
            break;
        case "GB":
            t = "On July 3rd, the UK government updated the methodology of reporting positive cases to remove duplicates. We have left historical data before that date unchanged. Also, note that the UK government does not report recovery data. Finally, please note that all British Overseas Territories are listed as separate regions in our app.";
            break;
        case "BR":
            t = 'The Brazilian government does not provide regular data about recoveries at the state level. Please note that this does NOT mean that nobody in each of the states of Brazil has recovered from coronavirus <a href="https://www.notion.so/coronavirus/About-the-recoveries-653a92c31fee4abba9bbc58e55d0d13f" target="_blank">Learn more</a>';
            break;
        case "IN":
            t = "All states and union territories borders depicted are for information purposes only. Boundaries and designations used on this app do not imply the expression of any opinion whatsoever on our part. All the lines on maps represent approximate border lines coming in a standard library designed to display nicely on a mobile device and without using too much of your bandwith.";
            break;
        case "US":
            t = 'In the United States, we track recoveries at the national level rather than at the state level. The fact that a state shows no recoveries does NOT mean that nobody in that state has recovered from coronavirus. The numbers reported by Worldometers for Veteran Affair, Federal Bureau of Prisons, the US Military and Grand Princess are included in the total for the US but are not displayed on the map. The spike of new deaths in New York on April 18th is due to an <a href="https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html" target="_blank">update in CDC guidelines</a>, which now recommends both confirmed and probable cases and deaths be included in the total case and death counts.';
            break;
        case "AU":
            t = "New South Wales and Queensland do no regularly report recoveries. The recoveries data shown for these two states are estimations only.";
            break;
        case "PA":
            t = "Our numbers may look one day ahead of the official numbers in Panama. In order to keep Panama consistent with other countries, the X axis of our charts represent the dates on which the cases were reported rather than discovered.";
            break;
        case "NL":
            t = "The Dutch government does not regularly report recoveries. It does NOT mean that nobody in the Netherlands has recovered. We simply don't have the data.";
            break;
        case "RU":
            t = "Historical data for Russia as a nation starts on January 30th, but regional data starts from April 7th only.";
            break;
        case "MX":
            t = "We retrieve total cases and deaths from the first source listed above and recoveries from the second one. These figures may differ from the official data provided by the Mexican government.";
            break;
        case "BE":
            t = 'You can download the complete dataset of the Belgian Institute for Health <a href="https://epistat.sciensano.be/Data/COVID19BE.xlsx" target="_blank">here.';
            break;
        case "EC":
            t = 'On May 7th, Ecuador decreased its case count from 31,881 to 29,420 after duplicate records were identified (<a href="https://www.elcomercio.com/actualidad/gobierno-ecuador-variacion-cifras-covid19.html" target="_blank">source</a>). On May 9th, Ecuador decreased its case count from 30,298 to 28,818, after a new reporting system that ties cases with citizens\' ID number was introduced. (<a href="https://www.salud.gob.ec/variacion-en-casos-por-reclasificacion/" target="_blank">source</a>)';
            break;
        case "LU":
            t = "Our figures may look one day ahead of those displayed on the reporting site of the Luxembourg government. In order to be consistent with all other countries, the horizontal axis of all our charts always represents the date <i>on which</i> numbers are reported, rather than the date <i>for which</i> numbers are reported."
    }
    return t
}
function ce() {
    this.get = function () {
        return new Promise(function (e, t) {
            navigator.geolocation && navigator.geolocation.getCurrentPosition(function (t) {
                return e({
                    latitude: t.coords.latitude,
                    longitude: t.coords.longitude
                })
            }, function () {
                return e(null)
            })
        }
        )
    }
}
function de(e) {
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", n = "", i = 0; i < e; i++)
        n += t.substr(Math.floor(Math.random() * t.length), 1);
    return n
}
function ue() {
    this.set = function (e, t, n) {
        var i = new Date;
        i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
        var a = "expires=" + i.toUTCString();
        document.cookie = e + "=" + t + ";" + a + ";path=/"
    }
        ,
        this.get = function (e) {
            for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), i = 0; i < n.length; i++) {
                for (var a = n[i]; " " == a.charAt(0);)
                    a = a.substring(1);
                if (0 == a.indexOf(t))
                    return a.substring(t.length, a.length)
            }
            return ""
        }
}
function pe(e) {
    switch (e) {
        case "w":
            return {
                n: "Worldometers",
                l: "https://www.worldometers.info/coronavirus"
            }
    }
}
function he() {
    let e = this;
    this.initialized = !1,
        this.list = [{
            name: "Afghanistan",
            code: "AF",
            sources: [{
                n: "Ministry of Public Health",
                l: "https://moph.gov.af/en/covid-19-pandemic"
            }, pe("w")]
        }, {
            name: "Aland Islands",
            code: "AX"
        }, {
            name: "Albania",
            code: "AL",
            sources: [{
                n: "Agjencia Kombëtare e Shoqerisë së Informacionit",
                l: "https://coronavirus.al/"
            }, pe("w")]
        }, {
            name: "Algeria",
            code: "DZ",
            sources: [{
                n: "Algeria COVID-19 Tracker",
                l: "https://dz-covid19.com/"
            }, pe("w")]
        }, {
            name: "American Samoa",
            code: "AS"
        }, {
            name: "Andorra",
            code: "AD",
            sources: [{
                n: "Govern d'Andorra",
                l: "https://www.govern.ad/coronavirus"
            }, pe("w")]
        }, {
            name: "Angola",
            code: "AO",
            sources: [{
                n: "Governo de Angola",
                l: "http://www.governo.gov.ao/"
            }, pe("w")]
        }, {
            name: "Anguilla",
            code: "AI",
            sources: [{
                n: "The Anguillian Response",
                l: "https://beatcovid19.ai/"
            }, pe("w")]
        }, {
            name: "Antarctica",
            code: "AQ"
        }, {
            name: "Antigua and Barbuda",
            code: "AG",
            sources: [{
                n: "ABS Television/Radio",
                l: "https://www.facebook.com/abstvradio/"
            }, pe("w")]
        }, {
            name: "Argentina",
            code: "AR",
            longitude: -63.6167,
            latitude: -38.4161,
            sources: [{
                n: "Ministerio de Salud",
                l: "https://www.argentina.gob.ar/salud/coronavirus-COVID-19"
            }, pe("w")]
        }, {
            name: "Armenia",
            code: "AM",
            sources: [{
                n: "Armenian government",
                l: "https://ncdc.am/coronavirus/confirmed-cases-by-days/"
            }, pe("w")]
        }, {
            name: "Aruba",
            code: "AW",
            sources: [{
                n: "Gobierno di Aruba",
                l: "https://www.arubacovid19.org/"
            }, pe("w")]
        }, {
            name: "Australia",
            code: "AU",
            pop: 246e5,
            sources: [{
                n: "Australian Department of Health",
                l: "https://www.health.gov.au/news/health-alerts/novel-coronavirus-2019-ncov-health-alert/coronavirus-covid-19-current-situation-and-case-numbers"
            }, {
                n: "Johns-Hopkins University, CSSE",
                l: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
            }, {
                n: "",
                l: "https://covid-19.wileam.com/"
            }],
            longitude: 133.7751,
            latitude: -25.2744,
            zoom: 4
        }, {
            name: "Austria",
            code: "AT",
            sources: [{
                n: "Bundesministerium Gesundheit",
                l: "https://www.sozialministerium.at/Informationen-zum-Coronavirus.html"
            }, pe("w")]
        }, {
            name: "Azerbaijan",
            code: "AZ",
            sources: [{
                n: "KoronaVirus Info",
                l: "https://koronavirusinfo.az/az"
            }, pe("w")]
        }, {
            name: "Bahamas",
            code: "BS",
            sources: [{
                n: "The Government of the Bahamas",
                l: "http://www.bahamas.gov.bs/"
            }, pe("w")]
        }, {
            name: "Bahrain",
            code: "BH",
            sources: [{
                n: "Ministry of Health",
                l: "https://www.moh.gov.bh/COVID19/News"
            }, pe("w")]
        }, {
            name: "Bangladesh",
            code: "BD",
            sources: [{
                n: "Bangladesh Computer Council",
                l: "http://covid19tracker.gov.bd/"
            }, pe("w")]
        }, {
            name: "Barbados",
            code: "BB",
            sources: [{
                n: "Government Information Service",
                l: "https://gisbarbados.gov.bb/covid-19/"
            }, pe("w")]
        }, {
            name: "Belarus",
            code: "BY",
            longitude: 27.953388,
            latitude: 53.709808,
            sources: [{
                n: "Belarus government",
                l: "http://stopcovid.belta.by/"
            }, pe("w")]
        }, {
            name: "Belgium",
            code: "BE",
            longitude: 4.4699,
            latitude: 50.5039,
            zoom: 6,
            pop: 1146e4,
            sources: [{
                n: "Sciensano (Belgian Institute for Health)",
                l: "https://epistat.wiv-isp.be/covid/"
            }]
        }, {
            name: "Belize",
            code: "BZ",
            sources: [{
                n: "Breaking Belize News",
                l: "https://www.breakingbelizenews.com/"
            }, pe("w")]
        }, {
            name: "Benin",
            code: "BJ",
            sources: [{
                n: "Gouvernement du Bénin",
                l: "https://www.gouv.bj/coronavirus/"
            }, pe("w")]
        }, {
            name: "Bermuda",
            code: "BM",
            sources: [{
                n: "The Government of Bermuda",
                l: "https://www.facebook.com/BermudaGovernment/"
            }, pe("w")]
        }, {
            name: "Bhutan",
            code: "BT",
            sources: [{
                n: "Ministry of Health",
                l: "https://www.facebook.com/MoHBhutan/"
            }, pe("w")]
        }, {
            name: "Bolivia",
            code: "BO",
            sources: [{
                n: "Gobierno de Bolivia",
                l: "https://www.boliviasegura.gob.bo/"
            }, pe("w")]
        }, {
            name: "Bosnia and Herzegovina",
            code: "BA",
            sources: [{
                n: "Government of Bosnia and Herzegovina",
                l: "https://covid-19.ba/"
            }, pe("w")]
        }, {
            name: "Botswana",
            code: "BW",
            sources: [{
                n: "Gov.bw",
                l: "https://www.gov.bw/COVID-19"
            }, pe("w")]
        }, {
            name: "Bouvet Island",
            code: "BV"
        }, {
            name: "Brazil",
            code: "BR",
            longitude: -51.9253,
            latitude: -14.235,
            zoom: 4,
            pop: 2095e5,
            sources: [{
                n: "Ministério da Saúde",
                l: "https://covid.saude.gov.br/"
            }]
        }, {
            name: "British Indian Ocean Territory",
            code: "IO"
        }, {
            name: "Brunei Darussalam",
            code: "BN"
        }, {
            name: "Bulgaria",
            code: "BG",
            sources: [{
                n: "Government of Bulgaria",
                l: "https://coronavirus.bg/"
            }, pe("w")]
        }, {
            name: "Burkina Faso",
            code: "BF",
            sources: [{
                n: "Ministère de la Santé",
                l: "https://www.facebook.com/Minist%C3%A8re-de-la-Sant%C3%A9-Burkina-Faso-1444809365833949"
            }, pe("w")]
        }, {
            name: "Burundi",
            code: "BI",
            sources: [{
                n: "MSPLS",
                l: "https://twitter.com/mspls_bdi"
            }, pe("w")]
        }, {
            name: "Cambodia",
            code: "KH",
            sources: [{
                n: "Ministry of Health",
                l: "http://www.cdcmoh.gov.kh/"
            }, pe("w")]
        }, {
            name: "Cameroon",
            code: "CM",
            sources: [{
                n: "Ministère de la Santé Publique",
                l: "https://www.minsante.cm/site/?q=fr"
            }, pe("w")]
        }, {
            name: "Canada",
            pop: 3759e4,
            sources: [{
                n: "Government of Canada",
                l: "https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html"
            }, {
                n: "Johns-Hopkins University, CSSE",
                l: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
            }],
            code: "CA",
            longitude: -97.3468,
            latitude: 52.1304,
            zoom: 4
        }, {
            name: "Cape Verde",
            code: "CV"
        }, {
            name: "Caribbean Netherlands",
            code: "BQ"
        }, {
            name: "Cayman Islands",
            code: "KY"
        }, {
            name: "Central African Republic",
            code: "CF"
        }, {
            name: "Chad",
            code: "TD",
            sources: [{
                n: "Ministère de la Santé Publique",
                l: "https://www.facebook.com/ministeresantetchad/"
            }, pe("w")]
        }, {
            name: "Chile",
            code: "CL",
            sources: [{
                n: "Ministerio de Salud del Gobierno de Chile",
                l: "https://www.gob.cl/coronavirus/cifrasoficiales/"
            }],
            longitude: -71.543,
            latitude: -35.6751,
            pop: 1805e4,
            zoom: 4
        }, {
            name: "China",
            sources: [{
                n: "DXY",
                l: "https://ncov.dxy.cn/ncovh5/view/pneumonia"
            }],
            code: "CN",
            pop: 1386e6,
            longitude: 110.1954,
            latitude: 32.8617,
            zoom: 4
        }, {
            name: "Christmas Island",
            code: "CX"
        }, {
            name: "Cocos (Keeling) Islands",
            code: "CC",
            sources: [{
                n: "Department of Health",
                l: "https://shire.cc/en/ckicovid19.html"
            }, pe("w")]
        }, {
            name: "Colombia",
            code: "CO",
            longitude: -74.2973,
            latitude: 4.5709,
            sources: [{
                n: "Ministerio de Salud y Protección Social",
                l: "https://www.ins.gov.co/Noticias/Paginas/Coronavirus.aspx"
            }],
            zoom: 4,
            pop: 4907e4
        }, {
            name: "Comoros",
            code: "KM",
            sources: [{
                n: "Union des Comores",
                l: "https://stopcoronavirus.km/"
            }, pe("w")]
        }, {
            name: "Congo",
            code: "CG"
        }, {
            name: "DR Congo",
            code: "CD"
        }, {
            name: "Cook Islands",
            code: "CK",
            sources: [{
                n: "Ministry of Health",
                l: "https://cookislands.travel/news/novel-coronavirus-information-travellers-arriving-cook-islands"
            }, pe("w")]
        }, {
            name: "Costa Rica",
            code: "CR",
            sources: [{
                n: "Ministerio de Salud",
                l: "https://twitter.com/msaludcr"
            }]
        }, {
            name: "Cote D'Ivoire",
            code: "CI",
            sources: [{
                n: "Ministère de la Santé et de l'Hygiène Publique",
                l: "https://www.facebook.com/pg/Mshpci/posts/"
            }, pe("w")]
        }, {
            name: "Croatia",
            code: "HR",
            sources: [{
                n: "Republika Hrvatska, Ministarstvo zdravstva",
                l: "https://www.koronavirus.hr/"
            }]
        }, {
            name: "Curaçao",
            code: "CW",
            sources: [{
                n: "Government of Curaçao",
                l: "https://gobiernu.cw/"
            }, pe("w")]
        }, {
            name: "Cuba",
            code: "CU",
            sources: [{
                n: "Infomed",
                l: "https://temas.sld.cu/coronavirus/covid-19/"
            }, pe("w")]
        }, {
            name: "Cyprus",
            code: "CY",
            sources: [{
                n: "Cyprus government",
                l: "https://www.covid19.cy/"
            }, pe("w")]
        }, {
            name: "Czechia",
            code: "CZ",
            language: "Čeština",
            longitude: 15.473,
            latitude: 49.8175,
            sources: [{
                n: "Ministerstvo zdravotnictví České republiky",
                l: "https://onemocneni-aktualne.mzcr.cz/covid-19"
            }, pe("w")]
        }, {
            name: "Denmark",
            code: "DK",
            sources: [{
                n: "Statens Serum Institut",
                l: "https://www.ssi.dk/aktuelt/sygdomsudbrud/coronavirus"
            }, pe("w")]
        }, {
            name: "Djibouti",
            code: "DJ",
            sources: [{
                n: "Ministere de la Santé de Djibouti",
                l: "https://www.facebook.com/minister.sante.dj"
            }, pe("w")]
        }, {
            name: "Dominica",
            code: "DM",
            sources: [{
                n: "Government of Dominica",
                l: "http://dominica.gov.dm/corona"
            }, pe("w")]
        }, {
            name: "Dominican Republic",
            code: "DO",
            sources: [{
                n: "Ministerio de Salud Publica",
                l: "http://digepisalud.gob.do/"
            }, pe("w")]
        }, {
            name: "Ecuador",
            code: "EC",
            sources: [{
                n: "Ministerio de Salud Pública",
                l: "https://public.tableau.com/profile/publicaciones.dneais.msp#!/vizhome/COVID19ecu_MSP_15866333883550/COVID-19MSP"
            }, pe("w")]
        }, {
            name: "Egypt",
            code: "EG",
            longitude: 30.8025,
            latitude: 26.8206,
            sources: [{
                n: "Egyptian government",
                l: "https://www.facebook.com/egypt.mohp"
            }, pe("w")]
        }, {
            name: "El Salvador",
            code: "SV",
            sources: [{
                n: "Gobierno de El Salvador",
                l: "https://covid19.gob.sv/"
            }, pe("w")]
        }, {
            name: "Equatorial Guinea",
            code: "GQ",
            sources: [{
                n: "AhoraEG",
                l: "https://ahoraeg.com/evolucion-del-covid-19/"
            }, pe("w")]
        }, {
            name: "Eritrea",
            code: "ER",
            sources: [{
                n: "Ministry of Information",
                l: "http://www.shabait.com/"
            }, pe("w")]
        }, {
            name: "Estonia",
            code: "EE",
            sources: [{
                n: "Republic of Estonia Health Board",
                l: "https://koroonakaart.ee/en"
            }, pe("w")]
        }, {
            name: "Ethiopia",
            code: "ET",
            sources: [{
                n: "Tena.et",
                l: "https://tena.et/update"
            }, pe("w")]
        }, {
            name: "Falkland Islands",
            code: "FK",
            sources: [{
                n: "Falkland Islands Government",
                l: "https://fig.gov.fk/covid-19"
            }, pe("w")]
        }, {
            name: "Faroe Islands",
            code: "FO",
            sources: [{
                n: "Government of the Faroe Islands",
                l: "https://corona.fo/"
            }, pe("w")]
        }, {
            name: "Fiji",
            code: "FJ",
            sources: [{
                n: "Ministry of Health",
                l: "http://www.health.gov.fj/"
            }, pe("w")]
        }, {
            name: "Finland",
            code: "FI",
            sources: [{
                n: "THL/Tartuntatautirekisteri",
                l: "https://experience.arcgis.com/experience/d40b2aaf08be4b9c8ec38de30b714f26"
            }, pe("w")]
        }, {
            name: "France",
            code: "FR",
            pop: 6699e4,
            language: "Français",
            longitude: 2.693317,
            latitude: 46.565366,
            zoom: 5,
            sources: [{
                n: "Agence nationale de santé publique",
                l: "https://dashboard.covid19.data.gouv.fr/"
            }, {
                n: "FranceInfo",
                l: "https://la1ere.francetvinfo.fr/"
            }]
        }, {
            name: "French Polynesia",
            code: "PF",
            sources: [{
                n: "Gouvernement de la Polynésie française",
                l: "https://www.presidence.pf/"
            }, pe("w")]
        }, {
            name: "Gabon",
            code: "GA",
            sources: [{
                n: "Gouvernement du Gabon",
                l: "https://infocovid.ga/"
            }, pe("w")]
        }, {
            name: "Gambia",
            code: "GM",
            sources: [{
                n: "Ministry of Health",
                l: "https://www.facebook.com/MohCovid19GMB"
            }, pe("w")]
        }, {
            name: "Georgia",
            code: "GE",
            sources: [{
                n: "StopCov.ge",
                l: "https://stopcov.ge/"
            }, pe("w")]
        }, {
            name: "Germany",
            pop: 8279e4,
            code: "DE",
            language: "Deutsch",
            sources: [{
                n: "Zeit.de",
                l: "https://www.zeit.de/wissen/gesundheit/2020-03/coronavirus-deutschland-infektionen-faelle-verbreitung-epidemie-karte"
            }],
            longitude: 10.451526,
            latitude: 51.165691,
            zoom: 5
        }, {
            name: "Ghana",
            code: "GH",
            sources: [{
                n: "Ghana Health Service",
                l: "https://www.ghanahealthservice.org/covid19/"
            }, pe("w")]
        }, {
            name: "Gibraltar",
            code: "GI",
            sources: [{
                n: "Public Health Gibraltar",
                l: "https://healthygibraltar.org/infections/infection-facts/wuhan-novel-coronavirus/"
            }, pe("w")]
        }, {
            name: "Greece",
            code: "GR",
            language: "ελληνικά",
            longitude: 21.8243,
            latitude: 39.0742,
            sources: [{
                n: "GovGr",
                l: "https://covid19.gov.gr/covid19-live-analytics/"
            }, pe("w")]
        }, {
            name: "Greenland",
            code: "GL",
            sources: [{
                n: "Nun.gl",
                l: "https://nun.gl/Emner/Borgere/Coronavirus_emne/Foelg_smittespredningen"
            }, pe("w")]
        }, {
            name: "Grenada",
            code: "GD",
            sources: [{
                n: "GIS",
                l: "https://www.facebook.com/GISgrenada/"
            }, pe("w")]
        }, {
            name: "Guatemala",
            code: "GT",
            sources: [{
                n: "Ministerio de Salud",
                l: "https://twitter.com/MinSaludGuate"
            }, pe("w")]
        }, {
            name: "Guernsey",
            code: "GG",
            sources: [{
                n: "Gov.gg",
                l: "https://covid19.gov.gg/test-results"
            }]
        }, {
            name: "Guinea",
            code: "GN",
            sources: [{
                n: "Agence nationale de sécurité sanitaire",
                l: "https://anss-guinee.org/"
            }, pe("w")]
        }, {
            name: "Guinea-Bissau",
            code: "GW"
        }, {
            name: "Guyana",
            code: "GY"
        }, {
            name: "Haiti",
            code: "HT",
            sources: [{
                n: "Ministère de la Santé Publique et de la Population",
                l: "https://mspp.gouv.ht/"
            }, pe("w")]
        }, {
            name: "Heard Island and Mcdonald Islands",
            code: "HM"
        }, {
            name: "Holy See",
            code: "VA",
            sources: [{
                n: "Vatican News",
                l: "https://www.vaticannews.va/en/events/covid-19.html"
            }, pe("w")]
        }, {
            name: "Honduras",
            code: "HN",
            sources: [{
                n: "Estadística Nacional de Coronavirus",
                l: "https://covid19honduras.org/"
            }, pe("w")]
        }, {
            name: "Hong Kong",
            code: "HK",
            sources: [{
                n: "Hong-Kong Government",
                l: "https://www.coronavirus.gov.hk/"
            }, pe("w")]
        }, {
            name: "Hungary",
            code: "HU",
            language: "Magyar",
            longitude: 19.5033,
            latitude: 47.1625,
            sources: [{
                n: "Gov.hu",
                l: "https://koronavirus.gov.hu/"
            }, pe("w")]
        }, {
            name: "Iceland",
            code: "IS",
            sources: [{
                n: "Embætti landlæknis og Almannavarnadeild ríkislögreglustjóra",
                l: "https://www.covid.is/tolulegar-upplysingar"
            }, pe("w")]
        }, {
            name: "India",
            code: "IN",
            pop: 1339e6,
            longitude: 78.9629,
            latitude: 20.5937,
            zoom: 4,
            sources: [{
                n: "COVID-19 Tracker India",
                l: "https://www.covid19india.org/"
            }, {
                n: "Ministry of Health & Family Welfare",
                l: "https://www.mohfw.gov.in/"
            }]
        }, {
            name: "Indonesia",
            code: "ID",
            sources: [{
                n: "Ministry of Health, Indonesia",
                l: "https://covid19.go.id/"
            }, pe("w")]
        }, {
            name: "Iran",
            code: "IR",
            longitude: 53.688046,
            latitude: 32.42791,
            sources: [{
                n: "The Islamic Republic News Agency",
                l: "https://www.irna.ir/"
            }, pe("w")]
        }, {
            name: "Iraq",
            code: "IQ",
            longitude: 43.6793,
            latitude: 33.2232,
            sources: [{
                n: "Iraqi Ministry of Health",
                l: "https://www.facebook.com/MOH.GOV.IQ/"
            }, pe("w")]
        }, {
            name: "Ireland",
            code: "IE",
            sources: [{
                n: "Government of Ireland",
                l: "https://geohive.maps.arcgis.com/apps/opsdashboard/index.html#/29dc1fec79164c179d18d8e53df82e96"
            }, pe("w")]
        }, {
            name: "Isle of Man",
            code: "IM",
            sources: [{
                n: "Isle of Man Government",
                l: "https://covid19.gov.im/"
            }, pe("w")]
        }, {
            name: "Israel",
            code: "IL",
            sources: [{
                n: "Ministry of Health",
                l: "https://govextra.gov.il/ministry-of-health/corona/corona-virus-en/"
            }, pe("w")]
        }, {
            name: "Italy",
            sources: [{
                n: "Presidenza del Consiglio dei Ministri, Dipartimento Della Protezione Civile",
                l: "http://opendatadpc.maps.arcgis.com/apps/opsdashboard/index.html#/b0c68bce2cce478eaac82fe38d4138b1"
            }],
            code: "IT",
            pop: 6048e4,
            language: "Italiano",
            longitude: 12.5674,
            latitude: 41.8719,
            zoom: 5
        }, {
            name: "Jamaica",
            code: "JM"
        }, {
            name: "Japan",
            code: "JP",
            longitude: 138.25293,
            latitude: 36.204823,
            zoom: 5,
            sources: [{
                n: "Covid19Japan",
                l: "https://covid19japan.com/"
            }, pe("w")]
        }, {
            name: "Jersey",
            code: "JE",
            sources: [{
                n: "Gov.je",
                l: "https://www.gov.je/Health/Coronavirus/Pages/CoronavirusCases.aspx"
            }]
        }, {
            name: "Jordan",
            code: "JO"
        }, {
            name: "Kazakhstan",
            code: "KZ",
            sources: [{
                n: "Ministry of Health",
                l: "https://www.coronavirus2020.kz/kz"
            }, pe("w")]
        }, {
            name: "Kenya",
            code: "KE"
        }, {
            name: "Kiribati",
            code: "KI"
        }, {
            name: "North Korea",
            code: "KP",
            language: "한국어"
        }, {
            name: "South Korea",
            code: "KR",
            language: "한국어",
            longitude: 126.99778,
            latitude: 37.568291,
            sources: [{
                n: "Central Disease Control Headquarters",
                l: "http://ncov.mohw.go.kr/en"
            }, pe("w")]
        }, {
            name: "Kosovo",
            code: "XK",
            sources: [{
                n: "Republic of Kosovo - Ministry of Health",
                l: "https://kosova.health/en/"
            }]
        }, {
            name: "Kuwait",
            code: "KW",
            sources: [{
                n: "State of Kuwait",
                l: "https://corona.e.gov.kw/En/"
            }, pe("w")]
        }, {
            name: "Kyrgyzstan",
            code: "KG",
            sources: [{
                n: "Ministry of Health of the Kyrgyz Republic",
                l: "http://www.med.kg/"
            }, pe("w")]
        }, {
            name: "Laos",
            code: "LA"
        }, {
            name: "Latvia",
            code: "LV",
            sources: [{
                n: "Veselības ministrija",
                l: "https://covid19.gov.lv/"
            }, pe("w")]
        }, {
            name: "Lebanon",
            code: "LB",
            sources: [{
                n: "Government of Lebanon ",
                l: "https://www.lebanoninfocenter.eu.org/quick-lebanon-info/novel-coronavirus-2019-covid-19/"
            }, pe("w")]
        }, {
            name: "Lesotho",
            code: "LS"
        }, {
            name: "Liberia",
            code: "LR"
        }, {
            name: "Libya",
            code: "LY"
        }, {
            name: "Liechtenstein",
            code: "LI"
        }, {
            name: "Lithuania",
            code: "LT",
            sources: [{
                n: "Government of the Republic of Lithuania",
                l: "https://koronastop.lrv.lt/en/"
            }, pe("w")]
        }, {
            name: "Luxembourg",
            code: "LU",
            sources: [{
                n: "Luxembourg government",
                l: "http://www.covid19.lu/"
            }, pe("w")]
        }, {
            name: "Macao",
            code: "MO"
        }, {
            name: "Macedonia",
            code: "MK",
            sources: [{
                n: "Владата на Република Северна Македонија",
                l: "https://koronavirus.gov.mk/"
            }, pe("w")]
        }, {
            name: "Madagascar",
            code: "MG"
        }, {
            name: "Malawi",
            code: "MW"
        }, {
            name: "Malaysia",
            code: "MY",
            longitude: 101.9758,
            latitude: 4.2105,
            sources: [{
                n: "Ministry Of Health for Malaysia",
                l: "http://covid-19.moh.gov.my/"
            }, pe("w")]
        }, {
            name: "Maldives",
            code: "MV",
            sources: [{
                n: "Ministry of Health",
                l: "https://covid19.health.gov.mv/dashboard"
            }, pe("w")]
        }, {
            name: "Mali",
            code: "ML"
        }, {
            name: "Malta",
            code: "MT",
            sources: [{
                n: "Government of Malta",
                l: "https://covid19malta.info/"
            }, pe("w")]
        }, {
            name: "Marshall Islands",
            code: "MH"
        }, {
            name: "Mauritania",
            code: "MR"
        }, {
            name: "Mauritius",
            code: "MU"
        }, {
            name: "Mexico",
            code: "MX",
            pop: 1292e5,
            longitude: -102.552788,
            latitude: 23.634501,
            zoom: 4,
            sources: [{
                n: "IIGEA A.C.",
                l: "https://iigeamx.maps.arcgis.com/apps/opsdashboard/index.html#/3fdd85b0db24466e9783e2c16e40265e"
            }, pe("w")]
        }, {
            name: "Micronesia",
            code: "FM"
        }, {
            name: "Moldova",
            code: "MD",
            sources: [{
                n: "Agenția Națională pentru Sănătate Publică",
                l: "https://ansp.md/index.php/category/actualizarea-situatiei-privind-coronavirus/"
            }, pe("w")]
        }, {
            name: "Monaco",
            code: "MC",
            sources: [{
                n: "Government of Monaco",
                l: "https://covid19.mc/en/"
            }, pe("w")]
        }, {
            name: "Mongolia",
            code: "MN"
        }, {
            name: "Montenegro",
            code: "ME"
        }, {
            name: "Montserrat",
            code: "MS",
            sources: [{
                n: "Gov.ms",
                l: "http://www.gov.ms/"
            }, pe("w")]
        }, {
            name: "Morocco",
            code: "MA",
            sources: [{
                n: "Ministry of Health",
                l: "http://www.covidmaroc.ma/"
            }, pe("w")]
        }, {
            name: "Mozambique",
            code: "MZ"
        }, {
            name: "Myanmar",
            code: "MM"
        }, {
            name: "Namibia",
            code: "NA"
        }, {
            name: "Nauru",
            code: "NR"
        }, {
            name: "Nepal",
            code: "NP"
        }, {
            name: "Netherlands",
            code: "NL",
            longitude: 5.2913,
            latitude: 52.1326,
            zoom: 5,
            sources: [{
                n: "Rijksinstituut voor Volksgezondheid en Milieu",
                l: "https://www.rivm.nl/nieuws/actuele-informatie-over-coronavirus"
            }, pe("w")]
        }, {
            name: "New Caledonia",
            code: "NC"
        }, {
            name: "New Zealand",
            code: "NZ",
            sources: [{
                n: "Ministry of Health",
                l: "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases"
            }, pe("w")]
        }, {
            name: "Nicaragua",
            code: "NI"
        }, {
            name: "Niger",
            code: "NE"
        }, {
            name: "Nigeria",
            code: "NG",
            sources: [{
                n: "Nigeria Center for Disease Control",
                l: "https://covid19.ncdc.gov.ng/"
            }, pe("w")]
        }, {
            name: "Niue",
            code: "NU"
        }, {
            name: "Norfolk Island",
            code: "NF"
        }, {
            name: "Norway",
            code: "NO",
            longitude: 8.4689,
            latitude: 60.472,
            sources: [pe("w"), {
                n: "vg.no",
                l: "https://www.vg.no/spesial/2020/corona/"
            }]
        }, {
            name: "Oman",
            code: "OM",
            sources: [{
                n: "Ministry of Health, Sultanate of Oman",
                l: "https://covid19.moh.gov.om/#/home"
            }, pe("w")]
        }, {
            name: "Pakistan",
            code: "PK",
            sources: [{
                n: "Government of Pakistan",
                l: "http://covid.gov.pk/"
            }, pe("w")]
        }, {
            name: "Palau",
            code: "PW"
        }, {
            name: "Palestine",
            code: "PS"
        }, {
            name: "Panama",
            code: "PA",
            sources: [{
                n: "Autoridad Nacional para la Innovación Gubernamental",
                l: "https://geosocial.maps.arcgis.com/apps/opsdashboard/index.html#/2c6e932c690d467b85375af52b614472"
            }, {
                l: "https://yomeinformopma.org/",
                n: "Ministerio de Salud"
            }]
        }, {
            name: "Papua New Guinea",
            code: "PG"
        }, {
            name: "Paraguay",
            code: "PY",
            sources: [{
                n: "Ministerio de Salud Pública y Bienestar Social del Paraguay",
                l: "https://www.mspbs.gov.py/covid-19.php"
            }]
        }, {
            name: "Peru",
            code: "PE",
            sources: [{
                n: "Ministerio de Salud",
                l: "https://www.gob.pe/8662"
            }]
        }, {
            name: "Philippines",
            code: "PH",
            sources: [{
                n: "Gov.ph",
                l: "http://www.covid19.gov.ph/"
            }, pe("w")]
        }, {
            name: "Pitcairn",
            code: "PN"
        }, {
            name: "Poland",
            language: "Polski",
            code: "PL",
            longitude: 19.1451,
            latitude: 51.9194,
            pop: 3797e4,
            zoom: 5,
            sources: [{
                n: "Ministerstwo Zdrowia",
                l: "https://www.arcgis.com/apps/opsdashboard/index.html#/deaceebc69a3412c8b7699e3e025e213"
            }]
        }, {
            name: "Portugal",
            language: "Português",
            code: "PT",
            longitude: -8.2245,
            latitude: 39.4,
            zoom: 5,
            pop: 1028e4,
            sources: [{
                n: "Ministério da Saúde",
                l: "https://covid19.min-saude.pt/ponto-de-situacao-atual-em-portugal/"
            }]
        }, {
            name: "Qatar",
            code: "QA",
            sources: [{
                n: "Ministry of Public Health",
                l: "https://www.moph.gov.qa/english/Pages/Coronavirus2019.aspx/"
            }, pe("w")]
        }, {
            name: "Romania",
            code: "RO",
            sources: [{
                n: "Government of Romania",
                l: "https://stirioficiale.ro/informatii"
            }, pe("w")]
        }, {
            name: "Russia",
            code: "RU",
            language: "Русский",
            longitude: 53.3,
            latitude: 56.34,
            pop: 1445e5,
            zoom: 4,
            sources: [{
                n: "Government of Russia",
                l: "https://xn--80aesfpebagmfblc0a.xn--p1ai/"
            }]
        }, {
            name: "Rwanda",
            code: "RW"
        }, {
            name: "Saint Helena",
            code: "SH",
            sources: [{
                n: "St Helena Government",
                l: "https://www.sainthelena.gov.sh/"
            }, pe("w")]
        }, {
            name: "Saint Kitts and Nevis",
            code: "KN"
        }, {
            name: "Saint Lucia",
            code: "LC"
        }, {
            name: "Saint Pierre and Miquelon",
            code: "PM",
            sources: [{
                n: "Préfet de Saint-Pierre et Miquelon",
                l: "http://www.saint-pierre-et-miquelon.gouv.fr/Publications/Coronavirus-Covid-19"
            }, pe("w")]
        }, {
            name: "Saint Vincent and the Grenadines",
            code: "VC"
        }, {
            name: "Samoa",
            code: "WS"
        }, {
            name: "San Marino",
            code: "SM"
        }, {
            name: "Sao Tome and Principe",
            code: "ST"
        }, {
            name: "Saudi Arabia",
            code: "SA",
            longitude: 45.0792,
            latitude: 23.8859,
            sources: [{
                n: "Saudi Ministry of Health",
                l: "https://twitter.com/SaudiMOH/"
            }, pe("w")]
        }, {
            name: "Senegal",
            code: "SN",
            sources: [{
                n: "Ministère de la Santé et de l'Action Sociale",
                l: "http://www.sante.gouv.sn/"
            }, pe("w")]
        }, {
            name: "Serbia",
            code: "RS",
            sources: [{
                n: "Serbian government",
                l: "https://covid19.rs/"
            }, pe("w")]
        }, {
            name: "Seychelles",
            code: "SC"
        }, {
            name: "Sierra Leone",
            code: "SL"
        }, {
            name: "Sint Maarten",
            code: "SX"
        }, {
            name: "Singapore",
            code: "SG",
            longitude: 103.8198,
            latitude: 1.3521,
            sources: [{
                n: "Ministry of Health, Singapore",
                l: "https://www.moh.gov.sg/covid-19"
            }, pe("w")]
        }, {
            name: "Slovakia",
            code: "SK",
            sources: [{
                n: "Gov.sk",
                l: "https://korona.gov.sk/"
            }, pe("w")]
        }, {
            name: "Slovenia",
            code: "SI",
            sources: [{
                n: "Gov.si",
                l: "https://www.gov.si/teme/koronavirus/"
            }, pe("w")]
        }, {
            name: "Solomon Islands",
            code: "SB"
        }, {
            name: "Somalia",
            code: "SO",
            sources: [{
                n: "Somali Government",
                l: "https://twitter.com/SomaliaCovid19"
            }, pe("w")]
        }, {
            name: "South Africa",
            code: "ZA",
            sources: [{
                n: "Department of Health",
                l: "https://sacoronavirus.co.za/"
            }, pe("w")]
        }, {
            name: "South Georgia and the South Sandwich Islands",
            code: "GS"
        }, {
            name: "Spain",
            code: "ES",
            language: "Español",
            longitude: -3.7492,
            latitude: 40.4637,
            sources: [{
                l: "https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/situacionActual.htm",
                n: "Gobierno de España, Ministerio de Sanidad"
            }],
            zoom: 5,
            pop: 4694e4
        }, {
            name: "Sri Lanka",
            code: "LK",
            sources: [{
                n: "Ministry of Health",
                l: "http://www.epid.gov.lk/"
            }, pe("w")]
        }, {
            name: "Sudan",
            code: "SD",
            sources: [{
                n: "Federal Ministry of Health",
                l: "https://twitter.com/FMOH_SUDAN"
            }, pe("w")]
        }, {
            name: "South Sudan",
            code: "SS"
        }, {
            name: "Suriname",
            code: "SR"
        }, {
            name: "Svalbard and Jan Mayen",
            code: "SJ"
        }, {
            name: "Swaziland",
            code: "SZ"
        }, {
            name: "Sweden",
            code: "SE",
            longitude: 18.6435,
            latitude: 60.1282,
            sources: [{
                n: "Folkhälsomyndigheten",
                l: "https://experience.arcgis.com/experience/09f821667ce64bf7be6f9f87457ed9aa"
            }, pe("w")]
        }, {
            name: "Switzerland",
            code: "CH",
            longitude: 8.2275,
            latitude: 46.8182,
            sources: [{
                n: "Government of Switzerland",
                l: "https://covid-19-schweiz.bagapps.ch/fr-1.html"
            }, pe("w")]
        }, {
            name: "Syrian Arab Republic",
            code: "SY"
        }, {
            name: "Taiwan",
            code: "TW",
            language: "繁體中文",
            longitude: 121.563698,
            latitude: 25.03841,
            zoom: 5,
            sources: [{
                l: "https://www.cdc.gov.tw/",
                n: "Taiwan Centers For Disease Control"
            }]
        }, {
            name: "Tajikistan",
            code: "TJ"
        }, {
            name: "Tanzania, United Republic of",
            code: "TZ"
        }, {
            name: "Thailand",
            code: "TH",
            longitude: 100.992538,
            latitude: 15.870032,
            sources: [{
                n: "Department of Disease Control",
                l: "https://ddc.moph.go.th/viralpneumonia/eng/"
            }, pe("w")]
        }, {
            name: "Timor-Leste",
            code: "TL"
        }, {
            name: "Togo",
            code: "TG"
        }, {
            name: "Tokelau",
            code: "TK"
        }, {
            name: "Tonga",
            code: "TO"
        }, {
            name: "Trinidad and Tobago",
            code: "TT"
        }, {
            name: "Tunisia",
            code: "TN",
            sources: [{
                n: "Ministry of Health",
                l: "https://covid-19.tn/"
            }, pe("w")]
        }, {
            name: "Turkey",
            language: "Türkçe",
            code: "TR",
            longitude: 35.2433,
            latitude: 38.9637,
            sources: [{
                n: "T.C.Sağlık Bakanlığı",
                l: "https://covid19.saglik.gov.tr/"
            }, pe("w")]
        }, {
            name: "Turkmenistan",
            code: "TM"
        }, {
            name: "Turks and Caicos Islands",
            code: "TC"
        }, {
            name: "Tuvalu",
            code: "TV"
        }, {
            name: "Uganda",
            code: "UG"
        }, {
            name: "Ukraine",
            code: "UA",
            sources: [{
                n: "Ministry of Health",
                l: "https://moz.gov.ua/pro-ministerstvo"
            }, pe("w")]
        }, {
            name: "UAE",
            code: "AE",
            longitude: 53.8478,
            latitude: 23.4241,
            sources: [{
                n: "UAE Government",
                l: "https://covid19.ncema.gov.ae/en"
            }, pe("w")]
        }, {
            name: "United Kingdom",
            code: "GB",
            longitude: -1.17432,
            latitude: 52.355518,
            zoom: 5,
            pop: 6665e4,
            sources: [{
                l: "https://coronavirus.data.gov.uk/",
                n: "Public Health England"
            }]
        }, {
            name: "United States",
            pop: 3272e5,
            sources: [pe("w")],
            code: "US",
            longitude: -100.996784,
            latitude: 40.23985,
            zoom: 4
        }, {
            name: "Uruguay",
            code: "UY",
            sources: [{
                n: "Ministerio de Salud Pública",
                l: "https://www.gub.uy/ministerio-salud-publica/coronavirus"
            }, pe("w")]
        }, {
            name: "Uzbekistan",
            code: "UZ",
            sources: [{
                n: "Ministry of Health of Uzbekistan",
                l: "https://coronavirus.uz/uz"
            }, pe("w")]
        }, {
            name: "Vanuatu",
            code: "VU"
        }, {
            name: "Venezuela",
            code: "VE"
        }, {
            name: "Viet Nam",
            code: "VN"
        }, {
            name: "Virgin Islands, British",
            code: "VG"
        }, {
            name: "Wallis and Futuna",
            code: "WF"
        }, {
            name: "Western Sahara",
            code: "EH"
        }, {
            name: "Yemen",
            code: "YE"
        }, {
            name: "Zambia",
            code: "ZM"
        }, {
            name: "Zimbabwe",
            code: "ZW"
        }, {
            name: "Others",
            code: "ZZ"
        }],
        this.findByName = function (t) {
            for (let n = 0; n < e.list.length; n++) {
                if (X(e.list[n].name) === t)
                    return !0
            }
            return null
        }
        ,
        this.getParam = function (t, n) {
            if (!t)
                return null;
            t = t.toUpperCase();
            let i = e.list.find(e => e.code === t);
            return i ? i[n] || "" : null
        }
        ,
        this.flag = function (t, n) {
            if ("EU" === t)
                return e.makeUrl("EU");
            let i = (new F).on;
            return n && !i ? e.makeUrl(t + "-" + n) : e.getParam(t, "flag")
        }
        ,
        this.name = function (t) {
            return e.getParam(t, "name")
        }
        ,
        this.source = function (t) {
            let n = e.getParam(t, "sources");
            return (!n || n.length < 1) && (n = [pe("w")]),
                n
        }
        ,
        this.language = function (t) {
            return e.getParam(t, "language")
        }
        ,
        this.longitude = function (t) {
            return e.getParam(t, "longitude")
        }
        ,
        this.latitude = function (t) {
            return e.getParam(t, "latitude")
        }
        ,
        this.zoom = function (t) {
            return e.getParam(t, "zoom")
        }
        ,
        this.makeUrl = function (e) {
            let t = ["US-PA", "CA-PE", "US-VT", "BR-AL", "US-FL", "US-ME", "US-VA", "US-ID", "BR-RJ", "US-SD", "US-NE", "US-ND", "US-WV", "US-WI", "US-CA", "US-MO", "IT-34", "IT-62", "BR-RS", "US-MN", "US-NJ", "IT-TR", "US-KS", "BR-SC", "US-MA", "US-NV", "ES-AN", "DE-SL", "US-LA", "US-IA", "US-WA", "IT-52", "US-DE", "ES-ML", "US-UT", "US-KY", "US-OK", "US-NH", "BR-RJ"].includes(e) ? "jpg" : "svg";
            return window.location.origin + "/assets/img/flags/" + e + "." + t
        }
        ,
        this.init = function () {
            if (!e.initialized)
                return e.list.forEach(function (t) {
                    t.flag = e.makeUrl(t.code)
                }),
                    e.initialized = !0,
                    e.list
        }
        ,
        this.init()
}
function me(e, t) {
    for (var n in t) {
        if (t[n] && !e[n])
            return !0;
        if (!t[n] && e[n])
            return !0;
        if (typeof t[n] != typeof e[n])
            return !0;
        switch (typeof t[n]) {
            case "string":
            case "boolean":
            case "number":
                if (t[n] !== e[n])
                    return !0;
                break;
            case "object":
                if (null === t[n] && null === e[n])
                    break;
                if (null === t[n] && null !== e[n])
                    return !0;
                if (null === e[n] && null !== e[n])
                    return !0;
                if (t[n] instanceof Array == !1)
                    throw t[n] + " is not valid data";
                if (t[n] instanceof Array && !e[n] instanceof Array)
                    return !0;
                if (e[n] instanceof Array && !t[n] instanceof Array)
                    return !0;
                if (t[n].length !== e[n].length)
                    return !0;
                for (var i = 0; i < t[n].length; i++) {
                    if ("string" != typeof t[n][i] && "number" != typeof t[n][i])
                        throw n + " > " + t[n][i] + " error: properties of data arrays must be strings or numbers";
                    if (!1 === e[n].includes(t[n][i]))
                        return !0
                }
                break;
            default:
                throw t[n] + " is not a valid data type for " + n + " (" + typeof t[n] + ")"
        }
    }
    return !1
}
function fe(e, t, n, i) {
    let a = m.find(t, n);
    if (a)
        return a;
    let o = new Promise(function (a, o) {
        if ("GET" !== e && "POST" !== e)
            return o("the type should be GET or POST");
        let r = {
            "Content-Type": "application/json"
        };
        if (i)
            for (let e in i)
                r[e] = i[e];
        let s = {
            method: e,
            headers: r
        };
        n && (s.body = n ? JSON.stringify(n) : {}),
            fetch(t, s).then(e => {
                if (200 !== e.status && 201 !== e.status)
                    throw e.statusText;
                return e.text()
            }
            ).then(e => {
                let t = null;
                if (e)
                    try {
                        t = JSON.parse(e)
                    } catch (e) {
                        console.log(e)
                    }
                return a(t)
            }
            ).catch(function (e) {
                return console.log(e),
                    o(e)
            })
    }
    );
    return m.register(t, o, n),
        o
}
function ge(e, t, n) {
    let i = document.createElement(e);
    if (t && "object" == typeof t && Array.isArray(t) && t.length > 0)
        t.forEach(function (e) {
            i.classList.add(e)
        });
    else if (t && "string" == typeof t) {
        t.split(" ").forEach(function (e) {
            i.classList.add(e)
        })
    } else
        t && "object" == typeof t && (n = t);
    if (n && "object" == typeof n)
        for (let e in n)
            switch (e) {
                case "text":
                    i.textContent = n[e];
                    break;
                case "textId":
                    i.textContent = A(n[e]);
                    break;
                case "html":
                    i.innerHTML = n[e];
                    break;
                case "classes":
                    n[e].forEach(function (e) {
                        i.classList.add(e)
                    });
                    break;
                case "class":
                    i.classList.add(c);
                    break;
                case "background":
                    i.style.background = n[e];
                    break;
                case "color":
                    i.style.color = n[e];
                    break;
                case "parent":
                    n[e].appendChild(i);
                    break;
                case "click":
                    i.addEventListener("click", n[e]);
                    break;
                case "touchstart":
                    i.addEventListener("touchstart", n[e]);
                    break;
                case "hover":
                    i.addEventListener("hover", n[e]);
                    break;
                case "change":
                    i.addEventListener("change", n[e]);
                    break;
                case "focus":
                    i.addEventListener("focus", n[e]);
                    break;
                case "mouseenter":
                    i.addEventListener("mouseenter", n[e]);
                    break;
                case "scroll":
                    i.addEventListener("scroll", n[e]);
                    break;
                case "input":
                    i.addEventListener("input", n[e]);
                    break;
                case "date":
                    new ie(i, n[e]);
                    break;
                case "value":
                    i.value = n[e];
                    break;
                default:
                    i.setAttribute(e, n[e])
            }
    return i
}
function be(e) {
    return document.querySelector(e)
}
function ye(e) {
    return document.querySelectorAll(e)
}
function ve(e) {
    return document.getElementById(e)
}
// TODO Get rid of this
new function () {
    let e = this;
    this.cookies = new ue,
        this.cookieName = "buycoffee",
        this.discarded = !1,
        this.validity = {
            u: "hours",
            n: 48
        },
        this.first = {
            u: "minutes",
            n: 59
        },
        this.element = null,
        this.className = "coffee-banner",
        this.check = function () {
            let t = e.cookies.get(e.cookieName);
            if (!t)
                return e.discarded = !0,
                    void e.discard(!0);
            let n = moment(t).isValid();
            if (!n)
                return;
            let i = moment(t).isAfter(moment());
            i && (e.discarded = !0)
        }
        ,
        this.discard = function (t) {
            let n = t ? e.first.u : e.validity.u
                , i = t ? e.first.n : e.validity.n;
            e.element && e.element.remove();
            let a = moment().add(i, n).toISOString();
            e.cookies.set(e.cookieName, a, 9999)
        }
        ,
        this.make = function () {
            ye("." + e.className).forEach(function (e) {
                e.remove()
            }),
                e.element = ge("div", e.className, {
                    parent: be("body"),
                    click: function (n) {
                        n.target.classList.contains("coffee-banner-x") ? e.discard() : (t.contains(n.target) && window.open(l, "_blank"),
                            e.discard())
                    }
                });
            let t = ge("div", "coffee-banner-inner", {
                parent: e.element
            })
                , n = (ge("img", {
                    src: d,
                    parent: t
                }),
                    ge("span", {
                        textId: "likeApp",
                        parent: t
                    }),
                    ge("strong", {
                        textId: "needYourHelp",
                        parent: t
                    }),
                    ge("button", "coffee-banner-main", {
                        parent: t
                    }));
            ge("span", {
                textId: "buyCoffee",
                parent: n
            }),
                ge("i", ["coffee-banner-x", "feather", "feather-x"], {
                    parent: t
                })
        }
        ,
        this.init = function () {
            e.check(),
                e.discarded || e.make()
        }
        ,
        this.init()
}
    ,
    new function () {
        let e = this;
        this.startDate = "2020-05-15T07:01:00.240Z",
            this.endDate = "2020-05-16T06:59:00.240Z",
            this.make = function (t) {
                try {
                    let t = moment().isAfter(moment(e.startDate));
                    if (!t)
                        return;
                    let n = moment().isBefore(moment(e.endDate));
                    if (!n)
                        return;
                    e.element = ge("a", "ph-banner", {
                        target: "_blank",
                        href: "https://www.producthunt.com/posts/coronalytics?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-coronalytics",
                        parent: be("body")
                    }),
                        ge("img", {
                            parent: e.element,
                            style: "width: 200px; height: 43px;",
                            alt: "Coronalytics - Analyse and predict COVID-19 | Product Hunt Embed",
                            src: "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=200619&theme=light"
                        })
                } catch (e) {
                    console.log(e)
                }
            }
            ,
            this.make()
    }
    ,
    this.options = ["EN", "TW", "FR", "KR", "DE", "IT", "ES", "HU", "GR", "TR", "PL", "PT", "CZ"];
