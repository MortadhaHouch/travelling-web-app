async function fetchData(url,data,method,body,setIsLoading){
    try {
        let request = await fetch(url+(data|| ""),{
            method:!body?"GET":method,
            body:body?JSON.stringify(body):null,
            headers:{
                "Content-Type":"application/json"
            },
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