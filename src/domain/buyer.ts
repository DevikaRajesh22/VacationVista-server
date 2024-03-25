interface Buyer {
    id?: string,
    name: string,
    email: string,
    password: string,
    isBlocked: boolean,
    dateOfBirth: Date,
    phone:string,
    govtId:string,
    creationTime:Date,
    generateAuthToken: () => string
}
export default Buyer