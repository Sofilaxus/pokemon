export type TTypes = {
    name: string;
};

export type TPokemonBasics = {
    id: number;
    name: string;
    types: TTypes[];
};

export type TAllPokemon = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};
