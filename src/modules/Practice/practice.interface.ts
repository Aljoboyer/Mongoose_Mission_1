
export interface commonInterFace{
    street: string,
    city: string,
    state: string,
    zipcode: string,

    color:  string,
    food:  string,
    movie:  string
}

export interface infoInterFace{
    name: string,
    email: string
}

export interface PracticeDataInterFace{
    name: string,
    email:  string,
    age: number,
    address: Pick<commonInterFace, "street" | "city" | "state" | "zipcode">,
    favorites: Omit<commonInterFace, "street" | "city" | "state" | "zipcode">,
    friends: infoInterFace[] | undefined
}