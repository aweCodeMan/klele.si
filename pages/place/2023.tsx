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

export default function Salary2023() {
    const auth = useAuth();

    return (
        <div>
            <Head>
                <title>Plače slovenskih razvijalcev 2023 | Klele.si</title>
                <meta name="description" content="Raziskava o plačah slovenskih razvijalcev za leto 2023."/>
                <meta property="og:title" content="Plače slovenskih razvijalcev 2023 | Klele.si"/>
                <meta property="og:description" content="Raziskava o plačah slovenskih razvijalcev za leto 2023."/>
                <meta property="og:image" content="/images/place/2023/zaposlitev_placa.png"/>
                <meta property="og:url" content="https://klele.si/place/2023"/>
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
                                slovenskih razvijalcev 2023</h1>
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
                                                createdAt={'2023-11-13 11:00'}
                                                updatedAt={'2023-11-13 11:00'}/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 prose">

                            <p>Tole je že šesta anketa o plačah slovenskih razvijalcev, ki jo objavim vsako leto v <a
                                href="https://www.facebook.com/groups/developerji"
                                rel="nofollow noreferrer" target="_blank">Facebook skupini Slovenski
                                developerji</a>.</p>

                            <p>Število vseh odgovorov: <b>1134</b></p>

                            <p>Povezave do anket prejšnih let:</p>
                            <ul>
                                <li><a
                                    href="https://klele.si/place/2022"
                                    rel="nofollow noreferrer" target="_blank">2022</a></li>
                                <li><a
                                    href="https://klele.si/place/2021"
                                    rel="nofollow noreferrer" target="_blank">2021</a></li>
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

                            <p>Plače so se dvignile. Za primerjavo dajem razpone plač in odstotek anketirancev, ki so
                                izbrali dotični razpon za zadnja tri leta.</p>

                            <ul>
                                <li>1500–1999€ (<b>12,2%</b> v 2021 | <b>9%</b> v 2022, <b>6,6%</b> v 2023)</li>
                                <li>2000–2499€ (<b>20,1%</b> v 2021 | <b>14,4%</b> v 2022, <b>11,4%</b> v 2023)</li>
                                <li>2500–2999€ (<b>19,9%</b> v 2021 | <b>18,6%</b> v 2022, <b>19%</b> v 2023)</li>
                                <li>3000–3499€ (<b>15,5%</b> v 2021 | <b>17,1%</b> v 2022, <b>16,3%</b> v 2023)</li>
                                <li>3500–3999€ (<b>9,6%</b> v 2021 | <b>10%</b> v 2022, <b>14%</b> v 2023)</li>
                            </ul>


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
                            <img src="/images/place/2023/demografija.png" alt="Graf za trenutni status"/>

                            <p>Med 1134 anketiranci je <b>838 (73,9%)</b> redno zaposlenih, <b>198 (17,5%)</b> jih
                                delo opravlja prek s.p., <b>86 (7,6%)</b> jih delo opravlja prek študentske
                                napotnice.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2023/prebivam.png" alt="Graf za regijo prebivanja"/>

                            <p>Kot vsako leto tudi letos je izrazito zastopana osrednjeslovenska regija <b>(481;
                                42,5%)</b>, sledi ji podravska regija <b>(171; 15,1%)</b> in gorenjska regija <b>(101;
                                8,9%)</b>. V tujini prebiva <b>2,8%</b> anketirancev.</p>

                            <p>Prezastopanost osrednjeslovenske regije je treba upoštevati pri intepretaciji vseh
                                rezultatov, saj so povprečne plače v Ljubljani višje kot v drugih regijah.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2023/starost.png" alt="Graf za starost"/>

                            <p>Razporeditev po starosti je precej podobna lanskemu letu, med 19-25 let je
                                označilo <b>233 (20,6%)</b> oseb, med 26-30 <b>374 (33%)</b>, med 31-40 <b>422
                                    (37,3%)</b> in <b>87 (7,7%)</b> jih je označilo med 41-50 let.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2023/identificiram.png" alt="Graf za spol"/>

                            <p>Slovenski razvijalci smo izredno homogena skupina, saj je kar <b>92,7% (1049)</b> moških
                                in le <b>74 (6,5%)</b> žensk.</p>

                            <h2 id="student">Delo prek študentske napotnice</h2>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2023/student_neto_placa.png"
                                 alt="Graf za NETO postavke za študentsko delo"/>

                            <p>Med študenti so NETO urne postavke bolj uveljavljene od BRUTO postavk, zato
                                priporočam <a
                                    href="https://www.studentski-servis.com/podjetja/izracun-stroskov"
                                    rel="nofollow noreferrer" target="_blank">ta kalkulator</a> za pretvorbo iz
                                NETO v BRUTO postavke.</p>

                            <p>NETO urne postavke študente so se zopet dvignile. Letos jih ima 63,5% NETO postavko med 8,0€ in 10,99€, lansko leto je za enak razpon odgovorilo le 44,6%. Še vedno obstaja precej velik padec anketirancev, ki imajo več kot 11€ NETO urne postavke, kar pomeni, da letos še ni bilo preboja psihološke cene.</p>

                            <h2 id="redna-zaposlitev">Redna zaposlitev</h2>

                            <p><b>779 (93,5%)</b> razvijalcev je redno zaposlenih in ima pogodbo za nedoločen čas, prav tako jih <b>820
                                (97,9%)</b> dela za polni delovni čas.</p>

                            <h4>Delo na daljavo</h4>
                            <p><b>610 (73%)</b> redno zaposlenih opravlja delo na daljavo (<b>26,7%</b> za polni
                                delovni čas, <b>46,3%</b> manj kot polni delovni čas). Le še <b>(77, 9,2%)</b> redno
                                zaposlenim delodajalec ne omogoča dela na daljavo.</p>

                            <p>Glede na lansko leto ni večjih sprememb, kar govori to, da se je način opravljanja dela stabiliziral.</p>

                            <h4>BRUTO Plača</h4>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2023/zaposlitev_placa.png"
                                 alt="Graf za BRUTO plače"/>

                            <p>Podatki za BRUTO mesečne plače so sledeči:</p>

                            <ul>
                                <li>11 (<b>1,3%</b>) jih ima minimalno plačo (1203,36€)</li>
                                <li>13 (<b>1,6%</b>) jih ima 1203,37€ - 1499€</li>
                                <li>55 (<b>6,6%</b>) jih ima 1500€ - 1999€</li>
                                <li>95 (<b>11,4%</b>) jih ima 2000€ - 2499€</li>
                                <li>159 (<b>19%</b>) jih ima 2500€ - 2999€</li>
                                <li>136 (<b>16,3%</b>) jih ima 3000€ - 3499€</li>
                                <li>117 (<b>14%</b>) jih ima 3500€ - 3999€</li>
                                <li>75 (<b>9%</b>) jih ima 4000€ - 4499€</li>
                                <li>47 (<b>5,6%</b>) jih ima 4500€ - 4999€</li>
                                <li>36 (<b>4,3%</b>) jih ima 5000€ - 5499€</li>
                                <li>27 (<b>3,2%</b>) jih ima 5500€ - 5999€</li>
                                <li>21 (<b>2,5%</b>) jih ima 6000€ - 6499€</li>
                                <li>13 (<b>1,6%</b>) jih ima 6500€ - 6999€</li>
                                <li>6 (<b>0,7%</b>) jih ima 7000€ - 7499€</li>
                                <li>3 (<b>0,4%</b>) jih ima 7500€ - 7999€</li>
                                <li>5 (<b>0,6%</b>) jih ima 8000€ - 8499€</li>
                                <li>2 (<b>0,2%</b>) jih ima 8500€ - 8999€</li>
                                <li>2 (<b>0,2%</b>) jih ima 9000€ - 9499€</li>
                                <li>2 (<b>0,2%</b>) jih ima 9500€ - 9999€</li>
                                <li>11 (<b>1,3%</b>) jih ima več kot 10000€</li>
                            </ul>

                            <p>Za primerjavo je slovenska povprečno BRUTO plača <b>2221,85€</b> (povprečna mesečna
                                plača, avgust 2023).</p>

                            <p>Mediana ostaja med 3000€ - 3499€, kar pomeni, da 50% vseh redno zaposlenih zasluži manj kot 3500€ BRUTO na mesec.
                                Tudi letos se je zmanjšal delež redno zaposlenih, ki imajo plačo manjšo od 2500€. Leta
                                2020 je bil delež <b>47,7%</b>, leta 2021 <b>36,9%</b>, leta 2022 <b>25,6%</b>, letos je takih samo
                                še <b>20,9%</b>.

                            </p><p>Če hočeš biti letos v top 10%, moraš imeti BRUTO mesečno plačo <b>5500€</b> ali več. Lansko leto je bila ta številka 500€ manjša.
                        </p>

                            <p>Plače so torej višje kot lansko leto.</p>

                            <p>Kot vsako leto moram tudi letos opozoriti na težavo, ko govorimo o “povprečni” plači
                                slovenskega razvijalca. Zaradi narave spletne ankete in morebitnega netočnega
                                zbiranja podatkov (ljudje ne razlikujejo med BRUTO in NETO plačo, hkrati pa velikokrat
                                pri BRUTO plači štejejo tudi povračilo stroškov prevoza in malice), poglobljenih analiz
                                tudi letos ne bo, saj bodo zaključki netočni in povzročili več težav kot koristi. Pri
                                tako malem številu anketirancev je večja nevarnost napačno sklepanje iz pomanjkljivega
                                vzorca kot pa uvid, ki ga bi kaka poglobljena analiza znala prinesti.</p>

                            <p>Še enkrat, zgornje opozorilo je treba vedno imeti v mislih, ko
                                se pogovarjate o izsledkih te ankete.</p>

                            <p>Letos sem vključil tudi vprašanje o celoletni BRUTO kompenzaciji, ki ga pa ne vključujem v to poročilo, ker je iz rezultatov očitno, da je bilo vprašanje ali napačno postavljeno, ali pa anketiranci ne poznajo svoje BRUTO kompenzacije.</p>

                            <h3>Zakaj NETO plača ni pomembna?</h3>

                            <p>NETO plača je tista plača, ki jo dobi posameznik nakazano na bančni račun. Znesek NETO
                                plače je prilagojen vsakemu posamezniku, saj je odvisen od olajšav, števila vzdrževanih
                                otrok in drugih družinskih članov. Zaradi tega je NETO plača lahko zavajajoča, saj se
                                razlikuje od osebe do osebe, medtem ko je BRUTO vedno enaka.</p>

                            <h4>Sedež in tržišče delodajalca</h4>

                            <p>Velika večina (<b>640, 76,9%</b>) dela za podjetje v Sloveniji, delajo za slovenski trg (<b>351,
                                41,9%)</b> ali za trg EU (<b>277, 33,1%)</b>.</p>

                            <h4>Trenutna zaposlitev in iskanje nove</h4>

                            <p>Aktivno novo zaposlitev išče <b>98 (11,6%)</b> anketirancev.</p>

                            <p><b>167 (20%)</b> jih je pri trenutnem delodajalcu zaposlenih manj kot 1 leto, <b>193
                                (23,1%)</b> med 1 - 2 leti, <b>120 (14,4%)</b> med 2 - 3 leti. <b>17
                                    (7,6%)</b> je zaposlenih pri istem delodajalcu že dlje od 10 let.</p>

                            <h4>Popoldanski s.p.</h4>

                            <p><b>98 (11,7%)</b> anketirancev ima poleg redne zaposlitve odprt še s.p.</p>

                            <h2 id="sp">Delo prek s.p.</h2>

                            <p>Večina tistih, ki svoje delo opravljalo prek s.p., imajo znake prekarnega dela oz. bi
                                znale biti ekonomsko odvisne osebe (1 naročnik predstavlja več kot 80% letnega dohodka
                                in hkrati ne zaposluje nobene osebe), saj za kar <b>87%</b> anketirancev največji
                                naročnik predstavlja več kot 70% letnega prihodka, za <b>28,9%</b> odstotek pa kar 100%
                                letnega prihodka.</p>


                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2023/sp_prihodek.png"
                                 alt="Graf za prihodek tistih, ki delajo prek s.p."/>

                            <p>Podatki za mesečni BRUTO prihodek v zadnjih 6 mesecih:</p>

                            <ul>
                                <li>1 zasluži pod 499€</li>
                                <li>0 jih zasluži med 500€ - 999€</li>
                                <li>1 (<b>0,5%</b>) zasluži med 1000€ - 1499€</li>
                                <li>2 (<b>1%</b>) zaslužita med 1500€ - 1999€</li>
                                <li>1 (<b>0,5%</b>) zasluži med 2000€ - 2499€</li>
                                <li>9 (<b>4,5%</b>) jih zasluži med 2500€ - 2999€</li>
                                <li>11 (<b>5,6%</b>) jih zasluži med 3000€ - 3499€</li>
                                <li>18 (<b>9,1%</b>) jih zasluži med 3500€ - 3999€</li>
                                <li>21 (<b>10,6%</b>) jih zasluži med 4000€ - 4499€</li>
                                <li>17 (<b>8,6%</b>) jih zasluži med 4500€ - 4999€</li>
                                <li>19 (<b>9,6%</b>) jih zasluži med 5000€ - 5499€</li>
                                <li>13 (<b>6,6%</b>) jih zasluži med 5500€ - 5999€</li>
                                <li>9 (<b>4,5%</b>) jih zasluži med 6000€ - 6499€</li>
                                <li>12 (<b>6,1%</b>) jih zasluži med 6500€ - 6999€</li>
                                <li>14 (<b>7,1%</b>) jih zasluži med 7000€ - 7499€</li>
                                <li>7 (<b>3,5%</b>) jih zasluži med 7500€ - 7999€</li>
                                <li>4 (<b>2%</b>) jih zasluži med 8000€ - 8499€</li>
                                <li>8 (<b>4%</b>) jih zasluži med 8500€ - 8999€</li>
                                <li>5 (<b>2,5%</b>) jih zasluži med 9000€ - 9499€</li>
                                <li>3 (<b>1,5%</b>) jih zasluži med 9500€ - 9999€</li>
                                <li>23 (<b>11,6%</b>) jih zasluži več kot 10000€</li>
                            </ul>

                            <p>Primerjavo med redno zaposlenimi in tistimi, ki imajo s.p., je nemogoče narediti, saj
                                s.p. na trgu nastopa kot podjetje. S.p ima lahko dodatne zaposlene in administrativne
                                ter operativne stroške, ki jih redno zaposleni nima. Zaradi tega
                                prihodka podjetja ne moremo enačiti s plačo.</p>


                            <h4>Sedež in tržišče naročnikov</h4>
                            <p>Za razliko od redno zaposlenih, tisti prek s.p. največkrat delajo za tujega naročnika
                                (<b>64,6%</b>), in primarni trg je tujina (<b>72,6%</b>).</p>

                            <h3>Zakaj NE povezujem tistih s s.p. z redno zaposlenimi?</h3>

                            <p>Razlog je preprost, ne gre za enaki obliki dela. Čeprav se v praksi dogaja, da namesto
                                redne zaposlitve delodajalci raje sodelujejo preko s.p., je v resnici s.p. samostojna
                                poslovna entiteta, ki lahko opravlja enake storitve (in na enak način) kot katerokoli
                                drugo podjetje.</p>

                            <p>Zaradi tega ne moremo posploševati in primerjati med seboj rednega dela z delom prek
                                s.p., saj bi tako enačili aktivnosti podjetja z delom posameznika. Podjetje lahko
                                zaposluje delavce, izdaja račune za licence, opreme, naročnine, vzdrževanje in ves ta
                                prihodek, ki ga podjetje pridobi, ni enako plači, ki ga prejme posameznik za opravljeno
                                delo.</p>


                            <h2 id="podatki">Dostop do podatkov</h2>

                            <a href="/images/place/2023/anketa.csv">Rezultati ankete 2023 (.csv, 0,4MB)</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
