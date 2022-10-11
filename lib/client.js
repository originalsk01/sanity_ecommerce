import sanityClient from '@sanity/client';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

const client = sanityClient({
    projectId: '',
    dataset: '',
    apiVersion: '',
    useCdn: true,
    token: ''
})