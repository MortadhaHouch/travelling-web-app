import sign from "jwt-encode"

async function fetchData(url,method,body,setIsLoading){
    let requestMethod;
    let requestBody=null;
    switch (method) {
        case "GET":
            requestMethod = "GET";
            requestBody = null;
            break;
        case "PUT":
            requestMethod = "PUT";
            requestBody=JSON.stringify({body:sign(body,import.meta.env.VITE_SECRET_KEY)})
            break;
        case "DELETE":
            requestMethod = "DELETE";
            requestBody = null;
            break;
        case "POST":
            requestMethod = "POST";
            requestBody=JSON.stringify({body:sign(body,import.meta.env.VITE_SECRET_KEY)})
            break;
    }
    try {
        let request = await fetch(import.meta.env.VITE_REQUEST_URL+url,{
            method:requestMethod,
            body:requestBody,
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                "Cache-Control":"no",
                "Set-Cookie":`json_token=${document.cookie?.json_token}`
            }
        });
        setIsLoading(true);
        return await request.json();
    } catch (error) {
        console.log(error);
    }finally{
        setIsLoading(false);
    }
}
export {fetchData}