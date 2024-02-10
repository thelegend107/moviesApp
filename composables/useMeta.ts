const imageUrl:string = 'https://i.ibb.co/02Y408R/og-Image.jpg';

export default function(title:string, description:string, image:string = imageUrl) {
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