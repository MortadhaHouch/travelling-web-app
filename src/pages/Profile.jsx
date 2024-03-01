import { store } from "../../reducers/store"

export default function Profile() {
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    return (
        <main className="d-flex justify-content-center align-items-center bg-dark-subtle">
            <section>
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </section>
            <section>
                <div>

                </div>
            </section>
        </main>
    )
}
