import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'acptkrzq',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    // token: 'process.env.SANITY_AUTH_TOKEN2'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);