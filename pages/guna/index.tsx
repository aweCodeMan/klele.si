import Head from 'next/head'
import Link from 'next/link';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faBurn, faSignal} from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../components/partials/breadcrumbs";
import Comment from "../../components/cards/comment";
import CommentSkeletonCard from "../../components/cards/comment-skeleton-card";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Author from "../../components/cards/author";
import SubmitComment from "../../components/partials/submit-comment";

export default function Guna() {

    const [type, setType] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    const post = {
        title: 'Solving The Three Stooges Problem',
        author: {
            name: 'Jožef Zajšek'
        },
        group: {
            name: 'programiranje',
            color: '#63c7ff'
        },
        numberOfComments: 3,
        numberOfLikes: 122,
        createdAt: new Date(),
        html: '<p>…or how to improve your website’s uptime from 9 5’s to 5 9’s  </p>\n' +
            '<p>Staff Engineer, Search  </p>\n' +
            '<p>The Three Stooges were a slapstick comedy trio (if you’re under 40, ask your parents). They often attempted to collaborate on simple daily tasks but invariably ended up getting in each other’s way and injuring each other. In one such sketch, they tried to walk through a doorway. But since they tried to walk through simultaneously, shoulder to shoulder, they bumped into each other; and ultimately, no one could get through. Just like forcing Stooges through a doorway, we’ve encountered similar patterns pushing requests through a distributed microservices architecture.</p>\n' +
            '<p><img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/Among-Us-Random-Name-Generator.jpg?q=50&amp;fit=crop&amp;w=960&amp;h=500&amp;dpr=1.5" alt="enter image description here"></p>\n' +
            '<h2 id="problem">Problem</h2>\n' +
            '<p>At Reddit, we’ve encountered an interesting scale problem when recovering from an outage. We have a response cache at the API gateway level, upstream of our microservices; and cached responses have a TTL. Now imagine that the site has gone down for longer than that TTL, so the cache has been flushed. When the site recovers, we get inundated with requests (F5F5F5) many of which are duplicates, made within a short period of time. During normal operation, most of these duplicate requests would be served from the cache. </p>\n' +
            '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ignorance-as-a-service. My team is experimenting with frequent pair switching. Was it wasteful to be explaining the same basics repeatedly? Seemed like no, but why?</p>&mdash; Kent Beck (@KentBeck) <a href="https://twitter.com/KentBeck/status/1420173889989070849?ref_src=twsrc%5Etfw">July 28, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' +
            '<p>But when recovering from such an outage, nothing is cached, and all of the duplicate requests hit our microservices, underlying databases, and search engines all at once. This causes such a flood of traffic that none of the requests succeeds within the request timeout, so no responses get cached; and the site promptly faceplants again. We refer to this situation as The Three Stooges Problem although it is more commonly called The Thundering Herd, The Dogpile Effect, or a cache stampede.</p>\n',
        comments: [
            {
                author: {
                    name: 'Miha Medven'
                },
                numberOfLikes: 5,
                createdAt: new Date(),
                html: '<p>We miss you on Data IRL but I\'m really happy that you were able to make the leap to this new role and am encouraged knowing you\'re over there helping Reddit be successful in new ways! Great write-up.</p>',
                replies: [],
                depth: 0,
            },
            {
                author: {
                    name: 'Janez Novak'
                },
                numberOfLikes: 2,
                createdAt: new Date(),
                html: '<p>Thanks for the post! I have some questions:\n' +
                    'Can you clarify what happens when Redis goes down or is slow? Every request would be hitting the timeout so would the deduplication start blocking every request from going through the decorator?\n' +
                    'Do client teams do anything like exponential backoff w/ jitter or circuit breaking to help with thundering herds?</p>',
                replies: [
                    {
                        author: {
                            name: 'Tine Marine'
                        },
                        numberOfLikes: 1,
                        createdAt: new Date(),
                        html: '<p>Surely a cache miss is cheaper than a lock acquisition. Especially if you have to check the cache after a lock anyway.</p>',
                        replies: [
                            {
                                author: {
                                    name: 'Miha Medven'
                                },
                                numberOfLikes: 5,
                                createdAt: new Date(),
                                html: '<p>We miss you on Data IRL but I\'m really happy that you were able to make the leap to this new role and am encouraged knowing you\'re over there helping Reddit be successful in new ways! Great write-up.</p>',
                                replies: [],
                                depth: 2,
                            },
                            {
                                author: {
                                    name: 'Miha Medven'
                                },
                                numberOfLikes: 5,
                                createdAt: new Date(),
                                html: '<p>We miss you on Data IRL but I\'m really happy that you were able to make the leap to this new role and am encouraged knowing you\'re over there helping Reddit be successful in new ways! Great write-up.</p>',
                                replies: [],
                                depth: 2,
                            },
                        ],
                        depth: 1,
                    },
                    {
                        author: {
                            name: 'Janez Novak'
                        },
                        numberOfLikes: 2,
                        createdAt: new Date(),
                        html: '<p>Thanks for the post! I have some questions:\n' +
                            'Can you clarify what happens when Redis goes down or is slow? Every request would be hitting the timeout so would the deduplication start blocking every request from going through the decorator?\n' +
                            'Do client teams do anything like exponential backoff w/ jitter or circuit breaking to help with thundering herds?</p>',
                        replies: [
                            {
                                author: {
                                    name: 'Tine Marine'
                                },
                                numberOfLikes: 1,
                                createdAt: new Date(),
                                html: '<p>Surely a cache miss is cheaper than a lock acquisition. Especially if you have to check the cache after a lock anyway.</p>',
                                replies: [
                                    {
                                        author: {
                                            name: 'Miha Medven'
                                        },
                                        numberOfLikes: 5,
                                        createdAt: new Date(),
                                        html: '<p>We miss you on Data IRL but I\'m really happy that you were able to make the leap to this new role and am encouraged knowing you\'re over there helping Reddit be successful in new ways! Great write-up.</p>',
                                        replies: [],
                                        depth: 3,
                                    },
                                    {
                                        author: {
                                            name: 'Miha Medven'
                                        },
                                        numberOfLikes: 5,
                                        createdAt: new Date(),
                                        html: '<p>We miss you on Data IRL but I\'m really happy that you were able to make the leap to this new role and am encouraged knowing you\'re over there helping Reddit be successful in new ways! Great write-up.</p>',
                                        replies: [],
                                        depth: 3,
                                    },
                                ],
                                depth: 2
                            },
                        ],
                        depth: 1,

                    },
                ],
                depth: 0,

            },
            {
                author: {
                    name: 'Miha Medven'
                },
                numberOfLikes: 5,
                createdAt: new Date(),
                html: '<p>We miss you on Data IRL but I\'m really happy that you were able to make the leap to this new role and am encouraged knowing you\'re over there helping Reddit be successful in new ways! Great write-up.</p>',
                replies: [],
                depth: 0,
            },
        ],
    }

    function onTypeChange(event: React.MouseEvent<HTMLButtonElement>, number: number) {
        setType(number);
    }

    const commentAdded = () => {
        console.log('comment added');
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

                        <div className="flex flex-row items-center  mt-2">
                            <div className={'flex flex-col mr-3 items-center'}>
                                <button className="hover:text-red flex flex-row items-center">
                                    <div className="text-lg mr-2">
                                        <FontAwesomeIcon icon={faHeart}/>
                                    </div>
                                    <span className="text-sm font-bold opacity-50">{post.numberOfLikes}</span>
                                </button>
                            </div>
                            <div className={'text-sm text-black opacity-80 flex flex-row justify-center items-center'}>
                                <Author author={post.author} avatar={true}/> &#8212; Danes ob 18:47
                            </div>
                        </div>

                        <hr className={'my-4'}/>

                        <div className="prose" dangerouslySetInnerHTML={{__html: post.html}}/>
                    </div>

                    <SubmitComment onSubmit={commentAdded}/>

                    <div className="card" style={{borderTop: '0'}}>
                        <div>
                            <div className="flex flex-row justify-center items-center my-3">
                                <h2 className={'flex-1 font-bold tracking-wide text-xl leading-normal'}>Komentarji
                                    ({post.numberOfComments})</h2>

                                <div className="flex flex-row">
                                    <button
                                        className={type === 0 ? 'btn btn-primary btn-sm selected mb-3 sm:mb-0 mr-3' : 'btn btn-outline btn-sm mb-3 sm:mb-0 mr-3'}
                                        onClick={(event) => onTypeChange(event, 0)}>
                                        <FontAwesomeIcon icon={faSun} className={'mr-2'}/>
                                        Po vrsti
                                    </button>
                                    <button
                                        className={type === 1 ? 'btn btn-primary btn-sm selected mb-3 sm:mb-0' : 'btn btn-outline btn-sm mb-3 sm:mb-0'}
                                        onClick={(event) => onTypeChange(event, 1)}>
                                        <FontAwesomeIcon icon={faSignal} className={'mr-2'}/>
                                        Po priljubljenosti
                                    </button>
                                </div>
                            </div>

                            {
                                isLoading ? <CommentSkeletonCard/> : <div className="flex flex-col">
                                    {
                                        post.comments.map((comment, index) => {
                                            return <Comment comment={comment} key={index} />
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
