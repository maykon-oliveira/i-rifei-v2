import { RaffleStatus } from "@prisma/client";

export const RAFFLE_STATUS: Record<RaffleStatus, string> = {
    DRAFT: 'Rascunho',
    CANCELED: 'Cancelado',
    COMPLETED: 'Concluído',
    PUBLISHED: 'Publicado'
}