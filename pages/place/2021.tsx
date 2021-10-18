import Head from 'next/head'
import Link from 'next/link';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faLink, faPencilAlt, faSignal} from '@fortawesome/free-solid-svg-icons'
import Breadcrumbs from "../../components/partials/breadcrumbs";
import Comment from "../../components/cards/comment";
import CommentSkeletonCard from "../../components/cards/comment-skeleton-card";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Author from "../../components/cards/author";
import SubmitComment from "../../components/partials/submit-comment";
import Navbar from "../../components/navbar";
import {PostService} from "../../helpers/post-service";
import {TimeUtil} from "../../helpers/time-util";
import {useAuth} from "../../contexts/auth";
import {CommentInterface} from "../../domain/comment.interface";
import Group from "../../components/partials/group";
import AuthorMeta from "../../components/partials/author-meta";
import Score from "../../components/partials/score";
import {Cookies} from "react-cookie";
import {PostInterface} from "../../domain/post.interface";
import Shimmer from "../../components/partials/shimmer";
import MarkdownInstructions from "../../components/partials/markdown-instructions";

export default function Salary2021() {
    const auth = useAuth();

    return (
        <div>
            <Head>
                <title>Plače slovenskih razvijalcev 2021 | Klele.si</title>
                <meta name="description" content="Raziskava o plačah slovenskih razvijalcev za leto 2021."/>
                <meta property="og:title" content="Plače slovenskih razvijalcev 2021 | Klele.si"/>
                <meta property="og:description" content="Raziskava o plačah slovenskih razvijalcev za leto 2021."/>
                <meta property="og:image" content="/images/favicon.png"/>
                <meta property="og:url" content="https://klele.si/place/2021"/>
                <meta name="twitter:card" content="summary_large_image"/>

                <meta property="og:site_name" content="Klele.si"/>
            </Head>

            <Navbar/>

            <main className={'my-6 flex flex-col'}>
                <div className="container mx-auto" style={{maxWidth: '780px'}}>
                    <div className="mb-6 flex flex-row justify-between items-center">
                        <Breadcrumbs/>
                    </div>

                    <div className="card mb-4">


                        <div className=" mt-6">
                            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-snug tracking-wide text-black mb-2">Plače
                                slovenskih razvijalcev 2021</h1>
                        </div>

                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <div className="mt-1">
                                    <AuthorMeta author={{
                                        fullName: 'Miha Medven',
                                        nickname: 'aweCodeMan',
                                        uuid: '9448be89-2434-45cc-90de-76cad3c161c3'
                                    }}
                                                emphasizeAuthor={true}
                                                createdAt={'2021-10-18 10:00'}
                                                updatedAt={'2021-10-18 10:00'}/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 prose">

                            <p>Vsako leto v <a href="https://www.facebook.com/groups/developerji"
                                               rel="nofollow noreferrer" target="_blank">Facebook skupini Slovenski
                                developerji</a> objavim anketo o plačah slovenskih razvijalcev z namenom osmišljanja
                                trga delovne sile na področju tehničnega razvoja. Letošnja raziskava je že
                                četrta. </p>

                            <p>Število vseh odgovorov: <b>1436</b></p>

                            <p>Povezave do anket prejšnih let:</p>
                            <ul>
                                <li><a
                                    href="https://medium.com/@mihec.susnik/pla%C4%8De-razvijalcev-2020-f7c719704ab2"
                                    rel="nofollow noreferrer" target="_blank">2020</a></li>
                                <li><a
                                    href="https://medium.com/@mihec.susnik/pla%C4%8De-razvijalcev-2019-8f5b20691f3e"
                                    rel="nofollow noreferrer" target="_blank">2019</a></li>
                                <li><a
                                    href="https://medium.com/@mihec.susnik/pla%C4%8De-razvijalcev-2018-7a71d4befb1"
                                    rel="nofollow noreferrer" target="_blank">2018</a></li>
                            </ul>


                            <h2>TL;DR</h2>

                            <p>Splošne karaktaristike dela slovenskih razvijalcev se od zadnjega leta niso drastično
                                spremenile. Še vedno je <b>70%</b> razvijalcev redno zaposlenih, <b>18,2%</b> jih
                                delo
                                opravlja primarno prek s.p., medtem ko <b>10,5%</b> svoje plačilo prejema prek
                                študentske napotnice. Podobno kot lansko leto se tudi letos večina razvijalcev
                                ukvarja s
                                spletnim razvojem, saj se jih je kar <b>55,1%</b> označilo kot front-end, back-end
                                ali
                                full-stack razvijalec.</p>

                            <p>Še vedno krepko prednačijo pogodbe za nedoločen čas (<b>92,5%</b>) s polnim delovnim
                                časom (<b>98,7%</b>). </p>
                            <p>Najbolj zanimiva sprememba je v tem, da le
                                še <b>9,9%</b> razvijalcem delodajalec <b>ne</b> omogoča dela na daljavo. Pred dvema
                                letoma je bil ta odstotek <b>44%</b>, lansko leto <b>25%</b>. Vsako leto se tako
                                skorajda prepolovi odstotek delodajalcev, ki ne omogočajo dela na daljavo.
                                <b>68,5%</b> razvijalcev opravlja delo na daljavo, medtem ko skorajda tretjina
                                (<b>27,3%</b>) za polni delovni čas.</p>

                            <p>Slovenski razvijalci še vedno v veliki meri opravljajo delo za slovenskega
                                delodajalca
                                (<b>76,7%</b>), ki pa primarno deluje in trži svoje storitve in produkte na tujem
                                trgu,
                                saj je primarno tržišče Slovenija le <b>46%</b> delodajalcem.</p>

                            <p>Plače so šle gor. Za primerjavo dajem razpone plače in odstotek anketirancev, ki so
                                izbrali dotični razpon za zadnje tri leta.</p>

                            <ul>
                                <li>1500–1999€ (17,5% v 2019 | 16,9% v 2020 | <b>12,2%</b> v 2021)</li>
                                <li>2000–2499€ (23% v 2019 | 20,6% v 2020 | <b>20,1%</b> v 2021)</li>
                                <li>2500–2999€ (16,8% v 2019 | 19,2% v 2020 | <b>19,9%</b> v 2021)</li>
                                <li>3000–3499€ (11,5% v 2019 | 12,7% v 2020 | <b>15,5%</b> v 2021)</li>
                                <li>3500–3999€ (4,6% v 2019 | 7,7% v 2020 | <b>9,6%</b> v 2021)</li>
                            </ul>

                            <p>V praksi to pomeni, da se je v zadnjem letu zgodil premik navzgor, ki resda ni
                                premaknil
                                mediane (ta je še vedno med 2500€ - 2999€), a je čez celotno skalo povečal število
                                anketirancev, ki spadajo v posamezne plačne razrede. Če v zadnjem letu ali dveh
                                niste prejeli povišice, je morda čas zanjo.</p>

                            <p>Med s.p.jevci podobno kot lansko leto ni večjih razlik, še vedno jih
                                je <b>81,3%</b> takih, ki bi jih lahko šteli pod ekonomsko odvisne osebe (en
                                naročnik predstavlja več kot 80% letnega prihodka), še vedno je
                                le <b>37,5%</b> njihovih naročnikov slovenskih in v večini delajo za tuji trg
                                (slovenski trg predstavlja primarno tržišče le <b>26,2%</b>). </p>

                            <h3>Kazalo</h3>

                            <ul>
                                <li><a href="#demografija">Demografija</a></li>
                                <li><a href="#student">Delo prek študentske napotnice</a></li>
                                <li><a href="#redna-zaposlitev">Redna zaposlitev</a></li>
                                <li><a href="#sp">Delo prek s.p.</a></li>
                                <li><a href="#podatki">Dostop do podatkov</a></li>
                            </ul>

                            <h2 id="demografija">Demografija</h2>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/demografija.png" alt="Graf za trenutni status"/>

                            <p>Med 1436 anketiranci je <b>1009 (70,3%)</b> redno zaposlenih, <b>262 (18,2%)</b> jih
                                delo opravlja prek s.p., <b>151 (10,5%)</b> jih delo opravlja prek študentske
                                napotnice.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/prebivam.png" alt="Graf za regijo prebivanja"/>

                            <p>Sestava anketirancev se od lanskega leta ni ravno spremenila, večina anketirancev
                                prihaja iz osrednjeslovenske regije (<b>656, 45,9%</b>), sledi podravska regija
                                z <b>211 (14,7%)</b>. Tujino je izbralo <b>52 (3,6%)</b>.</p>

                            <p>Kot vedno imamo tudi letos prezastopanost osrednjeslovenske regije, kar rezultate zna
                                narediti pristranske, saj so povprečne plače v Ljubljani višje kot v drugih
                                regijah.</p>

                            <p>Če prihajate iz drugih regij, upoštevajte, da je v vaši regiji najbrž situacija
                                drugačna.</p>


                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/starost.png" alt="Graf za starost"/>

                            <p>Razporeditev po starosti je precej podobna lanskemu letu, med 19-25 let sta
                                označili <b>302 (21%)</b> osebi, med 26-30 <b>473 (32,9%)</b>, med 31-40 <b>532
                                    (37%)</b> in <b>103 (7,2%)</b> jih je označilo med 41-50 let.</p>

                            <h2 id="student">Delo prek študentske napotnice</h2>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/student_tri_mesece.png"
                                 alt="Graf za zadnje tri mesece študentskega dela"/>

                            <p>Glede na zadnje leto so podatki glede koliko povprečno dela opravijo na teden resda
                                drugačni, a bolj kot spremembo na trgu to pripisujem času ankete. Vprašanje se glasi
                                za zadnje tri mesece, in prejšnje ankete so se zgodile v spomladanskem času,
                                letošnja pa v jesenskem času in je spraševala po obdobju poletnih počitnic, ko imajo
                                študentje tudi več časa za delo. Tokrat jih je <b>72 (47,7%)</b> označilo, da so
                                delalo polni delavnik (40 ur), <b>45 (29,8%)</b> med 20-40 urami, <b>17
                                    (11,3%)</b> za polovični delavnik (20 ur), preostali niso delali oz. so delali
                                manj kot 20 ur na teden.</p>

                            <p>V vsakem primeru je študentska populacija aktiven kader znotraj trga tehničega
                                razvoja.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/student_poklicna_leta.png"
                                 alt="Graf za število let poklicnega programiranja"/>

                            <p>Napram lanskemu letu so tukaj tudi večje spremembe, saj lansko leto je imela večina
                                študentov do dve leti poklicnih izkušenj, medtem ko letos jih ima več
                                kot <b>82%</b> več kot dve leti poklicnih izkušenj.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/student_neto_placa.png"
                                 alt="Graf za NETO postavke za študentsko delo"/>

                            <p>Med dijaki/študenti so NETO urne postavke bolj uveljavljene od BRUTO postavk, zato
                                priporočam <a
                                    href="https://www.studentski-servis.com/podjetja/izracun-stroskov"
                                    rel="nofollow noreferrer" target="_blank">tale kalkulator</a> za pretvorbo iz
                                NETO v BRUTO postavke.</p>

                            <p>Najbolj pogosta plača (modus) študentov je med 6,0€ - 6,99€, saj jih za to postavko
                                delo opravlja <b>44 (29,1%)</b>. Zatem sledi postavka 7,0€ - 7,99€ (<b>29, 19,2%</b>),
                                in 8,0€ - 8,99€ ter 9,0€ - 9,99€ (obe po <b>15, 9,9%)</b>. Kar je zanimivo, da je
                                postavko 10,0 - 10,99€ izbralo <b>20 (13,2%)</b>, kar lahko nakazuje na
                                psihološko ceno oz. na cenovni razdelek postavljen na ~10€ NETO na uro.</p>

                            <h2 id="redna-zaposlitev">Redna zaposlitev</h2>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/zaposlitev_na_daljavo.png"
                                 alt="Graf za opravljanje dela na daljavo"/>


                            <p>Če se je lansko leto začel premik v remote delo, je letos velika večina delodajalcev delo
                                na daljavo tudi vpeljala. Le še <b>100 (9,9%)</b> zaposlenim
                                delodajalec <b>ne</b> omogoča delo na daljavo, medtem ko vsem ostalim je to delo
                                omogočeno. <b>218 (21,6%)</b> se ga ne poslužujejo, čeprav jim je omogočeno.</p>
                            <p>Razlika s prejšnjim letom je več kot očitna, saj je lansko leto kar 25% odgovorilo, da
                                jim delo na daljavo ni omogočeno, letos je ta odstotek manjši od 10%. Torej delodalajci,
                                ki ne omogočajo dela na daljavo so bolj izjema kot pravilo.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/zaposlitev_placa.png"
                                 alt="Graf za BRUTO plače"/>

                            <p>Podatki za BRUTO mesečne plače so sledeči:</p>

                            <ul>
                                <li>14 (<b>1,4%</b>) jih ima minimalno plačo (1024,42€)</li>
                                <li>31 (<b>3,1%</b>) jih ima 1024,25€ - 1499€</li>
                                <li>124 (<b>12,3%</b>) jih ima 1500€ - 1999€</li>
                                <li>203 (<b>20,1%</b>) jih ima 2000€ - 2499€</li>
                                <li>200 (<b>19,8%</b>) jih ima 2500€ - 2999€</li>
                                <li>156 (<b>15,5%</b>) jih ima 3000€ - 3499€</li>
                                <li>96 (<b>9,5%</b>) jih ima 3500€ - 3999€</li>
                                <li>66 (<b>6,5%</b>) jih ima 4000€ - 4499€</li>
                                <li>54 (<b>5,4%</b>) jih ima 4500€ - 5499€</li>
                                <li>23 (<b>2,3%</b>) jih ima 5500€ - 6499€</li>
                                <li>12 (<b>1,2%</b>) jih ima 6500€ - 7499€</li>
                                <li>5 (<b>0,5%</b>) jih ima 7500€ - 7999€</li>
                                <li>5 (<b>0,5%</b>) jih ima 8000€ - 8499€</li>
                                <li>19 (<b>1,9%</b>) jih ima več kot 8500€</li>
                            </ul>

                            <p>Za primerjavo je slovenska povprečno BRUTO plača <b>1966,62€</b> (povprečna mesečna plača
                                za tromesečje, julij 2021).</p>

                            <p>Mediana ostaja še vedno med <b>2500€ - 2999€</b>, kar v praksi pomeni, da 50% zaposlenih
                                ima še vedno manjšo plačo od 3000€. Pomembno je, da se je zmanjšal delež zaposlenih, ki
                                imajo manj kot 2500€ plače. Leta 2020 jih je bilo takih <b>47,7%</b>, letos le
                                še <b>36,9%</b>, ob takem trendu bi naslednje leto mediana bila že lahko med 3000€ in
                                3499€. </p><p>Če te je lansko leto 4000€ spravilo v top ~13% zaslužkarjev, ta znesek
                            letos predstavlja top <b>~18%</b>.</p>

                            <p><b>Plače so šle gor. </b>Kako velik skok je težko reči, saj je odvisno od tega za katere
                                zneske
                                govorimo. Načeloma vsaj 10% manj ljudi letos zasluži manj 2000€, in pa kar ~5% več ljudi
                                zasluži več kot 4000€.</p>

                            <p>Kot vsako leto moram tudi letos opozoriti na težavo, ko govorimo o “povprečni” plači
                                slovenskega razvijalca. Zaradi narave spletne ankete in morebitnega netočnega
                                zbiranja podatkov (ljudje ne razlikujejo med BRUTO in NETO plačo, hkrati pa velikokrat
                                pri BRUTO plači štejejo tudi povračilo stroškov prevoza in malice), poglobljenih analiz
                                tudi letos ne bo, saj bodo zaključki netočni in povzročili več težav kot koristi. Pri
                                tako malem številu anketirancev je večja nevarnost napačno sklepanje iz pomanjkljivega
                                vzorca kot pa uvid, ki ga bi kaka poglobljena analiza znala prinesti.</p>

                            <p><b>Čisto brez heca.</b> Še enkrat, zgornje opozorilo je treba vedno imeti v mislih, ko
                                se pogovarjate o izsledkih te ankete.</p>

                            <h3>Zakaj NETO plača ni pomembna?</h3>

                            <p>NETO plača je tista plača, ki jo dobi posameznik nakazano na bančni račun. Znesek NETO
                                plače je prilagojen vsakemu posamezniku, saj je odvisen od olajšav, števila vzdrževanih
                                otrok in drugih družinskih članov. Zaradi tega je NETO plača lahko zavajajoča, saj se
                                razlikuje od osebe do osebe, medtem ko je BRUTO vedno enaka.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/zaposlitev_let_poklicnega_programiranja.png"
                                 alt="Graf za leta poklicnega programiranja za zaposlene"/>

                            <p>Nekaj podobnosti z lanskim letom, saj večina (<b>51%</b>) jih ima manj kot 5 let delovnih
                                izkušenj (lansko leto je bil ta odstotek 52%).</p>

                            <p>Kar je zanimivo je to, da lansko leto je bil odstotek začetnikov za <b>40%</b> manjši od
                                tistih, ki že imajo nekaj izkušenj (1-2 leti izkušenj). Letos je ta trend obrnjen, saj
                                imamo enako oz. več začetnikov kot pa tistih z vsaj enim letom izkušenj. Kljub
                                temu, da vzrokov za več začetnikov nisem preučeval, predvidevam, da gre za razgret trg
                                delovne sile in predvsem pomanjkanja delovne sile in zaradi same narave je poklic
                                razvijalca precej atraktiven.</p>

                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 md:pr-2">

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/images/place/2021/zaposlitev_sedez.png"
                                         alt="Graf za sedež delodajalca za zaposlene"/>
                                </div>

                                <div className="w-full md:w-1/2 md:pl-2">

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/images/place/2021/zaposlitev_trzisce.png"
                                         alt="Graf za primarno tržišče delodajalca za zaposlene"/>
                                </div>
                            </div>

                            <p>Velika večina (<b>773, 76,7%</b>) jih dela za podjetje v Sloveniji, s tem da delajo ali
                                za slovenski trg (<b>463, 46%)</b> ali za trg EU (<b>313, 31,1%)</b>.</p>

                            <h3>Trenutna zaposlitev in iskanje nove</h3>

                            <p>Letos sem dodal še dve vprašanji glede tega koliko let so anketiranci že zaposleni pri
                                trenutnem delodajalcu in če aktivno iščejo novo zaposlitev.</p>
                            <p>Aktivno išče novo zaposlitev <b>137 (13,6%)</b> anketirancev.</p>

                            <p><b>229 (22,7%)</b> jih je pri trenutnem delodajalcu zaposlenih manj kot 1 leto, <b>170
                                (16,8%)</b> med 1 - 2 leti, <b>179 (17,7%)</b> med 2 - 3 leti, preostali (<b>42,8%</b>)
                                so pri svojih trenutnih delodajalcih že dlje kot 3 leta. Kar je zanimivo, da je <b>68
                                    (6,7%)</b> zaposlenih pri istem delodajalcu že dlje od 10 let.</p>

                            <h2 id="sp">Delo prek s.p.</h2>

                            <p>Večina tistih, ki svoje delo opravljalo prek s.p. imajo znake prekarnega dela oz. bi
                                znale biti ekonomsko odvisne osebe (1 naročnik predstavlja več kot 80% letnega dohodka
                                in hkrati ne zaposljuje nobene osebe, saj za kar <b>81,3%</b> anketirancev največji
                                naročnik predstavlja več kot 70% letnega prihodka, za <b>29,9%</b> odstotek pa kar 100%
                                letnega prihodka.</p>


                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2021/sp_prihodek.png"
                                 alt="Graf za prihodek tistih, ki delajo prek s.p."/>

                            <p>Podatki za mesečni BRUTO prihodek v zadnjih 6 mesecih:</p>

                            <ul>
                                <li>2 (<b>0,8%</b>) zaslužita pod 499€</li>
                                <li>0 jih zasluži med 500€ - 999€</li>
                                <li>5 (<b>1,9%</b>) jih zasluži med 100€ - 1499€</li>
                                <li>7 (<b>2,7%</b>) jih zasluži med 1500€ - 1999€</li>
                                <li>18 (<b>6,9%</b>) jih zasluži med 2000€ - 2499€</li>
                                <li>20 (<b>7,7%</b>) jih zasluži med 2500€ - 2999€</li>
                                <li>19 (<b>7,3%</b>) jih zasluži med 3000€ - 3499€</li>
                                <li>37 (<b>14,2%</b>) jih zasluži med 3500€ - 3999€</li>
                                <li>18 (<b>6,9%</b>) jih zasluži med 4000€ - 4499€</li>
                                <li>35 (<b>13,4%</b>) jih zasluži med 4500€ - 5499€</li>
                                <li>26 (<b>10%</b>) jih zasluži med 5500€ - 6499€</li>
                                <li>20 (<b>7,7%</b>) jih zasluži med 6500€ - 7499€</li>
                                <li>10 (<b>3,8%</b>) jih zasluži med 7500€ - 8499€</li>
                                <li>6 (<b>2,3%</b>) jih zasluži med 8500€ - 9499€</li>
                                <li>12 (<b>4,6%</b>) jih zasluži med 9500€ - 10499€</li>
                                <li>26 (<b>10%</b>) jih zasluži več kot 10500€</li>
                            </ul>

                            <p>Primerjavo med redno zaposlenimi in tistimi, ki imajo s.p., je nemogoče narediti, saj
                                s.p. na trgu nastopa kot podjetje. S.p ima lahko dodatne zaposlene in ima
                                administrativne ter operativne stroške, ki jih redno zaposleni nima. Zaradi tega
                                prihodek podjetja ne moremo enačiti s plačo.</p>

                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 md:pr-2">

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/images/place/2021/sp_sedez.png"
                                         alt="Graf za sedež največjega naročnika"/>
                                </div>

                                <div className="w-full md:w-1/2 md:pl-2">

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/images/place/2021/sp_trzisce.png"
                                         alt="Graf za primarno tržišče največjega naročnika"/>
                                </div>
                            </div>

                            <p>Za razliko od redno zaposlenih, tisti prek s.p. največkrat delajo za tujega naročnika
                                (<b>62,5%</b>), in primarni trg je tujina (73,8%).</p>

                            <h3>Zakaj NE povezujem tistih s s.p. z redno zaposlenimi?</h3>

                            <p>Razlog je preprost- ne gre za enaki obliki dela. Čeprav se v praksi dogaja, da namesto
                                redne zaposlitve delodajalci raje sodelujejo preko s.p., je v resnici s.p. samostojna
                                poslovna entiteta, ki lahko opravlja enake storitve (in na enak način) kot katerokoli
                                drugo podjetje.</p>

                            <p>Zaradi tega ne moremo posploševati in primerjati med seboj rednega dela z delom prek
                                s.p., saj bi tako enačili aktivnosti podjetja z delom posameznika. Podjetje lahko
                                zaposluje delavce, izdaja račune za licence, opreme, naročnine, vzdrževanje in ves ta
                                prihodek, ki ga podjetje pridobi, ni enako plači, ki ga prejme posameznik za neko
                                opravljeno delo.</p>


                            <h2 id="podatki">Dostop do podatkov</h2>

                            <a href="/images/place/2021/anketa.csv">Rezultati ankete 2021 (.csv, 0,5MB)</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
