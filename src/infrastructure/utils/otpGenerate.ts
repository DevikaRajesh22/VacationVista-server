class otpGenerate{
    async generateOtp(length:number):Promise<string>{
        const numerics = "0123456789";
        let code ="";
        for(let i =0;i<length;i++){
            const randomIndex = Math.floor(Math.random()*numerics.length)
            code += numerics.charAt(randomIndex)
        }
        return code
    }
}

export default otpGenerate