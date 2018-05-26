Date.prototype.format = function(type){
    let year = this.getFullYear();
    let month = this.getMonth() + 1;
    let day = this.getDate();
    let h = this.getHours();
    let m = this.getMinutes();
    let s = this.getSeconds();

    month<=9?month='0'+month:month;
    day<=9?day='0'+day:day;
    h<=9?h='0'+h:h;
    m<=9?m='0'+m:m;
    s<=9?s='0'+s:s;

    if(type === 'YYYY-MM-DD hh:mm:ss'){
        return year+'-'+month+'-'+day+' '+h+':'+m+':'+s;
    }else if(type === 'YYYY-MM-DD'){
        return year+'-'+month+'-'+day;
    }else if(type === 'MM-DD'){
        return month+'-'+day;
    }else if(type === 'MM-DD hh:mm:ss'){
        return month+'-'+day+' '+h+':'+m+':'+s;
    }else if(type === 'YYYY-MM-DD hh:mm'){
        return year+'-'+month+'-'+day+' '+h+':'+m;
    }else if(type === 'hh:mm:ss'){
        return h+':'+m+':'+s;
    }else if(type === 'hh:mm'){
        return h+':'+m;
    }
    else{
        return year+'-'+month+'-'+day+' '+h+':'+m+':'+s;
    }
}