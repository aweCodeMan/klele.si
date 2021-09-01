import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-regular-svg-icons";

export default function MarkdownInstructions() {
    return (
        <>
            <div className="flex flex-col bg-light-gray">
                <div className="flex flex-row">
                    <div className="text-center font-bold text-sm border p-1 flex-1">
                        <h3><FontAwesomeIcon icon={faPencilAlt} className={'mr-1'}/>Napišeš...</h3>
                    </div>
                    <div className="text-center font-bold text-sm border p-1 flex-1">
                        <h3><FontAwesomeIcon icon={faEye} className={'mr-1'}/>Vidiš...</h3>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="text-center  text-sm border-b border-r border-l p-1 flex-1">
                        <p>*poševno*</p>
                    </div>
                    <div className="text-center  text-sm border-b border-r border-l p-1 flex-1">
                        <p><em>poševno</em></p>
                    </div>
                </div>

                <div className="flex flex-row ">
                    <div className="text-center  text-sm border-b border-r border-l p-1 flex-1">
                        <p>**odebeljeno**</p>
                    </div>

                    <div className="text-center  text-sm border-b border-r border-l p-1 flex-1">
                        <p><strong>odebeljeno</strong></p>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="text-center  text-sm border-b border-r border-l p-1 flex-1">
                        <p>[klele.si!](https://klele.si)</p>
                    </div>

                    <div className="text-center  text-sm border-b border-r border-l p-1 flex-1">
                        <div className="prose">
                            <p><a href="https://klele.si">klele.si!</a></p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row ">
                    <div
                        className="text-center  text-sm border-b border-r border-l p-1 flex-1 flex justify-center items-center">
                        <p>* stvar 1 <br/>* stvar 2 <br/>* stvar 3 <br/></p>
                    </div>

                    <div
                        className="text-center  text-sm border-b border-r border-l p-1 flex-1 flex items-center justify-center">
                        <div className="prose">
                            <ul>
                                <li style={{margin: 0}}>stvar 1</li>
                                <li style={{margin: 0}}>stvar 2</li>
                                <li style={{margin: 0}}>stvar 3</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div
                        className="text-center  text-sm border-b border-r border-l p-1 flex-1 flex justify-center items-center">
                        <p>1. stvar A <br/>2. stvar B <br/>3. stvar C <br/></p>
                    </div>

                    <div
                        className="text-center  text-sm border-b border-r border-l p-1 flex-1 flex items-center justify-center">
                        <div className="prose">
                            <ol>
                                <li style={{margin: 0}}>stvar A</li>
                                <li style={{margin: 0}}>stvar B</li>
                                <li style={{margin: 0}}>stvar C</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div
                        className="text-center  text-sm border-b border-r border-l p-1 flex-1 flex items-center justify-center"
                        style={{flexBasis: 0}}>
                        <p>&gt; citat</p>
                    </div>

                    <div
                        className="text-center  text-sm border-b border-r border-l p-1 flex-1 flex items-center justify-center"
                        style={{flexBasis: 0}}>
                        <div className="prose">
                            <blockquote>
                                <p>citat</p>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="text-center  text-sm border-b border-r border-l p-1 flex-1" style={{flexBasis: 0}}>
                        <p>```<br/>Hello, World! <br/>```</p>
                    </div>

                    <div
                        className="text-center text-sm border-b border-r border-l p-1 flex-1 flex items-center justify-center"
                        style={{flexBasis: 0}}>
                        <div className="prose">
                            <pre><code>Hello, World!</code></pre>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
