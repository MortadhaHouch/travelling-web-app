async function fetchData(url,method,body,setIsLoading){
    try {
        let request = await fetch(url,{
            method:!body?"GET":method,
            body:body?JSON.stringify(body):null,
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