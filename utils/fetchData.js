import sign from "jwt-encode"
async function fetchData(url,method,body,setIsLoading){
    try {
        let request = await fetch(url,{
            method:!body?"GET":method,
            body:body?JSON.stringify({body:sign(body,import.meta.env.VITE_SECRET_KEY)}):null,
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                "Cache-Control":"no",
                "Set-Cookie":`json_token=${document.cookie?.json_token}`
            }
        });
        setIsLoading(true);
        let response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }finally{
        setIsLoading(false);
    }
}
export {fetchData}