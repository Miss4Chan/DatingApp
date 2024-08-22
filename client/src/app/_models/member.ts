import { Photo } from "./photo"

export interface Member {
    id: number
    username: string
    age: number
    photoUrl: string
    knownAs: string
    created: Date
    lastActive: Date
    gender: string
    introduction: string
    interests: string
    lookingFor: string
    city: string
    country: string
    photos: Photo[]
}

//type in ts -- could be used to represent an enum 
//type Transport = 'Bus' | 'Car' | 'Bike' | 'Walk';
