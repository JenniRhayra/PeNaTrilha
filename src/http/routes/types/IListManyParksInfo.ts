import { Gender, Groups } from "@prisma/client";

interface User {
    email: string;
    name: string;
    phone: string;
    group: Groups
}

interface Manager {
    cpf: string;
    rg: string;
    user: User
}

interface Guide {
    id: number;
    biography: string;
    nickname: string;
    birthDate: Date;
    guideImage: string;
    user: User;
    gender: Gender;
}

interface Event {
    event_name: string;
    eventImage: string;
}

interface Park {
    id: number;
    description: string;
    site: string;
    parkImage: string;
    park_name: string;
    city: string;
    core: string;
    neighborhood: string
    number: string;
    publicPlace: string;
    state: string;
    street: string;
    zipCode: string;
    guide: Guide[];
    events: Event[];
}

export interface IListManyParksInfo {
    park: Park[]
}