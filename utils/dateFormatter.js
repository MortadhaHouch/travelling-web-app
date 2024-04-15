function dateConversion(value,from,to){
    switch (from) {
        case "days":
            if (to == "days") {
                return value;
            }else if (to == "weeks") {
                return Math.floor(value/7);
            } else if(to == "months"){
                return Math.floor(value/30);
            }else if(to == "years"){
                return Math.floor(value/365);
            }
            break;
        case "weeks":
            if (to == "days") {
                return Math.floor(value*7);
            } else if(to == "weeks"){
                return value;
            } else if(to == "months"){
                return Math.floor(value/4);
            }else if(to == "years"){
                return Math.floor(value/52);
            }
            break;
        case "months":
            if (to == "days") {
                return Math.floor(value*30);
            } else if(to == "weeks"){
                return Math.floor(value/4);
            } else if(to == "months"){
                return value;
            }else if(to == "years"){
                return Math.floor(value/12);
            }
            break;
        case "years":
            if (to == "days") {
                return Math.floor(value*365);
            } else if(to == "weeks"){
                return Math.floor(value*52);
            }else if(to == "months"){
                return Math.floor(value*12);
            }else if(to == "years"){
                return value;
            }
            break;
    }
}
export {dateConversion}