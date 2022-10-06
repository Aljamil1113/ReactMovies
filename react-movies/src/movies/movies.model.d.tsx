export interface movieDto {
    id: number;
    title: string;
    poster: string;
}

export interface landingPageDTO {
    inTheaters?: movieDto[];
    upcomingRelease?: movieDto[]
}