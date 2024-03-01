import { store } from "../../reducers/store"
export const Faq = () => {
  store.subscribe(()=>{
    console.log("local data store is connected");
  })
  return (
    <>
        <main className="d-flex flex-row flex-wrap g-1 justify-content-center align-items-center bg-dark-subtle">
            
        </main>
    </>
  )
}