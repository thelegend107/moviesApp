export default function (title: string, description: string, image: string = metaImageUrl, metaHead: boolean = false) {
    useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        ogImage: image,
        ogUrl: image,
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: image,
        twitterCard: 'summary'
    })

    if (metaHead) {
        useHead({
            htmlAttrs: {
                lang: 'en'
            },
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico'
                }
            ]
        })
    }
}