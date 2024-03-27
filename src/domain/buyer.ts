interface Buyer {
    _id?: string,
    name: string,
    email: string,
    password: string,
    isBlocked: boolean,
    dateOfBirth: Date,
    phone:string,
    govtId:string,
    creationTime:Date,
}
export default Buyer