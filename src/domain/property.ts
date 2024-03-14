interface Property{
    id?:string,
    category:string,
    type:string,
    address:{
        city:string,
        country:string,
        district:string,
        flat:string,
        landmark:string,
        pincode:string,
        state:string,
        street:string
    },
    location:{
        latitude:number,
        longitude:number
    },
    pricing:number,
    basics:{
        bathroom:number,
        bedroom:number,
        beds:number,
        guests:number
    },
    photos:string[],
    title:string,
    description:string,
    isBlocked:boolean,
    amenities:string[],
    status:string,
    creationTime:Date
}

export default Property;