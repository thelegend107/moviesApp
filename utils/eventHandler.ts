export interface CardClickEventDetail {
    id: number,
    type: string,
    seasonNumber?: number
}

export function handleCardClickEvent(detail: CardClickEventDetail) {
    if (detail.type == 'person') {
        navigateTo({
            path: '/people/' + detail.id,
        })
    }
    else if (detail.seasonNumber) {
        const path: string = '/shows/';
        navigateTo({
            path: path + detail.id + '/season/' + detail.seasonNumber,
        })
    }
    else {
        const path: string = detail.type == 'movie' ? '/movies/' : '/shows/';
        navigateTo({
            path: path + detail.id,
        })
    }
}