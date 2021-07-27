import Head from 'next/head'
import Logo from "../components/logo";
import Link from 'next/link';
import PostCard from "../components/cards/post-card";
import PostSkeletonCard from "../components/cards/post-skeleton-card";
import {useEffect, useState} from "react";
import Pagination from "../components/partials/pagination";

export default function Buttons() {

    return (
        <div>
            <div className="flex flex-row p-6">
                <div className="mr-3">
                    <div className="mb-3">
                        <button className="btn btn-lg btn-primary">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-primary">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-sm btn-primary">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-sm btn-primary" disabled={true}>Disabled gumb</button>
                    </div>
                </div>
                <div className="mr-3">
                    <div className="mb-3">
                        <button className="btn btn-lg btn-outline">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-outline">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-sm btn-outline">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-sm btn-outline" disabled={true}>Disabled gumb</button>
                    </div>
                </div>
                <div className="mr-3">
                    <div className="mb-3">
                        <button className="btn btn-lg btn-link">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-link">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-sm btn-link">Gumb</button>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-sm btn-link" disabled={true}>Disabled gumb</button>
                    </div>
                </div>

                <div className="mr-3">
                    <Link href="#">
                        <a>Test</a>
                    </Link>
                </div>
            </div>

        </div>
    )
}
