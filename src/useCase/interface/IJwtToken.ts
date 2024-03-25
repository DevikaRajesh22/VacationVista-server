interface IJwtToken{
    createJwt(buyerId:string,role:string):string
}

export default IJwtToken