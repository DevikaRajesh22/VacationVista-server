interface INodeMailer{
    sendOtp(email:string):Promise<boolean>
    verifyOtp(email:string,otp:string):Promise<boolean>
}

export default INodeMailer