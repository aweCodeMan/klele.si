import Head from 'next/head'
import Link from 'next/link';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faBurn, faSignal} from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../components/partials/breadcrumbs";

export default function Guna() {

    const post = {
        title: 'Solving The Three Stooges Problem',
        author: {
            name: 'Jožef Zajšek'
        },
        group: {
            name: 'programiranje',
            color: '#63c7ff'
        },
        numberOfComments: 35,
        numberOfLikes: 122,
        createdAt: new Date(),
        lockedAt: new Date(),
        html: '<p>…or how to improve your website’s uptime from 9 5’s to 5 9’s  </p>\n' +
            '<p>Staff Engineer, Search  </p>\n' +
            '<p>The Three Stooges were a slapstick comedy trio (if you’re under 40, ask your parents). They often attempted to collaborate on simple daily tasks but invariably ended up getting in each other’s way and injuring each other. In one such sketch, they tried to walk through a doorway. But since they tried to walk through simultaneously, shoulder to shoulder, they bumped into each other; and ultimately, no one could get through. Just like forcing Stooges through a doorway, we’ve encountered similar patterns pushing requests through a distributed microservices architecture.</p>\n' +
            '<p><img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/Among-Us-Random-Name-Generator.jpg?q=50&amp;fit=crop&amp;w=960&amp;h=500&amp;dpr=1.5" alt="enter image description here"></p>\n' +
            '<h2 id="problem">Problem</h2>\n' +
            '<p>At Reddit, we’ve encountered an interesting scale problem when recovering from an outage. We have a response cache at the API gateway level, upstream of our microservices; and cached responses have a TTL. Now imagine that the site has gone down for longer than that TTL, so the cache has been flushed. When the site recovers, we get inundated with requests (F5F5F5) many of which are duplicates, made within a short period of time. During normal operation, most of these duplicate requests would be served from the cache. </p>\n' +
            '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ignorance-as-a-service. My team is experimenting with frequent pair switching. Was it wasteful to be explaining the same basics repeatedly? Seemed like no, but why?</p>&mdash; Kent Beck (@KentBeck) <a href="https://twitter.com/KentBeck/status/1420173889989070849?ref_src=twsrc%5Etfw">July 28, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' +
            '<p>But when recovering from such an outage, nothing is cached, and all of the duplicate requests hit our microservices, underlying databases, and search engines all at once. This causes such a flood of traffic that none of the requests succeeds within the request timeout, so no responses get cached; and the site promptly faceplants again. We refer to this situation as The Three Stooges Problem although it is more commonly called The Thundering Herd, The Dogpile Effect, or a cache stampede.</p>\n'
    }

    const showLockedComments = () => {
        return (
            <div className="p-6 text-center">
                <p className={'italic text-lg'}>Ma ne moreš več komentirati!</p>
            </div>
        )
    }

    function showSubmitCommentForm() {
        return undefined;
    }

    return (
        <div>
            <Head>
                <title>To je guna objava! | Klele.si</title>
                <meta name="description" content="To je guna objava!"/>
            </Head>

            <main className={'my-6 flex flex-col'}>
                <div className="container mx-auto" style={{maxWidth: '780px'}}>
                    <div className="mb-6">
                        <Breadcrumbs/>
                    </div>

                    <div className="card mb-4">
                        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold leading-snug tracking-wide text-black mb-2">{post.title}</h1>

                        <div className={'text-sm font-bold leading-normal tracking-tight mb-4'}>
                            <Link href="#group">
                                <a style={{color: post.group.color}}>
                                    #{post.group.name}
                                </a>
                            </Link>
                        </div>

                        <div className={'text-sm text-black opacity-80 mt-2'}>
                            {post.author.name} &#8212; Danes ob 18:47
                        </div>

                        <hr className={'my-4'}/>

                        <div className="prose" dangerouslySetInnerHTML={{__html: post.html}}>
                        </div>
                    </div>

                    <div className="card">

                        <div>
                            <div className="border border-black">
                                <textarea className={'h-full w-full min-h-64 p-2 '} rows={3}
                                          placeholder={'Daj nam pomagaj in povej kaj ti misliš...'}></textarea>

                                <div className="border-t border-black flex flex-row justify-between p-2">
                                    <div className={'mr-2 flex flex-row items-center justify-center'}>
                                        <button className="btn btn-sm btn-outline mr-2">Predogled</button>
                                        <p className="text-sm text-black opacity-50">Uporabljamo Markdown.</p>
                                    </div>

                                    <button className="btn btn-sm btn-primary">Komentiraj</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
