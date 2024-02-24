import { useRef } from "react";

function DialogBox(props) {
    let ref = useRef();
    return (
        <section className={"dialog"+(props.classList=="shown"?"":" hidden")} ref={ref}>
            <div className="bg-light-subtle">
                <div>
                    <h2 className="card-title">hello</h2>
                </div>
                <div>
                    {
                        props.message
                    }
                </div>
                <div>
                    <button className="btn btn-danger" onClick={()=>ref?.current.classList.add("hidden")}>close</button>
                </div>
            </div>
        </section>
    );
}

export {DialogBox};