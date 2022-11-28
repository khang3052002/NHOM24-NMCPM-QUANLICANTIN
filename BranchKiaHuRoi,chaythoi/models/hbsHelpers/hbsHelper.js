const times= (n, block)=>{
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
}

const getLen= (arr)=>{
    return arr.length
}
const getJSONLen=(jObject)=>{
    return Object.keys(jObject).length
}
const getRemainder= (x,c)=>{
    return x%c;
}

const getQuotient= (x,c)=>{
    return parseInt(x/c);
}
const ifCond=(v1, operator, v2, options) =>{
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
        }
    }
const ConvertToVND=(value)=>
{
    // console.log(value)
    // console.log(this.gia_ban)
    gia_ban= value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    return gia_ban
}
module.exports={
    times,ifCond,getLen,getRemainder,getQuotient,getJSONLen,ConvertToVND
}