const times= (n, block)=>{
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
}

const getLen= (arr)=>{
    return arr.length
}
const getRemainder= (x,c)=>{
    return x%c;
}

const getQuotient= (x,c)=>{
    console.log(parseInt(x/c))
    return parseInt(x/c);
}
const ifCond=(v1, operator, v2, options) =>{
    // console.log(v1,'   ',v2)
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            console.log(v1,"   ",v2)
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
module.exports={
    times,ifCond,getLen,getRemainder,getQuotient
}