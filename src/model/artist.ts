class Artist {
    private id?: number;
    private name?: string;

    getId(): number | undefined {
        return this.id;
    }

    getName(): string | undefined {
        return this.name;
    }
}

export { Artist };