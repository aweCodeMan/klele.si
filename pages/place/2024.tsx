import Head from 'next/head'
import Breadcrumbs from "../../components/partials/breadcrumbs";
import Navbar from "../../components/navbar";
import AuthorMeta from "../../components/partials/author-meta";

export default function Salary2024() {
    return (
        <div>
            <Head>
                <title>Plače slovenskih razvijalcev 2024 | Klele.si</title>
                <meta name="description" content="Raziskava o plačah slovenskih razvijalcev za leto 2024."/>
                <meta property="og:title" content="Plače slovenskih razvijalcev 2024 | Klele.si"/>
                <meta property="og:description" content="Raziskava o plačah slovenskih razvijalcev za leto 2024."/>
                <meta property="og:image" content="/images/place/2024/zaposlitev_placa.png"/>
                <meta property="og:url" content="https://klele.si/place/2024"/>
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
                                slovenskih razvijalcev 2024</h1>
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
                                                createdAt={'2024-10-21 08:00'}
                                                updatedAt={'2024-10-21 08:00'}/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 prose">

                            <p>Tole je že sedma anketa o plačah slovenskih razvijalcev, ki jo objavim vsako leto v <a
                                href="https://www.facebook.com/groups/developerji"
                                rel="nofollow noreferrer" target="_blank">Facebook skupini Slovenski
                                developerji</a>.</p>

                            <p>Število vseh odgovorov: <b>1144</b></p>

                            <p>Povezave do anket prejšnih let:</p>
                            <ul>
                                <li><a
                                    href="https://klele.si/place/2023"
                                    rel="nofollow noreferrer" target="_blank">2023</a></li>
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

                            <div>
                                <p>Razen pričakovanega dviga plač, ki je postavil mediano med 3500€ - 3999€ BRUTO mesečne plače, ni večjih sprememb na trgu delovne sile.</p>

                                   <p>Za primerjavo dajem razpone plač in odstotek anketirancev, ki so
                                    izbrali dotični razpon za zadnja tri leta.</p>

                                <ul>
                                    <li>1500–1999€ (<b>9%</b> v 2022 | <b>6,6%</b> v 2023 | <b>4,4%</b> v 2024 )</li>
                                    <li>2000–2499€ (<b>14,4%</b> v 2022 | <b>11,4%</b> v 2023 | <b>9,6%</b> v 2024)</li>
                                    <li>2500–2999€ (<b>18,6%</b> v 2022 | <b>19%</b> v 2023 | <b>13,2%</b> v 2024)</li>
                                    <li>3000–3499€ (<b>17,1%</b> v 2022 | <b>16,3%</b> v 2023 | <b>19,8%</b> v 2024)</li>
                                    <li>3500–3999€ (<b>10%</b> v 2022 | <b>14%</b> v 2023 | <b>13,9%</b> v 2024)</li>
                                </ul>
                            </div>


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
                            <img src="/images/place/2024/demografija.png" alt="Graf za trenutni status"/>

                            <p>Med 1144 anketiranci je <b>856 (74,8%)</b> redno zaposlenih, <b>217 (19%)</b> jih
                                delo opravlja prek s.p., <b>61 (5,3%)</b> jih delo opravlja prek študentske
                                napotnice.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2024/prebivam.png" alt="Graf za regijo prebivanja"/>

                            <p>Kot vsako leto tudi letos je izrazito zastopana osrednjeslovenska regija <b>(560;
                                49,1%)</b>, sledi ji podravska regija <b>(143; 12,5%)</b> in gorenjska regija <b>(113;
                                9,9%)</b>. V tujini prebiva <b>2,1%</b> anketirancev.</p>

                            <p>Prezastopanost osrednjeslovenske regije je treba upoštevati pri intepretaciji vseh
                                rezultatov, saj so povprečne plače v Ljubljani višje kot v drugih regijah.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2024/starost.png" alt="Graf za starost"/>

                            <p>Med 19-25 let je
                                označilo <b>165 (14,4%)</b> oseb, med 26-30 <b>386 (33,8%)</b>, med 31-40 <b>478
                                    (41,9%)</b> in <b>97 (8,5%)</b> jih je označilo med 41-50 let.</p>


                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2024/poklicno_programiranja_leta.png" alt="Graf za število let poklicnega programiranja"/>

                            <p>Imamo 66 (<b>5,9%</b>) začetnikov, saj imajo manj kot 1 leto delovnih izkušenj s programiranjem. Pozna se tudi efekt pokoronske krize po tehničnem kadru, saj imamo večjo zastopanost anketirancev, ki imajo med 2-3 leti delovnih izkušenj, kar govori o tem, da je večje število ljudi takrat stopilo na trg delovne sile. <b>22,3%</b> (252) anketirancev ima več kot 10 let delovnih izkušenj.</p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2024/identificiram.png" alt="Graf za spol"/>

                            <p>Slovenski razvijalci smo izredno homogena skupina, saj je kar <b>89% (1016)</b> moških
                                in le <b>118 (10,3%)</b> žensk.</p>

                            <h2 id="student">Delo prek študentske napotnice</h2>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2024/student_neto_placa.png"
                                 alt="Graf za NETO postavke za študentsko delo"/>

                            <p>Med študenti so NETO urne postavke bolj uveljavljene od BRUTO postavk, zato
                                priporočam <a
                                    href="https://www.studentski-servis.com/podjetja/izracun-stroskov"
                                    rel="nofollow noreferrer" target="_blank">ta kalkulator</a> za pretvorbo iz
                                NETO v BRUTO postavke.</p>

                            <p>NETO urne postavke študente so v podobni razporeditvi kot lansko leto, tako da težko
                                govorimo o dvigu NETO postavk za delo prek študentske napotnice. Podobno kot lansko leto
                                ima večina anketirancev (<b>59%</b>) med 8,0€ in 10,99€ NETO na uro.</p>

                            <h2 id="redna-zaposlitev">Redna zaposlitev</h2>

                            <p><b>813 (95,3%)</b> razvijalcev je redno zaposlenih in ima pogodbo za nedoločen čas, prav
                                tako jih <b>852
                                    (99,6%)</b> dela za polni delovni čas.</p>

                            <h4>Delo na daljavo</h4>
                            <p><b>632 (73,9%)</b> redno zaposlenih opravlja delo na daljavo (<b>22,6%</b> za polni
                                delovni čas, <b>51,3%</b> manj kot polni delovni čas). Le 61 (<b>7,1%</b>) redno
                                zaposlenim delodajalec ne omogoča dela na daljavo.</p>

                            <h4>BRUTO Plača</h4>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2024/zaposlitev_placa.png"
                                 alt="Graf za BRUTO plače"/>

                            <p>Podatki za BRUTO mesečne plače so sledeči:</p>

                            <ul>
                                <li>2 (<b>0,2%</b>) jih ima minimalno plačo (1253,9€)</li>
                                <li>6 (<b>0,7%</b>) jih ima 1253,91€ - 1499€</li>
                                <li>38 (<b>4,4%</b>) jih ima 1500€ - 1999€</li>
                                <li>82 (<b>9,6%</b>) jih ima 2000€ - 2499€</li>
                                <li>113 (<b>13,2%</b>) jih ima 2500€ - 2999€</li>
                                <li>169 (<b>19,8%</b>) jih ima 3000€ - 3499€</li>
                                <li>119 (<b>13,9%</b>) jih ima 3500€ - 3999€</li>
                                <li>104 (<b>12,2%</b>) jih ima 4000€ - 4499€</li>
                                <li>65 (<b>7,6%</b>) jih ima 4500€ - 4999€</li>
                                <li>53 (<b>6,2%</b>) jih ima 5000€ - 5499€</li>
                                <li>26 (<b>3%</b>) jih ima 5500€ - 5999€</li>
                                <li>21 (<b>2,5%</b>) jih ima 6000€ - 6499€</li>
                                <li>16 (<b>1,9%</b>) jih ima 6500€ - 6999€</li>
                                <li>12 (<b>1,4%</b>) jih ima 7000€ - 7499€</li>
                                <li>4 (<b>0,5%</b>) jih ima 7500€ - 7999€</li>
                                <li>4 (<b>0,5%</b>) jih ima 8000€ - 8499€</li>
                                <li>5 (<b>0,6%</b>) jih ima 8500€ - 8999€</li>
                                <li>1 (<b>0,1%</b>) jih ima 9000€ - 9499€</li>
                                <li>2 (<b>0,2%</b>) jih ima 9500€ - 9999€</li>
                                <li>13 (<b>1,5%</b>) jih ima več kot 10000€</li>
                            </ul>

                            <p>Za primerjavo je slovenska povprečno BRUTO plača <b>2379,68€</b> (povprečna mesečna
                                plača, julij 2024).</p>

                            <p>Glede na lansko leto se je mediana dvignila za eno stopničko in je sedaj med 3500 -
                                3999€. To pomeni, da 50% vseh redno zaposlenih zasluži manj kot 4000€ BRUTO na mesec.
                                Tudi letos se je zmanjšal delež redno zaposlenih, ki imajo plačo manjšo od 2500€. Leta
                                2020 je bil delež <b>47,7%</b>, leta 2021 <b>36,9%</b>, leta 2022 <b>25,6%</b>, leta
                                2023 <b>20,9%</b> letos je takih samo
                                še <b>14,9%</b>.

                            </p><p>Če hočeš biti letos v top 10%, moraš imeti BRUTO mesečno plačo <b>5500€</b> ali več.
                        </p>

                            <p>Kot vsako leto moram tudi letos opozoriti na težavo, ko govorimo o “povprečni” plači
                                slovenskega razvijalca. Zaradi narave spletne ankete in morebitnega netočnega
                                zbiranja podatkov (ljudje ne razlikujejo med BRUTO in NETO plačo, hkrati pa velikokrat
                                pri BRUTO plači štejejo tudi povračilo stroškov prevoza in malice), poglobljenih analiz
                                tudi letos ne bo, saj bodo zaključki netočni in povzročili več težav kot koristi. Pri
                                tako malem številu anketirancev je večja nevarnost napačno sklepanje iz pomanjkljivega
                                vzorca kot pa uvid, ki ga bi kaka poglobljena analiza znala prinesti.</p>

                            <p>Še enkrat, zgornje opozorilo je treba vedno imeti v mislih, ko
                                se pogovarjate o izsledkih te ankete.</p>

                            <h3>Zakaj NETO plača ni pomembna?</h3>

                            <p>NETO plača je tista plača, ki jo dobi posameznik nakazano na bančni račun. Znesek NETO
                                plače je prilagojen vsakemu posamezniku, saj je odvisen od olajšav, števila vzdrževanih
                                otrok in drugih družinskih članov. Zaradi tega je NETO plača lahko zavajajoča, saj se
                                razlikuje od osebe do osebe, medtem ko je BRUTO vedno enaka.</p>

                            <h4>Bonusi</h4>

                            <p><b>64,2%</b> (536) anketirancev prejme pod 5000€ BRUTO bonusa na leto, <b>11%</b> (92) jih prejme med 5000€ - 9999€. To pomeni, da slaba četrtina redno zaposlenih prejme več kot 10000€ BRUTO dodatne letne kompenzacije.</p>

                            <h4>Sedež in tržišče delodajalca</h4>

                            <p>Velika večina (<b>607, 71,2%</b>) dela za podjetje v Sloveniji, delajo za slovenski trg (<b>327,
                                38,3%)</b> ali za trg EU (<b>305, 35,7%)</b>.</p>

                            <h4>Trenutna zaposlitev in iskanje nove</h4>

                            <p>Aktivno novo zaposlitev išče <b>136 (15,9%)</b> anketirancev.</p>

                            <p><b>146 (17,1%)</b> jih je pri trenutnem delodajalcu zaposlenih manj kot 1 leto, <b>164
                                (19,2%)</b> med 1 - 2 leti, <b>148 (17,3%)</b> med 2 - 3 leti. <b>50
                                (5,8%)</b> je zaposlenih pri istem delodajalcu že dlje od 10 let.</p>

                            <h4>Popoldanski s.p.</h4>

                            <p><b>90 (10,5%)</b> anketirancev ima poleg redne zaposlitve odprt še s.p.</p>

                            <h2 id="sp">Delo prek s.p.</h2>

                            <p>Večina tistih, ki svoje delo opravljalo prek s.p., imajo znake prekarnega dela oz. bi
                                znale biti ekonomsko odvisne osebe (1 naročnik predstavlja več kot 76,4% letnega dohodka
                                in hkrati ne zaposluje nobene osebe), saj za kar <b>87%</b> anketirancev največji
                                naročnik predstavlja več kot 70% letnega prihodka, za <b>31,1%</b> odstotek pa kar 100%
                                letnega prihodka.</p>


                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/place/2024/sp_prihodek.png"
                                 alt="Graf za prihodek tistih, ki delajo prek s.p."/>

                            <p>Podatki za mesečni BRUTO prihodek v zadnjih 6 mesecih:</p>

                            <p><b>POZOR!</b> Letos sem v analizo o prihodku vključil tudi tiste redno zaposlene, ki imajo dodatno odprt še s.p.
                                Razlika je predvsem v tem, da se poveča število anketirancev z <i>manjšimi</i> (do 2000€) prihodki.
                            </p>

                            <ul>
                                <li>19 (<b>6,2%</b>) zasluži pod 499€</li>
                                <li>15 (<b>4,9%</b>) jih zasluži med 500€ - 999€</li>
                                <li>18 (<b>5,9%</b>) zasluži med 1000€ - 1499€</li>
                                <li>8 (<b>2,6%</b>) zasluži med 1500€ - 1999€</li>
                                <li>9 (<b>3%</b>) zasluži med 2000€ - 2499€</li>
                                <li>11 (<b>3,6%</b>) jih zasluži med 2500€ - 2999€</li>
                                <li>10 (<b>3,3%</b>) jih zasluži med 3000€ - 3499€</li>
                                <li>12 (<b>3,9%</b>) jih zasluži med 3500€ - 3999€</li>
                                <li>20 (<b>6,6%</b>) jih zasluži med 4000€ - 4499€</li>
                                <li>15 (<b>4,9%</b>) jih zasluži med 4500€ - 4999€</li>
                                <li>17 (<b>5,6%</b>) jih zasluži med 5000€ - 5499€</li>
                                <li>14 (<b>4,6%</b>) jih zasluži med 5500€ - 5999€</li>
                                <li>19 (<b>6,2%</b>) jih zasluži med 6000€ - 6499€</li>
                                <li>12 (<b>3,9%</b>) jih zasluži med 6500€ - 6999€</li>
                                <li>22 (<b>7,2%</b>) jih zasluži med 7000€ - 7499€</li>
                                <li>14 (<b>4,6%</b>) jih zasluži med 7500€ - 7999€</li>
                                <li>14 (<b>4,6%</b>) jih zasluži med 8000€ - 8499€</li>
                                <li>10 (<b>3,3%</b>) jih zasluži med 8500€ - 8999€</li>
                                <li>4 (<b>1,3%</b>) jih zasluži med 9000€ - 9499€</li>
                                <li>6 (<b>2%</b>) jih zasluži med 9500€ - 9999€</li>
                                <li>36 (<b>11,8%</b>) jih zasluži več kot 10000€</li>
                            </ul>

                            <p>Primerjavo med redno zaposlenimi in tistimi, ki imajo s.p., je nemogoče narediti, saj
                                s.p. na trgu nastopa kot podjetje. S.p ima lahko dodatne zaposlene in administrativne
                                ter operativne stroške, ki jih redno zaposleni nima. Zaradi tega
                                prihodka podjetja ne moremo enačiti s plačo.</p>


                            <h4>Sedež in tržišče naročnikov</h4>
                            <p>Za razliko od redno zaposlenih, tisti prek s.p. največkrat delajo za tujega naročnika
                                (<b>61,3%</b>), in primarni trg je tujina (<b>67,9%</b>).</p>

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

                            <a href="/images/place/2024/anketa.csv">Rezultati ankete 2024 (.csv, 0,4MB)</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
